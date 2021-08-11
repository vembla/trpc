'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var server = require('@trpc/server');
var reactQuery = require('react-query');
var hydration = require('react-query/hydration');
var getCacheKey = require('../../dist/getCacheKey-558e408b.cjs.prod.js');
require('@babel/runtime/helpers/slicedToArray');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var _regeneratorRuntime__default = /*#__PURE__*/_interopDefault(_regeneratorRuntime);

server.assertNotBrowser();

/**
 * Create functions you can use for server-side rendering / static generation
 */
function createSSGHelpers(_ref) {
  var router = _ref.router,
      transformer = _ref.transformer,
      ctx = _ref.ctx,
      queryClientConfig = _ref.queryClientConfig;
  var queryClient = new reactQuery.QueryClient(queryClientConfig);
  var caller = router.createCaller(ctx);

  var prefetchQuery = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee2() {
      var _len,
          pathAndInput,
          _key,
          path,
          input,
          cacheKey,
          _args2 = arguments;

      return _regeneratorRuntime__default['default'].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              for (_len = _args2.length, pathAndInput = new Array(_len), _key = 0; _key < _len; _key++) {
                pathAndInput[_key] = _args2[_key];
              }

              path = pathAndInput[0], input = pathAndInput[1];
              cacheKey = [path, input !== null && input !== void 0 ? input : null, getCacheKey.CACHE_KEY_QUERY];
              return _context2.abrupt("return", queryClient.prefetchQuery(cacheKey, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee() {
                var data;
                return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return caller.query.apply(caller, pathAndInput);

                      case 2:
                        data = _context.sent;
                        return _context.abrupt("return", data);

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }))));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function prefetchQuery() {
      return _ref2.apply(this, arguments);
    };
  }();

  var prefetchInfiniteQuery = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee4() {
      var _len2,
          pathAndInput,
          _key2,
          cacheKey,
          _args4 = arguments;

      return _regeneratorRuntime__default['default'].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              for (_len2 = _args4.length, pathAndInput = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                pathAndInput[_key2] = _args4[_key2];
              }

              cacheKey = getCacheKey.getCacheKey(pathAndInput, getCacheKey.CACHE_KEY_INFINITE_QUERY);
              return _context4.abrupt("return", queryClient.prefetchInfiniteQuery(cacheKey, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee3() {
                var data;
                return _regeneratorRuntime__default['default'].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return caller.query.apply(caller, pathAndInput);

                      case 2:
                        data = _context3.sent;
                        return _context3.abrupt("return", data);

                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }))));

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function prefetchInfiniteQuery() {
      return _ref4.apply(this, arguments);
    };
  }();

  var fetchQuery = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee6() {
      var _len3,
          pathAndInput,
          _key3,
          path,
          input,
          cacheKey,
          _args6 = arguments;

      return _regeneratorRuntime__default['default'].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              for (_len3 = _args6.length, pathAndInput = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                pathAndInput[_key3] = _args6[_key3];
              }

              path = pathAndInput[0], input = pathAndInput[1];
              cacheKey = [path, input !== null && input !== void 0 ? input : null, getCacheKey.CACHE_KEY_QUERY];
              return _context6.abrupt("return", queryClient.fetchQuery(cacheKey, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee5() {
                var data;
                return _regeneratorRuntime__default['default'].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return caller.query.apply(caller, pathAndInput);

                      case 2:
                        data = _context5.sent;
                        return _context5.abrupt("return", data);

                      case 4:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }))));

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function fetchQuery() {
      return _ref6.apply(this, arguments);
    };
  }();

  var fetchInfiniteQuery = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee8() {
      var _len4,
          pathAndInput,
          _key4,
          cacheKey,
          _args8 = arguments;

      return _regeneratorRuntime__default['default'].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              for (_len4 = _args8.length, pathAndInput = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                pathAndInput[_key4] = _args8[_key4];
              }

              cacheKey = getCacheKey.getCacheKey(pathAndInput, getCacheKey.CACHE_KEY_INFINITE_QUERY);
              return _context8.abrupt("return", queryClient.fetchInfiniteQuery(cacheKey, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee7() {
                var data;
                return _regeneratorRuntime__default['default'].wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return caller.query.apply(caller, pathAndInput);

                      case 2:
                        data = _context7.sent;
                        return _context7.abrupt("return", data);

                      case 4:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }))));

            case 3:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function fetchInfiniteQuery() {
      return _ref8.apply(this, arguments);
    };
  }();

  function _dehydrate() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      shouldDehydrateQuery: function shouldDehydrateQuery() {
        // makes sure to serialize errors
        return true;
      }
    };
    var serialize = transformer ? ('input' in transformer ? transformer.input : transformer).serialize : function (obj) {
      return obj;
    };
    return serialize(hydration.dehydrate(queryClient, opts));
  }

  return {
    prefetchQuery: prefetchQuery,
    prefetchInfiniteQuery: prefetchInfiniteQuery,
    fetchQuery: fetchQuery,
    fetchInfiniteQuery: fetchInfiniteQuery,
    dehydrate: _dehydrate,
    queryClient: queryClient
  };
}

exports.createSSGHelpers = createSSGHelpers;
