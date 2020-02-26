import * as React from "react";
import { Star } from "./Star";
import { Colors } from "./styles";
import "../styles/firework.scss";
import { FrontPage } from "./FrontPage";

const STAR_LOCATIONS: [number, number][] = [];
const STAR_WIDTH = 1500;
const STAR_HEIGHT = 6000;
const STAR_DENSITY = 0.0001;
const NUM_OF_STARS = STAR_WIDTH * STAR_HEIGHT * STAR_DENSITY;
for (let i = 0; i < NUM_OF_STARS; i++) {
    STAR_LOCATIONS.push([
        Math.random() * STAR_WIDTH,
        Math.random() * STAR_HEIGHT
    ]);
}

let windowLoaded = false;

interface AppState {
    windowLoaded: boolean;
    starsLoaded: boolean;
}

export class App extends React.Component<{}, AppState> {
    constructor(props: unknown) {
        super(props);

        const defaultState = {
            starsLoaded: false
        };

        if (windowLoaded) {
            this.state = { ...defaultState, windowLoaded: true };
            this.postStarsInitialize();
        } else {
            this.state = { ...defaultState, windowLoaded: false };
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        const onLoad = () => {
            windowLoaded = true;
            this.setState({ ...this.state, windowLoaded: true });
            this.postStarsInitialize();
            window.removeEventListener("load", onLoad);
        };
        window.addEventListener("load", onLoad);
    }

    render() {
        return (
            <div>
                <div
                    className={this.state.windowLoaded ? "show" : ""}
                    style={{
                        backgroundColor: Colors.Sky,
                        overflowX: "hidden",
                        zIndex: -1
                    }}
                >
                    {STAR_LOCATIONS.map(([x, y], idx) => (
                        <Star offsetId={idx} key={idx} x={x} y={y} />
                    ))}
                </div>
                {/* <div className="firework"></div> */}
                <FrontPage animationCanStart={this.state.starsLoaded} />
            </div>
        );
    }

    private postStarsInitialize() {
        console.log("stars queued");
        window.setTimeout(
            () => this.setState({ ...this.state, starsLoaded: true }),
            5000
        );
    }
}
