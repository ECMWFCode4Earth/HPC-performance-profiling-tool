import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, connect } from 'react-redux';
import { mappingElementsAction } from '../../store';

const _DataSource = (props) => {
    // get value for select from the server
    const dispatch = useDispatch();

    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        axios.get('/data-sources').then(e => {
            setDataSource(e.data);
            if (props.mapping?.mapping && props.mapping?.mapping[-(-props.id)] && document.getElementById("dataSource" + props.id)) {
                document.getElementById("dataSource" + props.id).selectedIndex = e.data.indexOf(props.mapping?.mapping[-(-props.id)].val) + 1
            }
        });
        // eslint-disable-next-line
    }, []);


    return (
        <div style={{ padding: '40px' }}>
            <form onInput={() => {
                dispatch(mappingElementsAction({
                    id: props.id,
                    value: document.getElementById('dataSource' + props.id).value,
                    type: 'source'
                }))
            }}>
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

const mapStateToProps = (state) => {
    return { mapping: state.mapping }
}

export const DataSource = connect(
    mapStateToProps
)(_DataSource);
