import React, { useState } from 'react'
import { Rnd } from "react-rnd";
import './styles.css'
import Plot from 'react-plotly.js';
import sb_data from './sunburst.json';

export default function ResizableComponent({componentLocation}) {
    const style = {
        alignItems: "center",
        justifyContent: "center",
        border: "solid 1px #ddd",
        display: "flex",
        overflow: "hidden",
    };
    const [state, setState] = useState({
        width: 500,
        height: 500,
        x: 0,
        y: 0,
    })
    console.log(sb_data)
    console.log(state.height);
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
                console.log(state.offsetHeight)
                console.log(state.height)

                setState({...state, x: d.x, y: d.y });
            }}
            onResize={(e, direction, ref, delta, position) => {

                setState({
                    width: ref.offsetWidth !== undefined ? ref.offsetWidth : state.width,
                    height: ref.offsetHeight !== undefined ? ref.offsetHeight : state.height,
                    ...position,
                });
            }}
        >
        { componentLocation.endsWith('.json') ?
        <Plot data={sb_data.data}
        layout = {sb_data.layout}/>
        :
            <img height={state.height}
            className='unselectable'
                    style={{ flexShrink: "0",
                        minWidth: "90%",
                        minHeight: "90%"}}
              alt={"Logo"} src={window.location.origin + "/assets/" + componentLocation}></img>
        }
            {/* <div id="650fd9a1-1e28-404c-9201-1d8ecfa50203" class="plotly-graph-div" style="height:100%; width:100%;"></div> */}
        </Rnd>
    )
}
