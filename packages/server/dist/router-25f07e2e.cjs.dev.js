'use strict';

var index = require('./index-e4015f05.cjs.dev.js');
var callProcedure = require('./callProcedure-ae40050c.cjs.dev.js');
var codes = require('./codes-ae6b5aa8.cjs.dev.js');

/* eslint-disable @typescript-eslint/no-explicit-any */
index.assertNotBrowser();

function getParseFn(inputParser) {
  const parser = inputParser;

  if (typeof parser === 'function') {
    return parser;
  }

  if (typeof parser.parse === 'function') {
    return parser.parse.bind(parser);
  }

  if (typeof parser.validateSync === 'function') {
    return parser.validateSync.bind(parser);
  }

  throw new Error('Could not find a validator fn');
}

class Procedure {
  constructor(opts) {
    this.middlewares = void 0;
    this.resolver = void 0;
    this.inputParser = void 0;
    this.parse = void 0;
    this.middlewares = opts.middlewares;
    this.resolver = opts.resolver;
    this.inputParser = opts.inputParser;
    this.parse = getParseFn(this.inputParser);
  }

  parseInput(rawInput) {
    try {
      return this.parse(rawInput);
    } catch (originalError) {
      throw new callProcedure.TRPCError({
        code: 'BAD_REQUEST',
        originalError
      });
    }
  }
  /**
   * Trigger middlewares in order, parse raw input & call resolver
   */


  async call({
    ctx,
    input: rawInput,
    type,
    path
  }) {
    for (const middleware of this.middlewares) {
      await middleware({
        ctx,
        type,
        path
      });
    }

    const input = this.parseInput(rawInput);
    const output = await this.resolver({
      ctx,
      input,
      type
    });
    return output;
  }
  /**
   * Create new procedure with passed middlewares
   * @param middlewares
   */


  inheritMiddlewares(middlewares) {
    const Constructor = this.constructor;
    const instance = new Constructor({
      middlewares: [...middlewares, ...this.middlewares],
      resolver: this.resolver,
      inputParser: this.inputParser
    });
    return instance;
  }

}
class ProcedureWithoutInput extends Procedure {}
class ProcedureWithInput extends Procedure {}

function isProcedureWithInput(opts) {
  return !!opts.input;
}

function createProcedure(opts) {
  if (isProcedureWithInput(opts)) {
    return new ProcedureWithInput({
      inputParser: opts.input,
      resolver: opts.resolve,
      middlewares: []
    });
  }

  return new ProcedureWithoutInput({
    resolver: opts.resolve,
    middlewares: [],

    inputParser(input) {
      if (input != null) {
        throw new callProcedure.TRPCError({
          code: 'BAD_REQUEST',
          message: 'No input expected'
        });
      }

      return undefined;
    }

  });
}

/* eslint-disable @typescript-eslint/ban-types */
index.assertNotBrowser();

function getDataTransformer(transformer) {
  if ('input' in transformer) {
    return transformer;
  }

  return {
    input: transformer,
    output: transformer
  };
}

const PROCEDURE_DEFINITION_MAP = {
  query: 'queries',
  mutation: 'mutations',
  subscription: 'subscriptions'
};

function safeObject(...args) {
  return Object.assign(Object.create(null), ...args);
}

const defaultFormatter = ({
  shape
}) => {
  return shape;
};

const defaultTransformer = {
  input: {
    serialize: obj => obj,
    deserialize: obj => obj
  },
  output: {
    serialize: obj => obj,
    deserialize: obj => obj
  }
};
class Router {
  constructor(def) {
    var _def$queries, _def$mutations, _def$subscriptions, _def$middlewares, _def$errorFormatter, _def$transformer;

    this._def = void 0;
    this._def = {
      queries: (_def$queries = def === null || def === void 0 ? void 0 : def.queries) !== null && _def$queries !== void 0 ? _def$queries : safeObject(),
      mutations: (_def$mutations = def === null || def === void 0 ? void 0 : def.mutations) !== null && _def$mutations !== void 0 ? _def$mutations : safeObject(),
      subscriptions: (_def$subscriptions = def === null || def === void 0 ? void 0 : def.subscriptions) !== null && _def$subscriptions !== void 0 ? _def$subscriptions : safeObject(),
      middlewares: (_def$middlewares = def === null || def === void 0 ? void 0 : def.middlewares) !== null && _def$middlewares !== void 0 ? _def$middlewares : [],
      errorFormatter: (_def$errorFormatter = def === null || def === void 0 ? void 0 : def.errorFormatter) !== null && _def$errorFormatter !== void 0 ? _def$errorFormatter : defaultFormatter,
      transformer: (_def$transformer = def === null || def === void 0 ? void 0 : def.transformer) !== null && _def$transformer !== void 0 ? _def$transformer : defaultTransformer
    };
  }

  static prefixProcedures(procedures, prefix) {
    const eps = safeObject();

    for (const key in procedures) {
      eps[prefix + key] = procedures[key];
    }

    return eps;
  }

  query(path, procedure) {
    const router = new Router({
      queries: safeObject({
        [path]: createProcedure(procedure)
      })
    });
    return this.merge(router);
  }

  mutation(path, procedure) {
    const router = new Router({
      mutations: safeObject({
        [path]: createProcedure(procedure)
      })
    });
    return this.merge(router);
  }
  /**
   * ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
   *  **Experimental.** API might change without major version bump
   * ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠
   */


  subscription(path, procedure) {
    const router = new Router({
      subscriptions: safeObject({
        [path]: createProcedure(procedure)
      })
    });
    return this.merge(router);
  }
  /**
   * Merge router with other router
   * @param router
   */


  merge(prefixOrRouter, maybeRouter) {
    let prefix = '';
    let childRouter;

    if (typeof prefixOrRouter === 'string' && maybeRouter instanceof Router) {
      prefix = prefixOrRouter;
      childRouter = maybeRouter;
    } else if (prefixOrRouter instanceof Router) {
      childRouter = prefixOrRouter;
    }
    /* istanbul ignore next */
    else {
      throw new Error('Invalid args');
    }

    const duplicateQueries = Object.keys(childRouter._def.queries).filter(key => !!this._def['queries'][prefix + key]);
    const duplicateMutations = Object.keys(childRouter._def.mutations).filter(key => !!this._def['mutations'][prefix + key]);
    const duplicateSubscriptions = Object.keys(childRouter._def.subscriptions).filter(key => !!this._def['subscriptions'][prefix + key]);
    const duplicates = [...duplicateQueries, ...duplicateMutations, ...duplicateSubscriptions];
    /* istanbul ignore next */

    if (duplicates.length) {
      throw new Error(`Duplicate endpoint(s): ${duplicates.join(', ')}`);
    }

    const mergeProcedures = defs => {
      const newDefs = safeObject();

      for (const key in defs) {
        const procedure = defs[key];
        const newProcedure = procedure.inheritMiddlewares(this._def.middlewares);
        newDefs[key] = newProcedure;
      }

      return Router.prefixProcedures(newDefs, prefix);
    };

    return new Router({
      queries: safeObject(this._def.queries, mergeProcedures(childRouter._def.queries)),
      mutations: safeObject(this._def.mutations, mergeProcedures(childRouter._def.mutations)),
      subscriptions: safeObject(this._def.subscriptions, mergeProcedures(childRouter._def.subscriptions)),
      middlewares: this._def.middlewares,
      errorFormatter: this._def.errorFormatter,
      transformer: this._def.transformer
    });
  }
  /**
   * Invoke procedure. Only for internal use within library.
   */


  async invoke({
    type,
    path,
    ctx,
    input
  }) {
    const defTarget = PROCEDURE_DEFINITION_MAP[type];
    const defs = this._def[defTarget];
    const procedure = defs[path];

    if (!procedure) {
      throw new callProcedure.TRPCError({
        code: 'PATH_NOT_FOUND',
        message: `No "${type}"-procedure on path "${path}"`
      });
    }

    return procedure.call({
      ctx,
      input,
      type,
      path
    });
  }

  createCaller(ctx) {
    return {
      query: (path, ...args) => {
        return this.invoke({
          type: 'query',
          ctx,
          path,
          input: args[0]
        });
      },
      mutation: (path, ...args) => {
        return this.invoke({
          type: 'mutation',
          ctx,
          path,
          input: args[0]
        });
      },
      subscription: (path, ...args) => {
        return this.invoke({
          type: 'subscription',
          ctx,
          path,
          input: args[0]
        });
      }
    };
  }
  /**
   * Function to be called before any procedure is invoked
   * Can be async or sync
   * @link https://trpc.io/docs/middlewares
   */


  middleware(middleware) {
    return new Router({ ...this._def,
      middlewares: [...this._def.middlewares, middleware]
    });
  }
  /**
   * Format errors
   * @link https://trpc.io/docs/error-formatting
   */


  formatError(errorFormatter) {
    if (this._def.errorFormatter !== defaultFormatter) {
      throw new Error('You seem to have double `formatError()`-calls in your router tree');
    }

    return new Router({ ...this._def,
      errorFormatter
    });
  }

  getErrorShape(opts) {
    const {
      path,
      error
    } = opts;
    const {
      code
    } = opts.error;
    const shape = {
      message: error.message,
      code: codes.TRPC_ERROR_CODES_BY_KEY[code],
      data: {
        code
      }
    };

    if (process.env.NODE_ENV !== 'production' && typeof opts.error.stack === 'string') {
      shape.data.stack = opts.error.stack;
    }

    if (typeof path === 'string') {
      shape.data.path = path;
    }

    return this._def.errorFormatter({ ...opts,
      shape
    });
  }
  /**
   * Add data transformer to serialize/deserialize input args + output
   * @link https://trpc.io/docs/data-transformers
   */


  transformer(_transformer) {
    const transformer = getDataTransformer(_transformer);

    if (this._def.transformer !== defaultTransformer) {
      throw new Error('You seem to have double `transformer()`-calls in your router tree');
    }

    return new Router({ ...this._def,
      transformer
    });
  }

}
function router() {
  return new Router();
}

exports.Router = Router;
exports.router = router;
