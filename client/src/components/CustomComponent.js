import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import Plot from 'react-plotly.js';

export default memo(({ data, idx }) => {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <Handle
                id={'custom_component' + idx}
                type="source"
                position="left"
                style={{ background: 'red' }}
                isValidConnection={(connection) => {
                    console.log(connection);
                    return true;
                }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            {/* get the layout from the server */}
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
                        height: 500,
                        width: 500,
                        autosize: false,
                        margin: {
                            top: 0,
                            bottom: 0,
                            left: 0,
                            pad: 0
                        }
                    }}
                />
            </div>
            <Handle type="source" position="right" id="a" style={{ background: 'red' }} />
        </div>
    );
});