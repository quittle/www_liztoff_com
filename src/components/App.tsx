import * as React from "react";
import { Star } from "./Star";
import { Colors } from "./styles";
import { motion, useCycle, useAnimation, AnimationControls, TargetAndTransition } from "framer-motion";
import "../styles/firework.scss";
import { FrontPage } from "./FrontPage";

const STAR_LOCATIONS: [number, number][] = [];
const STAR_WIDTH = 1500;
const STAR_HEIGHT = 6000;
const STAR_DENSITY = 0.0001;
const NUM_OF_STARS = STAR_WIDTH * STAR_HEIGHT * STAR_DENSITY
for (let i = 0; i < NUM_OF_STARS; i++) {
    STAR_LOCATIONS.push([Math.random() * STAR_WIDTH, Math.random() * STAR_HEIGHT]);
}

const animationChain = (animations: TargetAndTransition[]): AnimationControls => {
    const control = useAnimation();
    const masterAnimation: any = {};

    for (const animation of animations) {
        Object.keys(animation).forEach((key: string) => {
            if (!(key in masterAnimation)) {
                masterAnimation[key] = [];
            }
            masterAnimation[key].push((animation as any)[key]);
        });
        // await control.start(animation);
    }
    control.start(masterAnimation);
    // control.start({x: 100, transition: { duration: 0.5 }})
    return control;
}

const sparkAnimationDurationMs = 1200;

interface SimpleStyle {
    x?: number,
    y?: number,
    scale?: number,
    color?: string,
}

const styleize = (styles: AnimationSimpleStyle): AnimationList => {
    return styles.map(style => ({
        transform: `translateX(${style.x}px) translateY(${style.y}px) scale(${style.scale})`,
        ...(style.color ? {color: style.color} : {}),
    })) as AnimationList;
};

type AnimationSimpleStyle = [
    SimpleStyle,
    SimpleStyle,
    SimpleStyle,
    SimpleStyle,
    SimpleStyle,
    SimpleStyle,
    SimpleStyle,
];

type AnimationList = [
    React.CSSProperties,
    React.CSSProperties,
    React.CSSProperties,
    React.CSSProperties,
    React.CSSProperties,
    React.CSSProperties,
    React.CSSProperties,
];


export class App extends React.Component {

    render() {
        let starLineIndex = 0;
        return <div>
            <div style={{
                backgroundColor: Colors.Sky,
                overflowX: "hidden",
                zIndex: -1,
            }}>
                {
                    STAR_LOCATIONS.map(([x, y], idx) => <Star offsetId={idx} key={idx} x={x} y={y} />)
                }
            </div>
            {/* <div className="firework"></div> */}
            <FrontPage />
        </div>;
    }
};
