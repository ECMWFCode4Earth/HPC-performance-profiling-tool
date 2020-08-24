import React from 'react';
import { useDispatch } from 'react-redux';
import { mappingElementsAction } from '../../store';

export const DataSource = (props) => {
    // get value for select from the server
    const dispatch = useDispatch();
    return (
        <div style={{ padding: '40px' }}>
            <form onInput={() => dispatch(mappingElementsAction({
                id: props.id,
                value: document.getElementById('dataSource' + props.id).value,
                type: 'source'
            }))}>
                <label htmlFor="dataSource">Choose a dataSource:</label>
                <select name="dataSource" id={"dataSource" + props.id}>
                    <option value="" selected disabled hidden>Choose here</option>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                </select>
            </form>
        </div>
    )
}
