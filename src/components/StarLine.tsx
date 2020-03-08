import * as React from "react";

import "../styles/star-line.scss";

export interface StarLineProps {
    index: number;
    length: number;
    percentViewable?: number;
    rotationDegrees?: number;
    translationX?: number;
    translationY?: number;
}

export const StarLine = (props: StarLineProps): JSX.Element => (
    <span
        className="star-line"
        style={{
            height: props.length,
            transform: `
                translate(${props.translationX || 0}px, ${props.translationY || 0}px)
                rotate(${props.rotationDegrees || 0}deg)
                scale(1, ${props.percentViewable ?? 1})`,
            ["--animation-delay" as never]: (props.index * 2) / 3 + "s",
        }}
    />
);
