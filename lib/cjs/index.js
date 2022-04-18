"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var utilities_1 = require("./utilities");
function useUpdateStateByKey(state, updateState) {
    return function (key, value) {
        var _a;
        updateState(__assign(__assign({}, state), (_a = {}, _a[key] = value, _a)));
    };
}
function useRethinkable(init, options) {
    var _a = react_1.default.useState({
        loading: !(options === null || options === void 0 ? void 0 : options.lazy),
    }), state = _a[0], updateState = _a[1];
    var updateStateByKey = useUpdateStateByKey(state, updateState);
    var controller = react_1.default.useMemo(function () { return (options === null || options === void 0 ? void 0 : options.controller) || new AbortController(); }, []);
    var responseReference = react_1.default.useRef();
    function onErrorOccurred(data) {
        var _a;
        var error = (0, utilities_1.getError)(data);
        if (data.request) {
            responseReference.current = data;
        }
        updateState(__assign(__assign({}, state), { error: error, loading: false }));
        (_a = options === null || options === void 0 ? void 0 : options.onFailure) === null || _a === void 0 ? void 0 : _a.call(options, error);
    }
    function onFulfillment(data) {
        var _a;
        updateState(__assign(__assign({}, state), { data: data, loading: false }));
        (_a = options === null || options === void 0 ? void 0 : options.onSuccess) === null || _a === void 0 ? void 0 : _a.call(options, data);
    }
    function onCancellation() {
        var _a;
        controller.abort();
        (_a = options === null || options === void 0 ? void 0 : options.onCancel) === null || _a === void 0 ? void 0 : _a.call(options);
    }
    function process(response, didMounted) {
        var _a;
        var contentTypeHeader = (0, utilities_1.getContentTypeHeader)(response);
        var resultType = (0, utilities_1.figureResultTypeBasedOn)(contentTypeHeader);
        responseReference.current = response;
        (_a = response[resultType]) === null || _a === void 0 ? void 0 : _a.call(response).then(function (response) {
            return (0, utilities_1.handleRejection)({ didMounted: didMounted, data: response }, onFulfillment);
        }).catch(function (reason) {
            return (0, utilities_1.handleRejection)({ didMounted: didMounted, data: reason.response || reason }, onErrorOccurred);
        });
    }
    function lazyInit() {
        updateStateByKey("loading", true);
        init(controller)
            .then(function (response) {
            return (0, utilities_1.handleRejection)({ didMounted: true, data: response }, process);
        })
            .catch(function (reason) {
            return (0, utilities_1.handleRejection)({ didMounted: true, data: reason.response | reason }, process);
        });
    }
    react_1.default.useEffect(function () {
        var didMounted = true;
        if (!(options === null || options === void 0 ? void 0 : options.lazy)) {
            console.log("lazy mode");
            init(controller)
                .then(function (response) {
                console.log(response);
                (0, utilities_1.handleRejection)({ didMounted: didMounted, data: response }, process);
            })
                .catch(function (reason) {
                return (0, utilities_1.handleRejection)({ didMounted: didMounted, data: reason.response || reason }, process);
            });
        }
        if (options === null || options === void 0 ? void 0 : options.autoCancellationOnUnmount) {
            return function () {
                didMounted = false;
                if (!controller.signal.aborted) {
                    controller.abort();
                }
            };
        }
        return;
    }, []);
    return __assign(__assign({}, state), { cancel: onCancellation, response: responseReference.current, lazyInit: (options === null || options === void 0 ? void 0 : options.lazy) ? lazyInit : null });
}
exports.default = useRethinkable;
