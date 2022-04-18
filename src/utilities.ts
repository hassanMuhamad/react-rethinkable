import {
    FALLBACK_VALUES,
    SPEC_HEADER_KEYS,
    SUPPORTED_CONTENT_TYPES,
} from "./enumerations";
import {
    IEnhancedPromise,
    RejectionHandlerConfiguration,
    RethinkableInitFunction,
} from "./types";

export function figureResultTypeBasedOn(contentType: string) {
    // Prioritize "application/json"
    if (contentType.includes("application/json")) {
        return SUPPORTED_CONTENT_TYPES.JSON;
    }

    const type_specification = contentType.split("/")[1];

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

export function handleRejection(
    { data, didMounted }: RejectionHandlerConfiguration,
    callback: Function
) {
    if (didMounted) callback(data, didMounted);
    else Promise.resolve();
}

export function getContentTypeHeader(response: Response): string {
    return (
        response.headers?.get?.(SPEC_HEADER_KEYS.CONTENT_TYPE) ||
        FALLBACK_VALUES.CONTENT_TYPE
    );
}

export function Rethinkable(
    init: RethinkableInitFunction,
    controller: AbortController = new AbortController()
): IEnhancedPromise {
    const promise = init(controller);

    (promise as IEnhancedPromise)["cancel"] = () => controller.abort();

    return promise as IEnhancedPromise;
}

export function getError(data: any) {
    if (typeof data === "object" && "data" in data) {
        return data.data;
    }

    return data;
}
