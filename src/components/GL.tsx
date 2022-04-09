import React, { useEffect, useRef, useState } from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";
import { Box, useDimensions } from "@chakra-ui/react";
import { DateTime } from "luxon";
const frag = require("../assets/shader7.frag");

const shaders = Shaders.create({
    shader: {
        frag: GLSL`${frag.default}`,
    }
});

const getTime = () => {
    return DateTime.local();
};

export const useTime = (refreshCycle = 100) => {
    const [start, _] = useState(getTime());
    const [now, setNow] = useState(getTime());

    useEffect(() => {
        const intervalId = setInterval(
            () => setNow(getTime()),
            refreshCycle,
        );

        return () => clearInterval(intervalId);
    }, [refreshCycle, setNow]);

    return now.diff(start);
};

export const useRandom = (min: number, max: number, refreshCycle = 2000) => {
    const [value, setValue] = useState(Math.random() * (max - min) + min);

    useEffect(() => {
        const intervalId = setInterval(
            () => setValue(Math.random() * (max - min) + min),
            refreshCycle,
        );

        return () => clearInterval(intervalId);
    }, [max, min, refreshCycle, setValue]);

    return value;
};

const GL: React.FC = () => {
    const elementRef: React.LegacyRef<HTMLDivElement> = useRef(null);
    const dimensions = useDimensions(elementRef, true);
    const time = useTime();
    const iTime = time.milliseconds / 100;
    const width = dimensions?.contentBox.width || 400;
    const height = dimensions?.contentBox.height || 400;
    const ctrl1 = useRandom(0.0, 60.0);
    const ctrl2 = useRandom(10.0, 20.0);
    const ctrl3 = useRandom(1.0, 24.0); // obsc
    const ctrl4 = useRandom(5.0, 18.0); // split
    const ctrl5 = useRandom(0.1, 2.0);
    return (
        <Box ref={elementRef} width="100vw" height="100vh" position="fixed" zIndex={-1}>
            <Surface
                width={width}
                height={height}
            >
                <Node shader={shaders.shader} uniforms={{
                    iFrame: iTime,
                    iResolution: [width, height],
                    ctrl1,
                    ctrl2,
                    ctrl3,
                    ctrl4,
                    ctrl5,
                }} />
            </Surface>
        </Box>
    );
};

export default GL;