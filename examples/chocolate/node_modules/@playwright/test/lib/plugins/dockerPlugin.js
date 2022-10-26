"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dockerPlugin = void 0;

var _utilsBundle = require("playwright-core/lib/utilsBundle");

var _docker = require("playwright-core/lib/containers/docker");

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
const dockerPlugin = {
  name: 'playwright:docker',

  async setup(config, configDir, rootSuite, reporter) {
    if (!process.env.PLAYWRIGHT_DOCKER) return;

    const print = text => {
      var _reporter$onStdOut;

      return (_reporter$onStdOut = reporter.onStdOut) === null || _reporter$onStdOut === void 0 ? void 0 : _reporter$onStdOut.call(reporter, text);
    };

    const println = text => {
      var _reporter$onStdOut2;

      return (_reporter$onStdOut2 = reporter.onStdOut) === null || _reporter$onStdOut2 === void 0 ? void 0 : _reporter$onStdOut2.call(reporter, text + '\n');
    };

    println(_utilsBundle.colors.dim('Using docker container to run browsers.'));
    await (0, _docker.checkDockerEngineIsRunningOrDie)();
    let info = await (0, _docker.containerInfo)();

    if (!info) {
      print(_utilsBundle.colors.dim(`Starting docker container... `));
      const time = Date.now();
      info = await (0, _docker.ensurePlaywrightContainerOrDie)();
      const deltaMs = Date.now() - time;
      println(_utilsBundle.colors.dim('Done in ' + (deltaMs / 1000).toFixed(1) + 's'));
      println(_utilsBundle.colors.dim('The Docker container will keep running after tests finished.'));
      println(_utilsBundle.colors.dim('Stop manually using:'));
      println(_utilsBundle.colors.dim('    npx playwright docker stop'));
    }

    println(_utilsBundle.colors.dim(`View screen: ${info.vncSession}`));
    println('');
    process.env.PW_TEST_CONNECT_WS_ENDPOINT = info.wsEndpoint;
    process.env.PW_TEST_CONNECT_HEADERS = JSON.stringify({
      'x-playwright-proxy': '*'
    });
  }

};
exports.dockerPlugin = dockerPlugin;