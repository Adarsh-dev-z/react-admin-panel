import { useEffect } from "react";


const usePreventCache = () => {

    useEffect(() => {

        const noCatchHeaders = () => {
            document.head.innerHTML += ` <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />`

        }

        noCatchHeaders()

        return () => {
            document.head.innerHTML = document.head.innerHTML.replace(
                /<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" \/>/,
                ''
            );
            document.head.innerHTML = document.head.innerHTML.replace(
                /<meta http-equiv="Pragma" content="no-cache" \/>/,
                ''
            );
            document.head.innerHTML = document.head.innerHTML.replace(
                /<meta http-equiv="Expires" content="0" \/>/,
                ''
            );
        }
    }, [])
}


export default usePreventCache;