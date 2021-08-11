'use strict';

var url = require('url');
var callProcedure = require('./callProcedure-2adb03c7.cjs.prod.js');
var codes = require('./codes-573d1c50.cjs.prod.js');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var url__default = /*#__PURE__*/_interopDefault(url);

/* istanbul ignore file */
function assertNotBrowser() {
  if (typeof window !== 'undefined' &&         "production" !== 'test' && process.env.JEST_WORKER_ID === undefined) {
    throw new Error('Imported server-only code in the broowser');
  }
}

const TRPC_ERROR_CODES_BY_NUMBER = /*#__PURE__*/codes.invert(codes.TRPC_ERROR_CODES_BY_KEY);
const JSONRPC2_TO_HTTP_CODE = {
  PARSE_ERROR: 400,
  BAD_REQUEST: 400,
  METHOD_NOT_FOUND: 405,
  PATH_NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  TIMEOUT: 408,
  CLIENT_CLOSED_REQUEST: 499,
  PAYLOAD_TOO_LARGE: 413,
  METHOD_NOT_SUPPORTED: 405
};
function getHTTPStatusCode(json, transformer) {
  var _JSONRPC2_TO_HTTP_COD;

  const arr = Array.isArray(json) ? json : [json];
  const codes = new Set(arr.map(res => {
    if ('error' in res) {
      return transformer.output.deserialize(res.error).code;
    }

    return 200;
  }));

  if (codes.size !== 1) {
    return 207;
  }

  const code = codes.values().next().value;

  if (code === 200) {
    return 200;
  }

  const key = TRPC_ERROR_CODES_BY_NUMBER[code];
  const res = (_JSONRPC2_TO_HTTP_COD = JSONRPC2_TO_HTTP_CODE[key]) !== null && _JSONRPC2_TO_HTTP_COD !== void 0 ? _JSONRPC2_TO_HTTP_COD : 500;
  return res;
}

async function getPostBody({
  req,
  maxBodySize
}) {
  return new Promise((resolve, reject) => {
    if (req.hasOwnProperty('body')) {
      resolve(req.body);
      return;
    }

    let body = '';
    req.on('data', function (data) {
      body += data;

      if (typeof maxBodySize === 'number' && body.length > maxBodySize) {
        reject(new callProcedure.TRPCError({
          code: 'PAYLOAD_TOO_LARGE'
        }));
        req.socket.destroy();
      }
    });
    req.on('end', () => {
      try {
        if (body === '') {
          resolve(undefined);
          return;
        }

        const json = JSON.parse(body);
        resolve(json);
      } catch (err) {
        reject(new callProcedure.TRPCError({
          code: 'PARSE_ERROR'
        }));
      }
    });
  });
}

function getQueryInput(query) {
  const queryInput = query.input;

  if (!queryInput) {
    return undefined;
  }

  try {
    return JSON.parse(queryInput);
  } catch (originalError) {
    throw new callProcedure.TRPCError({
      code: 'BAD_REQUEST',
      originalError
    });
  }
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
assertNotBrowser();
const HTTP_METHOD_PROCEDURE_TYPE_MAP = {
  GET: 'query',
  POST: 'mutation',
  PATCH: 'subscription'
};
/**
 * Resolve input from request
 */

async function getRequestParams({
  req,
  type,
  maxBodySize
}) {
  if (type === 'query') {
    const query = req.query ? req.query : url__default['default'].parse(req.url, true).query;
    const input = getQueryInput(query);
    return {
      input
    };
  }

  const body = await getPostBody({
    req,
    maxBodySize
  });
  /**
   * @deprecated TODO delete me for next major
   * */

  if (body && typeof body === 'object' && 'input' in body && Object.keys(body).length === 1) {
    // legacy format
    return {
      input: body.input
    };
  }

  return {
    input: body
  };
}

async function requestHandler(opts) {
  var _opts$batching$enable, _opts$batching, _HTTP_METHOD_PROCEDUR;

  const {
    req,
    res,
    createContext,
    teardown,
    onError,
    maxBodySize,
    router
  } = opts;
  const batchingEnabled = (_opts$batching$enable = (_opts$batching = opts.batching) === null || _opts$batching === void 0 ? void 0 : _opts$batching.enabled) !== null && _opts$batching$enable !== void 0 ? _opts$batching$enable : true;

  if (req.method === 'HEAD') {
    // can be used for lambda warmup
    res.statusCode = 204;
    res.end();
    return;
  }

  const type = (_HTTP_METHOD_PROCEDUR = HTTP_METHOD_PROCEDURE_TYPE_MAP[req.method]) !== null && _HTTP_METHOD_PROCEDUR !== void 0 ? _HTTP_METHOD_PROCEDUR : 'unknown';
  let input = undefined;
  let ctx = undefined;
  const reqQueryParams = req.query ? req.query : url__default['default'].parse(req.url, true).query;
  const isBatchCall = reqQueryParams.batch;

  function endResponse(json) {
    res.statusCode = getHTTPStatusCode(json, router._def.transformer);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(json));
  }

  try {
    if (isBatchCall && !batchingEnabled) {
      throw new Error(`Batching is not enabled on the server`);
    }

    if (type === 'unknown' || type === 'subscription') {
      throw new callProcedure.TRPCError({
        message: `Unexpected request method ${req.method}`,
        code: 'METHOD_NOT_SUPPORTED'
      });
    }

    const {
      input: rawInput
    } = await getRequestParams({
      maxBodySize,
      req,
      type
    });
    input = rawInput !== undefined ? router._def.transformer.input.deserialize(rawInput) : undefined;
    ctx = await (createContext === null || createContext === void 0 ? void 0 : createContext({
      req,
      res
    }));

    const getInputs = () => {
      if (!isBatchCall) {
        return [input];
      } // TODO - next major, delete `Array.isArray()`


      if (!Array.isArray(input) && (typeof input !== 'object' || input == null)) {
        throw new callProcedure.TRPCError({
          code: 'BAD_REQUEST',
          message: '"input" needs to be an array or object when doing a batch call'
        });
      }

      return input;
    };

    const inputs = getInputs();
    const paths = isBatchCall ? opts.path.split(',') : [opts.path];
    const results = await Promise.all(paths.map(async (path, index) => {
      const id = null;

      try {
        const output = await callProcedure.callProcedure({
          ctx,
          router,
          path,
          input: inputs[index],
          type
        });
        const json = {
          id,
          result: {
            type: 'data',
            data: router._def.transformer.output.serialize(output)
          }
        };
        return json;
      } catch (_err) {
        const error = callProcedure.getErrorFromUnknown(_err);
        const json = {
          id,
          error: router._def.transformer.output.serialize(router.getErrorShape({
            error,
            type,
            path,
            input,
            ctx
          }))
        };
        onError === null || onError === void 0 ? void 0 : onError({
          error,
          path,
          input,
          ctx,
          type: type,
          req
        });
        return json;
      }
    }));
    const result = isBatchCall ? results : results[0];
    endResponse(result);
  } catch (_err) {
    const error = callProcedure.getErrorFromUnknown(_err);
    const json = {
      id: -1,
      error: router._def.transformer.output.serialize(router.getErrorShape({
        error,
        type,
        path: undefined,
        input,
        ctx
      }))
    };
    endResponse(json);
    onError === null || onError === void 0 ? void 0 : onError({
      error,
      path: undefined,
      input,
      ctx,
      type: type,
      req
    });
  }

  await (teardown === null || teardown === void 0 ? void 0 : teardown());
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
assertNotBrowser();

exports.assertNotBrowser = assertNotBrowser;
exports.requestHandler = requestHandler;
