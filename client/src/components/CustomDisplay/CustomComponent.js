import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import { useSelector } from 'react-redux';

const getFlow = (id, flows) => {
    var x = { id: null, flow: null };
    Object.keys(flows).forEach(i => {
        if (flows[i]?.chain.includes(id)) {
            // Just returning here because a node is part form just one flow
            x = {
                id: id,
                flow: flows[i]
            };
            return;
        }
    });
    return x;
}
const getRequest = ({ flow, id }) => {
    if (flow === null || id === null) {
        return false;
    }
    console.log(flow.chain);

    // get with the id-value selector
}

// BUG you can now connect to yourself
export default memo(({ data, id }) => {
    const flow = useSelector(state => state.flow.flow);
    const elements = useSelector(state => state.elements.elements);
    React.useEffect(() => {
        getRequest({ ...getFlow(id, flow)});
    }, [flow]);
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
            // TODO isConnectable / isValidConnection
            // TODO check not to conenct multiple; not to connect 2 sources
            // TODO check to connect just to the end
            // TODO I am not checking for cycles
            // onConnect={(params) => console.log(params)}
            />
            }
            {data.children({ data, id, flow })}
            {data.type !== 'Dsource' && <Handle type="target"
                position="top"
                id={'target' + data.type}
                style={{
                    background: 'blue',
                    borderRadius: '70px',
                    width: '10px',
                    height: '10px'
                }}
            // TODO check not to conenct multiple; not to connect 2 sources
            // TODO check to connect just to the end
            // TODO I am not checking for cycles
            // onConnect={(params) => console.log(params)}
            />}
        </div>
    );
});