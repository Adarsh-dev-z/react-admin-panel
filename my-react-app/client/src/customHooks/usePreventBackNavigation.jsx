import { useEffect } from "react";

const usePreventBackNavigation = () => {
    useEffect(() => {
        const handleBackButton = (event) => {
            event.preventDefault();
            window.history.forward();
        };

        window.history.pushState(null, null, window.location.href);
        window.addEventListener("popstate", handleBackButton);

        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };
    }, []);
};

export default usePreventBackNavigation;
