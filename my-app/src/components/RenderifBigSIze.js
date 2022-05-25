
import { useState, useEffect } from "react";


export const RenderifBigSIze = ({children}) => {

    const [windowSize, setWindowSize] = useState(0);
    const updateDimensions = () => { setWindowSize(window.innerWidth); }

    useEffect(() => {
        setWindowSize(window.innerWidth);
        window.addEventListener("resize", updateDimensions);
    }, []);

    const minSize = 600;

    return windowSize >= minSize ? children : null;
}
