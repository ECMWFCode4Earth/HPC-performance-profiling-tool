import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({data, id}) => {
    return (
        <div style={{ backgroundColor: 'white' }}>
            {data.type !== 'TOnode' && <Handle type="source"
                position="bottom"
                id={'src' + data.type}
                style={{
                    background: 'red',
                    borderRadius: '70px',
                    width: '10px',
                    height: '10px'
                }}
                // isConnectable / isValidConnection
                // check not to conenct multiple; not to connect 2 sources
                // check to connect just to the end
                // I am not checking for cycles
                onConnect={(params) => console.log(params)}
            />
            }
            {data.children({data, id})}
            {data.type !== 'Dsource' && <Handle type="target"
                position="top"
                id={'target' + data.type}
                style={{
                    background: 'blue',
                    borderRadius: '70px',
                    width: '10px',
                    height: '10px'
                }}
                onConnect={(params) => console.log(params)}
            />}
        </div>
    );
});