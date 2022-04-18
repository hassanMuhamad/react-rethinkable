import React from "react";
import {
    RethinkableConfiguration,
    RethinkableInitFunction,
} from "./types";
import {
    figureResultTypeBasedOn,
    getContentTypeHeader,
    getError,
    handleRejection,
} from "./utilities";

function useUpdateStateByKey(state: any, updateState: (next: any) => void) {
    return (key: string, value: any) => {
        updateState({
            ...state,
            [key]: value,
        });
    };
}

type State = {
    data?: any;
    error?: Error;
    loading: boolean;
};

export default function useRethinkable(
    init: RethinkableInitFunction,
    options?: RethinkableConfiguration
) {
    const [state, updateState] = React.useState<State>({
        loading: !options?.lazy,
    });

    const updateStateByKey = useUpdateStateByKey(state, updateState);

    const controller = React.useMemo(
        () => options?.controller || new AbortController(),
        []
    );

    const responseReference = React.useRef<Response>();

    function onErrorOccurred(data: any) {
        const error = getError(data);

        if (data.request) {
            responseReference.current = data;
        }

        updateState({
            ...state,
            error,
            loading: false,
        });

        options?.onFailure?.(error);
    }

    function onFulfillment(data: any) {
        updateState({
            ...state,
            data,
            loading: false,
        });

        options?.onSuccess?.(data);
    }

    function onCancellation() {
        controller.abort();
        options?.onCancel?.();
    }

    function process(response: Response, didMounted: boolean) {
        const contentTypeHeader = getContentTypeHeader(response);
        const resultType = figureResultTypeBasedOn(contentTypeHeader);

        responseReference.current = response;

        response[resultType]?.()
            .then((response) =>
                handleRejection({ didMounted, data: response }, onFulfillment)
            )
            .catch((reason) =>
                handleRejection(
                    { didMounted, data: reason.response || reason },
                    onErrorOccurred
                )
            );
    }

    function lazyInit() {
        updateStateByKey("loading", true);

        init(controller)
            .then((response: any) =>
                handleRejection({ didMounted: true, data: response }, process)
            )
            .catch((reason: any) =>
                handleRejection(
                    { didMounted: true, data: reason.response | reason },
                    process
                )
            );
    }

    React.useEffect(() => {
        let didMounted = true;

        if (!options?.lazy) {
            console.log("lazy mode");
            init(controller)
                .then((response) => {
                    console.log(response);
                    handleRejection({ didMounted, data: response }, process);
                })
                .catch((reason: any) =>
                    handleRejection(
                        { didMounted, data: reason.response || reason },
                        process
                    )
                );
        }

        if (options?.autoCancellationOnUnmount) {
            return () => {
                didMounted = false;

                if (!controller.signal.aborted) {
                    controller.abort();
                }
            };
        }

        return;
    }, []);

    return {
        ...state,
        cancel: onCancellation,
        response: responseReference.current,
        lazyInit: options?.lazy ? lazyInit : null,
    };
}
