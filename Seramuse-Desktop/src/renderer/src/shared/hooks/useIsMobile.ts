import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

const getIsMobile = () => {
    if (typeof window === 'undefined') {
        return false;
    }
    return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;
};

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(getIsMobile);

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        const onChange = () => setIsMobile(mql.matches);
        mql.addEventListener('change', onChange);
        return () => mql.removeEventListener('change', onChange);
    }, []);

    return isMobile;
};