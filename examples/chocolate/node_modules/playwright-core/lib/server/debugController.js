"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DebugController = void 0;

var _processLauncher = require("../utils/processLauncher");

var _instrumentation = require("./instrumentation");

var _recorder = require("./recorder");

var _recorderApp = require("./recorder/recorderApp");

var _locatorGenerators = require("./isomorphic/locatorGenerators");

/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const internalMetadata = (0, _instrumentation.serverSideCallMetadata)();

class DebugController extends _instrumentation.SdkObject {
  // TODO: remove in 1.27
  constructor(playwright) {
    super({
      attribution: {
        isInternalPlaywright: true
      },
      instrumentation: (0, _instrumentation.createInstrumentation)()
    }, undefined, 'DebugController');
    this._autoCloseTimer = void 0;
    this._autoCloseAllowed = false;
    this._trackHierarchyListener = void 0;
    this._playwright = void 0;
    this._reuseBrowser = false;
    this._playwright = playwright;
  }

  setAutoCloseAllowed(allowed) {
    this._autoCloseAllowed = allowed;
  }

  dispose() {
    this.setTrackHierarcy(false);
    this.setAutoCloseAllowed(false);
    this.setReuseBrowser(false);
  }

  setTrackHierarcy(enabled) {
    if (enabled && !this._trackHierarchyListener) {
      this._trackHierarchyListener = {
        onPageOpen: () => this._emitSnapshot(),
        onPageNavigated: () => this._emitSnapshot(),
        onPageClose: () => this._emitSnapshot()
      };

      this._playwright.instrumentation.addListener(this._trackHierarchyListener, null);
    } else if (!enabled && this._trackHierarchyListener) {
      this._playwright.instrumentation.removeListener(this._trackHierarchyListener);

      this._trackHierarchyListener = undefined;
    }
  }

  reuseBrowser() {
    return this._reuseBrowser;
  }

  setReuseBrowser(enabled) {
    this._reuseBrowser = enabled;
  }

  async resetForReuse() {
    const contexts = new Set();

    for (const page of this._playwright.allPages()) contexts.add(page.context());

    for (const context of contexts) await context.resetForReuse(internalMetadata, null);
  }

  async navigateAll(url) {
    for (const p of this._playwright.allPages()) await p.mainFrame().goto(internalMetadata, url);
  }

  async setRecorderMode(params) {
    await this._closeBrowsersWithoutPages();

    if (params.mode === 'none') {
      for (const recorder of await this._allRecorders()) {
        recorder.setHighlightedSelector('');
        recorder.setMode('none');
      }

      this.setAutoCloseEnabled(true);
      return;
    }

    if (!this._playwright.allBrowsers().length) await this._playwright.chromium.launch(internalMetadata, {
      headless: false
    }); // Create page if none.

    const pages = this._playwright.allPages();

    if (!pages.length) {
      const [browser] = this._playwright.allBrowsers();

      const {
        context
      } = await browser.newContextForReuse({}, internalMetadata);
      await context.newPage(internalMetadata);
    } // Toggle the mode.


    for (const recorder of await this._allRecorders()) {
      recorder.setHighlightedSelector('');
      if (params.mode === 'recording') recorder.setOutput(params.language, params.file);
      recorder.setMode(params.mode);
    }

    this.setAutoCloseEnabled(true);
  }

  async setAutoCloseEnabled(enabled) {
    if (!this._autoCloseAllowed) return;
    if (this._autoCloseTimer) clearTimeout(this._autoCloseTimer);
    if (!enabled) return;

    const heartBeat = () => {
      if (!this._playwright.allPages().length) selfDestruct();else this._autoCloseTimer = setTimeout(heartBeat, 5000);
    };

    this._autoCloseTimer = setTimeout(heartBeat, 30000);
  }

  async highlightAll(selector) {
    for (const recorder of await this._allRecorders()) recorder.setHighlightedSelector(selector);
  }

  async hideHighlightAll() {
    await this._playwright.hideHighlight();
  }

  allBrowsers() {
    return [...this._playwright.allBrowsers()];
  }

  async kill() {
    selfDestruct();
  }

  async closeAllBrowsers() {
    await Promise.all(this.allBrowsers().map(browser => browser.close()));
  }

  _emitSnapshot() {
    const browsers = [];

    for (const browser of this._playwright.allBrowsers()) {
      const b = {
        contexts: []
      };
      browsers.push(b);

      for (const context of browser.contexts()) {
        const c = {
          pages: []
        };
        b.contexts.push(c);

        for (const page of context.pages()) c.pages.push(page.mainFrame().url());
      }
    }

    this.emit(DebugController.Events.BrowsersChanged, browsers);
  }

  async _allRecorders() {
    const contexts = new Set();

    for (const page of this._playwright.allPages()) contexts.add(page.context());

    const result = await Promise.all([...contexts].map(c => _recorder.Recorder.show(c, {
      omitCallTracking: true
    }, () => Promise.resolve(new InspectingRecorderApp(this)))));
    return result.filter(Boolean);
  }

  async _closeBrowsersWithoutPages() {
    for (const browser of this._playwright.allBrowsers()) {
      for (const context of browser.contexts()) {
        if (!context.pages().length) await context.close((0, _instrumentation.serverSideCallMetadata)());
      }

      if (!browser.contexts()) await browser.close();
    }
  }

}

exports.DebugController = DebugController;
DebugController.Events = {
  BrowsersChanged: 'browsersChanged',
  InspectRequested: 'inspectRequested',
  SourcesChanged: 'sourcesChanged'
};

function selfDestruct() {
  // Force exit after 30 seconds.
  setTimeout(() => process.exit(0), 30000); // Meanwhile, try to gracefully close all browsers.

  (0, _processLauncher.gracefullyCloseAll)().then(() => {
    process.exit(0);
  });
}

class InspectingRecorderApp extends _recorderApp.EmptyRecorderApp {
  constructor(debugController) {
    super();
    this._debugController = void 0;
    this._debugController = debugController;
  }

  async setSelector(selector) {
    const locators = ['javascript', 'python', 'java', 'csharp'].map(l => ({
      name: l,
      value: (0, _locatorGenerators.asLocator)(l, selector)
    }));

    this._debugController.emit(DebugController.Events.InspectRequested, {
      selector,
      locators
    });
  }

  async setSources(sources) {
    this._debugController.emit(DebugController.Events.SourcesChanged, sources);
  }

}