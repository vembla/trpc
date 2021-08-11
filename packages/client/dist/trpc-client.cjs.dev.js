'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var _createForOfIteratorHelper = require('@babel/runtime/helpers/createForOfIteratorHelper');
var httpRequest = require('./httpRequest-7f7630a1.cjs.dev.js');
var links_httpBatchLink_dist_trpcClientLinksHttpBatchLink = require('../links/httpBatchLink/dist/trpc-client-links-httpBatchLink.cjs.dev.js');
var TRPCClientError = require('./TRPCClientError-50632707.cjs.dev.js');
require('@babel/runtime/helpers/assertThisInitialized');
require('@babel/runtime/helpers/inherits');
require('@babel/runtime/helpers/createSuper');
require('@babel/runtime/helpers/wrapNativeSuper');

function observable() {
  var listeners = [];
  var value = null;
  return {
    subscribe: function subscribe(callbacks) {
      var listener = {
        callbacks: callbacks,
        unsubscribe: function unsubscribe() {
          var index = listeners.indexOf(listener);

          if (index !== -1) {
            var _listener$callbacks$o, _listener$callbacks;

            listeners.splice(index, 1);
            (_listener$callbacks$o = (_listener$callbacks = listener.callbacks).onDone) === null || _listener$callbacks$o === void 0 ? void 0 : _listener$callbacks$o.call(_listener$callbacks);
          }
        }
      };
      listeners.push(listener);
      return function () {
        listener.unsubscribe();
      };
    },
    next: function next(newValue) {
      var oldValue = value;
      value = newValue;

      if (oldValue !== newValue) {
        var _iterator = _createForOfIteratorHelper(listeners),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _listener$callbacks$o2, _listener$callbacks2;

            var listener = _step.value;
            (_listener$callbacks$o2 = (_listener$callbacks2 = listener.callbacks).onNext) === null || _listener$callbacks$o2 === void 0 ? void 0 : _listener$callbacks$o2.call(_listener$callbacks2, newValue);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    },
    done: function done() {
      while (listeners.length) {
        var _listener$callbacks$o3, _listener$callbacks3;

        var listener = listeners.pop();
        listener === null || listener === void 0 ? void 0 : (_listener$callbacks$o3 = (_listener$callbacks3 = listener.callbacks).onDone) === null || _listener$callbacks$o3 === void 0 ? void 0 : _listener$callbacks$o3.call(_listener$callbacks3);
        listener === null || listener === void 0 ? void 0 : listener.unsubscribe();
      }
    },
    error: function (_error) {
      function error(_x) {
        return _error.apply(this, arguments);
      }

      error.toString = function () {
        return _error.toString();
      };

      return error;
    }(function (error) {
      var _iterator2 = _createForOfIteratorHelper(listeners),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _listener$callbacks$o4, _listener$callbacks4;

          var listener = _step2.value;
          (_listener$callbacks$o4 = (_listener$callbacks4 = listener.callbacks).onError) === null || _listener$callbacks$o4 === void 0 ? void 0 : _listener$callbacks$o4.call(_listener$callbacks4, error);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    })
  };
}
function observableSubject(initialValue) {
  var $obs = observable();
  var value = initialValue;
  $obs.next(initialValue);
  return _objectSpread(_objectSpread({}, $obs), {}, {
    next: function next(v) {
      value = v;
      $obs.next(v);
    },
    get: function get() {
      return value;
    }
  });
}

function executeChain(opts) {
  var $result = observableSubject(null);

  var updateResult = function updateResult(result) {
    if (result instanceof Error) {
      $result.error(result);

      if (result.isDone) {
        $result.done();
      }
    } else {
      $result.next(result);
    }
  };

  function walk(_ref) {
    var index = _ref.index,
        op = _ref.op,
        stack = _ref.stack;
    var link = opts.links[index];
    var prev = index === 0 ? function (value) {
      return updateResult(value);
    } : stack[index - 1];
    link({
      op: op,
      prev: prev,
      next: function next(op, prevOp) {
        var prevStack = stack.slice();
        prevStack[index] = prevOp;
        walk({
          index: index + 1,
          op: op,
          stack: prevStack
        });
      },
      onDestroy: function onDestroy(callback) {
        $result.subscribe({
          onDone: function onDone() {
            callback();
          }
        });
      }
    });
  }

  walk({
    index: 0,
    op: opts.op,
    stack: []
  });
  return $result;
}

function getWindow() {
  if (typeof window !== 'undefined') {
    return window;
  }

  return global;
}

function getAbortController(ac) {
  var win = getWindow();
  return ac || win.AbortController || null;
}
function getFetch(f) {
  if (f) {
    return f;
  }

  var win = getWindow();

  if (win.fetch) {
    return typeof win.fetch.bind === 'function' ? win.fetch.bind(win) : win.fetch;
  }

  throw new Error('No fetch implementation found');
}

var idCounter = 0;
function getRequestId() {
  return ++idCounter;
}
var TRPCClient = /*#__PURE__*/function () {
  function TRPCClient(opts) {
    var _this = this;

    _classCallCheck(this, TRPCClient);

    this.links = void 0;
    this.runtime = void 0;
    var transformer = opts.transformer ? 'input' in opts.transformer ? {
      serialize: opts.transformer.input.serialize,
      deserialize: opts.transformer.output.deserialize
    } : opts.transformer : {
      serialize: function serialize(data) {
        return data;
      },
      deserialize: function deserialize(data) {
        return data;
      }
    };

    var _fetch = getFetch(opts === null || opts === void 0 ? void 0 : opts.fetch);

    var AC = getAbortController(opts === null || opts === void 0 ? void 0 : opts.AbortController);

    function getHeadersFn() {
      if (opts.headers) {
        var headers = opts.headers;
        return typeof headers === 'function' ? headers : function () {
          return headers;
        };
      }

      return function () {
        return {};
      };
    }

    this.runtime = {
      transformer: transformer,
      AbortController: AC,
      fetch: _fetch,
      headers: getHeadersFn()
    };

    if ('links' in opts) {
      this.links = opts.links.map(function (link) {
        return link(_this.runtime);
      });
    } else {
      this.links = [links_httpBatchLink_dist_trpcClientLinksHttpBatchLink.httpBatchLink({
        url: opts.url
      })(this.runtime)];
    }
  }

  _createClass(TRPCClient, [{
    key: "$request",
    value: function $request(_ref) {
      var type = _ref.type,
          input = _ref.input,
          path = _ref.path,
          _ref$context = _ref.context,
          context = _ref$context === void 0 ? {} : _ref$context;
      var $result = executeChain({
        links: this.links,
        op: {
          id: getRequestId(),
          type: type,
          path: path,
          input: input,
          context: context
        }
      });
      return $result;
    }
  }, {
    key: "requestAsPromise",
    value: function requestAsPromise(opts) {
      var $result = this.$request(opts);
      var promise = new Promise(function (resolve, reject) {
        var res = $result.get();

        if ((res === null || res === void 0 ? void 0 : res.type) === 'data') {
          resolve(res.data);
          $result.done();
          return;
        }

        $result.subscribe({
          onNext: function onNext(result) {
            if ((result === null || result === void 0 ? void 0 : result.type) !== 'data') {
              return;
            }

            resolve(result.data);
            $result.done();
          },
          onError: function onError(err) {
            reject(err);
            $result.done();
          },
          onDone: function onDone() {
            reject(TRPCClientError.TRPCClientError.from(new httpRequest.TRPCAbortError()));
          }
        });
      });

      promise.cancel = function () {
        $result.done();
      };

      return promise;
    }
  }, {
    key: "query",
    value: function query(path) {
      var _ref2;

      var context = (_ref2 = arguments.length <= 2 ? undefined : arguments[2]) === null || _ref2 === void 0 ? void 0 : _ref2.context;
      return this.requestAsPromise({
        type: 'query',
        path: path,
        input: arguments.length <= 1 ? undefined : arguments[1],
        context: context
      });
    }
  }, {
    key: "mutation",
    value: function mutation(path) {
      var _ref3;

      var context = (_ref3 = arguments.length <= 2 ? undefined : arguments[2]) === null || _ref3 === void 0 ? void 0 : _ref3.context;
      return this.requestAsPromise({
        type: 'mutation',
        path: path,
        input: arguments.length <= 1 ? undefined : arguments[1],
        context: context
      });
    }
  }, {
    key: "subscription",
    value: function subscription(path, input, opts) {
      var $res = this.$request({
        type: 'subscription',
        path: path,
        input: input,
        context: opts.context
      });
      $res.subscribe({
        onNext: function onNext(output) {
          if (output) {
            var _opts$onNext;

            (_opts$onNext = opts.onNext) === null || _opts$onNext === void 0 ? void 0 : _opts$onNext.call(opts, output);
          }
        },
        onError: function onError(err) {
          var _opts$onError;

          (_opts$onError = opts.onError) === null || _opts$onError === void 0 ? void 0 : _opts$onError.call(opts, err);
        },
        onDone: opts.onDone
      });
      return function () {
        $res.done();
      };
    }
  }]);

  return TRPCClient;
}();

/* eslint-disable @typescript-eslint/no-explicit-any */
function createTRPCClient(opts) {
  return new TRPCClient(opts);
}

exports.TRPCClientError = TRPCClientError.TRPCClientError;
exports.createTRPCClient = createTRPCClient;
