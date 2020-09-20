import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

export const SelectorPlot = () => {
    const [data, setData] = useState();
    useEffect(() => {
        axios.post('/get-sources-tree').then(e => {
            console.log(e);
            setData(e.data);
        });
    }, []);

    // TODO: get all associated data for the clicked point
    // form an API and call it on the on click handler
    return (
        <div style={{
            backgroundColor: 'white',
            height: '200px',
            width: '200px'
        }}>
            {data && <Plot
                onClickAnnotation={e => console.log(e)}
                onClick={e => console.log(e?.points[0]?.text)}
                data={data.data}
                layout={{
                    ...data.layout, yaxis: { fixedrange: true },
                    xaxis: { fixedrange: true }
                }}
            />}
        </div>
    )
}
