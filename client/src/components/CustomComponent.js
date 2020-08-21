import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import Plot from 'react-plotly.js';

export default memo(({ data, idx, selector }) => {
    // daca e selector trebuie sa aiba doar un node de tip source
    // daca e reducer trebuie sa aiba noduri de tip destination
    // add some constants for the width and height of the pixels here
    return (
        <div style={{ backgroundColor: 'white' }}>
            {/* <Handle
                id={'custom_component'}
                type="source"
                position="left"
                style={{ background: 'red' }}
                isValidConnection={(connection) => {
                    console.log(connection);
                    return true;
                }}
                onConnect={(params) => console.log('handle onConnect', params)}
            /> */}
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
                        height: 400,
                        width: 400,
                        autosize: false,
                        margin: {
                            top: -10,
                            bottom: -10,
                            left: -100,
                            pad: -100
                        }, padding: {
                            top: -10,
                            bottom: -10,
                            left: -100,
                            pad: -100
                        }
                    }}
                />
            </div>
            <Handle type="source"
                position="top"
                id="a"
                style={{
                    background: 'red',
                    borderRadius: '70px',
                    width: '10px',
                    height: '10px'
                }}
                onConnect={(params) => console.log(params)}
            />
            <Handle type="destination"
                position="bottom"
                id="b"
                style={{
                    background: 'blue',
                    borderRadius: '70px',
                    width: '10px',
                    height: '10px'
                }}
                onConnect={(params) => console.log(params)}
            />
        </div>
    );
});