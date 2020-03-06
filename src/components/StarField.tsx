import * as React from "react";
import { Colors } from "./styles";
import { Star } from "./Star";

export interface StarFieldProps {
    shouldShow: boolean;
    starWidth: number;
    starHeight: number;
    starDensity: number;
    onFadeInComplete: () => void;
}

export class StarField extends React.Component<StarFieldProps> {
    private starLocations: [number, number][] = [];
    private timeout?: number;

    constructor(props: StarFieldProps) {
        super(props);

        this.initializeStarLocations();
    }

    componentDidMount() {
        this.startShowingStars();
    }

    componentDidUpdate(prevProps: StarFieldProps) {
        const { shouldShow, starWidth, starHeight, starDensity } = this.props;

        if (
            prevProps.starWidth !== starWidth ||
            prevProps.starHeight !== starHeight ||
            prevProps.starDensity !== starDensity
        ) {
            this.initializeStarLocations();
        }

        if (shouldShow && !prevProps.shouldShow) {
            this.startShowingStars();
        } else if (!shouldShow && prevProps.shouldShow) {
            this.cancelShowingStars();
        }
    }

    componentWillUnmount() {
        this.cancelShowingStars();
    }

    render() {
        return (
            <div
                className={this.props.shouldShow ? "show" : ""}
                style={{
                    backgroundColor: Colors.Sky,
                    overflowX: "hidden",
                    zIndex: -1
                }}
            >
                {this.starLocations.map(([x, y], idx) => (
                    <Star offsetId={idx} key={idx} x={x} y={y} />
                ))}
            </div>
        );
    }

    private initializeStarLocations() {
        const { starWidth, starHeight, starDensity } = this.props;

        const numOfStars = starWidth * starHeight * starDensity;
        this.starLocations = [];
        for (let i = 0; i < numOfStars; i++) {
            this.starLocations.push([
                Math.random() * starWidth,
                Math.random() * starHeight
            ]);
        }
    }

    private startShowingStars() {
        this.cancelShowingStars();

        this.timeout = window.setTimeout(() => {
            this.props.onFadeInComplete();
        }, 3000);
    }

    private cancelShowingStars() {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
}
