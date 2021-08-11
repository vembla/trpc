'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var react = require('@trpc/react');
var React = require('react');
var reactQuery = require('react-query');
var hydration = require('react-query/hydration');
var ssrPrepass = require('react-ssr-prepass');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var _regeneratorRuntime__default = /*#__PURE__*/_interopDefault(_regeneratorRuntime);
var React__default = /*#__PURE__*/_interopDefault(React);
var ssrPrepass__default = /*#__PURE__*/_interopDefault(ssrPrepass);

function withTRPC(opts) {
  var getClientConfig = opts.config,
      _opts$ssr = opts.ssr,
      ssr = _opts$ssr === void 0 ? false : _opts$ssr;
  return function (AppOrPage) {
    var trpc = react.createReactQueryHooks();

    var WithTRPC = function WithTRPC(props) {
      var _props$pageProps;

      var _useState = React.useState(function () {
        if (props.trpc) {
          return props.trpc;
        }

        var config = getClientConfig({});
        var queryClient = new reactQuery.QueryClient(config.queryClientConfig);
        var trpcClient = trpc.createClient(config);
        return {
          queryClient: queryClient,
          trpcClient: trpcClient,
          isPrepass: false
        };
      }),
          _useState2 = _slicedToArray(_useState, 1),
          _useState2$ = _useState2[0],
          queryClient = _useState2$.queryClient,
          trpcClient = _useState2$.trpcClient,
          isPrepass = _useState2$.isPrepass;

      var hydratedState = trpc.useDehydratedState(trpcClient, (_props$pageProps = props.pageProps) === null || _props$pageProps === void 0 ? void 0 : _props$pageProps.trpcState);
      return /*#__PURE__*/React__default['default'].createElement(trpc.Provider, {
        client: trpcClient,
        queryClient: queryClient,
        isPrepass: isPrepass
      }, /*#__PURE__*/React__default['default'].createElement(reactQuery.QueryClientProvider, {
        client: queryClient
      }, /*#__PURE__*/React__default['default'].createElement(hydration.Hydrate, {
        state: hydratedState
      }, /*#__PURE__*/React__default['default'].createElement(AppOrPage, props))));
    };

    if (AppOrPage.getInitialProps || ssr) {
      WithTRPC.getInitialProps = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee(appOrPageCtx) {
          var AppTree, isApp, ctx, isServer, pageProps, _originalProps$pagePr, originalProps, originalPageProps, getAppTreeProps, config, trpcClient, queryClient, trpcProp, prepassProps, appTreeProps;

          return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  AppTree = appOrPageCtx.AppTree; // Determine if we are wrapping an App component or a Page component.

                  isApp = !!appOrPageCtx.Component;
                  ctx = isApp ? appOrPageCtx.ctx : appOrPageCtx;
                  isServer = typeof window === 'undefined' && ssr; // Run the wrapped component's getInitialProps function.

                  pageProps = {};

                  if (!AppOrPage.getInitialProps) {
                    _context.next = 11;
                    break;
                  }

                  _context.next = 8;
                  return AppOrPage.getInitialProps(appOrPageCtx);

                case 8:
                  originalProps = _context.sent;
                  originalPageProps = isApp ? (_originalProps$pagePr = originalProps.pageProps) !== null && _originalProps$pagePr !== void 0 ? _originalProps$pagePr : {} : originalProps;
                  pageProps = _objectSpread(_objectSpread({}, originalPageProps), pageProps);

                case 11:
                  getAppTreeProps = function getAppTreeProps(props) {
                    return isApp ? {
                      pageProps: props
                    } : props;
                  };

                  if (!(typeof window !== 'undefined' || !ssr)) {
                    _context.next = 14;
                    break;
                  }

                  return _context.abrupt("return", getAppTreeProps(pageProps));

                case 14:
                  config = getClientConfig(isServer ? {
                    ctx: ctx
                  } : {});
                  trpcClient = react.createTRPCClient(config);
                  queryClient = new reactQuery.QueryClient(config.queryClientConfig);
                  trpcProp = {
                    config: config,
                    trpcClient: trpcClient,
                    queryClient: queryClient,
                    isPrepass: true
                  };
                  prepassProps = {
                    pageProps: pageProps,
                    trpc: trpcProp
                  }; // Run the prepass step on AppTree. This will run all trpc queries on the server.
                  // multiple prepass ensures that we can do batching on the server

                case 19:

                  _context.next = 22;
                  return ssrPrepass__default['default']( /*#__PURE__*/React.createElement(AppTree, prepassProps));

                case 22:
                  if (queryClient.isFetching()) {
                    _context.next = 24;
                    break;
                  }

                  return _context.abrupt("break", 28);

                case 24:
                  _context.next = 26;
                  return new Promise(function (resolve) {
                    var unsub = queryClient.getQueryCache().subscribe(function (event) {
                      if ((event === null || event === void 0 ? void 0 : event.query.getObserversCount()) === 0) {
                        resolve();
                        unsub();
                      }
                    });
                  });

                case 26:
                  _context.next = 19;
                  break;

                case 28:
                  // dehydrate query client's state and add it to the props
                  pageProps.trpcState = trpcClient.runtime.transformer.serialize(hydration.dehydrate(queryClient, {
                    shouldDehydrateQuery: function shouldDehydrateQuery() {
                      // makes sure errors are also dehydrated
                      return true;
                    }
                  }));
                  appTreeProps = getAppTreeProps(pageProps);
                  return _context.abrupt("return", appTreeProps);

                case 31:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }();
    }

    var displayName = AppOrPage.displayName || AppOrPage.name || 'Component';
    WithTRPC.displayName = "withTRPC(".concat(displayName, ")");
    return WithTRPC;
  };
}

exports.withTRPC = withTRPC;
