export declare type RejectionHandlerConfiguration = {
    data: any;
    didMounted: boolean;
};
export declare type RethinkableInitFunction = (controller: AbortController) => Promise<any>;
export interface IEnhancedPromise extends Promise<any> {
    cancel: VoidFunction;
}
export declare type RethinkableConfiguration = {
    controller?: AbortController;
    lazy?: boolean;
    autoCancellationOnUnmount?: boolean;
    onCancel?: () => void;
    onSuccess?: (data: any) => void;
    onFailure?: (reason: any) => void;
};
