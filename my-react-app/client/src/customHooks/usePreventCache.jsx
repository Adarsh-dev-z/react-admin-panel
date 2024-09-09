import { useEffect } from "react";

const usePreventCache = () => {
    useEffect(() => {
        const noCacheHeaders = () => {
            const headers = new Headers();
            headers.append("Cache-Control", "no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0");
            headers.append("Pragma", "no-cache");
            headers.append("Expires", "0");
        };

        noCacheHeaders();
    }, []);
};

export default usePreventCache;
