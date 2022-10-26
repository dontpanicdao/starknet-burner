import require$$0$1 from 'assert';
import require$$4 from 'net';
import require$$2 from 'http';
import require$$0$2 from 'stream';
import require$$6 from 'buffer';
import require$$0 from 'util';
import require$$8 from 'querystring';
import require$$12, { ReadableStream as ReadableStream$1, TransformStream, WritableStream } from 'stream/web';
import require$$1 from 'perf_hooks';
import require$$4$1 from 'util/types';
import require$$0$3 from 'events';
import require$$4$2 from 'tls';
import require$$3 from 'async_hooks';
import 'console';
import 'url';
import require$$3$1 from 'zlib';
import { webcrypto } from 'crypto';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var symbols$1 = {
  kClose: Symbol('close'),
  kDestroy: Symbol('destroy'),
  kDispatch: Symbol('dispatch'),
  kUrl: Symbol('url'),
  kWriting: Symbol('writing'),
  kResuming: Symbol('resuming'),
  kQueue: Symbol('queue'),
  kConnect: Symbol('connect'),
  kConnecting: Symbol('connecting'),
  kHeadersList: Symbol('headers list'),
  kKeepAliveDefaultTimeout: Symbol('default keep alive timeout'),
  kKeepAliveMaxTimeout: Symbol('max keep alive timeout'),
  kKeepAliveTimeoutThreshold: Symbol('keep alive timeout threshold'),
  kKeepAliveTimeoutValue: Symbol('keep alive timeout'),
  kKeepAlive: Symbol('keep alive'),
  kHeadersTimeout: Symbol('headers timeout'),
  kBodyTimeout: Symbol('body timeout'),
  kServerName: Symbol('server name'),
  kHost: Symbol('host'),
  kNoRef: Symbol('no ref'),
  kBodyUsed: Symbol('used'),
  kRunning: Symbol('running'),
  kBlocking: Symbol('blocking'),
  kPending: Symbol('pending'),
  kSize: Symbol('size'),
  kBusy: Symbol('busy'),
  kQueued: Symbol('queued'),
  kFree: Symbol('free'),
  kConnected: Symbol('connected'),
  kClosed: Symbol('closed'),
  kNeedDrain: Symbol('need drain'),
  kReset: Symbol('reset'),
  kDestroyed: Symbol('destroyed'),
  kMaxHeadersSize: Symbol('max headers size'),
  kRunningIdx: Symbol('running index'),
  kPendingIdx: Symbol('pending index'),
  kError: Symbol('error'),
  kClients: Symbol('clients'),
  kClient: Symbol('client'),
  kParser: Symbol('parser'),
  kOnDestroyed: Symbol('destroy callbacks'),
  kPipelining: Symbol('pipelinig'),
  kSocket: Symbol('socket'),
  kHostHeader: Symbol('host header'),
  kConnector: Symbol('connector'),
  kStrictContentLength: Symbol('strict content length'),
  kMaxRedirections: Symbol('maxRedirections'),
  kMaxRequests: Symbol('maxRequestsPerClient'),
  kProxy: Symbol('proxy agent options'),
  kCounter: Symbol('socket request counter'),
  kInterceptors: Symbol('dispatch interceptors')
};

class UndiciError extends Error {
  constructor (message) {
    super(message);
    this.name = 'UndiciError';
    this.code = 'UND_ERR';
  }
}

class ConnectTimeoutError$1 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, ConnectTimeoutError$1);
    this.name = 'ConnectTimeoutError';
    this.message = message || 'Connect Timeout Error';
    this.code = 'UND_ERR_CONNECT_TIMEOUT';
  }
}

class HeadersTimeoutError$1 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, HeadersTimeoutError$1);
    this.name = 'HeadersTimeoutError';
    this.message = message || 'Headers Timeout Error';
    this.code = 'UND_ERR_HEADERS_TIMEOUT';
  }
}

class HeadersOverflowError$1 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, HeadersOverflowError$1);
    this.name = 'HeadersOverflowError';
    this.message = message || 'Headers Overflow Error';
    this.code = 'UND_ERR_HEADERS_OVERFLOW';
  }
}

class BodyTimeoutError$1 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, BodyTimeoutError$1);
    this.name = 'BodyTimeoutError';
    this.message = message || 'Body Timeout Error';
    this.code = 'UND_ERR_BODY_TIMEOUT';
  }
}

class ResponseStatusCodeError$1 extends UndiciError {
  constructor (message, statusCode, headers, body) {
    super(message);
    Error.captureStackTrace(this, ResponseStatusCodeError$1);
    this.name = 'ResponseStatusCodeError';
    this.message = message || 'Response Status Code Error';
    this.code = 'UND_ERR_RESPONSE_STATUS_CODE';
    this.body = body;
    this.status = statusCode;
    this.statusCode = statusCode;
    this.headers = headers;
  }
}

class InvalidArgumentError$f extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, InvalidArgumentError$f);
    this.name = 'InvalidArgumentError';
    this.message = message || 'Invalid Argument Error';
    this.code = 'UND_ERR_INVALID_ARG';
  }
}

class InvalidReturnValueError$2 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, InvalidReturnValueError$2);
    this.name = 'InvalidReturnValueError';
    this.message = message || 'Invalid Return Value Error';
    this.code = 'UND_ERR_INVALID_RETURN_VALUE';
  }
}

class RequestAbortedError$8 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, RequestAbortedError$8);
    this.name = 'AbortError';
    this.message = message || 'Request aborted';
    this.code = 'UND_ERR_ABORTED';
  }
}

class InformationalError$1 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, InformationalError$1);
    this.name = 'InformationalError';
    this.message = message || 'Request information';
    this.code = 'UND_ERR_INFO';
  }
}

class RequestContentLengthMismatchError$1 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, RequestContentLengthMismatchError$1);
    this.name = 'RequestContentLengthMismatchError';
    this.message = message || 'Request body length does not match content-length header';
    this.code = 'UND_ERR_REQ_CONTENT_LENGTH_MISMATCH';
  }
}

class ResponseContentLengthMismatchError$1 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, ResponseContentLengthMismatchError$1);
    this.name = 'ResponseContentLengthMismatchError';
    this.message = message || 'Response body length does not match content-length header';
    this.code = 'UND_ERR_RES_CONTENT_LENGTH_MISMATCH';
  }
}

class ClientDestroyedError$1 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, ClientDestroyedError$1);
    this.name = 'ClientDestroyedError';
    this.message = message || 'The client is destroyed';
    this.code = 'UND_ERR_DESTROYED';
  }
}

class ClientClosedError$1 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, ClientClosedError$1);
    this.name = 'ClientClosedError';
    this.message = message || 'The client is closed';
    this.code = 'UND_ERR_CLOSED';
  }
}

class SocketError$3 extends UndiciError {
  constructor (message, socket) {
    super(message);
    Error.captureStackTrace(this, SocketError$3);
    this.name = 'SocketError';
    this.message = message || 'Socket error';
    this.code = 'UND_ERR_SOCKET';
    this.socket = socket;
  }
}

class NotSupportedError$2 extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, NotSupportedError$2);
    this.name = 'NotSupportedError';
    this.message = message || 'Not supported error';
    this.code = 'UND_ERR_NOT_SUPPORTED';
  }
}

class BalancedPoolMissingUpstreamError extends UndiciError {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, NotSupportedError$2);
    this.name = 'MissingUpstreamError';
    this.message = message || 'No upstream has been added to the BalancedPool';
    this.code = 'UND_ERR_BPL_MISSING_UPSTREAM';
  }
}

class HTTPParserError$1 extends Error {
  constructor (message, code, data) {
    super(message);
    Error.captureStackTrace(this, HTTPParserError$1);
    this.name = 'HTTPParserError';
    this.code = code ? `HPE_${code}` : undefined;
    this.data = data ? data.toString() : undefined;
  }
}

var errors$1 = {
  HTTPParserError: HTTPParserError$1,
  UndiciError,
  HeadersTimeoutError: HeadersTimeoutError$1,
  HeadersOverflowError: HeadersOverflowError$1,
  BodyTimeoutError: BodyTimeoutError$1,
  RequestContentLengthMismatchError: RequestContentLengthMismatchError$1,
  ConnectTimeoutError: ConnectTimeoutError$1,
  ResponseStatusCodeError: ResponseStatusCodeError$1,
  InvalidArgumentError: InvalidArgumentError$f,
  InvalidReturnValueError: InvalidReturnValueError$2,
  RequestAbortedError: RequestAbortedError$8,
  ClientDestroyedError: ClientDestroyedError$1,
  ClientClosedError: ClientClosedError$1,
  InformationalError: InformationalError$1,
  SocketError: SocketError$3,
  NotSupportedError: NotSupportedError$2,
  ResponseContentLengthMismatchError: ResponseContentLengthMismatchError$1,
  BalancedPoolMissingUpstreamError
};

const assert$7 = require$$0$1;
const { kDestroyed: kDestroyed$1, kBodyUsed: kBodyUsed$1 } = symbols$1;
const { IncomingMessage } = require$$2;
const stream$1 = require$$0$2;
const net$2 = require$$4;
const { InvalidArgumentError: InvalidArgumentError$e } = errors$1;
const { Blob: Blob$1 } = require$$6;
const nodeUtil = require$$0;
const { stringify } = require$$8;

function nop () {}

function isStream (obj) {
  return obj && typeof obj.pipe === 'function'
}

// based on https://github.com/node-fetch/fetch-blob/blob/8ab587d34080de94140b54f07168451e7d0b655e/index.js#L229-L241 (MIT License)
function isBlobLike (object) {
  return (Blob$1 && object instanceof Blob$1) || (
    object &&
    typeof object === 'object' &&
    (typeof object.stream === 'function' ||
      typeof object.arrayBuffer === 'function') &&
    /^(Blob|File)$/.test(object[Symbol.toStringTag])
  )
}

function buildURL (url, queryParams) {
  if (url.includes('?') || url.includes('#')) {
    throw new Error('Query params cannot be passed when url already contains "?" or "#".')
  }

  const stringified = stringify(queryParams);

  if (stringified) {
    url += '?' + stringified;
  }

  return url
}

function parseURL (url) {
  if (typeof url === 'string') {
    url = new URL(url);
  }

  if (!url || typeof url !== 'object') {
    throw new InvalidArgumentError$e('invalid url')
  }

  if (url.port != null && url.port !== '' && !Number.isFinite(parseInt(url.port))) {
    throw new InvalidArgumentError$e('invalid port')
  }

  if (url.path != null && typeof url.path !== 'string') {
    throw new InvalidArgumentError$e('invalid path')
  }

  if (url.pathname != null && typeof url.pathname !== 'string') {
    throw new InvalidArgumentError$e('invalid pathname')
  }

  if (url.hostname != null && typeof url.hostname !== 'string') {
    throw new InvalidArgumentError$e('invalid hostname')
  }

  if (url.origin != null && typeof url.origin !== 'string') {
    throw new InvalidArgumentError$e('invalid origin')
  }

  if (!/^https?:/.test(url.origin || url.protocol)) {
    throw new InvalidArgumentError$e('invalid protocol')
  }

  if (!(url instanceof URL)) {
    const port = url.port != null
      ? url.port
      : (url.protocol === 'https:' ? 443 : 80);
    let origin = url.origin != null
      ? url.origin
      : `${url.protocol}//${url.hostname}:${port}`;
    let path = url.path != null
      ? url.path
      : `${url.pathname || ''}${url.search || ''}`;

    if (origin.endsWith('/')) {
      origin = origin.substring(0, origin.length - 1);
    }

    if (path && !path.startsWith('/')) {
      path = `/${path}`;
    }
    // new URL(path, origin) is unsafe when `path` contains an absolute URL
    // From https://developer.mozilla.org/en-US/docs/Web/API/URL/URL:
    // If first parameter is a relative URL, second param is required, and will be used as the base URL.
    // If first parameter is an absolute URL, a given second param will be ignored.
    url = new URL(origin + path);
  }

  return url
}

function parseOrigin (url) {
  url = parseURL(url);

  if (url.pathname !== '/' || url.search || url.hash) {
    throw new InvalidArgumentError$e('invalid url')
  }

  return url
}

function getHostname (host) {
  if (host[0] === '[') {
    const idx = host.indexOf(']');

    assert$7(idx !== -1);
    return host.substr(1, idx - 1)
  }

  const idx = host.indexOf(':');
  if (idx === -1) return host

  return host.substr(0, idx)
}

// IP addresses are not valid server names per RFC6066
// > Currently, the only server names supported are DNS hostnames
function getServerName (host) {
  if (!host) {
    return null
  }

  assert$7.strictEqual(typeof host, 'string');

  const servername = getHostname(host);
  if (net$2.isIP(servername)) {
    return ''
  }

  return servername
}

function deepClone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function isAsyncIterable (obj) {
  return !!(obj != null && typeof obj[Symbol.asyncIterator] === 'function')
}

function isIterable (obj) {
  return !!(obj != null && (typeof obj[Symbol.iterator] === 'function' || typeof obj[Symbol.asyncIterator] === 'function'))
}

function bodyLength (body) {
  if (body == null) {
    return 0
  } else if (isStream(body)) {
    const state = body._readableState;
    return state && state.ended === true && Number.isFinite(state.length)
      ? state.length
      : null
  } else if (isBlobLike(body)) {
    return body.size != null ? body.size : null
  } else if (isBuffer(body)) {
    return body.byteLength
  }

  return null
}

function isDestroyed (stream) {
  return !stream || !!(stream.destroyed || stream[kDestroyed$1])
}

function isReadableAborted (stream) {
  const state = stream && stream._readableState;
  return isDestroyed(stream) && state && !state.endEmitted
}

function destroy (stream, err) {
  if (!isStream(stream) || isDestroyed(stream)) {
    return
  }

  if (typeof stream.destroy === 'function') {
    if (Object.getPrototypeOf(stream).constructor === IncomingMessage) {
      // See: https://github.com/nodejs/node/pull/38505/files
      stream.socket = null;
    }
    stream.destroy(err);
  } else if (err) {
    process.nextTick((stream, err) => {
      stream.emit('error', err);
    }, stream, err);
  }

  if (stream.destroyed !== true) {
    stream[kDestroyed$1] = true;
  }
}

const KEEPALIVE_TIMEOUT_EXPR = /timeout=(\d+)/;
function parseKeepAliveTimeout (val) {
  const m = val.toString().match(KEEPALIVE_TIMEOUT_EXPR);
  return m ? parseInt(m[1], 10) * 1000 : null
}

function parseHeaders (headers, obj = {}) {
  for (let i = 0; i < headers.length; i += 2) {
    const key = headers[i].toString().toLowerCase();
    let val = obj[key];
    if (!val) {
      if (Array.isArray(headers[i + 1])) {
        obj[key] = headers[i + 1];
      } else {
        obj[key] = headers[i + 1].toString();
      }
    } else {
      if (!Array.isArray(val)) {
        val = [val];
        obj[key] = val;
      }
      val.push(headers[i + 1].toString());
    }
  }
  return obj
}

function parseRawHeaders (headers) {
  return headers.map(header => header.toString())
}

function isBuffer (buffer) {
  // See, https://github.com/mcollina/undici/pull/319
  return buffer instanceof Uint8Array || Buffer.isBuffer(buffer)
}

function validateHandler (handler, method, upgrade) {
  if (!handler || typeof handler !== 'object') {
    throw new InvalidArgumentError$e('handler must be an object')
  }

  if (typeof handler.onConnect !== 'function') {
    throw new InvalidArgumentError$e('invalid onConnect method')
  }

  if (typeof handler.onError !== 'function') {
    throw new InvalidArgumentError$e('invalid onError method')
  }

  if (typeof handler.onBodySent !== 'function' && handler.onBodySent !== undefined) {
    throw new InvalidArgumentError$e('invalid onBodySent method')
  }

  if (upgrade || method === 'CONNECT') {
    if (typeof handler.onUpgrade !== 'function') {
      throw new InvalidArgumentError$e('invalid onUpgrade method')
    }
  } else {
    if (typeof handler.onHeaders !== 'function') {
      throw new InvalidArgumentError$e('invalid onHeaders method')
    }

    if (typeof handler.onData !== 'function') {
      throw new InvalidArgumentError$e('invalid onData method')
    }

    if (typeof handler.onComplete !== 'function') {
      throw new InvalidArgumentError$e('invalid onComplete method')
    }
  }
}

// A body is disturbed if it has been read from and it cannot
// be re-used without losing state or data.
function isDisturbed (body) {
  return !!(body && (
    stream$1.isDisturbed
      ? stream$1.isDisturbed(body) || body[kBodyUsed$1] // TODO (fix): Why is body[kBodyUsed] needed?
      : body[kBodyUsed$1] ||
        body.readableDidRead ||
        (body._readableState && body._readableState.dataEmitted) ||
        isReadableAborted(body)
  ))
}

function isErrored (body) {
  return !!(body && (
    stream$1.isErrored
      ? stream$1.isErrored(body)
      : /state: 'errored'/.test(nodeUtil.inspect(body)
      )))
}

function isReadable (body) {
  return !!(body && (
    stream$1.isReadable
      ? stream$1.isReadable(body)
      : /state: 'readable'/.test(nodeUtil.inspect(body)
      )))
}

function getSocketInfo (socket) {
  return {
    localAddress: socket.localAddress,
    localPort: socket.localPort,
    remoteAddress: socket.remoteAddress,
    remotePort: socket.remotePort,
    remoteFamily: socket.remoteFamily,
    timeout: socket.timeout,
    bytesWritten: socket.bytesWritten,
    bytesRead: socket.bytesRead
  }
}

let ReadableStream;
function ReadableStreamFrom$1 (iterable) {
  if (!ReadableStream) {
    ReadableStream = require$$12.ReadableStream;
  }

  if (ReadableStream.from) {
    // https://github.com/whatwg/streams/pull/1083
    return ReadableStream.from(iterable)
  }

  let iterator;
  return new ReadableStream(
    {
      async start () {
        iterator = iterable[Symbol.asyncIterator]();
      },
      async pull (controller) {
        const { done, value } = await iterator.next();
        if (done) {
          queueMicrotask(() => {
            controller.close();
          });
        } else {
          const buf = Buffer.isBuffer(value) ? value : Buffer.from(value);
          controller.enqueue(new Uint8Array(buf));
        }
        return controller.desiredSize > 0
      },
      async cancel (reason) {
        await iterator.return();
      }
    },
    0
  )
}

function isFormDataLike (chunk) {
  return chunk && chunk.constructor && chunk.constructor.name === 'FormData'
}

const kEnumerableProperty = Object.create(null);
kEnumerableProperty.enumerable = true;

var util$e = {
  kEnumerableProperty,
  nop,
  isDisturbed,
  isErrored,
  isReadable,
  toUSVString: nodeUtil.toUSVString || ((val) => `${val}`),
  isReadableAborted,
  isBlobLike,
  parseOrigin,
  parseURL,
  getServerName,
  isStream,
  isIterable,
  isAsyncIterable,
  isDestroyed,
  parseRawHeaders,
  parseHeaders,
  parseKeepAliveTimeout,
  destroy,
  bodyLength,
  deepClone,
  ReadableStreamFrom: ReadableStreamFrom$1,
  isBuffer,
  validateHandler,
  getSocketInfo,
  isFormDataLike,
  buildURL
};

var utils$1;
var hasRequiredUtils$1;

function requireUtils$1 () {
	if (hasRequiredUtils$1) return utils$1;
	hasRequiredUtils$1 = 1;

	function parseContentType(str) {
	  if (str.length === 0)
	    return;

	  const params = Object.create(null);
	  let i = 0;

	  // Parse type
	  for (; i < str.length; ++i) {
	    const code = str.charCodeAt(i);
	    if (TOKEN[code] !== 1) {
	      if (code !== 47/* '/' */ || i === 0)
	        return;
	      break;
	    }
	  }
	  // Check for type without subtype
	  if (i === str.length)
	    return;

	  const type = str.slice(0, i).toLowerCase();

	  // Parse subtype
	  const subtypeStart = ++i;
	  for (; i < str.length; ++i) {
	    const code = str.charCodeAt(i);
	    if (TOKEN[code] !== 1) {
	      // Make sure we have a subtype
	      if (i === subtypeStart)
	        return;

	      if (parseContentTypeParams(str, i, params) === undefined)
	        return;
	      break;
	    }
	  }
	  // Make sure we have a subtype
	  if (i === subtypeStart)
	    return;

	  const subtype = str.slice(subtypeStart, i).toLowerCase();

	  return { type, subtype, params };
	}

	function parseContentTypeParams(str, i, params) {
	  while (i < str.length) {
	    // Consume whitespace
	    for (; i < str.length; ++i) {
	      const code = str.charCodeAt(i);
	      if (code !== 32/* ' ' */ && code !== 9/* '\t' */)
	        break;
	    }

	    // Ended on whitespace
	    if (i === str.length)
	      break;

	    // Check for malformed parameter
	    if (str.charCodeAt(i++) !== 59/* ';' */)
	      return;

	    // Consume whitespace
	    for (; i < str.length; ++i) {
	      const code = str.charCodeAt(i);
	      if (code !== 32/* ' ' */ && code !== 9/* '\t' */)
	        break;
	    }

	    // Ended on whitespace (malformed)
	    if (i === str.length)
	      return;

	    let name;
	    const nameStart = i;
	    // Parse parameter name
	    for (; i < str.length; ++i) {
	      const code = str.charCodeAt(i);
	      if (TOKEN[code] !== 1) {
	        if (code !== 61/* '=' */)
	          return;
	        break;
	      }
	    }

	    // No value (malformed)
	    if (i === str.length)
	      return;

	    name = str.slice(nameStart, i);
	    ++i; // Skip over '='

	    // No value (malformed)
	    if (i === str.length)
	      return;

	    let value = '';
	    let valueStart;
	    if (str.charCodeAt(i) === 34/* '"' */) {
	      valueStart = ++i;
	      let escaping = false;
	      // Parse quoted value
	      for (; i < str.length; ++i) {
	        const code = str.charCodeAt(i);
	        if (code === 92/* '\\' */) {
	          if (escaping) {
	            valueStart = i;
	            escaping = false;
	          } else {
	            value += str.slice(valueStart, i);
	            escaping = true;
	          }
	          continue;
	        }
	        if (code === 34/* '"' */) {
	          if (escaping) {
	            valueStart = i;
	            escaping = false;
	            continue;
	          }
	          value += str.slice(valueStart, i);
	          break;
	        }
	        if (escaping) {
	          valueStart = i - 1;
	          escaping = false;
	        }
	        // Invalid unescaped quoted character (malformed)
	        if (QDTEXT[code] !== 1)
	          return;
	      }

	      // No end quote (malformed)
	      if (i === str.length)
	        return;

	      ++i; // Skip over double quote
	    } else {
	      valueStart = i;
	      // Parse unquoted value
	      for (; i < str.length; ++i) {
	        const code = str.charCodeAt(i);
	        if (TOKEN[code] !== 1) {
	          // No value (malformed)
	          if (i === valueStart)
	            return;
	          break;
	        }
	      }
	      value = str.slice(valueStart, i);
	    }

	    name = name.toLowerCase();
	    if (params[name] === undefined)
	      params[name] = value;
	  }

	  return params;
	}

	function parseDisposition(str, defDecoder) {
	  if (str.length === 0)
	    return;

	  const params = Object.create(null);
	  let i = 0;

	  for (; i < str.length; ++i) {
	    const code = str.charCodeAt(i);
	    if (TOKEN[code] !== 1) {
	      if (parseDispositionParams(str, i, params, defDecoder) === undefined)
	        return;
	      break;
	    }
	  }

	  const type = str.slice(0, i).toLowerCase();

	  return { type, params };
	}

	function parseDispositionParams(str, i, params, defDecoder) {
	  while (i < str.length) {
	    // Consume whitespace
	    for (; i < str.length; ++i) {
	      const code = str.charCodeAt(i);
	      if (code !== 32/* ' ' */ && code !== 9/* '\t' */)
	        break;
	    }

	    // Ended on whitespace
	    if (i === str.length)
	      break;

	    // Check for malformed parameter
	    if (str.charCodeAt(i++) !== 59/* ';' */)
	      return;

	    // Consume whitespace
	    for (; i < str.length; ++i) {
	      const code = str.charCodeAt(i);
	      if (code !== 32/* ' ' */ && code !== 9/* '\t' */)
	        break;
	    }

	    // Ended on whitespace (malformed)
	    if (i === str.length)
	      return;

	    let name;
	    const nameStart = i;
	    // Parse parameter name
	    for (; i < str.length; ++i) {
	      const code = str.charCodeAt(i);
	      if (TOKEN[code] !== 1) {
	        if (code === 61/* '=' */)
	          break;
	        return;
	      }
	    }

	    // No value (malformed)
	    if (i === str.length)
	      return;

	    let value = '';
	    let valueStart;
	    let charset;
	    //~ let lang;
	    name = str.slice(nameStart, i);
	    if (name.charCodeAt(name.length - 1) === 42/* '*' */) {
	      // Extended value

	      const charsetStart = ++i;
	      // Parse charset name
	      for (; i < str.length; ++i) {
	        const code = str.charCodeAt(i);
	        if (CHARSET[code] !== 1) {
	          if (code !== 39/* '\'' */)
	            return;
	          break;
	        }
	      }

	      // Incomplete charset (malformed)
	      if (i === str.length)
	        return;

	      charset = str.slice(charsetStart, i);
	      ++i; // Skip over the '\''

	      //~ const langStart = ++i;
	      // Parse language name
	      for (; i < str.length; ++i) {
	        const code = str.charCodeAt(i);
	        if (code === 39/* '\'' */)
	          break;
	      }

	      // Incomplete language (malformed)
	      if (i === str.length)
	        return;

	      //~ lang = str.slice(langStart, i);
	      ++i; // Skip over the '\''

	      // No value (malformed)
	      if (i === str.length)
	        return;

	      valueStart = i;

	      let encode = 0;
	      // Parse value
	      for (; i < str.length; ++i) {
	        const code = str.charCodeAt(i);
	        if (EXTENDED_VALUE[code] !== 1) {
	          if (code === 37/* '%' */) {
	            let hexUpper;
	            let hexLower;
	            if (i + 2 < str.length
	                && (hexUpper = HEX_VALUES[str.charCodeAt(i + 1)]) !== -1
	                && (hexLower = HEX_VALUES[str.charCodeAt(i + 2)]) !== -1) {
	              const byteVal = (hexUpper << 4) + hexLower;
	              value += str.slice(valueStart, i);
	              value += String.fromCharCode(byteVal);
	              i += 2;
	              valueStart = i + 1;
	              if (byteVal >= 128)
	                encode = 2;
	              else if (encode === 0)
	                encode = 1;
	              continue;
	            }
	            // '%' disallowed in non-percent encoded contexts (malformed)
	            return;
	          }
	          break;
	        }
	      }

	      value += str.slice(valueStart, i);
	      value = convertToUTF8(value, charset, encode);
	      if (value === undefined)
	        return;
	    } else {
	      // Non-extended value

	      ++i; // Skip over '='

	      // No value (malformed)
	      if (i === str.length)
	        return;

	      if (str.charCodeAt(i) === 34/* '"' */) {
	        valueStart = ++i;
	        let escaping = false;
	        // Parse quoted value
	        for (; i < str.length; ++i) {
	          const code = str.charCodeAt(i);
	          if (code === 92/* '\\' */) {
	            if (escaping) {
	              valueStart = i;
	              escaping = false;
	            } else {
	              value += str.slice(valueStart, i);
	              escaping = true;
	            }
	            continue;
	          }
	          if (code === 34/* '"' */) {
	            if (escaping) {
	              valueStart = i;
	              escaping = false;
	              continue;
	            }
	            value += str.slice(valueStart, i);
	            break;
	          }
	          if (escaping) {
	            valueStart = i - 1;
	            escaping = false;
	          }
	          // Invalid unescaped quoted character (malformed)
	          if (QDTEXT[code] !== 1)
	            return;
	        }

	        // No end quote (malformed)
	        if (i === str.length)
	          return;

	        ++i; // Skip over double quote
	      } else {
	        valueStart = i;
	        // Parse unquoted value
	        for (; i < str.length; ++i) {
	          const code = str.charCodeAt(i);
	          if (TOKEN[code] !== 1) {
	            // No value (malformed)
	            if (i === valueStart)
	              return;
	            break;
	          }
	        }
	        value = str.slice(valueStart, i);
	      }

	      value = defDecoder(value, 2);
	      if (value === undefined)
	        return;
	    }

	    name = name.toLowerCase();
	    if (params[name] === undefined)
	      params[name] = value;
	  }

	  return params;
	}

	function getDecoder(charset) {
	  let lc;
	  while (true) {
	    switch (charset) {
	      case 'utf-8':
	      case 'utf8':
	        return decoders.utf8;
	      case 'latin1':
	      case 'ascii': // TODO: Make these a separate, strict decoder?
	      case 'us-ascii':
	      case 'iso-8859-1':
	      case 'iso8859-1':
	      case 'iso88591':
	      case 'iso_8859-1':
	      case 'windows-1252':
	      case 'iso_8859-1:1987':
	      case 'cp1252':
	      case 'x-cp1252':
	        return decoders.latin1;
	      case 'utf16le':
	      case 'utf-16le':
	      case 'ucs2':
	      case 'ucs-2':
	        return decoders.utf16le;
	      case 'base64':
	        return decoders.base64;
	      default:
	        if (lc === undefined) {
	          lc = true;
	          charset = charset.toLowerCase();
	          continue;
	        }
	        return decoders.other.bind(charset);
	    }
	  }
	}

	const decoders = {
	  utf8: (data, hint) => {
	    if (data.length === 0)
	      return '';
	    if (typeof data === 'string') {
	      // If `data` never had any percent-encoded bytes or never had any that
	      // were outside of the ASCII range, then we can safely just return the
	      // input since UTF-8 is ASCII compatible
	      if (hint < 2)
	        return data;

	      data = Buffer.from(data, 'latin1');
	    }
	    return data.utf8Slice(0, data.length);
	  },

	  latin1: (data, hint) => {
	    if (data.length === 0)
	      return '';
	    if (typeof data === 'string')
	      return data;
	    return data.latin1Slice(0, data.length);
	  },

	  utf16le: (data, hint) => {
	    if (data.length === 0)
	      return '';
	    if (typeof data === 'string')
	      data = Buffer.from(data, 'latin1');
	    return data.ucs2Slice(0, data.length);
	  },

	  base64: (data, hint) => {
	    if (data.length === 0)
	      return '';
	    if (typeof data === 'string')
	      data = Buffer.from(data, 'latin1');
	    return data.base64Slice(0, data.length);
	  },

	  other: (data, hint) => {
	    if (data.length === 0)
	      return '';
	    if (typeof data === 'string')
	      data = Buffer.from(data, 'latin1');
	    try {
	      const decoder = new TextDecoder(this);
	      return decoder.decode(data);
	    } catch {}
	  },
	};

	function convertToUTF8(data, charset, hint) {
	  const decode = getDecoder(charset);
	  if (decode)
	    return decode(data, hint);
	}

	function basename(path) {
	  if (typeof path !== 'string')
	    return '';
	  for (let i = path.length - 1; i >= 0; --i) {
	    switch (path.charCodeAt(i)) {
	      case 0x2F: // '/'
	      case 0x5C: // '\'
	        path = path.slice(i + 1);
	        return (path === '..' || path === '.' ? '' : path);
	    }
	  }
	  return (path === '..' || path === '.' ? '' : path);
	}

	const TOKEN = [
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
	  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	];

	const QDTEXT = [
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

	const CHARSET = [
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
	  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	];

	const EXTENDED_VALUE = [
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
	  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	];

	/* eslint-disable no-multi-spaces */
	const HEX_VALUES = [
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	   0,  1,  2,  3,  4,  5,  6,  7,  8,  9, -1, -1, -1, -1, -1, -1,
	  -1, 10, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, 10, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	];
	/* eslint-enable no-multi-spaces */

	utils$1 = {
	  basename,
	  convertToUTF8,
	  getDecoder,
	  parseContentType,
	  parseDisposition,
	};
	return utils$1;
}

var sbmh;
var hasRequiredSbmh;

function requireSbmh () {
	if (hasRequiredSbmh) return sbmh;
	hasRequiredSbmh = 1;
	/*
	  Based heavily on the Streaming Boyer-Moore-Horspool C++ implementation
	  by Hongli Lai at: https://github.com/FooBarWidget/boyer-moore-horspool
	*/
	function memcmp(buf1, pos1, buf2, pos2, num) {
	  for (let i = 0; i < num; ++i) {
	    if (buf1[pos1 + i] !== buf2[pos2 + i])
	      return false;
	  }
	  return true;
	}

	class SBMH {
	  constructor(needle, cb) {
	    if (typeof cb !== 'function')
	      throw new Error('Missing match callback');

	    if (typeof needle === 'string')
	      needle = Buffer.from(needle);
	    else if (!Buffer.isBuffer(needle))
	      throw new Error(`Expected Buffer for needle, got ${typeof needle}`);

	    const needleLen = needle.length;

	    this.maxMatches = Infinity;
	    this.matches = 0;

	    this._cb = cb;
	    this._lookbehindSize = 0;
	    this._needle = needle;
	    this._bufPos = 0;

	    this._lookbehind = Buffer.allocUnsafe(needleLen);

	    // Initialize occurrence table.
	    this._occ = [
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen, needleLen, needleLen,
	      needleLen, needleLen, needleLen, needleLen
	    ];

	    // Populate occurrence table with analysis of the needle, ignoring the last
	    // letter.
	    if (needleLen > 1) {
	      for (let i = 0; i < needleLen - 1; ++i)
	        this._occ[needle[i]] = needleLen - 1 - i;
	    }
	  }

	  reset() {
	    this.matches = 0;
	    this._lookbehindSize = 0;
	    this._bufPos = 0;
	  }

	  push(chunk, pos) {
	    let result;
	    if (!Buffer.isBuffer(chunk))
	      chunk = Buffer.from(chunk, 'latin1');
	    const chunkLen = chunk.length;
	    this._bufPos = pos || 0;
	    while (result !== chunkLen && this.matches < this.maxMatches)
	      result = feed(this, chunk);
	    return result;
	  }

	  destroy() {
	    const lbSize = this._lookbehindSize;
	    if (lbSize)
	      this._cb(false, this._lookbehind, 0, lbSize, false);
	    this.reset();
	  }
	}

	function feed(self, data) {
	  const len = data.length;
	  const needle = self._needle;
	  const needleLen = needle.length;

	  // Positive: points to a position in `data`
	  //           pos == 3 points to data[3]
	  // Negative: points to a position in the lookbehind buffer
	  //           pos == -2 points to lookbehind[lookbehindSize - 2]
	  let pos = -self._lookbehindSize;
	  const lastNeedleCharPos = needleLen - 1;
	  const lastNeedleChar = needle[lastNeedleCharPos];
	  const end = len - needleLen;
	  const occ = self._occ;
	  const lookbehind = self._lookbehind;

	  if (pos < 0) {
	    // Lookbehind buffer is not empty. Perform Boyer-Moore-Horspool
	    // search with character lookup code that considers both the
	    // lookbehind buffer and the current round's haystack data.
	    //
	    // Loop until
	    //   there is a match.
	    // or until
	    //   we've moved past the position that requires the
	    //   lookbehind buffer. In this case we switch to the
	    //   optimized loop.
	    // or until
	    //   the character to look at lies outside the haystack.
	    while (pos < 0 && pos <= end) {
	      const nextPos = pos + lastNeedleCharPos;
	      const ch = (nextPos < 0
	                  ? lookbehind[self._lookbehindSize + nextPos]
	                  : data[nextPos]);

	      if (ch === lastNeedleChar
	          && matchNeedle(self, data, pos, lastNeedleCharPos)) {
	        self._lookbehindSize = 0;
	        ++self.matches;
	        if (pos > -self._lookbehindSize)
	          self._cb(true, lookbehind, 0, self._lookbehindSize + pos, false);
	        else
	          self._cb(true, undefined, 0, 0, true);

	        return (self._bufPos = pos + needleLen);
	      }

	      pos += occ[ch];
	    }

	    // No match.

	    // There's too few data for Boyer-Moore-Horspool to run,
	    // so let's use a different algorithm to skip as much as
	    // we can.
	    // Forward pos until
	    //   the trailing part of lookbehind + data
	    //   looks like the beginning of the needle
	    // or until
	    //   pos == 0
	    while (pos < 0 && !matchNeedle(self, data, pos, len - pos))
	      ++pos;

	    if (pos < 0) {
	      // Cut off part of the lookbehind buffer that has
	      // been processed and append the entire haystack
	      // into it.
	      const bytesToCutOff = self._lookbehindSize + pos;

	      if (bytesToCutOff > 0) {
	        // The cut off data is guaranteed not to contain the needle.
	        self._cb(false, lookbehind, 0, bytesToCutOff, false);
	      }

	      self._lookbehindSize -= bytesToCutOff;
	      lookbehind.copy(lookbehind, 0, bytesToCutOff, self._lookbehindSize);
	      lookbehind.set(data, self._lookbehindSize);
	      self._lookbehindSize += len;

	      self._bufPos = len;
	      return len;
	    }

	    // Discard lookbehind buffer.
	    self._cb(false, lookbehind, 0, self._lookbehindSize, false);
	    self._lookbehindSize = 0;
	  }

	  pos += self._bufPos;

	  const firstNeedleChar = needle[0];

	  // Lookbehind buffer is now empty. Perform Boyer-Moore-Horspool
	  // search with optimized character lookup code that only considers
	  // the current round's haystack data.
	  while (pos <= end) {
	    const ch = data[pos + lastNeedleCharPos];

	    if (ch === lastNeedleChar
	        && data[pos] === firstNeedleChar
	        && memcmp(needle, 0, data, pos, lastNeedleCharPos)) {
	      ++self.matches;
	      if (pos > 0)
	        self._cb(true, data, self._bufPos, pos, true);
	      else
	        self._cb(true, undefined, 0, 0, true);

	      return (self._bufPos = pos + needleLen);
	    }

	    pos += occ[ch];
	  }

	  // There was no match. If there's trailing haystack data that we cannot
	  // match yet using the Boyer-Moore-Horspool algorithm (because the trailing
	  // data is less than the needle size) then match using a modified
	  // algorithm that starts matching from the beginning instead of the end.
	  // Whatever trailing data is left after running this algorithm is added to
	  // the lookbehind buffer.
	  while (pos < len) {
	    if (data[pos] !== firstNeedleChar
	        || !memcmp(data, pos, needle, 0, len - pos)) {
	      ++pos;
	      continue;
	    }
	    data.copy(lookbehind, 0, pos, len);
	    self._lookbehindSize = len - pos;
	    break;
	  }

	  // Everything until `pos` is guaranteed not to contain needle data.
	  if (pos > 0)
	    self._cb(false, data, self._bufPos, pos < len ? pos : len, true);

	  self._bufPos = len;
	  return len;
	}

	function matchNeedle(self, data, pos, len) {
	  const lb = self._lookbehind;
	  const lbSize = self._lookbehindSize;
	  const needle = self._needle;

	  for (let i = 0; i < len; ++i, ++pos) {
	    const ch = (pos < 0 ? lb[lbSize + pos] : data[pos]);
	    if (ch !== needle[i])
	      return false;
	  }
	  return true;
	}

	sbmh = SBMH;
	return sbmh;
}

var multipart;
var hasRequiredMultipart;

function requireMultipart () {
	if (hasRequiredMultipart) return multipart;
	hasRequiredMultipart = 1;

	const { Readable, Writable } = require$$0$2;

	const StreamSearch = requireSbmh();

	const {
	  basename,
	  convertToUTF8,
	  getDecoder,
	  parseContentType,
	  parseDisposition,
	} = requireUtils$1();

	const BUF_CRLF = Buffer.from('\r\n');
	const BUF_CR = Buffer.from('\r');
	const BUF_DASH = Buffer.from('-');

	function noop() {}

	const MAX_HEADER_PAIRS = 2000; // From node
	const MAX_HEADER_SIZE = 16 * 1024; // From node (its default value)

	const HPARSER_NAME = 0;
	const HPARSER_PRE_OWS = 1;
	const HPARSER_VALUE = 2;
	class HeaderParser {
	  constructor(cb) {
	    this.header = Object.create(null);
	    this.pairCount = 0;
	    this.byteCount = 0;
	    this.state = HPARSER_NAME;
	    this.name = '';
	    this.value = '';
	    this.crlf = 0;
	    this.cb = cb;
	  }

	  reset() {
	    this.header = Object.create(null);
	    this.pairCount = 0;
	    this.byteCount = 0;
	    this.state = HPARSER_NAME;
	    this.name = '';
	    this.value = '';
	    this.crlf = 0;
	  }

	  push(chunk, pos, end) {
	    let start = pos;
	    while (pos < end) {
	      switch (this.state) {
	        case HPARSER_NAME: {
	          let done = false;
	          for (; pos < end; ++pos) {
	            if (this.byteCount === MAX_HEADER_SIZE)
	              return -1;
	            ++this.byteCount;
	            const code = chunk[pos];
	            if (TOKEN[code] !== 1) {
	              if (code !== 58/* ':' */)
	                return -1;
	              this.name += chunk.latin1Slice(start, pos);
	              if (this.name.length === 0)
	                return -1;
	              ++pos;
	              done = true;
	              this.state = HPARSER_PRE_OWS;
	              break;
	            }
	          }
	          if (!done) {
	            this.name += chunk.latin1Slice(start, pos);
	            break;
	          }
	          // FALLTHROUGH
	        }
	        case HPARSER_PRE_OWS: {
	          // Skip optional whitespace
	          let done = false;
	          for (; pos < end; ++pos) {
	            if (this.byteCount === MAX_HEADER_SIZE)
	              return -1;
	            ++this.byteCount;
	            const code = chunk[pos];
	            if (code !== 32/* ' ' */ && code !== 9/* '\t' */) {
	              start = pos;
	              done = true;
	              this.state = HPARSER_VALUE;
	              break;
	            }
	          }
	          if (!done)
	            break;
	          // FALLTHROUGH
	        }
	        case HPARSER_VALUE:
	          switch (this.crlf) {
	            case 0: // Nothing yet
	              for (; pos < end; ++pos) {
	                if (this.byteCount === MAX_HEADER_SIZE)
	                  return -1;
	                ++this.byteCount;
	                const code = chunk[pos];
	                if (FIELD_VCHAR[code] !== 1) {
	                  if (code !== 13/* '\r' */)
	                    return -1;
	                  ++this.crlf;
	                  break;
	                }
	              }
	              this.value += chunk.latin1Slice(start, pos++);
	              break;
	            case 1: // Received CR
	              if (this.byteCount === MAX_HEADER_SIZE)
	                return -1;
	              ++this.byteCount;
	              if (chunk[pos++] !== 10/* '\n' */)
	                return -1;
	              ++this.crlf;
	              break;
	            case 2: { // Received CR LF
	              if (this.byteCount === MAX_HEADER_SIZE)
	                return -1;
	              ++this.byteCount;
	              const code = chunk[pos];
	              if (code === 32/* ' ' */ || code === 9/* '\t' */) {
	                // Folded value
	                start = pos;
	                this.crlf = 0;
	              } else {
	                if (++this.pairCount < MAX_HEADER_PAIRS) {
	                  this.name = this.name.toLowerCase();
	                  if (this.header[this.name] === undefined)
	                    this.header[this.name] = [this.value];
	                  else
	                    this.header[this.name].push(this.value);
	                }
	                if (code === 13/* '\r' */) {
	                  ++this.crlf;
	                  ++pos;
	                } else {
	                  // Assume start of next header field name
	                  start = pos;
	                  this.crlf = 0;
	                  this.state = HPARSER_NAME;
	                  this.name = '';
	                  this.value = '';
	                }
	              }
	              break;
	            }
	            case 3: { // Received CR LF CR
	              if (this.byteCount === MAX_HEADER_SIZE)
	                return -1;
	              ++this.byteCount;
	              if (chunk[pos++] !== 10/* '\n' */)
	                return -1;
	              // End of header
	              const header = this.header;
	              this.reset();
	              this.cb(header);
	              return pos;
	            }
	          }
	          break;
	      }
	    }

	    return pos;
	  }
	}

	class FileStream extends Readable {
	  constructor(opts, owner) {
	    super(opts);
	    this.truncated = false;
	    this._readcb = null;
	    this.once('end', () => {
	      // We need to make sure that we call any outstanding _writecb() that is
	      // associated with this file so that processing of the rest of the form
	      // can continue. This may not happen if the file stream ends right after
	      // backpressure kicks in, so we force it here.
	      this._read();
	      if (--owner._fileEndsLeft === 0 && owner._finalcb) {
	        const cb = owner._finalcb;
	        owner._finalcb = null;
	        // Make sure other 'end' event handlers get a chance to be executed
	        // before busboy's 'finish' event is emitted
	        process.nextTick(cb);
	      }
	    });
	  }
	  _read(n) {
	    const cb = this._readcb;
	    if (cb) {
	      this._readcb = null;
	      cb();
	    }
	  }
	}

	const ignoreData = {
	  push: (chunk, pos) => {},
	  destroy: () => {},
	};

	function callAndUnsetCb(self, err) {
	  const cb = self._writecb;
	  self._writecb = null;
	  if (err)
	    self.destroy(err);
	  else if (cb)
	    cb();
	}

	function nullDecoder(val, hint) {
	  return val;
	}

	class Multipart extends Writable {
	  constructor(cfg) {
	    const streamOpts = {
	      autoDestroy: true,
	      emitClose: true,
	      highWaterMark: (typeof cfg.highWaterMark === 'number'
	                      ? cfg.highWaterMark
	                      : undefined),
	    };
	    super(streamOpts);

	    if (!cfg.conType.params || typeof cfg.conType.params.boundary !== 'string')
	      throw new Error('Multipart: Boundary not found');

	    const boundary = cfg.conType.params.boundary;
	    const paramDecoder = (typeof cfg.defParamCharset === 'string'
	                            && cfg.defParamCharset
	                          ? getDecoder(cfg.defParamCharset)
	                          : nullDecoder);
	    const defCharset = (cfg.defCharset || 'utf8');
	    const preservePath = cfg.preservePath;
	    const fileOpts = {
	      autoDestroy: true,
	      emitClose: true,
	      highWaterMark: (typeof cfg.fileHwm === 'number'
	                      ? cfg.fileHwm
	                      : undefined),
	    };

	    const limits = cfg.limits;
	    const fieldSizeLimit = (limits && typeof limits.fieldSize === 'number'
	                            ? limits.fieldSize
	                            : 1 * 1024 * 1024);
	    const fileSizeLimit = (limits && typeof limits.fileSize === 'number'
	                           ? limits.fileSize
	                           : Infinity);
	    const filesLimit = (limits && typeof limits.files === 'number'
	                        ? limits.files
	                        : Infinity);
	    const fieldsLimit = (limits && typeof limits.fields === 'number'
	                         ? limits.fields
	                         : Infinity);
	    const partsLimit = (limits && typeof limits.parts === 'number'
	                        ? limits.parts
	                        : Infinity);

	    let parts = -1; // Account for initial boundary
	    let fields = 0;
	    let files = 0;
	    let skipPart = false;

	    this._fileEndsLeft = 0;
	    this._fileStream = undefined;
	    this._complete = false;
	    let fileSize = 0;

	    let field;
	    let fieldSize = 0;
	    let partCharset;
	    let partEncoding;
	    let partType;
	    let partName;
	    let partTruncated = false;

	    let hitFilesLimit = false;
	    let hitFieldsLimit = false;

	    this._hparser = null;
	    const hparser = new HeaderParser((header) => {
	      this._hparser = null;
	      skipPart = false;

	      partType = 'text/plain';
	      partCharset = defCharset;
	      partEncoding = '7bit';
	      partName = undefined;
	      partTruncated = false;

	      let filename;
	      if (!header['content-disposition']) {
	        skipPart = true;
	        return;
	      }

	      const disp = parseDisposition(header['content-disposition'][0],
	                                    paramDecoder);
	      if (!disp || disp.type !== 'form-data') {
	        skipPart = true;
	        return;
	      }

	      if (disp.params) {
	        if (disp.params.name)
	          partName = disp.params.name;

	        if (disp.params['filename*'])
	          filename = disp.params['filename*'];
	        else if (disp.params.filename)
	          filename = disp.params.filename;

	        if (filename !== undefined && !preservePath)
	          filename = basename(filename);
	      }

	      if (header['content-type']) {
	        const conType = parseContentType(header['content-type'][0]);
	        if (conType) {
	          partType = `${conType.type}/${conType.subtype}`;
	          if (conType.params && typeof conType.params.charset === 'string')
	            partCharset = conType.params.charset.toLowerCase();
	        }
	      }

	      if (header['content-transfer-encoding'])
	        partEncoding = header['content-transfer-encoding'][0].toLowerCase();

	      if (partType === 'application/octet-stream' || filename !== undefined) {
	        // File

	        if (files === filesLimit) {
	          if (!hitFilesLimit) {
	            hitFilesLimit = true;
	            this.emit('filesLimit');
	          }
	          skipPart = true;
	          return;
	        }
	        ++files;

	        if (this.listenerCount('file') === 0) {
	          skipPart = true;
	          return;
	        }

	        fileSize = 0;
	        this._fileStream = new FileStream(fileOpts, this);
	        ++this._fileEndsLeft;
	        this.emit(
	          'file',
	          partName,
	          this._fileStream,
	          { filename,
	            encoding: partEncoding,
	            mimeType: partType }
	        );
	      } else {
	        // Non-file

	        if (fields === fieldsLimit) {
	          if (!hitFieldsLimit) {
	            hitFieldsLimit = true;
	            this.emit('fieldsLimit');
	          }
	          skipPart = true;
	          return;
	        }
	        ++fields;

	        if (this.listenerCount('field') === 0) {
	          skipPart = true;
	          return;
	        }

	        field = [];
	        fieldSize = 0;
	      }
	    });

	    let matchPostBoundary = 0;
	    const ssCb = (isMatch, data, start, end, isDataSafe) => {
	retrydata:
	      while (data) {
	        if (this._hparser !== null) {
	          const ret = this._hparser.push(data, start, end);
	          if (ret === -1) {
	            this._hparser = null;
	            hparser.reset();
	            this.emit('error', new Error('Malformed part header'));
	            break;
	          }
	          start = ret;
	        }

	        if (start === end)
	          break;

	        if (matchPostBoundary !== 0) {
	          if (matchPostBoundary === 1) {
	            switch (data[start]) {
	              case 45: // '-'
	                // Try matching '--' after boundary
	                matchPostBoundary = 2;
	                ++start;
	                break;
	              case 13: // '\r'
	                // Try matching CR LF before header
	                matchPostBoundary = 3;
	                ++start;
	                break;
	              default:
	                matchPostBoundary = 0;
	            }
	            if (start === end)
	              return;
	          }

	          if (matchPostBoundary === 2) {
	            matchPostBoundary = 0;
	            if (data[start] === 45/* '-' */) {
	              // End of multipart data
	              this._complete = true;
	              this._bparser = ignoreData;
	              return;
	            }
	            // We saw something other than '-', so put the dash we consumed
	            // "back"
	            const writecb = this._writecb;
	            this._writecb = noop;
	            ssCb(false, BUF_DASH, 0, 1, false);
	            this._writecb = writecb;
	          } else if (matchPostBoundary === 3) {
	            matchPostBoundary = 0;
	            if (data[start] === 10/* '\n' */) {
	              ++start;
	              if (parts >= partsLimit)
	                break;
	              // Prepare the header parser
	              this._hparser = hparser;
	              if (start === end)
	                break;
	              // Process the remaining data as a header
	              continue retrydata;
	            } else {
	              // We saw something other than LF, so put the CR we consumed
	              // "back"
	              const writecb = this._writecb;
	              this._writecb = noop;
	              ssCb(false, BUF_CR, 0, 1, false);
	              this._writecb = writecb;
	            }
	          }
	        }

	        if (!skipPart) {
	          if (this._fileStream) {
	            let chunk;
	            const actualLen = Math.min(end - start, fileSizeLimit - fileSize);
	            if (!isDataSafe) {
	              chunk = Buffer.allocUnsafe(actualLen);
	              data.copy(chunk, 0, start, start + actualLen);
	            } else {
	              chunk = data.slice(start, start + actualLen);
	            }

	            fileSize += chunk.length;
	            if (fileSize === fileSizeLimit) {
	              if (chunk.length > 0)
	                this._fileStream.push(chunk);
	              this._fileStream.emit('limit');
	              this._fileStream.truncated = true;
	              skipPart = true;
	            } else if (!this._fileStream.push(chunk)) {
	              if (this._writecb)
	                this._fileStream._readcb = this._writecb;
	              this._writecb = null;
	            }
	          } else if (field !== undefined) {
	            let chunk;
	            const actualLen = Math.min(
	              end - start,
	              fieldSizeLimit - fieldSize
	            );
	            if (!isDataSafe) {
	              chunk = Buffer.allocUnsafe(actualLen);
	              data.copy(chunk, 0, start, start + actualLen);
	            } else {
	              chunk = data.slice(start, start + actualLen);
	            }

	            fieldSize += actualLen;
	            field.push(chunk);
	            if (fieldSize === fieldSizeLimit) {
	              skipPart = true;
	              partTruncated = true;
	            }
	          }
	        }

	        break;
	      }

	      if (isMatch) {
	        matchPostBoundary = 1;

	        if (this._fileStream) {
	          // End the active file stream if the previous part was a file
	          this._fileStream.push(null);
	          this._fileStream = null;
	        } else if (field !== undefined) {
	          let data;
	          switch (field.length) {
	            case 0:
	              data = '';
	              break;
	            case 1:
	              data = convertToUTF8(field[0], partCharset, 0);
	              break;
	            default:
	              data = convertToUTF8(
	                Buffer.concat(field, fieldSize),
	                partCharset,
	                0
	              );
	          }
	          field = undefined;
	          fieldSize = 0;
	          this.emit(
	            'field',
	            partName,
	            data,
	            { nameTruncated: false,
	              valueTruncated: partTruncated,
	              encoding: partEncoding,
	              mimeType: partType }
	          );
	        }

	        if (++parts === partsLimit)
	          this.emit('partsLimit');
	      }
	    };
	    this._bparser = new StreamSearch(`\r\n--${boundary}`, ssCb);

	    this._writecb = null;
	    this._finalcb = null;

	    // Just in case there is no preamble
	    this.write(BUF_CRLF);
	  }

	  static detect(conType) {
	    return (conType.type === 'multipart' && conType.subtype === 'form-data');
	  }

	  _write(chunk, enc, cb) {
	    this._writecb = cb;
	    this._bparser.push(chunk, 0);
	    if (this._writecb)
	      callAndUnsetCb(this);
	  }

	  _destroy(err, cb) {
	    this._hparser = null;
	    this._bparser = ignoreData;
	    if (!err)
	      err = checkEndState(this);
	    const fileStream = this._fileStream;
	    if (fileStream) {
	      this._fileStream = null;
	      fileStream.destroy(err);
	    }
	    cb(err);
	  }

	  _final(cb) {
	    this._bparser.destroy();
	    if (!this._complete)
	      return cb(new Error('Unexpected end of form'));
	    if (this._fileEndsLeft)
	      this._finalcb = finalcb.bind(null, this, cb);
	    else
	      finalcb(this, cb);
	  }
	}

	function finalcb(self, cb, err) {
	  if (err)
	    return cb(err);
	  err = checkEndState(self);
	  cb(err);
	}

	function checkEndState(self) {
	  if (self._hparser)
	    return new Error('Malformed part header');
	  const fileStream = self._fileStream;
	  if (fileStream) {
	    self._fileStream = null;
	    fileStream.destroy(new Error('Unexpected end of file'));
	  }
	  if (!self._complete)
	    return new Error('Unexpected end of form');
	}

	const TOKEN = [
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
	  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	];

	const FIELD_VCHAR = [
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

	multipart = Multipart;
	return multipart;
}

var urlencoded;
var hasRequiredUrlencoded;

function requireUrlencoded () {
	if (hasRequiredUrlencoded) return urlencoded;
	hasRequiredUrlencoded = 1;

	const { Writable } = require$$0$2;

	const { getDecoder } = requireUtils$1();

	class URLEncoded extends Writable {
	  constructor(cfg) {
	    const streamOpts = {
	      autoDestroy: true,
	      emitClose: true,
	      highWaterMark: (typeof cfg.highWaterMark === 'number'
	                      ? cfg.highWaterMark
	                      : undefined),
	    };
	    super(streamOpts);

	    let charset = (cfg.defCharset || 'utf8');
	    if (cfg.conType.params && typeof cfg.conType.params.charset === 'string')
	      charset = cfg.conType.params.charset;

	    this.charset = charset;

	    const limits = cfg.limits;
	    this.fieldSizeLimit = (limits && typeof limits.fieldSize === 'number'
	                           ? limits.fieldSize
	                           : 1 * 1024 * 1024);
	    this.fieldsLimit = (limits && typeof limits.fields === 'number'
	                        ? limits.fields
	                        : Infinity);
	    this.fieldNameSizeLimit = (
	      limits && typeof limits.fieldNameSize === 'number'
	      ? limits.fieldNameSize
	      : 100
	    );

	    this._inKey = true;
	    this._keyTrunc = false;
	    this._valTrunc = false;
	    this._bytesKey = 0;
	    this._bytesVal = 0;
	    this._fields = 0;
	    this._key = '';
	    this._val = '';
	    this._byte = -2;
	    this._lastPos = 0;
	    this._encode = 0;
	    this._decoder = getDecoder(charset);
	  }

	  static detect(conType) {
	    return (conType.type === 'application'
	            && conType.subtype === 'x-www-form-urlencoded');
	  }

	  _write(chunk, enc, cb) {
	    if (this._fields >= this.fieldsLimit)
	      return cb();

	    let i = 0;
	    const len = chunk.length;
	    this._lastPos = 0;

	    // Check if we last ended mid-percent-encoded byte
	    if (this._byte !== -2) {
	      i = readPctEnc(this, chunk, i, len);
	      if (i === -1)
	        return cb(new Error('Malformed urlencoded form'));
	      if (i >= len)
	        return cb();
	      if (this._inKey)
	        ++this._bytesKey;
	      else
	        ++this._bytesVal;
	    }

	main:
	    while (i < len) {
	      if (this._inKey) {
	        // Parsing key

	        i = skipKeyBytes(this, chunk, i, len);

	        while (i < len) {
	          switch (chunk[i]) {
	            case 61: // '='
	              if (this._lastPos < i)
	                this._key += chunk.latin1Slice(this._lastPos, i);
	              this._lastPos = ++i;
	              this._key = this._decoder(this._key, this._encode);
	              this._encode = 0;
	              this._inKey = false;
	              continue main;
	            case 38: // '&'
	              if (this._lastPos < i)
	                this._key += chunk.latin1Slice(this._lastPos, i);
	              this._lastPos = ++i;
	              this._key = this._decoder(this._key, this._encode);
	              this._encode = 0;
	              if (this._bytesKey > 0) {
	                this.emit(
	                  'field',
	                  this._key,
	                  '',
	                  { nameTruncated: this._keyTrunc,
	                    valueTruncated: false,
	                    encoding: this.charset,
	                    mimeType: 'text/plain' }
	                );
	              }
	              this._key = '';
	              this._val = '';
	              this._keyTrunc = false;
	              this._valTrunc = false;
	              this._bytesKey = 0;
	              this._bytesVal = 0;
	              if (++this._fields >= this.fieldsLimit) {
	                this.emit('fieldsLimit');
	                return cb();
	              }
	              continue;
	            case 43: // '+'
	              if (this._lastPos < i)
	                this._key += chunk.latin1Slice(this._lastPos, i);
	              this._key += ' ';
	              this._lastPos = i + 1;
	              break;
	            case 37: // '%'
	              if (this._encode === 0)
	                this._encode = 1;
	              if (this._lastPos < i)
	                this._key += chunk.latin1Slice(this._lastPos, i);
	              this._lastPos = i + 1;
	              this._byte = -1;
	              i = readPctEnc(this, chunk, i + 1, len);
	              if (i === -1)
	                return cb(new Error('Malformed urlencoded form'));
	              if (i >= len)
	                return cb();
	              ++this._bytesKey;
	              i = skipKeyBytes(this, chunk, i, len);
	              continue;
	          }
	          ++i;
	          ++this._bytesKey;
	          i = skipKeyBytes(this, chunk, i, len);
	        }
	        if (this._lastPos < i)
	          this._key += chunk.latin1Slice(this._lastPos, i);
	      } else {
	        // Parsing value

	        i = skipValBytes(this, chunk, i, len);

	        while (i < len) {
	          switch (chunk[i]) {
	            case 38: // '&'
	              if (this._lastPos < i)
	                this._val += chunk.latin1Slice(this._lastPos, i);
	              this._lastPos = ++i;
	              this._inKey = true;
	              this._val = this._decoder(this._val, this._encode);
	              this._encode = 0;
	              if (this._bytesKey > 0 || this._bytesVal > 0) {
	                this.emit(
	                  'field',
	                  this._key,
	                  this._val,
	                  { nameTruncated: this._keyTrunc,
	                    valueTruncated: this._valTrunc,
	                    encoding: this.charset,
	                    mimeType: 'text/plain' }
	                );
	              }
	              this._key = '';
	              this._val = '';
	              this._keyTrunc = false;
	              this._valTrunc = false;
	              this._bytesKey = 0;
	              this._bytesVal = 0;
	              if (++this._fields >= this.fieldsLimit) {
	                this.emit('fieldsLimit');
	                return cb();
	              }
	              continue main;
	            case 43: // '+'
	              if (this._lastPos < i)
	                this._val += chunk.latin1Slice(this._lastPos, i);
	              this._val += ' ';
	              this._lastPos = i + 1;
	              break;
	            case 37: // '%'
	              if (this._encode === 0)
	                this._encode = 1;
	              if (this._lastPos < i)
	                this._val += chunk.latin1Slice(this._lastPos, i);
	              this._lastPos = i + 1;
	              this._byte = -1;
	              i = readPctEnc(this, chunk, i + 1, len);
	              if (i === -1)
	                return cb(new Error('Malformed urlencoded form'));
	              if (i >= len)
	                return cb();
	              ++this._bytesVal;
	              i = skipValBytes(this, chunk, i, len);
	              continue;
	          }
	          ++i;
	          ++this._bytesVal;
	          i = skipValBytes(this, chunk, i, len);
	        }
	        if (this._lastPos < i)
	          this._val += chunk.latin1Slice(this._lastPos, i);
	      }
	    }

	    cb();
	  }

	  _final(cb) {
	    if (this._byte !== -2)
	      return cb(new Error('Malformed urlencoded form'));
	    if (!this._inKey || this._bytesKey > 0 || this._bytesVal > 0) {
	      if (this._inKey)
	        this._key = this._decoder(this._key, this._encode);
	      else
	        this._val = this._decoder(this._val, this._encode);
	      this.emit(
	        'field',
	        this._key,
	        this._val,
	        { nameTruncated: this._keyTrunc,
	          valueTruncated: this._valTrunc,
	          encoding: this.charset,
	          mimeType: 'text/plain' }
	      );
	    }
	    cb();
	  }
	}

	function readPctEnc(self, chunk, pos, len) {
	  if (pos >= len)
	    return len;

	  if (self._byte === -1) {
	    // We saw a '%' but no hex characters yet
	    const hexUpper = HEX_VALUES[chunk[pos++]];
	    if (hexUpper === -1)
	      return -1;

	    if (hexUpper >= 8)
	      self._encode = 2; // Indicate high bits detected

	    if (pos < len) {
	      // Both hex characters are in this chunk
	      const hexLower = HEX_VALUES[chunk[pos++]];
	      if (hexLower === -1)
	        return -1;

	      if (self._inKey)
	        self._key += String.fromCharCode((hexUpper << 4) + hexLower);
	      else
	        self._val += String.fromCharCode((hexUpper << 4) + hexLower);

	      self._byte = -2;
	      self._lastPos = pos;
	    } else {
	      // Only one hex character was available in this chunk
	      self._byte = hexUpper;
	    }
	  } else {
	    // We saw only one hex character so far
	    const hexLower = HEX_VALUES[chunk[pos++]];
	    if (hexLower === -1)
	      return -1;

	    if (self._inKey)
	      self._key += String.fromCharCode((self._byte << 4) + hexLower);
	    else
	      self._val += String.fromCharCode((self._byte << 4) + hexLower);

	    self._byte = -2;
	    self._lastPos = pos;
	  }

	  return pos;
	}

	function skipKeyBytes(self, chunk, pos, len) {
	  // Skip bytes if we've truncated
	  if (self._bytesKey > self.fieldNameSizeLimit) {
	    if (!self._keyTrunc) {
	      if (self._lastPos < pos)
	        self._key += chunk.latin1Slice(self._lastPos, pos - 1);
	    }
	    self._keyTrunc = true;
	    for (; pos < len; ++pos) {
	      const code = chunk[pos];
	      if (code === 61/* '=' */ || code === 38/* '&' */)
	        break;
	      ++self._bytesKey;
	    }
	    self._lastPos = pos;
	  }

	  return pos;
	}

	function skipValBytes(self, chunk, pos, len) {
	  // Skip bytes if we've truncated
	  if (self._bytesVal > self.fieldSizeLimit) {
	    if (!self._valTrunc) {
	      if (self._lastPos < pos)
	        self._val += chunk.latin1Slice(self._lastPos, pos - 1);
	    }
	    self._valTrunc = true;
	    for (; pos < len; ++pos) {
	      if (chunk[pos] === 38/* '&' */)
	        break;
	      ++self._bytesVal;
	    }
	    self._lastPos = pos;
	  }

	  return pos;
	}

	/* eslint-disable no-multi-spaces */
	const HEX_VALUES = [
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	   0,  1,  2,  3,  4,  5,  6,  7,  8,  9, -1, -1, -1, -1, -1, -1,
	  -1, 10, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, 10, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	];
	/* eslint-enable no-multi-spaces */

	urlencoded = URLEncoded;
	return urlencoded;
}

var lib;
var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib;
	hasRequiredLib = 1;

	const { parseContentType } = requireUtils$1();

	function getInstance(cfg) {
	  const headers = cfg.headers;
	  const conType = parseContentType(headers['content-type']);
	  if (!conType)
	    throw new Error('Malformed content type');

	  for (const type of TYPES) {
	    const matched = type.detect(conType);
	    if (!matched)
	      continue;

	    const instanceCfg = {
	      limits: cfg.limits,
	      headers,
	      conType,
	      highWaterMark: undefined,
	      fileHwm: undefined,
	      defCharset: undefined,
	      defParamCharset: undefined,
	      preservePath: false,
	    };
	    if (cfg.highWaterMark)
	      instanceCfg.highWaterMark = cfg.highWaterMark;
	    if (cfg.fileHwm)
	      instanceCfg.fileHwm = cfg.fileHwm;
	    instanceCfg.defCharset = cfg.defCharset;
	    instanceCfg.defParamCharset = cfg.defParamCharset;
	    instanceCfg.preservePath = cfg.preservePath;
	    return new type(instanceCfg);
	  }

	  throw new Error(`Unsupported content type: ${headers['content-type']}`);
	}

	// Note: types are explicitly listed here for easier bundling
	// See: https://github.com/mscdex/busboy/issues/121
	const TYPES = [
	  requireMultipart(),
	  requireUrlencoded(),
	].filter(function(typemod) { return typeof typemod.detect === 'function'; });

	lib = (cfg) => {
	  if (typeof cfg !== 'object' || cfg === null)
	    cfg = {};

	  if (typeof cfg.headers !== 'object'
	      || cfg.headers === null
	      || typeof cfg.headers['content-type'] !== 'string') {
	    throw new Error('Missing Content-Type');
	  }

	  return getInstance(cfg);
	};
	return lib;
}

var constants$2;
var hasRequiredConstants$1;

function requireConstants$1 () {
	if (hasRequiredConstants$1) return constants$2;
	hasRequiredConstants$1 = 1;

	const corsSafeListedMethods = ['GET', 'HEAD', 'POST'];

	const nullBodyStatus = [101, 204, 205, 304];

	const redirectStatus = [301, 302, 303, 307, 308];

	const referrerPolicy = [
	  '',
	  'no-referrer',
	  'no-referrer-when-downgrade',
	  'same-origin',
	  'origin',
	  'strict-origin',
	  'origin-when-cross-origin',
	  'strict-origin-when-cross-origin',
	  'unsafe-url'
	];

	const requestRedirect = ['follow', 'manual', 'error'];

	const safeMethods = ['GET', 'HEAD', 'OPTIONS', 'TRACE'];

	const requestMode = ['navigate', 'same-origin', 'no-cors', 'cors'];

	const requestCredentials = ['omit', 'same-origin', 'include'];

	const requestCache = [
	  'default',
	  'no-store',
	  'reload',
	  'no-cache',
	  'force-cache',
	  'only-if-cached'
	];

	const requestBodyHeader = [
	  'content-encoding',
	  'content-language',
	  'content-location',
	  'content-type'
	];

	// http://fetch.spec.whatwg.org/#forbidden-method
	const forbiddenMethods = ['CONNECT', 'TRACE', 'TRACK'];

	const subresource = [
	  'audio',
	  'audioworklet',
	  'font',
	  'image',
	  'manifest',
	  'paintworklet',
	  'script',
	  'style',
	  'track',
	  'video',
	  'xslt',
	  ''
	];

	/** @type {globalThis['DOMException']} */
	const DOMException = globalThis.DOMException ?? (() => {
	  // DOMException was only made a global in Node v17.0.0,
	  // but fetch supports >= v16.8.
	  try {
	    atob('~');
	  } catch (err) {
	    return Object.getPrototypeOf(err).constructor
	  }
	})();

	constants$2 = {
	  DOMException,
	  subresource,
	  forbiddenMethods,
	  requestBodyHeader,
	  referrerPolicy,
	  requestRedirect,
	  requestMode,
	  requestCredentials,
	  requestCache,
	  redirectStatus,
	  corsSafeListedMethods,
	  nullBodyStatus,
	  safeMethods
	};
	return constants$2;
}

var util$d;
var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return util$d;
	hasRequiredUtil = 1;

	const { redirectStatus } = requireConstants$1();
	const { performance } = require$$1;
	const { isBlobLike, toUSVString, ReadableStreamFrom } = util$e;
	const assert = require$$0$1;
	const { isUint8Array } = require$$4$1;

	// https://nodejs.org/api/crypto.html#determining-if-crypto-support-is-unavailable
	/** @type {import('crypto')|undefined} */
	let crypto;

	try {
	  crypto = require('crypto');
	} catch {

	}

	// https://fetch.spec.whatwg.org/#block-bad-port
	const badPorts = [
	  '1', '7', '9', '11', '13', '15', '17', '19', '20', '21', '22', '23', '25', '37', '42', '43', '53', '69', '77', '79',
	  '87', '95', '101', '102', '103', '104', '109', '110', '111', '113', '115', '117', '119', '123', '135', '137',
	  '139', '143', '161', '179', '389', '427', '465', '512', '513', '514', '515', '526', '530', '531', '532',
	  '540', '548', '554', '556', '563', '587', '601', '636', '989', '990', '993', '995', '1719', '1720', '1723',
	  '2049', '3659', '4045', '5060', '5061', '6000', '6566', '6665', '6666', '6667', '6668', '6669', '6697',
	  '10080'
	];

	function responseURL (response) {
	  // https://fetch.spec.whatwg.org/#responses
	  // A response has an associated URL. It is a pointer to the last URL
	  // in response’s URL list and null if response’s URL list is empty.
	  const urlList = response.urlList;
	  const length = urlList.length;
	  return length === 0 ? null : urlList[length - 1].toString()
	}

	// https://fetch.spec.whatwg.org/#concept-response-location-url
	function responseLocationURL (response, requestFragment) {
	  // 1. If response’s status is not a redirect status, then return null.
	  if (!redirectStatus.includes(response.status)) {
	    return null
	  }

	  // 2. Let location be the result of extracting header list values given
	  // `Location` and response’s header list.
	  let location = response.headersList.get('location');

	  // 3. If location is a value, then set location to the result of parsing
	  // location with response’s URL.
	  location = location ? new URL(location, responseURL(response)) : null;

	  // 4. If location is a URL whose fragment is null, then set location’s
	  // fragment to requestFragment.
	  if (location && !location.hash) {
	    location.hash = requestFragment;
	  }

	  // 5. Return location.
	  return location
	}

	/** @returns {URL} */
	function requestCurrentURL (request) {
	  return request.urlList[request.urlList.length - 1]
	}

	function requestBadPort (request) {
	  // 1. Let url be request’s current URL.
	  const url = requestCurrentURL(request);

	  // 2. If url’s scheme is an HTTP(S) scheme and url’s port is a bad port,
	  // then return blocked.
	  if (/^https?:/.test(url.protocol) && badPorts.includes(url.port)) {
	    return 'blocked'
	  }

	  // 3. Return allowed.
	  return 'allowed'
	}

	function isErrorLike (object) {
	  return object instanceof Error || (
	    object?.constructor?.name === 'Error' ||
	    object?.constructor?.name === 'DOMException'
	  )
	}

	// Check whether |statusText| is a ByteString and
	// matches the Reason-Phrase token production.
	// RFC 2616: https://tools.ietf.org/html/rfc2616
	// RFC 7230: https://tools.ietf.org/html/rfc7230
	// "reason-phrase = *( HTAB / SP / VCHAR / obs-text )"
	// https://github.com/chromium/chromium/blob/94.0.4604.1/third_party/blink/renderer/core/fetch/response.cc#L116
	function isValidReasonPhrase (statusText) {
	  for (let i = 0; i < statusText.length; ++i) {
	    const c = statusText.charCodeAt(i);
	    if (
	      !(
	        (
	          c === 0x09 || // HTAB
	          (c >= 0x20 && c <= 0x7e) || // SP / VCHAR
	          (c >= 0x80 && c <= 0xff)
	        ) // obs-text
	      )
	    ) {
	      return false
	    }
	  }
	  return true
	}

	function isTokenChar (c) {
	  return !(
	    c >= 0x7f ||
	    c <= 0x20 ||
	    c === '(' ||
	    c === ')' ||
	    c === '<' ||
	    c === '>' ||
	    c === '@' ||
	    c === ',' ||
	    c === ';' ||
	    c === ':' ||
	    c === '\\' ||
	    c === '"' ||
	    c === '/' ||
	    c === '[' ||
	    c === ']' ||
	    c === '?' ||
	    c === '=' ||
	    c === '{' ||
	    c === '}'
	  )
	}

	// See RFC 7230, Section 3.2.6.
	// https://github.com/chromium/chromium/blob/d7da0240cae77824d1eda25745c4022757499131/third_party/blink/renderer/platform/network/http_parsers.cc#L321
	function isValidHTTPToken (characters) {
	  if (!characters || typeof characters !== 'string') {
	    return false
	  }
	  for (let i = 0; i < characters.length; ++i) {
	    const c = characters.charCodeAt(i);
	    if (c > 0x7f || !isTokenChar(c)) {
	      return false
	    }
	  }
	  return true
	}

	// https://fetch.spec.whatwg.org/#header-name
	// https://github.com/chromium/chromium/blob/b3d37e6f94f87d59e44662d6078f6a12de845d17/net/http/http_util.cc#L342
	function isValidHeaderName (potentialValue) {
	  if (potentialValue.length === 0) {
	    return false
	  }

	  for (const char of potentialValue) {
	    if (!isValidHTTPToken(char)) {
	      return false
	    }
	  }

	  return true
	}

	/**
	 * @see https://fetch.spec.whatwg.org/#header-value
	 * @param {string} potentialValue
	 */
	function isValidHeaderValue (potentialValue) {
	  // - Has no leading or trailing HTTP tab or space bytes.
	  // - Contains no 0x00 (NUL) or HTTP newline bytes.
	  if (
	    potentialValue.startsWith('\t') ||
	    potentialValue.startsWith(' ') ||
	    potentialValue.endsWith('\t') ||
	    potentialValue.endsWith(' ')
	  ) {
	    return false
	  }

	  if (
	    potentialValue.includes('\0') ||
	    potentialValue.includes('\r') ||
	    potentialValue.includes('\n')
	  ) {
	    return false
	  }

	  return true
	}

	// https://w3c.github.io/webappsec-referrer-policy/#set-requests-referrer-policy-on-redirect
	function setRequestReferrerPolicyOnRedirect (request, actualResponse) {
	}

	// https://fetch.spec.whatwg.org/#cross-origin-resource-policy-check
	function crossOriginResourcePolicyCheck () {
	  // TODO
	  return 'allowed'
	}

	// https://fetch.spec.whatwg.org/#concept-cors-check
	function corsCheck () {
	  // TODO
	  return 'success'
	}

	// https://fetch.spec.whatwg.org/#concept-tao-check
	function TAOCheck () {
	  // TODO
	  return 'success'
	}

	function appendFetchMetadata (httpRequest) {
	  //  https://w3c.github.io/webappsec-fetch-metadata/#sec-fetch-dest-header
	  //  TODO

	  //  https://w3c.github.io/webappsec-fetch-metadata/#sec-fetch-mode-header

	  //  1. Assert: r’s url is a potentially trustworthy URL.
	  //  TODO

	  //  2. Let header be a Structured Header whose value is a token.
	  let header = null;

	  //  3. Set header’s value to r’s mode.
	  header = httpRequest.mode;

	  //  4. Set a structured field value `Sec-Fetch-Mode`/header in r’s header list.
	  httpRequest.headersList.set('sec-fetch-mode', header);

	  //  https://w3c.github.io/webappsec-fetch-metadata/#sec-fetch-site-header
	  //  TODO

	  //  https://w3c.github.io/webappsec-fetch-metadata/#sec-fetch-user-header
	  //  TODO
	}

	// https://fetch.spec.whatwg.org/#append-a-request-origin-header
	function appendRequestOriginHeader (request) {
	  // 1. Let serializedOrigin be the result of byte-serializing a request origin with request.
	  let serializedOrigin = request.origin;

	  // 2. If request’s response tainting is "cors" or request’s mode is "websocket", then append (`Origin`, serializedOrigin) to request’s header list.
	  if (request.responseTainting === 'cors' || request.mode === 'websocket') {
	    if (serializedOrigin) {
	      request.headersList.append('Origin', serializedOrigin);
	    }

	  // 3. Otherwise, if request’s method is neither `GET` nor `HEAD`, then:
	  } else if (request.method !== 'GET' && request.method !== 'HEAD') {
	    // 1. Switch on request’s referrer policy:
	    switch (request.referrerPolicy) {
	      case 'no-referrer':
	        // Set serializedOrigin to `null`.
	        serializedOrigin = null;
	        break
	      case 'no-referrer-when-downgrade':
	      case 'strict-origin':
	      case 'strict-origin-when-cross-origin':
	        // If request’s origin is a tuple origin, its scheme is "https", and request’s current URL’s scheme is not "https", then set serializedOrigin to `null`.
	        if (/^https:/.test(request.origin) && !/^https:/.test(requestCurrentURL(request))) {
	          serializedOrigin = null;
	        }
	        break
	      case 'same-origin':
	        // If request’s origin is not same origin with request’s current URL’s origin, then set serializedOrigin to `null`.
	        if (!sameOrigin(request, requestCurrentURL(request))) {
	          serializedOrigin = null;
	        }
	        break
	        // Do nothing.
	    }

	    if (serializedOrigin) {
	      // 2. Append (`Origin`, serializedOrigin) to request’s header list.
	      request.headersList.append('Origin', serializedOrigin);
	    }
	  }
	}

	function coarsenedSharedCurrentTime (crossOriginIsolatedCapability) {
	  // TODO
	  return performance.now()
	}

	// https://fetch.spec.whatwg.org/#create-an-opaque-timing-info
	function createOpaqueTimingInfo (timingInfo) {
	  return {
	    startTime: timingInfo.startTime ?? 0,
	    redirectStartTime: 0,
	    redirectEndTime: 0,
	    postRedirectStartTime: timingInfo.startTime ?? 0,
	    finalServiceWorkerStartTime: 0,
	    finalNetworkResponseStartTime: 0,
	    finalNetworkRequestStartTime: 0,
	    endTime: 0,
	    encodedBodySize: 0,
	    decodedBodySize: 0,
	    finalConnectionTimingInfo: null
	  }
	}

	// https://html.spec.whatwg.org/multipage/origin.html#policy-container
	function makePolicyContainer () {
	  // TODO
	  return {}
	}

	// https://html.spec.whatwg.org/multipage/origin.html#clone-a-policy-container
	function clonePolicyContainer () {
	  // TODO
	  return {}
	}

	// https://w3c.github.io/webappsec-referrer-policy/#determine-requests-referrer
	function determineRequestsReferrer (request) {
	  // 1. Let policy be request's referrer policy.
	  const policy = request.referrerPolicy;

	  // Return no-referrer when empty or policy says so
	  if (policy == null || policy === '' || policy === 'no-referrer') {
	    return 'no-referrer'
	  }

	  // 2. Let environment be the request client
	  const environment = request.client;
	  let referrerSource = null;

	  /**
	   * 3, Switch on request’s referrer:
	    "client"
	      If environment’s global object is a Window object, then
	        Let document be the associated Document of environment’s global object.
	        If document’s origin is an opaque origin, return no referrer.
	        While document is an iframe srcdoc document,
	        let document be document’s browsing context’s browsing context container’s node document.
	        Let referrerSource be document’s URL.

	      Otherwise, let referrerSource be environment’s creation URL.

	    a URL
	    Let referrerSource be request’s referrer.
	   */
	  if (request.referrer === 'client') {
	    // Not defined in Node but part of the spec
	    if (request.client?.globalObject?.constructor?.name === 'Window' ) { // eslint-disable-line
	      const origin = environment.globalObject.self?.origin ?? environment.globalObject.location?.origin;

	      // If document’s origin is an opaque origin, return no referrer.
	      if (origin == null || origin === 'null') return 'no-referrer'

	      // Let referrerSource be document’s URL.
	      referrerSource = new URL(environment.globalObject.location.href);
	    } else {
	      // 3(a)(II) If environment's global object is not Window,
	      // Let referrerSource be environments creationURL
	      if (environment?.globalObject?.location == null) {
	        return 'no-referrer'
	      }

	      referrerSource = new URL(environment.globalObject.location.href);
	    }
	  } else if (request.referrer instanceof URL) {
	    // 3(b) If requests's referrer is a URL instance, then make
	    // referrerSource be requests's referrer.
	    referrerSource = request.referrer;
	  } else {
	    // If referrerSource neither client nor instance of URL
	    // then return "no-referrer".
	    return 'no-referrer'
	  }

	  const urlProtocol = referrerSource.protocol;

	  // If url's scheme is a local scheme (i.e. one of "about", "data", "javascript", "file")
	  // then return "no-referrer".
	  if (
	    urlProtocol === 'about:' || urlProtocol === 'data:' ||
	    urlProtocol === 'blob:'
	  ) {
	    return 'no-referrer'
	  }

	  let temp;
	  let referrerOrigin;
	  // 4. Let requests's referrerURL be the result of stripping referrer
	  // source for use as referrer (using util function, without origin only)
	  const referrerUrl = (temp = stripURLForReferrer(referrerSource)).length > 4096
	  // 5. Let referrerOrigin be the result of stripping referrer
	  // source for use as referrer (using util function, with originOnly true)
	    ? (referrerOrigin = stripURLForReferrer(referrerSource, true))
	  // 6. If result of seralizing referrerUrl is a string whose length is greater than
	  // 4096, then set referrerURL to referrerOrigin
	    : temp;
	  const areSameOrigin = sameOrigin(request, referrerUrl);
	  const isNonPotentiallyTrustWorthy = isURLPotentiallyTrustworthy(referrerUrl) &&
	    !isURLPotentiallyTrustworthy(request.url);

	  // NOTE: How to treat step 7?
	  // 8. Execute the switch statements corresponding to the value of policy:
	  switch (policy) {
	    case 'origin': return referrerOrigin != null ? referrerOrigin : stripURLForReferrer(referrerSource, true)
	    case 'unsafe-url': return referrerUrl
	    case 'same-origin':
	      return areSameOrigin ? referrerOrigin : 'no-referrer'
	    case 'origin-when-cross-origin':
	      return areSameOrigin ? referrerUrl : referrerOrigin
	    case 'strict-origin-when-cross-origin':
	      /**
	         * 1. If the origin of referrerURL and the origin of request’s current URL are the same,
	         * then return referrerURL.
	         * 2. If referrerURL is a potentially trustworthy URL and request’s current URL is not a
	         * potentially trustworthy URL, then return no referrer.
	         * 3. Return referrerOrigin
	      */
	      if (areSameOrigin) return referrerOrigin
	      // else return isNonPotentiallyTrustWorthy ? 'no-referrer' : referrerOrigin
	    case 'strict-origin': // eslint-disable-line
	      /**
	         * 1. If referrerURL is a potentially trustworthy URL and
	         * request’s current URL is not a potentially trustworthy URL,
	         * then return no referrer.
	         * 2. Return referrerOrigin
	        */
	    case 'no-referrer-when-downgrade': // eslint-disable-line
	      /**
	       * 1. If referrerURL is a potentially trustworthy URL and
	       * request’s current URL is not a potentially trustworthy URL,
	       * then return no referrer.
	       * 2. Return referrerOrigin
	      */

	    default: // eslint-disable-line
	      return isNonPotentiallyTrustWorthy ? 'no-referrer' : referrerOrigin
	  }

	  function stripURLForReferrer (url, originOnly = false) {
	    const urlObject = new URL(url.href);
	    urlObject.username = '';
	    urlObject.password = '';
	    urlObject.hash = '';

	    return originOnly ? urlObject.origin : urlObject.href
	  }
	}

	function isURLPotentiallyTrustworthy (url) {
	  if (!(url instanceof URL)) {
	    return false
	  }

	  // If child of about, return true
	  if (url.href === 'about:blank' || url.href === 'about:srcdoc') {
	    return true
	  }

	  // If scheme is data, return true
	  if (url.protocol === 'data:') return true

	  // If file, return true
	  if (url.protocol === 'file:') return true

	  return isOriginPotentiallyTrustworthy(url.origin)

	  function isOriginPotentiallyTrustworthy (origin) {
	    // If origin is explicitly null, return false
	    if (origin == null || origin === 'null') return false

	    const originAsURL = new URL(origin);

	    // If secure, return true
	    if (originAsURL.protocol === 'https:' || originAsURL.protocol === 'wss:') {
	      return true
	    }

	    // If localhost or variants, return true
	    if (/^127(?:\.[0-9]+){0,2}\.[0-9]+$|^\[(?:0*:)*?:?0*1\]$/.test(originAsURL.hostname) ||
	     (originAsURL.hostname === 'localhost' || originAsURL.hostname.includes('localhost.')) ||
	     (originAsURL.hostname.endsWith('.localhost'))) {
	      return true
	    }

	    // If any other, return false
	    return false
	  }
	}

	/**
	 * @see https://w3c.github.io/webappsec-subresource-integrity/#does-response-match-metadatalist
	 * @param {Uint8Array} bytes
	 * @param {string} metadataList
	 */
	function bytesMatch (bytes, metadataList) {
	  // If node is not built with OpenSSL support, we cannot check
	  // a request's integrity, so allow it by default (the spec will
	  // allow requests if an invalid hash is given, as precedence).
	  /* istanbul ignore if: only if node is built with --without-ssl */
	  if (crypto === undefined) {
	    return true
	  }

	  // 1. Let parsedMetadata be the result of parsing metadataList.
	  const parsedMetadata = parseMetadata(metadataList);

	  // 2. If parsedMetadata is no metadata, return true.
	  if (parsedMetadata === 'no metadata') {
	    return true
	  }

	  // 3. If parsedMetadata is the empty set, return true.
	  if (parsedMetadata.length === 0) {
	    return true
	  }

	  // 4. Let metadata be the result of getting the strongest
	  //    metadata from parsedMetadata.
	  // Note: this will only work for SHA- algorithms and it's lazy *at best*.
	  const metadata = parsedMetadata.sort((c, d) => d.algo.localeCompare(c.algo));

	  // 5. For each item in metadata:
	  for (const item of metadata) {
	    // 1. Let algorithm be the alg component of item.
	    const algorithm = item.algo;

	    // 2. Let expectedValue be the val component of item.
	    const expectedValue = item.hash;

	    // 3. Let actualValue be the result of applying algorithm to bytes.
	    // Note: "applying algorithm to bytes" converts the result to base64
	    const actualValue = crypto.createHash(algorithm).update(bytes).digest('base64');

	    // 4. If actualValue is a case-sensitive match for expectedValue,
	    //    return true.
	    if (actualValue === expectedValue) {
	      return true
	    }
	  }

	  // 6. Return false.
	  return false
	}

	// https://w3c.github.io/webappsec-subresource-integrity/#grammardef-hash-with-options
	// hash-algo is defined in Content Security Policy 2 Section 4.2
	// base64-value is similary defined there
	// VCHAR is defined https://www.rfc-editor.org/rfc/rfc5234#appendix-B.1
	const parseHashWithOptions = /((?<algo>sha256|sha384|sha512)-(?<hash>[A-z0-9+/]{1}.*={1,2}))( +[\x21-\x7e]?)?/i;

	/**
	 * @see https://w3c.github.io/webappsec-subresource-integrity/#parse-metadata
	 * @param {string} metadata
	 */
	function parseMetadata (metadata) {
	  // 1. Let result be the empty set.
	  /** @type {{ algo: string, hash: string }[]} */
	  const result = [];

	  // 2. Let empty be equal to true.
	  let empty = true;

	  const supportedHashes = crypto.getHashes();

	  // 3. For each token returned by splitting metadata on spaces:
	  for (const token of metadata.split(' ')) {
	    // 1. Set empty to false.
	    empty = false;

	    // 2. Parse token as a hash-with-options.
	    const parsedToken = parseHashWithOptions.exec(token);

	    // 3. If token does not parse, continue to the next token.
	    if (parsedToken === null || parsedToken.groups === undefined) {
	      // Note: Chromium blocks the request at this point, but Firefox
	      // gives a warning that an invalid integrity was given. The
	      // correct behavior is to ignore these, and subsequently not
	      // check the integrity of the resource.
	      continue
	    }

	    // 4. Let algorithm be the hash-algo component of token.
	    const algorithm = parsedToken.groups.algo;

	    // 5. If algorithm is a hash function recognized by the user
	    //    agent, add the parsed token to result.
	    if (supportedHashes.includes(algorithm.toLowerCase())) {
	      result.push(parsedToken.groups);
	    }
	  }

	  // 4. Return no metadata if empty is true, otherwise return result.
	  if (empty === true) {
	    return 'no metadata'
	  }

	  return result
	}

	// https://w3c.github.io/webappsec-upgrade-insecure-requests/#upgrade-request
	function tryUpgradeRequestToAPotentiallyTrustworthyURL (request) {
	  // TODO
	}

	/**
	 * @link {https://html.spec.whatwg.org/multipage/origin.html#same-origin}
	 * @param {URL} A
	 * @param {URL} B
	 */
	function sameOrigin (A, B) {
	  // 1. If A and B are the same opaque origin, then return true.
	  // "opaque origin" is an internal value we cannot access, ignore.

	  // 2. If A and B are both tuple origins and their schemes,
	  //    hosts, and port are identical, then return true.
	  if (A.protocol === B.protocol && A.hostname === B.hostname && A.port === B.port) {
	    return true
	  }

	  // 3. Return false.
	  return false
	}

	function createDeferredPromise () {
	  let res;
	  let rej;
	  const promise = new Promise((resolve, reject) => {
	    res = resolve;
	    rej = reject;
	  });

	  return { promise, resolve: res, reject: rej }
	}

	function isAborted (fetchParams) {
	  return fetchParams.controller.state === 'aborted'
	}

	function isCancelled (fetchParams) {
	  return fetchParams.controller.state === 'aborted' ||
	    fetchParams.controller.state === 'terminated'
	}

	// https://fetch.spec.whatwg.org/#concept-method-normalize
	function normalizeMethod (method) {
	  return /^(DELETE|GET|HEAD|OPTIONS|POST|PUT)$/i.test(method)
	    ? method.toUpperCase()
	    : method
	}

	// https://infra.spec.whatwg.org/#serialize-a-javascript-value-to-a-json-string
	function serializeJavascriptValueToJSONString (value) {
	  // 1. Let result be ? Call(%JSON.stringify%, undefined, « value »).
	  const result = JSON.stringify(value);

	  // 2. If result is undefined, then throw a TypeError.
	  if (result === undefined) {
	    throw new TypeError('Value is not JSON serializable')
	  }

	  // 3. Assert: result is a string.
	  assert(typeof result === 'string');

	  // 4. Return result.
	  return result
	}

	// https://tc39.es/ecma262/#sec-%25iteratorprototype%25-object
	const esIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));

	// https://webidl.spec.whatwg.org/#dfn-iterator-prototype-object
	function makeIterator (iterator, name) {
	  const i = {
	    next () {
	      if (Object.getPrototypeOf(this) !== i) {
	        throw new TypeError(
	          `'next' called on an object that does not implement interface ${name} Iterator.`
	        )
	      }

	      return iterator.next()
	    },
	    // The class string of an iterator prototype object for a given interface is the
	    // result of concatenating the identifier of the interface and the string " Iterator".
	    [Symbol.toStringTag]: `${name} Iterator`
	  };

	  // The [[Prototype]] internal slot of an iterator prototype object must be %IteratorPrototype%.
	  Object.setPrototypeOf(i, esIteratorPrototype);
	  // esIteratorPrototype needs to be the prototype of i
	  // which is the prototype of an empty object. Yes, it's confusing.
	  return Object.setPrototypeOf({}, i)
	}

	/**
	 * @see https://fetch.spec.whatwg.org/#body-fully-read
	 */
	async function fullyReadBody (body, processBody, processBodyError) {
	  // 1. If taskDestination is null, then set taskDestination to
	  //    the result of starting a new parallel queue.

	  // 2. Let promise be the result of fully reading body as promise
	  //    given body.
	  try {
	    /** @type {Uint8Array[]} */
	    const chunks = [];
	    let length = 0;

	    const reader = body.stream.getReader();

	    while (true) {
	      const { done, value } = await reader.read();

	      if (done === true) {
	        break
	      }

	      // read-loop chunk steps
	      assert(isUint8Array(value));

	      chunks.push(value);
	      length += value.byteLength;
	    }

	    // 3. Let fulfilledSteps given a byte sequence bytes be to queue
	    //    a fetch task to run processBody given bytes, with
	    //    taskDestination.
	    const fulfilledSteps = (bytes) => queueMicrotask(() => {
	      processBody(bytes);
	    });

	    fulfilledSteps(Buffer.concat(chunks, length));
	  } catch (err) {
	    // 4. Let rejectedSteps be to queue a fetch task to run
	    //    processBodyError, with taskDestination.
	    queueMicrotask(() => processBodyError(err));
	  }

	  // 5. React to promise with fulfilledSteps and rejectedSteps.
	}

	/**
	 * Fetch supports node >= 16.8.0, but Object.hasOwn was added in v16.9.0.
	 */
	const hasOwn = Object.hasOwn || ((dict, key) => Object.prototype.hasOwnProperty.call(dict, key));

	util$d = {
	  isAborted,
	  isCancelled,
	  createDeferredPromise,
	  ReadableStreamFrom,
	  toUSVString,
	  tryUpgradeRequestToAPotentiallyTrustworthyURL,
	  coarsenedSharedCurrentTime,
	  determineRequestsReferrer,
	  makePolicyContainer,
	  clonePolicyContainer,
	  appendFetchMetadata,
	  appendRequestOriginHeader,
	  TAOCheck,
	  corsCheck,
	  crossOriginResourcePolicyCheck,
	  createOpaqueTimingInfo,
	  setRequestReferrerPolicyOnRedirect,
	  isValidHTTPToken,
	  requestBadPort,
	  requestCurrentURL,
	  responseURL,
	  responseLocationURL,
	  isBlobLike,
	  isURLPotentiallyTrustworthy,
	  isValidReasonPhrase,
	  sameOrigin,
	  normalizeMethod,
	  serializeJavascriptValueToJSONString,
	  makeIterator,
	  isValidHeaderName,
	  isValidHeaderValue,
	  hasOwn,
	  isErrorLike,
	  fullyReadBody,
	  bytesMatch
	};
	return util$d;
}

var symbols;
var hasRequiredSymbols;

function requireSymbols () {
	if (hasRequiredSymbols) return symbols;
	hasRequiredSymbols = 1;

	symbols = {
	  kUrl: Symbol('url'),
	  kHeaders: Symbol('headers'),
	  kSignal: Symbol('signal'),
	  kState: Symbol('state'),
	  kGuard: Symbol('guard'),
	  kRealm: Symbol('realm')
	};
	return symbols;
}

var webidl_1;
var hasRequiredWebidl;

function requireWebidl () {
	if (hasRequiredWebidl) return webidl_1;
	hasRequiredWebidl = 1;

	const { types } = require$$0;
	const { hasOwn, toUSVString } = requireUtil();

	const webidl = {};
	webidl.converters = {};
	webidl.util = {};
	webidl.errors = {};

	/**
	 *
	 * @param {{
	 *   header: string
	 *   message: string
	 * }} message
	 */
	webidl.errors.exception = function (message) {
	  throw new TypeError(`${message.header}: ${message.message}`)
	};

	/**
	 * Throw an error when conversion from one type to another has failed
	 * @param {{
	 *   prefix: string
	 *   argument: string
	 *   types: string[]
	 * }} context
	 */
	webidl.errors.conversionFailed = function (context) {
	  const plural = context.types.length === 1 ? '' : ' one of';
	  const message =
	    `${context.argument} could not be converted to` +
	    `${plural}: ${context.types.join(', ')}.`;

	  return webidl.errors.exception({
	    header: context.prefix,
	    message
	  })
	};

	/**
	 * Throw an error when an invalid argument is provided
	 * @param {{
	 *   prefix: string
	 *   value: string
	 *   type: string
	 * }} context
	 */
	webidl.errors.invalidArgument = function (context) {
	  return webidl.errors.exception({
	    header: context.prefix,
	    message: `"${context.value}" is an invalid ${context.type}.`
	  })
	};

	// https://tc39.es/ecma262/#sec-ecmascript-data-types-and-values
	webidl.util.Type = function (V) {
	  switch (typeof V) {
	    case 'undefined': return 'Undefined'
	    case 'boolean': return 'Boolean'
	    case 'string': return 'String'
	    case 'symbol': return 'Symbol'
	    case 'number': return 'Number'
	    case 'bigint': return 'BigInt'
	    case 'function':
	    case 'object': {
	      if (V === null) {
	        return 'Null'
	      }

	      return 'Object'
	    }
	  }
	};

	// https://webidl.spec.whatwg.org/#abstract-opdef-converttoint
	webidl.util.ConvertToInt = function (V, bitLength, signedness, opts = {}) {
	  let upperBound;
	  let lowerBound;

	  // 1. If bitLength is 64, then:
	  if (bitLength === 64) {
	    // 1. Let upperBound be 2^53 − 1.
	    upperBound = Math.pow(2, 53) - 1;

	    // 2. If signedness is "unsigned", then let lowerBound be 0.
	    if (signedness === 'unsigned') {
	      lowerBound = 0;
	    } else {
	      // 3. Otherwise let lowerBound be −2^53 + 1.
	      lowerBound = Math.pow(-2, 53) + 1;
	    }
	  } else if (signedness === 'unsigned') {
	    // 2. Otherwise, if signedness is "unsigned", then:

	    // 1. Let lowerBound be 0.
	    lowerBound = 0;

	    // 2. Let upperBound be 2^bitLength − 1.
	    upperBound = Math.pow(2, bitLength) - 1;
	  } else {
	    // 3. Otherwise:

	    // 1. Let lowerBound be -2^bitLength − 1.
	    lowerBound = Math.pow(-2, bitLength) - 1;

	    // 2. Let upperBound be 2^bitLength − 1 − 1.
	    upperBound = Math.pow(2, bitLength - 1) - 1;
	  }

	  // 4. Let x be ? ToNumber(V).
	  let x = Number(V);

	  // 5. If x is −0, then set x to +0.
	  if (Object.is(-0, x)) {
	    x = 0;
	  }

	  // 6. If the conversion is to an IDL type associated
	  //    with the [EnforceRange] extended attribute, then:
	  if (opts.enforceRange === true) {
	    // 1. If x is NaN, +∞, or −∞, then throw a TypeError.
	    if (
	      Number.isNaN(x) ||
	      x === Number.POSITIVE_INFINITY ||
	      x === Number.NEGATIVE_INFINITY
	    ) {
	      webidl.errors.exception({
	        header: 'Integer conversion',
	        message: `Could not convert ${V} to an integer.`
	      });
	    }

	    // 2. Set x to IntegerPart(x).
	    x = webidl.util.IntegerPart(x);

	    // 3. If x < lowerBound or x > upperBound, then
	    //    throw a TypeError.
	    if (x < lowerBound || x > upperBound) {
	      webidl.errors.exception({
	        header: 'Integer conversion',
	        message: `Value must be between ${lowerBound}-${upperBound}, got ${x}.`
	      });
	    }

	    // 4. Return x.
	    return x
	  }

	  // 7. If x is not NaN and the conversion is to an IDL
	  //    type associated with the [Clamp] extended
	  //    attribute, then:
	  if (!Number.isNaN(x) && opts.clamp === true) {
	    // 1. Set x to min(max(x, lowerBound), upperBound).
	    x = Math.min(Math.max(x, lowerBound), upperBound);

	    // 2. Round x to the nearest integer, choosing the
	    //    even integer if it lies halfway between two,
	    //    and choosing +0 rather than −0.
	    if (Math.floor(x) % 2 === 0) {
	      x = Math.floor(x);
	    } else {
	      x = Math.ceil(x);
	    }

	    // 3. Return x.
	    return x
	  }

	  // 8. If x is NaN, +0, +∞, or −∞, then return +0.
	  if (
	    Number.isNaN(x) ||
	    Object.is(0, x) ||
	    x === Number.POSITIVE_INFINITY ||
	    x === Number.NEGATIVE_INFINITY
	  ) {
	    return 0
	  }

	  // 9. Set x to IntegerPart(x).
	  x = webidl.util.IntegerPart(x);

	  // 10. Set x to x modulo 2^bitLength.
	  x = x % Math.pow(2, bitLength);

	  // 11. If signedness is "signed" and x ≥ 2^bitLength − 1,
	  //    then return x − 2^bitLength.
	  if (signedness === 'signed' && x >= Math.pow(2, bitLength) - 1) {
	    return x - Math.pow(2, bitLength)
	  }

	  // 12. Otherwise, return x.
	  return x
	};

	// https://webidl.spec.whatwg.org/#abstract-opdef-integerpart
	webidl.util.IntegerPart = function (n) {
	  // 1. Let r be floor(abs(n)).
	  const r = Math.floor(Math.abs(n));

	  // 2. If n < 0, then return -1 × r.
	  if (n < 0) {
	    return -1 * r
	  }

	  // 3. Otherwise, return r.
	  return r
	};

	// https://webidl.spec.whatwg.org/#es-sequence
	webidl.sequenceConverter = function (converter) {
	  return (V) => {
	    // 1. If Type(V) is not Object, throw a TypeError.
	    if (webidl.util.Type(V) !== 'Object') {
	      webidl.errors.exception({
	        header: 'Sequence',
	        message: `Value of type ${webidl.util.Type(V)} is not an Object.`
	      });
	    }

	    // 2. Let method be ? GetMethod(V, @@iterator).
	    /** @type {Generator} */
	    const method = V?.[Symbol.iterator]?.();
	    const seq = [];

	    // 3. If method is undefined, throw a TypeError.
	    if (
	      method === undefined ||
	      typeof method.next !== 'function'
	    ) {
	      webidl.errors.exception({
	        header: 'Sequence',
	        message: 'Object is not an iterator.'
	      });
	    }

	    // https://webidl.spec.whatwg.org/#create-sequence-from-iterable
	    while (true) {
	      const { done, value } = method.next();

	      if (done) {
	        break
	      }

	      seq.push(converter(value));
	    }

	    return seq
	  }
	};

	webidl.recordConverter = function (keyConverter, valueConverter) {
	  return (V) => {
	    const record = {};
	    const type = webidl.util.Type(V);

	    if (type === 'Undefined' || type === 'Null') {
	      return record
	    }

	    if (type !== 'Object') {
	      webidl.errors.exception({
	        header: 'Record',
	        message: `Expected ${V} to be an Object type.`
	      });
	    }

	    for (let [key, value] of Object.entries(V)) {
	      key = keyConverter(key);
	      value = valueConverter(value);

	      record[key] = value;
	    }

	    return record
	  }
	};

	webidl.interfaceConverter = function (i) {
	  return (V, opts = {}) => {
	    if (opts.strict !== false && !(V instanceof i)) {
	      webidl.errors.exception({
	        header: i.name,
	        message: `Expected ${V} to be an instance of ${i.name}.`
	      });
	    }

	    return V
	  }
	};

	/**
	 * @param {{
	 *   key: string,
	 *   defaultValue?: any,
	 *   required?: boolean,
	 *   converter: (...args: unknown[]) => unknown,
	 *   allowedValues?: any[]
	 * }[]} converters
	 * @returns
	 */
	webidl.dictionaryConverter = function (converters) {
	  return (dictionary) => {
	    const type = webidl.util.Type(dictionary);
	    const dict = {};

	    if (type !== 'Null' && type !== 'Undefined' && type !== 'Object') {
	      webidl.errors.exception({
	        header: 'Dictionary',
	        message: `Expected ${dictionary} to be one of: Null, Undefined, Object.`
	      });
	    }

	    for (const options of converters) {
	      const { key, defaultValue, required, converter } = options;

	      if (required === true) {
	        if (!hasOwn(dictionary, key)) {
	          webidl.errors.exception({
	            header: 'Dictionary',
	            message: `Missing required key "${key}".`
	          });
	        }
	      }

	      let value = dictionary[key];
	      const hasDefault = hasOwn(options, 'defaultValue');

	      // Only use defaultValue if value is undefined and
	      // a defaultValue options was provided.
	      if (hasDefault && value !== null) {
	        value = value ?? defaultValue;
	      }

	      // A key can be optional and have no default value.
	      // When this happens, do not perform a conversion,
	      // and do not assign the key a value.
	      if (required || hasDefault || value !== undefined) {
	        value = converter(value);

	        if (
	          options.allowedValues &&
	          !options.allowedValues.includes(value)
	        ) {
	          webidl.errors.exception({
	            header: 'Dictionary',
	            message: `${value} is not an accepted type. Expected one of ${options.allowedValues.join(', ')}.`
	          });
	        }

	        dict[key] = value;
	      }
	    }

	    return dict
	  }
	};

	webidl.nullableConverter = function (converter) {
	  return (V) => {
	    if (V === null) {
	      return V
	    }

	    return converter(V)
	  }
	};

	// https://webidl.spec.whatwg.org/#es-DOMString
	webidl.converters.DOMString = function (V, opts = {}) {
	  // 1. If V is null and the conversion is to an IDL type
	  //    associated with the [LegacyNullToEmptyString]
	  //    extended attribute, then return the DOMString value
	  //    that represents the empty string.
	  if (V === null && opts.legacyNullToEmptyString) {
	    return ''
	  }

	  // 2. Let x be ? ToString(V).
	  if (typeof V === 'symbol') {
	    throw new TypeError('Could not convert argument of type symbol to string.')
	  }

	  // 3. Return the IDL DOMString value that represents the
	  //    same sequence of code units as the one the
	  //    ECMAScript String value x represents.
	  return String(V)
	};

	// https://webidl.spec.whatwg.org/#es-ByteString
	webidl.converters.ByteString = function (V) {
	  // 1. Let x be ? ToString(V).
	  // Note: DOMString converter perform ? ToString(V)
	  const x = webidl.converters.DOMString(V);

	  // 2. If the value of any element of x is greater than
	  //    255, then throw a TypeError.
	  for (let index = 0; index < x.length; index++) {
	    const charCode = x.charCodeAt(index);

	    if (charCode > 255) {
	      throw new TypeError(
	        'Cannot convert argument to a ByteString because the character at' +
	        `index ${index} has a value of ${charCode} which is greater than 255.`
	      )
	    }
	  }

	  // 3. Return an IDL ByteString value whose length is the
	  //    length of x, and where the value of each element is
	  //    the value of the corresponding element of x.
	  return x
	};

	// https://webidl.spec.whatwg.org/#es-USVString
	// TODO: ensure that util.toUSVString follows webidl spec
	webidl.converters.USVString = toUSVString;

	// https://webidl.spec.whatwg.org/#es-boolean
	webidl.converters.boolean = function (V) {
	  // 1. Let x be the result of computing ToBoolean(V).
	  const x = Boolean(V);

	  // 2. Return the IDL boolean value that is the one that represents
	  //    the same truth value as the ECMAScript Boolean value x.
	  return x
	};

	// https://webidl.spec.whatwg.org/#es-any
	webidl.converters.any = function (V) {
	  return V
	};

	// https://webidl.spec.whatwg.org/#es-long-long
	webidl.converters['long long'] = function (V, opts) {
	  // 1. Let x be ? ConvertToInt(V, 64, "signed").
	  const x = webidl.util.ConvertToInt(V, 64, 'signed', opts);

	  // 2. Return the IDL long long value that represents
	  //    the same numeric value as x.
	  return x
	};

	// https://webidl.spec.whatwg.org/#es-unsigned-short
	webidl.converters['unsigned short'] = function (V) {
	  // 1. Let x be ? ConvertToInt(V, 16, "unsigned").
	  const x = webidl.util.ConvertToInt(V, 16, 'unsigned');

	  // 2. Return the IDL unsigned short value that represents
	  //    the same numeric value as x.
	  return x
	};

	// https://webidl.spec.whatwg.org/#idl-ArrayBuffer
	webidl.converters.ArrayBuffer = function (V, opts = {}) {
	  // 1. If Type(V) is not Object, or V does not have an
	  //    [[ArrayBufferData]] internal slot, then throw a
	  //    TypeError.
	  // see: https://tc39.es/ecma262/#sec-properties-of-the-arraybuffer-instances
	  // see: https://tc39.es/ecma262/#sec-properties-of-the-sharedarraybuffer-instances
	  if (
	    webidl.util.Type(V) !== 'Object' ||
	    !types.isAnyArrayBuffer(V)
	  ) {
	    webidl.errors.conversionFailed({
	      prefix: `${V}`,
	      argument: `${V}`,
	      types: ['ArrayBuffer']
	    });
	  }

	  // 2. If the conversion is not to an IDL type associated
	  //    with the [AllowShared] extended attribute, and
	  //    IsSharedArrayBuffer(V) is true, then throw a
	  //    TypeError.
	  if (opts.allowShared === false && types.isSharedArrayBuffer(V)) {
	    webidl.errors.exception({
	      header: 'ArrayBuffer',
	      message: 'SharedArrayBuffer is not allowed.'
	    });
	  }

	  // 3. If the conversion is not to an IDL type associated
	  //    with the [AllowResizable] extended attribute, and
	  //    IsResizableArrayBuffer(V) is true, then throw a
	  //    TypeError.
	  // Note: resizable ArrayBuffers are currently a proposal.

	  // 4. Return the IDL ArrayBuffer value that is a
	  //    reference to the same object as V.
	  return V
	};

	webidl.converters.TypedArray = function (V, T, opts = {}) {
	  // 1. Let T be the IDL type V is being converted to.

	  // 2. If Type(V) is not Object, or V does not have a
	  //    [[TypedArrayName]] internal slot with a value
	  //    equal to T’s name, then throw a TypeError.
	  if (
	    webidl.util.Type(V) !== 'Object' ||
	    !types.isTypedArray(V) ||
	    V.constructor.name !== T.name
	  ) {
	    webidl.errors.conversionFailed({
	      prefix: `${T.name}`,
	      argument: `${V}`,
	      types: [T.name]
	    });
	  }

	  // 3. If the conversion is not to an IDL type associated
	  //    with the [AllowShared] extended attribute, and
	  //    IsSharedArrayBuffer(V.[[ViewedArrayBuffer]]) is
	  //    true, then throw a TypeError.
	  if (opts.allowShared === false && types.isSharedArrayBuffer(V.buffer)) {
	    webidl.errors.exception({
	      header: 'ArrayBuffer',
	      message: 'SharedArrayBuffer is not allowed.'
	    });
	  }

	  // 4. If the conversion is not to an IDL type associated
	  //    with the [AllowResizable] extended attribute, and
	  //    IsResizableArrayBuffer(V.[[ViewedArrayBuffer]]) is
	  //    true, then throw a TypeError.
	  // Note: resizable array buffers are currently a proposal

	  // 5. Return the IDL value of type T that is a reference
	  //    to the same object as V.
	  return V
	};

	webidl.converters.DataView = function (V, opts = {}) {
	  // 1. If Type(V) is not Object, or V does not have a
	  //    [[DataView]] internal slot, then throw a TypeError.
	  if (webidl.util.Type(V) !== 'Object' || !types.isDataView(V)) {
	    webidl.errors.exception({
	      header: 'DataView',
	      message: 'Object is not a DataView.'
	    });
	  }

	  // 2. If the conversion is not to an IDL type associated
	  //    with the [AllowShared] extended attribute, and
	  //    IsSharedArrayBuffer(V.[[ViewedArrayBuffer]]) is true,
	  //    then throw a TypeError.
	  if (opts.allowShared === false && types.isSharedArrayBuffer(V.buffer)) {
	    webidl.errors.exception({
	      header: 'ArrayBuffer',
	      message: 'SharedArrayBuffer is not allowed.'
	    });
	  }

	  // 3. If the conversion is not to an IDL type associated
	  //    with the [AllowResizable] extended attribute, and
	  //    IsResizableArrayBuffer(V.[[ViewedArrayBuffer]]) is
	  //    true, then throw a TypeError.
	  // Note: resizable ArrayBuffers are currently a proposal

	  // 4. Return the IDL DataView value that is a reference
	  //    to the same object as V.
	  return V
	};

	// https://webidl.spec.whatwg.org/#BufferSource
	webidl.converters.BufferSource = function (V, opts = {}) {
	  if (types.isAnyArrayBuffer(V)) {
	    return webidl.converters.ArrayBuffer(V, opts)
	  }

	  if (types.isTypedArray(V)) {
	    return webidl.converters.TypedArray(V, V.constructor)
	  }

	  if (types.isDataView(V)) {
	    return webidl.converters.DataView(V, opts)
	  }

	  throw new TypeError(`Could not convert ${V} to a BufferSource.`)
	};

	webidl.converters['sequence<ByteString>'] = webidl.sequenceConverter(
	  webidl.converters.ByteString
	);

	webidl.converters['sequence<sequence<ByteString>>'] = webidl.sequenceConverter(
	  webidl.converters['sequence<ByteString>']
	);

	webidl.converters['record<ByteString, ByteString>'] = webidl.recordConverter(
	  webidl.converters.ByteString,
	  webidl.converters.ByteString
	);

	webidl_1 = {
	  webidl
	};
	return webidl_1;
}

var file;
var hasRequiredFile;

function requireFile () {
	if (hasRequiredFile) return file;
	hasRequiredFile = 1;

	const { Blob } = require$$6;
	const { types } = require$$0;
	const { kState } = requireSymbols();
	const { isBlobLike } = requireUtil();
	const { webidl } = requireWebidl();

	class File extends Blob {
	  constructor (fileBits, fileName, options = {}) {
	    // The File constructor is invoked with two or three parameters, depending
	    // on whether the optional dictionary parameter is used. When the File()
	    // constructor is invoked, user agents must run the following steps:
	    if (arguments.length < 2) {
	      throw new TypeError('2 arguments required')
	    }

	    fileBits = webidl.converters['sequence<BlobPart>'](fileBits);
	    fileName = webidl.converters.USVString(fileName);
	    options = webidl.converters.FilePropertyBag(options);

	    // 1. Let bytes be the result of processing blob parts given fileBits and
	    // options.
	    // Note: Blob handles this for us

	    // 2. Let n be the fileName argument to the constructor.
	    const n = fileName;

	    // 3. Process FilePropertyBag dictionary argument by running the following
	    // substeps:

	    //    1. If the type member is provided and is not the empty string, let t
	    //    be set to the type dictionary member. If t contains any characters
	    //    outside the range U+0020 to U+007E, then set t to the empty string
	    //    and return from these substeps.
	    //    2. Convert every character in t to ASCII lowercase.
	    // Note: Blob handles both of these steps for us

	    //    3. If the lastModified member is provided, let d be set to the
	    //    lastModified dictionary member. If it is not provided, set d to the
	    //    current date and time represented as the number of milliseconds since
	    //    the Unix Epoch (which is the equivalent of Date.now() [ECMA-262]).
	    const d = options.lastModified;

	    // 4. Return a new File object F such that:
	    // F refers to the bytes byte sequence.
	    // F.size is set to the number of total bytes in bytes.
	    // F.name is set to n.
	    // F.type is set to t.
	    // F.lastModified is set to d.

	    super(processBlobParts(fileBits, options), { type: options.type });
	    this[kState] = {
	      name: n,
	      lastModified: d
	    };
	  }

	  get name () {
	    if (!(this instanceof File)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].name
	  }

	  get lastModified () {
	    if (!(this instanceof File)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].lastModified
	  }

	  get [Symbol.toStringTag] () {
	    return this.constructor.name
	  }
	}

	class FileLike {
	  constructor (blobLike, fileName, options = {}) {
	    // TODO: argument idl type check

	    // The File constructor is invoked with two or three parameters, depending
	    // on whether the optional dictionary parameter is used. When the File()
	    // constructor is invoked, user agents must run the following steps:

	    // 1. Let bytes be the result of processing blob parts given fileBits and
	    // options.

	    // 2. Let n be the fileName argument to the constructor.
	    const n = fileName;

	    // 3. Process FilePropertyBag dictionary argument by running the following
	    // substeps:

	    //    1. If the type member is provided and is not the empty string, let t
	    //    be set to the type dictionary member. If t contains any characters
	    //    outside the range U+0020 to U+007E, then set t to the empty string
	    //    and return from these substeps.
	    //    TODO
	    const t = options.type;

	    //    2. Convert every character in t to ASCII lowercase.
	    //    TODO

	    //    3. If the lastModified member is provided, let d be set to the
	    //    lastModified dictionary member. If it is not provided, set d to the
	    //    current date and time represented as the number of milliseconds since
	    //    the Unix Epoch (which is the equivalent of Date.now() [ECMA-262]).
	    const d = options.lastModified ?? Date.now();

	    // 4. Return a new File object F such that:
	    // F refers to the bytes byte sequence.
	    // F.size is set to the number of total bytes in bytes.
	    // F.name is set to n.
	    // F.type is set to t.
	    // F.lastModified is set to d.

	    this[kState] = {
	      blobLike,
	      name: n,
	      type: t,
	      lastModified: d
	    };
	  }

	  stream (...args) {
	    if (!(this instanceof FileLike)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].blobLike.stream(...args)
	  }

	  arrayBuffer (...args) {
	    if (!(this instanceof FileLike)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].blobLike.arrayBuffer(...args)
	  }

	  slice (...args) {
	    if (!(this instanceof FileLike)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].blobLike.slice(...args)
	  }

	  text (...args) {
	    if (!(this instanceof FileLike)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].blobLike.text(...args)
	  }

	  get size () {
	    if (!(this instanceof FileLike)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].blobLike.size
	  }

	  get type () {
	    if (!(this instanceof FileLike)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].blobLike.type
	  }

	  get name () {
	    if (!(this instanceof FileLike)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].name
	  }

	  get lastModified () {
	    if (!(this instanceof FileLike)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kState].lastModified
	  }

	  get [Symbol.toStringTag] () {
	    return 'File'
	  }
	}

	webidl.converters.Blob = webidl.interfaceConverter(Blob);

	webidl.converters.BlobPart = function (V, opts) {
	  if (webidl.util.Type(V) === 'Object') {
	    if (isBlobLike(V)) {
	      return webidl.converters.Blob(V, { strict: false })
	    }

	    return webidl.converters.BufferSource(V, opts)
	  } else {
	    return webidl.converters.USVString(V, opts)
	  }
	};

	webidl.converters['sequence<BlobPart>'] = webidl.sequenceConverter(
	  webidl.converters.BlobPart
	);

	// https://www.w3.org/TR/FileAPI/#dfn-FilePropertyBag
	webidl.converters.FilePropertyBag = webidl.dictionaryConverter([
	  {
	    key: 'lastModified',
	    converter: webidl.converters['long long'],
	    get defaultValue () {
	      return Date.now()
	    }
	  },
	  {
	    key: 'type',
	    converter: webidl.converters.DOMString,
	    defaultValue: ''
	  },
	  {
	    key: 'endings',
	    converter: (value) => {
	      value = webidl.converters.DOMString(value);
	      value = value.toLowerCase();

	      if (value !== 'native') {
	        value = 'transparent';
	      }

	      return value
	    },
	    defaultValue: 'transparent'
	  }
	]);

	/**
	 * @see https://www.w3.org/TR/FileAPI/#process-blob-parts
	 * @param {(NodeJS.TypedArray|Blob|string)[]} parts
	 * @param {{ type: string, endings: string }} options
	 */
	function processBlobParts (parts, options) {
	  // 1. Let bytes be an empty sequence of bytes.
	  /** @type {NodeJS.TypedArray[]} */
	  const bytes = [];

	  // 2. For each element in parts:
	  for (const element of parts) {
	    // 1. If element is a USVString, run the following substeps:
	    if (typeof element === 'string') {
	      // 1. Let s be element.
	      let s = element;

	      // 2. If the endings member of options is "native", set s
	      //    to the result of converting line endings to native
	      //    of element.
	      if (options.endings === 'native') {
	        s = convertLineEndingsNative(s);
	      }

	      // 3. Append the result of UTF-8 encoding s to bytes.
	      bytes.push(new TextEncoder().encode(s));
	    } else if (
	      types.isAnyArrayBuffer(element) ||
	      types.isTypedArray(element)
	    ) {
	      // 2. If element is a BufferSource, get a copy of the
	      //    bytes held by the buffer source, and append those
	      //    bytes to bytes.
	      if (!element.buffer) { // ArrayBuffer
	        bytes.push(new Uint8Array(element));
	      } else {
	        bytes.push(
	          new Uint8Array(element.buffer, element.byteOffset, element.byteLength)
	        );
	      }
	    } else if (isBlobLike(element)) {
	      // 3. If element is a Blob, append the bytes it represents
	      //    to bytes.
	      bytes.push(element);
	    }
	  }

	  // 3. Return bytes.
	  return bytes
	}

	/**
	 * @see https://www.w3.org/TR/FileAPI/#convert-line-endings-to-native
	 * @param {string} s
	 */
	function convertLineEndingsNative (s) {
	  // 1. Let native line ending be be the code point U+000A LF.
	  let nativeLineEnding = '\n';

	  // 2. If the underlying platform’s conventions are to
	  //    represent newlines as a carriage return and line feed
	  //    sequence, set native line ending to the code point
	  //    U+000D CR followed by the code point U+000A LF.
	  if (process.platform === 'win32') {
	    nativeLineEnding = '\r\n';
	  }

	  return s.replace(/\r?\n/g, nativeLineEnding)
	}

	// If this function is moved to ./util.js, some tools (such as
	// rollup) will warn about circular dependencies. See:
	// https://github.com/nodejs/undici/issues/1629
	function isFileLike (object) {
	  return object instanceof File || (
	    object &&
	    (typeof object.stream === 'function' ||
	     typeof object.arrayBuffer === 'function') &&
	     object[Symbol.toStringTag] === 'File'
	  )
	}

	file = { File, FileLike, isFileLike };
	return file;
}

var formdata;
var hasRequiredFormdata;

function requireFormdata () {
	if (hasRequiredFormdata) return formdata;
	hasRequiredFormdata = 1;

	const { isBlobLike, toUSVString, makeIterator } = requireUtil();
	const { kState } = requireSymbols();
	const { File, FileLike, isFileLike } = requireFile();
	const { webidl } = requireWebidl();
	const { Blob } = require$$6;

	// https://xhr.spec.whatwg.org/#formdata
	class FormData {
	  static name = 'FormData'

	  constructor (form) {
	    if (arguments.length > 0 && form != null) {
	      webidl.errors.conversionFailed({
	        prefix: 'FormData constructor',
	        argument: 'Argument 1',
	        types: ['null']
	      });
	    }

	    this[kState] = [];
	  }

	  append (name, value, filename = undefined) {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 2) {
	      throw new TypeError(
	        `Failed to execute 'append' on 'FormData': 2 arguments required, but only ${arguments.length} present.`
	      )
	    }

	    if (arguments.length === 3 && !isBlobLike(value)) {
	      throw new TypeError(
	        "Failed to execute 'append' on 'FormData': parameter 2 is not of type 'Blob'"
	      )
	    }

	    // 1. Let value be value if given; otherwise blobValue.

	    name = webidl.converters.USVString(name);
	    value = isBlobLike(value)
	      ? webidl.converters.Blob(value, { strict: false })
	      : webidl.converters.USVString(value);
	    filename = arguments.length === 3
	      ? webidl.converters.USVString(filename)
	      : undefined;

	    // 2. Let entry be the result of creating an entry with
	    // name, value, and filename if given.
	    const entry = makeEntry(name, value, filename);

	    // 3. Append entry to this’s entry list.
	    this[kState].push(entry);
	  }

	  delete (name) {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'delete' on 'FormData': 1 arguments required, but only ${arguments.length} present.`
	      )
	    }

	    name = webidl.converters.USVString(name);

	    // The delete(name) method steps are to remove all entries whose name
	    // is name from this’s entry list.
	    const next = [];
	    for (const entry of this[kState]) {
	      if (entry.name !== name) {
	        next.push(entry);
	      }
	    }

	    this[kState] = next;
	  }

	  get (name) {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'get' on 'FormData': 1 arguments required, but only ${arguments.length} present.`
	      )
	    }

	    name = webidl.converters.USVString(name);

	    // 1. If there is no entry whose name is name in this’s entry list,
	    // then return null.
	    const idx = this[kState].findIndex((entry) => entry.name === name);
	    if (idx === -1) {
	      return null
	    }

	    // 2. Return the value of the first entry whose name is name from
	    // this’s entry list.
	    return this[kState][idx].value
	  }

	  getAll (name) {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'getAll' on 'FormData': 1 arguments required, but only ${arguments.length} present.`
	      )
	    }

	    name = webidl.converters.USVString(name);

	    // 1. If there is no entry whose name is name in this’s entry list,
	    // then return the empty list.
	    // 2. Return the values of all entries whose name is name, in order,
	    // from this’s entry list.
	    return this[kState]
	      .filter((entry) => entry.name === name)
	      .map((entry) => entry.value)
	  }

	  has (name) {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'has' on 'FormData': 1 arguments required, but only ${arguments.length} present.`
	      )
	    }

	    name = webidl.converters.USVString(name);

	    // The has(name) method steps are to return true if there is an entry
	    // whose name is name in this’s entry list; otherwise false.
	    return this[kState].findIndex((entry) => entry.name === name) !== -1
	  }

	  set (name, value, filename = undefined) {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 2) {
	      throw new TypeError(
	        `Failed to execute 'set' on 'FormData': 2 arguments required, but only ${arguments.length} present.`
	      )
	    }

	    if (arguments.length === 3 && !isBlobLike(value)) {
	      throw new TypeError(
	        "Failed to execute 'set' on 'FormData': parameter 2 is not of type 'Blob'"
	      )
	    }

	    // The set(name, value) and set(name, blobValue, filename) method steps
	    // are:

	    // 1. Let value be value if given; otherwise blobValue.

	    name = webidl.converters.USVString(name);
	    value = isBlobLike(value)
	      ? webidl.converters.Blob(value, { strict: false })
	      : webidl.converters.USVString(value);
	    filename = arguments.length === 3
	      ? toUSVString(filename)
	      : undefined;

	    // 2. Let entry be the result of creating an entry with name, value, and
	    // filename if given.
	    const entry = makeEntry(name, value, filename);

	    // 3. If there are entries in this’s entry list whose name is name, then
	    // replace the first such entry with entry and remove the others.
	    const idx = this[kState].findIndex((entry) => entry.name === name);
	    if (idx !== -1) {
	      this[kState] = [
	        ...this[kState].slice(0, idx),
	        entry,
	        ...this[kState].slice(idx + 1).filter((entry) => entry.name !== name)
	      ];
	    } else {
	      // 4. Otherwise, append entry to this’s entry list.
	      this[kState].push(entry);
	    }
	  }

	  get [Symbol.toStringTag] () {
	    return this.constructor.name
	  }

	  entries () {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return makeIterator(
	      makeIterable(this[kState], 'entries'),
	      'FormData'
	    )
	  }

	  keys () {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return makeIterator(
	      makeIterable(this[kState], 'keys'),
	      'FormData'
	    )
	  }

	  values () {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return makeIterator(
	      makeIterable(this[kState], 'values'),
	      'FormData'
	    )
	  }

	  /**
	   * @param {(value: string, key: string, self: FormData) => void} callbackFn
	   * @param {unknown} thisArg
	   */
	  forEach (callbackFn, thisArg = globalThis) {
	    if (!(this instanceof FormData)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'forEach' on 'FormData': 1 argument required, but only ${arguments.length} present.`
	      )
	    }

	    if (typeof callbackFn !== 'function') {
	      throw new TypeError(
	        "Failed to execute 'forEach' on 'FormData': parameter 1 is not of type 'Function'."
	      )
	    }

	    for (const [key, value] of this) {
	      callbackFn.apply(thisArg, [value, key, this]);
	    }
	  }
	}

	FormData.prototype[Symbol.iterator] = FormData.prototype.entries;

	/**
	 * @see https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#create-an-entry
	 * @param {string} name
	 * @param {string|Blob} value
	 * @param {?string} filename
	 * @returns
	 */
	function makeEntry (name, value, filename) {
	  // 1. Set name to the result of converting name into a scalar value string.
	  // "To convert a string into a scalar value string, replace any surrogates
	  //  with U+FFFD."
	  // see: https://nodejs.org/dist/latest-v18.x/docs/api/buffer.html#buftostringencoding-start-end
	  name = Buffer.from(name).toString('utf8');

	  // 2. If value is a string, then set value to the result of converting
	  //    value into a scalar value string.
	  if (typeof value === 'string') {
	    value = Buffer.from(value).toString('utf8');
	  } else {
	    // 3. Otherwise:

	    // 1. If value is not a File object, then set value to a new File object,
	    //    representing the same bytes, whose name attribute value is "blob"
	    if (!isFileLike(value)) {
	      value = value instanceof Blob
	        ? new File([value], 'blob', { type: value.type })
	        : new FileLike(value, 'blob', { type: value.type });
	    }

	    // 2. If filename is given, then set value to a new File object,
	    //    representing the same bytes, whose name attribute is filename.
	    if (filename !== undefined) {
	      value = value instanceof File
	        ? new File([value], filename, { type: value.type })
	        : new FileLike(value, filename, { type: value.type });
	    }
	  }

	  // 4. Return an entry whose name is name and whose value is value.
	  return { name, value }
	}

	function * makeIterable (entries, type) {
	  // The value pairs to iterate over are this’s entry list’s entries
	  // with the key being the name and the value being the value.
	  for (const { name, value } of entries) {
	    if (type === 'entries') {
	      yield [name, value];
	    } else if (type === 'values') {
	      yield value;
	    } else {
	      yield name;
	    }
	  }
	}

	formdata = { FormData };
	return formdata;
}

var body;
var hasRequiredBody;

function requireBody () {
	if (hasRequiredBody) return body;
	hasRequiredBody = 1;

	const Busboy = requireLib();
	const util = util$e;
	const { ReadableStreamFrom, toUSVString, isBlobLike } = requireUtil();
	const { FormData } = requireFormdata();
	const { kState } = requireSymbols();
	const { webidl } = requireWebidl();
	const { DOMException } = requireConstants$1();
	const { Blob } = require$$6;
	const { kBodyUsed } = symbols$1;
	const assert = require$$0$1;
	const { isErrored } = util$e;
	const { isUint8Array, isArrayBuffer } = require$$4$1;
	const { File } = requireFile();

	let ReadableStream;

	async function * blobGen (blob) {
	  yield * blob.stream();
	}

	// https://fetch.spec.whatwg.org/#concept-bodyinit-extract
	function extractBody (object, keepalive = false) {
	  if (!ReadableStream) {
	    ReadableStream = require$$12.ReadableStream;
	  }

	  // 1. Let stream be object if object is a ReadableStream object.
	  // Otherwise, let stream be a new ReadableStream, and set up stream.
	  let stream = null;

	  // 2. Let action be null.
	  let action = null;

	  // 3. Let source be null.
	  let source = null;

	  // 4. Let length be null.
	  let length = null;

	  // 5. Let Content-Type be null.
	  let contentType = null;

	  // 6. Switch on object:
	  if (object == null) ; else if (object instanceof URLSearchParams) {
	    // URLSearchParams

	    // spec says to run application/x-www-form-urlencoded on body.list
	    // this is implemented in Node.js as apart of an URLSearchParams instance toString method
	    // See: https://github.com/nodejs/node/blob/e46c680bf2b211bbd52cf959ca17ee98c7f657f5/lib/internal/url.js#L490
	    // and https://github.com/nodejs/node/blob/e46c680bf2b211bbd52cf959ca17ee98c7f657f5/lib/internal/url.js#L1100

	    // Set source to the result of running the application/x-www-form-urlencoded serializer with object’s list.
	    source = object.toString();

	    // Set Content-Type to `application/x-www-form-urlencoded;charset=UTF-8`.
	    contentType = 'application/x-www-form-urlencoded;charset=UTF-8';
	  } else if (isArrayBuffer(object)) {
	    // BufferSource/ArrayBuffer

	    // Set source to a copy of the bytes held by object.
	    source = new Uint8Array(object.slice());
	  } else if (ArrayBuffer.isView(object)) {
	    // BufferSource/ArrayBufferView

	    // Set source to a copy of the bytes held by object.
	    source = new Uint8Array(object.buffer.slice(object.byteOffset, object.byteOffset + object.byteLength));
	  } else if (util.isFormDataLike(object)) {
	    const boundary = '----formdata-undici-' + Math.random();
	    const prefix = `--${boundary}\r\nContent-Disposition: form-data`;

	    /*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
	    const escape = (str) =>
	      str.replace(/\n/g, '%0A').replace(/\r/g, '%0D').replace(/"/g, '%22');
	    const normalizeLinefeeds = (value) => value.replace(/\r?\n|\r/g, '\r\n');

	    // Set action to this step: run the multipart/form-data
	    // encoding algorithm, with object’s entry list and UTF-8.
	    action = async function * (object) {
	      const enc = new TextEncoder();

	      for (const [name, value] of object) {
	        if (typeof value === 'string') {
	          yield enc.encode(
	            prefix +
	              `; name="${escape(normalizeLinefeeds(name))}"` +
	              `\r\n\r\n${normalizeLinefeeds(value)}\r\n`
	          );
	        } else {
	          yield enc.encode(
	            prefix +
	              `; name="${escape(normalizeLinefeeds(name))}"` +
	              (value.name ? `; filename="${escape(value.name)}"` : '') +
	              '\r\n' +
	              `Content-Type: ${
	                value.type || 'application/octet-stream'
	              }\r\n\r\n`
	          );

	          yield * blobGen(value);

	          yield enc.encode('\r\n');
	        }
	      }

	      yield enc.encode(`--${boundary}--`);
	    };

	    // Set source to object.
	    source = object;

	    // Set length to unclear, see html/6424 for improving this.
	    // TODO

	    // Set Content-Type to `multipart/form-data; boundary=`,
	    // followed by the multipart/form-data boundary string generated
	    // by the multipart/form-data encoding algorithm.
	    contentType = 'multipart/form-data; boundary=' + boundary;
	  } else if (isBlobLike(object)) {
	    // Blob

	    // Set action to this step: read object.
	    action = blobGen;

	    // Set source to object.
	    source = object;

	    // Set length to object’s size.
	    length = object.size;

	    // If object’s type attribute is not the empty byte sequence, set
	    // Content-Type to its value.
	    if (object.type) {
	      contentType = object.type;
	    }
	  } else if (typeof object[Symbol.asyncIterator] === 'function') {
	    // If keepalive is true, then throw a TypeError.
	    if (keepalive) {
	      throw new TypeError('keepalive')
	    }

	    // If object is disturbed or locked, then throw a TypeError.
	    if (util.isDisturbed(object) || object.locked) {
	      throw new TypeError(
	        'Response body object should not be disturbed or locked'
	      )
	    }

	    stream =
	      object instanceof ReadableStream ? object : ReadableStreamFrom(object);
	  } else {
	    // TODO: byte sequence?
	    // TODO: scalar value string?
	    // TODO: else?
	    source = toUSVString(object);
	    contentType = 'text/plain;charset=UTF-8';
	  }

	  // 7. If source is a byte sequence, then set action to a
	  // step that returns source and length to source’s length.
	  // TODO: What is a "byte sequence?"
	  if (typeof source === 'string' || util.isBuffer(source)) {
	    length = Buffer.byteLength(source);
	  }

	  // 8. If action is non-null, then run these steps in in parallel:
	  if (action != null) {
	    // Run action.
	    let iterator;
	    stream = new ReadableStream({
	      async start () {
	        iterator = action(object)[Symbol.asyncIterator]();
	      },
	      async pull (controller) {
	        const { value, done } = await iterator.next();
	        if (done) {
	          // When running action is done, close stream.
	          queueMicrotask(() => {
	            controller.close();
	          });
	        } else {
	          // Whenever one or more bytes are available and stream is not errored,
	          // enqueue a Uint8Array wrapping an ArrayBuffer containing the available
	          // bytes into stream.
	          if (!isErrored(stream)) {
	            controller.enqueue(new Uint8Array(value));
	          }
	        }
	        return controller.desiredSize > 0
	      },
	      async cancel (reason) {
	        await iterator.return();
	      }
	    });
	  } else if (!stream) {
	    // TODO: Spec doesn't say anything about this?
	    stream = new ReadableStream({
	      async pull (controller) {
	        controller.enqueue(
	          typeof source === 'string' ? new TextEncoder().encode(source) : source
	        );
	        queueMicrotask(() => {
	          controller.close();
	        });
	      }
	    });
	  }

	  // 9. Let body be a body whose stream is stream, source is source,
	  // and length is length.
	  const body = { stream, source, length };

	  // 10. Return body and Content-Type.
	  return [body, contentType]
	}

	// https://fetch.spec.whatwg.org/#bodyinit-safely-extract
	function safelyExtractBody (object, keepalive = false) {
	  if (!ReadableStream) {
	    // istanbul ignore next
	    ReadableStream = require$$12.ReadableStream;
	  }

	  // To safely extract a body and a `Content-Type` value from
	  // a byte sequence or BodyInit object object, run these steps:

	  // 1. If object is a ReadableStream object, then:
	  if (object instanceof ReadableStream) {
	    // Assert: object is neither disturbed nor locked.
	    // istanbul ignore next
	    assert(!util.isDisturbed(object), 'The body has already been consumed.');
	    // istanbul ignore next
	    assert(!object.locked, 'The stream is locked.');
	  }

	  // 2. Return the results of extracting object.
	  return extractBody(object, keepalive)
	}

	function cloneBody (body) {
	  // To clone a body body, run these steps:

	  // https://fetch.spec.whatwg.org/#concept-body-clone

	  // 1. Let « out1, out2 » be the result of teeing body’s stream.
	  const [out1, out2] = body.stream.tee();

	  // 2. Set body’s stream to out1.
	  body.stream = out1;

	  // 3. Return a body whose stream is out2 and other members are copied from body.
	  return {
	    stream: out2,
	    length: body.length,
	    source: body.source
	  }
	}

	async function * consumeBody (body) {
	  if (body) {
	    if (isUint8Array(body)) {
	      yield body;
	    } else {
	      const stream = body.stream;

	      if (util.isDisturbed(stream)) {
	        throw new TypeError('The body has already been consumed.')
	      }

	      if (stream.locked) {
	        throw new TypeError('The stream is locked.')
	      }

	      // Compat.
	      stream[kBodyUsed] = true;

	      yield * stream;
	    }
	  }
	}

	function throwIfAborted (state) {
	  if (state.aborted) {
	    throw new DOMException('The operation was aborted.', 'AbortError')
	  }
	}

	function bodyMixinMethods (instance) {
	  const methods = {
	    async blob () {
	      if (!(this instanceof instance)) {
	        throw new TypeError('Illegal invocation')
	      }

	      throwIfAborted(this[kState]);

	      const chunks = [];

	      for await (const chunk of consumeBody(this[kState].body)) {
	        if (!isUint8Array(chunk)) {
	          throw new TypeError('Expected Uint8Array chunk')
	        }

	        // Assemble one final large blob with Uint8Array's can exhaust memory.
	        // That's why we create create multiple blob's and using references
	        chunks.push(new Blob([chunk]));
	      }

	      return new Blob(chunks, { type: this.headers.get('Content-Type') || '' })
	    },

	    async arrayBuffer () {
	      if (!(this instanceof instance)) {
	        throw new TypeError('Illegal invocation')
	      }

	      throwIfAborted(this[kState]);

	      const contentLength = this.headers.get('content-length');
	      const encoded = this.headers.has('content-encoding');

	      // if we have content length and no encoding, then we can
	      // pre allocate the buffer and just read the data into it
	      if (!encoded && contentLength) {
	        const buffer = new Uint8Array(contentLength);
	        let offset = 0;

	        for await (const chunk of consumeBody(this[kState].body)) {
	          if (!isUint8Array(chunk)) {
	            throw new TypeError('Expected Uint8Array chunk')
	          }

	          buffer.set(chunk, offset);
	          offset += chunk.length;
	        }

	        return buffer.buffer
	      }

	      // if we don't have content length, then we have to allocate 2x the
	      // size of the body, once for consumed data, and once for the final buffer

	      // This could be optimized by using growable ArrayBuffer, but it's not
	      // implemented yet. https://github.com/tc39/proposal-resizablearraybuffer

	      const chunks = [];
	      let size = 0;

	      for await (const chunk of consumeBody(this[kState].body)) {
	        if (!isUint8Array(chunk)) {
	          throw new TypeError('Expected Uint8Array chunk')
	        }

	        chunks.push(chunk);
	        size += chunk.byteLength;
	      }

	      const buffer = new Uint8Array(size);
	      let offset = 0;

	      for (const chunk of chunks) {
	        buffer.set(chunk, offset);
	        offset += chunk.byteLength;
	      }

	      return buffer.buffer
	    },

	    async text () {
	      if (!(this instanceof instance)) {
	        throw new TypeError('Illegal invocation')
	      }

	      throwIfAborted(this[kState]);

	      let result = '';
	      const textDecoder = new TextDecoder();

	      for await (const chunk of consumeBody(this[kState].body)) {
	        if (!isUint8Array(chunk)) {
	          throw new TypeError('Expected Uint8Array chunk')
	        }

	        result += textDecoder.decode(chunk, { stream: true });
	      }

	      // flush
	      result += textDecoder.decode();

	      return result
	    },

	    async json () {
	      if (!(this instanceof instance)) {
	        throw new TypeError('Illegal invocation')
	      }

	      throwIfAborted(this[kState]);

	      return JSON.parse(await this.text())
	    },

	    async formData () {
	      if (!(this instanceof instance)) {
	        throw new TypeError('Illegal invocation')
	      }

	      throwIfAborted(this[kState]);

	      const contentType = this.headers.get('Content-Type');

	      // If mimeType’s essence is "multipart/form-data", then:
	      if (/multipart\/form-data/.test(contentType)) {
	        const headers = {};
	        for (const [key, value] of this.headers) headers[key.toLowerCase()] = value;

	        const responseFormData = new FormData();

	        let busboy;

	        try {
	          busboy = Busboy({ headers });
	        } catch (err) {
	          // Error due to headers:
	          throw Object.assign(new TypeError(), { cause: err })
	        }

	        busboy.on('field', (name, value) => {
	          responseFormData.append(name, value);
	        });
	        busboy.on('file', (name, value, info) => {
	          const { filename, encoding, mimeType } = info;
	          const chunks = [];

	          if (encoding.toLowerCase() === 'base64') {
	            let base64chunk = '';

	            value.on('data', (chunk) => {
	              base64chunk += chunk.toString().replace(/[\r\n]/gm, '');

	              const end = base64chunk.length - base64chunk.length % 4;
	              chunks.push(Buffer.from(base64chunk.slice(0, end), 'base64'));

	              base64chunk = base64chunk.slice(end);
	            });
	            value.on('end', () => {
	              chunks.push(Buffer.from(base64chunk, 'base64'));
	              responseFormData.append(name, new File(chunks, filename, { type: mimeType }));
	            });
	          } else {
	            value.on('data', (chunk) => {
	              chunks.push(chunk);
	            });
	            value.on('end', () => {
	              responseFormData.append(name, new File(chunks, filename, { type: mimeType }));
	            });
	          }
	        });

	        const busboyResolve = new Promise((resolve, reject) => {
	          busboy.on('finish', resolve);
	          busboy.on('error', (err) => reject(err));
	        });

	        if (this.body !== null) for await (const chunk of consumeBody(this[kState].body)) busboy.write(chunk);
	        busboy.end();
	        await busboyResolve;

	        return responseFormData
	      } else if (/application\/x-www-form-urlencoded/.test(contentType)) {
	        // Otherwise, if mimeType’s essence is "application/x-www-form-urlencoded", then:

	        // 1. Let entries be the result of parsing bytes.
	        let entries;
	        try {
	          let text = '';
	          // application/x-www-form-urlencoded parser will keep the BOM.
	          // https://url.spec.whatwg.org/#concept-urlencoded-parser
	          const textDecoder = new TextDecoder('utf-8', { ignoreBOM: true });
	          for await (const chunk of consumeBody(this[kState].body)) {
	            if (!isUint8Array(chunk)) {
	              throw new TypeError('Expected Uint8Array chunk')
	            }
	            text += textDecoder.decode(chunk, { stream: true });
	          }
	          text += textDecoder.decode();
	          entries = new URLSearchParams(text);
	        } catch (err) {
	          // istanbul ignore next: Unclear when new URLSearchParams can fail on a string.
	          // 2. If entries is failure, then throw a TypeError.
	          throw Object.assign(new TypeError(), { cause: err })
	        }

	        // 3. Return a new FormData object whose entries are entries.
	        const formData = new FormData();
	        for (const [name, value] of entries) {
	          formData.append(name, value);
	        }
	        return formData
	      } else {
	        // Wait a tick before checking if the request has been aborted.
	        // Otherwise, a TypeError can be thrown when an AbortError should.
	        await Promise.resolve();

	        throwIfAborted(this[kState]);

	        // Otherwise, throw a TypeError.
	        webidl.errors.exception({
	          header: `${instance.name}.formData`,
	          message: 'Could not parse content as FormData.'
	        });
	      }
	    }
	  };

	  return methods
	}

	const properties = {
	  body: {
	    enumerable: true,
	    get () {
	      if (!this || !this[kState]) {
	        throw new TypeError('Illegal invocation')
	      }

	      return this[kState].body ? this[kState].body.stream : null
	    }
	  },
	  bodyUsed: {
	    enumerable: true,
	    get () {
	      if (!this || !this[kState]) {
	        throw new TypeError('Illegal invocation')
	      }

	      return !!this[kState].body && util.isDisturbed(this[kState].body.stream)
	    }
	  }
	};

	function mixinBody (prototype) {
	  Object.assign(prototype.prototype, bodyMixinMethods(prototype));
	  Object.defineProperties(prototype.prototype, properties);
	}

	body = {
	  extractBody,
	  safelyExtractBody,
	  cloneBody,
	  mixinBody
	};
	return body;
}

const {
  InvalidArgumentError: InvalidArgumentError$d,
  NotSupportedError: NotSupportedError$1
} = errors$1;
const assert$6 = require$$0$1;
const util$c = util$e;

// tokenRegExp and headerCharRegex have been lifted from
// https://github.com/nodejs/node/blob/main/lib/_http_common.js

/**
 * Verifies that the given val is a valid HTTP token
 * per the rules defined in RFC 7230
 * See https://tools.ietf.org/html/rfc7230#section-3.2.6
 */
const tokenRegExp = /^[\^_`a-zA-Z\-0-9!#$%&'*+.|~]+$/;

/**
 * Matches if val contains an invalid field-vchar
 *  field-value    = *( field-content / obs-fold )
 *  field-content  = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 *  field-vchar    = VCHAR / obs-text
 */
const headerCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

// Verifies that a given path is valid does not contain control chars \x00 to \x20
const invalidPathRegex = /[^\u0021-\u00ff]/;

const kHandler = Symbol('handler');

const channels$1 = {};

let extractBody;

const nodeVersion$1 = process.versions.node.split('.');
const nodeMajor$1 = Number(nodeVersion$1[0]);
const nodeMinor$1 = Number(nodeVersion$1[1]);

try {
  const diagnosticsChannel = require('diagnostics_channel');
  channels$1.create = diagnosticsChannel.channel('undici:request:create');
  channels$1.bodySent = diagnosticsChannel.channel('undici:request:bodySent');
  channels$1.headers = diagnosticsChannel.channel('undici:request:headers');
  channels$1.trailers = diagnosticsChannel.channel('undici:request:trailers');
  channels$1.error = diagnosticsChannel.channel('undici:request:error');
} catch {
  channels$1.create = { hasSubscribers: false };
  channels$1.bodySent = { hasSubscribers: false };
  channels$1.headers = { hasSubscribers: false };
  channels$1.trailers = { hasSubscribers: false };
  channels$1.error = { hasSubscribers: false };
}

class Request$2 {
  constructor (origin, {
    path,
    method,
    body,
    headers,
    query,
    idempotent,
    blocking,
    upgrade,
    headersTimeout,
    bodyTimeout,
    throwOnError
  }, handler) {
    if (typeof path !== 'string') {
      throw new InvalidArgumentError$d('path must be a string')
    } else if (
      path[0] !== '/' &&
      !(path.startsWith('http://') || path.startsWith('https://')) &&
      method !== 'CONNECT'
    ) {
      throw new InvalidArgumentError$d('path must be an absolute URL or start with a slash')
    } else if (invalidPathRegex.exec(path) !== null) {
      throw new InvalidArgumentError$d('invalid request path')
    }

    if (typeof method !== 'string') {
      throw new InvalidArgumentError$d('method must be a string')
    } else if (tokenRegExp.exec(method) === null) {
      throw new InvalidArgumentError$d('invalid request method')
    }

    if (upgrade && typeof upgrade !== 'string') {
      throw new InvalidArgumentError$d('upgrade must be a string')
    }

    if (headersTimeout != null && (!Number.isFinite(headersTimeout) || headersTimeout < 0)) {
      throw new InvalidArgumentError$d('invalid headersTimeout')
    }

    if (bodyTimeout != null && (!Number.isFinite(bodyTimeout) || bodyTimeout < 0)) {
      throw new InvalidArgumentError$d('invalid bodyTimeout')
    }

    this.headersTimeout = headersTimeout;

    this.bodyTimeout = bodyTimeout;

    this.throwOnError = throwOnError === true;

    this.method = method;

    if (body == null) {
      this.body = null;
    } else if (util$c.isStream(body)) {
      this.body = body;
    } else if (util$c.isBuffer(body)) {
      this.body = body.byteLength ? body : null;
    } else if (ArrayBuffer.isView(body)) {
      this.body = body.buffer.byteLength ? Buffer.from(body.buffer, body.byteOffset, body.byteLength) : null;
    } else if (body instanceof ArrayBuffer) {
      this.body = body.byteLength ? Buffer.from(body) : null;
    } else if (typeof body === 'string') {
      this.body = body.length ? Buffer.from(body) : null;
    } else if (util$c.isFormDataLike(body) || util$c.isIterable(body) || util$c.isBlobLike(body)) {
      this.body = body;
    } else {
      throw new InvalidArgumentError$d('body must be a string, a Buffer, a Readable stream, an iterable, or an async iterable')
    }

    this.completed = false;

    this.aborted = false;

    this.upgrade = upgrade || null;

    this.path = query ? util$c.buildURL(path, query) : path;

    this.origin = origin;

    this.idempotent = idempotent == null
      ? method === 'HEAD' || method === 'GET'
      : idempotent;

    this.blocking = blocking == null ? false : blocking;

    this.host = null;

    this.contentLength = null;

    this.contentType = null;

    this.headers = '';

    if (Array.isArray(headers)) {
      if (headers.length % 2 !== 0) {
        throw new InvalidArgumentError$d('headers array must be even')
      }
      for (let i = 0; i < headers.length; i += 2) {
        processHeader(this, headers[i], headers[i + 1]);
      }
    } else if (headers && typeof headers === 'object') {
      const keys = Object.keys(headers);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        processHeader(this, key, headers[key]);
      }
    } else if (headers != null) {
      throw new InvalidArgumentError$d('headers must be an object or an array')
    }

    if (util$c.isFormDataLike(this.body)) {
      if (nodeMajor$1 < 16 || (nodeMajor$1 === 16 && nodeMinor$1 < 8)) {
        throw new InvalidArgumentError$d('Form-Data bodies are only supported in node v16.8 and newer.')
      }

      if (!extractBody) {
        extractBody = requireBody().extractBody;
      }

      const [bodyStream, contentType] = extractBody(body);
      if (this.contentType == null) {
        this.contentType = contentType;
        this.headers += `content-type: ${contentType}\r\n`;
      }
      this.body = bodyStream.stream;
    } else if (util$c.isBlobLike(body) && this.contentType == null && body.type) {
      this.contentType = body.type;
      this.headers += `content-type: ${body.type}\r\n`;
    }

    util$c.validateHandler(handler, method, upgrade);

    this.servername = util$c.getServerName(this.host);

    this[kHandler] = handler;

    if (channels$1.create.hasSubscribers) {
      channels$1.create.publish({ request: this });
    }
  }

  onBodySent (chunk) {
    if (this[kHandler].onBodySent) {
      try {
        this[kHandler].onBodySent(chunk);
      } catch (err) {
        this.onError(err);
      }
    }
  }

  onRequestSent () {
    if (channels$1.bodySent.hasSubscribers) {
      channels$1.bodySent.publish({ request: this });
    }
  }

  onConnect (abort) {
    assert$6(!this.aborted);
    assert$6(!this.completed);

    return this[kHandler].onConnect(abort)
  }

  onHeaders (statusCode, headers, resume, statusText) {
    assert$6(!this.aborted);
    assert$6(!this.completed);

    if (channels$1.headers.hasSubscribers) {
      channels$1.headers.publish({ request: this, response: { statusCode, headers, statusText } });
    }

    return this[kHandler].onHeaders(statusCode, headers, resume, statusText)
  }

  onData (chunk) {
    assert$6(!this.aborted);
    assert$6(!this.completed);

    return this[kHandler].onData(chunk)
  }

  onUpgrade (statusCode, headers, socket) {
    assert$6(!this.aborted);
    assert$6(!this.completed);

    return this[kHandler].onUpgrade(statusCode, headers, socket)
  }

  onComplete (trailers) {
    assert$6(!this.aborted);

    this.completed = true;
    if (channels$1.trailers.hasSubscribers) {
      channels$1.trailers.publish({ request: this, trailers });
    }
    return this[kHandler].onComplete(trailers)
  }

  onError (error) {
    if (channels$1.error.hasSubscribers) {
      channels$1.error.publish({ request: this, error });
    }

    if (this.aborted) {
      return
    }
    this.aborted = true;
    return this[kHandler].onError(error)
  }

  addHeader (key, value) {
    processHeader(this, key, value);
    return this
  }
}

function processHeader (request, key, val) {
  if (val && typeof val === 'object') {
    throw new InvalidArgumentError$d(`invalid ${key} header`)
  } else if (val === undefined) {
    return
  }

  if (
    request.host === null &&
    key.length === 4 &&
    key.toLowerCase() === 'host'
  ) {
    // Consumed by Client
    request.host = val;
  } else if (
    request.contentLength === null &&
    key.length === 14 &&
    key.toLowerCase() === 'content-length'
  ) {
    request.contentLength = parseInt(val, 10);
    if (!Number.isFinite(request.contentLength)) {
      throw new InvalidArgumentError$d('invalid content-length header')
    }
  } else if (
    request.contentType === null &&
    key.length === 12 &&
    key.toLowerCase() === 'content-type' &&
    headerCharRegex.exec(val) === null
  ) {
    request.contentType = val;
    request.headers += `${key}: ${val}\r\n`;
  } else if (
    key.length === 17 &&
    key.toLowerCase() === 'transfer-encoding'
  ) {
    throw new InvalidArgumentError$d('invalid transfer-encoding header')
  } else if (
    key.length === 10 &&
    key.toLowerCase() === 'connection'
  ) {
    throw new InvalidArgumentError$d('invalid connection header')
  } else if (
    key.length === 10 &&
    key.toLowerCase() === 'keep-alive'
  ) {
    throw new InvalidArgumentError$d('invalid keep-alive header')
  } else if (
    key.length === 7 &&
    key.toLowerCase() === 'upgrade'
  ) {
    throw new InvalidArgumentError$d('invalid upgrade header')
  } else if (
    key.length === 6 &&
    key.toLowerCase() === 'expect'
  ) {
    throw new NotSupportedError$1('expect header not supported')
  } else if (tokenRegExp.exec(key) === null) {
    throw new InvalidArgumentError$d('invalid header key')
  } else if (headerCharRegex.exec(val) !== null) {
    throw new InvalidArgumentError$d(`invalid ${key} header`)
  } else {
    request.headers += `${key}: ${val}\r\n`;
  }
}

var request$2 = Request$2;

const EventEmitter = require$$0$3;

class Dispatcher$2 extends EventEmitter {
  dispatch () {
    throw new Error('not implemented')
  }

  close () {
    throw new Error('not implemented')
  }

  destroy () {
    throw new Error('not implemented')
  }
}

var dispatcher = Dispatcher$2;

const Dispatcher$1 = dispatcher;
const {
  ClientDestroyedError,
  ClientClosedError,
  InvalidArgumentError: InvalidArgumentError$c
} = errors$1;
const { kDestroy: kDestroy$3, kClose: kClose$3, kDispatch: kDispatch$3, kInterceptors: kInterceptors$3 } = symbols$1;

const kDestroyed = Symbol('destroyed');
const kClosed = Symbol('closed');
const kOnDestroyed = Symbol('onDestroyed');
const kOnClosed = Symbol('onClosed');
const kInterceptedDispatch = Symbol('Intercepted Dispatch');

class DispatcherBase$3 extends Dispatcher$1 {
  constructor () {
    super();

    this[kDestroyed] = false;
    this[kOnDestroyed] = [];
    this[kClosed] = false;
    this[kOnClosed] = [];
  }

  get destroyed () {
    return this[kDestroyed]
  }

  get closed () {
    return this[kClosed]
  }

  get interceptors () {
    return this[kInterceptors$3]
  }

  set interceptors (newInterceptors) {
    if (newInterceptors) {
      for (let i = newInterceptors.length - 1; i >= 0; i--) {
        const interceptor = this[kInterceptors$3][i];
        if (typeof interceptor !== 'function') {
          throw new InvalidArgumentError$c('interceptor must be an function')
        }
      }
    }

    this[kInterceptors$3] = newInterceptors;
  }

  close (callback) {
    if (callback === undefined) {
      return new Promise((resolve, reject) => {
        this.close((err, data) => {
          return err ? reject(err) : resolve(data)
        });
      })
    }

    if (typeof callback !== 'function') {
      throw new InvalidArgumentError$c('invalid callback')
    }

    if (this[kDestroyed]) {
      queueMicrotask(() => callback(new ClientDestroyedError(), null));
      return
    }

    if (this[kClosed]) {
      if (this[kOnClosed]) {
        this[kOnClosed].push(callback);
      } else {
        queueMicrotask(() => callback(null, null));
      }
      return
    }

    this[kClosed] = true;
    this[kOnClosed].push(callback);

    const onClosed = () => {
      const callbacks = this[kOnClosed];
      this[kOnClosed] = null;
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](null, null);
      }
    };

    // Should not error.
    this[kClose$3]()
      .then(() => this.destroy())
      .then(() => {
        queueMicrotask(onClosed);
      });
  }

  destroy (err, callback) {
    if (typeof err === 'function') {
      callback = err;
      err = null;
    }

    if (callback === undefined) {
      return new Promise((resolve, reject) => {
        this.destroy(err, (err, data) => {
          return err ? /* istanbul ignore next: should never error */ reject(err) : resolve(data)
        });
      })
    }

    if (typeof callback !== 'function') {
      throw new InvalidArgumentError$c('invalid callback')
    }

    if (this[kDestroyed]) {
      if (this[kOnDestroyed]) {
        this[kOnDestroyed].push(callback);
      } else {
        queueMicrotask(() => callback(null, null));
      }
      return
    }

    if (!err) {
      err = new ClientDestroyedError();
    }

    this[kDestroyed] = true;
    this[kOnDestroyed].push(callback);

    const onDestroyed = () => {
      const callbacks = this[kOnDestroyed];
      this[kOnDestroyed] = null;
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](null, null);
      }
    };

    // Should not error.
    this[kDestroy$3](err).then(() => {
      queueMicrotask(onDestroyed);
    });
  }

  [kInterceptedDispatch] (opts, handler) {
    if (!this[kInterceptors$3] || this[kInterceptors$3].length === 0) {
      this[kInterceptedDispatch] = this[kDispatch$3];
      return this[kDispatch$3](opts, handler)
    }

    let dispatch = this[kDispatch$3].bind(this);
    for (let i = this[kInterceptors$3].length - 1; i >= 0; i--) {
      dispatch = this[kInterceptors$3][i](dispatch);
    }
    this[kInterceptedDispatch] = dispatch;
    return dispatch(opts, handler)
  }

  dispatch (opts, handler) {
    if (!handler || typeof handler !== 'object') {
      throw new InvalidArgumentError$c('handler must be an object')
    }

    try {
      if (!opts || typeof opts !== 'object') {
        throw new InvalidArgumentError$c('opts must be an object.')
      }

      if (this[kDestroyed]) {
        throw new ClientDestroyedError()
      }

      if (this[kClosed]) {
        throw new ClientClosedError()
      }

      return this[kInterceptedDispatch](opts, handler)
    } catch (err) {
      if (typeof handler.onError !== 'function') {
        throw new InvalidArgumentError$c('invalid onError method')
      }

      handler.onError(err);

      return false
    }
  }
}

var dispatcherBase = DispatcherBase$3;

const net$1 = require$$4;
const assert$5 = require$$0$1;
const util$b = util$e;
const { InvalidArgumentError: InvalidArgumentError$b, ConnectTimeoutError } = errors$1;
let tls; // include tls conditionally since it is not always available

// TODO: session re-use does not wait for the first
// connection to resolve the session and might therefore
// resolve the same servername multiple times even when
// re-use is enabled.

function buildConnector$2 ({ maxCachedSessions, socketPath, timeout, ...opts }) {
  if (maxCachedSessions != null && (!Number.isInteger(maxCachedSessions) || maxCachedSessions < 0)) {
    throw new InvalidArgumentError$b('maxCachedSessions must be a positive integer or zero')
  }

  const options = { path: socketPath, ...opts };
  const sessionCache = new Map();
  timeout = timeout == null ? 10e3 : timeout;
  maxCachedSessions = maxCachedSessions == null ? 100 : maxCachedSessions;

  return function connect ({ hostname, host, protocol, port, servername, httpSocket }, callback) {
    let socket;
    if (protocol === 'https:') {
      if (!tls) {
        tls = require$$4$2;
      }
      servername = servername || options.servername || util$b.getServerName(host) || null;

      const sessionKey = servername || hostname;
      const session = sessionCache.get(sessionKey) || null;

      assert$5(sessionKey);

      socket = tls.connect({
        highWaterMark: 16384, // TLS in node can't have bigger HWM anyway...
        ...options,
        servername,
        session,
        socket: httpSocket, // upgrade socket connection
        port: port || 443,
        host: hostname
      });

      socket
        .on('session', function (session) {
          // cache is disabled
          if (maxCachedSessions === 0) {
            return
          }

          if (sessionCache.size >= maxCachedSessions) {
            // remove the oldest session
            const { value: oldestKey } = sessionCache.keys().next();
            sessionCache.delete(oldestKey);
          }

          sessionCache.set(sessionKey, session);
        })
        .on('error', function (err) {
          if (sessionKey && err.code !== 'UND_ERR_INFO') {
            // TODO (fix): Only delete for session related errors.
            sessionCache.delete(sessionKey);
          }
        });
    } else {
      assert$5(!httpSocket, 'httpSocket can only be sent on TLS update');
      socket = net$1.connect({
        highWaterMark: 64 * 1024, // Same as nodejs fs streams.
        ...options,
        port: port || 80,
        host: hostname
      });
    }

    const cancelTimeout = setupTimeout(() => onConnectTimeout(socket), timeout);

    socket
      .setNoDelay(true)
      .once(protocol === 'https:' ? 'secureConnect' : 'connect', function () {
        cancelTimeout();

        if (callback) {
          const cb = callback;
          callback = null;
          cb(null, this);
        }
      })
      .on('error', function (err) {
        cancelTimeout();

        if (callback) {
          const cb = callback;
          callback = null;
          cb(err);
        }
      });

    return socket
  }
}

function setupTimeout (onConnectTimeout, timeout) {
  if (!timeout) {
    return () => {}
  }

  let s1 = null;
  let s2 = null;
  const timeoutId = setTimeout(() => {
    // setImmediate is added to make sure that we priotorise socket error events over timeouts
    s1 = setImmediate(() => {
      if (process.platform === 'win32') {
        // Windows needs an extra setImmediate probably due to implementation differences in the socket logic
        s2 = setImmediate(() => onConnectTimeout());
      } else {
        onConnectTimeout();
      }
    });
  }, timeout);
  return () => {
    clearTimeout(timeoutId);
    clearImmediate(s1);
    clearImmediate(s2);
  }
}

function onConnectTimeout (socket) {
  util$b.destroy(socket, new ConnectTimeoutError());
}

var connect$2 = buildConnector$2;

var constants$1 = {};

var utils = {};

var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;
	Object.defineProperty(utils, "__esModule", { value: true });
	utils.enumToMap = void 0;
	function enumToMap(obj) {
	    const res = {};
	    Object.keys(obj).forEach((key) => {
	        const value = obj[key];
	        if (typeof value === 'number') {
	            res[key] = value;
	        }
	    });
	    return res;
	}
	utils.enumToMap = enumToMap;
	
	return utils;
}

var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants$1;
	hasRequiredConstants = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.SPECIAL_HEADERS = exports.HEADER_STATE = exports.MINOR = exports.MAJOR = exports.CONNECTION_TOKEN_CHARS = exports.HEADER_CHARS = exports.TOKEN = exports.STRICT_TOKEN = exports.HEX = exports.URL_CHAR = exports.STRICT_URL_CHAR = exports.USERINFO_CHARS = exports.MARK = exports.ALPHANUM = exports.NUM = exports.HEX_MAP = exports.NUM_MAP = exports.ALPHA = exports.FINISH = exports.H_METHOD_MAP = exports.METHOD_MAP = exports.METHODS_RTSP = exports.METHODS_ICE = exports.METHODS_HTTP = exports.METHODS = exports.LENIENT_FLAGS = exports.FLAGS = exports.TYPE = exports.ERROR = void 0;
		const utils_1 = requireUtils();
		(function (ERROR) {
		    ERROR[ERROR["OK"] = 0] = "OK";
		    ERROR[ERROR["INTERNAL"] = 1] = "INTERNAL";
		    ERROR[ERROR["STRICT"] = 2] = "STRICT";
		    ERROR[ERROR["LF_EXPECTED"] = 3] = "LF_EXPECTED";
		    ERROR[ERROR["UNEXPECTED_CONTENT_LENGTH"] = 4] = "UNEXPECTED_CONTENT_LENGTH";
		    ERROR[ERROR["CLOSED_CONNECTION"] = 5] = "CLOSED_CONNECTION";
		    ERROR[ERROR["INVALID_METHOD"] = 6] = "INVALID_METHOD";
		    ERROR[ERROR["INVALID_URL"] = 7] = "INVALID_URL";
		    ERROR[ERROR["INVALID_CONSTANT"] = 8] = "INVALID_CONSTANT";
		    ERROR[ERROR["INVALID_VERSION"] = 9] = "INVALID_VERSION";
		    ERROR[ERROR["INVALID_HEADER_TOKEN"] = 10] = "INVALID_HEADER_TOKEN";
		    ERROR[ERROR["INVALID_CONTENT_LENGTH"] = 11] = "INVALID_CONTENT_LENGTH";
		    ERROR[ERROR["INVALID_CHUNK_SIZE"] = 12] = "INVALID_CHUNK_SIZE";
		    ERROR[ERROR["INVALID_STATUS"] = 13] = "INVALID_STATUS";
		    ERROR[ERROR["INVALID_EOF_STATE"] = 14] = "INVALID_EOF_STATE";
		    ERROR[ERROR["INVALID_TRANSFER_ENCODING"] = 15] = "INVALID_TRANSFER_ENCODING";
		    ERROR[ERROR["CB_MESSAGE_BEGIN"] = 16] = "CB_MESSAGE_BEGIN";
		    ERROR[ERROR["CB_HEADERS_COMPLETE"] = 17] = "CB_HEADERS_COMPLETE";
		    ERROR[ERROR["CB_MESSAGE_COMPLETE"] = 18] = "CB_MESSAGE_COMPLETE";
		    ERROR[ERROR["CB_CHUNK_HEADER"] = 19] = "CB_CHUNK_HEADER";
		    ERROR[ERROR["CB_CHUNK_COMPLETE"] = 20] = "CB_CHUNK_COMPLETE";
		    ERROR[ERROR["PAUSED"] = 21] = "PAUSED";
		    ERROR[ERROR["PAUSED_UPGRADE"] = 22] = "PAUSED_UPGRADE";
		    ERROR[ERROR["PAUSED_H2_UPGRADE"] = 23] = "PAUSED_H2_UPGRADE";
		    ERROR[ERROR["USER"] = 24] = "USER";
		})(exports.ERROR || (exports.ERROR = {}));
		(function (TYPE) {
		    TYPE[TYPE["BOTH"] = 0] = "BOTH";
		    TYPE[TYPE["REQUEST"] = 1] = "REQUEST";
		    TYPE[TYPE["RESPONSE"] = 2] = "RESPONSE";
		})(exports.TYPE || (exports.TYPE = {}));
		(function (FLAGS) {
		    FLAGS[FLAGS["CONNECTION_KEEP_ALIVE"] = 1] = "CONNECTION_KEEP_ALIVE";
		    FLAGS[FLAGS["CONNECTION_CLOSE"] = 2] = "CONNECTION_CLOSE";
		    FLAGS[FLAGS["CONNECTION_UPGRADE"] = 4] = "CONNECTION_UPGRADE";
		    FLAGS[FLAGS["CHUNKED"] = 8] = "CHUNKED";
		    FLAGS[FLAGS["UPGRADE"] = 16] = "UPGRADE";
		    FLAGS[FLAGS["CONTENT_LENGTH"] = 32] = "CONTENT_LENGTH";
		    FLAGS[FLAGS["SKIPBODY"] = 64] = "SKIPBODY";
		    FLAGS[FLAGS["TRAILING"] = 128] = "TRAILING";
		    // 1 << 8 is unused
		    FLAGS[FLAGS["TRANSFER_ENCODING"] = 512] = "TRANSFER_ENCODING";
		})(exports.FLAGS || (exports.FLAGS = {}));
		(function (LENIENT_FLAGS) {
		    LENIENT_FLAGS[LENIENT_FLAGS["HEADERS"] = 1] = "HEADERS";
		    LENIENT_FLAGS[LENIENT_FLAGS["CHUNKED_LENGTH"] = 2] = "CHUNKED_LENGTH";
		    LENIENT_FLAGS[LENIENT_FLAGS["KEEP_ALIVE"] = 4] = "KEEP_ALIVE";
		})(exports.LENIENT_FLAGS || (exports.LENIENT_FLAGS = {}));
		var METHODS;
		(function (METHODS) {
		    METHODS[METHODS["DELETE"] = 0] = "DELETE";
		    METHODS[METHODS["GET"] = 1] = "GET";
		    METHODS[METHODS["HEAD"] = 2] = "HEAD";
		    METHODS[METHODS["POST"] = 3] = "POST";
		    METHODS[METHODS["PUT"] = 4] = "PUT";
		    /* pathological */
		    METHODS[METHODS["CONNECT"] = 5] = "CONNECT";
		    METHODS[METHODS["OPTIONS"] = 6] = "OPTIONS";
		    METHODS[METHODS["TRACE"] = 7] = "TRACE";
		    /* WebDAV */
		    METHODS[METHODS["COPY"] = 8] = "COPY";
		    METHODS[METHODS["LOCK"] = 9] = "LOCK";
		    METHODS[METHODS["MKCOL"] = 10] = "MKCOL";
		    METHODS[METHODS["MOVE"] = 11] = "MOVE";
		    METHODS[METHODS["PROPFIND"] = 12] = "PROPFIND";
		    METHODS[METHODS["PROPPATCH"] = 13] = "PROPPATCH";
		    METHODS[METHODS["SEARCH"] = 14] = "SEARCH";
		    METHODS[METHODS["UNLOCK"] = 15] = "UNLOCK";
		    METHODS[METHODS["BIND"] = 16] = "BIND";
		    METHODS[METHODS["REBIND"] = 17] = "REBIND";
		    METHODS[METHODS["UNBIND"] = 18] = "UNBIND";
		    METHODS[METHODS["ACL"] = 19] = "ACL";
		    /* subversion */
		    METHODS[METHODS["REPORT"] = 20] = "REPORT";
		    METHODS[METHODS["MKACTIVITY"] = 21] = "MKACTIVITY";
		    METHODS[METHODS["CHECKOUT"] = 22] = "CHECKOUT";
		    METHODS[METHODS["MERGE"] = 23] = "MERGE";
		    /* upnp */
		    METHODS[METHODS["M-SEARCH"] = 24] = "M-SEARCH";
		    METHODS[METHODS["NOTIFY"] = 25] = "NOTIFY";
		    METHODS[METHODS["SUBSCRIBE"] = 26] = "SUBSCRIBE";
		    METHODS[METHODS["UNSUBSCRIBE"] = 27] = "UNSUBSCRIBE";
		    /* RFC-5789 */
		    METHODS[METHODS["PATCH"] = 28] = "PATCH";
		    METHODS[METHODS["PURGE"] = 29] = "PURGE";
		    /* CalDAV */
		    METHODS[METHODS["MKCALENDAR"] = 30] = "MKCALENDAR";
		    /* RFC-2068, section 19.6.1.2 */
		    METHODS[METHODS["LINK"] = 31] = "LINK";
		    METHODS[METHODS["UNLINK"] = 32] = "UNLINK";
		    /* icecast */
		    METHODS[METHODS["SOURCE"] = 33] = "SOURCE";
		    /* RFC-7540, section 11.6 */
		    METHODS[METHODS["PRI"] = 34] = "PRI";
		    /* RFC-2326 RTSP */
		    METHODS[METHODS["DESCRIBE"] = 35] = "DESCRIBE";
		    METHODS[METHODS["ANNOUNCE"] = 36] = "ANNOUNCE";
		    METHODS[METHODS["SETUP"] = 37] = "SETUP";
		    METHODS[METHODS["PLAY"] = 38] = "PLAY";
		    METHODS[METHODS["PAUSE"] = 39] = "PAUSE";
		    METHODS[METHODS["TEARDOWN"] = 40] = "TEARDOWN";
		    METHODS[METHODS["GET_PARAMETER"] = 41] = "GET_PARAMETER";
		    METHODS[METHODS["SET_PARAMETER"] = 42] = "SET_PARAMETER";
		    METHODS[METHODS["REDIRECT"] = 43] = "REDIRECT";
		    METHODS[METHODS["RECORD"] = 44] = "RECORD";
		    /* RAOP */
		    METHODS[METHODS["FLUSH"] = 45] = "FLUSH";
		})(METHODS = exports.METHODS || (exports.METHODS = {}));
		exports.METHODS_HTTP = [
		    METHODS.DELETE,
		    METHODS.GET,
		    METHODS.HEAD,
		    METHODS.POST,
		    METHODS.PUT,
		    METHODS.CONNECT,
		    METHODS.OPTIONS,
		    METHODS.TRACE,
		    METHODS.COPY,
		    METHODS.LOCK,
		    METHODS.MKCOL,
		    METHODS.MOVE,
		    METHODS.PROPFIND,
		    METHODS.PROPPATCH,
		    METHODS.SEARCH,
		    METHODS.UNLOCK,
		    METHODS.BIND,
		    METHODS.REBIND,
		    METHODS.UNBIND,
		    METHODS.ACL,
		    METHODS.REPORT,
		    METHODS.MKACTIVITY,
		    METHODS.CHECKOUT,
		    METHODS.MERGE,
		    METHODS['M-SEARCH'],
		    METHODS.NOTIFY,
		    METHODS.SUBSCRIBE,
		    METHODS.UNSUBSCRIBE,
		    METHODS.PATCH,
		    METHODS.PURGE,
		    METHODS.MKCALENDAR,
		    METHODS.LINK,
		    METHODS.UNLINK,
		    METHODS.PRI,
		    // TODO(indutny): should we allow it with HTTP?
		    METHODS.SOURCE,
		];
		exports.METHODS_ICE = [
		    METHODS.SOURCE,
		];
		exports.METHODS_RTSP = [
		    METHODS.OPTIONS,
		    METHODS.DESCRIBE,
		    METHODS.ANNOUNCE,
		    METHODS.SETUP,
		    METHODS.PLAY,
		    METHODS.PAUSE,
		    METHODS.TEARDOWN,
		    METHODS.GET_PARAMETER,
		    METHODS.SET_PARAMETER,
		    METHODS.REDIRECT,
		    METHODS.RECORD,
		    METHODS.FLUSH,
		    // For AirPlay
		    METHODS.GET,
		    METHODS.POST,
		];
		exports.METHOD_MAP = utils_1.enumToMap(METHODS);
		exports.H_METHOD_MAP = {};
		Object.keys(exports.METHOD_MAP).forEach((key) => {
		    if (/^H/.test(key)) {
		        exports.H_METHOD_MAP[key] = exports.METHOD_MAP[key];
		    }
		});
		(function (FINISH) {
		    FINISH[FINISH["SAFE"] = 0] = "SAFE";
		    FINISH[FINISH["SAFE_WITH_CB"] = 1] = "SAFE_WITH_CB";
		    FINISH[FINISH["UNSAFE"] = 2] = "UNSAFE";
		})(exports.FINISH || (exports.FINISH = {}));
		exports.ALPHA = [];
		for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
		    // Upper case
		    exports.ALPHA.push(String.fromCharCode(i));
		    // Lower case
		    exports.ALPHA.push(String.fromCharCode(i + 0x20));
		}
		exports.NUM_MAP = {
		    0: 0, 1: 1, 2: 2, 3: 3, 4: 4,
		    5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
		};
		exports.HEX_MAP = {
		    0: 0, 1: 1, 2: 2, 3: 3, 4: 4,
		    5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
		    A: 0XA, B: 0XB, C: 0XC, D: 0XD, E: 0XE, F: 0XF,
		    a: 0xa, b: 0xb, c: 0xc, d: 0xd, e: 0xe, f: 0xf,
		};
		exports.NUM = [
		    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
		];
		exports.ALPHANUM = exports.ALPHA.concat(exports.NUM);
		exports.MARK = ['-', '_', '.', '!', '~', '*', '\'', '(', ')'];
		exports.USERINFO_CHARS = exports.ALPHANUM
		    .concat(exports.MARK)
		    .concat(['%', ';', ':', '&', '=', '+', '$', ',']);
		// TODO(indutny): use RFC
		exports.STRICT_URL_CHAR = [
		    '!', '"', '$', '%', '&', '\'',
		    '(', ')', '*', '+', ',', '-', '.', '/',
		    ':', ';', '<', '=', '>',
		    '@', '[', '\\', ']', '^', '_',
		    '`',
		    '{', '|', '}', '~',
		].concat(exports.ALPHANUM);
		exports.URL_CHAR = exports.STRICT_URL_CHAR
		    .concat(['\t', '\f']);
		// All characters with 0x80 bit set to 1
		for (let i = 0x80; i <= 0xff; i++) {
		    exports.URL_CHAR.push(i);
		}
		exports.HEX = exports.NUM.concat(['a', 'b', 'c', 'd', 'e', 'f', 'A', 'B', 'C', 'D', 'E', 'F']);
		/* Tokens as defined by rfc 2616. Also lowercases them.
		 *        token       = 1*<any CHAR except CTLs or separators>
		 *     separators     = "(" | ")" | "<" | ">" | "@"
		 *                    | "," | ";" | ":" | "\" | <">
		 *                    | "/" | "[" | "]" | "?" | "="
		 *                    | "{" | "}" | SP | HT
		 */
		exports.STRICT_TOKEN = [
		    '!', '#', '$', '%', '&', '\'',
		    '*', '+', '-', '.',
		    '^', '_', '`',
		    '|', '~',
		].concat(exports.ALPHANUM);
		exports.TOKEN = exports.STRICT_TOKEN.concat([' ']);
		/*
		 * Verify that a char is a valid visible (printable) US-ASCII
		 * character or %x80-FF
		 */
		exports.HEADER_CHARS = ['\t'];
		for (let i = 32; i <= 255; i++) {
		    if (i !== 127) {
		        exports.HEADER_CHARS.push(i);
		    }
		}
		// ',' = \x44
		exports.CONNECTION_TOKEN_CHARS = exports.HEADER_CHARS.filter((c) => c !== 44);
		exports.MAJOR = exports.NUM_MAP;
		exports.MINOR = exports.MAJOR;
		var HEADER_STATE;
		(function (HEADER_STATE) {
		    HEADER_STATE[HEADER_STATE["GENERAL"] = 0] = "GENERAL";
		    HEADER_STATE[HEADER_STATE["CONNECTION"] = 1] = "CONNECTION";
		    HEADER_STATE[HEADER_STATE["CONTENT_LENGTH"] = 2] = "CONTENT_LENGTH";
		    HEADER_STATE[HEADER_STATE["TRANSFER_ENCODING"] = 3] = "TRANSFER_ENCODING";
		    HEADER_STATE[HEADER_STATE["UPGRADE"] = 4] = "UPGRADE";
		    HEADER_STATE[HEADER_STATE["CONNECTION_KEEP_ALIVE"] = 5] = "CONNECTION_KEEP_ALIVE";
		    HEADER_STATE[HEADER_STATE["CONNECTION_CLOSE"] = 6] = "CONNECTION_CLOSE";
		    HEADER_STATE[HEADER_STATE["CONNECTION_UPGRADE"] = 7] = "CONNECTION_UPGRADE";
		    HEADER_STATE[HEADER_STATE["TRANSFER_ENCODING_CHUNKED"] = 8] = "TRANSFER_ENCODING_CHUNKED";
		})(HEADER_STATE = exports.HEADER_STATE || (exports.HEADER_STATE = {}));
		exports.SPECIAL_HEADERS = {
		    'connection': HEADER_STATE.CONNECTION,
		    'content-length': HEADER_STATE.CONTENT_LENGTH,
		    'proxy-connection': HEADER_STATE.CONNECTION,
		    'transfer-encoding': HEADER_STATE.TRANSFER_ENCODING,
		    'upgrade': HEADER_STATE.UPGRADE,
		};
		
} (constants$1));
	return constants$1;
}

const util$a = util$e;
const { kBodyUsed } = symbols$1;
const assert$4 = require$$0$1;
const { InvalidArgumentError: InvalidArgumentError$a } = errors$1;
const EE = require$$0$3;

const redirectableStatusCodes = [300, 301, 302, 303, 307, 308];

const kBody$1 = Symbol('body');

class BodyAsyncIterable {
  constructor (body) {
    this[kBody$1] = body;
    this[kBodyUsed] = false;
  }

  async * [Symbol.asyncIterator] () {
    assert$4(!this[kBodyUsed], 'disturbed');
    this[kBodyUsed] = true;
    yield * this[kBody$1];
  }
}

class RedirectHandler$1 {
  constructor (dispatch, maxRedirections, opts, handler) {
    if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
      throw new InvalidArgumentError$a('maxRedirections must be a positive number')
    }

    util$a.validateHandler(handler, opts.method, opts.upgrade);

    this.dispatch = dispatch;
    this.location = null;
    this.abort = null;
    this.opts = { ...opts, maxRedirections: 0 }; // opts must be a copy
    this.maxRedirections = maxRedirections;
    this.handler = handler;
    this.history = [];

    if (util$a.isStream(this.opts.body)) {
      // TODO (fix): Provide some way for the user to cache the file to e.g. /tmp
      // so that it can be dispatched again?
      // TODO (fix): Do we need 100-expect support to provide a way to do this properly?
      if (util$a.bodyLength(this.opts.body) === 0) {
        this.opts.body
          .on('data', function () {
            assert$4(false);
          });
      }

      if (typeof this.opts.body.readableDidRead !== 'boolean') {
        this.opts.body[kBodyUsed] = false;
        EE.prototype.on.call(this.opts.body, 'data', function () {
          this[kBodyUsed] = true;
        });
      }
    } else if (this.opts.body && typeof this.opts.body.pipeTo === 'function') {
      // TODO (fix): We can't access ReadableStream internal state
      // to determine whether or not it has been disturbed. This is just
      // a workaround.
      this.opts.body = new BodyAsyncIterable(this.opts.body);
    } else if (
      this.opts.body &&
      typeof this.opts.body !== 'string' &&
      !ArrayBuffer.isView(this.opts.body) &&
      util$a.isIterable(this.opts.body)
    ) {
      // TODO: Should we allow re-using iterable if !this.opts.idempotent
      // or through some other flag?
      this.opts.body = new BodyAsyncIterable(this.opts.body);
    }
  }

  onConnect (abort) {
    this.abort = abort;
    this.handler.onConnect(abort, { history: this.history });
  }

  onUpgrade (statusCode, headers, socket) {
    this.handler.onUpgrade(statusCode, headers, socket);
  }

  onError (error) {
    this.handler.onError(error);
  }

  onHeaders (statusCode, headers, resume, statusText) {
    this.location = this.history.length >= this.maxRedirections || util$a.isDisturbed(this.opts.body)
      ? null
      : parseLocation(statusCode, headers);

    if (this.opts.origin) {
      this.history.push(new URL(this.opts.path, this.opts.origin));
    }

    if (!this.location) {
      return this.handler.onHeaders(statusCode, headers, resume, statusText)
    }

    const { origin, pathname, search } = util$a.parseURL(new URL(this.location, this.opts.origin && new URL(this.opts.path, this.opts.origin)));
    const path = search ? `${pathname}${search}` : pathname;

    // Remove headers referring to the original URL.
    // By default it is Host only, unless it's a 303 (see below), which removes also all Content-* headers.
    // https://tools.ietf.org/html/rfc7231#section-6.4
    this.opts.headers = cleanRequestHeaders(this.opts.headers, statusCode === 303, this.opts.origin !== origin);
    this.opts.path = path;
    this.opts.origin = origin;
    this.opts.maxRedirections = 0;

    // https://tools.ietf.org/html/rfc7231#section-6.4.4
    // In case of HTTP 303, always replace method to be either HEAD or GET
    if (statusCode === 303 && this.opts.method !== 'HEAD') {
      this.opts.method = 'GET';
      this.opts.body = null;
    }
  }

  onData (chunk) {
    if (this.location) ; else {
      return this.handler.onData(chunk)
    }
  }

  onComplete (trailers) {
    if (this.location) {
      /*
        https://tools.ietf.org/html/rfc7231#section-6.4

        TLDR: undici always ignores 3xx response trailers as they are not expected in case of redirections
        and neither are useful if present.

        See comment on onData method above for more detailed informations.
      */

      this.location = null;
      this.abort = null;

      this.dispatch(this.opts, this);
    } else {
      this.handler.onComplete(trailers);
    }
  }

  onBodySent (chunk) {
    if (this.handler.onBodySent) {
      this.handler.onBodySent(chunk);
    }
  }
}

function parseLocation (statusCode, headers) {
  if (redirectableStatusCodes.indexOf(statusCode) === -1) {
    return null
  }

  for (let i = 0; i < headers.length; i += 2) {
    if (headers[i].toString().toLowerCase() === 'location') {
      return headers[i + 1]
    }
  }
}

// https://tools.ietf.org/html/rfc7231#section-6.4.4
function shouldRemoveHeader (header, removeContent, unknownOrigin) {
  return (
    (header.length === 4 && header.toString().toLowerCase() === 'host') ||
    (removeContent && header.toString().toLowerCase().indexOf('content-') === 0) ||
    (unknownOrigin && header.length === 13 && header.toString().toLowerCase() === 'authorization') ||
    (unknownOrigin && header.length === 6 && header.toString().toLowerCase() === 'cookie')
  )
}

// https://tools.ietf.org/html/rfc7231#section-6.4
function cleanRequestHeaders (headers, removeContent, unknownOrigin) {
  const ret = [];
  if (Array.isArray(headers)) {
    for (let i = 0; i < headers.length; i += 2) {
      if (!shouldRemoveHeader(headers[i], removeContent, unknownOrigin)) {
        ret.push(headers[i], headers[i + 1]);
      }
    }
  } else if (headers && typeof headers === 'object') {
    for (const key of Object.keys(headers)) {
      if (!shouldRemoveHeader(key, removeContent, unknownOrigin)) {
        ret.push(key, headers[key]);
      }
    }
  } else {
    assert$4(headers == null, 'headers must be an object or an array');
  }
  return ret
}

var RedirectHandler_1 = RedirectHandler$1;

const RedirectHandler = RedirectHandler_1;

function createRedirectInterceptor$2 ({ maxRedirections: defaultMaxRedirections }) {
  return (dispatch) => {
    return function Intercept (opts, handler) {
      const { maxRedirections = defaultMaxRedirections } = opts;

      if (!maxRedirections) {
        return dispatch(opts, handler)
      }

      const redirectHandler = new RedirectHandler(dispatch, maxRedirections, opts, handler);
      opts = { ...opts, maxRedirections: 0 }; // Stop sub dispatcher from also redirecting.
      return dispatch(opts, redirectHandler)
    }
  }
}

var redirectInterceptor = createRedirectInterceptor$2;

var llhttp_wasm;
var hasRequiredLlhttp_wasm;

function requireLlhttp_wasm () {
	if (hasRequiredLlhttp_wasm) return llhttp_wasm;
	hasRequiredLlhttp_wasm = 1;
	llhttp_wasm = 'AGFzbQEAAAABMAhgAX8Bf2ADf39/AX9gBH9/f38Bf2AAAGADf39/AGABfwBgAn9/AGAGf39/f39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQACA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAAzk4AwMEAAAFAAAAAAAABQEFAAUFBQAABgAAAAYGAQEBAQEBAQEBAQEBAQEBAQABAAABAQcAAAUFAAMEBQFwAQ4OBQMBAAIGCAF/AUGAuAQLB/UEHwZtZW1vcnkCAAtfaW5pdGlhbGl6ZQAJGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBAAtsbGh0dHBfaW5pdAAKGGxsaHR0cF9zaG91bGRfa2VlcF9hbGl2ZQA1DGxsaHR0cF9hbGxvYwAMBm1hbGxvYwA6C2xsaHR0cF9mcmVlAA0EZnJlZQA8D2xsaHR0cF9nZXRfdHlwZQAOFWxsaHR0cF9nZXRfaHR0cF9tYWpvcgAPFWxsaHR0cF9nZXRfaHR0cF9taW5vcgAQEWxsaHR0cF9nZXRfbWV0aG9kABEWbGxodHRwX2dldF9zdGF0dXNfY29kZQASEmxsaHR0cF9nZXRfdXBncmFkZQATDGxsaHR0cF9yZXNldAAUDmxsaHR0cF9leGVjdXRlABUUbGxodHRwX3NldHRpbmdzX2luaXQAFg1sbGh0dHBfZmluaXNoABcMbGxodHRwX3BhdXNlABgNbGxodHRwX3Jlc3VtZQAZG2xsaHR0cF9yZXN1bWVfYWZ0ZXJfdXBncmFkZQAaEGxsaHR0cF9nZXRfZXJybm8AGxdsbGh0dHBfZ2V0X2Vycm9yX3JlYXNvbgAcF2xsaHR0cF9zZXRfZXJyb3JfcmVhc29uAB0UbGxodHRwX2dldF9lcnJvcl9wb3MAHhFsbGh0dHBfZXJybm9fbmFtZQAfEmxsaHR0cF9tZXRob2RfbmFtZQAgGmxsaHR0cF9zZXRfbGVu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f2pB5ABJDQAgAEHMAUYNACAAQbACRg0AQQQhBSAEQYgEcUGABEYNAiAEQShxRQ0CC0EADwtBAEEDIAApAyBQGyEFCyAFC10BAn9BACEBAkAgAC0AKEEBRg0AIAAvATIiAkGcf2pB5ABJDQAgAkHMAUYNACACQbACRg0AIAAvATAiAEHAAHENAEEBIQEgAEGIBHFBgARGDQAgAEEocUUhAQsgAQuiAQEDfwJAAkACQCAALQAqRQ0AIAAtACtFDQBBACEDIAAvATAiBEECcUUNAQwCC0EAIQMgAC8BMCIEQQFxRQ0BC0EBIQMgAC0AKEEBRg0AIAAvATIiBUGcf2pB5ABJDQAgBUHMAUYNACAFQbACRg0AIARBwABxDQBBACEDIARBiARxQYAERg0AIARBKHFBAEchAwsgAEEAOwEwIABBADoALyADC5QBAQJ/AkACQAJAIAAtACpFDQAgAC0AK0UNAEEAIQEgAC8BMCICQQJxRQ0BDAILQQAhASAALwEwIgJBAXFFDQELQQEhASAALQAoQQFGDQAgAC8BMiIAQZx/akHkAEkNACAAQcwBRg0AIABBsAJGDQAgAkHAAHENAEEAIQEgAkGIBHFBgARGDQAgAkEocUEARyEBCyABC08AIABBGGpCADcDACAAQgA3AwAgAEEwakIANwMAIABBKGpCADcDACAAQSBqQgA3AwAgAEEQakIANwMAIABBCGpCADcDACAAQbwBNgIcQQALewEBfwJAIAAoAgwiAw0AAkAgACgCBEUNACAAIAE2AgQLAkAgACABIAIQuICAgAAiAw0AIAAoAgwPCyAAIAM2AhxBACEDIAAoAgQiAUUNACAAIAEgAiAAKAIIEYGAgIAAACIBRQ0AIAAgAjYCFCAAIAE2AgwgASEDCyADC9POAQMcfwN+BX8jgICAgABBEGsiAySAgICAACABIQQgASEFIAEhBiABIQcgASEIIAEhCSABIQogASELIAEhDCABIQ0gASEOIAEhDyABIRAgASERIAEhEiABIRMgASEUIAEhFSABIRYgASEXIAEhGCABIRkgASEaIAEhGyABIRwgASEdAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAC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HgwTC0GZASEeDBILQZ0BIR4MEQtBmgEhHgwQC0EBIR4MDwtBmwEhHgwOC0GcASEeDA0LQZ4BIR4MDAtBoAEhHgwLC0GfASEeDAoLQaEBIR4MCQtBogEhHgwIC0GjASEeDAcLQaQBIR4MBgtBpQEhHgwFC0GmASEeDAQLQacBIR4MAwtBqAEhHgwCC0GpASEeDAELQa8BIR4LA0ACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAC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AbsBuwG7AbsBuwG7AbsBuwG7AQG7AQsgCEEBaiEBQdQAIR4MmAILIAhBAWohAUHVACEeDJcCC0HnACEeIAEiIiACRg2mAiACICJrIAAoAgAiJmohIyAiIQggJiEBAkADQCAILQAAIAFB7bOAgABqLQAARw25ASABQQJGDQEgAUEBaiEBIAhBAWoiCCACRw0ACyAAICM2AgAMpwILIABBADYCACAiICZrQQNqIQFBECEeDLYBC0HoACEeIAEiIiACRg2lAiACICJrIAAoAgAiJmohIyAiIQggJiEBAkADQCAILQAAIAFB9rKAgABqLQAARw24ASABQQVGDQEgAUEBaiEBIAhBAWoiCCACRw0ACyAAICM2AgAMpgILIABBADYCACAiICZrQQZqIQFBFiEeDLUBC0HpACEeIAEiIiACRg2kAiACICJrIAAoAgAiJmohIyAiIQggJiEBAkADQCAILQAAIAFB/LKAgABqLQAARw23ASABQQNGDQEgAUEBaiEBIAhBAWoiCCACRw0ACyAAICM2AgAMpQILIABBADYCACAiICZrQQRqIQFBBSEeDLQBCwJAIAEiCCACRw0AQeoAIR4MpAILIAgtAABB2QBHDbUBIAhBAWohAUEIIR4MswELAkAgASIIIAJHDQBB6wAhHgyjAgsCQAJAIAgtAABBsn9qDgMAtgEBtgELIAhBAWohAUHZACEeDJMCCyAIQQFqIQFB2gAhHgySAgsCQCABIgggAkcNAEHsACEeDKICCwJAAkAgCC0AAEG4f2oOCAC1AbUBtQG1AbUBtQEBtQELIAhBAWohAUHYACEeDJICCyAIQQFqIQFB2wAhHgyRAgtB7QAhHiABIiIgAkYNoAIgAiAiayAAKAIAIiZqISMgIiEIICYhAQJAA0AgCC0AACABQYCzgIAAai0AAEcNswEgAUECRg0BIAFBAWohASAIQQFqIgggAkcNAAsgACAjNgIADKECC0EAIR4gAEEANgIAICIgJmtBA2ohAQywAQtB7gAhHiABIiIgAkYNnwIgAiAiayAAKAIAIiZqISMgIiEIICYhAQJAA0AgCC0AACABQYOzgIAAai0AAEcNsgEgAUEERg0BIAFBAWohASAIQQFqIgggAkcNAAsgACAjNgIADKACCyAAQQA2AgAgIiAma0EFaiEBQSMhHgyvAQsCQCABIgggAkcNAEHvACEeDJ8CCwJAAkAgCC0AAEG0f2oOCACyAbIBsgGyAbIBsgEBsgELIAhBAWohAUHdACEeDI8CCyAIQQFqIQFB3gAhHgyOAgsCQCABIgggAkcNAEHwACEeDJ4CCyAILQAAQcUARw2vASAIQQFqIQEM3gELQfEAIR4gASIiIAJGDZwCIAIgImsgACgCACImaiEjICIhCCAmIQECQANAIAgtAAAgAUGIs4CAAGotAABHDa8BIAFBA0YNASABQQFqIQEgCEEBaiIIIAJHDQALIAAgIzYCAAydAgsgAEEANgIAICIgJmtBBGohAUEtIR4MrAELQfIAIR4gASIiIAJGDZsCIAIgImsgACgCACImaiEjICIhCCAmIQECQANAIAgtAAAgAUHQs4CAAGotAABHDa4BIAFBCEYNASABQQFqIQEgCEEBaiIIIAJHDQALIAAgIzYCAAycAgsgAEEANgIAICIgJmtBCWohAUEpIR4MqwELAkAgASIBIAJHDQBB8wAhHgybAgtBASEeIAEtAABB3wBHDaoBIAFBAWohAQzcAQtB9AAhHiABIiIgAkYNmQIgAiAiayAAKAIAIiZqISMgIiEIICYhAQNAIAgtAAAgAUGMs4CAAGotAABHDasBIAFBAUYN9wEgAUEBaiEBIAhBAWoiCCACRw0ACyAAICM2AgAMmQILAkAgASIeIAJHDQBB9QAhHgyZAgsgAiAeayAAKAIAIiJqISYgHiEIICIhAQJAA0AgCC0AACABQY6zgIAAai0AAEcNqwEgAUECRg0BIAFBAWohASAIQQFqIgggAkcNAAsgACAmNgIAQfUAIR4MmQILIABBADYCACAeICJrQQNqIQFBAiEeDKgBCwJAIAEiHiACRw0AQfYAIR4MmAILIAIgHmsgACgCACIiaiEmIB4hCCAiIQECQANAIAgtAAAgAUHws4CAAGotAABHDaoBIAFBAUYNASABQQFqIQEgCEEBaiIIIAJHDQALIAAgJjYCAEH2ACEeDJgCCyAAQQA2AgAgHiAia0ECaiEBQR8hHgynAQsCQCABIh4gAkcNAEH3ACEeDJcCCyACIB5rIAAoAgAiImohJiAeIQggIiEBAkADQCAILQAAIAFB8rOAgABqLQAARw2pASABQQFGDQEgAUEBaiEBIAhBAWoiCCACRw0ACyAAICY2AgBB9wAhHgyXAgsgAEEANgIAIB4gImtBAmohAUEJIR4MpgELAkAgASIIIAJHDQBB+AAhHgyWAgsCQAJAIAgtAABBt39qDgcAqQGpAakBqQGpAQGpAQsgCEEBaiEBQeYAIR4MhgILIAhBAWohAUHnACEeDIUCCwJAIAEiHiACRw0AQfkAIR4MlQILIAIgHmsgACgCACIiaiEmIB4hCCAiIQECQANAIAgtAAAgAUGRs4CAAGotAABHDacBIAFBBUYNASABQQFqIQEgCEEBaiIIIAJHDQALIAAgJjYCAEH5ACEeDJUCCyAAQQA2AgAgHiAia0EGaiEBQRghHgykAQsCQCABIh4gAkcNAEH6ACEeDJQCCyACIB5rIAAoAgAiImohJiAeIQggIiEBAkADQCAILQAAIAFBl7OAgABqLQAARw2mASABQQJGDQEgAUEBaiEBIAhBAWoiCCACRw0ACyAAICY2AgBB+gAhHgyUAgsgAEEANgIAIB4gImtBA2ohAUEXIR4MowELAkAgASIeIAJHDQBB+wAhHgyTAgsgAiAeayAAKAIAIiJqISYgHiEIICIhAQJAA0AgCC0AACABQZqzgIAAai0AAEcNpQEgAUEGRg0BIAFBAWohASAIQQFqIgggAkcNAAsgACAmNgIAQfsAIR4MkwILIABBADYCACAeICJrQQdqIQFBFSEeDKIBCwJAIAEiHiACRw0AQfwAIR4MkgILIAIgHmsgACgCACIiaiEmIB4hCCAiIQECQANAIAgtAAAgAUGhs4CAAGotAABHDaQBIAFBBUYNASABQQFqIQEgCEEBaiIIIAJHDQALIAAgJjYCAEH8ACEeDJICCyAAQQA2AgAgHiAia0EGaiEBQR4hHgyhAQsCQCABIgggAkcNAEH9ACEeDJECCyAILQAAQcwARw2iASAIQQFqIQFBCiEeDKABCwJAIAEiCCACRw0AQf4AIR4MkAILAkACQCAILQAAQb9/ag4PAKMBowGjAaMBowGjAaMBowGjAaMBowGjAaMBAaMBCyAIQQFqIQFB7AAhHgyAAgsgCEEBaiEBQe0AIR4M/wELAkAgASIIIAJHDQBB/wAhHgyPAgsCQAJAIAgtAABBv39qDgMAogEBogELIAhBAWohAUHrACEeDP8BCyAIQQFqIQFB7gAhHgz+AQsCQCABIh4gAkcNAEGAASEeDI4CCyACIB5rIAAoAgAiImohJiAeIQggIiEBAkADQCAILQAAIAFBp7OAgABqLQAARw2gASABQQFGDQEgAUEBaiEBIAhBAWoiCCACRw0ACyAAICY2AgBBgAEhHgyOAgsgAEEANgIAIB4gImtBAmohAUELIR4MnQELAkAgASIIIAJHDQBBgQEhHgyNAgsCQAJAAkACQCAILQAAQVNqDiMAogGiAaIBogGiAaIBogGiAaIBogGiAaIBogGiAaIBogGiAaIBogGiAaIBogGiAQGiAaIBogGiAaIBAqIBogGiAQOiAQsgCEEBaiEBQekAIR4M/wELIAhBAWohAUHqACEeDP4BCyAIQQFqIQFB7wAhHgz9AQsgCEEBaiEBQfAAIR4M/AELAkAgASIeIAJHDQBBggEhHgyMAgsgAiAeayAAKAIAIiJqISYgHiEIICIhAQJAA0AgCC0AACABQamzgIAAai0AAEcNngEgAUEERg0BIAFBAWohASAIQQFqIgggAkcNAAsgACAmNgIAQYIBIR4MjAILIABBADYCACAeICJrQQVqIQFBGSEeDJsBCwJAIAEiIiACRw0AQYMBIR4MiwILIAIgImsgACgCACImaiEeICIhCCAmIQECQANAIAgtAAAgAUGus4CAAGotAABHDZ0BIAFBBUYNASABQQFqIQEgCEEBaiIIIAJHDQALIAAgHjYCAEGDASEeDIsCCyAAQQA2AgBBBiEeICIgJmtBBmohAQyaAQsCQCABIh4gAkcNAEGEASEeDIoCCyACIB5rIAAoAgAiImohJiAeIQggIiEBAkADQCAILQAAIAFBtLOAgABqLQAARw2cASABQQFGDQEgAUEBaiEBIAhBAWoiCCACRw0ACyAAICY2AgBBhAEhHgyKAgsgAEEANgIAIB4gImtBAmohAUEcIR4MmQELAkAgASIeIAJHDQBBhQEhHgyJAgsgAiAeayAAKAIAIiJqISYgHiEIICIhAQJAA0AgCC0AACABQbazgIAAai0AAEcNmwEgAUEBRg0BIAFBAWohASAIQQFqIgggAkcNAAsgACAmNgIAQYUBIR4MiQILIABBADYCACAeICJrQQJqIQFBJyEeDJgBCwJAIAEiCCACRw0AQYYBIR4MiAILAkACQCAILQAAQax/ag4CAAGbAQsgCEEBaiEBQfQAIR4M+AELIAhBAWohAUH1ACEeDPcBCwJAIAEiHiAC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IiEBDDELIABBxAA2AhwgACAiNgIUIAAgATYCDEEAIR4MeQsgACgCBCEBIABBADYCBAJAIAAgASAiEKSAgIAAIgENACAiIQEMMQsgAEHFADYCHCAAICI2AhQgACABNgIMQQAhHgx4CyAAKAIEIQEgAEEANgIEAkAgACABICIQpICAgAAiAQ0AICIhAQw1CyAAQdAANgIcIAAgIjYCFCAAIAE2AgxBACEeDHcLIABBADYCHCAAICI2AhQgAEHQjICAADYCECAAQQc2AgxBACEeDHYLIABBADYCHCAAIAE2AhQgAEHQjICAADYCECAAQQc2AgxBACEeDHULQQAhHiAAQQA2AhwgACAiNgIUIABBv5SAgAA2AhAgAEEHNgIMDHQLIABBADYCHCAAICI2AhQgAEG/lICAADYCECAAQQc2AgxBACEeDHMLIABBADYCHCAAICI2AhQgAEHUjoCAADYCECAAQQc2AgxBACEeDHILIABBADYCHCAAIAE2AhQgAEHBk4CAADYCECAAQQY2AgxBACEeDHELIABBADYCACAiICZrQQZqIQFBJCEeCyAAIB46ACkgASEBDE4LIABBADYCAAtBACEeIABBADYCHCAAIAg2AhQgAEGklICAADYCECAAQQY2AgwMbQsgACgCBCETIABBADYCBCAAIBMgHhCmgICAACITDQEgHkEBaiETC0GdASEeDFsLIABBqgE2AhwgACATNgIMIAAgHkEBajYCFEEAIR4MagsgACgCBCEUIABBADYCBCAAIBQgHhCmgICAACIUDQEgHkEBaiEUC0GaASEeDFgLIABBqwE2AhwgACAUNgIMIAAgHkEBajYCFEEAIR4MZwsgAEEANgIcIAAgFTYCFCAAQfOKgIAANgIQIABBDTYCDEEAIR4MZgsgAEEANgIcIAAgFjYCFCAAQc6NgIAANgIQIABBCTYCDEEAIR4MZQtBASEeCyAAIB46ACsgF0EBaiEWDC4LIABBADYCHCAAIBc2AhQgAEGijYCAADYCECAAQQk2AgxBACEeDGILIABBADYCHCAAIBg2AhQgAEHFioCAADYCECAAQQk2AgxBACEeDGELQQEhHgsgACAeOgAqIBlBAWohGAwsCyAAQQA2AhwgACAZNgIUIABBuI2AgAA2AhAgAEEJNgIMQQAhHgxeCyAAQQA2AhwgACAZNgIUIABB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QR9GG3QhAiAEKAIAIQYCQANAIAYiBCgCBEF4cSAARg0BIAJBHXYhBiACQQF0IQIgBCAGQQRxakEQaiIDKAIAIgYNAAsgAyABNgIAIAFBGGogBDYCACABIAE2AgwgASABNgIIDAELIAQoAggiACABNgIMIAQgATYCCCABQRhqQQA2AgAgASAENgIMIAEgADYCCAtBAEEAKAKotICAAEF/aiIBQX8gARs2Aqi0gIAACwtOAAJAIAANAD8AQRB0DwsCQCAAQf//A3ENACAAQX9MDQACQCAAQRB2QAAiAEF/Rw0AQQBBMDYC+LeAgABBfw8LIABBEHQPCxC/gICAAAALBAAAAAsLjiwBAEGACAuGLAEAAAACAAAAAwAAAAQAAAAFAAAABgAAAAcAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW52YWxpZCBjaGFyIGluIHVybCBxdWVyeQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2JvZHkAQ29udGVudC1MZW5ndGggb3ZlcmZsb3cAQ2h1bmsgc2l6ZSBvdmVyZmxvdwBSZXNwb25zZSBvdmVyZmxvdwBJbnZhbGlkIG1ldGhvZCBmb3IgSFRUUC94LnggcmVxdWVzdABJbnZhbGlkIG1ldGhvZCBmb3IgUlRTUC94LnggcmVxdWVzdABFeHBlY3RlZCBTT1VSQ0UgbWV0aG9kIGZvciBJQ0UveC54IHJlcXVlc3QASW52YWxpZCBjaGFyIGluIHVybCBmcmFnbWVudCBzdGFydABFeHBlY3RlZCBkb3QAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9zdGF0dXMASW52YWxpZCByZXNwb25zZSBzdGF0dXMASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgcGFyYW1ldGVycwBVc2VyIGNhbGxiYWNrIGVycm9yAGBvbl9jaHVua19oZWFkZXJgIGNhbGxiYWNrIGVycm9yAGBvbl9tZXNzYWdlX2JlZ2luYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9tZXNzYWdlX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBVbmV4cGVjdGVkIGNoYXIgaW4gdXJsIHNlcnZlcgBJbnZhbGlkIGhlYWRlciB2YWx1ZSBjaGFyAEludmFsaWQgaGVhZGVyIGZpZWxkIGNoYXIASW52YWxpZCBtaW5vciB2ZXJzaW9uAEludmFsaWQgbWFqb3IgdmVyc2lvbgBFeHBlY3RlZCBzcGFjZSBhZnRlciB2ZXJzaW9uAEV4cGVjdGVkIENSTEYgYWZ0ZXIgdmVyc2lvbgBJbnZhbGlkIGhlYWRlciB0b2tlbgBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX3VybABJbnZhbGlkIGNoYXJhY3RlcnMgaW4gdXJsAFVuZXhwZWN0ZWQgc3RhcnQgY2hhciBpbiB1cmwARG91YmxlIEAgaW4gdXJsAEVtcHR5IENvbnRlbnQtTGVuZ3RoAEludmFsaWQgY2hhcmFjdGVyIGluIENvbnRlbnQtTGVuZ3RoAER1cGxpY2F0ZSBDb250ZW50LUxlbmd0aABJbnZhbGlkIGNoYXIgaW4gdXJsIHBhdGgAQ29udGVudC1MZW5ndGggY2FuJ3QgYmUgcHJlc2VudCB3aXRoIFRyYW5zZmVyLUVuY29kaW5nAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIHNpemUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9oZWFkZXJfdmFsdWUATWlzc2luZyBleHBlY3RlZCBDUiBhZnRlciBoZWFkZXIgdmFsdWUATWlzc2luZyBleHBlY3RlZCBMRiBhZnRlciBoZWFkZXIgdmFsdWUASW52YWxpZCBgVHJhbnNmZXItRW5jb2RpbmdgIGhlYWRlciB2YWx1ZQBQYXVzZWQgYnkgb25faGVhZGVyc19jb21wbGV0ZQBJbnZhbGlkIEVPRiBzdGF0ZQBvbl9jaHVua19oZWFkZXIgcGF1c2UAb25fbWVzc2FnZV9iZWdpbiBwYXVzZQBvbl9jaHVua19jb21wbGV0ZSBwYXVzZQBvbl9tZXNzYWdlX2NvbXBsZXRlIHBhdXNlAFBhdXNlIG9uIENPTk5FQ1QvVXBncmFkZQBQYXVzZSBvbiBQUkkvVXBncmFkZQBFeHBlY3RlZCBIVFRQLzIgQ29ubmVjdGlvbiBQcmVmYWNlAEV4cGVjdGVkIHNwYWNlIGFmdGVyIG1ldGhvZABTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2hlYWRlcl9maWVsZABQYXVzZWQASW52YWxpZCB3b3JkIGVuY291bnRlcmVkAEludmFsaWQgbWV0aG9kIGVuY291bnRlcmVkAFVuZXhwZWN0ZWQgY2hhciBpbiB1cmwgc2NoZW1hAFJlcXVlc3QgaGFzIGludmFsaWQgYFRyYW5zZmVyLUVuY29kaW5nYABNS0FDVElWSVRZAENPUFkATk9USUZZAFBMQVkAUFVUAENIRUNLT1VUAFBPU1QAUkVQT1JUAEhQRV9JTlZBTElEX0NPTlNUQU5UAEdFVABIUEVfU1RSSUNUAFJFRElSRUNUAENPTk5FQ1QASFBFX0lOVkFMSURfU1RBVFVTAE9QVElPTlMAU0VUX1BBUkFNRVRFUgBHRVRfUEFSQU1FVEVSAEhQRV9VU0VSAEhQRV9DQl9DSFVOS19IRUFERVIATUtDQUxFTkRBUgBTRVRVUABURUFSRE9XTgBIUEVfQ0xPU0VEX0NPTk5FQ1RJT04ASFBFX0lOVkFMSURfVkVSU0lPTgBIUEVfQ0JfTUVTU0FHRV9CRUdJTgBIUEVfSU5WQUxJRF9IRUFERVJfVE9LRU4ASFBFX0lOVkFMSURfVVJMAE1LQ09MAEFDTABIUEVfSU5URVJOQUwASFBFX09LAFVOTElOSwBVTkxPQ0sAUFJJAEhQRV9JTlZBTElEX0NPTlRFTlRfTEVOR1RIAEhQRV9VTkVYUEVDVEVEX0NPTlRFTlRfTEVOR1RIAEZMVVNIAFBST1BQQVRDSABNLVNFQVJDSABIUEVfSU5WQUxJRF9UUkFOU0ZFUl9FTkNPRElORwBFeHBlY3RlZCBDUkxGAEhQRV9JTlZBTElEX0NIVU5LX1NJWkUATU9WRQBIUEVfQ0JfSEVBREVSU19DT01QTEVURQBIUEVfQ0JfQ0hVTktfQ09NUExFVEUASFBFX0NCX01FU1NBR0VfQ09NUExFVEUAREVMRVRFAEhQRV9JTlZBTElEX0VPRl9TVEFURQBQQVVTRQBQVVJHRQBNRVJHRQBIUEVfUEFVU0VEX1VQR1JBREUASFBFX1BBVVNFRF9IMl9VUEdSQURFAFNPVVJDRQBBTk5PVU5DRQBUUkFDRQBERVNDUklCRQBVTlNVQlNDUklCRQBSRUNPUkQASFBFX0lOVkFMSURfTUVUSE9EAFBST1BGSU5EAFVO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AAAAAAAAAAAAAAAEAQEFAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAAAAQAAAgAAAAAAAAAAAAAAAAAAAAAAAAMEAAAEBAQEBAQEBAQEBAUEBAQEBAQEBAQEBAQABAAGBwQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAIAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABOT1VOQ0VFQ0tPVVRORUNURVRFQ1JJQkVMVVNIRVRFQURTRUFSQ0hSR0VDVElWSVRZTEVOREFSVkVPVElGWVBUSU9OU0NIU0VBWVNUQVRDSEdFT1JESVJFQ1RPUlRSQ0hQQVJBTUVURVJVUkNFQlNDUklCRUFSRE9XTkFDRUlORE5LQ0tVQlNDUklCRUhUVFAvQURUUC8=';
	return llhttp_wasm;
}

var llhttp_simd_wasm;
var hasRequiredLlhttp_simd_wasm;

function requireLlhttp_simd_wasm () {
	if (hasRequiredLlhttp_simd_wasm) return llhttp_simd_wasm;
	hasRequiredLlhttp_simd_wasm = 1;
	llhttp_simd_wasm = 'AGFzbQEAAAABMAhgAX8Bf2ADf39/AX9gBH9/f38Bf2AAAGADf39/AGABfwBgAn9/AGAGf39/f39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQACA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAAzk4AwMEAAAFAAAAAAAABQEFAAUFBQAABgAAAAYGAQEBAQEBAQEBAQEBAQEBAQABAAABAQcAAAUFAAMEBQFwAQ4OBQMBAAIGCAF/AUGAuAQLB/UEHwZtZW1vcnkCAAtfaW5pdGlhbGl6ZQAJGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBAAtsbGh0dHBfaW5pdAAKGGxsaHR0cF9zaG91bGRfa2VlcF9hbGl2ZQA1DGxsaHR0cF9hbGxvYwAMBm1hbGxvYwA6C2xsaHR0cF9mcmVlAA0EZnJlZQA8D2xsaHR0cF9nZXRfdHlwZQAOFWxsaHR0cF9nZXRfaHR0cF9tYWpvcgAPFWxsaHR0cF9nZXRfaHR0cF9taW5vcgAQEWxsaHR0cF9nZXRfbWV0aG9kABEWbGxodHRwX2dldF9zdGF0dXNfY29kZQASEmxsaHR0cF9nZXRfdXBncmFkZQATDGxsaHR0cF9yZXNldAAUDmxsaHR0cF9leGVjdXRlABUUbGxodHRwX3NldHRpbmdzX2luaXQAFg1sbGh0dHBfZmluaXNoABcMbGxodHRwX3BhdXNlABgNbGxodHRwX3Jlc3VtZQAZG2xsaHR0cF9yZXN1bWVfYWZ0ZXJfdXBncmFkZQAaEGxsaHR0cF9nZXRfZXJybm8AGxdsbGh0dHBfZ2V0X2Vycm9yX3JlYXNvbgAcF2xsaHR0cF9zZXRfZXJyb3JfcmVhc29uAB0UbGxodHRwX2dldF9lcnJvcl9wb3MAHhFsbGh0dHBfZXJybm9fbmFtZQAfEmxsaHR0cF9tZXRob2RfbmFtZQAgGmxsaHR0cF9zZXRfbGVu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ASEeDBELQZoBIR4MEAtBASEeDA8LQZsBIR4MDgtBnAEhHgwNC0GeASEeDAwLQaABIR4MCwtBnwEhHgwKC0GhASEeDAkLQaIBIR4MCAtBowEhHgwHC0GkASEeDAYLQaUBIR4MBQtBpgEhHgwEC0GnASEeDAMLQagBIR4MAgtBqQEhHgwBC0GvASEeCwNAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAC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IAgtAABBtH9qDggAsgGyAbIBsgGyAbIBAbIBCyAIQQFqIQFB3QAhHgyPAgsgCEEBaiEBQd4AIR4MjgILAkAgASIIIAJHDQBB8AAhHgyeAgsgCC0AAEHFAEcNrwEgCEEBaiEBDN4BC0HxACEeIAEiIiACRg2cAiACICJrIAAoAgAiJmohIyAiIQggJiEBAkADQCAILQAAIAFBiLOAgABqLQAARw2vASABQQNGDQEgAUEBaiEBIAhBAWoiCCACRw0ACyAAICM2AgAMnQILIABBADYCACAiICZrQQRqIQFBLSEeDKwBC0HyACEeIAEiIiACRg2bAiACICJrIAAoAgAiJmohIyAiIQggJiEBAkADQCAILQAAIAFB0LOAgABqLQAARw2uASABQQhGDQEgAUEBaiEBIAhBAWoiCCACRw0ACyAAICM2AgAMnAILIABBADYCACAiICZrQQlqIQFBKSEeDKsBCwJAIAEiASACRw0AQfMAIR4MmwILQQEhHiABLQAAQd8ARw2qASABQQFqIQEM3AELQfQAIR4gASIiIAJGDZkCIAIgImsgACgCACImaiEjICIhCCAmIQEDQCAILQAAIAFBjLOAgABqLQAARw2rASABQQFGDfcBIAFBAWohASAIQQFqIgggAkcNAAsgACAjNgIADJkCCwJAIAEiHiACRw0AQfUAIR4MmQILIAIgHmsgACgCACIiaiEmIB4hCCAiIQECQANAIAgtAAAgAUGOs4CAAGotAABHDasBIAFBAkYNASABQQFqIQEgCEEBaiIIIAJHDQALIAAgJjYCAEH1ACEeDJkCCyAAQQA2AgAgHiAia0EDaiEBQQIhHgyoAQsCQCABIh4gAkcNAEH2ACEeDJgCCyACIB5rIAAoAgAiImohJiAeIQggIiEBAkADQCAILQAAIAFB8LOAgABqLQAARw2qASABQQFGDQEgAUEBaiEBIAhBAWoiCCACRw0ACyAAICY2AgBB9gAhHgyYAgsgAEEANgIAIB4gImtBAmohAUEfIR4MpwELAkAgASIeIAJHDQBB9wAhHgyXAgsgAiAeayAAKAIAIiJqISYgHiEIICIhAQJAA0AgCC0AACABQfKzgIAAai0AAEcNqQEgAUEBRg0BIAFBAWohASAIQQFqIgggAkcNAAsgACAmNgIAQfcAIR4MlwILIABBADYCACAeICJrQQJq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LwEwQRByOwEwDIcBCyAAQTY2AhwgACABNgIMIAAgHEEBajYCFEEAIR4MoAELIAEtAABBOkcNAiAAKAIEIR4gAEEANgIEIAAgHiABEKiAgIAAIh4NASABQQFqIQELQTEhHgyOAQsgAEE2NgIcIAAgHjYCDCAAIAFBAWo2AhRBACEeDJ0BCyAAQQA2AhwgACABNgIUIABBh46AgAA2AhAgAEEKNgIMQQAhHgycAQsgAUEBaiEBCyAAQYASOwEqIAAgASACEKWAgIAAGiABIQELQawBIR4MiQELIAAoAgQhHiAAQQA2AgQCQCAAIB4gARCkgICAACIeDQAgASEBDFALIABBxAA2AhwgACABNgIUIAAgHjYCDEEAIR4MmAELIABBADYCHCAAICI2AhQgAEHlmICAADYCECAAQQc2AgwgAEEANgIAQQAhHgyXAQsgACgCBCEeIABBADYCBAJAIAAgHiABEKSAgIAAIh4NACABIQEMTwsgAEHFADYCHCAAIAE2AhQgACAeNgIMQQAhHgyWAQtBACEeIABBADYCHCAAIAE2AhQgAEHrjYCAADYCECAAQQk2AgwMlQELQQEhHgsgACAeOgArIAFBAWohASAALQApQSJGDYsBDEwLIABBADYCHCAAIAE2AhQgAEGijYCAADYCECAAQQk2AgxBACEeDJIBCyAAQQA2AhwgACABNgIUIABBxYqAgAA2AhAgAEEJNgIMQQAhHgyRAQtBASEeCyAAIB46ACogAUEBaiEBDEoLIABBADYCHCAAIAE2AhQgAEG4jYCAADYCECAAQQk2AgxBACEeDI4BCyAAQQA2AgAgJiAja0EEaiEBAkAgAC0AKUEjTw0AIAEhAQxKCyAAQQA2AhwgACABNgIUIABBr4mAgAA2AhAgAEEINgIMQQAhHgyNAQsgAEEANgIAC0EAIR4gAEEANgIcIAAgATYCFCAAQbmbgIAANgIQIABBCDYCDAyLAQsgAEEANgIAICYgI2tBA2ohAQJAIAAtAClBIUcNACABIQEMRwsgAEEANgIcIAAgATYCFCAAQfeJgIAANgIQIABBCDYCDEEAIR4MigELIABBADYCACAmICNrQQRqIQECQCAALQApIh5BXWpBC08NACABIQEMRgsCQCAeQQZLDQBBASAedEHKAHFFDQAgASEBDEYLQQAhHiAAQQA2AhwgACAB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HiAAQQA2AhwgACABNgIUIABB6pCAgAA2AhAgAEEZNgIMDAILIABBIDYCHCAAIAg2AgwgACABQQFqNgIUQQAhHgwBCwJAIAEiASACRw0AQRQhHgwBCyAAQYmAgIAANgIIIAAgATYCBEETIR4LIANBEGokgICAgAAgHguvAQECfyABKAIAIQYCQAJAIAIgA0YNACAEIAZqIQQgBiADaiACayEHIAIgBkF/cyAFaiIGaiEFA0ACQCACLQAAIAQtAABGDQBBAiEEDAMLAkAgBg0AQQAhBCAFIQIMAwsgBkF/aiEGIARBAWohBCACQQFqIgIgA0cNAAsgByEGIAMhAgsgAEEBNgIAIAEgBjYCACAAIAI2AgQPCyABQQA2AgAgACAENgIAIAAgAjYCBAsKACAAELuAgIAAC5U3AQt/I4CAgIAAQRBrIgEkgICAgAACQEEAKAKgtICAAA0AQQAQvoCAgABBgLiEgABrIgJB2QBJDQBBACEDAkBBACgC4LeAgAAiBA0AQQBCfzcC7LeAgABBAEKAgISAgIDAADcC5LeAgABBACABQQhqQXBxQdiq1aoFcyIENgLgt4CAAEEAQQA2AvS3gIAAQQBBADYCxLeAgAALQQAgAjYCzLeAgABBAEGAuISAADYCyLeAgABBAEGAuISAADYCmLSAgABBACAENgKstICAAEEAQX82Aqi0gIAAA0AgA0HEtICAAGogA0G4tICAAGoiBDYCACAEIANBsLSAgABqIgU2AgAgA0G8tICAAGogBTYCACADQcy0gIAAaiADQcC0gIAAaiIFNgIAIAUgBDYCACADQdS0gIAAaiADQci0gIAAaiIENgIAIAQgBTYCACADQdC0gIAAaiAENgIAIANBIGoiA0GAAkcNAAtBgLiEgABBeEGAuISAAGtBD3FBAEGAuISAAEEIakEPcRsiA2oiBEEEaiACIANrQUhqIgNBAXI2AgBBAEEAKALwt4CAADYCpLSAgABBACAENgKgtICAAEEAIAM2ApS0gIAAIAJBgLiEgABqQUxqQTg2AgALAkACQAJAAkACQAJAAkACQAJAAkACQAJAIABB7AFLDQACQEEAKAKItICAACIGQRAgAEETakFwcSAAQQtJGyICQQN2IgR2IgNBA3FFDQAgA0EBcSAEckEBcyIFQQN0IgBBuLSAgABqKAIAIgRBCGohAwJA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AkADQCAGIgQoAgRBeHEgAEYNASACQR12IQYgAkEBdCECIAQgBkEEcWpBEGoiAygCACIGDQALIAMgATYCACABQRhqIAQ2AgAgASABNgIMIAEgATYCCAwBCyAEKAIIIgAgATYCDCAEIAE2AgggAUEYakEANgIAIAEgBDYCDCABIAA2AggLQQBBACgCqLSAgABBf2oiAUF/IAEbNgKotICAAAsLTgACQCAADQA/AEEQdA8LAkAgAEH//wNxDQAgAEF/TA0AAkAgAEEQdkAAIgBBf0cNAEEAQTA2Avi3gIAAQX8PCyAAQRB0DwsQv4CAgAAACwQAAAALC44sAQBBgAgLhiwBAAAAAgAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEludmFsaWQgY2hhciBpbiB1cmwgcXVlcnkAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9ib2R5AENvbnRlbnQtTGVuZ3RoIG92ZXJmbG93AENodW5rIHNpemUgb3ZlcmZsb3cAUmVzcG9uc2Ugb3ZlcmZsb3cASW52YWxpZCBtZXRob2QgZm9yIEhUVFAveC54IHJlcXVlc3QASW52YWxpZCBtZXRob2QgZm9yIFJUU1AveC54IHJlcXVlc3QARXhwZWN0ZWQgU09VUkNFIG1ldGhvZCBmb3IgSUNFL3gueCByZXF1ZXN0AEludmFsaWQgY2hhciBpbiB1cmwgZnJhZ21lbnQgc3RhcnQARXhwZWN0ZWQgZG90AFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fc3RhdHVzAEludmFsaWQgcmVzcG9uc2Ugc3RhdHVzAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIHBhcmFtZXRlcnMAVXNlciBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfaGVhZGVyYCBjYWxsYmFjayBlcnJvcgBgb25fbWVzc2FnZV9iZWdpbmAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fbWVzc2FnZV9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAVW5leHBlY3RlZCBjaGFyIGluIHVybCBzZXJ2ZXIASW52YWxpZCBoZWFkZXIgdmFsdWUgY2hhcgBJbnZhbGlkIGhlYWRlciBmaWVsZCBjaGFyAEludmFsaWQgbWlub3IgdmVyc2lvbgBJbnZhbGlkIG1ham9yIHZlcnNpb24ARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgdmVyc2lvbgBFeHBlY3RlZCBDUkxGIGFmdGVyIHZlcnNpb24ASW52YWxpZCBoZWFkZXIgdG9rZW4AU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl91cmwASW52YWxpZCBjaGFyYWN0ZXJzIGluIHVybABVbmV4cGVjdGVkIHN0YXJ0IGNoYXIgaW4gdXJsAERvdWJsZSBAIGluIHVybABFbXB0eSBDb250ZW50LUxlbmd0aABJbnZhbGlkIGNoYXJhY3RlciBpbiBDb250ZW50LUxlbmd0aABEdXBsaWNhdGUgQ29udGVudC1MZW5ndGgASW52YWxpZCBjaGFyIGluIHVybCBwYXRoAENvbnRlbnQtTGVuZ3RoIGNhbid0IGJlIHByZXNlbnQgd2l0aCBUcmFuc2Zlci1FbmNvZGluZwBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBzaXplAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25faGVhZGVyX3ZhbHVlAE1pc3NpbmcgZXhwZWN0ZWQgQ1IgYWZ0ZXIgaGVhZGVyIHZhbHVlAE1pc3NpbmcgZXhwZWN0ZWQgTEYgYWZ0ZXIgaGVhZGVyIHZhbHVlAEludmFsaWQgYFRyYW5zZmVyLUVuY29kaW5nYCBoZWFkZXIgdmFsdWUAUGF1c2VkIGJ5IG9uX2hlYWRlcnNfY29tcGxldGUASW52YWxpZCBFT0Ygc3RhdGUAb25fY2h1bmtfaGVhZGVyIHBhdXNlAG9uX21lc3NhZ2VfYmVnaW4gcGF1c2UAb25fY2h1bmtfY29tcGxldGUgcGF1c2UAb25fbWVzc2FnZV9jb21wbGV0ZSBwYXVzZQBQYXVzZSBvbiBDT05ORUNUL1VwZ3JhZGUAUGF1c2Ugb24gUFJJL1VwZ3JhZGUARXhwZWN0ZWQgSFRUUC8yIENvbm5lY3Rpb24gUHJlZmFjZQBFeHBlY3RlZCBzcGFjZSBhZnRlciBtZXRob2QAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9oZWFkZXJfZmllbGQAUGF1c2VkAEludmFsaWQgd29yZCBlbmNvdW50ZXJlZABJbnZhbGlkIG1ldGhvZCBlbmNvdW50ZXJlZABVbmV4cGVjdGVkIGNoYXIgaW4gdXJsIHNjaGVtYQBSZXF1ZXN0IGhhcyBpbnZhbGlkIGBUcmFuc2Zlci1FbmNvZGluZ2AATUtBQ1RJVklUWQBDT1BZAE5PVElGWQBQTEFZAFBVVABDSEVDS09VVABQT1NUAFJFUE9SVABIUEVfSU5WQUxJRF9DT05TVEFOVABHRVQASFBFX1NUUklDVABSRURJUkVDVABDT05ORUNUAEhQRV9JTlZBTElEX1NUQVRVUwBPUFRJT05TAFNFVF9QQVJBTUVURVIAR0VUX1BBUkFNRVRFUgBIUEVfVVNFUgBIUEVfQ0JfQ0hVTktfSEVBREVSAE1LQ0FMRU5EQVIAU0VUVVAAVEVBUkRPV04ASFBFX0NMT1NFRF9DT05ORUNUSU9OAEhQRV9JTlZBTElEX1ZFUlNJT04ASFBFX0NCX01FU1NBR0VfQkVHSU4ASFBFX0lOVkFMSURfSEVBREVSX1RPS0VOAEhQRV9JTlZBTElEX1VSTABNS0NPTABBQ0wASFBFX0lOVEVSTkFMAEhQRV9PSwBVTkxJTksAVU5MT0NLAFBSSQBIUEVfSU5WQUxJRF9DT05URU5UX0xFTkdUSABIUEVfVU5FWFBFQ1RFRF9DT05URU5UX0xFTkdUSABGTFVTSABQUk9QUEFUQ0gATS1TRUFSQ0gASFBFX0lOVkFMSURfVFJBTlNGRVJfRU5DT0RJTkcARXhwZWN0ZWQgQ1JMRgBIUEVfSU5WQUxJRF9DSFVOS19TSVpFAE1PVkUASFBFX0NCX0hFQURFUlNfQ09NUExFVEUASFBFX0NCX0NIVU5LX0NPTVBMRVRFAEhQRV9DQl9NRVNTQUdFX0NPTVBMRVRFAERFTEVURQBIUEVfSU5WQUxJRF9FT0ZfU1RBVEUAUEFVU0UAUFVSR0UATUVSR0UASFBFX1BBVVNFRF9VUEdSQURFAEhQRV9QQVVTRURfSDJfVVBHUkFERQBTT1VSQ0UAQU5OT1VOQ0UAVFJBQ0UAREVTQ1JJQkUAVU5TVUJTQ1JJQkUAUkVDT1JEAEhQRV9JTlZBTElEX01FVEhPRABQUk9QRklORABVTkJJTkQAUkVCSU5EAEhQRV9DUl9FWFBFQ1RFRABIUEVfTEZfRVhQRUNURUQASFBFX1BBVVNFRABIRUFEAEV4cGVjdGVkIEhUVFAvANwLAADPCwAA0woAAJkNAAAQDAAAXQsAAF8NAAC1CwAAugoAAHMLAACcCwAA9QsAAHMMAADvCgAA3AwAAEcMAACHCwAAjwwAAL0MAAAvCwAApwwAAKkNAAAEDQAAFw0AACYLAACJDQAA1QwAAM8KAAC0DQAArgoAAKEKAADnCgAAAgsAAD0NAACQCgAA7AsAAMULAACKDAAAcg0AADQMAABADAAA6gsAAIQNAACCDQAAew0AAMsLAACzCgAAhQoAAKUKAAD+DAAAPgwAAJUKAABODQAATA0AADgMAAD4DAAAQwsAAOULAADjCwAALQ0AAPELAABDDQAANA0AAE4LAACcCgAA8gwAAFQLAAAYCwAACgsAAN4KAABYDQAALgwAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAWxvc2VlZXAtYWxpdmUAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQECAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAWNodW5rZWQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAEBAQEBAAABAQABAQABAQEBAQEBAQEBAAAAAAAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZWN0aW9uZW50LWxlbmd0aG9ucm94eS1jb25uZWN0aW9uAAAAAAAAAAAAAAAAAAAAcmFuc2Zlci1lbmNvZGluZ3BncmFkZQ0KDQoNClNNDQoNClRUUC9DRS9UU1AvAAAAAAAAAAAAAAAAAQIAAQMAAAAAAAAAAAAAAAAAAAAAAAAEAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAECAAEDAAAAAAAAAAAAAAAAAAAAAAAABAEBBQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAEAAAIAAAAAAAAAAAAAAAAAAAAAAAADBAAABAQEBAQEBAQEBAQFBAQEBAQEBAQEBAQEAAQABgcEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAACAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATk9VTkNFRUNLT1VUTkVDVEVURUNSSUJFTFVTSEVURUFEU0VBUkNIUkdFQ1RJVklUWUxFTkRBUlZFT1RJRllQVElPTlNDSFNFQVlTVEFUQ0hHRU9SRElSRUNUT1JUUkNIUEFSQU1FVEVSVVJDRUJTQ1JJQkVBUkRPV05BQ0VJTkROS0NLVUJTQ1JJQkVIVFRQL0FEVFAv';
	return llhttp_simd_wasm;
}

/* global WebAssembly */

const assert$3 = require$$0$1;
const net = require$$4;
const util$9 = util$e;
const Request$1 = request$2;
const DispatcherBase$2 = dispatcherBase;
const {
  RequestContentLengthMismatchError,
  ResponseContentLengthMismatchError,
  InvalidArgumentError: InvalidArgumentError$9,
  RequestAbortedError: RequestAbortedError$7,
  HeadersTimeoutError,
  HeadersOverflowError,
  SocketError: SocketError$2,
  InformationalError,
  BodyTimeoutError,
  HTTPParserError
} = errors$1;
const buildConnector$1 = connect$2;
const {
  kUrl: kUrl$2,
  kReset,
  kServerName,
  kClient,
  kBusy: kBusy$1,
  kParser,
  kConnect,
  kBlocking,
  kResuming,
  kRunning: kRunning$3,
  kPending: kPending$2,
  kSize: kSize$4,
  kWriting,
  kQueue: kQueue$1,
  kConnected: kConnected$3,
  kConnecting,
  kNeedDrain: kNeedDrain$2,
  kNoRef,
  kKeepAliveDefaultTimeout,
  kHostHeader,
  kPendingIdx,
  kRunningIdx,
  kError,
  kPipelining,
  kSocket,
  kKeepAliveTimeoutValue,
  kMaxHeadersSize,
  kKeepAliveMaxTimeout,
  kKeepAliveTimeoutThreshold,
  kHeadersTimeout,
  kBodyTimeout,
  kStrictContentLength,
  kConnector,
  kMaxRedirections: kMaxRedirections$1,
  kMaxRequests,
  kCounter,
  kClose: kClose$2,
  kDestroy: kDestroy$2,
  kDispatch: kDispatch$2,
  kInterceptors: kInterceptors$2
} = symbols$1;

const kClosedResolve$1 = Symbol('kClosedResolve');

const channels = {};

try {
  const diagnosticsChannel = require('diagnostics_channel');
  channels.sendHeaders = diagnosticsChannel.channel('undici:client:sendHeaders');
  channels.beforeConnect = diagnosticsChannel.channel('undici:client:beforeConnect');
  channels.connectError = diagnosticsChannel.channel('undici:client:connectError');
  channels.connected = diagnosticsChannel.channel('undici:client:connected');
} catch {
  channels.sendHeaders = { hasSubscribers: false };
  channels.beforeConnect = { hasSubscribers: false };
  channels.connectError = { hasSubscribers: false };
  channels.connected = { hasSubscribers: false };
}

class Client$2 extends DispatcherBase$2 {
  constructor (url, {
    interceptors,
    maxHeaderSize,
    headersTimeout,
    socketTimeout,
    requestTimeout,
    connectTimeout,
    bodyTimeout,
    idleTimeout,
    keepAlive,
    keepAliveTimeout,
    maxKeepAliveTimeout,
    keepAliveMaxTimeout,
    keepAliveTimeoutThreshold,
    socketPath,
    pipelining,
    tls,
    strictContentLength,
    maxCachedSessions,
    maxRedirections,
    connect,
    maxRequestsPerClient
  } = {}) {
    super();

    if (keepAlive !== undefined) {
      throw new InvalidArgumentError$9('unsupported keepAlive, use pipelining=0 instead')
    }

    if (socketTimeout !== undefined) {
      throw new InvalidArgumentError$9('unsupported socketTimeout, use headersTimeout & bodyTimeout instead')
    }

    if (requestTimeout !== undefined) {
      throw new InvalidArgumentError$9('unsupported requestTimeout, use headersTimeout & bodyTimeout instead')
    }

    if (idleTimeout !== undefined) {
      throw new InvalidArgumentError$9('unsupported idleTimeout, use keepAliveTimeout instead')
    }

    if (maxKeepAliveTimeout !== undefined) {
      throw new InvalidArgumentError$9('unsupported maxKeepAliveTimeout, use keepAliveMaxTimeout instead')
    }

    if (maxHeaderSize != null && !Number.isFinite(maxHeaderSize)) {
      throw new InvalidArgumentError$9('invalid maxHeaderSize')
    }

    if (socketPath != null && typeof socketPath !== 'string') {
      throw new InvalidArgumentError$9('invalid socketPath')
    }

    if (connectTimeout != null && (!Number.isFinite(connectTimeout) || connectTimeout < 0)) {
      throw new InvalidArgumentError$9('invalid connectTimeout')
    }

    if (keepAliveTimeout != null && (!Number.isFinite(keepAliveTimeout) || keepAliveTimeout <= 0)) {
      throw new InvalidArgumentError$9('invalid keepAliveTimeout')
    }

    if (keepAliveMaxTimeout != null && (!Number.isFinite(keepAliveMaxTimeout) || keepAliveMaxTimeout <= 0)) {
      throw new InvalidArgumentError$9('invalid keepAliveMaxTimeout')
    }

    if (keepAliveTimeoutThreshold != null && !Number.isFinite(keepAliveTimeoutThreshold)) {
      throw new InvalidArgumentError$9('invalid keepAliveTimeoutThreshold')
    }

    if (headersTimeout != null && (!Number.isInteger(headersTimeout) || headersTimeout < 0)) {
      throw new InvalidArgumentError$9('headersTimeout must be a positive integer or zero')
    }

    if (bodyTimeout != null && (!Number.isInteger(bodyTimeout) || bodyTimeout < 0)) {
      throw new InvalidArgumentError$9('bodyTimeout must be a positive integer or zero')
    }

    if (connect != null && typeof connect !== 'function' && typeof connect !== 'object') {
      throw new InvalidArgumentError$9('connect must be a function or an object')
    }

    if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
      throw new InvalidArgumentError$9('maxRedirections must be a positive number')
    }

    if (maxRequestsPerClient != null && (!Number.isInteger(maxRequestsPerClient) || maxRequestsPerClient < 0)) {
      throw new InvalidArgumentError$9('maxRequestsPerClient must be a positive number')
    }

    if (typeof connect !== 'function') {
      connect = buildConnector$1({
        ...tls,
        maxCachedSessions,
        socketPath,
        timeout: connectTimeout,
        ...connect
      });
    }

    this[kInterceptors$2] = interceptors && interceptors.Client && Array.isArray(interceptors.Client)
      ? interceptors.Client
      : [createRedirectInterceptor$1({ maxRedirections })];
    this[kUrl$2] = util$9.parseOrigin(url);
    this[kConnector] = connect;
    this[kSocket] = null;
    this[kPipelining] = pipelining != null ? pipelining : 1;
    this[kMaxHeadersSize] = maxHeaderSize || 16384;
    this[kKeepAliveDefaultTimeout] = keepAliveTimeout == null ? 4e3 : keepAliveTimeout;
    this[kKeepAliveMaxTimeout] = keepAliveMaxTimeout == null ? 600e3 : keepAliveMaxTimeout;
    this[kKeepAliveTimeoutThreshold] = keepAliveTimeoutThreshold == null ? 1e3 : keepAliveTimeoutThreshold;
    this[kKeepAliveTimeoutValue] = this[kKeepAliveDefaultTimeout];
    this[kServerName] = null;
    this[kResuming] = 0; // 0, idle, 1, scheduled, 2 resuming
    this[kNeedDrain$2] = 0; // 0, idle, 1, scheduled, 2 resuming
    this[kHostHeader] = `host: ${this[kUrl$2].hostname}${this[kUrl$2].port ? `:${this[kUrl$2].port}` : ''}\r\n`;
    this[kBodyTimeout] = bodyTimeout != null ? bodyTimeout : 30e3;
    this[kHeadersTimeout] = headersTimeout != null ? headersTimeout : 30e3;
    this[kStrictContentLength] = strictContentLength == null ? true : strictContentLength;
    this[kMaxRedirections$1] = maxRedirections;
    this[kMaxRequests] = maxRequestsPerClient;
    this[kClosedResolve$1] = null;

    // kQueue is built up of 3 sections separated by
    // the kRunningIdx and kPendingIdx indices.
    // |   complete   |   running   |   pending   |
    //                ^ kRunningIdx ^ kPendingIdx ^ kQueue.length
    // kRunningIdx points to the first running element.
    // kPendingIdx points to the first pending element.
    // This implements a fast queue with an amortized
    // time of O(1).

    this[kQueue$1] = [];
    this[kRunningIdx] = 0;
    this[kPendingIdx] = 0;
  }

  get pipelining () {
    return this[kPipelining]
  }

  set pipelining (value) {
    this[kPipelining] = value;
    resume(this, true);
  }

  get [kPending$2] () {
    return this[kQueue$1].length - this[kPendingIdx]
  }

  get [kRunning$3] () {
    return this[kPendingIdx] - this[kRunningIdx]
  }

  get [kSize$4] () {
    return this[kQueue$1].length - this[kRunningIdx]
  }

  get [kConnected$3] () {
    return !!this[kSocket] && !this[kConnecting] && !this[kSocket].destroyed
  }

  get [kBusy$1] () {
    const socket = this[kSocket];
    return (
      (socket && (socket[kReset] || socket[kWriting] || socket[kBlocking])) ||
      (this[kSize$4] >= (this[kPipelining] || 1)) ||
      this[kPending$2] > 0
    )
  }

  /* istanbul ignore: only used for test */
  [kConnect] (cb) {
    connect$1(this);
    this.once('connect', cb);
  }

  [kDispatch$2] (opts, handler) {
    const origin = opts.origin || this[kUrl$2].origin;

    const request = new Request$1(origin, opts, handler);

    this[kQueue$1].push(request);
    if (this[kResuming]) ; else if (util$9.bodyLength(request.body) == null && util$9.isIterable(request.body)) {
      // Wait a tick in case stream/iterator is ended in the same tick.
      this[kResuming] = 1;
      process.nextTick(resume, this);
    } else {
      resume(this, true);
    }

    if (this[kResuming] && this[kNeedDrain$2] !== 2 && this[kBusy$1]) {
      this[kNeedDrain$2] = 2;
    }

    return this[kNeedDrain$2] < 2
  }

  async [kClose$2] () {
    return new Promise((resolve) => {
      if (!this[kSize$4]) {
        this.destroy(resolve);
      } else {
        this[kClosedResolve$1] = resolve;
      }
    })
  }

  async [kDestroy$2] (err) {
    return new Promise((resolve) => {
      const requests = this[kQueue$1].splice(this[kPendingIdx]);
      for (let i = 0; i < requests.length; i++) {
        const request = requests[i];
        errorRequest(this, request, err);
      }

      const callback = () => {
        if (this[kClosedResolve$1]) {
          this[kClosedResolve$1]();
          this[kClosedResolve$1] = null;
        }
        resolve();
      };

      if (!this[kSocket]) {
        queueMicrotask(callback);
      } else {
        util$9.destroy(this[kSocket].on('close', callback), err);
      }

      resume(this);
    })
  }
}

const constants = requireConstants();
const createRedirectInterceptor$1 = redirectInterceptor;
const EMPTY_BUF = Buffer.alloc(0);

async function lazyllhttp () {
  const llhttpWasmData = process.env.JEST_WORKER_ID ? requireLlhttp_wasm() : undefined;

  let mod;
  try {
    mod = await WebAssembly.compile(Buffer.from(requireLlhttp_simd_wasm(), 'base64'));
  } catch (e) {
    /* istanbul ignore next */

    // We could check if the error was caused by the simd option not
    // being enabled, but the occurring of this other error
    // * https://github.com/emscripten-core/emscripten/issues/11495
    // got me to remove that check to avoid breaking Node 12.
    mod = await WebAssembly.compile(Buffer.from(llhttpWasmData || requireLlhttp_wasm(), 'base64'));
  }

  return await WebAssembly.instantiate(mod, {
    env: {
      /* eslint-disable camelcase */

      wasm_on_url: (p, at, len) => {
        /* istanbul ignore next */
        return 0
      },
      wasm_on_status: (p, at, len) => {
        assert$3.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr;
        const end = start + len;
        return currentParser.onStatus(currentBufferRef.slice(start, end)) || 0
      },
      wasm_on_message_begin: (p) => {
        assert$3.strictEqual(currentParser.ptr, p);
        return currentParser.onMessageBegin() || 0
      },
      wasm_on_header_field: (p, at, len) => {
        assert$3.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr;
        const end = start + len;
        return currentParser.onHeaderField(currentBufferRef.slice(start, end)) || 0
      },
      wasm_on_header_value: (p, at, len) => {
        assert$3.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr;
        const end = start + len;
        return currentParser.onHeaderValue(currentBufferRef.slice(start, end)) || 0
      },
      wasm_on_headers_complete: (p, statusCode, upgrade, shouldKeepAlive) => {
        assert$3.strictEqual(currentParser.ptr, p);
        return currentParser.onHeadersComplete(statusCode, Boolean(upgrade), Boolean(shouldKeepAlive)) || 0
      },
      wasm_on_body: (p, at, len) => {
        assert$3.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr;
        const end = start + len;
        return currentParser.onBody(currentBufferRef.slice(start, end)) || 0
      },
      wasm_on_message_complete: (p) => {
        assert$3.strictEqual(currentParser.ptr, p);
        return currentParser.onMessageComplete() || 0
      }

      /* eslint-enable camelcase */
    }
  })
}

let llhttpInstance = null;
let llhttpPromise = lazyllhttp()
  .catch(() => {
  });

let currentParser = null;
let currentBufferRef = null;
let currentBufferSize = 0;
let currentBufferPtr = null;

const TIMEOUT_HEADERS = 1;
const TIMEOUT_BODY = 2;
const TIMEOUT_IDLE = 3;

class Parser {
  constructor (client, socket, { exports }) {
    assert$3(Number.isFinite(client[kMaxHeadersSize]) && client[kMaxHeadersSize] > 0);

    this.llhttp = exports;
    this.ptr = this.llhttp.llhttp_alloc(constants.TYPE.RESPONSE);
    this.client = client;
    this.socket = socket;
    this.timeout = null;
    this.timeoutValue = null;
    this.timeoutType = null;
    this.statusCode = null;
    this.statusText = '';
    this.upgrade = false;
    this.headers = [];
    this.headersSize = 0;
    this.headersMaxSize = client[kMaxHeadersSize];
    this.shouldKeepAlive = false;
    this.paused = false;
    this.resume = this.resume.bind(this);

    this.bytesRead = 0;

    this.keepAlive = '';
    this.contentLength = '';
  }

  setTimeout (value, type) {
    this.timeoutType = type;
    if (value !== this.timeoutValue) {
      clearTimeout(this.timeout);
      if (value) {
        this.timeout = setTimeout(onParserTimeout, value, this);
        // istanbul ignore else: only for jest
        if (this.timeout.unref) {
          this.timeout.unref();
        }
      } else {
        this.timeout = null;
      }
      this.timeoutValue = value;
    } else if (this.timeout) {
      // istanbul ignore else: only for jest
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }
  }

  resume () {
    if (this.socket.destroyed || !this.paused) {
      return
    }

    assert$3(this.ptr != null);
    assert$3(currentParser == null);

    this.llhttp.llhttp_resume(this.ptr);

    assert$3(this.timeoutType === TIMEOUT_BODY);
    if (this.timeout) {
      // istanbul ignore else: only for jest
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }

    this.paused = false;
    this.execute(this.socket.read() || EMPTY_BUF); // Flush parser.
    this.readMore();
  }

  readMore () {
    while (!this.paused && this.ptr) {
      const chunk = this.socket.read();
      if (chunk === null) {
        break
      }
      this.execute(chunk);
    }
  }

  execute (data) {
    assert$3(this.ptr != null);
    assert$3(currentParser == null);
    assert$3(!this.paused);

    const { socket, llhttp } = this;

    if (data.length > currentBufferSize) {
      if (currentBufferPtr) {
        llhttp.free(currentBufferPtr);
      }
      currentBufferSize = Math.ceil(data.length / 4096) * 4096;
      currentBufferPtr = llhttp.malloc(currentBufferSize);
    }

    new Uint8Array(llhttp.memory.buffer, currentBufferPtr, currentBufferSize).set(data);

    // Call `execute` on the wasm parser.
    // We pass the `llhttp_parser` pointer address, the pointer address of buffer view data,
    // and finally the length of bytes to parse.
    // The return value is an error code or `constants.ERROR.OK`.
    try {
      let ret;

      try {
        currentBufferRef = data;
        currentParser = this;
        ret = llhttp.llhttp_execute(this.ptr, currentBufferPtr, data.length);
        /* eslint-disable-next-line no-useless-catch */
      } catch (err) {
        /* istanbul ignore next: difficult to make a test case for */
        throw err
      } finally {
        currentParser = null;
        currentBufferRef = null;
      }

      const offset = llhttp.llhttp_get_error_pos(this.ptr) - currentBufferPtr;

      if (ret === constants.ERROR.PAUSED_UPGRADE) {
        this.onUpgrade(data.slice(offset));
      } else if (ret === constants.ERROR.PAUSED) {
        this.paused = true;
        socket.unshift(data.slice(offset));
      } else if (ret !== constants.ERROR.OK) {
        const ptr = llhttp.llhttp_get_error_reason(this.ptr);
        let message = '';
        /* istanbul ignore else: difficult to make a test case for */
        if (ptr) {
          const len = new Uint8Array(llhttp.memory.buffer, ptr).indexOf(0);
          message = Buffer.from(llhttp.memory.buffer, ptr, len).toString();
        }
        throw new HTTPParserError(message, constants.ERROR[ret], data.slice(offset))
      }
    } catch (err) {
      util$9.destroy(socket, err);
    }
  }

  finish () {
    try {
      try {
        currentParser = this;
      } finally {
        currentParser = null;
      }
    } catch (err) {
      /* istanbul ignore next: difficult to make a test case for */
      util$9.destroy(this.socket, err);
    }
  }

  destroy () {
    assert$3(this.ptr != null);
    assert$3(currentParser == null);

    this.llhttp.llhttp_free(this.ptr);
    this.ptr = null;

    clearTimeout(this.timeout);
    this.timeout = null;
    this.timeoutValue = null;
    this.timeoutType = null;

    this.paused = false;
  }

  onStatus (buf) {
    this.statusText = buf.toString();
  }

  onMessageBegin () {
    const { socket, client } = this;

    /* istanbul ignore next: difficult to make a test case for */
    if (socket.destroyed) {
      return -1
    }

    const request = client[kQueue$1][client[kRunningIdx]];
    if (!request) {
      return -1
    }
  }

  onHeaderField (buf) {
    const len = this.headers.length;

    if ((len & 1) === 0) {
      this.headers.push(buf);
    } else {
      this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
    }

    this.trackHeader(buf.length);
  }

  onHeaderValue (buf) {
    let len = this.headers.length;

    if ((len & 1) === 1) {
      this.headers.push(buf);
      len += 1;
    } else {
      this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
    }

    const key = this.headers[len - 2];
    if (key.length === 10 && key.toString().toLowerCase() === 'keep-alive') {
      this.keepAlive += buf.toString();
    } else if (key.length === 14 && key.toString().toLowerCase() === 'content-length') {
      this.contentLength += buf.toString();
    }

    this.trackHeader(buf.length);
  }

  trackHeader (len) {
    this.headersSize += len;
    if (this.headersSize >= this.headersMaxSize) {
      util$9.destroy(this.socket, new HeadersOverflowError());
    }
  }

  onUpgrade (head) {
    const { upgrade, client, socket, headers, statusCode } = this;

    assert$3(upgrade);

    const request = client[kQueue$1][client[kRunningIdx]];
    assert$3(request);

    assert$3(!socket.destroyed);
    assert$3(socket === client[kSocket]);
    assert$3(!this.paused);
    assert$3(request.upgrade || request.method === 'CONNECT');

    this.statusCode = null;
    this.statusText = '';
    this.shouldKeepAlive = null;

    assert$3(this.headers.length % 2 === 0);
    this.headers = [];
    this.headersSize = 0;

    socket.unshift(head);

    socket[kParser].destroy();
    socket[kParser] = null;

    socket[kClient] = null;
    socket[kError] = null;
    socket
      .removeListener('error', onSocketError)
      .removeListener('readable', onSocketReadable)
      .removeListener('end', onSocketEnd)
      .removeListener('close', onSocketClose);

    client[kSocket] = null;
    client[kQueue$1][client[kRunningIdx]++] = null;
    client.emit('disconnect', client[kUrl$2], [client], new InformationalError('upgrade'));

    try {
      request.onUpgrade(statusCode, headers, socket);
    } catch (err) {
      util$9.destroy(socket, err);
    }

    resume(client);
  }

  onHeadersComplete (statusCode, upgrade, shouldKeepAlive) {
    const { client, socket, headers, statusText } = this;

    /* istanbul ignore next: difficult to make a test case for */
    if (socket.destroyed) {
      return -1
    }

    const request = client[kQueue$1][client[kRunningIdx]];

    /* istanbul ignore next: difficult to make a test case for */
    if (!request) {
      return -1
    }

    assert$3(!this.upgrade);
    assert$3(this.statusCode < 200);

    if (statusCode === 100) {
      util$9.destroy(socket, new SocketError$2('bad response', util$9.getSocketInfo(socket)));
      return -1
    }

    /* this can only happen if server is misbehaving */
    if (upgrade && !request.upgrade) {
      util$9.destroy(socket, new SocketError$2('bad upgrade', util$9.getSocketInfo(socket)));
      return -1
    }

    assert$3.strictEqual(this.timeoutType, TIMEOUT_HEADERS);

    this.statusCode = statusCode;
    this.shouldKeepAlive = shouldKeepAlive;

    if (this.statusCode >= 200) {
      const bodyTimeout = request.bodyTimeout != null
        ? request.bodyTimeout
        : client[kBodyTimeout];
      this.setTimeout(bodyTimeout, TIMEOUT_BODY);
    } else if (this.timeout) {
      // istanbul ignore else: only for jest
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }

    if (request.method === 'CONNECT') {
      assert$3(client[kRunning$3] === 1);
      this.upgrade = true;
      return 2
    }

    if (upgrade) {
      assert$3(client[kRunning$3] === 1);
      this.upgrade = true;
      return 2
    }

    assert$3(this.headers.length % 2 === 0);
    this.headers = [];
    this.headersSize = 0;

    if (shouldKeepAlive && client[kPipelining]) {
      const keepAliveTimeout = this.keepAlive ? util$9.parseKeepAliveTimeout(this.keepAlive) : null;

      if (keepAliveTimeout != null) {
        const timeout = Math.min(
          keepAliveTimeout - client[kKeepAliveTimeoutThreshold],
          client[kKeepAliveMaxTimeout]
        );
        if (timeout <= 0) {
          socket[kReset] = true;
        } else {
          client[kKeepAliveTimeoutValue] = timeout;
        }
      } else {
        client[kKeepAliveTimeoutValue] = client[kKeepAliveDefaultTimeout];
      }
    } else {
      // Stop more requests from being dispatched.
      socket[kReset] = true;
    }

    let pause;
    try {
      pause = request.onHeaders(statusCode, headers, this.resume, statusText) === false;
    } catch (err) {
      util$9.destroy(socket, err);
      return -1
    }

    if (request.method === 'HEAD') {
      assert$3(socket[kReset]);
      return 1
    }

    if (statusCode < 200) {
      return 1
    }

    if (socket[kBlocking]) {
      socket[kBlocking] = false;
      resume(client);
    }

    return pause ? constants.ERROR.PAUSED : 0
  }

  onBody (buf) {
    const { client, socket, statusCode } = this;

    if (socket.destroyed) {
      return -1
    }

    const request = client[kQueue$1][client[kRunningIdx]];
    assert$3(request);

    assert$3.strictEqual(this.timeoutType, TIMEOUT_BODY);
    if (this.timeout) {
      // istanbul ignore else: only for jest
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }

    assert$3(statusCode >= 200);

    this.bytesRead += buf.length;

    try {
      if (request.onData(buf) === false) {
        return constants.ERROR.PAUSED
      }
    } catch (err) {
      util$9.destroy(socket, err);
      return -1
    }
  }

  onMessageComplete () {
    const { client, socket, statusCode, upgrade, headers, contentLength, bytesRead, shouldKeepAlive } = this;

    if (socket.destroyed && (!statusCode || shouldKeepAlive)) {
      return -1
    }

    if (upgrade) {
      return
    }

    const request = client[kQueue$1][client[kRunningIdx]];
    assert$3(request);

    assert$3(statusCode >= 100);

    this.statusCode = null;
    this.statusText = '';
    this.bytesRead = 0;
    this.contentLength = '';
    this.keepAlive = '';

    assert$3(this.headers.length % 2 === 0);
    this.headers = [];
    this.headersSize = 0;

    if (statusCode < 200) {
      return
    }

    /* istanbul ignore next: should be handled by llhttp? */
    if (request.method !== 'HEAD' && contentLength && bytesRead !== parseInt(contentLength, 10)) {
      util$9.destroy(socket, new ResponseContentLengthMismatchError());
      return -1
    }

    try {
      request.onComplete(headers);
    } catch (err) {
      errorRequest(client, request, err);
    }

    client[kQueue$1][client[kRunningIdx]++] = null;

    if (socket[kWriting]) {
      assert$3.strictEqual(client[kRunning$3], 0);
      // Response completed before request.
      util$9.destroy(socket, new InformationalError('reset'));
      return constants.ERROR.PAUSED
    } else if (!shouldKeepAlive) {
      util$9.destroy(socket, new InformationalError('reset'));
      return constants.ERROR.PAUSED
    } else if (socket[kReset] && client[kRunning$3] === 0) {
      // Destroy socket once all requests have completed.
      // The request at the tail of the pipeline is the one
      // that requested reset and no further requests should
      // have been queued since then.
      util$9.destroy(socket, new InformationalError('reset'));
      return constants.ERROR.PAUSED
    } else if (client[kPipelining] === 1) {
      // We must wait a full event loop cycle to reuse this socket to make sure
      // that non-spec compliant servers are not closing the connection even if they
      // said they won't.
      setImmediate(resume, client);
    } else {
      resume(client);
    }
  }
}

function onParserTimeout (parser) {
  const { socket, timeoutType, client } = parser;

  /* istanbul ignore else */
  if (timeoutType === TIMEOUT_HEADERS) {
    if (!socket[kWriting] || socket.writableNeedDrain || client[kRunning$3] > 1) {
      assert$3(!parser.paused, 'cannot be paused while waiting for headers');
      util$9.destroy(socket, new HeadersTimeoutError());
    }
  } else if (timeoutType === TIMEOUT_BODY) {
    if (!parser.paused) {
      util$9.destroy(socket, new BodyTimeoutError());
    }
  } else if (timeoutType === TIMEOUT_IDLE) {
    assert$3(client[kRunning$3] === 0 && client[kKeepAliveTimeoutValue]);
    util$9.destroy(socket, new InformationalError('socket idle timeout'));
  }
}

function onSocketReadable () {
  const { [kParser]: parser } = this;
  parser.readMore();
}

function onSocketError (err) {
  const { [kParser]: parser } = this;

  assert$3(err.code !== 'ERR_TLS_CERT_ALTNAME_INVALID');

  // On Mac OS, we get an ECONNRESET even if there is a full body to be forwarded
  // to the user.
  if (err.code === 'ECONNRESET' && parser.statusCode && !parser.shouldKeepAlive) {
    // We treat all incoming data so for as a valid response.
    parser.finish();
    return
  }

  this[kError] = err;

  onError(this[kClient], err);
}

function onError (client, err) {
  if (
    client[kRunning$3] === 0 &&
    err.code !== 'UND_ERR_INFO' &&
    err.code !== 'UND_ERR_SOCKET'
  ) {
    // Error is not caused by running request and not a recoverable
    // socket error.

    assert$3(client[kPendingIdx] === client[kRunningIdx]);

    const requests = client[kQueue$1].splice(client[kRunningIdx]);
    for (let i = 0; i < requests.length; i++) {
      const request = requests[i];
      errorRequest(client, request, err);
    }
    assert$3(client[kSize$4] === 0);
  }
}

function onSocketEnd () {
  const { [kParser]: parser } = this;

  if (parser.statusCode && !parser.shouldKeepAlive) {
    // We treat all incoming data so far as a valid response.
    parser.finish();
    return
  }

  util$9.destroy(this, new SocketError$2('other side closed', util$9.getSocketInfo(this)));
}

function onSocketClose () {
  const { [kClient]: client } = this;

  this[kParser].destroy();
  this[kParser] = null;

  const err = this[kError] || new SocketError$2('closed', util$9.getSocketInfo(this));

  client[kSocket] = null;

  if (client.destroyed) {
    assert$3(client[kPending$2] === 0);

    // Fail entire queue.
    const requests = client[kQueue$1].splice(client[kRunningIdx]);
    for (let i = 0; i < requests.length; i++) {
      const request = requests[i];
      errorRequest(client, request, err);
    }
  } else if (client[kRunning$3] > 0 && err.code !== 'UND_ERR_INFO') {
    // Fail head of pipeline.
    const request = client[kQueue$1][client[kRunningIdx]];
    client[kQueue$1][client[kRunningIdx]++] = null;

    errorRequest(client, request, err);
  }

  client[kPendingIdx] = client[kRunningIdx];

  assert$3(client[kRunning$3] === 0);

  client.emit('disconnect', client[kUrl$2], [client], err);

  resume(client);
}

async function connect$1 (client) {
  assert$3(!client[kConnecting]);
  assert$3(!client[kSocket]);

  let { host, hostname, protocol, port } = client[kUrl$2];

  // Resolve ipv6
  if (hostname[0] === '[') {
    const idx = hostname.indexOf(']');

    assert$3(idx !== -1);
    const ip = hostname.substr(1, idx - 1);

    assert$3(net.isIP(ip));
    hostname = ip;
  }

  client[kConnecting] = true;

  if (channels.beforeConnect.hasSubscribers) {
    channels.beforeConnect.publish({
      connectParams: {
        host,
        hostname,
        protocol,
        port,
        servername: client[kServerName]
      },
      connector: client[kConnector]
    });
  }

  try {
    const socket = await new Promise((resolve, reject) => {
      client[kConnector]({
        host,
        hostname,
        protocol,
        port,
        servername: client[kServerName]
      }, (err, socket) => {
        if (err) {
          reject(err);
        } else {
          resolve(socket);
        }
      });
    });

    if (!llhttpInstance) {
      llhttpInstance = await llhttpPromise;
      llhttpPromise = null;
    }

    client[kConnecting] = false;

    assert$3(socket);

    client[kSocket] = socket;

    socket[kNoRef] = false;
    socket[kWriting] = false;
    socket[kReset] = false;
    socket[kBlocking] = false;
    socket[kError] = null;
    socket[kParser] = new Parser(client, socket, llhttpInstance);
    socket[kClient] = client;
    socket[kCounter] = 0;
    socket[kMaxRequests] = client[kMaxRequests];
    socket
      .on('error', onSocketError)
      .on('readable', onSocketReadable)
      .on('end', onSocketEnd)
      .on('close', onSocketClose);

    if (channels.connected.hasSubscribers) {
      channels.connected.publish({
        connectParams: {
          host,
          hostname,
          protocol,
          port,
          servername: client[kServerName]
        },
        connector: client[kConnector],
        socket
      });
    }
    client.emit('connect', client[kUrl$2], [client]);
  } catch (err) {
    client[kConnecting] = false;

    if (channels.connectError.hasSubscribers) {
      channels.connectError.publish({
        connectParams: {
          host,
          hostname,
          protocol,
          port,
          servername: client[kServerName]
        },
        connector: client[kConnector],
        error: err
      });
    }

    if (err.code === 'ERR_TLS_CERT_ALTNAME_INVALID') {
      assert$3(client[kRunning$3] === 0);
      while (client[kPending$2] > 0 && client[kQueue$1][client[kPendingIdx]].servername === client[kServerName]) {
        const request = client[kQueue$1][client[kPendingIdx]++];
        errorRequest(client, request, err);
      }
    } else {
      onError(client, err);
    }

    client.emit('connectionError', client[kUrl$2], [client], err);
  }

  resume(client);
}

function emitDrain (client) {
  client[kNeedDrain$2] = 0;
  client.emit('drain', client[kUrl$2], [client]);
}

function resume (client, sync) {
  if (client[kResuming] === 2) {
    return
  }

  client[kResuming] = 2;

  _resume(client, sync);
  client[kResuming] = 0;

  if (client[kRunningIdx] > 256) {
    client[kQueue$1].splice(0, client[kRunningIdx]);
    client[kPendingIdx] -= client[kRunningIdx];
    client[kRunningIdx] = 0;
  }
}

function _resume (client, sync) {
  while (true) {
    if (client.destroyed) {
      assert$3(client[kPending$2] === 0);
      return
    }

    if (client.closed && !client[kSize$4]) {
      client.destroy();
      return
    }

    const socket = client[kSocket];

    if (socket) {
      if (client[kSize$4] === 0) {
        if (!socket[kNoRef] && socket.unref) {
          socket.unref();
          socket[kNoRef] = true;
        }
      } else if (socket[kNoRef] && socket.ref) {
        socket.ref();
        socket[kNoRef] = false;
      }

      if (client[kSize$4] === 0) {
        if (socket[kParser].timeoutType !== TIMEOUT_IDLE) {
          socket[kParser].setTimeout(client[kKeepAliveTimeoutValue], TIMEOUT_IDLE);
        }
      } else if (client[kRunning$3] > 0 && socket[kParser].statusCode < 200) {
        if (socket[kParser].timeoutType !== TIMEOUT_HEADERS) {
          const request = client[kQueue$1][client[kRunningIdx]];
          const headersTimeout = request.headersTimeout != null
            ? request.headersTimeout
            : client[kHeadersTimeout];
          socket[kParser].setTimeout(headersTimeout, TIMEOUT_HEADERS);
        }
      }
    }

    if (client[kBusy$1]) {
      client[kNeedDrain$2] = 2;
    } else if (client[kNeedDrain$2] === 2) {
      if (sync) {
        client[kNeedDrain$2] = 1;
        process.nextTick(emitDrain, client);
      } else {
        emitDrain(client);
      }
      continue
    }

    if (client[kPending$2] === 0) {
      return
    }

    if (client[kRunning$3] >= (client[kPipelining] || 1)) {
      return
    }

    const request = client[kQueue$1][client[kPendingIdx]];

    if (client[kUrl$2].protocol === 'https:' && client[kServerName] !== request.servername) {
      if (client[kRunning$3] > 0) {
        return
      }

      client[kServerName] = request.servername;

      if (socket && socket.servername !== request.servername) {
        util$9.destroy(socket, new InformationalError('servername changed'));
        return
      }
    }

    if (client[kConnecting]) {
      return
    }

    if (!socket) {
      connect$1(client);
      continue
    }

    if (socket.destroyed || socket[kWriting] || socket[kReset] || socket[kBlocking]) {
      return
    }

    if (client[kRunning$3] > 0 && !request.idempotent) {
      // Non-idempotent request cannot be retried.
      // Ensure that no other requests are inflight and
      // could cause failure.
      return
    }

    if (client[kRunning$3] > 0 && (request.upgrade || request.method === 'CONNECT')) {
      // Don't dispatch an upgrade until all preceding requests have completed.
      // A misbehaving server might upgrade the connection before all pipelined
      // request has completed.
      return
    }

    if (util$9.isStream(request.body) && util$9.bodyLength(request.body) === 0) {
      request.body
        .on('data', /* istanbul ignore next */ function () {
          /* istanbul ignore next */
          assert$3(false);
        })
        .on('error', function (err) {
          errorRequest(client, request, err);
        })
        .on('end', function () {
          util$9.destroy(this);
        });

      request.body = null;
    }

    if (client[kRunning$3] > 0 &&
      (util$9.isStream(request.body) || util$9.isAsyncIterable(request.body))) {
      // Request with stream or iterator body can error while other requests
      // are inflight and indirectly error those as well.
      // Ensure this doesn't happen by waiting for inflight
      // to complete before dispatching.

      // Request with stream or iterator body cannot be retried.
      // Ensure that no other requests are inflight and
      // could cause failure.
      return
    }

    if (!request.aborted && write(client, request)) {
      client[kPendingIdx]++;
    } else {
      client[kQueue$1].splice(client[kPendingIdx], 1);
    }
  }
}

function write (client, request) {
  const { body, method, path, host, upgrade, headers, blocking } = request;

  // https://tools.ietf.org/html/rfc7231#section-4.3.1
  // https://tools.ietf.org/html/rfc7231#section-4.3.2
  // https://tools.ietf.org/html/rfc7231#section-4.3.5

  // Sending a payload body on a request that does not
  // expect it can cause undefined behavior on some
  // servers and corrupt connection state. Do not
  // re-use the connection for further requests.

  const expectsPayload = (
    method === 'PUT' ||
    method === 'POST' ||
    method === 'PATCH'
  );

  if (body && typeof body.read === 'function') {
    // Try to read EOF in order to get length.
    body.read(0);
  }

  let contentLength = util$9.bodyLength(body);

  if (contentLength === null) {
    contentLength = request.contentLength;
  }

  if (contentLength === 0 && !expectsPayload) {
    // https://tools.ietf.org/html/rfc7230#section-3.3.2
    // A user agent SHOULD NOT send a Content-Length header field when
    // the request message does not contain a payload body and the method
    // semantics do not anticipate such a body.

    contentLength = null;
  }

  if (request.contentLength !== null && request.contentLength !== contentLength) {
    if (client[kStrictContentLength]) {
      errorRequest(client, request, new RequestContentLengthMismatchError());
      return false
    }

    process.emitWarning(new RequestContentLengthMismatchError());
  }

  const socket = client[kSocket];

  try {
    request.onConnect((err) => {
      if (request.aborted || request.completed) {
        return
      }

      errorRequest(client, request, err || new RequestAbortedError$7());

      util$9.destroy(socket, new InformationalError('aborted'));
    });
  } catch (err) {
    errorRequest(client, request, err);
  }

  if (request.aborted) {
    return false
  }

  if (method === 'HEAD') {
    // https://github.com/mcollina/undici/issues/258

    // Close after a HEAD request to interop with misbehaving servers
    // that may send a body in the response.

    socket[kReset] = true;
  }

  if (upgrade || method === 'CONNECT') {
    // On CONNECT or upgrade, block pipeline from dispatching further
    // requests on this connection.

    socket[kReset] = true;
  }

  if (client[kMaxRequests] && socket[kCounter]++ >= client[kMaxRequests]) {
    socket[kReset] = true;
  }

  if (blocking) {
    socket[kBlocking] = true;
  }

  let header = `${method} ${path} HTTP/1.1\r\n`;

  if (typeof host === 'string') {
    header += `host: ${host}\r\n`;
  } else {
    header += client[kHostHeader];
  }

  if (upgrade) {
    header += `connection: upgrade\r\nupgrade: ${upgrade}\r\n`;
  } else if (client[kPipelining]) {
    header += 'connection: keep-alive\r\n';
  } else {
    header += 'connection: close\r\n';
  }

  if (headers) {
    header += headers;
  }

  if (channels.sendHeaders.hasSubscribers) {
    channels.sendHeaders.publish({ request, headers: header, socket });
  }

  /* istanbul ignore else: assertion */
  if (!body) {
    if (contentLength === 0) {
      socket.write(`${header}content-length: 0\r\n\r\n`, 'ascii');
    } else {
      assert$3(contentLength === null, 'no body must not have content length');
      socket.write(`${header}\r\n`, 'ascii');
    }
    request.onRequestSent();
  } else if (util$9.isBuffer(body)) {
    assert$3(contentLength === body.byteLength, 'buffer body must have content length');

    socket.cork();
    socket.write(`${header}content-length: ${contentLength}\r\n\r\n`, 'ascii');
    socket.write(body);
    socket.uncork();
    request.onBodySent(body);
    request.onRequestSent();
    if (!expectsPayload) {
      socket[kReset] = true;
    }
  } else if (util$9.isBlobLike(body)) {
    if (typeof body.stream === 'function') {
      writeIterable({ body: body.stream(), client, request, socket, contentLength, header, expectsPayload });
    } else {
      writeBlob({ body, client, request, socket, contentLength, header, expectsPayload });
    }
  } else if (util$9.isStream(body)) {
    writeStream({ body, client, request, socket, contentLength, header, expectsPayload });
  } else if (util$9.isIterable(body)) {
    writeIterable({ body, client, request, socket, contentLength, header, expectsPayload });
  } else {
    assert$3(false);
  }

  return true
}

function writeStream ({ body, client, request, socket, contentLength, header, expectsPayload }) {
  assert$3(contentLength !== 0 || client[kRunning$3] === 0, 'stream body cannot be pipelined');

  let finished = false;

  const writer = new AsyncWriter({ socket, request, contentLength, client, expectsPayload, header });

  const onData = function (chunk) {
    try {
      assert$3(!finished);

      if (!writer.write(chunk) && this.pause) {
        this.pause();
      }
    } catch (err) {
      util$9.destroy(this, err);
    }
  };
  const onDrain = function () {
    assert$3(!finished);

    if (body.resume) {
      body.resume();
    }
  };
  const onAbort = function () {
    onFinished(new RequestAbortedError$7());
  };
  const onFinished = function (err) {
    if (finished) {
      return
    }

    finished = true;

    assert$3(socket.destroyed || (socket[kWriting] && client[kRunning$3] <= 1));

    socket
      .off('drain', onDrain)
      .off('error', onFinished);

    body
      .removeListener('data', onData)
      .removeListener('end', onFinished)
      .removeListener('error', onFinished)
      .removeListener('close', onAbort);

    if (!err) {
      try {
        writer.end();
      } catch (er) {
        err = er;
      }
    }

    writer.destroy(err);

    if (err && (err.code !== 'UND_ERR_INFO' || err.message !== 'reset')) {
      util$9.destroy(body, err);
    } else {
      util$9.destroy(body);
    }
  };

  body
    .on('data', onData)
    .on('end', onFinished)
    .on('error', onFinished)
    .on('close', onAbort);

  if (body.resume) {
    body.resume();
  }

  socket
    .on('drain', onDrain)
    .on('error', onFinished);
}

async function writeBlob ({ body, client, request, socket, contentLength, header, expectsPayload }) {
  assert$3(contentLength === body.size, 'blob body must have content length');

  try {
    if (contentLength != null && contentLength !== body.size) {
      throw new RequestContentLengthMismatchError()
    }

    const buffer = Buffer.from(await body.arrayBuffer());

    socket.cork();
    socket.write(`${header}content-length: ${contentLength}\r\n\r\n`, 'ascii');
    socket.write(buffer);
    socket.uncork();

    request.onBodySent(buffer);
    request.onRequestSent();

    if (!expectsPayload) {
      socket[kReset] = true;
    }

    resume(client);
  } catch (err) {
    util$9.destroy(socket, err);
  }
}

async function writeIterable ({ body, client, request, socket, contentLength, header, expectsPayload }) {
  assert$3(contentLength !== 0 || client[kRunning$3] === 0, 'iterator body cannot be pipelined');

  let callback = null;
  function onDrain () {
    if (callback) {
      const cb = callback;
      callback = null;
      cb();
    }
  }

  const waitForDrain = () => new Promise((resolve, reject) => {
    assert$3(callback === null);

    if (socket[kError]) {
      reject(socket[kError]);
    } else {
      callback = resolve;
    }
  });

  socket
    .on('close', onDrain)
    .on('drain', onDrain);

  const writer = new AsyncWriter({ socket, request, contentLength, client, expectsPayload, header });
  try {
    // It's up to the user to somehow abort the async iterable.
    for await (const chunk of body) {
      if (socket[kError]) {
        throw socket[kError]
      }

      if (!writer.write(chunk)) {
        await waitForDrain();
      }
    }

    writer.end();
  } catch (err) {
    writer.destroy(err);
  } finally {
    socket
      .off('close', onDrain)
      .off('drain', onDrain);
  }
}

class AsyncWriter {
  constructor ({ socket, request, contentLength, client, expectsPayload, header }) {
    this.socket = socket;
    this.request = request;
    this.contentLength = contentLength;
    this.client = client;
    this.bytesWritten = 0;
    this.expectsPayload = expectsPayload;
    this.header = header;

    socket[kWriting] = true;
  }

  write (chunk) {
    const { socket, request, contentLength, client, bytesWritten, expectsPayload, header } = this;

    if (socket[kError]) {
      throw socket[kError]
    }

    if (socket.destroyed) {
      return false
    }

    const len = Buffer.byteLength(chunk);
    if (!len) {
      return true
    }

    // We should defer writing chunks.
    if (contentLength !== null && bytesWritten + len > contentLength) {
      if (client[kStrictContentLength]) {
        throw new RequestContentLengthMismatchError()
      }

      process.emitWarning(new RequestContentLengthMismatchError());
    }

    if (bytesWritten === 0) {
      if (!expectsPayload) {
        socket[kReset] = true;
      }

      if (contentLength === null) {
        socket.write(`${header}transfer-encoding: chunked\r\n`, 'ascii');
      } else {
        socket.write(`${header}content-length: ${contentLength}\r\n\r\n`, 'ascii');
      }
    }

    if (contentLength === null) {
      socket.write(`\r\n${len.toString(16)}\r\n`, 'ascii');
    }

    this.bytesWritten += len;

    const ret = socket.write(chunk);

    request.onBodySent(chunk);

    if (!ret) {
      if (socket[kParser].timeout && socket[kParser].timeoutType === TIMEOUT_HEADERS) {
        // istanbul ignore else: only for jest
        if (socket[kParser].timeout.refresh) {
          socket[kParser].timeout.refresh();
        }
      }
    }

    return ret
  }

  end () {
    const { socket, contentLength, client, bytesWritten, expectsPayload, header, request } = this;
    request.onRequestSent();

    socket[kWriting] = false;

    if (socket[kError]) {
      throw socket[kError]
    }

    if (socket.destroyed) {
      return
    }

    if (bytesWritten === 0) {
      if (expectsPayload) {
        // https://tools.ietf.org/html/rfc7230#section-3.3.2
        // A user agent SHOULD send a Content-Length in a request message when
        // no Transfer-Encoding is sent and the request method defines a meaning
        // for an enclosed payload body.

        socket.write(`${header}content-length: 0\r\n\r\n`, 'ascii');
      } else {
        socket.write(`${header}\r\n`, 'ascii');
      }
    } else if (contentLength === null) {
      socket.write('\r\n0\r\n\r\n', 'ascii');
    }

    if (contentLength !== null && bytesWritten !== contentLength) {
      if (client[kStrictContentLength]) {
        throw new RequestContentLengthMismatchError()
      } else {
        process.emitWarning(new RequestContentLengthMismatchError());
      }
    }

    if (socket[kParser].timeout && socket[kParser].timeoutType === TIMEOUT_HEADERS) {
      // istanbul ignore else: only for jest
      if (socket[kParser].timeout.refresh) {
        socket[kParser].timeout.refresh();
      }
    }

    resume(client);
  }

  destroy (err) {
    const { socket, client } = this;

    socket[kWriting] = false;

    if (err) {
      assert$3(client[kRunning$3] <= 1, 'pipeline should only contain this request');
      util$9.destroy(socket, err);
    }
  }
}

function errorRequest (client, request, err) {
  try {
    request.onError(err);
    assert$3(request.aborted);
  } catch (err) {
    client.emit('error', err);
  }
}

var client = Client$2;

/* eslint-disable */

// Extracted from node/lib/internal/fixed_queue.js

// Currently optimal queue size, tested on V8 6.0 - 6.6. Must be power of two.
const kSize$3 = 2048;
const kMask = kSize$3 - 1;

// The FixedQueue is implemented as a singly-linked list of fixed-size
// circular buffers. It looks something like this:
//
//  head                                                       tail
//    |                                                          |
//    v                                                          v
// +-----------+ <-----\       +-----------+ <------\         +-----------+
// |  [null]   |        \----- |   next    |         \------- |   next    |
// +-----------+               +-----------+                  +-----------+
// |   item    | <-- bottom    |   item    | <-- bottom       |  [empty]  |
// |   item    |               |   item    |                  |  [empty]  |
// |   item    |               |   item    |                  |  [empty]  |
// |   item    |               |   item    |                  |  [empty]  |
// |   item    |               |   item    |       bottom --> |   item    |
// |   item    |               |   item    |                  |   item    |
// |    ...    |               |    ...    |                  |    ...    |
// |   item    |               |   item    |                  |   item    |
// |   item    |               |   item    |                  |   item    |
// |  [empty]  | <-- top       |   item    |                  |   item    |
// |  [empty]  |               |   item    |                  |   item    |
// |  [empty]  |               |  [empty]  | <-- top  top --> |  [empty]  |
// +-----------+               +-----------+                  +-----------+
//
// Or, if there is only one circular buffer, it looks something
// like either of these:
//
//  head   tail                                 head   tail
//    |     |                                     |     |
//    v     v                                     v     v
// +-----------+                               +-----------+
// |  [null]   |                               |  [null]   |
// +-----------+                               +-----------+
// |  [empty]  |                               |   item    |
// |  [empty]  |                               |   item    |
// |   item    | <-- bottom            top --> |  [empty]  |
// |   item    |                               |  [empty]  |
// |  [empty]  | <-- top            bottom --> |   item    |
// |  [empty]  |                               |   item    |
// +-----------+                               +-----------+
//
// Adding a value means moving `top` forward by one, removing means
// moving `bottom` forward by one. After reaching the end, the queue
// wraps around.
//
// When `top === bottom` the current queue is empty and when
// `top + 1 === bottom` it's full. This wastes a single space of storage
// but allows much quicker checks.

class FixedCircularBuffer {
  constructor() {
    this.bottom = 0;
    this.top = 0;
    this.list = new Array(kSize$3);
    this.next = null;
  }

  isEmpty() {
    return this.top === this.bottom;
  }

  isFull() {
    return ((this.top + 1) & kMask) === this.bottom;
  }

  push(data) {
    this.list[this.top] = data;
    this.top = (this.top + 1) & kMask;
  }

  shift() {
    const nextItem = this.list[this.bottom];
    if (nextItem === undefined)
      return null;
    this.list[this.bottom] = undefined;
    this.bottom = (this.bottom + 1) & kMask;
    return nextItem;
  }
}

var fixedQueue = class FixedQueue {
  constructor() {
    this.head = this.tail = new FixedCircularBuffer();
  }

  isEmpty() {
    return this.head.isEmpty();
  }

  push(data) {
    if (this.head.isFull()) {
      // Head is full: Creates a new queue, sets the old queue's `.next` to it,
      // and sets it as the new main queue.
      this.head = this.head.next = new FixedCircularBuffer();
    }
    this.head.push(data);
  }

  shift() {
    const tail = this.tail;
    const next = tail.shift();
    if (tail.isEmpty() && tail.next !== null) {
      // If there is another queue, it forms the new tail.
      this.tail = tail.next;
    }
    return next;
  }
};

const { kFree: kFree$1, kConnected: kConnected$2, kPending: kPending$1, kQueued: kQueued$1, kRunning: kRunning$2, kSize: kSize$2 } = symbols$1;
const kPool = Symbol('pool');

class PoolStats$1 {
  constructor (pool) {
    this[kPool] = pool;
  }

  get connected () {
    return this[kPool][kConnected$2]
  }

  get free () {
    return this[kPool][kFree$1]
  }

  get pending () {
    return this[kPool][kPending$1]
  }

  get queued () {
    return this[kPool][kQueued$1]
  }

  get running () {
    return this[kPool][kRunning$2]
  }

  get size () {
    return this[kPool][kSize$2]
  }
}

var poolStats = PoolStats$1;

const DispatcherBase$1 = dispatcherBase;
const FixedQueue = fixedQueue;
const { kConnected: kConnected$1, kSize: kSize$1, kRunning: kRunning$1, kPending, kQueued, kBusy, kFree, kUrl: kUrl$1, kClose: kClose$1, kDestroy: kDestroy$1, kDispatch: kDispatch$1 } = symbols$1;
const PoolStats = poolStats;

const kClients$2 = Symbol('clients');
const kNeedDrain$1 = Symbol('needDrain');
const kQueue = Symbol('queue');
const kClosedResolve = Symbol('closed resolve');
const kOnDrain$1 = Symbol('onDrain');
const kOnConnect$1 = Symbol('onConnect');
const kOnDisconnect$1 = Symbol('onDisconnect');
const kOnConnectionError$1 = Symbol('onConnectionError');
const kGetDispatcher$1 = Symbol('get dispatcher');
const kAddClient$1 = Symbol('add client');
const kRemoveClient = Symbol('remove client');
const kStats = Symbol('stats');

class PoolBase$1 extends DispatcherBase$1 {
  constructor () {
    super();

    this[kQueue] = new FixedQueue();
    this[kClients$2] = [];
    this[kQueued] = 0;

    const pool = this;

    this[kOnDrain$1] = function onDrain (origin, targets) {
      const queue = pool[kQueue];

      let needDrain = false;

      while (!needDrain) {
        const item = queue.shift();
        if (!item) {
          break
        }
        pool[kQueued]--;
        needDrain = !this.dispatch(item.opts, item.handler);
      }

      this[kNeedDrain$1] = needDrain;

      if (!this[kNeedDrain$1] && pool[kNeedDrain$1]) {
        pool[kNeedDrain$1] = false;
        pool.emit('drain', origin, [pool, ...targets]);
      }

      if (pool[kClosedResolve] && queue.isEmpty()) {
        Promise
          .all(pool[kClients$2].map(c => c.close()))
          .then(pool[kClosedResolve]);
      }
    };

    this[kOnConnect$1] = (origin, targets) => {
      pool.emit('connect', origin, [pool, ...targets]);
    };

    this[kOnDisconnect$1] = (origin, targets, err) => {
      pool.emit('disconnect', origin, [pool, ...targets], err);
    };

    this[kOnConnectionError$1] = (origin, targets, err) => {
      pool.emit('connectionError', origin, [pool, ...targets], err);
    };

    this[kStats] = new PoolStats(this);
  }

  get [kBusy] () {
    return this[kNeedDrain$1]
  }

  get [kConnected$1] () {
    return this[kClients$2].filter(client => client[kConnected$1]).length
  }

  get [kFree] () {
    return this[kClients$2].filter(client => client[kConnected$1] && !client[kNeedDrain$1]).length
  }

  get [kPending] () {
    let ret = this[kQueued];
    for (const { [kPending]: pending } of this[kClients$2]) {
      ret += pending;
    }
    return ret
  }

  get [kRunning$1] () {
    let ret = 0;
    for (const { [kRunning$1]: running } of this[kClients$2]) {
      ret += running;
    }
    return ret
  }

  get [kSize$1] () {
    let ret = this[kQueued];
    for (const { [kSize$1]: size } of this[kClients$2]) {
      ret += size;
    }
    return ret
  }

  get stats () {
    return this[kStats]
  }

  async [kClose$1] () {
    if (this[kQueue].isEmpty()) {
      return Promise.all(this[kClients$2].map(c => c.close()))
    } else {
      return new Promise((resolve) => {
        this[kClosedResolve] = resolve;
      })
    }
  }

  async [kDestroy$1] (err) {
    while (true) {
      const item = this[kQueue].shift();
      if (!item) {
        break
      }
      item.handler.onError(err);
    }

    return Promise.all(this[kClients$2].map(c => c.destroy(err)))
  }

  [kDispatch$1] (opts, handler) {
    const dispatcher = this[kGetDispatcher$1]();

    if (!dispatcher) {
      this[kNeedDrain$1] = true;
      this[kQueue].push({ opts, handler });
      this[kQueued]++;
    } else if (!dispatcher.dispatch(opts, handler)) {
      dispatcher[kNeedDrain$1] = true;
      this[kNeedDrain$1] = !this[kGetDispatcher$1]();
    }

    return !this[kNeedDrain$1]
  }

  [kAddClient$1] (client) {
    client
      .on('drain', this[kOnDrain$1])
      .on('connect', this[kOnConnect$1])
      .on('disconnect', this[kOnDisconnect$1])
      .on('connectionError', this[kOnConnectionError$1]);

    this[kClients$2].push(client);

    if (this[kNeedDrain$1]) {
      process.nextTick(() => {
        if (this[kNeedDrain$1]) {
          this[kOnDrain$1](client[kUrl$1], [this, client]);
        }
      });
    }

    return this
  }

  [kRemoveClient] (client) {
    client.close(() => {
      const idx = this[kClients$2].indexOf(client);
      if (idx !== -1) {
        this[kClients$2].splice(idx, 1);
      }
    });

    this[kNeedDrain$1] = this[kClients$2].some(dispatcher => (
      !dispatcher[kNeedDrain$1] &&
      dispatcher.closed !== true &&
      dispatcher.destroyed !== true
    ));
  }
}

var poolBase = {
  PoolBase: PoolBase$1,
  kClients: kClients$2,
  kNeedDrain: kNeedDrain$1,
  kAddClient: kAddClient$1,
  kRemoveClient,
  kGetDispatcher: kGetDispatcher$1
};

const {
  PoolBase,
  kClients: kClients$1,
  kNeedDrain,
  kAddClient,
  kGetDispatcher
} = poolBase;
const Client$1 = client;
const {
  InvalidArgumentError: InvalidArgumentError$8
} = errors$1;
const util$8 = util$e;
const { kUrl, kInterceptors: kInterceptors$1 } = symbols$1;
const buildConnector = connect$2;

const kOptions$1 = Symbol('options');
const kConnections = Symbol('connections');
const kFactory$1 = Symbol('factory');

function defaultFactory$1 (origin, opts) {
  return new Client$1(origin, opts)
}

class Pool$1 extends PoolBase {
  constructor (origin, {
    connections,
    factory = defaultFactory$1,
    connect,
    connectTimeout,
    tls,
    maxCachedSessions,
    socketPath,
    ...options
  } = {}) {
    super();

    if (connections != null && (!Number.isFinite(connections) || connections < 0)) {
      throw new InvalidArgumentError$8('invalid connections')
    }

    if (typeof factory !== 'function') {
      throw new InvalidArgumentError$8('factory must be a function.')
    }

    if (connect != null && typeof connect !== 'function' && typeof connect !== 'object') {
      throw new InvalidArgumentError$8('connect must be a function or an object')
    }

    if (typeof connect !== 'function') {
      connect = buildConnector({
        ...tls,
        maxCachedSessions,
        socketPath,
        timeout: connectTimeout == null ? 10e3 : connectTimeout,
        ...connect
      });
    }

    this[kInterceptors$1] = options.interceptors && options.interceptors.Pool && Array.isArray(options.interceptors.Pool)
      ? options.interceptors.Pool
      : [];
    this[kConnections] = connections || null;
    this[kUrl] = util$8.parseOrigin(origin);
    this[kOptions$1] = { ...util$8.deepClone(options), connect };
    this[kOptions$1].interceptors = options.interceptors
      ? { ...options.interceptors }
      : undefined;
    this[kFactory$1] = factory;
  }

  [kGetDispatcher] () {
    let dispatcher = this[kClients$1].find(dispatcher => !dispatcher[kNeedDrain]);

    if (dispatcher) {
      return dispatcher
    }

    if (!this[kConnections] || this[kClients$1].length < this[kConnections]) {
      dispatcher = this[kFactory$1](this[kUrl], this[kOptions$1]);
      this[kAddClient](dispatcher);
    }

    return dispatcher
  }
}

var pool = Pool$1;

/* istanbul ignore file: only for Node 12 */

const { kConnected, kSize } = symbols$1;

class CompatWeakRef {
  constructor (value) {
    this.value = value;
  }

  deref () {
    return this.value[kConnected] === 0 && this.value[kSize] === 0
      ? undefined
      : this.value
  }
}

class CompatFinalizer {
  constructor (finalizer) {
    this.finalizer = finalizer;
  }

  register (dispatcher, key) {
    dispatcher.on('disconnect', () => {
      if (dispatcher[kConnected] === 0 && dispatcher[kSize] === 0) {
        this.finalizer(key);
      }
    });
  }
}

var dispatcherWeakref = function () {
  return {
    WeakRef: commonjsGlobal.WeakRef || CompatWeakRef,
    FinalizationRegistry: commonjsGlobal.FinalizationRegistry || CompatFinalizer
  }
};

const { InvalidArgumentError: InvalidArgumentError$7 } = errors$1;
const { kClients, kRunning, kClose, kDestroy, kDispatch, kInterceptors } = symbols$1;
const DispatcherBase = dispatcherBase;
const Pool = pool;
const Client = client;
const util$7 = util$e;
const createRedirectInterceptor = redirectInterceptor;
const { WeakRef, FinalizationRegistry } = dispatcherWeakref();

const kOnConnect = Symbol('onConnect');
const kOnDisconnect = Symbol('onDisconnect');
const kOnConnectionError = Symbol('onConnectionError');
const kMaxRedirections = Symbol('maxRedirections');
const kOnDrain = Symbol('onDrain');
const kFactory = Symbol('factory');
const kFinalizer = Symbol('finalizer');
const kOptions = Symbol('options');

function defaultFactory (origin, opts) {
  return opts && opts.connections === 1
    ? new Client(origin, opts)
    : new Pool(origin, opts)
}

class Agent$1 extends DispatcherBase {
  constructor ({ factory = defaultFactory, maxRedirections = 0, connect, ...options } = {}) {
    super();

    if (typeof factory !== 'function') {
      throw new InvalidArgumentError$7('factory must be a function.')
    }

    if (connect != null && typeof connect !== 'function' && typeof connect !== 'object') {
      throw new InvalidArgumentError$7('connect must be a function or an object')
    }

    if (!Number.isInteger(maxRedirections) || maxRedirections < 0) {
      throw new InvalidArgumentError$7('maxRedirections must be a positive number')
    }

    if (connect && typeof connect !== 'function') {
      connect = { ...connect };
    }

    this[kInterceptors] = options.interceptors && options.interceptors.Agent && Array.isArray(options.interceptors.Agent)
      ? options.interceptors.Agent
      : [createRedirectInterceptor({ maxRedirections })];

    this[kOptions] = { ...util$7.deepClone(options), connect };
    this[kOptions].interceptors = options.interceptors
      ? { ...options.interceptors }
      : undefined;
    this[kMaxRedirections] = maxRedirections;
    this[kFactory] = factory;
    this[kClients] = new Map();
    this[kFinalizer] = new FinalizationRegistry(/* istanbul ignore next: gc is undeterministic */ key => {
      const ref = this[kClients].get(key);
      if (ref !== undefined && ref.deref() === undefined) {
        this[kClients].delete(key);
      }
    });

    const agent = this;

    this[kOnDrain] = (origin, targets) => {
      agent.emit('drain', origin, [agent, ...targets]);
    };

    this[kOnConnect] = (origin, targets) => {
      agent.emit('connect', origin, [agent, ...targets]);
    };

    this[kOnDisconnect] = (origin, targets, err) => {
      agent.emit('disconnect', origin, [agent, ...targets], err);
    };

    this[kOnConnectionError] = (origin, targets, err) => {
      agent.emit('connectionError', origin, [agent, ...targets], err);
    };
  }

  get [kRunning] () {
    let ret = 0;
    for (const ref of this[kClients].values()) {
      const client = ref.deref();
      /* istanbul ignore next: gc is undeterministic */
      if (client) {
        ret += client[kRunning];
      }
    }
    return ret
  }

  [kDispatch] (opts, handler) {
    let key;
    if (opts.origin && (typeof opts.origin === 'string' || opts.origin instanceof URL)) {
      key = String(opts.origin);
    } else {
      throw new InvalidArgumentError$7('opts.origin must be a non-empty string or URL.')
    }

    const ref = this[kClients].get(key);

    let dispatcher = ref ? ref.deref() : null;
    if (!dispatcher) {
      dispatcher = this[kFactory](opts.origin, this[kOptions])
        .on('drain', this[kOnDrain])
        .on('connect', this[kOnConnect])
        .on('disconnect', this[kOnDisconnect])
        .on('connectionError', this[kOnConnectionError]);

      this[kClients].set(key, new WeakRef(dispatcher));
      this[kFinalizer].register(dispatcher, key);
    }

    return dispatcher.dispatch(opts, handler)
  }

  async [kClose] () {
    const closePromises = [];
    for (const ref of this[kClients].values()) {
      const client = ref.deref();
      /* istanbul ignore else: gc is undeterministic */
      if (client) {
        closePromises.push(client.close());
      }
    }

    await Promise.all(closePromises);
  }

  async [kDestroy] (err) {
    const destroyPromises = [];
    for (const ref of this[kClients].values()) {
      const client = ref.deref();
      /* istanbul ignore else: gc is undeterministic */
      if (client) {
        destroyPromises.push(client.destroy(err));
      }
    }

    await Promise.all(destroyPromises);
  }
}

var agent = Agent$1;

var api$1 = {};

const assert$2 = require$$0$1;
const { Readable: Readable$2 } = require$$0$2;
const { RequestAbortedError: RequestAbortedError$6, NotSupportedError } = errors$1;
const util$6 = util$e;
const { ReadableStreamFrom, toUSVString } = util$e;

let Blob;

const kConsume = Symbol('kConsume');
const kReading = Symbol('kReading');
const kBody = Symbol('kBody');
const kAbort = Symbol('abort');
const kContentType = Symbol('kContentType');

var readable = class BodyReadable extends Readable$2 {
  constructor (resume, abort, contentType = '') {
    super({
      autoDestroy: true,
      read: resume,
      highWaterMark: 64 * 1024 // Same as nodejs fs streams.
    });

    this._readableState.dataEmitted = false;

    this[kAbort] = abort;
    this[kConsume] = null;
    this[kBody] = null;
    this[kContentType] = contentType;

    // Is stream being consumed through Readable API?
    // This is an optimization so that we avoid checking
    // for 'data' and 'readable' listeners in the hot path
    // inside push().
    this[kReading] = false;
  }

  destroy (err) {
    if (this.destroyed) {
      // Node < 16
      return this
    }

    if (!err && !this._readableState.endEmitted) {
      err = new RequestAbortedError$6();
    }

    if (err) {
      this[kAbort]();
    }

    return super.destroy(err)
  }

  emit (ev, ...args) {
    if (ev === 'data') {
      // Node < 16.7
      this._readableState.dataEmitted = true;
    } else if (ev === 'error') {
      // Node < 16
      this._readableState.errorEmitted = true;
    }
    return super.emit(ev, ...args)
  }

  on (ev, ...args) {
    if (ev === 'data' || ev === 'readable') {
      this[kReading] = true;
    }
    return super.on(ev, ...args)
  }

  addListener (ev, ...args) {
    return this.on(ev, ...args)
  }

  off (ev, ...args) {
    const ret = super.off(ev, ...args);
    if (ev === 'data' || ev === 'readable') {
      this[kReading] = (
        this.listenerCount('data') > 0 ||
        this.listenerCount('readable') > 0
      );
    }
    return ret
  }

  removeListener (ev, ...args) {
    return this.off(ev, ...args)
  }

  push (chunk) {
    if (this[kConsume] && chunk !== null && this.readableLength === 0) {
      consumePush(this[kConsume], chunk);
      return this[kReading] ? super.push(chunk) : true
    }
    return super.push(chunk)
  }

  // https://fetch.spec.whatwg.org/#dom-body-text
  async text () {
    return consume(this, 'text')
  }

  // https://fetch.spec.whatwg.org/#dom-body-json
  async json () {
    return consume(this, 'json')
  }

  // https://fetch.spec.whatwg.org/#dom-body-blob
  async blob () {
    return consume(this, 'blob')
  }

  // https://fetch.spec.whatwg.org/#dom-body-arraybuffer
  async arrayBuffer () {
    return consume(this, 'arrayBuffer')
  }

  // https://fetch.spec.whatwg.org/#dom-body-formdata
  async formData () {
    // TODO: Implement.
    throw new NotSupportedError()
  }

  // https://fetch.spec.whatwg.org/#dom-body-bodyused
  get bodyUsed () {
    return util$6.isDisturbed(this)
  }

  // https://fetch.spec.whatwg.org/#dom-body-body
  get body () {
    if (!this[kBody]) {
      this[kBody] = ReadableStreamFrom(this);
      if (this[kConsume]) {
        // TODO: Is this the best way to force a lock?
        this[kBody].getReader(); // Ensure stream is locked.
        assert$2(this[kBody].locked);
      }
    }
    return this[kBody]
  }

  async dump (opts) {
    let limit = opts && Number.isFinite(opts.limit) ? opts.limit : 262144;
    try {
      for await (const chunk of this) {
        limit -= Buffer.byteLength(chunk);
        if (limit < 0) {
          return
        }
      }
    } catch {
      // Do nothing...
    }
  }
};

// https://streams.spec.whatwg.org/#readablestream-locked
function isLocked (self) {
  // Consume is an implicit lock.
  return (self[kBody] && self[kBody].locked === true) || self[kConsume]
}

// https://fetch.spec.whatwg.org/#body-unusable
function isUnusable (self) {
  return util$6.isDisturbed(self) || isLocked(self)
}

async function consume (stream, type) {
  if (isUnusable(stream)) {
    throw new TypeError('unusable')
  }

  assert$2(!stream[kConsume]);

  return new Promise((resolve, reject) => {
    stream[kConsume] = {
      type,
      stream,
      resolve,
      reject,
      length: 0,
      body: []
    };

    stream
      .on('error', function (err) {
        consumeFinish(this[kConsume], err);
      })
      .on('close', function () {
        if (this[kConsume].body !== null) {
          consumeFinish(this[kConsume], new RequestAbortedError$6());
        }
      });

    process.nextTick(consumeStart, stream[kConsume]);
  })
}

function consumeStart (consume) {
  if (consume.body === null) {
    return
  }

  const { _readableState: state } = consume.stream;

  for (const chunk of state.buffer) {
    consumePush(consume, chunk);
  }

  if (state.endEmitted) {
    consumeEnd(this[kConsume]);
  } else {
    consume.stream.on('end', function () {
      consumeEnd(this[kConsume]);
    });
  }

  consume.stream.resume();

  while (consume.stream.read() != null) {
    // Loop
  }
}

function consumeEnd (consume) {
  const { type, body, resolve, stream, length } = consume;

  try {
    if (type === 'text') {
      resolve(toUSVString(Buffer.concat(body)));
    } else if (type === 'json') {
      resolve(JSON.parse(Buffer.concat(body)));
    } else if (type === 'arrayBuffer') {
      const dst = new Uint8Array(length);

      let pos = 0;
      for (const buf of body) {
        dst.set(buf, pos);
        pos += buf.byteLength;
      }

      resolve(dst);
    } else if (type === 'blob') {
      if (!Blob) {
        Blob = require('buffer').Blob;
      }
      resolve(new Blob(body, { type: stream[kContentType] }));
    }

    consumeFinish(consume);
  } catch (err) {
    stream.destroy(err);
  }
}

function consumePush (consume, chunk) {
  consume.length += chunk.length;
  consume.body.push(chunk);
}

function consumeFinish (consume, err) {
  if (consume.body === null) {
    return
  }

  if (err) {
    consume.reject(err);
  } else {
    consume.resolve();
  }

  consume.type = null;
  consume.stream = null;
  consume.resolve = null;
  consume.reject = null;
  consume.length = 0;
  consume.body = null;
}

const { RequestAbortedError: RequestAbortedError$5 } = errors$1;

const kListener = Symbol('kListener');
const kSignal = Symbol('kSignal');

function abort (self) {
  if (self.abort) {
    self.abort();
  } else {
    self.onError(new RequestAbortedError$5());
  }
}

function addSignal$5 (self, signal) {
  self[kSignal] = null;
  self[kListener] = null;

  if (!signal) {
    return
  }

  if (signal.aborted) {
    abort(self);
    return
  }

  self[kSignal] = signal;
  self[kListener] = () => {
    abort(self);
  };

  if ('addEventListener' in self[kSignal]) {
    self[kSignal].addEventListener('abort', self[kListener]);
  } else {
    self[kSignal].addListener('abort', self[kListener]);
  }
}

function removeSignal$5 (self) {
  if (!self[kSignal]) {
    return
  }

  if ('removeEventListener' in self[kSignal]) {
    self[kSignal].removeEventListener('abort', self[kListener]);
  } else {
    self[kSignal].removeListener('abort', self[kListener]);
  }

  self[kSignal] = null;
  self[kListener] = null;
}

var abortSignal = {
  addSignal: addSignal$5,
  removeSignal: removeSignal$5
};

const Readable$1 = readable;
const {
  InvalidArgumentError: InvalidArgumentError$6,
  RequestAbortedError: RequestAbortedError$4,
  ResponseStatusCodeError
} = errors$1;
const util$5 = util$e;
const { AsyncResource: AsyncResource$4 } = require$$3;
const { addSignal: addSignal$4, removeSignal: removeSignal$4 } = abortSignal;

class RequestHandler extends AsyncResource$4 {
  constructor (opts, callback) {
    if (!opts || typeof opts !== 'object') {
      throw new InvalidArgumentError$6('invalid opts')
    }

    const { signal, method, opaque, body, onInfo, responseHeaders, throwOnError } = opts;

    try {
      if (typeof callback !== 'function') {
        throw new InvalidArgumentError$6('invalid callback')
      }

      if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
        throw new InvalidArgumentError$6('signal must be an EventEmitter or EventTarget')
      }

      if (method === 'CONNECT') {
        throw new InvalidArgumentError$6('invalid method')
      }

      if (onInfo && typeof onInfo !== 'function') {
        throw new InvalidArgumentError$6('invalid onInfo callback')
      }

      super('UNDICI_REQUEST');
    } catch (err) {
      if (util$5.isStream(body)) {
        util$5.destroy(body.on('error', util$5.nop), err);
      }
      throw err
    }

    this.responseHeaders = responseHeaders || null;
    this.opaque = opaque || null;
    this.callback = callback;
    this.res = null;
    this.abort = null;
    this.body = body;
    this.trailers = {};
    this.context = null;
    this.onInfo = onInfo || null;
    this.throwOnError = throwOnError;

    if (util$5.isStream(body)) {
      body.on('error', (err) => {
        this.onError(err);
      });
    }

    addSignal$4(this, signal);
  }

  onConnect (abort, context) {
    if (!this.callback) {
      throw new RequestAbortedError$4()
    }

    this.abort = abort;
    this.context = context;
  }

  onHeaders (statusCode, rawHeaders, resume, statusMessage) {
    const { callback, opaque, abort, context } = this;

    if (statusCode < 200) {
      if (this.onInfo) {
        const headers = this.responseHeaders === 'raw' ? util$5.parseRawHeaders(rawHeaders) : util$5.parseHeaders(rawHeaders);
        this.onInfo({ statusCode, headers });
      }
      return
    }

    const parsedHeaders = util$5.parseHeaders(rawHeaders);
    const contentType = parsedHeaders['content-type'];
    const body = new Readable$1(resume, abort, contentType);

    this.callback = null;
    this.res = body;
    const headers = this.responseHeaders === 'raw' ? util$5.parseRawHeaders(rawHeaders) : util$5.parseHeaders(rawHeaders);

    if (callback !== null) {
      if (this.throwOnError && statusCode >= 400) {
        this.runInAsyncScope(getResolveErrorBodyCallback, null,
          { callback, body, contentType, statusCode, statusMessage, headers }
        );
        return
      }

      this.runInAsyncScope(callback, null, null, {
        statusCode,
        headers,
        trailers: this.trailers,
        opaque,
        body,
        context
      });
    }
  }

  onData (chunk) {
    const { res } = this;
    return res.push(chunk)
  }

  onComplete (trailers) {
    const { res } = this;

    removeSignal$4(this);

    util$5.parseHeaders(trailers, this.trailers);

    res.push(null);
  }

  onError (err) {
    const { res, callback, body, opaque } = this;

    removeSignal$4(this);

    if (callback) {
      // TODO: Does this need queueMicrotask?
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }

    if (res) {
      this.res = null;
      // Ensure all queued handlers are invoked before destroying res.
      queueMicrotask(() => {
        util$5.destroy(res, err);
      });
    }

    if (body) {
      this.body = null;
      util$5.destroy(body, err);
    }
  }
}

async function getResolveErrorBodyCallback ({ callback, body, contentType, statusCode, statusMessage, headers }) {
  if (statusCode === 204 || !contentType) {
    body.dump();
    process.nextTick(callback, new ResponseStatusCodeError(`Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ''}`, statusCode, headers));
    return
  }

  try {
    if (contentType.startsWith('application/json')) {
      const payload = await body.json();
      process.nextTick(callback, new ResponseStatusCodeError(`Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ''}`, statusCode, headers, payload));
      return
    }

    if (contentType.startsWith('text/')) {
      const payload = await body.text();
      process.nextTick(callback, new ResponseStatusCodeError(`Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ''}`, statusCode, headers, payload));
      return
    }
  } catch (err) {
    // Process in a fallback if error
  }

  body.dump();
  process.nextTick(callback, new ResponseStatusCodeError(`Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ''}`, statusCode, headers));
}

function request$1 (opts, callback) {
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      request$1.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve(data)
      });
    })
  }

  try {
    this.dispatch(opts, new RequestHandler(opts, callback));
  } catch (err) {
    if (typeof callback !== 'function') {
      throw err
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}

var apiRequest = request$1;

const { finished } = require$$0$2;
const {
  InvalidArgumentError: InvalidArgumentError$5,
  InvalidReturnValueError: InvalidReturnValueError$1,
  RequestAbortedError: RequestAbortedError$3
} = errors$1;
const util$4 = util$e;
const { AsyncResource: AsyncResource$3 } = require$$3;
const { addSignal: addSignal$3, removeSignal: removeSignal$3 } = abortSignal;

class StreamHandler extends AsyncResource$3 {
  constructor (opts, factory, callback) {
    if (!opts || typeof opts !== 'object') {
      throw new InvalidArgumentError$5('invalid opts')
    }

    const { signal, method, opaque, body, onInfo, responseHeaders } = opts;

    try {
      if (typeof callback !== 'function') {
        throw new InvalidArgumentError$5('invalid callback')
      }

      if (typeof factory !== 'function') {
        throw new InvalidArgumentError$5('invalid factory')
      }

      if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
        throw new InvalidArgumentError$5('signal must be an EventEmitter or EventTarget')
      }

      if (method === 'CONNECT') {
        throw new InvalidArgumentError$5('invalid method')
      }

      if (onInfo && typeof onInfo !== 'function') {
        throw new InvalidArgumentError$5('invalid onInfo callback')
      }

      super('UNDICI_STREAM');
    } catch (err) {
      if (util$4.isStream(body)) {
        util$4.destroy(body.on('error', util$4.nop), err);
      }
      throw err
    }

    this.responseHeaders = responseHeaders || null;
    this.opaque = opaque || null;
    this.factory = factory;
    this.callback = callback;
    this.res = null;
    this.abort = null;
    this.context = null;
    this.trailers = null;
    this.body = body;
    this.onInfo = onInfo || null;

    if (util$4.isStream(body)) {
      body.on('error', (err) => {
        this.onError(err);
      });
    }

    addSignal$3(this, signal);
  }

  onConnect (abort, context) {
    if (!this.callback) {
      throw new RequestAbortedError$3()
    }

    this.abort = abort;
    this.context = context;
  }

  onHeaders (statusCode, rawHeaders, resume) {
    const { factory, opaque, context } = this;

    if (statusCode < 200) {
      if (this.onInfo) {
        const headers = this.responseHeaders === 'raw' ? util$4.parseRawHeaders(rawHeaders) : util$4.parseHeaders(rawHeaders);
        this.onInfo({ statusCode, headers });
      }
      return
    }

    this.factory = null;
    const headers = this.responseHeaders === 'raw' ? util$4.parseRawHeaders(rawHeaders) : util$4.parseHeaders(rawHeaders);
    const res = this.runInAsyncScope(factory, null, {
      statusCode,
      headers,
      opaque,
      context
    });

    if (
      !res ||
      typeof res.write !== 'function' ||
      typeof res.end !== 'function' ||
      typeof res.on !== 'function'
    ) {
      throw new InvalidReturnValueError$1('expected Writable')
    }

    res.on('drain', resume);
    // TODO: Avoid finished. It registers an unecessary amount of listeners.
    finished(res, { readable: false }, (err) => {
      const { callback, res, opaque, trailers, abort } = this;

      this.res = null;
      if (err || !res.readable) {
        util$4.destroy(res, err);
      }

      this.callback = null;
      this.runInAsyncScope(callback, null, err || null, { opaque, trailers });

      if (err) {
        abort();
      }
    });

    this.res = res;

    const needDrain = res.writableNeedDrain !== undefined
      ? res.writableNeedDrain
      : res._writableState && res._writableState.needDrain;

    return needDrain !== true
  }

  onData (chunk) {
    const { res } = this;

    return res.write(chunk)
  }

  onComplete (trailers) {
    const { res } = this;

    removeSignal$3(this);

    this.trailers = util$4.parseHeaders(trailers);

    res.end();
  }

  onError (err) {
    const { res, callback, opaque, body } = this;

    removeSignal$3(this);

    this.factory = null;

    if (res) {
      this.res = null;
      util$4.destroy(res, err);
    } else if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }

    if (body) {
      this.body = null;
      util$4.destroy(body, err);
    }
  }
}

function stream (opts, factory, callback) {
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      stream.call(this, opts, factory, (err, data) => {
        return err ? reject(err) : resolve(data)
      });
    })
  }

  try {
    this.dispatch(opts, new StreamHandler(opts, factory, callback));
  } catch (err) {
    if (typeof callback !== 'function') {
      throw err
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}

var apiStream = stream;

const {
  Readable,
  Duplex,
  PassThrough
} = require$$0$2;
const {
  InvalidArgumentError: InvalidArgumentError$4,
  InvalidReturnValueError,
  RequestAbortedError: RequestAbortedError$2
} = errors$1;
const util$3 = util$e;
const { AsyncResource: AsyncResource$2 } = require$$3;
const { addSignal: addSignal$2, removeSignal: removeSignal$2 } = abortSignal;
const assert$1 = require$$0$1;

const kResume = Symbol('resume');

class PipelineRequest extends Readable {
  constructor () {
    super({ autoDestroy: true });

    this[kResume] = null;
  }

  _read () {
    const { [kResume]: resume } = this;

    if (resume) {
      this[kResume] = null;
      resume();
    }
  }

  _destroy (err, callback) {
    this._read();

    callback(err);
  }
}

class PipelineResponse extends Readable {
  constructor (resume) {
    super({ autoDestroy: true });
    this[kResume] = resume;
  }

  _read () {
    this[kResume]();
  }

  _destroy (err, callback) {
    if (!err && !this._readableState.endEmitted) {
      err = new RequestAbortedError$2();
    }

    callback(err);
  }
}

class PipelineHandler extends AsyncResource$2 {
  constructor (opts, handler) {
    if (!opts || typeof opts !== 'object') {
      throw new InvalidArgumentError$4('invalid opts')
    }

    if (typeof handler !== 'function') {
      throw new InvalidArgumentError$4('invalid handler')
    }

    const { signal, method, opaque, onInfo, responseHeaders } = opts;

    if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
      throw new InvalidArgumentError$4('signal must be an EventEmitter or EventTarget')
    }

    if (method === 'CONNECT') {
      throw new InvalidArgumentError$4('invalid method')
    }

    if (onInfo && typeof onInfo !== 'function') {
      throw new InvalidArgumentError$4('invalid onInfo callback')
    }

    super('UNDICI_PIPELINE');

    this.opaque = opaque || null;
    this.responseHeaders = responseHeaders || null;
    this.handler = handler;
    this.abort = null;
    this.context = null;
    this.onInfo = onInfo || null;

    this.req = new PipelineRequest().on('error', util$3.nop);

    this.ret = new Duplex({
      readableObjectMode: opts.objectMode,
      autoDestroy: true,
      read: () => {
        const { body } = this;

        if (body && body.resume) {
          body.resume();
        }
      },
      write: (chunk, encoding, callback) => {
        const { req } = this;

        if (req.push(chunk, encoding) || req._readableState.destroyed) {
          callback();
        } else {
          req[kResume] = callback;
        }
      },
      destroy: (err, callback) => {
        const { body, req, res, ret, abort } = this;

        if (!err && !ret._readableState.endEmitted) {
          err = new RequestAbortedError$2();
        }

        if (abort && err) {
          abort();
        }

        util$3.destroy(body, err);
        util$3.destroy(req, err);
        util$3.destroy(res, err);

        removeSignal$2(this);

        callback(err);
      }
    }).on('prefinish', () => {
      const { req } = this;

      // Node < 15 does not call _final in same tick.
      req.push(null);
    });

    this.res = null;

    addSignal$2(this, signal);
  }

  onConnect (abort, context) {
    const { ret, res } = this;

    assert$1(!res, 'pipeline cannot be retried');

    if (ret.destroyed) {
      throw new RequestAbortedError$2()
    }

    this.abort = abort;
    this.context = context;
  }

  onHeaders (statusCode, rawHeaders, resume) {
    const { opaque, handler, context } = this;

    if (statusCode < 200) {
      if (this.onInfo) {
        const headers = this.responseHeaders === 'raw' ? util$3.parseRawHeaders(rawHeaders) : util$3.parseHeaders(rawHeaders);
        this.onInfo({ statusCode, headers });
      }
      return
    }

    this.res = new PipelineResponse(resume);

    let body;
    try {
      this.handler = null;
      const headers = this.responseHeaders === 'raw' ? util$3.parseRawHeaders(rawHeaders) : util$3.parseHeaders(rawHeaders);
      body = this.runInAsyncScope(handler, null, {
        statusCode,
        headers,
        opaque,
        body: this.res,
        context
      });
    } catch (err) {
      this.res.on('error', util$3.nop);
      throw err
    }

    if (!body || typeof body.on !== 'function') {
      throw new InvalidReturnValueError('expected Readable')
    }

    body
      .on('data', (chunk) => {
        const { ret, body } = this;

        if (!ret.push(chunk) && body.pause) {
          body.pause();
        }
      })
      .on('error', (err) => {
        const { ret } = this;

        util$3.destroy(ret, err);
      })
      .on('end', () => {
        const { ret } = this;

        ret.push(null);
      })
      .on('close', () => {
        const { ret } = this;

        if (!ret._readableState.ended) {
          util$3.destroy(ret, new RequestAbortedError$2());
        }
      });

    this.body = body;
  }

  onData (chunk) {
    const { res } = this;
    return res.push(chunk)
  }

  onComplete (trailers) {
    const { res } = this;
    res.push(null);
  }

  onError (err) {
    const { ret } = this;
    this.handler = null;
    util$3.destroy(ret, err);
  }
}

function pipeline (opts, handler) {
  try {
    const pipelineHandler = new PipelineHandler(opts, handler);
    this.dispatch({ ...opts, body: pipelineHandler.req }, pipelineHandler);
    return pipelineHandler.ret
  } catch (err) {
    return new PassThrough().destroy(err)
  }
}

var apiPipeline = pipeline;

const { InvalidArgumentError: InvalidArgumentError$3, RequestAbortedError: RequestAbortedError$1, SocketError: SocketError$1 } = errors$1;
const { AsyncResource: AsyncResource$1 } = require$$3;
const util$2 = util$e;
const { addSignal: addSignal$1, removeSignal: removeSignal$1 } = abortSignal;
const assert = require$$0$1;

class UpgradeHandler extends AsyncResource$1 {
  constructor (opts, callback) {
    if (!opts || typeof opts !== 'object') {
      throw new InvalidArgumentError$3('invalid opts')
    }

    if (typeof callback !== 'function') {
      throw new InvalidArgumentError$3('invalid callback')
    }

    const { signal, opaque, responseHeaders } = opts;

    if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
      throw new InvalidArgumentError$3('signal must be an EventEmitter or EventTarget')
    }

    super('UNDICI_UPGRADE');

    this.responseHeaders = responseHeaders || null;
    this.opaque = opaque || null;
    this.callback = callback;
    this.abort = null;
    this.context = null;

    addSignal$1(this, signal);
  }

  onConnect (abort, context) {
    if (!this.callback) {
      throw new RequestAbortedError$1()
    }

    this.abort = abort;
    this.context = null;
  }

  onHeaders () {
    throw new SocketError$1('bad upgrade', null)
  }

  onUpgrade (statusCode, rawHeaders, socket) {
    const { callback, opaque, context } = this;

    assert.strictEqual(statusCode, 101);

    removeSignal$1(this);

    this.callback = null;
    const headers = this.responseHeaders === 'raw' ? util$2.parseRawHeaders(rawHeaders) : util$2.parseHeaders(rawHeaders);
    this.runInAsyncScope(callback, null, null, {
      headers,
      socket,
      opaque,
      context
    });
  }

  onError (err) {
    const { callback, opaque } = this;

    removeSignal$1(this);

    if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
  }
}

function upgrade (opts, callback) {
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      upgrade.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve(data)
      });
    })
  }

  try {
    const upgradeHandler = new UpgradeHandler(opts, callback);
    this.dispatch({
      ...opts,
      method: opts.method || 'GET',
      upgrade: opts.protocol || 'Websocket'
    }, upgradeHandler);
  } catch (err) {
    if (typeof callback !== 'function') {
      throw err
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}

var apiUpgrade = upgrade;

const { InvalidArgumentError: InvalidArgumentError$2, RequestAbortedError, SocketError } = errors$1;
const { AsyncResource } = require$$3;
const util$1 = util$e;
const { addSignal, removeSignal } = abortSignal;

class ConnectHandler extends AsyncResource {
  constructor (opts, callback) {
    if (!opts || typeof opts !== 'object') {
      throw new InvalidArgumentError$2('invalid opts')
    }

    if (typeof callback !== 'function') {
      throw new InvalidArgumentError$2('invalid callback')
    }

    const { signal, opaque, responseHeaders } = opts;

    if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
      throw new InvalidArgumentError$2('signal must be an EventEmitter or EventTarget')
    }

    super('UNDICI_CONNECT');

    this.opaque = opaque || null;
    this.responseHeaders = responseHeaders || null;
    this.callback = callback;
    this.abort = null;

    addSignal(this, signal);
  }

  onConnect (abort, context) {
    if (!this.callback) {
      throw new RequestAbortedError()
    }

    this.abort = abort;
    this.context = context;
  }

  onHeaders () {
    throw new SocketError('bad connect', null)
  }

  onUpgrade (statusCode, rawHeaders, socket) {
    const { callback, opaque, context } = this;

    removeSignal(this);

    this.callback = null;
    const headers = this.responseHeaders === 'raw' ? util$1.parseRawHeaders(rawHeaders) : util$1.parseHeaders(rawHeaders);
    this.runInAsyncScope(callback, null, null, {
      statusCode,
      headers,
      socket,
      opaque,
      context
    });
  }

  onError (err) {
    const { callback, opaque } = this;

    removeSignal(this);

    if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
  }
}

function connect (opts, callback) {
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      connect.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve(data)
      });
    })
  }

  try {
    const connectHandler = new ConnectHandler(opts, callback);
    this.dispatch({ ...opts, method: 'CONNECT' }, connectHandler);
  } catch (err) {
    if (typeof callback !== 'function') {
      throw err
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}

var apiConnect = connect;

api$1.request = apiRequest;
api$1.stream = apiStream;
api$1.pipeline = apiPipeline;
api$1.upgrade = apiUpgrade;
api$1.connect = apiConnect;

// We include a version number for the Dispatcher API. In case of breaking changes,
// this version number must be increased to avoid conflicts.
const globalDispatcher = Symbol.for('undici.globalDispatcher.1');
const { InvalidArgumentError: InvalidArgumentError$1 } = errors$1;
const Agent = agent;

if (getGlobalDispatcher$1() === undefined) {
  setGlobalDispatcher$1(new Agent());
}

function setGlobalDispatcher$1 (agent) {
  if (!agent || typeof agent.dispatch !== 'function') {
    throw new InvalidArgumentError$1('Argument agent must implement Agent')
  }
  Object.defineProperty(globalThis, globalDispatcher, {
    value: agent,
    writable: true,
    enumerable: false,
    configurable: false
  });
}

function getGlobalDispatcher$1 () {
  return globalThis[globalDispatcher]
}

var global$2 = {
  setGlobalDispatcher: setGlobalDispatcher$1,
  getGlobalDispatcher: getGlobalDispatcher$1
};

var headers;
var hasRequiredHeaders;

function requireHeaders () {
	if (hasRequiredHeaders) return headers;
	hasRequiredHeaders = 1;

	const { kHeadersList } = symbols$1;
	const { kGuard } = requireSymbols();
	const { kEnumerableProperty } = util$e;
	const {
	  makeIterator,
	  isValidHeaderName,
	  isValidHeaderValue
	} = requireUtil();
	const { webidl } = requireWebidl();

	const kHeadersMap = Symbol('headers map');
	const kHeadersSortedMap = Symbol('headers map sorted');

	/**
	 * @see https://fetch.spec.whatwg.org/#concept-header-value-normalize
	 * @param {string} potentialValue
	 */
	function headerValueNormalize (potentialValue) {
	  //  To normalize a byte sequence potentialValue, remove
	  //  any leading and trailing HTTP whitespace bytes from
	  //  potentialValue.
	  return potentialValue.replace(
	    /^[\r\n\t ]+|[\r\n\t ]+$/g,
	    ''
	  )
	}

	function fill (headers, object) {
	  // To fill a Headers object headers with a given object object, run these steps:

	  // 1. If object is a sequence, then for each header in object:
	  // Note: webidl conversion to array has already been done.
	  if (Array.isArray(object)) {
	    for (const header of object) {
	      // 1. If header does not contain exactly two items, then throw a TypeError.
	      if (header.length !== 2) {
	        webidl.errors.exception({
	          header: 'Headers constructor',
	          message: `expected name/value pair to be length 2, found ${header.length}.`
	        });
	      }

	      // 2. Append (header’s first item, header’s second item) to headers.
	      headers.append(header[0], header[1]);
	    }
	  } else if (typeof object === 'object' && object !== null) {
	    // Note: null should throw

	    // 2. Otherwise, object is a record, then for each key → value in object,
	    //    append (key, value) to headers
	    for (const [key, value] of Object.entries(object)) {
	      headers.append(key, value);
	    }
	  } else {
	    webidl.errors.conversionFailed({
	      prefix: 'Headers constructor',
	      argument: 'Argument 1',
	      types: ['sequence<sequence<ByteString>>', 'record<ByteString, ByteString>']
	    });
	  }
	}

	class HeadersList {
	  constructor (init) {
	    if (init instanceof HeadersList) {
	      this[kHeadersMap] = new Map(init[kHeadersMap]);
	      this[kHeadersSortedMap] = init[kHeadersSortedMap];
	    } else {
	      this[kHeadersMap] = new Map(init);
	      this[kHeadersSortedMap] = null;
	    }
	  }

	  // https://fetch.spec.whatwg.org/#header-list-contains
	  contains (name) {
	    // A header list list contains a header name name if list
	    // contains a header whose name is a byte-case-insensitive
	    // match for name.
	    name = name.toLowerCase();

	    return this[kHeadersMap].has(name)
	  }

	  clear () {
	    this[kHeadersMap].clear();
	    this[kHeadersSortedMap] = null;
	  }

	  // https://fetch.spec.whatwg.org/#concept-header-list-append
	  append (name, value) {
	    this[kHeadersSortedMap] = null;

	    // 1. If list contains name, then set name to the first such
	    //    header’s name.
	    name = name.toLowerCase();
	    const exists = this[kHeadersMap].get(name);

	    // 2. Append (name, value) to list.
	    if (exists) {
	      this[kHeadersMap].set(name, `${exists}, ${value}`);
	    } else {
	      this[kHeadersMap].set(name, `${value}`);
	    }
	  }

	  // https://fetch.spec.whatwg.org/#concept-header-list-set
	  set (name, value) {
	    this[kHeadersSortedMap] = null;
	    name = name.toLowerCase();

	    // 1. If list contains name, then set the value of
	    //    the first such header to value and remove the
	    //    others.
	    // 2. Otherwise, append header (name, value) to list.
	    return this[kHeadersMap].set(name, value)
	  }

	  // https://fetch.spec.whatwg.org/#concept-header-list-delete
	  delete (name) {
	    this[kHeadersSortedMap] = null;

	    name = name.toLowerCase();
	    return this[kHeadersMap].delete(name)
	  }

	  // https://fetch.spec.whatwg.org/#concept-header-list-get
	  get (name) {
	    name = name.toLowerCase();

	    // 1. If list does not contain name, then return null.
	    if (!this.contains(name)) {
	      return null
	    }

	    // 2. Return the values of all headers in list whose name
	    //    is a byte-case-insensitive match for name,
	    //    separated from each other by 0x2C 0x20, in order.
	    return this[kHeadersMap].get(name) ?? null
	  }

	  has (name) {
	    name = name.toLowerCase();
	    return this[kHeadersMap].has(name)
	  }

	  keys () {
	    return this[kHeadersMap].keys()
	  }

	  values () {
	    return this[kHeadersMap].values()
	  }

	  entries () {
	    return this[kHeadersMap].entries()
	  }

	  [Symbol.iterator] () {
	    return this[kHeadersMap][Symbol.iterator]()
	  }
	}

	// https://fetch.spec.whatwg.org/#headers-class
	class Headers {
	  constructor (init = undefined) {
	    this[kHeadersList] = new HeadersList();

	    // The new Headers(init) constructor steps are:

	    // 1. Set this’s guard to "none".
	    this[kGuard] = 'none';

	    // 2. If init is given, then fill this with init.
	    if (init !== undefined) {
	      init = webidl.converters.HeadersInit(init);
	      fill(this, init);
	    }
	  }

	  get [Symbol.toStringTag] () {
	    return this.constructor.name
	  }

	  // https://fetch.spec.whatwg.org/#dom-headers-append
	  append (name, value) {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 2) {
	      throw new TypeError(
	        `Failed to execute 'append' on 'Headers': 2 arguments required, but only ${arguments.length} present.`
	      )
	    }

	    name = webidl.converters.ByteString(name);
	    value = webidl.converters.ByteString(value);

	    // 1. Normalize value.
	    value = headerValueNormalize(value);

	    // 2. If name is not a header name or value is not a
	    //    header value, then throw a TypeError.
	    if (!isValidHeaderName(name)) {
	      webidl.errors.invalidArgument({
	        prefix: 'Headers.append',
	        value: name,
	        type: 'header name'
	      });
	    } else if (!isValidHeaderValue(value)) {
	      webidl.errors.invalidArgument({
	        prefix: 'Headers.append',
	        value,
	        type: 'header value'
	      });
	    }

	    // 3. If headers’s guard is "immutable", then throw a TypeError.
	    // 4. Otherwise, if headers’s guard is "request" and name is a
	    //    forbidden header name, return.
	    // Note: undici does not implement forbidden header names
	    if (this[kGuard] === 'immutable') {
	      throw new TypeError('immutable')
	    } else if (this[kGuard] === 'request-no-cors') ;

	    // 6. Otherwise, if headers’s guard is "response" and name is a
	    //    forbidden response-header name, return.

	    // 7. Append (name, value) to headers’s header list.
	    // 8. If headers’s guard is "request-no-cors", then remove
	    //    privileged no-CORS request headers from headers
	    return this[kHeadersList].append(name, value)
	  }

	  // https://fetch.spec.whatwg.org/#dom-headers-delete
	  delete (name) {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'delete' on 'Headers': 1 argument required, but only ${arguments.length} present.`
	      )
	    }

	    name = webidl.converters.ByteString(name);

	    // 1. If name is not a header name, then throw a TypeError.
	    if (!isValidHeaderName(name)) {
	      webidl.errors.invalidArgument({
	        prefix: 'Headers.delete',
	        value: name,
	        type: 'header name'
	      });
	    }

	    // 2. If this’s guard is "immutable", then throw a TypeError.
	    // 3. Otherwise, if this’s guard is "request" and name is a
	    //    forbidden header name, return.
	    // 4. Otherwise, if this’s guard is "request-no-cors", name
	    //    is not a no-CORS-safelisted request-header name, and
	    //    name is not a privileged no-CORS request-header name,
	    //    return.
	    // 5. Otherwise, if this’s guard is "response" and name is
	    //    a forbidden response-header name, return.
	    // Note: undici does not implement forbidden header names
	    if (this[kGuard] === 'immutable') {
	      throw new TypeError('immutable')
	    } else if (this[kGuard] === 'request-no-cors') ;

	    // 6. If this’s header list does not contain name, then
	    //    return.
	    if (!this[kHeadersList].contains(name)) {
	      return
	    }

	    // 7. Delete name from this’s header list.
	    // 8. If this’s guard is "request-no-cors", then remove
	    //    privileged no-CORS request headers from this.
	    return this[kHeadersList].delete(name)
	  }

	  // https://fetch.spec.whatwg.org/#dom-headers-get
	  get (name) {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'get' on 'Headers': 1 argument required, but only ${arguments.length} present.`
	      )
	    }

	    name = webidl.converters.ByteString(name);

	    // 1. If name is not a header name, then throw a TypeError.
	    if (!isValidHeaderName(name)) {
	      webidl.errors.invalidArgument({
	        prefix: 'Headers.get',
	        value: name,
	        type: 'header name'
	      });
	    }

	    // 2. Return the result of getting name from this’s header
	    //    list.
	    return this[kHeadersList].get(name)
	  }

	  // https://fetch.spec.whatwg.org/#dom-headers-has
	  has (name) {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'has' on 'Headers': 1 argument required, but only ${arguments.length} present.`
	      )
	    }

	    name = webidl.converters.ByteString(name);

	    // 1. If name is not a header name, then throw a TypeError.
	    if (!isValidHeaderName(name)) {
	      webidl.errors.invalidArgument({
	        prefix: 'Headers.has',
	        value: name,
	        type: 'header name'
	      });
	    }

	    // 2. Return true if this’s header list contains name;
	    //    otherwise false.
	    return this[kHeadersList].contains(name)
	  }

	  // https://fetch.spec.whatwg.org/#dom-headers-set
	  set (name, value) {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 2) {
	      throw new TypeError(
	        `Failed to execute 'set' on 'Headers': 2 arguments required, but only ${arguments.length} present.`
	      )
	    }

	    name = webidl.converters.ByteString(name);
	    value = webidl.converters.ByteString(value);

	    // 1. Normalize value.
	    value = headerValueNormalize(value);

	    // 2. If name is not a header name or value is not a
	    //    header value, then throw a TypeError.
	    if (!isValidHeaderName(name)) {
	      webidl.errors.invalidArgument({
	        prefix: 'Headers.set',
	        value: name,
	        type: 'header name'
	      });
	    } else if (!isValidHeaderValue(value)) {
	      webidl.errors.invalidArgument({
	        prefix: 'Headers.set',
	        value,
	        type: 'header value'
	      });
	    }

	    // 3. If this’s guard is "immutable", then throw a TypeError.
	    // 4. Otherwise, if this’s guard is "request" and name is a
	    //    forbidden header name, return.
	    // 5. Otherwise, if this’s guard is "request-no-cors" and
	    //    name/value is not a no-CORS-safelisted request-header,
	    //    return.
	    // 6. Otherwise, if this’s guard is "response" and name is a
	    //    forbidden response-header name, return.
	    // Note: undici does not implement forbidden header names
	    if (this[kGuard] === 'immutable') {
	      throw new TypeError('immutable')
	    } else if (this[kGuard] === 'request-no-cors') ;

	    // 7. Set (name, value) in this’s header list.
	    // 8. If this’s guard is "request-no-cors", then remove
	    //    privileged no-CORS request headers from this
	    return this[kHeadersList].set(name, value)
	  }

	  get [kHeadersSortedMap] () {
	    if (!this[kHeadersList][kHeadersSortedMap]) {
	      this[kHeadersList][kHeadersSortedMap] = new Map([...this[kHeadersList]].sort((a, b) => a[0] < b[0] ? -1 : 1));
	    }
	    return this[kHeadersList][kHeadersSortedMap]
	  }

	  keys () {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return makeIterator(this[kHeadersSortedMap].keys(), 'Headers')
	  }

	  values () {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return makeIterator(this[kHeadersSortedMap].values(), 'Headers')
	  }

	  entries () {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return makeIterator(this[kHeadersSortedMap].entries(), 'Headers')
	  }

	  /**
	   * @param {(value: string, key: string, self: Headers) => void} callbackFn
	   * @param {unknown} thisArg
	   */
	  forEach (callbackFn, thisArg = globalThis) {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'forEach' on 'Headers': 1 argument required, but only ${arguments.length} present.`
	      )
	    }

	    if (typeof callbackFn !== 'function') {
	      throw new TypeError(
	        "Failed to execute 'forEach' on 'Headers': parameter 1 is not of type 'Function'."
	      )
	    }

	    for (const [key, value] of this) {
	      callbackFn.apply(thisArg, [value, key, this]);
	    }
	  }

	  [Symbol.for('nodejs.util.inspect.custom')] () {
	    if (!(this instanceof Headers)) {
	      throw new TypeError('Illegal invocation')
	    }

	    return this[kHeadersList]
	  }
	}

	Headers.prototype[Symbol.iterator] = Headers.prototype.entries;

	Object.defineProperties(Headers.prototype, {
	  append: kEnumerableProperty,
	  delete: kEnumerableProperty,
	  get: kEnumerableProperty,
	  has: kEnumerableProperty,
	  set: kEnumerableProperty,
	  keys: kEnumerableProperty,
	  values: kEnumerableProperty,
	  entries: kEnumerableProperty,
	  forEach: kEnumerableProperty
	});

	webidl.converters.HeadersInit = function (V) {
	  if (webidl.util.Type(V) === 'Object') {
	    if (V[Symbol.iterator]) {
	      return webidl.converters['sequence<sequence<ByteString>>'](V)
	    }

	    return webidl.converters['record<ByteString, ByteString>'](V)
	  }

	  webidl.errors.conversionFailed({
	    prefix: 'Headers constructor',
	    argument: 'Argument 1',
	    types: ['sequence<sequence<ByteString>>', 'record<ByteString, ByteString>']
	  });
	};

	headers = {
	  fill,
	  Headers,
	  HeadersList
	};
	return headers;
}

var global$1;
var hasRequiredGlobal;

function requireGlobal () {
	if (hasRequiredGlobal) return global$1;
	hasRequiredGlobal = 1;

	// In case of breaking changes, increase the version
	// number to avoid conflicts.
	const globalOrigin = Symbol.for('undici.globalOrigin.1');

	function getGlobalOrigin () {
	  return globalThis[globalOrigin]
	}

	function setGlobalOrigin (newOrigin) {
	  if (
	    newOrigin !== undefined &&
	    typeof newOrigin !== 'string' &&
	    !(newOrigin instanceof URL)
	  ) {
	    throw new Error('Invalid base url')
	  }

	  if (newOrigin === undefined) {
	    Object.defineProperty(globalThis, globalOrigin, {
	      value: undefined,
	      writable: true,
	      enumerable: false,
	      configurable: false
	    });

	    return
	  }

	  const parsedURL = new URL(newOrigin);

	  if (parsedURL.protocol !== 'http:' && parsedURL.protocol !== 'https:') {
	    throw new TypeError(`Only http & https urls are allowed, received ${parsedURL.protocol}`)
	  }

	  Object.defineProperty(globalThis, globalOrigin, {
	    value: parsedURL,
	    writable: true,
	    enumerable: false,
	    configurable: false
	  });
	}

	global$1 = {
	  getGlobalOrigin,
	  setGlobalOrigin
	};
	return global$1;
}

var response;
var hasRequiredResponse;

function requireResponse () {
	if (hasRequiredResponse) return response;
	hasRequiredResponse = 1;

	const { Headers, HeadersList, fill } = requireHeaders();
	const { extractBody, cloneBody, mixinBody } = requireBody();
	const util = util$e;
	const { kEnumerableProperty } = util;
	const {
	  responseURL,
	  isValidReasonPhrase,
	  isCancelled,
	  isAborted,
	  isBlobLike,
	  serializeJavascriptValueToJSONString,
	  isErrorLike
	} = requireUtil();
	const {
	  redirectStatus,
	  nullBodyStatus,
	  DOMException
	} = requireConstants$1();
	const { kState, kHeaders, kGuard, kRealm } = requireSymbols();
	const { webidl } = requireWebidl();
	const { FormData } = requireFormdata();
	const { getGlobalOrigin } = requireGlobal();
	const { kHeadersList } = symbols$1;
	const assert = require$$0$1;
	const { types } = require$$0;

	const ReadableStream = globalThis.ReadableStream || require$$12.ReadableStream;

	// https://fetch.spec.whatwg.org/#response-class
	class Response {
	  // Creates network error Response.
	  static error () {
	    // TODO
	    const relevantRealm = { settingsObject: {} };

	    // The static error() method steps are to return the result of creating a
	    // Response object, given a new network error, "immutable", and this’s
	    // relevant Realm.
	    const responseObject = new Response();
	    responseObject[kState] = makeNetworkError();
	    responseObject[kRealm] = relevantRealm;
	    responseObject[kHeaders][kHeadersList] = responseObject[kState].headersList;
	    responseObject[kHeaders][kGuard] = 'immutable';
	    responseObject[kHeaders][kRealm] = relevantRealm;
	    return responseObject
	  }

	  // https://fetch.spec.whatwg.org/#dom-response-json
	  static json (data, init = {}) {
	    if (arguments.length === 0) {
	      throw new TypeError(
	        'Failed to execute \'json\' on \'Response\': 1 argument required, but 0 present.'
	      )
	    }

	    if (init !== null) {
	      init = webidl.converters.ResponseInit(init);
	    }

	    // 1. Let bytes the result of running serialize a JavaScript value to JSON bytes on data.
	    const bytes = new TextEncoder('utf-8').encode(
	      serializeJavascriptValueToJSONString(data)
	    );

	    // 2. Let body be the result of extracting bytes.
	    const body = extractBody(bytes);

	    // 3. Let responseObject be the result of creating a Response object, given a new response,
	    //    "response", and this’s relevant Realm.
	    const relevantRealm = { settingsObject: {} };
	    const responseObject = new Response();
	    responseObject[kRealm] = relevantRealm;
	    responseObject[kHeaders][kGuard] = 'response';
	    responseObject[kHeaders][kRealm] = relevantRealm;

	    // 4. Perform initialize a response given responseObject, init, and (body, "application/json").
	    initializeResponse(responseObject, init, { body: body[0], type: 'application/json' });

	    // 5. Return responseObject.
	    return responseObject
	  }

	  // Creates a redirect Response that redirects to url with status status.
	  static redirect (url, status = 302) {
	    const relevantRealm = { settingsObject: {} };

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to execute 'redirect' on 'Response': 1 argument required, but only ${arguments.length} present.`
	      )
	    }

	    url = webidl.converters.USVString(url);
	    status = webidl.converters['unsigned short'](status);

	    // 1. Let parsedURL be the result of parsing url with current settings
	    // object’s API base URL.
	    // 2. If parsedURL is failure, then throw a TypeError.
	    // TODO: base-URL?
	    let parsedURL;
	    try {
	      parsedURL = new URL(url, getGlobalOrigin());
	    } catch (err) {
	      throw Object.assign(new TypeError('Failed to parse URL from ' + url), {
	        cause: err
	      })
	    }

	    // 3. If status is not a redirect status, then throw a RangeError.
	    if (!redirectStatus.includes(status)) {
	      throw new RangeError('Invalid status code')
	    }

	    // 4. Let responseObject be the result of creating a Response object,
	    // given a new response, "immutable", and this’s relevant Realm.
	    const responseObject = new Response();
	    responseObject[kRealm] = relevantRealm;
	    responseObject[kHeaders][kGuard] = 'immutable';
	    responseObject[kHeaders][kRealm] = relevantRealm;

	    // 5. Set responseObject’s response’s status to status.
	    responseObject[kState].status = status;

	    // 6. Let value be parsedURL, serialized and isomorphic encoded.
	    // TODO: isomorphic encoded?
	    const value = parsedURL.toString();

	    // 7. Append `Location`/value to responseObject’s response’s header list.
	    responseObject[kState].headersList.append('location', value);

	    // 8. Return responseObject.
	    return responseObject
	  }

	  // https://fetch.spec.whatwg.org/#dom-response
	  constructor (body = null, init = {}) {
	    if (body !== null) {
	      body = webidl.converters.BodyInit(body);
	    }

	    init = webidl.converters.ResponseInit(init);

	    // TODO
	    this[kRealm] = { settingsObject: {} };

	    // 1. Set this’s response to a new response.
	    this[kState] = makeResponse({});

	    // 2. Set this’s headers to a new Headers object with this’s relevant
	    // Realm, whose header list is this’s response’s header list and guard
	    // is "response".
	    this[kHeaders] = new Headers();
	    this[kHeaders][kGuard] = 'response';
	    this[kHeaders][kHeadersList] = this[kState].headersList;
	    this[kHeaders][kRealm] = this[kRealm];

	    // 3. Let bodyWithType be null.
	    let bodyWithType = null;

	    // 4. If body is non-null, then set bodyWithType to the result of extracting body.
	    if (body != null) {
	      const [extractedBody, type] = extractBody(body);
	      bodyWithType = { body: extractedBody, type };
	    }

	    // 5. Perform initialize a response given this, init, and bodyWithType.
	    initializeResponse(this, init, bodyWithType);
	  }

	  get [Symbol.toStringTag] () {
	    return this.constructor.name
	  }

	  // Returns response’s type, e.g., "cors".
	  get type () {
	    if (!(this instanceof Response)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The type getter steps are to return this’s response’s type.
	    return this[kState].type
	  }

	  // Returns response’s URL, if it has one; otherwise the empty string.
	  get url () {
	    if (!(this instanceof Response)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The url getter steps are to return the empty string if this’s
	    // response’s URL is null; otherwise this’s response’s URL,
	    // serialized with exclude fragment set to true.
	    let url = responseURL(this[kState]);

	    if (url == null) {
	      return ''
	    }

	    if (url.hash) {
	      url = new URL(url);
	      url.hash = '';
	    }

	    return url.toString()
	  }

	  // Returns whether response was obtained through a redirect.
	  get redirected () {
	    if (!(this instanceof Response)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The redirected getter steps are to return true if this’s response’s URL
	    // list has more than one item; otherwise false.
	    return this[kState].urlList.length > 1
	  }

	  // Returns response’s status.
	  get status () {
	    if (!(this instanceof Response)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The status getter steps are to return this’s response’s status.
	    return this[kState].status
	  }

	  // Returns whether response’s status is an ok status.
	  get ok () {
	    if (!(this instanceof Response)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The ok getter steps are to return true if this’s response’s status is an
	    // ok status; otherwise false.
	    return this[kState].status >= 200 && this[kState].status <= 299
	  }

	  // Returns response’s status message.
	  get statusText () {
	    if (!(this instanceof Response)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The statusText getter steps are to return this’s response’s status
	    // message.
	    return this[kState].statusText
	  }

	  // Returns response’s headers as Headers.
	  get headers () {
	    if (!(this instanceof Response)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The headers getter steps are to return this’s headers.
	    return this[kHeaders]
	  }

	  // Returns a clone of response.
	  clone () {
	    if (!(this instanceof Response)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // 1. If this is unusable, then throw a TypeError.
	    if (this.bodyUsed || (this.body && this.body.locked)) {
	      webidl.errors.exception({
	        header: 'Response.clone',
	        message: 'Body has already been consumed.'
	      });
	    }

	    // 2. Let clonedResponse be the result of cloning this’s response.
	    const clonedResponse = cloneResponse(this[kState]);

	    // 3. Return the result of creating a Response object, given
	    // clonedResponse, this’s headers’s guard, and this’s relevant Realm.
	    const clonedResponseObject = new Response();
	    clonedResponseObject[kState] = clonedResponse;
	    clonedResponseObject[kRealm] = this[kRealm];
	    clonedResponseObject[kHeaders][kHeadersList] = clonedResponse.headersList;
	    clonedResponseObject[kHeaders][kGuard] = this[kHeaders][kGuard];
	    clonedResponseObject[kHeaders][kRealm] = this[kHeaders][kRealm];

	    return clonedResponseObject
	  }
	}

	mixinBody(Response);

	Object.defineProperties(Response.prototype, {
	  type: kEnumerableProperty,
	  url: kEnumerableProperty,
	  status: kEnumerableProperty,
	  ok: kEnumerableProperty,
	  redirected: kEnumerableProperty,
	  statusText: kEnumerableProperty,
	  headers: kEnumerableProperty,
	  clone: kEnumerableProperty
	});

	// https://fetch.spec.whatwg.org/#concept-response-clone
	function cloneResponse (response) {
	  // To clone a response response, run these steps:

	  // 1. If response is a filtered response, then return a new identical
	  // filtered response whose internal response is a clone of response’s
	  // internal response.
	  if (response.internalResponse) {
	    return filterResponse(
	      cloneResponse(response.internalResponse),
	      response.type
	    )
	  }

	  // 2. Let newResponse be a copy of response, except for its body.
	  const newResponse = makeResponse({ ...response, body: null });

	  // 3. If response’s body is non-null, then set newResponse’s body to the
	  // result of cloning response’s body.
	  if (response.body != null) {
	    newResponse.body = cloneBody(response.body);
	  }

	  // 4. Return newResponse.
	  return newResponse
	}

	function makeResponse (init) {
	  return {
	    aborted: false,
	    rangeRequested: false,
	    timingAllowPassed: false,
	    requestIncludesCredentials: false,
	    type: 'default',
	    status: 200,
	    timingInfo: null,
	    cacheState: '',
	    statusText: '',
	    ...init,
	    headersList: init.headersList
	      ? new HeadersList(init.headersList)
	      : new HeadersList(),
	    urlList: init.urlList ? [...init.urlList] : []
	  }
	}

	function makeNetworkError (reason) {
	  const isError = isErrorLike(reason);
	  return makeResponse({
	    type: 'error',
	    status: 0,
	    error: isError
	      ? reason
	      : new Error(reason ? String(reason) : reason, {
	        cause: isError ? reason : undefined
	      }),
	    aborted: reason && reason.name === 'AbortError'
	  })
	}

	function makeFilteredResponse (response, state) {
	  state = {
	    internalResponse: response,
	    ...state
	  };

	  return new Proxy(response, {
	    get (target, p) {
	      return p in state ? state[p] : target[p]
	    },
	    set (target, p, value) {
	      assert(!(p in state));
	      target[p] = value;
	      return true
	    }
	  })
	}

	// https://fetch.spec.whatwg.org/#concept-filtered-response
	function filterResponse (response, type) {
	  // Set response to the following filtered response with response as its
	  // internal response, depending on request’s response tainting:
	  if (type === 'basic') {
	    // A basic filtered response is a filtered response whose type is "basic"
	    // and header list excludes any headers in internal response’s header list
	    // whose name is a forbidden response-header name.

	    // Note: undici does not implement forbidden response-header names
	    return makeFilteredResponse(response, {
	      type: 'basic',
	      headersList: response.headersList
	    })
	  } else if (type === 'cors') {
	    // A CORS filtered response is a filtered response whose type is "cors"
	    // and header list excludes any headers in internal response’s header
	    // list whose name is not a CORS-safelisted response-header name, given
	    // internal response’s CORS-exposed header-name list.

	    // Note: undici does not implement CORS-safelisted response-header names
	    return makeFilteredResponse(response, {
	      type: 'cors',
	      headersList: response.headersList
	    })
	  } else if (type === 'opaque') {
	    // An opaque filtered response is a filtered response whose type is
	    // "opaque", URL list is the empty list, status is 0, status message
	    // is the empty byte sequence, header list is empty, and body is null.

	    return makeFilteredResponse(response, {
	      type: 'opaque',
	      urlList: Object.freeze([]),
	      status: 0,
	      statusText: '',
	      body: null
	    })
	  } else if (type === 'opaqueredirect') {
	    // An opaque-redirect filtered response is a filtered response whose type
	    // is "opaqueredirect", status is 0, status message is the empty byte
	    // sequence, header list is empty, and body is null.

	    return makeFilteredResponse(response, {
	      type: 'opaqueredirect',
	      status: 0,
	      statusText: '',
	      headersList: [],
	      body: null
	    })
	  } else {
	    assert(false);
	  }
	}

	// https://fetch.spec.whatwg.org/#appropriate-network-error
	function makeAppropriateNetworkError (fetchParams) {
	  // 1. Assert: fetchParams is canceled.
	  assert(isCancelled(fetchParams));

	  // 2. Return an aborted network error if fetchParams is aborted;
	  // otherwise return a network error.
	  return isAborted(fetchParams)
	    ? makeNetworkError(new DOMException('The operation was aborted.', 'AbortError'))
	    : makeNetworkError(fetchParams.controller.terminated.reason)
	}

	// https://whatpr.org/fetch/1392.html#initialize-a-response
	function initializeResponse (response, init, body) {
	  // 1. If init["status"] is not in the range 200 to 599, inclusive, then
	  //    throw a RangeError.
	  if (init.status !== null && (init.status < 200 || init.status > 599)) {
	    throw new RangeError('init["status"] must be in the range of 200 to 599, inclusive.')
	  }

	  // 2. If init["statusText"] does not match the reason-phrase token production,
	  //    then throw a TypeError.
	  if ('statusText' in init && init.statusText != null) {
	    // See, https://datatracker.ietf.org/doc/html/rfc7230#section-3.1.2:
	    //   reason-phrase  = *( HTAB / SP / VCHAR / obs-text )
	    if (!isValidReasonPhrase(String(init.statusText))) {
	      throw new TypeError('Invalid statusText')
	    }
	  }

	  // 3. Set response’s response’s status to init["status"].
	  if ('status' in init && init.status != null) {
	    response[kState].status = init.status;
	  }

	  // 4. Set response’s response’s status message to init["statusText"].
	  if ('statusText' in init && init.statusText != null) {
	    response[kState].statusText = init.statusText;
	  }

	  // 5. If init["headers"] exists, then fill response’s headers with init["headers"].
	  if ('headers' in init && init.headers != null) {
	    fill(response[kState].headersList, init.headers);
	  }

	  // 6. If body was given, then:
	  if (body) {
	    // 1. If response's status is a null body status, then throw a TypeError.
	    if (nullBodyStatus.includes(response.status)) {
	      webidl.errors.exception({
	        header: 'Response constructor',
	        message: 'Invalid response status code.'
	      });
	    }

	    // 2. Set response's body to body's body.
	    response[kState].body = body.body;

	    // 3. If body's type is non-null and response's header list does not contain
	    //    `Content-Type`, then append (`Content-Type`, body's type) to response's header list.
	    if (body.type != null && !response[kState].headersList.has('Content-Type')) {
	      response[kState].headersList.append('content-type', body.type);
	    }
	  }
	}

	webidl.converters.ReadableStream = webidl.interfaceConverter(
	  ReadableStream
	);

	webidl.converters.FormData = webidl.interfaceConverter(
	  FormData
	);

	webidl.converters.URLSearchParams = webidl.interfaceConverter(
	  URLSearchParams
	);

	// https://fetch.spec.whatwg.org/#typedefdef-xmlhttprequestbodyinit
	webidl.converters.XMLHttpRequestBodyInit = function (V) {
	  if (typeof V === 'string') {
	    return webidl.converters.USVString(V)
	  }

	  if (isBlobLike(V)) {
	    return webidl.converters.Blob(V, { strict: false })
	  }

	  if (
	    types.isAnyArrayBuffer(V) ||
	    types.isTypedArray(V) ||
	    types.isDataView(V)
	  ) {
	    return webidl.converters.BufferSource(V)
	  }

	  if (util.isFormDataLike(V)) {
	    return webidl.converters.FormData(V, { strict: false })
	  }

	  if (V instanceof URLSearchParams) {
	    return webidl.converters.URLSearchParams(V)
	  }

	  return webidl.converters.DOMString(V)
	};

	// https://fetch.spec.whatwg.org/#bodyinit
	webidl.converters.BodyInit = function (V) {
	  if (V instanceof ReadableStream) {
	    return webidl.converters.ReadableStream(V)
	  }

	  // Note: the spec doesn't include async iterables,
	  // this is an undici extension.
	  if (V?.[Symbol.asyncIterator]) {
	    return V
	  }

	  return webidl.converters.XMLHttpRequestBodyInit(V)
	};

	webidl.converters.ResponseInit = webidl.dictionaryConverter([
	  {
	    key: 'status',
	    converter: webidl.converters['unsigned short'],
	    defaultValue: 200
	  },
	  {
	    key: 'statusText',
	    converter: webidl.converters.ByteString,
	    defaultValue: ''
	  },
	  {
	    key: 'headers',
	    converter: webidl.converters.HeadersInit
	  }
	]);

	response = {
	  makeNetworkError,
	  makeResponse,
	  makeAppropriateNetworkError,
	  filterResponse,
	  Response
	};
	return response;
}

/* globals AbortController */

var request;
var hasRequiredRequest;

function requireRequest () {
	if (hasRequiredRequest) return request;
	hasRequiredRequest = 1;

	const { extractBody, mixinBody, cloneBody } = requireBody();
	const { Headers, fill: fillHeaders, HeadersList } = requireHeaders();
	const { FinalizationRegistry } = dispatcherWeakref();
	const util = util$e;
	const {
	  isValidHTTPToken,
	  sameOrigin,
	  normalizeMethod
	} = requireUtil();
	const {
	  forbiddenMethods,
	  corsSafeListedMethods,
	  referrerPolicy,
	  requestRedirect,
	  requestMode,
	  requestCredentials,
	  requestCache
	} = requireConstants$1();
	const { kEnumerableProperty } = util;
	const { kHeaders, kSignal, kState, kGuard, kRealm } = requireSymbols();
	const { webidl } = requireWebidl();
	const { getGlobalOrigin } = requireGlobal();
	const { kHeadersList } = symbols$1;
	const assert = require$$0$1;

	let TransformStream;

	const kInit = Symbol('init');

	const requestFinalizer = new FinalizationRegistry(({ signal, abort }) => {
	  signal.removeEventListener('abort', abort);
	});

	// https://fetch.spec.whatwg.org/#request-class
	class Request {
	  // https://fetch.spec.whatwg.org/#dom-request
	  constructor (input, init = {}) {
	    if (input === kInit) {
	      return
	    }

	    if (arguments.length < 1) {
	      throw new TypeError(
	        `Failed to construct 'Request': 1 argument required, but only ${arguments.length} present.`
	      )
	    }

	    input = webidl.converters.RequestInfo(input);
	    init = webidl.converters.RequestInit(init);

	    // TODO
	    this[kRealm] = {
	      settingsObject: {
	        baseUrl: getGlobalOrigin()
	      }
	    };

	    // 1. Let request be null.
	    let request = null;

	    // 2. Let fallbackMode be null.
	    let fallbackMode = null;

	    // 3. Let baseURL be this’s relevant settings object’s API base URL.
	    const baseUrl = this[kRealm].settingsObject.baseUrl;

	    // 4. Let signal be null.
	    let signal = null;

	    // 5. If input is a string, then:
	    if (typeof input === 'string') {
	      // 1. Let parsedURL be the result of parsing input with baseURL.
	      // 2. If parsedURL is failure, then throw a TypeError.
	      let parsedURL;
	      try {
	        parsedURL = new URL(input, baseUrl);
	      } catch (err) {
	        throw new TypeError('Failed to parse URL from ' + input, { cause: err })
	      }

	      // 3. If parsedURL includes credentials, then throw a TypeError.
	      if (parsedURL.username || parsedURL.password) {
	        throw new TypeError(
	          'Request cannot be constructed from a URL that includes credentials: ' +
	            input
	        )
	      }

	      // 4. Set request to a new request whose URL is parsedURL.
	      request = makeRequest({ urlList: [parsedURL] });

	      // 5. Set fallbackMode to "cors".
	      fallbackMode = 'cors';
	    } else {
	      // 6. Otherwise:

	      // 7. Assert: input is a Request object.
	      assert(input instanceof Request);

	      // 8. Set request to input’s request.
	      request = input[kState];

	      // 9. Set signal to input’s signal.
	      signal = input[kSignal];
	    }

	    // 7. Let origin be this’s relevant settings object’s origin.
	    const origin = this[kRealm].settingsObject.origin;

	    // 8. Let window be "client".
	    let window = 'client';

	    // 9. If request’s window is an environment settings object and its origin
	    // is same origin with origin, then set window to request’s window.
	    if (
	      request.window?.constructor?.name === 'EnvironmentSettingsObject' &&
	      sameOrigin(request.window, origin)
	    ) {
	      window = request.window;
	    }

	    // 10. If init["window"] exists and is non-null, then throw a TypeError.
	    if (init.window !== undefined && init.window != null) {
	      throw new TypeError(`'window' option '${window}' must be null`)
	    }

	    // 11. If init["window"] exists, then set window to "no-window".
	    if (init.window !== undefined) {
	      window = 'no-window';
	    }

	    // 12. Set request to a new request with the following properties:
	    request = makeRequest({
	      // URL request’s URL.
	      // undici implementation note: this is set as the first item in request's urlList in makeRequest
	      // method request’s method.
	      method: request.method,
	      // header list A copy of request’s header list.
	      // undici implementation note: headersList is cloned in makeRequest
	      headersList: request.headersList,
	      // unsafe-request flag Set.
	      unsafeRequest: request.unsafeRequest,
	      // client This’s relevant settings object.
	      client: this[kRealm].settingsObject,
	      // window window.
	      window,
	      // priority request’s priority.
	      priority: request.priority,
	      // origin request’s origin. The propagation of the origin is only significant for navigation requests
	      // being handled by a service worker. In this scenario a request can have an origin that is different
	      // from the current client.
	      origin: request.origin,
	      // referrer request’s referrer.
	      referrer: request.referrer,
	      // referrer policy request’s referrer policy.
	      referrerPolicy: request.referrerPolicy,
	      // mode request’s mode.
	      mode: request.mode,
	      // credentials mode request’s credentials mode.
	      credentials: request.credentials,
	      // cache mode request’s cache mode.
	      cache: request.cache,
	      // redirect mode request’s redirect mode.
	      redirect: request.redirect,
	      // integrity metadata request’s integrity metadata.
	      integrity: request.integrity,
	      // keepalive request’s keepalive.
	      keepalive: request.keepalive,
	      // reload-navigation flag request’s reload-navigation flag.
	      reloadNavigation: request.reloadNavigation,
	      // history-navigation flag request’s history-navigation flag.
	      historyNavigation: request.historyNavigation,
	      // URL list A clone of request’s URL list.
	      urlList: [...request.urlList]
	    });

	    // 13. If init is not empty, then:
	    if (Object.keys(init).length > 0) {
	      // 1. If request’s mode is "navigate", then set it to "same-origin".
	      if (request.mode === 'navigate') {
	        request.mode = 'same-origin';
	      }

	      // 2. Unset request’s reload-navigation flag.
	      request.reloadNavigation = false;

	      // 3. Unset request’s history-navigation flag.
	      request.historyNavigation = false;

	      // 4. Set request’s origin to "client".
	      request.origin = 'client';

	      // 5. Set request’s referrer to "client"
	      request.referrer = 'client';

	      // 6. Set request’s referrer policy to the empty string.
	      request.referrerPolicy = '';

	      // 7. Set request’s URL to request’s current URL.
	      request.url = request.urlList[request.urlList.length - 1];

	      // 8. Set request’s URL list to « request’s URL ».
	      request.urlList = [request.url];
	    }

	    // 14. If init["referrer"] exists, then:
	    if (init.referrer !== undefined) {
	      // 1. Let referrer be init["referrer"].
	      const referrer = init.referrer;

	      // 2. If referrer is the empty string, then set request’s referrer to "no-referrer".
	      if (referrer === '') {
	        request.referrer = 'no-referrer';
	      } else {
	        // 1. Let parsedReferrer be the result of parsing referrer with
	        // baseURL.
	        // 2. If parsedReferrer is failure, then throw a TypeError.
	        let parsedReferrer;
	        try {
	          parsedReferrer = new URL(referrer, baseUrl);
	        } catch (err) {
	          throw new TypeError(`Referrer "${referrer}" is not a valid URL.`, { cause: err })
	        }

	        // 3. If one of the following is true
	        // parsedReferrer’s cannot-be-a-base-URL is true, scheme is "about",
	        // and path contains a single string "client"
	        // parsedReferrer’s origin is not same origin with origin
	        // then set request’s referrer to "client".
	        // TODO

	        // 4. Otherwise, set request’s referrer to parsedReferrer.
	        request.referrer = parsedReferrer;
	      }
	    }

	    // 15. If init["referrerPolicy"] exists, then set request’s referrer policy
	    // to it.
	    if (init.referrerPolicy !== undefined) {
	      request.referrerPolicy = init.referrerPolicy;
	      if (!referrerPolicy.includes(request.referrerPolicy)) {
	        throw new TypeError(
	          `Failed to construct 'Request': The provided value '${request.referrerPolicy}' is not a valid enum value of type ReferrerPolicy.`
	        )
	      }
	    }

	    // 16. Let mode be init["mode"] if it exists, and fallbackMode otherwise.
	    let mode;
	    if (init.mode !== undefined) {
	      mode = init.mode;
	      if (!requestMode.includes(mode)) {
	        throw new TypeError(
	          `Failed to construct 'Request': The provided value '${request.mode}' is not a valid enum value of type RequestMode.`
	        )
	      }
	    } else {
	      mode = fallbackMode;
	    }

	    // 17. If mode is "navigate", then throw a TypeError.
	    if (mode === 'navigate') {
	      webidl.errors.exception({
	        header: 'Request constructor',
	        message: 'invalid request mode navigate.'
	      });
	    }

	    // 18. If mode is non-null, set request’s mode to mode.
	    if (mode != null) {
	      request.mode = mode;
	    }

	    // 19. If init["credentials"] exists, then set request’s credentials mode
	    // to it.
	    if (init.credentials !== undefined) {
	      request.credentials = init.credentials;
	      if (!requestCredentials.includes(request.credentials)) {
	        throw new TypeError(
	          `Failed to construct 'Request': The provided value '${request.credentials}' is not a valid enum value of type RequestCredentials.`
	        )
	      }
	    }

	    // 18. If init["cache"] exists, then set request’s cache mode to it.
	    if (init.cache !== undefined) {
	      request.cache = init.cache;
	      if (!requestCache.includes(request.cache)) {
	        throw new TypeError(
	          `Failed to construct 'Request': The provided value '${request.cache}' is not a valid enum value of type RequestCache.`
	        )
	      }
	    }

	    // 21. If request’s cache mode is "only-if-cached" and request’s mode is
	    // not "same-origin", then throw a TypeError.
	    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
	      throw new TypeError(
	        "'only-if-cached' can be set only with 'same-origin' mode"
	      )
	    }

	    // 22. If init["redirect"] exists, then set request’s redirect mode to it.
	    if (init.redirect !== undefined) {
	      request.redirect = init.redirect;
	      if (!requestRedirect.includes(request.redirect)) {
	        throw new TypeError(
	          `Failed to construct 'Request': The provided value '${request.redirect}' is not a valid enum value of type RequestRedirect.`
	        )
	      }
	    }

	    // 23. If init["integrity"] exists, then set request’s integrity metadata to it.
	    if (init.integrity !== undefined && init.integrity != null) {
	      request.integrity = String(init.integrity);
	    }

	    // 24. If init["keepalive"] exists, then set request’s keepalive to it.
	    if (init.keepalive !== undefined) {
	      request.keepalive = Boolean(init.keepalive);
	    }

	    // 25. If init["method"] exists, then:
	    if (init.method !== undefined) {
	      // 1. Let method be init["method"].
	      let method = init.method;

	      // 2. If method is not a method or method is a forbidden method, then
	      // throw a TypeError.
	      if (!isValidHTTPToken(init.method)) {
	        throw TypeError(`'${init.method}' is not a valid HTTP method.`)
	      }

	      if (forbiddenMethods.indexOf(method.toUpperCase()) !== -1) {
	        throw TypeError(`'${init.method}' HTTP method is unsupported.`)
	      }

	      // 3. Normalize method.
	      method = normalizeMethod(init.method);

	      // 4. Set request’s method to method.
	      request.method = method;
	    }

	    // 26. If init["signal"] exists, then set signal to it.
	    if (init.signal !== undefined) {
	      signal = init.signal;
	    }

	    // 27. Set this’s request to request.
	    this[kState] = request;

	    // 28. Set this’s signal to a new AbortSignal object with this’s relevant
	    // Realm.
	    const ac = new AbortController();
	    this[kSignal] = ac.signal;
	    this[kSignal][kRealm] = this[kRealm];

	    // 29. If signal is not null, then make this’s signal follow signal.
	    if (signal != null) {
	      if (
	        !signal ||
	        typeof signal.aborted !== 'boolean' ||
	        typeof signal.addEventListener !== 'function'
	      ) {
	        throw new TypeError(
	          "Failed to construct 'Request': member signal is not of type AbortSignal."
	        )
	      }

	      if (signal.aborted) {
	        ac.abort(signal.reason);
	      } else {
	        const abort = () => ac.abort(signal.reason);
	        signal.addEventListener('abort', abort, { once: true });
	        requestFinalizer.register(this, { signal, abort });
	      }
	    }

	    // 30. Set this’s headers to a new Headers object with this’s relevant
	    // Realm, whose header list is request’s header list and guard is
	    // "request".
	    this[kHeaders] = new Headers();
	    this[kHeaders][kHeadersList] = request.headersList;
	    this[kHeaders][kGuard] = 'request';
	    this[kHeaders][kRealm] = this[kRealm];

	    // 31. If this’s request’s mode is "no-cors", then:
	    if (mode === 'no-cors') {
	      // 1. If this’s request’s method is not a CORS-safelisted method,
	      // then throw a TypeError.
	      if (!corsSafeListedMethods.includes(request.method)) {
	        throw new TypeError(
	          `'${request.method} is unsupported in no-cors mode.`
	        )
	      }

	      // 2. Set this’s headers’s guard to "request-no-cors".
	      this[kHeaders][kGuard] = 'request-no-cors';
	    }

	    // 32. If init is not empty, then:
	    if (Object.keys(init).length !== 0) {
	      // 1. Let headers be a copy of this’s headers and its associated header
	      // list.
	      let headers = new Headers(this[kHeaders]);

	      // 2. If init["headers"] exists, then set headers to init["headers"].
	      if (init.headers !== undefined) {
	        headers = init.headers;
	      }

	      // 3. Empty this’s headers’s header list.
	      this[kHeaders][kHeadersList].clear();

	      // 4. If headers is a Headers object, then for each header in its header
	      // list, append header’s name/header’s value to this’s headers.
	      if (headers.constructor.name === 'Headers') {
	        for (const [key, val] of headers) {
	          this[kHeaders].append(key, val);
	        }
	      } else {
	        // 5. Otherwise, fill this’s headers with headers.
	        fillHeaders(this[kHeaders], headers);
	      }
	    }

	    // 33. Let inputBody be input’s request’s body if input is a Request
	    // object; otherwise null.
	    const inputBody = input instanceof Request ? input[kState].body : null;

	    // 34. If either init["body"] exists and is non-null or inputBody is
	    // non-null, and request’s method is `GET` or `HEAD`, then throw a
	    // TypeError.
	    if (
	      ((init.body !== undefined && init.body != null) || inputBody != null) &&
	      (request.method === 'GET' || request.method === 'HEAD')
	    ) {
	      throw new TypeError('Request with GET/HEAD method cannot have body.')
	    }

	    // 35. Let initBody be null.
	    let initBody = null;

	    // 36. If init["body"] exists and is non-null, then:
	    if (init.body !== undefined && init.body != null) {
	      // 1. Let Content-Type be null.
	      // 2. Set initBody and Content-Type to the result of extracting
	      // init["body"], with keepalive set to request’s keepalive.
	      const [extractedBody, contentType] = extractBody(
	        init.body,
	        request.keepalive
	      );
	      initBody = extractedBody;

	      // 3, If Content-Type is non-null and this’s headers’s header list does
	      // not contain `Content-Type`, then append `Content-Type`/Content-Type to
	      // this’s headers.
	      if (contentType && !this[kHeaders].has('content-type')) {
	        this[kHeaders].append('content-type', contentType);
	      }
	    }

	    // 37. Let inputOrInitBody be initBody if it is non-null; otherwise
	    // inputBody.
	    const inputOrInitBody = initBody ?? inputBody;

	    // 38. If inputOrInitBody is non-null and inputOrInitBody’s source is
	    // null, then:
	    if (inputOrInitBody != null && inputOrInitBody.source == null) {
	      // 1. If this’s request’s mode is neither "same-origin" nor "cors",
	      // then throw a TypeError.
	      if (request.mode !== 'same-origin' && request.mode !== 'cors') {
	        throw new TypeError(
	          'If request is made from ReadableStream, mode should be "same-origin" or "cors"'
	        )
	      }

	      // 2. Set this’s request’s use-CORS-preflight flag.
	      request.useCORSPreflightFlag = true;
	    }

	    // 39. Let finalBody be inputOrInitBody.
	    let finalBody = inputOrInitBody;

	    // 40. If initBody is null and inputBody is non-null, then:
	    if (initBody == null && inputBody != null) {
	      // 1. If input is unusable, then throw a TypeError.
	      if (util.isDisturbed(inputBody.stream) || inputBody.stream.locked) {
	        throw new TypeError(
	          'Cannot construct a Request with a Request object that has already been used.'
	        )
	      }

	      // 2. Set finalBody to the result of creating a proxy for inputBody.
	      if (!TransformStream) {
	        TransformStream = require$$12.TransformStream;
	      }

	      // https://streams.spec.whatwg.org/#readablestream-create-a-proxy
	      const identityTransform = new TransformStream();
	      inputBody.stream.pipeThrough(identityTransform);
	      finalBody = {
	        source: inputBody.source,
	        length: inputBody.length,
	        stream: identityTransform.readable
	      };
	    }

	    // 41. Set this’s request’s body to finalBody.
	    this[kState].body = finalBody;
	  }

	  get [Symbol.toStringTag] () {
	    return this.constructor.name
	  }

	  // Returns request’s HTTP method, which is "GET" by default.
	  get method () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The method getter steps are to return this’s request’s method.
	    return this[kState].method
	  }

	  // Returns the URL of request as a string.
	  get url () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The url getter steps are to return this’s request’s URL, serialized.
	    return this[kState].url.toString()
	  }

	  // Returns a Headers object consisting of the headers associated with request.
	  // Note that headers added in the network layer by the user agent will not
	  // be accounted for in this object, e.g., the "Host" header.
	  get headers () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The headers getter steps are to return this’s headers.
	    return this[kHeaders]
	  }

	  // Returns the kind of resource requested by request, e.g., "document"
	  // or "script".
	  get destination () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The destination getter are to return this’s request’s destination.
	    return this[kState].destination
	  }

	  // Returns the referrer of request. Its value can be a same-origin URL if
	  // explicitly set in init, the empty string to indicate no referrer, and
	  // "about:client" when defaulting to the global’s default. This is used
	  // during fetching to determine the value of the `Referer` header of the
	  // request being made.
	  get referrer () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // 1. If this’s request’s referrer is "no-referrer", then return the
	    // empty string.
	    if (this[kState].referrer === 'no-referrer') {
	      return ''
	    }

	    // 2. If this’s request’s referrer is "client", then return
	    // "about:client".
	    if (this[kState].referrer === 'client') {
	      return 'about:client'
	    }

	    // Return this’s request’s referrer, serialized.
	    return this[kState].referrer.toString()
	  }

	  // Returns the referrer policy associated with request.
	  // This is used during fetching to compute the value of the request’s
	  // referrer.
	  get referrerPolicy () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The referrerPolicy getter steps are to return this’s request’s referrer policy.
	    return this[kState].referrerPolicy
	  }

	  // Returns the mode associated with request, which is a string indicating
	  // whether the request will use CORS, or will be restricted to same-origin
	  // URLs.
	  get mode () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The mode getter steps are to return this’s request’s mode.
	    return this[kState].mode
	  }

	  // Returns the credentials mode associated with request,
	  // which is a string indicating whether credentials will be sent with the
	  // request always, never, or only when sent to a same-origin URL.
	  get credentials () {
	    // The credentials getter steps are to return this’s request’s credentials mode.
	    return this[kState].credentials
	  }

	  // Returns the cache mode associated with request,
	  // which is a string indicating how the request will
	  // interact with the browser’s cache when fetching.
	  get cache () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The cache getter steps are to return this’s request’s cache mode.
	    return this[kState].cache
	  }

	  // Returns the redirect mode associated with request,
	  // which is a string indicating how redirects for the
	  // request will be handled during fetching. A request
	  // will follow redirects by default.
	  get redirect () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The redirect getter steps are to return this’s request’s redirect mode.
	    return this[kState].redirect
	  }

	  // Returns request’s subresource integrity metadata, which is a
	  // cryptographic hash of the resource being fetched. Its value
	  // consists of multiple hashes separated by whitespace. [SRI]
	  get integrity () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The integrity getter steps are to return this’s request’s integrity
	    // metadata.
	    return this[kState].integrity
	  }

	  // Returns a boolean indicating whether or not request can outlive the
	  // global in which it was created.
	  get keepalive () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The keepalive getter steps are to return this’s request’s keepalive.
	    return this[kState].keepalive
	  }

	  // Returns a boolean indicating whether or not request is for a reload
	  // navigation.
	  get isReloadNavigation () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The isReloadNavigation getter steps are to return true if this’s
	    // request’s reload-navigation flag is set; otherwise false.
	    return this[kState].reloadNavigation
	  }

	  // Returns a boolean indicating whether or not request is for a history
	  // navigation (a.k.a. back-foward navigation).
	  get isHistoryNavigation () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The isHistoryNavigation getter steps are to return true if this’s request’s
	    // history-navigation flag is set; otherwise false.
	    return this[kState].historyNavigation
	  }

	  // Returns the signal associated with request, which is an AbortSignal
	  // object indicating whether or not request has been aborted, and its
	  // abort event handler.
	  get signal () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // The signal getter steps are to return this’s signal.
	    return this[kSignal]
	  }

	  // Returns a clone of request.
	  clone () {
	    if (!(this instanceof Request)) {
	      throw new TypeError('Illegal invocation')
	    }

	    // 1. If this is unusable, then throw a TypeError.
	    if (this.bodyUsed || this.body?.locked) {
	      throw new TypeError('unusable')
	    }

	    // 2. Let clonedRequest be the result of cloning this’s request.
	    const clonedRequest = cloneRequest(this[kState]);

	    // 3. Let clonedRequestObject be the result of creating a Request object,
	    // given clonedRequest, this’s headers’s guard, and this’s relevant Realm.
	    const clonedRequestObject = new Request(kInit);
	    clonedRequestObject[kState] = clonedRequest;
	    clonedRequestObject[kRealm] = this[kRealm];
	    clonedRequestObject[kHeaders] = new Headers();
	    clonedRequestObject[kHeaders][kHeadersList] = clonedRequest.headersList;
	    clonedRequestObject[kHeaders][kGuard] = this[kHeaders][kGuard];
	    clonedRequestObject[kHeaders][kRealm] = this[kHeaders][kRealm];

	    // 4. Make clonedRequestObject’s signal follow this’s signal.
	    const ac = new AbortController();
	    if (this.signal.aborted) {
	      ac.abort(this.signal.reason);
	    } else {
	      this.signal.addEventListener(
	        'abort',
	        () => {
	          ac.abort(this.signal.reason);
	        },
	        { once: true }
	      );
	    }
	    clonedRequestObject[kSignal] = ac.signal;

	    // 4. Return clonedRequestObject.
	    return clonedRequestObject
	  }
	}

	mixinBody(Request);

	function makeRequest (init) {
	  // https://fetch.spec.whatwg.org/#requests
	  const request = {
	    method: 'GET',
	    localURLsOnly: false,
	    unsafeRequest: false,
	    body: null,
	    client: null,
	    reservedClient: null,
	    replacesClientId: '',
	    window: 'client',
	    keepalive: false,
	    serviceWorkers: 'all',
	    initiator: '',
	    destination: '',
	    priority: null,
	    origin: 'client',
	    policyContainer: 'client',
	    referrer: 'client',
	    referrerPolicy: '',
	    mode: 'no-cors',
	    useCORSPreflightFlag: false,
	    credentials: 'same-origin',
	    useCredentials: false,
	    cache: 'default',
	    redirect: 'follow',
	    integrity: '',
	    cryptoGraphicsNonceMetadata: '',
	    parserMetadata: '',
	    reloadNavigation: false,
	    historyNavigation: false,
	    userActivation: false,
	    taintedOrigin: false,
	    redirectCount: 0,
	    responseTainting: 'basic',
	    preventNoCacheCacheControlHeaderModification: false,
	    done: false,
	    timingAllowFailed: false,
	    ...init,
	    headersList: init.headersList
	      ? new HeadersList(init.headersList)
	      : new HeadersList()
	  };
	  request.url = request.urlList[0];
	  return request
	}

	// https://fetch.spec.whatwg.org/#concept-request-clone
	function cloneRequest (request) {
	  // To clone a request request, run these steps:

	  // 1. Let newRequest be a copy of request, except for its body.
	  const newRequest = makeRequest({ ...request, body: null });

	  // 2. If request’s body is non-null, set newRequest’s body to the
	  // result of cloning request’s body.
	  if (request.body != null) {
	    newRequest.body = cloneBody(request.body);
	  }

	  // 3. Return newRequest.
	  return newRequest
	}

	Object.defineProperties(Request.prototype, {
	  method: kEnumerableProperty,
	  url: kEnumerableProperty,
	  headers: kEnumerableProperty,
	  redirect: kEnumerableProperty,
	  clone: kEnumerableProperty,
	  signal: kEnumerableProperty
	});

	webidl.converters.Request = webidl.interfaceConverter(
	  Request
	);

	// https://fetch.spec.whatwg.org/#requestinfo
	webidl.converters.RequestInfo = function (V) {
	  if (typeof V === 'string') {
	    return webidl.converters.USVString(V)
	  }

	  if (V instanceof Request) {
	    return webidl.converters.Request(V)
	  }

	  return webidl.converters.USVString(V)
	};

	webidl.converters.AbortSignal = webidl.interfaceConverter(
	  AbortSignal
	);

	// https://fetch.spec.whatwg.org/#requestinit
	webidl.converters.RequestInit = webidl.dictionaryConverter([
	  {
	    key: 'method',
	    converter: webidl.converters.ByteString
	  },
	  {
	    key: 'headers',
	    converter: webidl.converters.HeadersInit
	  },
	  {
	    key: 'body',
	    converter: webidl.nullableConverter(
	      webidl.converters.BodyInit
	    )
	  },
	  {
	    key: 'referrer',
	    converter: webidl.converters.USVString
	  },
	  {
	    key: 'referrerPolicy',
	    converter: webidl.converters.DOMString,
	    // https://w3c.github.io/webappsec-referrer-policy/#referrer-policy
	    allowedValues: [
	      '', 'no-referrer', 'no-referrer-when-downgrade',
	      'same-origin', 'origin', 'strict-origin',
	      'origin-when-cross-origin', 'strict-origin-when-cross-origin',
	      'unsafe-url'
	    ]
	  },
	  {
	    key: 'mode',
	    converter: webidl.converters.DOMString,
	    // https://fetch.spec.whatwg.org/#concept-request-mode
	    allowedValues: [
	      'same-origin', 'cors', 'no-cors', 'navigate', 'websocket'
	    ]
	  },
	  {
	    key: 'credentials',
	    converter: webidl.converters.DOMString,
	    // https://fetch.spec.whatwg.org/#requestcredentials
	    allowedValues: [
	      'omit', 'same-origin', 'include'
	    ]
	  },
	  {
	    key: 'cache',
	    converter: webidl.converters.DOMString,
	    // https://fetch.spec.whatwg.org/#requestcache
	    allowedValues: [
	      'default', 'no-store', 'reload', 'no-cache', 'force-cache',
	      'only-if-cached'
	    ]
	  },
	  {
	    key: 'redirect',
	    converter: webidl.converters.DOMString,
	    // https://fetch.spec.whatwg.org/#requestredirect
	    allowedValues: [
	      'follow', 'error', 'manual'
	    ]
	  },
	  {
	    key: 'integrity',
	    converter: webidl.converters.DOMString
	  },
	  {
	    key: 'keepalive',
	    converter: webidl.converters.boolean
	  },
	  {
	    key: 'signal',
	    converter: webidl.nullableConverter(
	      (signal) => webidl.converters.AbortSignal(
	        signal,
	        { strict: false }
	      )
	    )
	  },
	  {
	    key: 'window',
	    converter: webidl.converters.any
	  }
	]);

	request = { Request, makeRequest };
	return request;
}

var dataURL;
var hasRequiredDataURL;

function requireDataURL () {
	if (hasRequiredDataURL) return dataURL;
	hasRequiredDataURL = 1;
	const assert = require$$0$1;
	const { atob } = require$$6;
	const { isValidHTTPToken } = requireUtil();

	const encoder = new TextEncoder();

	// https://fetch.spec.whatwg.org/#data-url-processor
	/** @param {URL} dataURL */
	function dataURLProcessor (dataURL) {
	  // 1. Assert: dataURL’s scheme is "data".
	  assert(dataURL.protocol === 'data:');

	  // 2. Let input be the result of running the URL
	  // serializer on dataURL with exclude fragment
	  // set to true.
	  let input = URLSerializer(dataURL, true);

	  // 3. Remove the leading "data:" string from input.
	  input = input.slice(5);

	  // 4. Let position point at the start of input.
	  const position = { position: 0 };

	  // 5. Let mimeType be the result of collecting a
	  // sequence of code points that are not equal
	  // to U+002C (,), given position.
	  let mimeType = collectASequenceOfCodePoints(
	    (char) => char !== ',',
	    input,
	    position
	  );

	  // 6. Strip leading and trailing ASCII whitespace
	  // from mimeType.
	  // Note: This will only remove U+0020 SPACE code
	  // points, if any.
	  // Undici implementation note: we need to store the
	  // length because if the mimetype has spaces removed,
	  // the wrong amount will be sliced from the input in
	  // step #9
	  const mimeTypeLength = mimeType.length;
	  mimeType = mimeType.replace(/^(\u0020)+|(\u0020)+$/g, '');

	  // 7. If position is past the end of input, then
	  // return failure
	  if (position.position >= input.length) {
	    return 'failure'
	  }

	  // 8. Advance position by 1.
	  position.position++;

	  // 9. Let encodedBody be the remainder of input.
	  const encodedBody = input.slice(mimeTypeLength + 1);

	  // 10. Let body be the percent-decoding of encodedBody.
	  /** @type {Uint8Array|string} */
	  let body = stringPercentDecode(encodedBody);

	  // 11. If mimeType ends with U+003B (;), followed by
	  // zero or more U+0020 SPACE, followed by an ASCII
	  // case-insensitive match for "base64", then:
	  if (/;(\u0020){0,}base64$/i.test(mimeType)) {
	    // 1. Let stringBody be the isomorphic decode of body.
	    const stringBody = decodeURIComponent(new TextDecoder('utf-8').decode(body));
	    // 2. Set body to the forgiving-base64 decode of
	    // stringBody.
	    body = forgivingBase64(stringBody);

	    // 3. If body is failure, then return failure.
	    if (body === 'failure') {
	      return 'failure'
	    }

	    // 4. Remove the last 6 code points from mimeType.
	    mimeType = mimeType.slice(0, -6);

	    // 5. Remove trailing U+0020 SPACE code points from mimeType,
	    // if any.
	    mimeType = mimeType.replace(/(\u0020)+$/, '');

	    // 6. Remove the last U+003B (;) code point from mimeType.
	    mimeType = mimeType.slice(0, -1);
	  }

	  // 12. If mimeType starts with U+003B (;), then prepend
	  // "text/plain" to mimeType.
	  if (mimeType.startsWith(';')) {
	    mimeType = 'text/plain' + mimeType;
	  }

	  // 13. Let mimeTypeRecord be the result of parsing
	  // mimeType.
	  let mimeTypeRecord = parseMIMEType(mimeType);

	  // 14. If mimeTypeRecord is failure, then set
	  // mimeTypeRecord to text/plain;charset=US-ASCII.
	  if (mimeTypeRecord === 'failure') {
	    mimeTypeRecord = parseMIMEType('text/plain;charset=US-ASCII');
	  }

	  // 15. Return a new data: URL struct whose MIME
	  // type is mimeTypeRecord and body is body.
	  // https://fetch.spec.whatwg.org/#data-url-struct
	  return { mimeType: mimeTypeRecord, body }
	}

	// https://url.spec.whatwg.org/#concept-url-serializer
	/**
	 * @param {URL} url
	 * @param {boolean} excludeFragment
	 */
	function URLSerializer (url, excludeFragment = false) {
	  // 1. Let output be url’s scheme and U+003A (:) concatenated.
	  let output = url.protocol;

	  // 2. If url’s host is non-null:
	  if (url.host.length > 0) {
	    // 1. Append "//" to output.
	    output += '//';

	    // 2. If url includes credentials, then:
	    if (url.username.length > 0 || url.password.length > 0) {
	      // 1. Append url’s username to output.
	      output += url.username;

	      // 2. If url’s password is not the empty string, then append U+003A (:),
	      // followed by url’s password, to output.
	      if (url.password.length > 0) {
	        output += ':' + url.password;
	      }

	      // 3. Append U+0040 (@) to output.
	      output += '@';
	    }

	    // 3. Append url’s host, serialized, to output.
	    output += decodeURIComponent(url.host);

	    // 4. If url’s port is non-null, append U+003A (:) followed by url’s port,
	    // serialized, to output.
	    if (url.port.length > 0) {
	      output += ':' + url.port;
	    }
	  }

	  // 3. If url’s host is null, url does not have an opaque path,
	  // url’s path’s size is greater than 1, and url’s path[0]
	  // is the empty string, then append U+002F (/) followed by
	  // U+002E (.) to output.
	  // Note: This prevents web+demo:/.//not-a-host/ or web+demo:/path/..//not-a-host/,
	  // when parsed and then serialized, from ending up as web+demo://not-a-host/
	  // (they end up as web+demo:/.//not-a-host/).
	  // Undici implementation note: url's path[0] can never be an
	  // empty string, so we have to slightly alter what the spec says.
	  if (
	    url.host.length === 0 &&
	    url.pathname.length > 1 &&
	    url.href.slice(url.protocol.length + 1)[0] === '.'
	  ) {
	    output += '/.';
	  }

	  // 4. Append the result of URL path serializing url to output.
	  output += url.pathname;

	  // 5. If url’s query is non-null, append U+003F (?),
	  // followed by url’s query, to output.
	  if (url.search.length > 0) {
	    output += url.search;
	  }

	  // 6. If exclude fragment is false and url’s fragment is non-null,
	  // then append U+0023 (#), followed by url’s fragment, to output.
	  if (excludeFragment === false && url.hash.length > 0) {
	    output += url.hash;
	  }

	  // 7. Return output.
	  return output
	}

	// https://infra.spec.whatwg.org/#collect-a-sequence-of-code-points
	/**
	 * @param {(char: string) => boolean} condition
	 * @param {string} input
	 * @param {{ position: number }} position
	 */
	function collectASequenceOfCodePoints (condition, input, position) {
	  // 1. Let result be the empty string.
	  let result = '';

	  // 2. While position doesn’t point past the end of input and the
	  // code point at position within input meets the condition condition:
	  while (position.position < input.length && condition(input[position.position])) {
	    // 1. Append that code point to the end of result.
	    result += input[position.position];

	    // 2. Advance position by 1.
	    position.position++;
	  }

	  // 3. Return result.
	  return result
	}

	// https://url.spec.whatwg.org/#string-percent-decode
	/** @param {string} input */
	function stringPercentDecode (input) {
	  // 1. Let bytes be the UTF-8 encoding of input.
	  const bytes = encoder.encode(input);

	  // 2. Return the percent-decoding of bytes.
	  return percentDecode(bytes)
	}

	// https://url.spec.whatwg.org/#percent-decode
	/** @param {Uint8Array} input */
	function percentDecode (input) {
	  // 1. Let output be an empty byte sequence.
	  /** @type {number[]} */
	  const output = [];

	  // 2. For each byte byte in input:
	  for (let i = 0; i < input.length; i++) {
	    const byte = input[i];

	    // 1. If byte is not 0x25 (%), then append byte to output.
	    if (byte !== 0x25) {
	      output.push(byte);

	    // 2. Otherwise, if byte is 0x25 (%) and the next two bytes
	    // after byte in input are not in the ranges
	    // 0x30 (0) to 0x39 (9), 0x41 (A) to 0x46 (F),
	    // and 0x61 (a) to 0x66 (f), all inclusive, append byte
	    // to output.
	    } else if (
	      byte === 0x25 &&
	      !/^[0-9A-Fa-f]{2}$/i.test(String.fromCharCode(input[i + 1], input[i + 2]))
	    ) {
	      output.push(0x25);

	    // 3. Otherwise:
	    } else {
	      // 1. Let bytePoint be the two bytes after byte in input,
	      // decoded, and then interpreted as hexadecimal number.
	      const nextTwoBytes = String.fromCharCode(input[i + 1], input[i + 2]);
	      const bytePoint = Number.parseInt(nextTwoBytes, 16);

	      // 2. Append a byte whose value is bytePoint to output.
	      output.push(bytePoint);

	      // 3. Skip the next two bytes in input.
	      i += 2;
	    }
	  }

	  // 3. Return output.
	  return Uint8Array.from(output)
	}

	// https://mimesniff.spec.whatwg.org/#parse-a-mime-type
	/** @param {string} input */
	function parseMIMEType (input) {
	  // 1. Remove any leading and trailing HTTP whitespace
	  // from input.
	  input = input.trim();

	  // 2. Let position be a position variable for input,
	  // initially pointing at the start of input.
	  const position = { position: 0 };

	  // 3. Let type be the result of collecting a sequence
	  // of code points that are not U+002F (/) from
	  // input, given position.
	  const type = collectASequenceOfCodePoints(
	    (char) => char !== '/',
	    input,
	    position
	  );

	  // 4. If type is the empty string or does not solely
	  // contain HTTP token code points, then return failure.
	  // https://mimesniff.spec.whatwg.org/#http-token-code-point
	  if (type.length === 0 || !/^[!#$%&'*+-.^_|~A-z0-9]+$/.test(type)) {
	    return 'failure'
	  }

	  // 5. If position is past the end of input, then return
	  // failure
	  if (position.position > input.length) {
	    return 'failure'
	  }

	  // 6. Advance position by 1. (This skips past U+002F (/).)
	  position.position++;

	  // 7. Let subtype be the result of collecting a sequence of
	  // code points that are not U+003B (;) from input, given
	  // position.
	  let subtype = collectASequenceOfCodePoints(
	    (char) => char !== ';',
	    input,
	    position
	  );

	  // 8. Remove any trailing HTTP whitespace from subtype.
	  subtype = subtype.trim();

	  // 9. If subtype is the empty string or does not solely
	  // contain HTTP token code points, then return failure.
	  if (subtype.length === 0 || !/^[!#$%&'*+-.^_|~A-z0-9]+$/.test(subtype)) {
	    return 'failure'
	  }

	  // 10. Let mimeType be a new MIME type record whose type
	  // is type, in ASCII lowercase, and subtype is subtype,
	  // in ASCII lowercase.
	  // https://mimesniff.spec.whatwg.org/#mime-type
	  const mimeType = {
	    type: type.toLowerCase(),
	    subtype: subtype.toLowerCase(),
	    /** @type {Map<string, string>} */
	    parameters: new Map()
	  };

	  // 11. While position is not past the end of input:
	  while (position.position < input.length) {
	    // 1. Advance position by 1. (This skips past U+003B (;).)
	    position.position++;

	    // 2. Collect a sequence of code points that are HTTP
	    // whitespace from input given position.
	    collectASequenceOfCodePoints(
	      // https://fetch.spec.whatwg.org/#http-whitespace
	      (char) => /(\u000A|\u000D|\u0009|\u0020)/.test(char), // eslint-disable-line
	      input,
	      position
	    );

	    // 3. Let parameterName be the result of collecting a
	    // sequence of code points that are not U+003B (;)
	    // or U+003D (=) from input, given position.
	    let parameterName = collectASequenceOfCodePoints(
	      (char) => char !== ';' && char !== '=',
	      input,
	      position
	    );

	    // 4. Set parameterName to parameterName, in ASCII
	    // lowercase.
	    parameterName = parameterName.toLowerCase();

	    // 5. If position is not past the end of input, then:
	    if (position.position < input.length) {
	      // 1. If the code point at position within input is
	      // U+003B (;), then continue.
	      if (input[position.position] === ';') {
	        continue
	      }

	      // 2. Advance position by 1. (This skips past U+003D (=).)
	      position.position++;
	    }

	    // 6. If position is past the end of input, then break.
	    if (position.position > input.length) {
	      break
	    }

	    // 7. Let parameterValue be null.
	    let parameterValue = null;

	    // 8. If the code point at position within input is
	    // U+0022 ("), then:
	    if (input[position.position] === '"') {
	      // 1. Set parameterValue to the result of collecting
	      // an HTTP quoted string from input, given position
	      // and the extract-value flag.
	      parameterValue = collectAnHTTPQuotedString(input, position, true);

	      // 2. Collect a sequence of code points that are not
	      // U+003B (;) from input, given position.
	      collectASequenceOfCodePoints(
	        (char) => char !== ';',
	        input,
	        position
	      );

	    // 9. Otherwise:
	    } else {
	      // 1. Set parameterValue to the result of collecting
	      // a sequence of code points that are not U+003B (;)
	      // from input, given position.
	      parameterValue = collectASequenceOfCodePoints(
	        (char) => char !== ';',
	        input,
	        position
	      );

	      // 2. Remove any trailing HTTP whitespace from parameterValue.
	      // Note: it says "trailing" whitespace; leading is fine.
	      parameterValue = parameterValue.trimEnd();

	      // 3. If parameterValue is the empty string, then continue.
	      if (parameterValue.length === 0) {
	        continue
	      }
	    }

	    // 10. If all of the following are true
	    // - parameterName is not the empty string
	    // - parameterName solely contains HTTP token code points
	    // - parameterValue solely contains HTTP quoted-string token code points
	    // - mimeType’s parameters[parameterName] does not exist
	    // then set mimeType’s parameters[parameterName] to parameterValue.
	    if (
	      parameterName.length !== 0 &&
	      /^[!#$%&'*+-.^_|~A-z0-9]+$/.test(parameterName) &&
	      // https://mimesniff.spec.whatwg.org/#http-quoted-string-token-code-point
	      !/^(\u0009|\x{0020}-\x{007E}|\x{0080}-\x{00FF})+$/.test(parameterValue) &&  // eslint-disable-line
	      !mimeType.parameters.has(parameterName)
	    ) {
	      mimeType.parameters.set(parameterName, parameterValue);
	    }
	  }

	  // 12. Return mimeType.
	  return mimeType
	}

	// https://infra.spec.whatwg.org/#forgiving-base64-decode
	/** @param {string} data */
	function forgivingBase64 (data) {
	  // 1. Remove all ASCII whitespace from data.
	  data = data.replace(/[\u0009\u000A\u000C\u000D\u0020]/g, '');  // eslint-disable-line

	  // 2. If data’s code point length divides by 4 leaving
	  // no remainder, then:
	  if (data.length % 4 === 0) {
	    // 1. If data ends with one or two U+003D (=) code points,
	    // then remove them from data.
	    data = data.replace(/=?=$/, '');
	  }

	  // 3. If data’s code point length divides by 4 leaving
	  // a remainder of 1, then return failure.
	  if (data.length % 4 === 1) {
	    return 'failure'
	  }

	  // 4. If data contains a code point that is not one of
	  //  U+002B (+)
	  //  U+002F (/)
	  //  ASCII alphanumeric
	  // then return failure.
	  if (/[^+/0-9A-Za-z]/.test(data)) {
	    return 'failure'
	  }

	  const binary = atob(data);
	  const bytes = new Uint8Array(binary.length);

	  for (let byte = 0; byte < binary.length; byte++) {
	    bytes[byte] = binary.charCodeAt(byte);
	  }

	  return bytes
	}

	// https://fetch.spec.whatwg.org/#collect-an-http-quoted-string
	// tests: https://fetch.spec.whatwg.org/#example-http-quoted-string
	/**
	 * @param {string} input
	 * @param {{ position: number }} position
	 * @param {boolean?} extractValue
	 */
	function collectAnHTTPQuotedString (input, position, extractValue) {
	  // 1. Let positionStart be position.
	  const positionStart = position.position;

	  // 2. Let value be the empty string.
	  let value = '';

	  // 3. Assert: the code point at position within input
	  // is U+0022 (").
	  assert(input[position.position] === '"');

	  // 4. Advance position by 1.
	  position.position++;

	  // 5. While true:
	  while (true) {
	    // 1. Append the result of collecting a sequence of code points
	    // that are not U+0022 (") or U+005C (\) from input, given
	    // position, to value.
	    value += collectASequenceOfCodePoints(
	      (char) => char !== '"' && char !== '\\',
	      input,
	      position
	    );

	    // 2. If position is past the end of input, then break.
	    if (position.position >= input.length) {
	      break
	    }

	    // 3. Let quoteOrBackslash be the code point at position within
	    // input.
	    const quoteOrBackslash = input[position.position];

	    // 4. Advance position by 1.
	    position.position++;

	    // 5. If quoteOrBackslash is U+005C (\), then:
	    if (quoteOrBackslash === '\\') {
	      // 1. If position is past the end of input, then append
	      // U+005C (\) to value and break.
	      if (position.position >= input.length) {
	        value += '\\';
	        break
	      }

	      // 2. Append the code point at position within input to value.
	      value += input[position.position];

	      // 3. Advance position by 1.
	      position.position++;

	    // 6. Otherwise:
	    } else {
	      // 1. Assert: quoteOrBackslash is U+0022 (").
	      assert(quoteOrBackslash === '"');

	      // 2. Break.
	      break
	    }
	  }

	  // 6. If the extract-value flag is set, then return value.
	  if (extractValue) {
	    return value
	  }

	  // 7. Return the code points from positionStart to position,
	  // inclusive, within input.
	  return input.slice(positionStart, position.position)
	}

	/**
	 * @see https://mimesniff.spec.whatwg.org/#serialize-a-mime-type
	 */
	function serializeAMimeType (mimeType) {
	  assert(mimeType !== 'failure');
	  const { type, subtype, parameters } = mimeType;

	  // 1. Let serialization be the concatenation of mimeType’s
	  //    type, U+002F (/), and mimeType’s subtype.
	  let serialization = `${type}/${subtype}`;

	  // 2. For each name → value of mimeType’s parameters:
	  for (let [name, value] of parameters.entries()) {
	    // 1. Append U+003B (;) to serialization.
	    serialization += ';';

	    // 2. Append name to serialization.
	    serialization += name;

	    // 3. Append U+003D (=) to serialization.
	    serialization += '=';

	    // 4. If value does not solely contain HTTP token code
	    //    points or value is the empty string, then:
	    if (!isValidHTTPToken(value)) {
	      // 1. Precede each occurence of U+0022 (") or
	      //    U+005C (\) in value with U+005C (\).
	      value = value.replace(/(\\|")/g, '\\$1');

	      // 2. Prepend U+0022 (") to value.
	      value = '"' + value;

	      // 3. Append U+0022 (") to value.
	      value += '"';
	    }

	    // 5. Append value to serialization.
	    serialization += value;
	  }

	  // 3. Return serialization.
	  return serialization
	}

	dataURL = {
	  dataURLProcessor,
	  URLSerializer,
	  collectASequenceOfCodePoints,
	  stringPercentDecode,
	  parseMIMEType,
	  collectAnHTTPQuotedString,
	  serializeAMimeType
	};
	return dataURL;
}

var fetch_1;
var hasRequiredFetch;

function requireFetch () {
	if (hasRequiredFetch) return fetch_1;
	hasRequiredFetch = 1;

	const {
	  Response,
	  makeNetworkError,
	  makeAppropriateNetworkError,
	  filterResponse,
	  makeResponse
	} = requireResponse();
	const { Headers } = requireHeaders();
	const { Request, makeRequest } = requireRequest();
	const zlib = require$$3$1;
	const {
	  bytesMatch,
	  makePolicyContainer,
	  clonePolicyContainer,
	  requestBadPort,
	  TAOCheck,
	  appendRequestOriginHeader,
	  responseLocationURL,
	  requestCurrentURL,
	  setRequestReferrerPolicyOnRedirect,
	  tryUpgradeRequestToAPotentiallyTrustworthyURL,
	  createOpaqueTimingInfo,
	  appendFetchMetadata,
	  corsCheck,
	  crossOriginResourcePolicyCheck,
	  determineRequestsReferrer,
	  coarsenedSharedCurrentTime,
	  createDeferredPromise,
	  isBlobLike,
	  sameOrigin,
	  isCancelled,
	  isAborted,
	  isErrorLike,
	  fullyReadBody
	} = requireUtil();
	const { kState, kHeaders, kGuard, kRealm } = requireSymbols();
	const assert = require$$0$1;
	const { safelyExtractBody, extractBody } = requireBody();
	const {
	  redirectStatus,
	  nullBodyStatus,
	  safeMethods,
	  requestBodyHeader,
	  subresource,
	  DOMException
	} = requireConstants$1();
	const { kHeadersList } = symbols$1;
	const EE = require$$0$3;
	const { Readable, pipeline } = require$$0$2;
	const { isErrored, isReadable } = util$e;
	const { dataURLProcessor, serializeAMimeType } = requireDataURL();
	const { TransformStream } = require$$12;

	/** @type {import('buffer').resolveObjectURL} */
	let resolveObjectURL;
	let ReadableStream;

	const nodeVersion = process.versions.node.split('.');
	const nodeMajor = Number(nodeVersion[0]);
	const nodeMinor = Number(nodeVersion[1]);

	class Fetch extends EE {
	  constructor (dispatcher) {
	    super();

	    this.dispatcher = dispatcher;
	    this.connection = null;
	    this.dump = false;
	    this.state = 'ongoing';
	  }

	  terminate (reason) {
	    if (this.state !== 'ongoing') {
	      return
	    }

	    this.state = 'terminated';
	    this.connection?.destroy(reason);
	    this.emit('terminated', reason);
	  }

	  abort () {
	    if (this.state !== 'ongoing') {
	      return
	    }

	    const reason = new DOMException('The operation was aborted.', 'AbortError');

	    this.state = 'aborted';
	    this.connection?.destroy(reason);
	    this.emit('terminated', reason);
	  }
	}

	// https://fetch.spec.whatwg.org/#fetch-method
	async function fetch (input, init = {}) {
	  if (arguments.length < 1) {
	    throw new TypeError(
	      `Failed to execute 'fetch' on 'Window': 1 argument required, but only ${arguments.length} present.`
	    )
	  }

	  // 1. Let p be a new promise.
	  const p = createDeferredPromise();

	  // 2. Let requestObject be the result of invoking the initial value of
	  // Request as constructor with input and init as arguments. If this throws
	  // an exception, reject p with it and return p.
	  let requestObject;

	  try {
	    requestObject = new Request(input, init);
	  } catch (e) {
	    p.reject(e);
	    return p.promise
	  }

	  // 3. Let request be requestObject’s request.
	  const request = requestObject[kState];

	  // 4. If requestObject’s signal’s aborted flag is set, then:
	  if (requestObject.signal.aborted) {
	    // 1. Abort fetch with p, request, and null.
	    abortFetch(p, request, null);

	    // 2. Return p.
	    return p.promise
	  }

	  // 5. Let globalObject be request’s client’s global object.
	  const globalObject = request.client.globalObject;

	  // 6. If globalObject is a ServiceWorkerGlobalScope object, then set
	  // request’s service-workers mode to "none".
	  if (globalObject?.constructor?.name === 'ServiceWorkerGlobalScope') {
	    request.serviceWorkers = 'none';
	  }

	  // 7. Let responseObject be null.
	  let responseObject = null;

	  // 8. Let relevantRealm be this’s relevant Realm.
	  const relevantRealm = null;

	  // 9. Let locallyAborted be false.
	  let locallyAborted = false;

	  // 10. Let controller be null.
	  let controller = null;

	  // 11. Add the following abort steps to requestObject’s signal:
	  requestObject.signal.addEventListener(
	    'abort',
	    () => {
	      // 1. Set locallyAborted to true.
	      locallyAborted = true;

	      // 2. Abort fetch with p, request, and responseObject.
	      abortFetch(p, request, responseObject);

	      // 3. If controller is not null, then abort controller.
	      if (controller != null) {
	        controller.abort();
	      }
	    },
	    { once: true }
	  );

	  // 12. Let handleFetchDone given response response be to finalize and
	  // report timing with response, globalObject, and "fetch".
	  const handleFetchDone = (response) =>
	    finalizeAndReportTiming(response, 'fetch');

	  // 13. Set controller to the result of calling fetch given request,
	  // with processResponseEndOfBody set to handleFetchDone, and processResponse
	  // given response being these substeps:

	  const processResponse = (response) => {
	    // 1. If locallyAborted is true, terminate these substeps.
	    if (locallyAborted) {
	      return
	    }

	    // 2. If response’s aborted flag is set, then abort fetch with p,
	    // request, and responseObject, and terminate these substeps.
	    if (response.aborted) {
	      abortFetch(p, request, responseObject);
	      return
	    }

	    // 3. If response is a network error, then reject p with a TypeError
	    // and terminate these substeps.
	    if (response.type === 'error') {
	      p.reject(
	        Object.assign(new TypeError('fetch failed'), { cause: response.error })
	      );
	      return
	    }

	    // 4. Set responseObject to the result of creating a Response object,
	    // given response, "immutable", and relevantRealm.
	    responseObject = new Response();
	    responseObject[kState] = response;
	    responseObject[kRealm] = relevantRealm;
	    responseObject[kHeaders][kHeadersList] = response.headersList;
	    responseObject[kHeaders][kGuard] = 'immutable';
	    responseObject[kHeaders][kRealm] = relevantRealm;

	    // 5. Resolve p with responseObject.
	    p.resolve(responseObject);
	  };

	  controller = fetching({
	    request,
	    processResponseEndOfBody: handleFetchDone,
	    processResponse,
	    dispatcher: this // undici
	  });

	  // 14. Return p.
	  return p.promise
	}

	// https://fetch.spec.whatwg.org/#finalize-and-report-timing
	function finalizeAndReportTiming (response, initiatorType = 'other') {
	  // 1. If response is an aborted network error, then return.
	  if (response.type === 'error' && response.aborted) {
	    return
	  }

	  // 2. If response’s URL list is null or empty, then return.
	  if (!response.urlList?.length) {
	    return
	  }

	  // 3. Let originalURL be response’s URL list[0].
	  const originalURL = response.urlList[0];

	  // 4. Let timingInfo be response’s timing info.
	  let timingInfo = response.timingInfo;

	  // 5. Let cacheState be response’s cache state.
	  let cacheState = response.cacheState;

	  // 6. If originalURL’s scheme is not an HTTP(S) scheme, then return.
	  if (!/^https?:/.test(originalURL.protocol)) {
	    return
	  }

	  // 7. If timingInfo is null, then return.
	  if (timingInfo === null) {
	    return
	  }

	  // 8. If response’s timing allow passed flag is not set, then:
	  if (!timingInfo.timingAllowPassed) {
	    //  1. Set timingInfo to a the result of creating an opaque timing info for timingInfo.
	    timingInfo = createOpaqueTimingInfo({
	      startTime: timingInfo.startTime
	    });

	    //  2. Set cacheState to the empty string.
	    cacheState = '';
	  }

	  // 9. Set timingInfo’s end time to the coarsened shared current time
	  // given global’s relevant settings object’s cross-origin isolated
	  // capability.
	  // TODO: given global’s relevant settings object’s cross-origin isolated
	  // capability?
	  response.timingInfo.endTime = coarsenedSharedCurrentTime();

	  // 10. Set response’s timing info to timingInfo.
	  response.timingInfo = timingInfo;

	  // 11. Mark resource timing for timingInfo, originalURL, initiatorType,
	  // global, and cacheState.
	  markResourceTiming(
	    timingInfo,
	    originalURL,
	    initiatorType,
	    globalThis,
	    cacheState
	  );
	}

	// https://w3c.github.io/resource-timing/#dfn-mark-resource-timing
	function markResourceTiming (timingInfo, originalURL, initiatorType, globalThis, cacheState) {
	  if (nodeMajor >= 18 && nodeMinor >= 2) {
	    performance.markResourceTiming(timingInfo, originalURL, initiatorType, globalThis, cacheState);
	  }
	}

	// https://fetch.spec.whatwg.org/#abort-fetch
	function abortFetch (p, request, responseObject) {
	  // 1. Let error be an "AbortError" DOMException.
	  const error = new DOMException('The operation was aborted.', 'AbortError');

	  // 2. Reject promise with error.
	  p.reject(error);

	  // 3. If request’s body is not null and is readable, then cancel request’s
	  // body with error.
	  if (request.body != null && isReadable(request.body?.stream)) {
	    request.body.stream.cancel(error).catch((err) => {
	      if (err.code === 'ERR_INVALID_STATE') {
	        // Node bug?
	        return
	      }
	      throw err
	    });
	  }

	  // 4. If responseObject is null, then return.
	  if (responseObject == null) {
	    return
	  }

	  // 5. Let response be responseObject’s response.
	  const response = responseObject[kState];

	  // 6. If response’s body is not null and is readable, then error response’s
	  // body with error.
	  if (response.body != null && isReadable(response.body?.stream)) {
	    response.body.stream.cancel(error).catch((err) => {
	      if (err.code === 'ERR_INVALID_STATE') {
	        // Node bug?
	        return
	      }
	      throw err
	    });
	  }
	}

	// https://fetch.spec.whatwg.org/#fetching
	function fetching ({
	  request,
	  processRequestBodyChunkLength,
	  processRequestEndOfBody,
	  processResponse,
	  processResponseEndOfBody,
	  processResponseConsumeBody,
	  useParallelQueue = false,
	  dispatcher // undici
	}) {
	  // 1. Let taskDestination be null.
	  let taskDestination = null;

	  // 2. Let crossOriginIsolatedCapability be false.
	  let crossOriginIsolatedCapability = false;

	  // 3. If request’s client is non-null, then:
	  if (request.client != null) {
	    // 1. Set taskDestination to request’s client’s global object.
	    taskDestination = request.client.globalObject;

	    // 2. Set crossOriginIsolatedCapability to request’s client’s cross-origin
	    // isolated capability.
	    crossOriginIsolatedCapability =
	      request.client.crossOriginIsolatedCapability;
	  }

	  // 4. If useParallelQueue is true, then set taskDestination to the result of
	  // starting a new parallel queue.
	  // TODO

	  // 5. Let timingInfo be a new fetch timing info whose start time and
	  // post-redirect start time are the coarsened shared current time given
	  // crossOriginIsolatedCapability.
	  const currenTime = coarsenedSharedCurrentTime(crossOriginIsolatedCapability);
	  const timingInfo = createOpaqueTimingInfo({
	    startTime: currenTime
	  });

	  // 6. Let fetchParams be a new fetch params whose
	  // request is request,
	  // timing info is timingInfo,
	  // process request body chunk length is processRequestBodyChunkLength,
	  // process request end-of-body is processRequestEndOfBody,
	  // process response is processResponse,
	  // process response consume body is processResponseConsumeBody,
	  // process response end-of-body is processResponseEndOfBody,
	  // task destination is taskDestination,
	  // and cross-origin isolated capability is crossOriginIsolatedCapability.
	  const fetchParams = {
	    controller: new Fetch(dispatcher),
	    request,
	    timingInfo,
	    processRequestBodyChunkLength,
	    processRequestEndOfBody,
	    processResponse,
	    processResponseConsumeBody,
	    processResponseEndOfBody,
	    taskDestination,
	    crossOriginIsolatedCapability
	  };

	  // 7. If request’s body is a byte sequence, then set request’s body to the
	  // first return value of safely extracting request’s body.
	  // NOTE: Since fetching is only called from fetch, body should already be
	  // extracted.
	  assert(!request.body || request.body.stream);

	  // 8. If request’s window is "client", then set request’s window to request’s
	  // client, if request’s client’s global object is a Window object; otherwise
	  // "no-window".
	  if (request.window === 'client') {
	    // TODO: What if request.client is null?
	    request.window =
	      request.client?.globalObject?.constructor?.name === 'Window'
	        ? request.client
	        : 'no-window';
	  }

	  // 9. If request’s origin is "client", then set request’s origin to request’s
	  // client’s origin.
	  if (request.origin === 'client') {
	    // TODO: What if request.client is null?
	    request.origin = request.client?.origin;
	  }

	  // 10. If all of the following conditions are true:
	  // TODO

	  // 11. If request’s policy container is "client", then:
	  if (request.policyContainer === 'client') {
	    // 1. If request’s client is non-null, then set request’s policy
	    // container to a clone of request’s client’s policy container. [HTML]
	    if (request.client != null) {
	      request.policyContainer = clonePolicyContainer(
	        request.client.policyContainer
	      );
	    } else {
	      // 2. Otherwise, set request’s policy container to a new policy
	      // container.
	      request.policyContainer = makePolicyContainer();
	    }
	  }

	  // 12. If request’s header list does not contain `Accept`, then:
	  if (!request.headersList.has('accept')) {
	    // 1. Let value be `*/*`.
	    const value = '*/*';

	    // 2. A user agent should set value to the first matching statement, if
	    // any, switching on request’s destination:
	    // "document"
	    // "frame"
	    // "iframe"
	    // `text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8`
	    // "image"
	    // `image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5`
	    // "style"
	    // `text/css,*/*;q=0.1`
	    // TODO

	    // 3. Append `Accept`/value to request’s header list.
	    request.headersList.append('accept', value);
	  }

	  // 13. If request’s header list does not contain `Accept-Language`, then
	  // user agents should append `Accept-Language`/an appropriate value to
	  // request’s header list.
	  if (!request.headersList.has('accept-language')) {
	    request.headersList.append('accept-language', '*');
	  }

	  // 14. If request’s priority is null, then use request’s initiator and
	  // destination appropriately in setting request’s priority to a
	  // user-agent-defined object.
	  if (request.priority === null) ;

	  // 15. If request is a subresource request, then:
	  if (subresource.includes(request.destination)) ;

	  // 16. Run main fetch given fetchParams.
	  mainFetch(fetchParams)
	    .catch(err => {
	      fetchParams.controller.terminate(err);
	    });

	  // 17. Return fetchParam's controller
	  return fetchParams.controller
	}

	// https://fetch.spec.whatwg.org/#concept-main-fetch
	async function mainFetch (fetchParams, recursive = false) {
	  // 1. Let request be fetchParams’s request.
	  const request = fetchParams.request;

	  // 2. Let response be null.
	  let response = null;

	  // 3. If request’s local-URLs-only flag is set and request’s current URL is
	  // not local, then set response to a network error.
	  if (
	    request.localURLsOnly &&
	    !/^(about|blob|data):/.test(requestCurrentURL(request).protocol)
	  ) {
	    response = makeNetworkError('local URLs only');
	  }

	  // 4. Run report Content Security Policy violations for request.
	  // TODO

	  // 5. Upgrade request to a potentially trustworthy URL, if appropriate.
	  tryUpgradeRequestToAPotentiallyTrustworthyURL(request);

	  // 6. If should request be blocked due to a bad port, should fetching request
	  // be blocked as mixed content, or should request be blocked by Content
	  // Security Policy returns blocked, then set response to a network error.
	  if (requestBadPort(request) === 'blocked') {
	    response = makeNetworkError('bad port');
	  }
	  // TODO: should fetching request be blocked as mixed content?
	  // TODO: should request be blocked by Content Security Policy?

	  // 7. If request’s referrer policy is the empty string, then set request’s
	  // referrer policy to request’s policy container’s referrer policy.
	  if (request.referrerPolicy === '') {
	    request.referrerPolicy = request.policyContainer.referrerPolicy;
	  }

	  // 8. If request’s referrer is not "no-referrer", then set request’s
	  // referrer to the result of invoking determine request’s referrer.
	  if (request.referrer !== 'no-referrer') {
	    request.referrer = determineRequestsReferrer(request);
	  }

	  // 9. Set request’s current URL’s scheme to "https" if all of the following
	  // conditions are true:
	  // - request’s current URL’s scheme is "http"
	  // - request’s current URL’s host is a domain
	  // - Matching request’s current URL’s host per Known HSTS Host Domain Name
	  //   Matching results in either a superdomain match with an asserted
	  //   includeSubDomains directive or a congruent match (with or without an
	  //   asserted includeSubDomains directive). [HSTS]
	  // TODO

	  // 10. If recursive is false, then run the remaining steps in parallel.
	  // TODO

	  // 11. If response is null, then set response to the result of running
	  // the steps corresponding to the first matching statement:
	  if (response === null) {
	    response = await (async () => {
	      const currentURL = requestCurrentURL(request);

	      if (
	        // - request’s current URL’s origin is same origin with request’s origin,
	        //   and request’s response tainting is "basic"
	        (sameOrigin(currentURL, request.url) && request.responseTainting === 'basic') ||
	        // request’s current URL’s scheme is "data"
	        (currentURL.protocol === 'data:') ||
	        // - request’s mode is "navigate" or "websocket"
	        (request.mode === 'navigate' || request.mode === 'websocket')
	      ) {
	        // 1. Set request’s response tainting to "basic".
	        request.responseTainting = 'basic';

	        // 2. Return the result of running scheme fetch given fetchParams.
	        return await schemeFetch(fetchParams)
	      }

	      // request’s mode is "same-origin"
	      if (request.mode === 'same-origin') {
	        // 1. Return a network error.
	        return makeNetworkError('request mode cannot be "same-origin"')
	      }

	      // request’s mode is "no-cors"
	      if (request.mode === 'no-cors') {
	        // 1. If request’s redirect mode is not "follow", then return a network
	        // error.
	        if (request.redirect !== 'follow') {
	          return makeNetworkError(
	            'redirect mode cannot be "follow" for "no-cors" request'
	          )
	        }

	        // 2. Set request’s response tainting to "opaque".
	        request.responseTainting = 'opaque';

	        // 3. Return the result of running scheme fetch given fetchParams.
	        return await schemeFetch(fetchParams)
	      }

	      // request’s current URL’s scheme is not an HTTP(S) scheme
	      if (!/^https?:/.test(requestCurrentURL(request).protocol)) {
	        // Return a network error.
	        return makeNetworkError('URL scheme must be a HTTP(S) scheme')
	      }

	      // - request’s use-CORS-preflight flag is set
	      // - request’s unsafe-request flag is set and either request’s method is
	      //   not a CORS-safelisted method or CORS-unsafe request-header names with
	      //   request’s header list is not empty
	      //    1. Set request’s response tainting to "cors".
	      //    2. Let corsWithPreflightResponse be the result of running HTTP fetch
	      //    given fetchParams and true.
	      //    3. If corsWithPreflightResponse is a network error, then clear cache
	      //    entries using request.
	      //    4. Return corsWithPreflightResponse.
	      // TODO

	      // Otherwise
	      //    1. Set request’s response tainting to "cors".
	      request.responseTainting = 'cors';

	      //    2. Return the result of running HTTP fetch given fetchParams.
	      return await httpFetch(fetchParams)
	    })();
	  }

	  // 12. If recursive is true, then return response.
	  if (recursive) {
	    return response
	  }

	  // 13. If response is not a network error and response is not a filtered
	  // response, then:
	  if (response.status !== 0 && !response.internalResponse) {
	    // If request’s response tainting is "cors", then:
	    if (request.responseTainting === 'cors') ;

	    // Set response to the following filtered response with response as its
	    // internal response, depending on request’s response tainting:
	    if (request.responseTainting === 'basic') {
	      response = filterResponse(response, 'basic');
	    } else if (request.responseTainting === 'cors') {
	      response = filterResponse(response, 'cors');
	    } else if (request.responseTainting === 'opaque') {
	      response = filterResponse(response, 'opaque');
	    } else {
	      assert(false);
	    }
	  }

	  // 14. Let internalResponse be response, if response is a network error,
	  // and response’s internal response otherwise.
	  let internalResponse =
	    response.status === 0 ? response : response.internalResponse;

	  // 15. If internalResponse’s URL list is empty, then set it to a clone of
	  // request’s URL list.
	  if (internalResponse.urlList.length === 0) {
	    internalResponse.urlList.push(...request.urlList);
	  }

	  // 16. If request’s timing allow failed flag is unset, then set
	  // internalResponse’s timing allow passed flag.
	  if (!request.timingAllowFailed) {
	    response.timingAllowPassed = true;
	  }

	  // 17. If response is not a network error and any of the following returns
	  // blocked
	  // - should internalResponse to request be blocked as mixed content
	  // - should internalResponse to request be blocked by Content Security Policy
	  // - should internalResponse to request be blocked due to its MIME type
	  // - should internalResponse to request be blocked due to nosniff
	  // TODO

	  // 18. If response’s type is "opaque", internalResponse’s status is 206,
	  // internalResponse’s range-requested flag is set, and request’s header
	  // list does not contain `Range`, then set response and internalResponse
	  // to a network error.
	  if (
	    response.type === 'opaque' &&
	    internalResponse.status === 206 &&
	    internalResponse.rangeRequested &&
	    !request.headers.has('range')
	  ) {
	    response = internalResponse = makeNetworkError();
	  }

	  // 19. If response is not a network error and either request’s method is
	  // `HEAD` or `CONNECT`, or internalResponse’s status is a null body status,
	  // set internalResponse’s body to null and disregard any enqueuing toward
	  // it (if any).
	  if (
	    response.status !== 0 &&
	    (request.method === 'HEAD' ||
	      request.method === 'CONNECT' ||
	      nullBodyStatus.includes(internalResponse.status))
	  ) {
	    internalResponse.body = null;
	    fetchParams.controller.dump = true;
	  }

	  // 20. If request’s integrity metadata is not the empty string, then:
	  if (request.integrity) {
	    // 1. Let processBodyError be this step: run fetch finale given fetchParams
	    // and a network error.
	    const processBodyError = (reason) =>
	      fetchFinale(fetchParams, makeNetworkError(reason));

	    // 2. If request’s response tainting is "opaque", or response’s body is null,
	    // then run processBodyError and abort these steps.
	    if (request.responseTainting === 'opaque' || response.body == null) {
	      processBodyError(response.error);
	      return
	    }

	    // 3. Let processBody given bytes be these steps:
	    const processBody = (bytes) => {
	      // 1. If bytes do not match request’s integrity metadata,
	      // then run processBodyError and abort these steps. [SRI]
	      if (!bytesMatch(bytes, request.integrity)) {
	        processBodyError('integrity mismatch');
	        return
	      }

	      // 2. Set response’s body to the first return value of safely
	      // extracting bytes.
	      response.body = safelyExtractBody(bytes)[0];

	      // 3. Run fetch finale given fetchParams and response.
	      fetchFinale(fetchParams, response);
	    };

	    // 4. Fully read response’s body given processBody and processBodyError.
	    await fullyReadBody(response.body, processBody, processBodyError);
	  } else {
	    // 21. Otherwise, run fetch finale given fetchParams and response.
	    fetchFinale(fetchParams, response);
	  }
	}

	// https://fetch.spec.whatwg.org/#concept-scheme-fetch
	// given a fetch params fetchParams
	async function schemeFetch (fetchParams) {
	  // let request be fetchParams’s request
	  const { request } = fetchParams;

	  const {
	    protocol: scheme,
	    pathname: path
	  } = requestCurrentURL(request);

	  // switch on request’s current URL’s scheme, and run the associated steps:
	  switch (scheme) {
	    case 'about:': {
	      // If request’s current URL’s path is the string "blank", then return a new response
	      // whose status message is `OK`, header list is « (`Content-Type`, `text/html;charset=utf-8`) »,
	      // and body is the empty byte sequence.
	      if (path === 'blank') {
	        const resp = makeResponse({
	          statusText: 'OK',
	          headersList: [
	            ['content-type', 'text/html;charset=utf-8']
	          ]
	        });

	        resp.urlList = [new URL('about:blank')];
	        return resp
	      }

	      // Otherwise, return a network error.
	      return makeNetworkError('invalid path called')
	    }
	    case 'blob:': {
	      resolveObjectURL = resolveObjectURL || require$$6.resolveObjectURL;

	      // 1. Run these steps, but abort when the ongoing fetch is terminated:
	      //    1. Let blob be request’s current URL’s blob URL entry’s object.
	      //       https://w3c.github.io/FileAPI/#blob-url-entry
	      //       P.S. Thank God this method is available in node.
	      const currentURL = requestCurrentURL(request);

	      // https://github.com/web-platform-tests/wpt/blob/7b0ebaccc62b566a1965396e5be7bb2bc06f841f/FileAPI/url/resources/fetch-tests.js#L52-L56
	      // Buffer.resolveObjectURL does not ignore URL queries.
	      if (currentURL.search.length !== 0) {
	        return makeNetworkError('NetworkError when attempting to fetch resource.')
	      }

	      const blob = resolveObjectURL(currentURL.toString());

	      //    2. If request’s method is not `GET` or blob is not a Blob object, then return a network error. [FILEAPI]
	      if (request.method !== 'GET' || !isBlobLike(blob)) {
	        return makeNetworkError('invalid method')
	      }

	      //    3. Let response be a new response whose status message is `OK`.
	      const response = makeResponse({ statusText: 'OK', urlList: [currentURL] });

	      //    4. Append (`Content-Length`, blob’s size attribute value) to response’s header list.
	      response.headersList.set('content-length', `${blob.size}`);

	      //    5. Append (`Content-Type`, blob’s type attribute value) to response’s header list.
	      response.headersList.set('content-type', blob.type);

	      //    6. Set response’s body to the result of performing the read operation on blob.
	      // TODO (fix): This needs to read?
	      response.body = extractBody(blob)[0];

	      //    7. Return response.
	      return response

	      // 2. If aborted, then return the appropriate network error for fetchParams.
	      // TODO
	    }
	    case 'data:': {
	      // 1. Let dataURLStruct be the result of running the
	      //    data: URL processor on request’s current URL.
	      const currentURL = requestCurrentURL(request);
	      const dataURLStruct = dataURLProcessor(currentURL);

	      // 2. If dataURLStruct is failure, then return a
	      //    network error.
	      if (dataURLStruct === 'failure') {
	        return makeNetworkError('failed to fetch the data URL')
	      }

	      // 3. Let mimeType be dataURLStruct’s MIME type, serialized.
	      const mimeType = serializeAMimeType(dataURLStruct.mimeType);

	      // 4. Return a response whose status message is `OK`,
	      //    header list is « (`Content-Type`, mimeType) »,
	      //    and body is dataURLStruct’s body.
	      return makeResponse({
	        statusText: 'OK',
	        headersList: [
	          ['content-type', mimeType]
	        ],
	        body: extractBody(dataURLStruct.body)[0]
	      })
	    }
	    case 'file:': {
	      // For now, unfortunate as it is, file URLs are left as an exercise for the reader.
	      // When in doubt, return a network error.
	      return makeNetworkError('not implemented... yet...')
	    }
	    case 'http:':
	    case 'https:': {
	      // Return the result of running HTTP fetch given fetchParams.

	      return await httpFetch(fetchParams)
	        .catch((err) => makeNetworkError(err))
	    }
	    default: {
	      return makeNetworkError('unknown scheme')
	    }
	  }
	}

	// https://fetch.spec.whatwg.org/#finalize-response
	function finalizeResponse (fetchParams, response) {
	  // 1. Set fetchParams’s request’s done flag.
	  fetchParams.request.done = true;

	  // 2, If fetchParams’s process response done is not null, then queue a fetch
	  // task to run fetchParams’s process response done given response, with
	  // fetchParams’s task destination.
	  if (fetchParams.processResponseDone != null) {
	    queueMicrotask(() => fetchParams.processResponseDone(response));
	  }
	}

	// https://fetch.spec.whatwg.org/#fetch-finale
	async function fetchFinale (fetchParams, response) {
	  // 1. If response is a network error, then:
	  if (response.type === 'error') {
	    // 1. Set response’s URL list to « fetchParams’s request’s URL list[0] ».
	    response.urlList = [fetchParams.request.urlList[0]];

	    // 2. Set response’s timing info to the result of creating an opaque timing
	    // info for fetchParams’s timing info.
	    response.timingInfo = createOpaqueTimingInfo({
	      startTime: fetchParams.timingInfo.startTime
	    });
	  }

	  // 2. Let processResponseEndOfBody be the following steps:
	  const processResponseEndOfBody = () => {
	    // 1. Set fetchParams’s request’s done flag.
	    fetchParams.request.done = true;

	    // If fetchParams’s process response end-of-body is not null,
	    // then queue a fetch task to run fetchParams’s process response
	    // end-of-body given response with fetchParams’s task destination.
	    if (fetchParams.processResponseEndOfBody != null) {
	      queueMicrotask(() => fetchParams.processResponseEndOfBody(response));
	    }
	  };

	  // 3. If fetchParams’s process response is non-null, then queue a fetch task
	  // to run fetchParams’s process response given response, with fetchParams’s
	  // task destination.
	  if (fetchParams.processResponse != null) {
	    queueMicrotask(() => fetchParams.processResponse(response));
	  }

	  // 4. If response’s body is null, then run processResponseEndOfBody.
	  if (response.body == null) {
	    processResponseEndOfBody();
	  } else {
	  // 5. Otherwise:

	    // 1. Let transformStream be a new a TransformStream.

	    // 2. Let identityTransformAlgorithm be an algorithm which, given chunk,
	    // enqueues chunk in transformStream.
	    const identityTransformAlgorithm = (chunk, controller) => {
	      controller.enqueue(chunk);
	    };

	    // 3. Set up transformStream with transformAlgorithm set to identityTransformAlgorithm
	    // and flushAlgorithm set to processResponseEndOfBody.
	    const transformStream = new TransformStream({
	      start () {},
	      transform: identityTransformAlgorithm,
	      flush: processResponseEndOfBody
	    });

	    // 4. Set response’s body to the result of piping response’s body through transformStream.
	    response.body = { stream: response.body.stream.pipeThrough(transformStream) };
	  }

	  // 6. If fetchParams’s process response consume body is non-null, then:
	  if (fetchParams.processResponseConsumeBody != null) {
	    // 1. Let processBody given nullOrBytes be this step: run fetchParams’s
	    // process response consume body given response and nullOrBytes.
	    const processBody = (nullOrBytes) => fetchParams.processResponseConsumeBody(response, nullOrBytes);

	    // 2. Let processBodyError be this step: run fetchParams’s process
	    // response consume body given response and failure.
	    const processBodyError = (failure) => fetchParams.processResponseConsumeBody(response, failure);

	    // 3. If response’s body is null, then queue a fetch task to run processBody
	    // given null, with fetchParams’s task destination.
	    if (response.body == null) {
	      queueMicrotask(() => processBody(null));
	    } else {
	      // 4. Otherwise, fully read response’s body given processBody, processBodyError,
	      // and fetchParams’s task destination.
	      await fullyReadBody(response.body, processBody, processBodyError);
	    }
	  }
	}

	// https://fetch.spec.whatwg.org/#http-fetch
	async function httpFetch (fetchParams) {
	  // 1. Let request be fetchParams’s request.
	  const request = fetchParams.request;

	  // 2. Let response be null.
	  let response = null;

	  // 3. Let actualResponse be null.
	  let actualResponse = null;

	  // 4. Let timingInfo be fetchParams’s timing info.
	  const timingInfo = fetchParams.timingInfo;

	  // 5. If request’s service-workers mode is "all", then:
	  if (request.serviceWorkers === 'all') ;

	  // 6. If response is null, then:
	  if (response === null) {
	    // 1. If makeCORSPreflight is true and one of these conditions is true:
	    // TODO

	    // 2. If request’s redirect mode is "follow", then set request’s
	    // service-workers mode to "none".
	    if (request.redirect === 'follow') {
	      request.serviceWorkers = 'none';
	    }

	    // 3. Set response and actualResponse to the result of running
	    // HTTP-network-or-cache fetch given fetchParams.
	    actualResponse = response = await httpNetworkOrCacheFetch(fetchParams);

	    // 4. If request’s response tainting is "cors" and a CORS check
	    // for request and response returns failure, then return a network error.
	    if (
	      request.responseTainting === 'cors' &&
	      corsCheck(request, response) === 'failure'
	    ) {
	      return makeNetworkError('cors failure')
	    }

	    // 5. If the TAO check for request and response returns failure, then set
	    // request’s timing allow failed flag.
	    if (TAOCheck(request, response) === 'failure') {
	      request.timingAllowFailed = true;
	    }
	  }

	  // 7. If either request’s response tainting or response’s type
	  // is "opaque", and the cross-origin resource policy check with
	  // request’s origin, request’s client, request’s destination,
	  // and actualResponse returns blocked, then return a network error.
	  if (
	    (request.responseTainting === 'opaque' || response.type === 'opaque') &&
	    crossOriginResourcePolicyCheck(
	      request.origin,
	      request.client,
	      request.destination,
	      actualResponse
	    ) === 'blocked'
	  ) {
	    return makeNetworkError('blocked')
	  }

	  // 8. If actualResponse’s status is a redirect status, then:
	  if (redirectStatus.includes(actualResponse.status)) {
	    // 1. If actualResponse’s status is not 303, request’s body is not null,
	    // and the connection uses HTTP/2, then user agents may, and are even
	    // encouraged to, transmit an RST_STREAM frame.
	    // See, https://github.com/whatwg/fetch/issues/1288
	    if (request.redirect !== 'manual') {
	      fetchParams.controller.connection.destroy();
	    }

	    // 2. Switch on request’s redirect mode:
	    if (request.redirect === 'error') {
	      // Set response to a network error.
	      response = makeNetworkError('unexpected redirect');
	    } else if (request.redirect === 'manual') {
	      // Set response to an opaque-redirect filtered response whose internal
	      // response is actualResponse.
	      // NOTE(spec): On the web this would return an `opaqueredirect` response,
	      // but that doesn't make sense server side.
	      // See https://github.com/nodejs/undici/issues/1193.
	      response = actualResponse;
	    } else if (request.redirect === 'follow') {
	      // Set response to the result of running HTTP-redirect fetch given
	      // fetchParams and response.
	      response = await httpRedirectFetch(fetchParams, response);
	    } else {
	      assert(false);
	    }
	  }

	  // 9. Set response’s timing info to timingInfo.
	  response.timingInfo = timingInfo;

	  // 10. Return response.
	  return response
	}

	// https://fetch.spec.whatwg.org/#http-redirect-fetch
	async function httpRedirectFetch (fetchParams, response) {
	  // 1. Let request be fetchParams’s request.
	  const request = fetchParams.request;

	  // 2. Let actualResponse be response, if response is not a filtered response,
	  // and response’s internal response otherwise.
	  const actualResponse = response.internalResponse
	    ? response.internalResponse
	    : response;

	  // 3. Let locationURL be actualResponse’s location URL given request’s current
	  // URL’s fragment.
	  let locationURL;

	  try {
	    locationURL = responseLocationURL(
	      actualResponse,
	      requestCurrentURL(request).hash
	    );

	    // 4. If locationURL is null, then return response.
	    if (locationURL == null) {
	      return response
	    }
	  } catch (err) {
	    // 5. If locationURL is failure, then return a network error.
	    return makeNetworkError(err)
	  }

	  // 6. If locationURL’s scheme is not an HTTP(S) scheme, then return a network
	  // error.
	  if (!/^https?:/.test(locationURL.protocol)) {
	    return makeNetworkError('URL scheme must be a HTTP(S) scheme')
	  }

	  // 7. If request’s redirect count is twenty, return a network error.
	  if (request.redirectCount === 20) {
	    return makeNetworkError('redirect count exceeded')
	  }

	  // 8. Increase request’s redirect count by one.
	  request.redirectCount += 1;

	  // 9. If request’s mode is "cors", locationURL includes credentials, and
	  // request’s origin is not same origin with locationURL’s origin, then return
	  //  a network error.
	  if (
	    request.mode === 'cors' &&
	    (locationURL.username || locationURL.password) &&
	    !sameOrigin(request, locationURL)
	  ) {
	    return makeNetworkError('cross origin not allowed for request mode "cors"')
	  }

	  // 10. If request’s response tainting is "cors" and locationURL includes
	  // credentials, then return a network error.
	  if (
	    request.responseTainting === 'cors' &&
	    (locationURL.username || locationURL.password)
	  ) {
	    return makeNetworkError(
	      'URL cannot contain credentials for request mode "cors"'
	    )
	  }

	  // 11. If actualResponse’s status is not 303, request’s body is non-null,
	  // and request’s body’s source is null, then return a network error.
	  if (
	    actualResponse.status !== 303 &&
	    request.body != null &&
	    request.body.source == null
	  ) {
	    return makeNetworkError()
	  }

	  // 12. If one of the following is true
	  // - actualResponse’s status is 301 or 302 and request’s method is `POST`
	  // - actualResponse’s status is 303 and request’s method is not `GET` or `HEAD`
	  if (
	    ([301, 302].includes(actualResponse.status) && request.method === 'POST') ||
	    (actualResponse.status === 303 &&
	      !['GET', 'HEAD'].includes(request.method))
	  ) {
	    // then:
	    // 1. Set request’s method to `GET` and request’s body to null.
	    request.method = 'GET';
	    request.body = null;

	    // 2. For each headerName of request-body-header name, delete headerName from
	    // request’s header list.
	    for (const headerName of requestBodyHeader) {
	      request.headersList.delete(headerName);
	    }
	  }

	  // 13. If request’s body is non-null, then set request’s body to the first return
	  // value of safely extracting request’s body’s source.
	  if (request.body != null) {
	    assert(request.body.source);
	    request.body = safelyExtractBody(request.body.source)[0];
	  }

	  // 14. Let timingInfo be fetchParams’s timing info.
	  const timingInfo = fetchParams.timingInfo;

	  // 15. Set timingInfo’s redirect end time and post-redirect start time to the
	  // coarsened shared current time given fetchParams’s cross-origin isolated
	  // capability.
	  timingInfo.redirectEndTime = timingInfo.postRedirectStartTime =
	    coarsenedSharedCurrentTime(fetchParams.crossOriginIsolatedCapability);

	  // 16. If timingInfo’s redirect start time is 0, then set timingInfo’s
	  //  redirect start time to timingInfo’s start time.
	  if (timingInfo.redirectStartTime === 0) {
	    timingInfo.redirectStartTime = timingInfo.startTime;
	  }

	  // 17. Append locationURL to request’s URL list.
	  request.urlList.push(locationURL);

	  // 18. Invoke set request’s referrer policy on redirect on request and
	  // actualResponse.
	  setRequestReferrerPolicyOnRedirect(request, actualResponse);

	  // 19. Return the result of running main fetch given fetchParams and true.
	  return mainFetch(fetchParams, true)
	}

	// https://fetch.spec.whatwg.org/#http-network-or-cache-fetch
	async function httpNetworkOrCacheFetch (
	  fetchParams,
	  isAuthenticationFetch = false,
	  isNewConnectionFetch = false
	) {
	  // 1. Let request be fetchParams’s request.
	  const request = fetchParams.request;

	  // 2. Let httpFetchParams be null.
	  let httpFetchParams = null;

	  // 3. Let httpRequest be null.
	  let httpRequest = null;

	  // 4. Let response be null.
	  let response = null;

	  // 8. Run these steps, but abort when the ongoing fetch is terminated:

	  //    1. If request’s window is "no-window" and request’s redirect mode is
	  //    "error", then set httpFetchParams to fetchParams and httpRequest to
	  //    request.
	  if (request.window === 'no-window' && request.redirect === 'error') {
	    httpFetchParams = fetchParams;
	    httpRequest = request;
	  } else {
	    // Otherwise:

	    // 1. Set httpRequest to a clone of request.
	    httpRequest = makeRequest(request);

	    // 2. Set httpFetchParams to a copy of fetchParams.
	    httpFetchParams = { ...fetchParams };

	    // 3. Set httpFetchParams’s request to httpRequest.
	    httpFetchParams.request = httpRequest;
	  }

	  //    3. Let includeCredentials be true if one of
	  const includeCredentials =
	    request.credentials === 'include' ||
	    (request.credentials === 'same-origin' &&
	      request.responseTainting === 'basic');

	  //    4. Let contentLength be httpRequest’s body’s length, if httpRequest’s
	  //    body is non-null; otherwise null.
	  const contentLength = httpRequest.body ? httpRequest.body.length : null;

	  //    5. Let contentLengthHeaderValue be null.
	  let contentLengthHeaderValue = null;

	  //    6. If httpRequest’s body is null and httpRequest’s method is `POST` or
	  //    `PUT`, then set contentLengthHeaderValue to `0`.
	  if (
	    httpRequest.body == null &&
	    ['POST', 'PUT'].includes(httpRequest.method)
	  ) {
	    contentLengthHeaderValue = '0';
	  }

	  //    7. If contentLength is non-null, then set contentLengthHeaderValue to
	  //    contentLength, serialized and isomorphic encoded.
	  if (contentLength != null) {
	    // TODO: isomorphic encoded
	    contentLengthHeaderValue = String(contentLength);
	  }

	  //    8. If contentLengthHeaderValue is non-null, then append
	  //    `Content-Length`/contentLengthHeaderValue to httpRequest’s header
	  //    list.
	  if (contentLengthHeaderValue != null) {
	    httpRequest.headersList.append('content-length', contentLengthHeaderValue);
	  }

	  //    9. If contentLengthHeaderValue is non-null, then append (`Content-Length`,
	  //    contentLengthHeaderValue) to httpRequest’s header list.

	  //    10. If contentLength is non-null and httpRequest’s keepalive is true,
	  //    then:
	  if (contentLength != null && httpRequest.keepalive) ;

	  //    11. If httpRequest’s referrer is a URL, then append
	  //    `Referer`/httpRequest’s referrer, serialized and isomorphic encoded,
	  //     to httpRequest’s header list.
	  if (httpRequest.referrer instanceof URL) {
	    // TODO: isomorphic encoded
	    httpRequest.headersList.append('referer', httpRequest.referrer.href);
	  }

	  //    12. Append a request `Origin` header for httpRequest.
	  appendRequestOriginHeader(httpRequest);

	  //    13. Append the Fetch metadata headers for httpRequest. [FETCH-METADATA]
	  appendFetchMetadata(httpRequest);

	  //    14. If httpRequest’s header list does not contain `User-Agent`, then
	  //    user agents should append `User-Agent`/default `User-Agent` value to
	  //    httpRequest’s header list.
	  if (!httpRequest.headersList.has('user-agent')) {
	    httpRequest.headersList.append('user-agent', 'undici');
	  }

	  //    15. If httpRequest’s cache mode is "default" and httpRequest’s header
	  //    list contains `If-Modified-Since`, `If-None-Match`,
	  //    `If-Unmodified-Since`, `If-Match`, or `If-Range`, then set
	  //    httpRequest’s cache mode to "no-store".
	  if (
	    httpRequest.cache === 'default' &&
	    (httpRequest.headersList.has('if-modified-since') ||
	      httpRequest.headersList.has('if-none-match') ||
	      httpRequest.headersList.has('if-unmodified-since') ||
	      httpRequest.headersList.has('if-match') ||
	      httpRequest.headersList.has('if-range'))
	  ) {
	    httpRequest.cache = 'no-store';
	  }

	  //    16. If httpRequest’s cache mode is "no-cache", httpRequest’s prevent
	  //    no-cache cache-control header modification flag is unset, and
	  //    httpRequest’s header list does not contain `Cache-Control`, then append
	  //    `Cache-Control`/`max-age=0` to httpRequest’s header list.
	  if (
	    httpRequest.cache === 'no-cache' &&
	    !httpRequest.preventNoCacheCacheControlHeaderModification &&
	    !httpRequest.headersList.has('cache-control')
	  ) {
	    httpRequest.headersList.append('cache-control', 'max-age=0');
	  }

	  //    17. If httpRequest’s cache mode is "no-store" or "reload", then:
	  if (httpRequest.cache === 'no-store' || httpRequest.cache === 'reload') {
	    // 1. If httpRequest’s header list does not contain `Pragma`, then append
	    // `Pragma`/`no-cache` to httpRequest’s header list.
	    if (!httpRequest.headersList.has('pragma')) {
	      httpRequest.headersList.append('pragma', 'no-cache');
	    }

	    // 2. If httpRequest’s header list does not contain `Cache-Control`,
	    // then append `Cache-Control`/`no-cache` to httpRequest’s header list.
	    if (!httpRequest.headersList.has('cache-control')) {
	      httpRequest.headersList.append('cache-control', 'no-cache');
	    }
	  }

	  //    18. If httpRequest’s header list contains `Range`, then append
	  //    `Accept-Encoding`/`identity` to httpRequest’s header list.
	  if (httpRequest.headersList.has('range')) {
	    httpRequest.headersList.append('accept-encoding', 'identity');
	  }

	  //    19. Modify httpRequest’s header list per HTTP. Do not append a given
	  //    header if httpRequest’s header list contains that header’s name.
	  //    TODO: https://github.com/whatwg/fetch/issues/1285#issuecomment-896560129
	  if (!httpRequest.headersList.has('accept-encoding')) {
	    if (/^https:/.test(requestCurrentURL(httpRequest).protocol)) {
	      httpRequest.headersList.append('accept-encoding', 'br, gzip, deflate');
	    } else {
	      httpRequest.headersList.append('accept-encoding', 'gzip, deflate');
	    }
	  }

	  //    21. If there’s a proxy-authentication entry, use it as appropriate.
	  //    TODO: proxy-authentication

	  //    22. Set httpCache to the result of determining the HTTP cache
	  //    partition, given httpRequest.
	  //    TODO: cache

	  //    23. If httpCache is null, then set httpRequest’s cache mode to
	  //    "no-store".
	  {
	    httpRequest.cache = 'no-store';
	  }

	  //    24. If httpRequest’s cache mode is neither "no-store" nor "reload",
	  //    then:
	  if (httpRequest.mode !== 'no-store' && httpRequest.mode !== 'reload') ;

	  // 9. If aborted, then return the appropriate network error for fetchParams.
	  // TODO

	  // 10. If response is null, then:
	  if (response == null) {
	    // 1. If httpRequest’s cache mode is "only-if-cached", then return a
	    // network error.
	    if (httpRequest.mode === 'only-if-cached') {
	      return makeNetworkError('only if cached')
	    }

	    // 2. Let forwardResponse be the result of running HTTP-network fetch
	    // given httpFetchParams, includeCredentials, and isNewConnectionFetch.
	    const forwardResponse = await httpNetworkFetch(
	      httpFetchParams,
	      includeCredentials,
	      isNewConnectionFetch
	    );

	    // 3. If httpRequest’s method is unsafe and forwardResponse’s status is
	    // in the range 200 to 399, inclusive, invalidate appropriate stored
	    // responses in httpCache, as per the "Invalidation" chapter of HTTP
	    // Caching, and set storedResponse to null. [HTTP-CACHING]
	    if (
	      !safeMethods.includes(httpRequest.method) &&
	      forwardResponse.status >= 200 &&
	      forwardResponse.status <= 399
	    ) ;

	    // 5. If response is null, then:
	    if (response == null) {
	      // 1. Set response to forwardResponse.
	      response = forwardResponse;

	      // 2. Store httpRequest and forwardResponse in httpCache, as per the
	      // "Storing Responses in Caches" chapter of HTTP Caching. [HTTP-CACHING]
	      // TODO: cache
	    }
	  }

	  // 11. Set response’s URL list to a clone of httpRequest’s URL list.
	  response.urlList = [...httpRequest.urlList];

	  // 12. If httpRequest’s header list contains `Range`, then set response’s
	  // range-requested flag.
	  if (httpRequest.headersList.has('range')) {
	    response.rangeRequested = true;
	  }

	  // 13. Set response’s request-includes-credentials to includeCredentials.
	  response.requestIncludesCredentials = includeCredentials;

	  // 14. If response’s status is 401, httpRequest’s response tainting is not
	  // "cors", includeCredentials is true, and request’s window is an environment
	  // settings object, then:
	  // TODO

	  // 15. If response’s status is 407, then:
	  if (response.status === 407) {
	    // 1. If request’s window is "no-window", then return a network error.
	    if (request.window === 'no-window') {
	      return makeNetworkError()
	    }

	    // 2. ???

	    // 3. If fetchParams is canceled, then return the appropriate network error for fetchParams.
	    if (isCancelled(fetchParams)) {
	      return makeAppropriateNetworkError(fetchParams)
	    }

	    // 4. Prompt the end user as appropriate in request’s window and store
	    // the result as a proxy-authentication entry. [HTTP-AUTH]
	    // TODO: Invoke some kind of callback?

	    // 5. Set response to the result of running HTTP-network-or-cache fetch given
	    // fetchParams.
	    // TODO
	    return makeNetworkError('proxy authentication required')
	  }

	  // 16. If all of the following are true
	  if (
	    // response’s status is 421
	    response.status === 421 &&
	    // isNewConnectionFetch is false
	    !isNewConnectionFetch &&
	    // request’s body is null, or request’s body is non-null and request’s body’s source is non-null
	    (request.body == null || request.body.source != null)
	  ) {
	    // then:

	    // 1. If fetchParams is canceled, then return the appropriate network error for fetchParams.
	    if (isCancelled(fetchParams)) {
	      return makeAppropriateNetworkError(fetchParams)
	    }

	    // 2. Set response to the result of running HTTP-network-or-cache
	    // fetch given fetchParams, isAuthenticationFetch, and true.

	    // TODO (spec): The spec doesn't specify this but we need to cancel
	    // the active response before we can start a new one.
	    // https://github.com/whatwg/fetch/issues/1293
	    fetchParams.controller.connection.destroy();

	    response = await httpNetworkOrCacheFetch(
	      fetchParams,
	      isAuthenticationFetch,
	      true
	    );
	  }

	  // 18. Return response.
	  return response
	}

	// https://fetch.spec.whatwg.org/#http-network-fetch
	async function httpNetworkFetch (
	  fetchParams,
	  includeCredentials = false,
	  forceNewConnection = false
	) {
	  assert(!fetchParams.controller.connection || fetchParams.controller.connection.destroyed);

	  fetchParams.controller.connection = {
	    abort: null,
	    destroyed: false,
	    destroy (err) {
	      if (!this.destroyed) {
	        this.destroyed = true;
	        this.abort?.(err ?? new DOMException('The operation was aborted.', 'AbortError'));
	      }
	    }
	  };

	  // 1. Let request be fetchParams’s request.
	  const request = fetchParams.request;

	  // 2. Let response be null.
	  let response = null;

	  // 3. Let timingInfo be fetchParams’s timing info.
	  const timingInfo = fetchParams.timingInfo;

	  // 5. If httpCache is null, then set request’s cache mode to "no-store".
	  {
	    request.cache = 'no-store';
	  }

	  // 8. Switch on request’s mode:
	  if (request.mode === 'websocket') ;

	  // 9. Run these steps, but abort when the ongoing fetch is terminated:

	  //    1. If connection is failure, then return a network error.

	  //    2. Set timingInfo’s final connection timing info to the result of
	  //    calling clamp and coarsen connection timing info with connection’s
	  //    timing info, timingInfo’s post-redirect start time, and fetchParams’s
	  //    cross-origin isolated capability.

	  //    3. If connection is not an HTTP/2 connection, request’s body is non-null,
	  //    and request’s body’s source is null, then append (`Transfer-Encoding`,
	  //    `chunked`) to request’s header list.

	  //    4. Set timingInfo’s final network-request start time to the coarsened
	  //    shared current time given fetchParams’s cross-origin isolated
	  //    capability.

	  //    5. Set response to the result of making an HTTP request over connection
	  //    using request with the following caveats:

	  //        - Follow the relevant requirements from HTTP. [HTTP] [HTTP-SEMANTICS]
	  //        [HTTP-COND] [HTTP-CACHING] [HTTP-AUTH]

	  //        - If request’s body is non-null, and request’s body’s source is null,
	  //        then the user agent may have a buffer of up to 64 kibibytes and store
	  //        a part of request’s body in that buffer. If the user agent reads from
	  //        request’s body beyond that buffer’s size and the user agent needs to
	  //        resend request, then instead return a network error.

	  //        - Set timingInfo’s final network-response start time to the coarsened
	  //        shared current time given fetchParams’s cross-origin isolated capability,
	  //        immediately after the user agent’s HTTP parser receives the first byte
	  //        of the response (e.g., frame header bytes for HTTP/2 or response status
	  //        line for HTTP/1.x).

	  //        - Wait until all the headers are transmitted.

	  //        - Any responses whose status is in the range 100 to 199, inclusive,
	  //        and is not 101, are to be ignored, except for the purposes of setting
	  //        timingInfo’s final network-response start time above.

	  //    - If request’s header list contains `Transfer-Encoding`/`chunked` and
	  //    response is transferred via HTTP/1.0 or older, then return a network
	  //    error.

	  //    - If the HTTP request results in a TLS client certificate dialog, then:

	  //        1. If request’s window is an environment settings object, make the
	  //        dialog available in request’s window.

	  //        2. Otherwise, return a network error.

	  // To transmit request’s body body, run these steps:
	  let requestBody = null;
	  // 1. If body is null and fetchParams’s process request end-of-body is
	  // non-null, then queue a fetch task given fetchParams’s process request
	  // end-of-body and fetchParams’s task destination.
	  if (request.body == null && fetchParams.processRequestEndOfBody) {
	    queueMicrotask(() => fetchParams.processRequestEndOfBody());
	  } else if (request.body != null) {
	    // 2. Otherwise, if body is non-null:

	    //    1. Let processBodyChunk given bytes be these steps:
	    const processBodyChunk = async function * (bytes) {
	      // 1. If the ongoing fetch is terminated, then abort these steps.
	      if (isCancelled(fetchParams)) {
	        return
	      }

	      // 2. Run this step in parallel: transmit bytes.
	      yield bytes;

	      // 3. If fetchParams’s process request body is non-null, then run
	      // fetchParams’s process request body given bytes’s length.
	      fetchParams.processRequestBodyChunkLength?.(bytes.byteLength);
	    };

	    // 2. Let processEndOfBody be these steps:
	    const processEndOfBody = () => {
	      // 1. If fetchParams is canceled, then abort these steps.
	      if (isCancelled(fetchParams)) {
	        return
	      }

	      // 2. If fetchParams’s process request end-of-body is non-null,
	      // then run fetchParams’s process request end-of-body.
	      if (fetchParams.processRequestEndOfBody) {
	        fetchParams.processRequestEndOfBody();
	      }
	    };

	    // 3. Let processBodyError given e be these steps:
	    const processBodyError = (e) => {
	      // 1. If fetchParams is canceled, then abort these steps.
	      if (isCancelled(fetchParams)) {
	        return
	      }

	      // 2. If e is an "AbortError" DOMException, then abort fetchParams’s controller.
	      if (e.name === 'AbortError') {
	        fetchParams.controller.abort();
	      } else {
	        fetchParams.controller.terminate(e);
	      }
	    };

	    // 4. Incrementally read request’s body given processBodyChunk, processEndOfBody,
	    // processBodyError, and fetchParams’s task destination.
	    requestBody = (async function * () {
	      try {
	        for await (const bytes of request.body.stream) {
	          yield * processBodyChunk(bytes);
	        }
	        processEndOfBody();
	      } catch (err) {
	        processBodyError(err);
	      }
	    })();
	  }

	  try {
	    const { body, status, statusText, headersList } = await dispatch({ body: requestBody });

	    const iterator = body[Symbol.asyncIterator]();
	    fetchParams.controller.next = () => iterator.next();

	    response = makeResponse({ status, statusText, headersList });
	  } catch (err) {
	    // 10. If aborted, then:
	    if (err.name === 'AbortError') {
	      // 1. If connection uses HTTP/2, then transmit an RST_STREAM frame.
	      fetchParams.controller.connection.destroy();

	      // 2. Return the appropriate network error for fetchParams.
	      return makeAppropriateNetworkError(fetchParams)
	    }

	    return makeNetworkError(err)
	  }

	  // 11. Let pullAlgorithm be an action that resumes the ongoing fetch
	  // if it is suspended.
	  const pullAlgorithm = () => {
	    fetchParams.controller.resume();
	  };

	  // 12. Let cancelAlgorithm be an algorithm that aborts fetchParams’s
	  // controller.
	  const cancelAlgorithm = () => {
	    fetchParams.controller.abort();
	  };

	  // 13. Let highWaterMark be a non-negative, non-NaN number, chosen by
	  // the user agent.
	  // TODO

	  // 14. Let sizeAlgorithm be an algorithm that accepts a chunk object
	  // and returns a non-negative, non-NaN, non-infinite number, chosen by the user agent.
	  // TODO

	  // 15. Let stream be a new ReadableStream.
	  // 16. Set up stream with pullAlgorithm set to pullAlgorithm,
	  // cancelAlgorithm set to cancelAlgorithm, highWaterMark set to
	  // highWaterMark, and sizeAlgorithm set to sizeAlgorithm.
	  if (!ReadableStream) {
	    ReadableStream = require$$12.ReadableStream;
	  }

	  const stream = new ReadableStream(
	    {
	      async start (controller) {
	        fetchParams.controller.controller = controller;
	      },
	      async pull (controller) {
	        await pullAlgorithm();
	      },
	      async cancel (reason) {
	        await cancelAlgorithm();
	      }
	    },
	    { highWaterMark: 0 }
	  );

	  // 17. Run these steps, but abort when the ongoing fetch is terminated:

	  //    1. Set response’s body to a new body whose stream is stream.
	  response.body = { stream };

	  //    2. If response is not a network error and request’s cache mode is
	  //    not "no-store", then update response in httpCache for request.
	  //    TODO

	  //    3. If includeCredentials is true and the user agent is not configured
	  //    to block cookies for request (see section 7 of [COOKIES]), then run the
	  //    "set-cookie-string" parsing algorithm (see section 5.2 of [COOKIES]) on
	  //    the value of each header whose name is a byte-case-insensitive match for
	  //    `Set-Cookie` in response’s header list, if any, and request’s current URL.
	  //    TODO

	  // 18. If aborted, then:
	  // TODO

	  // 19. Run these steps in parallel:

	  //    1. Run these steps, but abort when fetchParams is canceled:
	  fetchParams.controller.on('terminated', onAborted);
	  fetchParams.controller.resume = async () => {
	    // 1. While true
	    while (true) {
	      // 1-3. See onData...

	      // 4. Set bytes to the result of handling content codings given
	      // codings and bytes.
	      let bytes;
	      try {
	        const { done, value } = await fetchParams.controller.next();

	        if (isAborted(fetchParams)) {
	          break
	        }

	        bytes = done ? undefined : value;
	      } catch (err) {
	        if (fetchParams.controller.ended && !timingInfo.encodedBodySize) {
	          // zlib doesn't like empty streams.
	          bytes = undefined;
	        } else {
	          bytes = err;
	        }
	      }

	      if (bytes === undefined) {
	        // 2. Otherwise, if the bytes transmission for response’s message
	        // body is done normally and stream is readable, then close
	        // stream, finalize response for fetchParams and response, and
	        // abort these in-parallel steps.
	        try {
	          fetchParams.controller.controller.close();
	        } catch (err) {
	          // TODO (fix): How/Why can this happen? Do we have a bug?
	          if (!/Controller is already closed/.test(err)) {
	            throw err
	          }
	        }

	        finalizeResponse(fetchParams, response);

	        return
	      }

	      // 5. Increase timingInfo’s decoded body size by bytes’s length.
	      timingInfo.decodedBodySize += bytes?.byteLength ?? 0;

	      // 6. If bytes is failure, then terminate fetchParams’s controller.
	      if (isErrorLike(bytes)) {
	        fetchParams.controller.terminate(bytes);
	        return
	      }

	      // 7. Enqueue a Uint8Array wrapping an ArrayBuffer containing bytes
	      // into stream.
	      fetchParams.controller.controller.enqueue(new Uint8Array(bytes));

	      // 8. If stream is errored, then terminate the ongoing fetch.
	      if (isErrored(stream)) {
	        fetchParams.controller.terminate();
	        return
	      }

	      // 9. If stream doesn’t need more data ask the user agent to suspend
	      // the ongoing fetch.
	      if (!fetchParams.controller.controller.desiredSize) {
	        return
	      }
	    }
	  };

	  //    2. If aborted, then:
	  function onAborted (reason) {
	    // 2. If fetchParams is aborted, then:
	    if (isAborted(fetchParams)) {
	      // 1. Set response’s aborted flag.
	      response.aborted = true;

	      // 2. If stream is readable, error stream with an "AbortError" DOMException.
	      if (isReadable(stream)) {
	        fetchParams.controller.controller.error(
	          new DOMException('The operation was aborted.', 'AbortError')
	        );
	      }
	    } else {
	      // 3. Otherwise, if stream is readable, error stream with a TypeError.
	      if (isReadable(stream)) {
	        fetchParams.controller.controller.error(new TypeError('terminated', {
	          cause: isErrorLike(reason) ? reason : undefined
	        }));
	      }
	    }

	    // 4. If connection uses HTTP/2, then transmit an RST_STREAM frame.
	    // 5. Otherwise, the user agent should close connection unless it would be bad for performance to do so.
	    fetchParams.controller.connection.destroy();
	  }

	  // 20. Return response.
	  return response

	  async function dispatch ({ body }) {
	    const url = requestCurrentURL(request);
	    return new Promise((resolve, reject) => fetchParams.controller.dispatcher.dispatch(
	      {
	        path: url.pathname + url.search,
	        origin: url.origin,
	        method: request.method,
	        body: fetchParams.controller.dispatcher.isMockActive ? request.body && request.body.source : body,
	        headers: [...request.headersList].flat(),
	        maxRedirections: 0,
	        bodyTimeout: 300_000,
	        headersTimeout: 300_000
	      },
	      {
	        body: null,
	        abort: null,

	        onConnect (abort) {
	          // TODO (fix): Do we need connection here?
	          const { connection } = fetchParams.controller;

	          if (connection.destroyed) {
	            abort(new DOMException('The operation was aborted.', 'AbortError'));
	          } else {
	            fetchParams.controller.on('terminated', abort);
	            this.abort = connection.abort = abort;
	          }
	        },

	        onHeaders (status, headersList, resume, statusText) {
	          if (status < 200) {
	            return
	          }

	          let codings = [];
	          let location = '';

	          const headers = new Headers();
	          for (let n = 0; n < headersList.length; n += 2) {
	            const key = headersList[n + 0].toString('latin1');
	            const val = headersList[n + 1].toString('latin1');

	            if (key.toLowerCase() === 'content-encoding') {
	              codings = val.split(',').map((x) => x.trim());
	            } else if (key.toLowerCase() === 'location') {
	              location = val;
	            }

	            headers.append(key, val);
	          }

	          this.body = new Readable({ read: resume });

	          const decoders = [];

	          const willFollow = request.redirect === 'follow' &&
	            location &&
	            redirectStatus.includes(status);

	          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding
	          if (request.method !== 'HEAD' && request.method !== 'CONNECT' && !nullBodyStatus.includes(status) && !willFollow) {
	            for (const coding of codings) {
	              if (/(x-)?gzip/.test(coding)) {
	                decoders.push(zlib.createGunzip());
	              } else if (/(x-)?deflate/.test(coding)) {
	                decoders.push(zlib.createInflate());
	              } else if (coding === 'br') {
	                decoders.push(zlib.createBrotliDecompress());
	              } else {
	                decoders.length = 0;
	                break
	              }
	            }
	          }

	          resolve({
	            status,
	            statusText,
	            headersList: headers[kHeadersList],
	            body: decoders.length
	              ? pipeline(this.body, ...decoders, () => { })
	              : this.body.on('error', () => {})
	          });

	          return true
	        },

	        onData (chunk) {
	          if (fetchParams.controller.dump) {
	            return
	          }

	          // 1. If one or more bytes have been transmitted from response’s
	          // message body, then:

	          //  1. Let bytes be the transmitted bytes.
	          const bytes = chunk;

	          //  2. Let codings be the result of extracting header list values
	          //  given `Content-Encoding` and response’s header list.
	          //  See pullAlgorithm.

	          //  3. Increase timingInfo’s encoded body size by bytes’s length.
	          timingInfo.encodedBodySize += bytes.byteLength;

	          //  4. See pullAlgorithm...

	          return this.body.push(bytes)
	        },

	        onComplete () {
	          if (this.abort) {
	            fetchParams.controller.off('terminated', this.abort);
	          }

	          fetchParams.controller.ended = true;

	          this.body.push(null);
	        },

	        onError (error) {
	          if (this.abort) {
	            fetchParams.controller.off('terminated', this.abort);
	          }

	          this.body?.destroy(error);

	          fetchParams.controller.terminate(error);

	          reject(error);
	        }
	      }
	    ))
	  }
	}

	fetch_1 = {
	  fetch,
	  Fetch,
	  fetching,
	  finalizeAndReportTiming
	};
	return fetch_1;
}

var FormData;
var Request;
var Response;
var Headers;
var fetch;
const Dispatcher = dispatcher;
const errors = errors$1;
const util = util$e;
const { InvalidArgumentError } = errors;
const api = api$1;
const { getGlobalDispatcher, setGlobalDispatcher } = global$2;

const nodeVersion = process.versions.node.split('.');
const nodeMajor = Number(nodeVersion[0]);
const nodeMinor = Number(nodeVersion[1]);

Object.assign(Dispatcher.prototype, api);

function makeDispatcher (fn) {
  return (url, opts, handler) => {
    if (typeof opts === 'function') {
      handler = opts;
      opts = null;
    }

    if (!url || (typeof url !== 'string' && typeof url !== 'object' && !(url instanceof URL))) {
      throw new InvalidArgumentError('invalid url')
    }

    if (opts != null && typeof opts !== 'object') {
      throw new InvalidArgumentError('invalid opts')
    }

    if (opts && opts.path != null) {
      if (typeof opts.path !== 'string') {
        throw new InvalidArgumentError('invalid opts.path')
      }

      let path = opts.path;
      if (!opts.path.startsWith('/')) {
        path = `/${path}`;
      }

      url = new URL(util.parseOrigin(url).origin + path);
    } else {
      if (!opts) {
        opts = typeof url === 'object' ? url : {};
      }

      url = util.parseURL(url);
    }

    const { agent, dispatcher = getGlobalDispatcher() } = opts;

    if (agent) {
      throw new InvalidArgumentError('unsupported opts.agent. Did you mean opts.client?')
    }

    return fn.call(dispatcher, {
      ...opts,
      origin: url.origin,
      path: url.search ? `${url.pathname}${url.search}` : url.pathname,
      method: opts.method || (opts.body ? 'PUT' : 'GET')
    }, handler)
  }
}

if (nodeMajor > 16 || (nodeMajor === 16 && nodeMinor >= 8)) {
  let fetchImpl = null;
  fetch = async function fetch (resource) {
    if (!fetchImpl) {
      fetchImpl = requireFetch().fetch;
    }
    const dispatcher = (arguments[1] && arguments[1].dispatcher) || getGlobalDispatcher();
    try {
      return await fetchImpl.apply(dispatcher, arguments)
    } catch (err) {
      Error.captureStackTrace(err, this);
      throw err
    }
  };
  Headers = requireHeaders().Headers;
  Response = requireResponse().Response;
  Request = requireRequest().Request;
  FormData = requireFormdata().FormData;
  requireFile().File;

  requireGlobal();
}

makeDispatcher(api.request);
makeDispatcher(api.stream);
makeDispatcher(api.pipeline);
makeDispatcher(api.connect);
makeDispatcher(api.upgrade);

/** @type {Record<string, any>} */
const globals = {
	crypto: webcrypto,
	fetch,
	Response,
	Request,
	Headers,
	ReadableStream: ReadableStream$1,
	TransformStream,
	WritableStream,
	FormData
};

// exported for dev/preview and node environments
function installPolyfills() {
	for (const name in globals) {
		Object.defineProperty(globalThis, name, {
			enumerable: true,
			configurable: true,
			writable: true,
			value: globals[name]
		});
	}
}

installPolyfills();
