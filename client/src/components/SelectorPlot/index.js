import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

export const SelectorPlot = () => {
    const [data, setData] = useState();
    const [labels, setLabels] = useState();
    const [parseDict, setParseDict] = useState();
    useEffect(() => {
        axios.post('/get-sources-tree').then(e => {
            setData(e.data);
        });

        axios.post('/get-sources-tree-labels').then(e => {
            setLabels(e.data);
        });

        axios.post('/get-sources-tree-parse-dict').then(e => {
            setParseDict(e.data);
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
                parseDict={parseDict}
                labels={labels}
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
