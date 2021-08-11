'use strict';

var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _assertThisInitialized = require('@babel/runtime/helpers/assertThisInitialized');
var _inherits = require('@babel/runtime/helpers/inherits');
var _createSuper = require('@babel/runtime/helpers/createSuper');
var _wrapNativeSuper = require('@babel/runtime/helpers/wrapNativeSuper');
var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var TRPCClientError = require('./TRPCClientError-5fb4eac6.cjs.prod.js');

var TRPCAbortError = /*#__PURE__*/function (_Error) {
  _inherits(TRPCAbortError, _Error);

  var _super = /*#__PURE__*/_createSuper(TRPCAbortError);

  function TRPCAbortError() {
    var _this;

    _classCallCheck(this, TRPCAbortError);

    _this = _super.call(this, 'The operation was aborted.');
    _this.name = 'TRPCAbortError';
    Object.setPrototypeOf(_assertThisInitialized(_this), TRPCAbortError.prototype);
    return _this;
  }

  return TRPCAbortError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

function transformRPCResponse(_ref) {
  var envelope = _ref.envelope,
      runtime = _ref.runtime;

  if ('error' in envelope) {
    return TRPCClientError.TRPCClientError.from(_objectSpread(_objectSpread({}, envelope), {}, {
      error: runtime.transformer.deserialize(envelope.error)
    }));
  }

  if (envelope.result.type === 'data') {
    return _objectSpread(_objectSpread({}, envelope.result), {}, {
      data: runtime.transformer.deserialize(envelope.result.data)
    });
  }

  return envelope.result;
}

// https://github.com/trpc/trpc/pull/669
function arrayToDict(array) {
  var dict = {};

  for (var index = 0; index < array.length; index++) {
    var element = array[index];
    dict[index] = element;
  }

  return dict;
}

function httpRequest(props) {
  var type = props.type,
      rt = props.runtime,
      path = props.path;
  var ac = rt.AbortController ? new rt.AbortController() : null;
  var method = {
    query: 'GET',
    mutation: 'POST',
    subscription: 'PATCH'
  };
  var input = 'input' in props ? props.input : arrayToDict(props.inputs);

  function getUrl() {
    var url = props.url + '/' + path;
    var queryParts = [];

    if ('inputs' in props) {
      queryParts.push('batch=1');
    }

    if (type === 'query' && input !== undefined) {
      queryParts.push("input=".concat(encodeURIComponent(JSON.stringify(rt.transformer.serialize(input)))));
    }

    if (queryParts.length) {
      url += '?' + queryParts.join('&');
    }

    return url;
  }

  function getBody() {
    if (type === 'query') {
      return undefined;
    }

    var rawInput = rt.transformer.serialize(input);
    return rawInput !== undefined ? JSON.stringify(rawInput) : undefined;
  }

  var promise = new Promise(function (resolve, reject) {
    var url = getUrl();
    rt.fetch(url, {
      method: method[type],
      signal: ac === null || ac === void 0 ? void 0 : ac.signal,
      body: getBody(),
      headers: _objectSpread({
        'content-type': 'application/json'
      }, rt.headers())
    }).then(function (res) {
      return res.json();
    }).then(function (json) {
      resolve(json);
    }).catch(reject);
  });

  var cancel = function cancel() {
    ac === null || ac === void 0 ? void 0 : ac.abort();
  };

  return {
    promise: promise,
    cancel: cancel
  };
}

exports.TRPCAbortError = TRPCAbortError;
exports.httpRequest = httpRequest;
exports.transformRPCResponse = transformRPCResponse;
