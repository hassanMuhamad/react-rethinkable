"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FALLBACK_VALUES = exports.SPEC_HEADER_KEYS = exports.SUPPORTED_CONTENT_TYPES = void 0;
var SUPPORTED_CONTENT_TYPES;
(function (SUPPORTED_CONTENT_TYPES) {
    SUPPORTED_CONTENT_TYPES["JSON"] = "json";
    SUPPORTED_CONTENT_TYPES["RAW"] = "text";
    SUPPORTED_CONTENT_TYPES["DEFAULT"] = "blob";
})(SUPPORTED_CONTENT_TYPES = exports.SUPPORTED_CONTENT_TYPES || (exports.SUPPORTED_CONTENT_TYPES = {}));
var SPEC_HEADER_KEYS;
(function (SPEC_HEADER_KEYS) {
    SPEC_HEADER_KEYS["CONTENT_TYPE"] = "content-type";
})(SPEC_HEADER_KEYS = exports.SPEC_HEADER_KEYS || (exports.SPEC_HEADER_KEYS = {}));
var FALLBACK_VALUES;
(function (FALLBACK_VALUES) {
    FALLBACK_VALUES["CONTENT_TYPE"] = "default";
})(FALLBACK_VALUES = exports.FALLBACK_VALUES || (exports.FALLBACK_VALUES = {}));
