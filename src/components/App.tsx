import * as React from "react";
import "../styles/firework.scss";
import { FrontPage } from "./FrontPage";
import { StarField } from "./StarField";

const STAR_WIDTH = 1500;
const STAR_HEIGHT = 6000;
const STAR_DENSITY = 0.0001;

let windowLoaded = false;

interface AppState {
    windowLoaded: boolean;
    starsLoaded: boolean;
}

export class App extends React.Component<{}, AppState> {
    constructor(props: unknown) {
        super(props);

        this.state = {
            starsLoaded: false,
            windowLoaded: windowLoaded
        };
    }

    componentDidMount(): void {
        window.addEventListener("unload", () => {
            window.scrollTo(0, 0);
        });
        window.addEventListener("beforeunload", () => {
            window.scrollTo(0, 0);
        });

        const onLoad = (): void => {
            windowLoaded = true;
            this.setState({ ...this.state, windowLoaded: true });
            window.removeEventListener("load", onLoad);
        };
        window.addEventListener("load", onLoad);
    }

    render(): JSX.Element {
        return (
            <div>
                <StarField
                    shouldShow={this.state.windowLoaded}
                    starWidth={STAR_WIDTH}
                    starHeight={STAR_HEIGHT}
                    starDensity={STAR_DENSITY}
                    onFadeInComplete={(): void =>
                        this.onStarFieldFadeInComplete()
                    }
                />
                {/* <div className="firework"></div> */}
                <FrontPage animationCanStart={this.state.starsLoaded} />
            </div>
        );
    }

    private onStarFieldFadeInComplete(): void {
        this.setState({ ...this.state, starsLoaded: true });
    }
}
