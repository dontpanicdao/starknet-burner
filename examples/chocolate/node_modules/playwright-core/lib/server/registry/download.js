"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.download = download;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _child_process = _interopRequireDefault(require("child_process"));

var _manualPromise = require("../../utils/manualPromise");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/**
 * Node.js has a bug where the process can exit with 0 code even though there was an uncaught exception.
 * Thats why we execute it in a separate process and check manually if the destination file exists.
 * https://github.com/microsoft/playwright/issues/17394
 */
function downloadFileOutOfProcess(url, destinationPath, options = {}) {
  const cp = _child_process.default.fork(_path.default.join(__dirname, 'oopDownloadMain.js'), [url, destinationPath, options.progressBarName || '', options.userAgent || '']);

  const promise = new _manualPromise.ManualPromise();
  cp.on('message', message => {
    var _options$log;

    if ((message === null || message === void 0 ? void 0 : message.method) === 'log') (_options$log = options.log) === null || _options$log === void 0 ? void 0 : _options$log.call(options, message.params.message);
  });
  cp.on('exit', code => {
    if (code !== 0) {
      promise.resolve({
        error: new Error(`Download failure, code=${code}`)
      });
      return;
    }

    if (!_fs.default.existsSync(destinationPath)) promise.resolve({
      error: new Error(`Download failure, ${destinationPath} does not exist`)
    });else promise.resolve({
      error: null
    });
  });
  cp.on('error', error => {
    promise.resolve({
      error
    });
  });
  return promise;
}

async function download(urls, destination, options = {}) {
  const {
    progressBarName = 'file',
    retryCount = 3,
    log = () => {},
    userAgent
  } = options;

  for (let attempt = 1; attempt <= retryCount; ++attempt) {
    log(`downloading ${progressBarName} - attempt #${attempt}`);
    if (!Array.isArray(urls)) urls = [urls];
    const url = urls[(attempt - 1) % urls.length];
    const {
      error
    } = await downloadFileOutOfProcess(url, destination, {
      progressBarName,
      log,
      userAgent
    });

    if (!error) {
      log(`SUCCESS downloading ${progressBarName}`);
      break;
    }

    const errorMessage = (error === null || error === void 0 ? void 0 : error.message) || '';
    log(`attempt #${attempt} - ERROR: ${errorMessage}`);
    if (attempt >= retryCount) throw error;
  }
}