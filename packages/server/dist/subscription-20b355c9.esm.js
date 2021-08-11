import { EventEmitter } from 'events';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class SubscriptionEventEmitter extends EventEmitter {}

class Subscription {
  constructor(callback) {
    this.events = void 0;
    this.callback = void 0;
    this.isDestroyed = void 0;
    this.isDestroyed = false;
    this.events = new SubscriptionEventEmitter();
    this.callback = callback;
  }

  destroy() {
    if (this.isDestroyed) {
      return;
    } // debug('Subscription.destroy()', reason);


    this.isDestroyed = true;
    this.events.emit('destroy');
    this.events.removeAllListeners();
  }

  async start() {
    /* istanbul ignore next */
    if (this.isDestroyed) {
      throw new Error('Called start() on a destroyed subscription');
    }

    try {
      const emit = {
        error: err => this.emitError(err),
        data: data => this.emitOutput(data)
      };
      const cancel = await this.callback(emit);

      if (this.isDestroyed
      /* istanbul ignore next */
      ) {
        cancel();
      } else {
        this.events.on('destroy', cancel);
      }
    } catch (err
    /* istanbul ignore next */
    ) {
      this.emitError(err);
    }
  }
  /* istanbul ignore next */

  /**
   * @deprecated This method is just here to help with `inferSubscriptionOutput` which I can't get working without it
   */


  output() {
    throw new Error('Not in use');
  }
  /**
   * Emit data
   */


  emitOutput(data) {
    this.events.emit('data', data);
  }
  /**
   * Emit error
   */


  emitError(err) {
    this.events.emit('error', err);
  }

  on(...args) {
    return this.events.on(...args);
  }

  off(...args) {
    return this.events.off(...args);
  }

}
function subscriptionPullFactory(opts) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timer;
  let stopped = false;

  async function _pull(emit) {
    /* istanbul ignore next */
    if (stopped) {
      return;
    }

    try {
      await opts.pull(emit);
    } catch (err
    /* istanbul ignore next */
    ) {
      emit.error(err);
    }
    /* istanbul ignore else */


    if (!stopped) {
      timer = setTimeout(() => _pull(emit), opts.intervalMs);
    }
  }

  return new Subscription(emit => {
    _pull(emit);

    return () => {
      clearTimeout(timer);
      stopped = true;
    };
  });
}

export { Subscription as S, subscriptionPullFactory as s };