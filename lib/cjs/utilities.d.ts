import { SUPPORTED_CONTENT_TYPES } from "./enumerations";
import { IEnhancedPromise, RejectionHandlerConfiguration, RethinkableInitFunction } from "./types";
export declare function figureResultTypeBasedOn(contentType: string): SUPPORTED_CONTENT_TYPES;
export declare function handleRejection({ data, didMounted }: RejectionHandlerConfiguration, callback: Function): void;
export declare function getContentTypeHeader(response: Response): string;
export declare function Rethinkable(init: RethinkableInitFunction, controller?: AbortController): IEnhancedPromise;
export declare function getError(data: any): any;
