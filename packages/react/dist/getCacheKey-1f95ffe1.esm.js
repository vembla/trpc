import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';

var CACHE_KEY_INFINITE_QUERY = 'TRPC_INFINITE_QUERY'; // export const CACHE_KEY_LIVE_QUERY = 'TRPC_LIVE_QUERY' as const;

var CACHE_KEY_QUERY = 'TRPC_QUERY';

function getCacheKey(_ref, extras) {
  var _ref2 = _slicedToArray(_ref, 2),
      path = _ref2[0],
      input = _ref2[1];

  var cacheKey = [path, input !== null && input !== void 0 ? input : null];

  if (extras) {
    cacheKey.push(extras);
  }

  return cacheKey;
}

export { CACHE_KEY_QUERY as C, CACHE_KEY_INFINITE_QUERY as a, getCacheKey as g };
