import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';

export const DataDisplay = (props) => {
    // the data contains the data and the layout data
    const [data, setData] = useState();
    useEffect(() => {
        if (props.data)
            setData(JSON.parse(props.data.data))
    }, [props]);
    return (
        <div style={{ backgroundColor: 'white' }}>
            {data && <Plot
                data={data.data}
                layout={data.layout}
            />}
        </div>
    )
}


