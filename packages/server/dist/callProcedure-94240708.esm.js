function getMessageFromUnkownError(err, fallback) {
  if (typeof err === 'string') {
    return err;
  }

  if (err instanceof Error && typeof err.message === 'string') {
    return err.message;
  }

  return fallback;
}
function getErrorFromUnknown(originalError) {
  // this should ideally be an `instanceof TRPCError` but for some reason that isn't working
  // ref https://github.com/trpc/trpc/issues/331
  if (originalError instanceof Error && originalError.name === 'TRPCError') {
    return originalError;
  }

  const err = new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    originalError
  }); // take stack trace from originalError

  if (originalError instanceof Error) {
    err.stack = originalError.stack;
  }

  return err;
}

class TRPCError extends Error {
  constructor({
    message,
    code,
    originalError
  }) {
    super(message !== null && message !== void 0 ? message : getMessageFromUnkownError(originalError, code));
    this.originalError = void 0;
    this.code = void 0;
    this.code = code;
    this.originalError = originalError;
    this.name = 'TRPCError';
    Object.setPrototypeOf(this, new.target.prototype);
  }

}

async function callProcedure(opts) {
  const {
    type,
    path,
    input
  } = opts;
  const caller = opts.router.createCaller(opts.ctx);

  if (type === 'query') {
    return caller.query(path, input);
  }

  if (type === 'mutation') {
    return caller.mutation(path, input);
  }

  if (type === 'subscription') {
    const sub = await caller.subscription(path, input);
    return sub;
  }
  /* istanbul ignore next */


  throw new Error(`Unknown procedure type ${type}`);
}

export { TRPCError as T, callProcedure as c, getErrorFromUnknown as g };
