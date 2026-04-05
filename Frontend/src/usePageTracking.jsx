import { useEffect } from "react";
import { useLocation } from "react-router";


function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    window.gtag("config", "G-C08C1JNWTK", {
      page_path: location.pathname,
    });
  }, [location]);
}

export default usePageTracking;