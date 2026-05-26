// Hook para desabilitar hover en un componente

import { useEffect } from "react";

let lockCount = 0;

export function useLockBodyScroll(locked = false) {
    useEffect(() => {
        if (!locked) return;

        lockCount++;

        // guardando el scroll actual para restaurarlo
        const scrollY = window.scrollY;
        const originalOverflow = document.body.style.overflow;
        const originalPosition = document.body.style.position;
        const originalTop = document.body.style.top;
        const originalWidth = document.body.style.width;

        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";

        return () => {
            lockCount--;
            if (lockCount === 0) {
                document.body.style.overflow = originalOverflow;
                document.body.style.position = originalPosition;
                document.body.style.top = originalTop;
                document.body.style.width = originalWidth;
                window.scrollTo(0, scrollY);
            }
        };
    }, [locked]);
}