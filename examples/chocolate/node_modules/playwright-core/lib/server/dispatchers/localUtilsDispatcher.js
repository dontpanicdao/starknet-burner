"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalUtilsDispatcher = void 0;

var _events = _interopRequireDefault(require("events"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _manualPromise = require("../../utils/manualPromise");

var _utils = require("../../utils");

var _dispatcher = require("./dispatcher");

var _zipBundle = require("../../zipBundle");

var _zipFile = require("../../utils/zipFile");

var _jsonPipeDispatcher = require("../dispatchers/jsonPipeDispatcher");

var socks = _interopRequireWildcard(require("../../common/socksProxy"));

var _transport = require("../transport");

var _userAgent = require("../../common/userAgent");

var _progress = require("../progress");

var _validator = require("../../protocol/validator");

var _netUtils = require("../../common/netUtils");

var _instrumentation = require("../../server/instrumentation");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License");
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
class LocalUtilsDispatcher extends _dispatcher.Dispatcher {
  constructor(scope, playwright) {
    const localUtils = new _instrumentation.SdkObject(playwright, 'localUtils', 'localUtils');
    super(scope, localUtils, 'LocalUtils', {});
    this._type_LocalUtils = void 0;
    this._harBakends = new Map();
    this._type_LocalUtils = true;
  }

  async zip(params, metadata) {
    const promise = new _manualPromise.ManualPromise();
    const zipFile = new _zipBundle.yazl.ZipFile();
    zipFile.on('error', error => promise.reject(error));

    for (const entry of params.entries) {
      try {
        if (_fs.default.statSync(entry.value).isFile()) zipFile.addFile(entry.value, entry.name);
      } catch (e) {}
    }

    if (!_fs.default.existsSync(params.zipFile)) {
      // New file, just compress the entries.
      await _fs.default.promises.mkdir(_path.default.dirname(params.zipFile), {
        recursive: true
      });
      zipFile.end(undefined, () => {
        zipFile.outputStream.pipe(_fs.default.createWriteStream(params.zipFile)).on('close', () => promise.resolve());
      });
      return promise;
    } // File already exists. Repack and add new entries.


    const tempFile = params.zipFile + '.tmp';
    await _fs.default.promises.rename(params.zipFile, tempFile);

    _zipBundle.yauzl.open(tempFile, (err, inZipFile) => {
      if (err) {
        promise.reject(err);
        return;
      }

      (0, _utils.assert)(inZipFile);
      let pendingEntries = inZipFile.entryCount;
      inZipFile.on('entry', entry => {
        inZipFile.openReadStream(entry, (err, readStream) => {
          if (err) {
            promise.reject(err);
            return;
          }

          zipFile.addReadStream(readStream, entry.fileName);

          if (--pendingEntries === 0) {
            zipFile.end(undefined, () => {
              zipFile.outputStream.pipe(_fs.default.createWriteStream(params.zipFile)).on('close', () => {
                _fs.default.promises.unlink(tempFile).then(() => {
                  promise.resolve();
                });
              });
            });
          }
        });
      });
    });

    return promise;
  }

  async harOpen(params, metadata) {
    let harBackend;

    if (params.file.endsWith('.zip')) {
      const zipFile = new _zipFile.ZipFile(params.file);
      const entryNames = await zipFile.entries();
      const harEntryName = entryNames.find(e => e.endsWith('.har'));
      if (!harEntryName) return {
        error: 'Specified archive does not have a .har file'
      };
      const har = await zipFile.read(harEntryName);
      const harFile = JSON.parse(har.toString());
      harBackend = new HarBackend(harFile, null, zipFile);
    } else {
      const harFile = JSON.parse(await _fs.default.promises.readFile(params.file, 'utf-8'));
      harBackend = new HarBackend(harFile, _path.default.dirname(params.file), null);
    }

    this._harBakends.set(harBackend.id, harBackend);

    return {
      harId: harBackend.id
    };
  }

  async harLookup(params, metadata) {
    const harBackend = this._harBakends.get(params.harId);

    if (!harBackend) return {
      action: 'error',
      message: `Internal error: har was not opened`
    };
    return await harBackend.lookup(params.url, params.method, params.headers, params.postData, params.isNavigationRequest);
  }

  async harClose(params, metadata) {
    const harBackend = this._harBakends.get(params.harId);

    if (harBackend) {
      this._harBakends.delete(harBackend.id);

      harBackend.dispose();
    }
  }

  async harUnzip(params, metadata) {
    const dir = _path.default.dirname(params.zipFile);

    const zipFile = new _zipFile.ZipFile(params.zipFile);

    for (const entry of await zipFile.entries()) {
      const buffer = await zipFile.read(entry);
      if (entry === 'har.har') await _fs.default.promises.writeFile(params.harFile, buffer);else await _fs.default.promises.writeFile(_path.default.join(dir, entry), buffer);
    }

    zipFile.close();
    await _fs.default.promises.unlink(params.zipFile);
  }

  async connect(params, metadata) {
    const controller = new _progress.ProgressController(metadata, this._object);
    controller.setLogName('browser');
    return await controller.run(async progress => {
      const paramsHeaders = Object.assign({
        'User-Agent': (0, _userAgent.getUserAgent)()
      }, params.headers || {});
      const wsEndpoint = await urlToWSEndpoint(progress, params.wsEndpoint);
      const transport = await _transport.WebSocketTransport.connect(progress, wsEndpoint, paramsHeaders, true);
      let socksInterceptor;
      const pipe = new _jsonPipeDispatcher.JsonPipeDispatcher(this);

      transport.onmessage = json => {
        var _socksInterceptor;

        if (json.method === '__create__' && json.params.type === 'SocksSupport') socksInterceptor = new SocksInterceptor(transport, params.socksProxyRedirectPortForTest, json.params.guid);
        if ((_socksInterceptor = socksInterceptor) !== null && _socksInterceptor !== void 0 && _socksInterceptor.interceptMessage(json)) return;

        const cb = () => {
          try {
            pipe.dispatch(json);
          } catch (e) {
            transport.close();
          }
        };

        if (params.slowMo) setTimeout(cb, params.slowMo);else cb();
      };

      pipe.on('message', message => {
        transport.send(message);
      });

      transport.onclose = () => {
        var _socksInterceptor2;

        (_socksInterceptor2 = socksInterceptor) === null || _socksInterceptor2 === void 0 ? void 0 : _socksInterceptor2.cleanup();
        pipe.wasClosed();
      };

      pipe.on('close', () => transport.close());
      return {
        pipe
      };
    }, params.timeout || 0);
  }

}

exports.LocalUtilsDispatcher = LocalUtilsDispatcher;
const redirectStatus = [301, 302, 303, 307, 308];

class HarBackend {
  constructor(harFile, baseDir, zipFile) {
    this.id = (0, _utils.createGuid)();
    this._harFile = void 0;
    this._zipFile = void 0;
    this._baseDir = void 0;
    this._harFile = harFile;
    this._baseDir = baseDir;
    this._zipFile = zipFile;
  }

  async lookup(url, method, headers, postData, isNavigationRequest) {
    let entry;

    try {
      entry = await this._harFindResponse(url, method, headers, postData);
    } catch (e) {
      return {
        action: 'error',
        message: 'HAR error: ' + e.message
      };
    }

    if (!entry) return {
      action: 'noentry'
    }; // If navigation is being redirected, restart it with the final url to ensure the document's url changes.

    if (entry.request.url !== url && isNavigationRequest) return {
      action: 'redirect',
      redirectURL: entry.request.url
    };
    const response = entry.response;

    try {
      const buffer = await this._loadContent(response.content);
      return {
        action: 'fulfill',
        status: response.status,
        headers: response.headers,
        body: buffer
      };
    } catch (e) {
      return {
        action: 'error',
        message: e.message
      };
    }
  }

  async _loadContent(content) {
    const file = content._file;
    let buffer;

    if (file) {
      if (this._zipFile) buffer = await this._zipFile.read(file);else buffer = await _fs.default.promises.readFile(_path.default.resolve(this._baseDir, file));
    } else {
      buffer = Buffer.from(content.text || '', content.encoding === 'base64' ? 'base64' : 'utf-8');
    }

    return buffer;
  }

  async _harFindResponse(url, method, headers, postData) {
    const harLog = this._harFile.log;
    const visited = new Set();

    while (true) {
      const entries = [];

      for (const candidate of harLog.entries) {
        if (candidate.request.url !== url || candidate.request.method !== method) continue;

        if (method === 'POST' && postData && candidate.request.postData) {
          const buffer = await this._loadContent(candidate.request.postData);
          if (!buffer.equals(postData)) continue;
        }

        entries.push(candidate);
      }

      if (!entries.length) return;
      let entry = entries[0]; // Disambiguate using headers - then one with most matching headers wins.

      if (entries.length > 1) {
        const list = [];

        for (const candidate of entries) {
          const matchingHeaders = countMatchingHeaders(candidate.request.headers, headers);
          list.push({
            candidate,
            matchingHeaders
          });
        }

        list.sort((a, b) => b.matchingHeaders - a.matchingHeaders);
        entry = list[0].candidate;
      }

      if (visited.has(entry)) throw new Error(`Found redirect cycle for ${url}`);
      visited.add(entry); // Follow redirects.

      const locationHeader = entry.response.headers.find(h => h.name.toLowerCase() === 'location');

      if (redirectStatus.includes(entry.response.status) && locationHeader) {
        const locationURL = new URL(locationHeader.value, url);
        url = locationURL.toString();

        if ((entry.response.status === 301 || entry.response.status === 302) && method === 'POST' || entry.response.status === 303 && !['GET', 'HEAD'].includes(method)) {
          // HTTP-redirect fetch step 13 (https://fetch.spec.whatwg.org/#http-redirect-fetch)
          method = 'GET';
        }

        continue;
      }

      return entry;
    }
  }

  dispose() {
    var _this$_zipFile;

    (_this$_zipFile = this._zipFile) === null || _this$_zipFile === void 0 ? void 0 : _this$_zipFile.close();
  }

}

class SocksInterceptor {
  constructor(transport, redirectPortForTest, socksSupportObjectGuid) {
    this._handler = void 0;
    this._channel = void 0;
    this._socksSupportObjectGuid = void 0;
    this._ids = new Set();
    this._handler = new socks.SocksProxyHandler(redirectPortForTest);
    this._socksSupportObjectGuid = socksSupportObjectGuid;
    let lastId = -1;
    this._channel = new Proxy(new _events.default(), {
      get: (obj, prop) => {
        if (prop in obj || obj[prop] !== undefined || typeof prop !== 'string') return obj[prop];
        return params => {
          try {
            const id = --lastId;

            this._ids.add(id);

            const validator = (0, _validator.findValidator)('SocksSupport', prop, 'Params');
            params = validator(params, '', {
              tChannelImpl: tChannelForSocks,
              binary: 'toBase64'
            });
            transport.send({
              id,
              guid: socksSupportObjectGuid,
              method: prop,
              params,
              metadata: {
                stack: [],
                apiName: '',
                internal: true
              }
            });
          } catch (e) {}
        };
      }
    });

    this._handler.on(socks.SocksProxyHandler.Events.SocksConnected, payload => this._channel.socksConnected(payload));

    this._handler.on(socks.SocksProxyHandler.Events.SocksData, payload => this._channel.socksData(payload));

    this._handler.on(socks.SocksProxyHandler.Events.SocksError, payload => this._channel.socksError(payload));

    this._handler.on(socks.SocksProxyHandler.Events.SocksFailed, payload => this._channel.socksFailed(payload));

    this._handler.on(socks.SocksProxyHandler.Events.SocksEnd, payload => this._channel.socksEnd(payload));

    this._channel.on('socksRequested', payload => this._handler.socketRequested(payload));

    this._channel.on('socksClosed', payload => this._handler.socketClosed(payload));

    this._channel.on('socksData', payload => this._handler.sendSocketData(payload));
  }

  cleanup() {
    this._handler.cleanup();
  }

  interceptMessage(message) {
    if (this._ids.has(message.id)) {
      this._ids.delete(message.id);

      return true;
    }

    if (message.guid === this._socksSupportObjectGuid) {
      const validator = (0, _validator.findValidator)('SocksSupport', message.method, 'Event');
      const params = validator(message.params, '', {
        tChannelImpl: tChannelForSocks,
        binary: 'fromBase64'
      });

      this._channel.emit(message.method, params);

      return true;
    }

    return false;
  }

}

function countMatchingHeaders(harHeaders, headers) {
  const set = new Set(headers.map(h => h.name.toLowerCase() + ':' + h.value));
  let matches = 0;

  for (const h of harHeaders) {
    if (set.has(h.name.toLowerCase() + ':' + h.value)) ++matches;
  }

  return matches;
}

function tChannelForSocks(names, arg, path, context) {
  throw new _validator.ValidationError(`${path}: channels are not expected in SocksSupport`);
}

async function urlToWSEndpoint(progress, endpointURL) {
  if (endpointURL.startsWith('ws')) return endpointURL;
  progress.log(`<ws preparing> retrieving websocket url from ${endpointURL}`);
  const fetchUrl = new URL(endpointURL);
  if (!fetchUrl.pathname.endsWith('/')) fetchUrl.pathname += '/';
  fetchUrl.pathname += 'json';
  const json = await (0, _netUtils.fetchData)({
    url: fetchUrl.toString(),
    method: 'GET',
    timeout: progress.timeUntilDeadline(),
    headers: {
      'User-Agent': (0, _userAgent.getUserAgent)()
    }
  }, async (params, response) => {
    return new Error(`Unexpected status ${response.statusCode} when connecting to ${fetchUrl.toString()}.\n` + `This does not look like a Playwright server, try connecting via ws://.`);
  });
  progress.throwIfAborted();
  const wsUrl = new URL(endpointURL);
  let wsEndpointPath = JSON.parse(json).wsEndpointPath;
  if (wsEndpointPath.startsWith('/')) wsEndpointPath = wsEndpointPath.substring(1);
  if (!wsUrl.pathname.endsWith('/')) wsUrl.pathname += '/';
  wsUrl.pathname += wsEndpointPath;
  wsUrl.protocol = wsUrl.protocol === 'https:' ? 'wss:' : 'ws:';
  return wsUrl.toString();
}