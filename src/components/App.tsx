import * as React from "react";
import { Star, StarProp } from "./Star";
import { Colors } from "./styles";
import { Spark } from "./Spark";
import { Z_BLOCK } from "zlib";
import { StarLine } from "./StarLine";

import "../styles/firework.scss";

const STAR_LOCATIONS: [number, number][] = [];
const STAR_WIDTH = 1500;
const STAR_HEIGHT = 6000;
const STAR_DENSITY = 0.0001;
const NUM_OF_STARS = STAR_WIDTH * STAR_HEIGHT * STAR_DENSITY
for (let i = 0; i < NUM_OF_STARS; i++) {
    STAR_LOCATIONS.push([Math.random() * STAR_WIDTH, Math.random() * STAR_HEIGHT]);
}

const titleStyle = {
    fontSize: "3em",
};

const titleSmallStyle = {
    fontSize: "3em",
    color: "white",
}

const titleLargeStyle = {
    fontSize: "5em",
    color: Colors.Star,
}

export const App = () => {
    let starLineIndex = 0;
    return <div>
        <div style={{
            backgroundColor: Colors.Sky,
            // position: "absolute",
            // top: 0,
            // bottom: 0,
            // left: 0,
            // right: 0,
            overflowX: "hidden",
            zIndex: -1,
        }}>
            {
                STAR_LOCATIONS.map(([x, y], idx) => <Star offsetId={idx} key={idx} x={x} y={y} />)
            }
        </div>
        {/* <div className="firework"></div> */}
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
            <span className="title-large" style={titleLargeStyle}>SPARK</span>
            <br />
            <span className="title-small" style={titleSmallStyle}>of an idea</span>
            <br />
            <span className="title-small" style={titleSmallStyle}>(in the right hands)</span>
            <br />
            <Spark />
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
                <span className="title-large" style={titleLargeStyle}>inspire</span>
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
                <span className="title-large" style={titleLargeStyle}>perspectives</span>
            </div>
        </div>
    </div>;
};