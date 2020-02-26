import * as React from "react";
import { Colors } from "./styles";

import "../styles/star.scss";

export interface StarProp {
    offsetId: number;
    x: number;
    y: number;
}

export const Star = (props: StarProp) => 
    <span 
        className="star"
        data-key={props.offsetId % 10}
        style={{
            // background: Colors.Star,
            // width: 3,
            // height: 2,
            top: props.y,
            left: props.x,
        }}>
    </span>
;