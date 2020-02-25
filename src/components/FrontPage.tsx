import * as React from "react";
import { Spark } from "./Spark";
import { StarLine } from "./StarLine";

interface AppState {
    starPos: number;
}

const sparkAnimationDurationMs = 1200;

const sparkHolderStyle = {
    // position: "relative",
    transition: `transform ${sparkAnimationDurationMs}ms`,
};

interface SimpleStyle {
    x?: number,
    y?: number,
    scale?: number,
    color?: string,
}

interface AppState {
    starPos: number;
}

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

const sparkPositions: AnimationList = styleize([
    {x: 0, y: 0, scale: 1},
    {x: 0, y: 250, scale: 1},
    {x: -220, y: 335, scale: 1},
    {x: -240, y: 325, scale: 0},
    {x: -300, y: 380, scale: 0},
    {x: -300, y: 440, scale: 1},
    {x: 130, y: 530, scale: 1},
]);

const titleStyle = {
    fontSize: "3em",
};

const titleSmallStyle = {
    fontSize: "3em",
    color: "white",
}

const titleLargeStyle = {};

export class FrontPage extends React.Component<{}, AppState> {

    constructor(props: unknown) {
        super(props);
        this.state = {
            starPos: 0,
        };
    }

    componentDidMount() {
        setInterval(() => {
            let starPos = this.state.starPos + 1;
            if (starPos > 7) {
                starPos = 0;
            }
            this.setState({starPos});
        }, sparkAnimationDurationMs);
    }

    private getMainTextHighlightClass(textName: "spark" | "inspire" | "perspectives"): string {
        return {
            "spark": 1,
            "inspire": 3,
            "perspectives": 7,
        }[textName] <= this.state.starPos ? "mainTextHighlight" : "";
    }

    render() {
        let starLineIndex = 0;
        return (
            <div style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                // position: "fixed",
                height: "100%",
                width: "100%",
                fontStyle: "serif",
                paddingTop: "12em",
            }}>
                <div className="title-small" style={titleSmallStyle}>All it takes is the</div>
                <br />
                <span id="mainText-spark" className={`title-large ${this.getMainTextHighlightClass("spark")}`} style={titleLargeStyle}>SPARK</span>
                <br />
                <span className="title-small" style={titleSmallStyle}>of an idea</span>
                <br />
                <span className="title-small" style={titleSmallStyle}>(in the right hands)</span>
                <br />
                {/* <motion.span animate={animationChain([
                        {x: 0, y: 0, scale: 1},
                        {x: 0, y: 250, scale: 1},
                        {x: -220, y: 335, scale: 1},
                        {x: -240, y: 325, scale: 0},
                        {x: -300, y: 380, scale: 0},
                        {x: -300, y: 440, scale: 1},
                        {x: 130, y: 530, scale: 1},
                    ])} transition={{  type: "inertia",  velocity: .2, duration: 15, loop: Infinity}}>
                    <Spark />
                </motion.span> */}
                {/* <Anime loop={true}>
                    <Spark />
                </Anime> */}
                <span style={{...sparkHolderStyle, ...sparkPositions[this.state.starPos]}}>
                    <Spark className={`pos${this.state.starPos}`} />
                </span>
                {/* <br />
                <img src="http://giphygifs.s3.amazonaws.com/media/11lVFn0Di6NOIU/giphy.gif" height={40} /> */}
            
                <div>
                    <StarLine index={starLineIndex++} length={100} />
                    <br />
                    <StarLine index={starLineIndex++} length={200} rotationDegrees={65} translationX={-113} translationY={-37} />
                </div>
                <div style={{
                    transform: "translate(-332px, -202px)",
                }}>
                    <div className="title-small" style={{
                            ...titleSmallStyle,
                            transform: "translate(48px, 32px)",
                        }}>to</div>
                    <br />
                    <span id="mainText-inspire" className={`title-large ${this.getMainTextHighlightClass("inspire")}`} style={titleLargeStyle}>inspire</span> {/*fil text with background gradient to get the fill effect*/}
                    <br />
                    <div className="title-small" style={{
                        ...titleSmallStyle,
                        transform: "translate(84px, -32px)",
                        }}>imaginations</div>
                    <StarLine index={starLineIndex++} length={450} rotationDegrees={-79} translationX={243} translationY={-198} />
                </div>
                <div style={{transform: "translate(155px, -662px)"}}>
                    <div className="title-small" style={{
                                ...titleSmallStyle,
                                transform: "translate(48px, 32px)",
                            }}>change</div>
                    <br />
                    <span id="mainText-perspectives" className={`title-large ${this.getMainTextHighlightClass("perspectives")}`} style={titleLargeStyle}>perspectives</span>
                </div>
            </div>);
    }
}
