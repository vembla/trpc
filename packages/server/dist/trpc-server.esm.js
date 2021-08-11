import { r as requestHandler } from './index-a273ce95.esm.js';
export { a as assertNotBrowser, r as requestHandler } from './index-a273ce95.esm.js';
export { R as Router, r as router } from './router-74aeea7f.esm.js';
export { S as Subscription, s as subscriptionPullFactory } from './subscription-20b355c9.esm.js';
import http from 'http';
import url from 'url';
import { T as TRPCError } from './callProcedure-94240708.esm.js';
export { T as TRPCError } from './callProcedure-94240708.esm.js';
import './codes-02fc3a5f.esm.js';
import 'events';

/* istanbul ignore next */

/**
 * @deprecated
 */

const httpError = {
  /**
   * @deprecated use `new TRPCError({ code: 'FORBIDDEN', message: '... })`
   */
  forbidden: message => new TRPCError({
    message,
    code: 'FORBIDDEN'
  }),

  /**
   * @deprecated use `new TRPCError({ code: 'UNAUTHORIZED', message: '... })`
   */
  unauthorized: message => new TRPCError({
    message,
    code: 'UNAUTHORIZED'
  }),

  /**
   * @deprecated use `new TRPCError({ code: 'BAD_REQUEST', message: '... })`
   */
  badRequest: message => new TRPCError({
    message,
    code: 'BAD_REQUEST'
  }),

  /**
   * @deprecated use `new TRPCError({ code: 'METHOD_NOT_FOUND', message: '... })`
   */
  notFound: message => new TRPCError({
    message,
    code: 'PATH_NOT_FOUND'
  })
};

/* eslint-disable @typescript-eslint/no-non-null-assertion */
function createHttpHandler(opts) {
  return async (req, res) => {
    const endpoint = url.parse(req.url).pathname.substr(1);
    await requestHandler({ ...opts,
      req,
      res,
      path: endpoint
    });
  };
}
function createHttpServer(opts) {
  const handler = createHttpHandler(opts);
  const server = http.createServer((req, res) => handler(req, res));
  return {
    server,

    listen(port) {
      server.listen(port);
      const actualPort = port === 0 ? server.address().port : port;
      return {
        port: actualPort
      };
    }

  };
}

export { createHttpHandler, createHttpServer, httpError };
