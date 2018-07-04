import asyncify from '../asyncify';

var supportsSymbol = typeof Symbol === 'function';

function isAsync(fn) {
    return supportsSymbol && fn[Symbol.toStringTag] === 'AsyncFunction';
}

function wrapAsync(asyncFn) {
    const wrapAsyncFn = function() {
        try {
            asyncFn.apply(null, arguments);
        } catch (error) {
            const callback = arguments[arguments.length - 1];
            callback(error);
        }
    };
    return isAsync(asyncFn) ? (0, _asyncify2.default)(wrapAsyncFn) : wrapAsyncFn;
}

export default wrapAsync;

export { isAsync };
