import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, connect } from 'react-redux';
import { mappingElementsAction } from '../../store';

const _DataSource = (props) => {
    // get value for select from the server
    const dispatch = useDispatch();

    // TODO the datasoruce disappers in when it is not here

    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        axios.get('/data-sources').then(e => {
            setDataSource(e.data);
            if (props.mapping?.mapping && props.mapping?.mapping[-(-props.id)] && document.getElementById("dataSource" + props.id)) {
                if (typeof props.mapping?.mapping[-(-props.id)].val === 'string')
                    document.getElementById("dataSource" + props.id).selectedIndex = e.data.indexOf(props.mapping?.mapping[-(-props.id)].val) + 1;
                else {
                    setValue(true);
                    document.getElementById("dataSource" + props.id).selectedIndex = e.data.indexOf(props.mapping?.mapping[-(-props.id)].val[0]) + 1;
                    document.getElementById("dataSourceCompare" + props.id).selectedIndex = e.data.indexOf(props.mapping?.mapping[-(-props.id)].val[1]) + 1;
                }
            }
        });
        // eslint-disable-next-line
    }, []);



    const [value, setValue] = useState(false);

    useEffect(() => {
        console.log(value)
    }, [value])
    return (
        <div style={{ padding: '40px' }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onInput={() => {
                var arr = [];
                if (!value)
                    arr = document.getElementById('dataSource' + props.id).value;
                else
                    arr = [document.getElementById('dataSource' + props.id).value, document.getElementById('dataSourceCompare' + props.id).value]

                dispatch(mappingElementsAction({
                    id: props.id,
                    value: arr,
                    type: 'source'
                }))
            }}>
                <label htmlFor="dataSource">Choose a dataSource:</label>
                <select style={{ textTransform: 'capitalize', margin: '20px', marginLeft: '40px' }}
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
                <label htmlFor="dataSource">Compare with:</label>
                <div>
                    <input type='checkbox' checked={value} onChange={e => setValue(!value)} />
                    <select style={{ textTransform: 'capitalize', margin: '20px', marginTop: '10px' }} disabled={!value}
                        name="dataSource"
                        id={"dataSourceCompare" + props.id}
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
                </div>
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
