import * as React from "react";
import { Colors } from "./styles";

import "../styles/spark.scss";

const lines = [0, 1, 2, 3, 4, 5, 6, 7];
const lineLength = 60;
const durationMs = 700;

export interface SparkProps {
    className: string
};

export const Spark = (props: SparkProps) => 
    <svg id="spark" className={props.className} style={{width: 100}}>
        <g transform="translate(20, 30)">`
            {
                lines.map(i =>
                    <rect key={i} fill={Colors.Star} width={lineLength} height="2" transform={`rotate(${22.5 * (i + 4)}, ${lineLength / 2}, 0) translate(0, -1)`}>
                        <animate attributeType="SVG" values={`${lineLength};${lineLength / 2};${lineLength}`} attributeName="width" from={lineLength / 2} to={lineLength} dur={durationMs + "ms"} repeatCount="indefinite" />
                        <animate attributeType="SVG" values={`0;${lineLength / 3};0`} attributeName="x" from="0" to={lineLength / 2} dur={durationMs + "ms"} begin={`${durationMs / i}ms`} repeatCount="indefinite" />
                    </rect>
                )
            }
            {/* <rect fill="#fff" width="60" height="2">
                <animate attributeType="SVG" attributeName="width" from="30" to="60" dur="400ms" repeatCount="indefinite" />
            </rect>
            <rect fill="#f00" width="60" height="2" transform="rotate(22.5, 30, 0)"></rect>
            <rect fill="#0f0" width="60" height="2" transform="rotate(45, 30, 0)"></rect>
            <rect fill="#00f" width="60" height="2" transform="rotate(67.5, 30, 0)"></rect>
            <rect fill="#ff0" width="60" height="2" transform="rotate(90, 30, 0)"></rect>
            <rect fill="#f0f" width="60" height="2" transform="rotate(112.5, 30, 0)"></rect>
            <rect fill="#0ff" width="60" height="2" transform="rotate(135, 30, 0)"></rect>
            <rect fill="#000" width="60" height="2" transform="rotate(157.5, 30, 0)"></rect> */}
        </g>
        {/* <rect x="10" y="10" width="30" height="20" fill="red"
                transform="rotate(90, 20, 20)" /> */}
        {/* <rect fill="#fff" width="60" height="1"></rect>
        <rect fill="#fff" width="60" height="1"></rect>
        <rect fill="#fff" width="60" height="1"></rect> */}
    </svg>
