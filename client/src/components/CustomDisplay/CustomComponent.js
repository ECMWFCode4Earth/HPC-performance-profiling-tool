import React, { memo } from 'react';
import { useSelector } from "react-redux";
import colors from "../../utils/colors";

import { Handle } from 'react-flow-renderer';

// BUG you can now connect to yourself
export default memo(({ data, id }) => {
    const selectedFromStore = useSelector(state => state.state.selected);

    return (
        <div style={{
            backgroundColor: [...selectedFromStore].map(element => element.id).includes(id) ? colors.selectedColor : colors.unselectedColor,
        }}>
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
            {data.children({ data, id })}
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