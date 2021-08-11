import { T as TRPCClientError } from '../../../dist/TRPCClientError-7653e11e.esm.js';
import _createForOfIteratorHelper from '@babel/runtime/helpers/esm/createForOfIteratorHelper';
import { T as TRPCAbortError, t as transformRPCResponse, h as httpRequest } from '../../../dist/httpRequest-9a687d18.esm.js';
import '@babel/runtime/helpers/objectSpread2';
import '@babel/runtime/helpers/classCallCheck';
import '@babel/runtime/helpers/createClass';
import '@babel/runtime/helpers/assertThisInitialized';
import '@babel/runtime/helpers/inherits';
import '@babel/runtime/helpers/createSuper';
import '@babel/runtime/helpers/wrapNativeSuper';

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

        var _httpRequest = httpRequest({
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
        prevOnce(TRPCClientError.from(new TRPCAbortError(), {
          isDone: true
        }));
        cancel();
      });
      promise.then(function (envelope) {
        prevOnce(transformRPCResponse({
          envelope: envelope,
          runtime: runtime
        }));
      }).catch(function (err) {
        prevOnce(TRPCClientError.from(err));
      });
    };
  };
}

export { httpBatchLink };