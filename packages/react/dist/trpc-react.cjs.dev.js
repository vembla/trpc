'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var client = require('@trpc/client');
var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var React = require('react');
var reactQuery = require('react-query');
var getCacheKey = require('./getCacheKey-e84b8513.cjs.dev.js');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

var TRPCContext = /*#__PURE__*/React.createContext(null);

function getArgs(pathAndInput, opts) {
  var _pathAndInput = _slicedToArray(pathAndInput, 2),
      path = _pathAndInput[0],
      input = _pathAndInput[1];

  return [path, input, opts];
}

function createReactQueryHooks() {
  var Context = TRPCContext;

  function createClient(opts) {
    return client.createTRPCClient(opts);
  }

  function TRPCProvider(_ref) {
    var client = _ref.client,
        queryClient = _ref.queryClient,
        children = _ref.children,
        _ref$isPrepass = _ref.isPrepass,
        isPrepass = _ref$isPrepass === void 0 ? false : _ref$isPrepass;
    return /*#__PURE__*/React__default['default'].createElement(Context.Provider, {
      value: {
        queryClient: queryClient,
        client: client,
        isPrepass: isPrepass,
        fetchQuery: React.useCallback(function (pathAndInput, opts) {
          var cacheKey = getCacheKey.getCacheKey(pathAndInput, getCacheKey.CACHE_KEY_QUERY);
          return queryClient.fetchQuery(cacheKey, function () {
            var _ref2;

            return (_ref2 = client).query.apply(_ref2, _toConsumableArray(getArgs(pathAndInput, opts)));
          }, opts);
        }, [client, queryClient]),
        fetchInfiniteQuery: React.useCallback(function (pathAndInput, opts) {
          var cacheKey = getCacheKey.getCacheKey(pathAndInput, getCacheKey.CACHE_KEY_INFINITE_QUERY);
          return queryClient.fetchInfiniteQuery(cacheKey, function () {
            var _ref3;

            return (_ref3 = client).query.apply(_ref3, _toConsumableArray(getArgs(pathAndInput, opts)));
          }, opts);
        }, [client, queryClient]),
        prefetchQuery: React.useCallback(function (pathAndInput, opts) {
          var cacheKey = getCacheKey.getCacheKey(pathAndInput, getCacheKey.CACHE_KEY_QUERY);
          return queryClient.prefetchQuery(cacheKey, function () {
            var _ref4;

            return (_ref4 = client).query.apply(_ref4, _toConsumableArray(getArgs(pathAndInput, opts)));
          }, opts);
        }, [client, queryClient]),
        prefetchInfiniteQuery: React.useCallback(function (pathAndInput, opts) {
          var cacheKey = getCacheKey.getCacheKey(pathAndInput, getCacheKey.CACHE_KEY_INFINITE_QUERY);
          return queryClient.prefetchInfiniteQuery(cacheKey, function () {
            var _ref5;

            return (_ref5 = client).query.apply(_ref5, _toConsumableArray(getArgs(pathAndInput, opts)));
          }, opts);
        }, [client, queryClient]),
        invalidateQuery: React.useCallback(function (pathAndInput) {
          return queryClient.invalidateQueries(pathAndInput);
        }, [queryClient]),
        cancelQuery: React.useCallback(function (pathAndInput) {
          return queryClient.cancelQueries(pathAndInput);
        }, [queryClient]),
        setQueryData: React.useCallback(function (pathAndInput, output) {
          var cacheKey = getCacheKey.getCacheKey(pathAndInput);
          queryClient.setQueryData(cacheKey.concat([getCacheKey.CACHE_KEY_QUERY]), output);
          queryClient.setQueryData(cacheKey.concat([getCacheKey.CACHE_KEY_INFINITE_QUERY]), output);
        }, [queryClient]),
        getQueryData: React.useCallback(function (pathAndInput) {
          var cacheKey = getCacheKey.getCacheKey(pathAndInput);
          return queryClient.getQueryData(cacheKey.concat(getCacheKey.CACHE_KEY_QUERY));
        }, [queryClient])
      }
    }, children);
  }

  function useContext() {
    return React__default['default'].useContext(Context);
  }

  function _useQuery(pathAndInput, opts) {
    var cacheKey = getCacheKey.getCacheKey(pathAndInput, getCacheKey.CACHE_KEY_QUERY);

    var _useContext = useContext(),
        client = _useContext.client,
        isPrepass = _useContext.isPrepass,
        queryClient = _useContext.queryClient,
        fetchQuery = _useContext.fetchQuery;

    if (typeof window === 'undefined' && isPrepass && (opts === null || opts === void 0 ? void 0 : opts.ssr) !== false && (opts === null || opts === void 0 ? void 0 : opts.enabled) !== false && !queryClient.getQueryCache().find(cacheKey)) {
      fetchQuery(pathAndInput, opts);
    }

    var query = reactQuery.useQuery(cacheKey, function () {
      var _ref6;

      return (_ref6 = client).query.apply(_ref6, _toConsumableArray(getArgs(pathAndInput, opts)));
    }, opts);
    return query;
  }

  function _useMutation(path, opts) {
    var client = useContext().client;
    var hook = reactQuery.useMutation(function (input) {
      return client.mutation(path, input);
    }, opts);
    return hook;
  }
  /* istanbul ignore next */

  /**
   * ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
   *  **Experimental.** API might change without major version bump
   * ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠
   */


  function useSubscription(pathAndInput, opts) {
    var _opts$enabled;

    var enabled = (_opts$enabled = opts === null || opts === void 0 ? void 0 : opts.enabled) !== null && _opts$enabled !== void 0 ? _opts$enabled : true;
    var queryKey = reactQuery.hashQueryKey(pathAndInput);
    var client = useContext().client;
    return React.useEffect(function () {
      if (!enabled) {
        return;
      }

      var _pathAndInput2 = _slicedToArray(pathAndInput, 2),
          path = _pathAndInput2[0],
          input = _pathAndInput2[1];

      var isStopped = false;
      var unsub = client.subscription(path, input !== null && input !== void 0 ? input : undefined, {
        onError: function onError(err) {
          if (!isStopped) {
            var _opts$onError;

            (_opts$onError = opts.onError) === null || _opts$onError === void 0 ? void 0 : _opts$onError.call(opts, err);
          }
        },
        onNext: function onNext(res) {
          if (res.type === 'data' && !isStopped) {
            opts.onNext(res.data);
          }
        }
      });
      return function () {
        isStopped = true;
        unsub();
      }; // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryKey, enabled]);
  }

  function _useInfiniteQuery(pathAndInput, // FIXME: this typing is wrong but it works
  opts) {
    var _useContext2 = useContext(),
        client = _useContext2.client,
        isPrepass = _useContext2.isPrepass,
        fetchInfiniteQuery = _useContext2.fetchInfiniteQuery,
        queryClient = _useContext2.queryClient;

    var cacheKey = getCacheKey.getCacheKey(pathAndInput, getCacheKey.CACHE_KEY_INFINITE_QUERY);

    var _pathAndInput3 = _slicedToArray(pathAndInput, 2),
        path = _pathAndInput3[0],
        input = _pathAndInput3[1];

    if (typeof window === 'undefined' && isPrepass && (opts === null || opts === void 0 ? void 0 : opts.ssr) !== false && (opts === null || opts === void 0 ? void 0 : opts.enabled) !== false && !queryClient.getQueryCache().find(cacheKey)) {
      fetchInfiniteQuery(pathAndInput, opts);
    }

    var query = reactQuery.useInfiniteQuery(cacheKey, function (_ref7) {
      var pageParam = _ref7.pageParam;

      var actualInput = _objectSpread(_objectSpread({}, input), {}, {
        cursor: pageParam
      });

      return client.query(path, actualInput);
    }, opts);
    return query;
  }

  function useDehydratedState(client, trpcState) {
    var transformed = React.useMemo(function () {
      if (!trpcState) {
        return trpcState;
      }

      return client.runtime.transformer.deserialize(trpcState);
    }, [client, trpcState]);
    return transformed;
  }

  return {
    Provider: TRPCProvider,
    createClient: createClient,
    useContext: useContext,
    useQuery: _useQuery,
    useMutation: _useMutation,
    useSubscription: useSubscription,
    useDehydratedState: useDehydratedState,
    useInfiniteQuery: _useInfiniteQuery
  };
}

exports.createReactQueryHooks = createReactQueryHooks;
Object.keys(client).forEach(function (k) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return client[k];
    }
  });
});
