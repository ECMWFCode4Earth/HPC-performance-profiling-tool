import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { mappingElementsAction } from '../../store';
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
const getRequest = ({ flow, id, mapping }) => {
    let requestObject = {};
    if (!flow || !id || !mapping) {
        return false;
    }
    let chain = flow.chain;

    for (let i = 0; i < chain.length; i++) {
        if (!mapping[chain[i]])
            continue;
        requestObject[mapping[chain[i]].type] = mapping[chain[i]].val;
    }
    return requestObject;
}


export const Selector = (props) => {
    // This selects the columns that we can see from the data
    const dispatch = useDispatch();
    const [dataSource, setDataSource] = useState([]);

    const flow = useSelector(state => state.flow.flow);
    const mapping = useSelector(state => state.mapping);

    let id = props.id;
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
        let x = getRequest({ ...getFlow(id, flow), ...mapping });
        if (x)
            axios.post('/columns', {
                data: {
                    source: x.source
                }
            }).then(e => {
                setDisabled(false);
                setDataSource(e.data.columns)
            });
        else
            setDisabled(true);
    }, [mapping, id, flow]);


    return (
        <div style={{ padding: '40px' }}>
            <form onInput={() => dispatch(mappingElementsAction({
                id: props.id,
                value: document.getElementById('column' + props.id).value,
                type: 'column'
            }))}>
                <label htmlFor="column">Choose what columns you want to display:</label>
                <select style={{ textTransform: 'capitalize' }}
                    name="column"
                    id={"column" + props.id}
                    disabled={disabled}
                    defaultValue='DEFAULT'>
                    {
                        dataSource === [] ? <option value="DEFAULT" disabled hidden>Choose columns to plot</option> :
                            <option value="DEFAULT" disabled hidden>Please choose a data-source</option>
                    }

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
