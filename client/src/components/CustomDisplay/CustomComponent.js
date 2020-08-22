import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ data }) => {
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
                onConnect={(params) => console.log(params)}
            />
            }
            {data.children}
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