import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { mappingElementsAction } from '../../store';
import { useSelector, useDispatch, connect } from 'react-redux';
import colors from "../../utils/colors";

const getFlow = (id, flows) => {
    var x = { id: null, flow: null };

    Object.keys(flows).forEach(i => {
        console.log(flows[i].chain)
        console.log(flows[i])
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
const getRequest = ({ flow, id, mapping }) => {
    let requestObject = {};
    if (!flow || !id || !mapping) {
        return false;
    }
    let chain = flow.flows[id];

    for (let i = 0; i < chain.length; i++) {
        if (!mapping[chain[i]])
            continue;
        requestObject[mapping[chain[i]].type] = mapping[chain[i]].val;
    }
    return requestObject;
}


const _Selector = (props) => {
    // TODO BUG can not set selected index of null; can not reproduce
    const dispatch = useDispatch();
    const selectedFromStore = useSelector(state => state.state.selected);
    const [dataSource, setDataSource] = useState([]);
    const [selected, setSelected] = useState([]);
    const [disabled, setDisabled] = useState(true);

    const flow = useSelector(state => state.flow.flow);
    const mapping = useSelector(state => state.mapping);

    let id = props.id;
    let endpoint = props.endpoint;

    useEffect(() => {
        let x = getRequest({ ...getFlow(id, flow), ...mapping });
        // If x is a list than change on the server
        if (x)
            axios.post(`/${endpoint}`, {
                data: {
                    source: x.source
                }
            }).then(e => {
                setDisabled(false);
                setDataSource(e.data[endpoint])
            });
        else
            setDisabled(true);
    }, [mapping, id, flow, endpoint]);


    useEffect(() => {
        if (props.mapping?.mapping && props.mapping?.mapping[-(-props.id)]) {
            setSelected(props.mapping?.mapping[-(-props.id)].val)
        }
        // eslint-disable-next-line
        }, []);

    return (
        <div style={{ padding: '40px' }}>
            <div style={{
                display:'flex',
                flexDirection:'row',
                flexWrap:'wrap',
                width: '300px',
                backgroundColor: [...selectedFromStore].map(element => element.id).includes(id) ? colors.selectedColor : colors.unselectedColor,
                marginBottom: '10px'
            }}>
                {
                    selected.map((e, index) => <div style={{
                        backgroundColor: '#a0a0a0',
                        display: 'inline-block',
                        margin: '3px 5px',
                        padding: '5px',
                        borderRadius: '10px'
                    }} key={index} onClick={() => {
                        setSelected(selected.filter(el => el !== e));
                        dispatch(mappingElementsAction({
                            id: props.id,
                            value: selected.filter(el => el !== e),
                            type: endpoint
                        }))
                    }
                    }> {e} </div>)
                }
            </div>
            <form
                style={{ display: 'flex', flexDirection: 'column' }}
            >
                <label htmlFor="column">Choose what {endpoint} you want to display:</label>
                <select style={{ textTransform: 'capitalize' }}
                    name="column"
                    id={"column" + props.id}
                    onClick={e => {
                        if (e.target.value!=='DEFAULT')
                        if (!selected.includes(e.target.value)) {
                            setSelected([...selected, e.target.value]);
                            dispatch(mappingElementsAction({
                                id: props.id,
                                value: [...selected, e.target.value],
                                type: endpoint
                            }))
                        }

                    }
                    }
                    disabled={disabled}
                    defaultValue='DEFAULT'>
                    {
                        dataSource === [] ? <option value="DEFAULT" disabled hidden>Choose {endpoint} to plot</option> :
                    <option value="DEFAULT" disabled hidden>Please choose a {endpoint}</option>
                    }

                    {
                        dataSource && dataSource.map((el, key) => {
                            return <option key={key}
                                style={{ textTransform: 'capitalize' }}
                                value={el}
                                disabled={selected.includes(el)}
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

export const Selector = connect(
    mapStateToProps
)(_Selector);

