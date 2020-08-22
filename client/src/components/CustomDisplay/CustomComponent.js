import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ data, idx, selector }) => {
    return (
        <div style={{ backgroundColor: 'white' }}>

            <Handle type="source"
                position="top"
                id='source'
                style={{
                    background: 'red',
                    borderRadius: '70px',
                    width: '10px',
                    height: '10px'
                }}
                // isConnectable / isValidConnection
                onConnect={(params) => console.log(params)}
            />
            {data.children}
            <Handle type="target"
                position="bottom"
                id='target'
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