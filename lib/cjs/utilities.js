"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getError = exports.Rethinkable = exports.getContentTypeHeader = exports.handleRejection = exports.figureResultTypeBasedOn = void 0;
var enumerations_1 = require("./enumerations");
function figureResultTypeBasedOn(contentType) {
    // Prioritize "application/json"
    if (contentType.includes("application/json")) {
        return enumerations_1.SUPPORTED_CONTENT_TYPES.JSON;
    }
    var type_specification = contentType.split("/")[1];
    if (type_specification) {
        switch (type_specification) {
            case enumerations_1.SUPPORTED_CONTENT_TYPES.RAW:
            case enumerations_1.SUPPORTED_CONTENT_TYPES.JSON:
                return type_specification;
            case enumerations_1.SUPPORTED_CONTENT_TYPES.DEFAULT:
            default:
                return enumerations_1.SUPPORTED_CONTENT_TYPES.DEFAULT;
        }
    }
    return enumerations_1.SUPPORTED_CONTENT_TYPES.DEFAULT;
}
exports.figureResultTypeBasedOn = figureResultTypeBasedOn;
function handleRejection(_a, callback) {
    var data = _a.data, didMounted = _a.didMounted;
    if (didMounted)
        callback(data, didMounted);
    else
        Promise.resolve();
}
exports.handleRejection = handleRejection;
function getContentTypeHeader(response) {
    var _a, _b;
    return (((_b = (_a = response.headers) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.call(_a, enumerations_1.SPEC_HEADER_KEYS.CONTENT_TYPE)) ||
        enumerations_1.FALLBACK_VALUES.CONTENT_TYPE);
}
exports.getContentTypeHeader = getContentTypeHeader;
function Rethinkable(init, controller) {
    if (controller === void 0) { controller = new AbortController(); }
    var promise = init(controller);
    promise["cancel"] = function () { return controller.abort(); };
    return promise;
}
exports.Rethinkable = Rethinkable;
function getError(data) {
    if (typeof data === "object" && "data" in data) {
        return data.data;
    }
    return data;
}
exports.getError = getError;
