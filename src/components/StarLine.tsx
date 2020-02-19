import * as React from "react";

import "../styles/star-line.scss";

export interface StarLineProps {
    index: number;
    length: number;
    rotationDegrees?: number;
    translationX?: number;
    translationY?: number;
};

export const StarLine = (props: StarLineProps) =>
    <span className="star-line"
        style={{
            height: props.length,
            transform: `
                translate(${props.translationX || 0}px, ${props.translationY || 0}px)
                rotate(${props.rotationDegrees || 0}deg)`,
            "--animation-delay": (props.index * 2 / 3) + "s",
        }} />
;