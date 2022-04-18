import { RethinkableConfiguration, RethinkableInitFunction } from "./types";
export default function useRethinkable(init: RethinkableInitFunction, options?: RethinkableConfiguration): {
    cancel: () => void;
    response: Response | undefined;
    lazyInit: (() => void) | null;
    data?: any;
    error?: Error | undefined;
    loading: boolean;
};
