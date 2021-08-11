import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import _wrapNativeSuper from '@babel/runtime/helpers/esm/wrapNativeSuper';

var TRPCClientError = /*#__PURE__*/function (_Error) {
  _inherits(TRPCClientError, _Error);

  var _super = /*#__PURE__*/_createSuper(TRPCClientError);

  /**
   * Fatal error - expect no more results after this error
   * Used for when WebSockets disconnect prematurely.
   */
  function TRPCClientError(message, _ref) {
    var _this;

    var originalError = _ref.originalError,
        _ref$isDone = _ref.isDone,
        isDone = _ref$isDone === void 0 ? false : _ref$isDone,
        result = _ref.result;

    _classCallCheck(this, TRPCClientError);

    _this = _super.call(this, message);
    _this.originalError = void 0;
    _this.shape = void 0;
    _this.isDone = void 0;
    _this.isDone = isDone;
    _this.message = message;
    _this.originalError = originalError;
    _this.shape = result === null || result === void 0 ? void 0 : result.error;
    _this.name = 'TRPCClientError';
    _this.name = 'TRPCClientError';
    Object.setPrototypeOf(_assertThisInitialized(_this), TRPCClientError.prototype);
    return _this;
  }

  _createClass(TRPCClientError, null, [{
    key: "from",
    value: function from(result) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!(result instanceof Error)) {
        var _message;

        return new TRPCClientError((_message = result.error.message) !== null && _message !== void 0 ? _message : '', _objectSpread(_objectSpread({}, opts), {}, {
          originalError: null,
          result: result
        }));
      }

      if (result.name === 'TRPCClientError') {
        return result;
      }

      return new TRPCClientError(result.message, _objectSpread(_objectSpread({}, opts), {}, {
        originalError: result,
        result: null
      }));
    }
  }]);

  return TRPCClientError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

export { TRPCClientError as T };
