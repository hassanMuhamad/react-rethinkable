import { FALLBACK_VALUES, SPEC_HEADER_KEYS, SUPPORTED_CONTENT_TYPES, } from "./enumerations";
export function figureResultTypeBasedOn(contentType) {
    // Prioritize "application/json"
    if (contentType.includes("application/json")) {
        return SUPPORTED_CONTENT_TYPES.JSON;
    }
    var type_specification = contentType.split("/")[1];
    if (type_specification) {
        switch (type_specification) {
            case SUPPORTED_CONTENT_TYPES.RAW:
            case SUPPORTED_CONTENT_TYPES.JSON:
                return type_specification;
            case SUPPORTED_CONTENT_TYPES.DEFAULT:
            default:
                return SUPPORTED_CONTENT_TYPES.DEFAULT;
        }
    }
    return SUPPORTED_CONTENT_TYPES.DEFAULT;
}
export function handleRejection(_a, callback) {
    var data = _a.data, didMounted = _a.didMounted;
    if (didMounted)
        callback(data, didMounted);
    else
        Promise.resolve();
}
export function getContentTypeHeader(response) {
    var _a, _b;
    return (((_b = (_a = response.headers) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.call(_a, SPEC_HEADER_KEYS.CONTENT_TYPE)) ||
        FALLBACK_VALUES.CONTENT_TYPE);
}
export function Rethinkable(init, controller) {
    if (controller === void 0) { controller = new AbortController(); }
    var promise = init(controller);
    promise["cancel"] = function () { return controller.abort(); };
    return promise;
}
export function getError(data) {
    if (typeof data === "object" && "data" in data) {
        return data.data;
    }
    return data;
}
