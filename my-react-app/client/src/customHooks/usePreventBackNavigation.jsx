// import { useEffect } from "react";

// const usePreventBackNavigation =()=>{

//     useEffect(()=>{

//         const handlePopState = () => window.history.go(1);
        
//         window.history.pushState(null, null, window.location.href);
//         window.addEventListener("popstate", handlePopState);

//         return()=>{
//             window.removeEventListener("popstate", handlePopState);
//         }
//     }, [])
// }

// export default usePreventBackNavigation


import { useEffect } from 'react';

const usePreventBackNavigation = () => {
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      window.history.forward();
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);
};

export default usePreventBackNavigation;
