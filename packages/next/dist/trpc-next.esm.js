import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { createReactQueryHooks, createTRPCClient } from '@trpc/react';
import React, { useState, createElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate, dehydrate } from 'react-query/hydration';
import ssrPrepass from 'react-ssr-prepass';

function withTRPC(opts) {
  var getClientConfig = opts.config,
      _opts$ssr = opts.ssr,
      ssr = _opts$ssr === void 0 ? false : _opts$ssr;
  return function (AppOrPage) {
    var trpc = createReactQueryHooks();

    var WithTRPC = function WithTRPC(props) {
      var _props$pageProps;

      var _useState = useState(function () {
        if (props.trpc) {
          return props.trpc;
        }

        var config = getClientConfig({});
        var queryClient = new QueryClient(config.queryClientConfig);
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
      return /*#__PURE__*/React.createElement(trpc.Provider, {
        client: trpcClient,
        queryClient: queryClient,
        isPrepass: isPrepass
      }, /*#__PURE__*/React.createElement(QueryClientProvider, {
        client: queryClient
      }, /*#__PURE__*/React.createElement(Hydrate, {
        state: hydratedState
      }, /*#__PURE__*/React.createElement(AppOrPage, props))));
    };

    if (AppOrPage.getInitialProps || ssr) {
      WithTRPC.getInitialProps = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(appOrPageCtx) {
          var AppTree, isApp, ctx, isServer, pageProps, _originalProps$pagePr, originalProps, originalPageProps, getAppTreeProps, config, trpcClient, queryClient, trpcProp, prepassProps, appTreeProps;

          return _regeneratorRuntime.wrap(function _callee$(_context) {
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
                  trpcClient = createTRPCClient(config);
                  queryClient = new QueryClient(config.queryClientConfig);
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
                  return ssrPrepass( /*#__PURE__*/createElement(AppTree, prepassProps));

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
                  pageProps.trpcState = trpcClient.runtime.transformer.serialize(dehydrate(queryClient, {
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

export { withTRPC };
