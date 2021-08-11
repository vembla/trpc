'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var TRPCClientError = require('../../../dist/TRPCClientError-50632707.cjs.dev.js');
var _createForOfIteratorHelper = require('@babel/runtime/helpers/createForOfIteratorHelper');
var httpRequest = require('../../../dist/httpRequest-7f7630a1.cjs.dev.js');
require('@babel/runtime/helpers/objectSpread2');
require('@babel/runtime/helpers/classCallCheck');
require('@babel/runtime/helpers/createClass');
require('@babel/runtime/helpers/assertThisInitialized');
require('@babel/runtime/helpers/inherits');
require('@babel/runtime/helpers/createSuper');
require('@babel/runtime/helpers/wrapNativeSuper');

/**
 * Dataloader that's very inspired by https://github.com/graphql/dataloader
 * Less configuration, no caching, and allows you to cancel requests
 * When cancelling a single fetch the whole batch will be cancelled only when _all_ items are cancelled
 */
function dataLoader(fetchMany) {
  var batch = null;
  var dispatchTimer = null;

  var destroyTimerAndBatch = function destroyTimerAndBatch() {
    clearTimeout(dispatchTimer);
    dispatchTimer = null;
    batch = null;
  };

  function dispatch() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    var batchCopy = batch;
    destroyTimerAndBatch();

    var _fetchMany = fetchMany(batchCopy.items.map(function (v) {
      return v.key;
    })),
        promise = _fetchMany.promise,
        cancel = _fetchMany.cancel;

    batchCopy.cancel = cancel;
    promise.then(function (result) {
      for (var i = 0; i < result.length; i++) {
        var _value = result[i];
        batchCopy.items[i].resolve(_value);
      }
    }).catch(function (error) {
      var _iterator = _createForOfIteratorHelper(batchCopy.items),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          item.reject(error);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
  }

  function load(key) {
    var batchItem = {
      cancelled: false,
      key: key
    };

    if (!batch) {
      batch = {
        items: [],
        cancel: function cancel() {
          destroyTimerAndBatch();
        }
      };
    }

    var thisBatch = batch;
    var promise = new Promise(function (resolve, reject) {
      var item = batchItem;
      item.reject = reject;
      item.resolve = resolve;
      thisBatch.items.push(item);
    });

    if (!dispatchTimer) {
      dispatchTimer = setTimeout(dispatch);
    }

    var cancel = function cancel() {
      batchItem.cancelled = true;

      if (thisBatch.items.some(function (item) {
        return !item.cancelled;
      })) {
        // there are still things that can be resolved
        return;
      }

      thisBatch.cancel();
    };

    return {
      promise: promise,
      cancel: cancel
    };
  }

  return {
    load: load
  };
}

function httpBatchLink(opts) {
  var url = opts.url; // initialized config

  return function (runtime) {
    // initialized in app
    var fetcher = function fetcher(type) {
      return function (keyInputPairs) {
        var path = keyInputPairs.map(function (op) {
          return op.path;
        }).join(',');
        var inputs = keyInputPairs.map(function (op) {
          return op.input;
        });

        var _httpRequest = httpRequest.httpRequest({
          url: url,
          inputs: inputs,
          path: path,
          runtime: runtime,
          type: type
        }),
            promise = _httpRequest.promise,
            cancel = _httpRequest.cancel;

        return {
          promise: promise.then(function (res) {
            if (!Array.isArray(res)) {
              return keyInputPairs.map(function () {
                return res;
              });
            }

            return res;
          }),
          cancel: cancel
        };
      };
    };

    var query = dataLoader(fetcher('query'));
    var mutation = dataLoader(fetcher('mutation'));
    var subscription = dataLoader(fetcher('subscription'));
    var loaders = {
      query: query,
      subscription: subscription,
      mutation: mutation
    };
    return function (_ref) {
      var op = _ref.op,
          prev = _ref.prev,
          onDestroy = _ref.onDestroy;
      var loader = loaders[op.type];

      var _loader$load = loader.load(op),
          promise = _loader$load.promise,
          cancel = _loader$load.cancel;

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

exports.httpBatchLink = httpBatchLink;
