import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { mappingElementsAction } from '../../store';

export const DataSource = (props) => {
    // get value for select from the server
    const dispatch = useDispatch();
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        axios.get('/data-sources').then(e => {
            setDataSource(e.data);
        });
    }, []);


    return (
        <div style={{ padding: '40px' }}>
            <form onInput={() => dispatch(mappingElementsAction({
                id: props.id,
                value: document.getElementById('dataSource' + props.id).value,
                type: 'source'
            }))}>
                <label htmlFor="dataSource">Choose a dataSource:</label>
                <select style={{ textTransform: 'capitalize' }}
                    name="dataSource"
                    id={"dataSource" + props.id}
                    defaultValue='DEFAULT'>
                    <option value="DEFAULT" disabled hidden>Choose data-source</option>
                    {
                        dataSource && dataSource.map((el, key) => {
                            return <option key={key}
                                style={{ textTransform: 'capitalize' }}
                                value={el}
                            >{el.replace('.csv', '').replace(/_/g, ' ')}</option>
                        })
                    }
                </select>
            </form>
        </div>
    )
}
