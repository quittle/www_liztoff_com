import * as React from "react";
import { Spark } from "./Spark";
import { StarLine } from "./StarLine";

import "../styles/front-page.scss";

const sparkAnimationDurationMs = 1200;

const sparkHolderStyle = {
    display: "inline-block",
    transition: `transform ${sparkAnimationDurationMs}ms`
};

interface SimpleStyle {
    _tag?: AnimationTag; // Used to identify the frame for triggering other events
    x?: number | string;
    y?: number | string;
    scale?: number;
    color?: string;
}

const styleize = (styles: AnimationSimpleStyle): AnimationList => {
    return styles.map(style => {
        let { x, y, scale } = style;
        if (typeof x === "number") {
            x = `${x}px`;
        }
        if (typeof y === "number") {
            y = `${y}px`;
        }
        return {
            transform: `translateX(${x}) translateY(${y}) scale(${scale})`,
            ...(style.color ? { color: style.color } : {})
        };
    }) as AnimationList;
};

type AnimationSimpleStyle = SimpleStyle[];

type AnimationList = React.CSSProperties[];

type AnimationTag = "spark" | "inspire" | "perspectives";

const sparkStylesRaw: SimpleStyle[] = [
    { x: 0, y: "-14vh", scale: 0 },
    { x: 0, y: "-14vh", scale: 1, _tag: "spark" },
    { x: 0, y: 250, scale: 1 },
    { x: -220, y: 335, scale: 1 },
    { x: -240, y: 325, scale: 0, _tag: "inspire" },
    { x: -300, y: 380, scale: 0 },
    { x: -300, y: 440, scale: 1 },
    { x: 130, y: 530, scale: 1 },
    { x: 130, y: 530, scale: 0, _tag: "perspectives" }
];
const starLineTrigger: number[] = [
    0,
    0,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
]
const sparkPositions: AnimationList = styleize(sparkStylesRaw);

export interface FrontPageProps {
    animationCanStart: boolean;
}

interface FrontPageState {
    starPos: number;
}

export class FrontPage extends React.Component<FrontPageProps, FrontPageState> {
    /** Handles the animation of the spark moving throughout the page */
    private sparkAnimationInterval?: number;
    /** Triggers the page to scroll to the spark. Perhaps should use requestAnimationFrame */
    private scrollingInterval?: number;
    /** Marks if scroll-jacking was canceled and shouldn't be re-attached */
    private disableScrollJacking = false;
    /** Listener checking if the user wants to break out of spark animation */
    private scrollListener?: () => void;

    constructor(props: FrontPageProps) {
        super(props);

        this.state = {
            starPos: 0
        };
    }

    componentDidMount(): void {
        if (this.props.animationCanStart) {
            this.startAnimation();
        }
    }

    componentDidUpdate(prevProps: FrontPageProps): void {
        if (this.props.animationCanStart && !prevProps.animationCanStart) {
            this.startAnimation();
        } else if (
            !this.props.animationCanStart &&
            prevProps.animationCanStart
        ) {
            this.cleanupAnimation();
        }
    }

    componentWillUnmount(): void {
        this.cleanupAnimation();
    }

    private startAnimation(): void {
        this.sparkAnimationInterval = window.setInterval(() => {
            // Iterate forward in the state machine
            const starPos = this.state.starPos + 1;
            if (starPos == 2) {
                // This must be kicked off inside the interval as the timer may not fire
                // at the right time and cancel the scroll-jacking
                this.tryStartScrollJacking();
            }
            if (starPos >= sparkPositions.length) {
                // Clean up as there's nothing left to do
                this.cleanupAnimation();
            } else {
                this.setState({ starPos });
            }
        }, sparkAnimationDurationMs);
    }

    private tryStartScrollJacking(): void {
        // Return early if scrolljacking is disabled or if it's already set up
        if (this.disableScrollJacking || this.scrollingInterval) {
            return;
        }

        const offsetY = document.getElementById("spark").getBoundingClientRect().y;

        // Used to track if the user scrolled separately from the scroll-jacking
        let lastScrolledToYPosition = window.scrollY;

        // Constantly scroll to the spark
        this.scrollingInterval = window.setInterval(() => {
            document.getElementById("spark").scrollIntoView();
            window.scrollBy(0, -offsetY);
            lastScrolledToYPosition = window.scrollY;
        }, 10);

        // Listener for scroll events
        this.scrollListener = (): void => {
            // Cancel if the user scrolled separately from the scroll-jacking
            if (lastScrolledToYPosition !== window.scrollY) {
                this.cancelScrollJacking();
            }
        };

        window.addEventListener("scroll", this.scrollListener);
    }

    /**
     * Remove all listeners and intervals used for the animation
     */
    private cleanupAnimation(): void {
        this.cancelScrollJacking();

        window.clearInterval(this.sparkAnimationInterval);
        this.sparkAnimationInterval = null;
    }

    /**
     * Stops and cleans up the scroll-jacking.
     */
    private cancelScrollJacking(): void {
        window.clearInterval(this.scrollingInterval);
        this.scrollingInterval = null;

        window.removeEventListener("scroll", this.scrollListener);
        this.scrollListener = null;

        this.disableScrollJacking = true;
    }

    private getMainTextHighlightClass(textName: AnimationTag): string {
        const findTagIndex = (tag: AnimationTag): number => {
            return sparkStylesRaw.findIndex(entry => entry._tag === tag);
        };

        return {
            spark: findTagIndex("spark"),
            inspire: findTagIndex("inspire"),
            perspectives: findTagIndex("perspectives")
        }[textName] <= this.state.starPos
            ? "mainTextHighlight"
            : "";
    }

    private getStarLinePercentViewable(starLineIndex: number): number {
        return starLineTrigger[this.state.starPos] >= starLineIndex ? 1 : 0;
    }

    render(): JSX.Element {
        let starLineIndex = 0;
        return (
            <div
                style={{
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        paddingTop: "50vh",
                        transform: "translateY(-25%)",
                    }}
                >
                    <div className="title-small">All it takes is the</div>
                    <br />
                    <span
                        id="mainText-spark"
                        className={`title-large from-bottom ${this.getMainTextHighlightClass(
                            "spark"
                        )}`}
                    >
                        SPARK
                    </span>
                    <br />
                    <span className="title-small">of an idea</span>
                    <br />
                    <span className="title-small">(in the right hands)</span>
                </div>
                <br />
                <span
                    style={{
                        ...sparkHolderStyle,
                        ...sparkPositions[this.state.starPos]
                    }}
                >
                    <Spark className={`pos${this.state.starPos}`} />
                </span>
                {/* <br />
                <img src="http://giphygifs.s3.amazonaws.com/media/11lVFn0Di6NOIU/giphy.gif" height={40} /> */}
                <div>
                    <StarLine
                        index={starLineIndex++}
                        length={100}
                        percentViewable={this.getStarLinePercentViewable(starLineIndex)}
                    />
                    <br />
                    <StarLine
                        index={starLineIndex++}
                        length={200}
                        rotationDegrees={65}
                        translationX={-13}
                        translationY={20}
                        percentViewable={this.getStarLinePercentViewable(starLineIndex)}
                    />
                </div>
                <div
                    style={{
                        transform: "translate(-332px, -202px)",
                    }}
                >
                    <div
                        className="title-small"
                        style={{
                            transform: "translate(48px, 32px)",
                        }}
                    >
                        to
                    </div>
                    <br />
                    <span
                        id="mainText-inspire"
                        className={`title-large from-right ${this.getMainTextHighlightClass(
                            "inspire"
                        )}`}
                    >
                        inspire
                    </span>
                    {/*fil text with background gradient to get the fill effect*/}
                    <br />
                    <div
                        className="title-small"
                        style={{
                            transform: "translate(84px, -32px)",
                        }}
                    >
                        imaginations
                    </div>
                    <StarLine
                        index={starLineIndex++}
                        length={450}
                        rotationDegrees={-79}
                        translationX={-13}
                        translationY={-30}
                        percentViewable={this.getStarLinePercentViewable(starLineIndex)}
                    />
                </div>
                <div style={{ transform: "translate(155px, -662px)", }}>
                    <div
                        className="title-small"
                        style={{
                            transform: "translate(48px, 32px)",
                        }}
                    >
                        change
                    </div>
                    <br />
                    <span
                        id="mainText-perspectives"
                        className={`title-large from-left ${this.getMainTextHighlightClass(
                            "perspectives"
                        )}`}
                    >
                        perspectives
                    </span>
                </div>
            </div>
        );
    }
}
