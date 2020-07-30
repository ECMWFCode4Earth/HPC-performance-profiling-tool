import React, { useState, useEffect } from 'react'
import { Rnd } from "react-rnd";
import './styles.css'
import Plot from 'react-plotly.js';
import axios from 'axios';

export default function ResizableComponent({ componentLocation }) {
    console.log(componentLocation);
    const [data, setData] = useState({ data: '', layout: '' });

    useEffect(() => {
        const getData = () => {
            return axios.post(componentLocation,
                {
                    functions_to_plot: ['delta_eddington_scat_od', 'cloud_optics', 'allocate_flux_type', 'ecrad_driver']
                }
            ).then((response) => {
                let x = JSON.parse(response.data);
                console.log(x.data);
                console.log(x.layout);
                setData(x);
            });
        }
        return getData();
    }, [componentLocation]);

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
    });


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

                setState({ ...state, x: d.x, y: d.y });
            }}
            onResize={(e, direction, ref, delta, position) => {

                setState({
                    width: ref.offsetWidth !== undefined ? ref.offsetWidth : state.width,
                    height: ref.offsetHeight !== undefined ? ref.offsetHeight : state.height,
                    ...position,
                });
            }}
        > 
            {data.data !== undefined ?
                <Plot data={data.data}
                    layout={data.layout} />
                :
                <img height={state.height}
                    className='unselectable'
                    style={{
                        flexShrink: "0",
                        minWidth: "90%",
                        minHeight: "90%"
                    }}
                    alt={"Logo"} src={window.location.origin + "/assets/" + componentLocation}></img>
            && console.log(data.data)}
            {/* <div id="650fd9a1-1e28-404c-9201-1d8ecfa50203" class="plotly-graph-div" style="height:100%; width:100%;"></div> */}
        </Rnd>
    )
}
