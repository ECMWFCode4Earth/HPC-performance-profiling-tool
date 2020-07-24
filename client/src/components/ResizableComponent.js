import React, { useState } from 'react'
import { Rnd } from "react-rnd";

export default function ResizableComponent({componentLocation}) {
    const style = {
        alignItems: "center",
        justifyContent: "center",
        border: "solid 1px #ddd",
        background: "#f0f0f0",
    };
    const [state, setState] = useState({
        width: 500,
        height: 500,
        x: 0,
        y: 0,
    })
    console.log(window.location.origin + "/assets/" + componentLocation);
    return (
        <Rnd
            style={style}
            bounds="parent"
            size={{
                width: state.width,
                height: state.height,
            }}
            position={{
                x: state.x,
                y: state.y,
            }}
            onDragStop={(e, d) => {
                setState({ x: d.x, y: d.y });
            }}
            onResize={(e, direction, ref, delta, position) => {
                setState({
                    width: ref.offsetWidth,
                    height: ref.offsetHeight,
                    ...position,
                });
            }}
        >
            <object type="text/html" data={window.location.origin + "/assets/" + componentLocation} ></object>
        </Rnd>
    )
}
