'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var TRPCClientError = require('../../../dist/TRPCClientError-5fb4eac6.cjs.prod.js');
var httpRequest = require('../../../dist/httpRequest-a2d9613e.cjs.prod.js');
require('@babel/runtime/helpers/objectSpread2');
require('@babel/runtime/helpers/classCallCheck');
require('@babel/runtime/helpers/createClass');
require('@babel/runtime/helpers/assertThisInitialized');
require('@babel/runtime/helpers/inherits');
require('@babel/runtime/helpers/createSuper');
require('@babel/runtime/helpers/wrapNativeSuper');

function httpLink(opts) {
  var url = opts.url; // initialized config

  return function (runtime) {
    // initialized in app
    return function (_ref) {
      var op = _ref.op,
          prev = _ref.prev,
          onDestroy = _ref.onDestroy;
      var path = op.path,
          input = op.input,
          type = op.type;

      var _httpRequest = httpRequest.httpRequest({
        runtime: runtime,
        type: type,
        input: input,
        url: url,
        path: path
      }),
          promise = _httpRequest.promise,
          cancel = _httpRequest.cancel;

      var isDone = false;

      var prevOnce = function prevOnce(result) {
        if (isDone) {
          return;
        }

        isDone = true;
        prev(result);
      };

      onDestroy(function () {
        prevOnce(TRPCClientError.TRPCClientError.from(new httpRequest.TRPCAbortError(), {
          isDone: true
        }));
        cancel();
      });
      promise.then(function (envelope) {
        prevOnce(httpRequest.transformRPCResponse({
          envelope: envelope,
          runtime: runtime
        }));
      }).catch(function (err) {
        prevOnce(TRPCClientError.TRPCClientError.from(err));
      });
    };
  };
}

exports.httpLink = httpLink;
