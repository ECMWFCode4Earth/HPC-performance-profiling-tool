import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { mappingElementsAction } from '../../store';
import colors from "../../utils/colors";

const _DataSource = (props) => {
    // get value for select from the server
    const dispatch = useDispatch();

    // TODO the datasoruce disappers in when it is not here

    const [dataSource, setDataSource] = useState([]);
    const [dataSources, setDataSources] = useState([0]);
    let id = props.id;
    const selected = useSelector(state => state.state.selected);
    useEffect(() => {
        axios.get('/data-sources').then(e => {
            setDataSource(e.data);
            if (props.mapping?.mapping && props.mapping?.mapping[-(-props.id)] && document.getElementById("dataSource" + props.id)) {
                // if (typeof props.mapping?.mapping[-(-props.id)].val === 'string')
                //     document.getElementById("dataSource" + props.id).selectedIndex = e.data.indexOf(props.mapping?.mapping[-(-props.id)].val) + 1;
                // else {
                //     setValue(true);
                //     document.getElementById("dataSource" + props.id).selectedIndex = e.data.indexOf(props.mapping?.mapping[-(-props.id)].val[0]) + 1;
                //     document.getElementById("dataSourceCompare" + props.id).selectedIndex = e.data.indexOf(props.mapping?.mapping[-(-props.id)].val[1]) + 1;
                // }
            }
        });
        // eslint-disable-next-line
    }, []);



    const [value, setValue] = useState([true]);

    return (
        <div style={{
            padding: '40px',
            backgroundColor: [...selected].map(element => element.id).includes(id) ? colors.selectedColor : colors.unselectedColor,
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onInput={() => {
                var arr = [];

                for (let i = 0; i < dataSources.length; i++) {
                    if (value[i])
                        arr.push(document.getElementById(`dataSource${i}` + props.id).value)
                }
                console.log(arr);
                // arr = [document.getElementById('dataSource' + props.id).value, document.getElementById('dataSourceCompare' + props.id).value]

                dispatch(mappingElementsAction({
                    id: props.id,
                    value: arr,
                    type: 'source'
                }))
            }}>
                <label htmlFor="dataSource">Choose a dataSource:</label>

                {dataSources.map((e, idx) => <div>
                    <input type='checkbox' checked={value[idx]} onChange={e => setValue(val => {
                        let value = [...val];
                        value[idx] = !val[idx];
                        return value;
                    })} />
                    <select style={{ textTransform: 'capitalize', margin: '20px', marginTop: '10px' }} disabled={!value[idx]}
                        name="dataSource"
                        id={`dataSource${idx}` + props.id}
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
                </div>)}
            </form>

            {dataSources.length >= 1 &&
                <>
                    <label htmlFor="dataSource">Compare with:</label>
                    <button onClick={e => {
                        setValue([...value, false]);
                        e.preventDefault();
                        setDataSources(source => [...source, source.length + 1])
                    }}> Add Data Source </button>
                </>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return { mapping: state.mapping }
}

export const DataSource = connect(
    mapStateToProps
)(_DataSource);
