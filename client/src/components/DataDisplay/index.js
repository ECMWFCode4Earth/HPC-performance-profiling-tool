import React from 'react'
import Plot from 'react-plotly.js';

export const DataDisplay = (id) => {
    // the data contains the data and the layout data
    return (
        <div style={{ backgroundColor: 'white' }}>
            <Plot
                data={[
                    {
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                    },
                ]}
                layout={{
                    dragmode: false,
                    height: 400,
                    width: 400,
                    autosize: false,
                    margin: {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        pad: 0
                    }, padding: {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        pad: 0
                    }
                }}
            />
        </div>
    )
}


