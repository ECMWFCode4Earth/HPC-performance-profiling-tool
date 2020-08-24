import React, { useState } from 'react';
import { DataDisplay } from '../';
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
    console.log('===================')
    console.log(mapping);
    console.log('===================')
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
    // get with the id-value selector
}



export const OutputNode = (data) => {

    // fetch data from the server
    let type = data.type;
    let id = data.props.id;
    let initialState = data.url;

    const flow = useSelector(state => state.flow.flow);
    const mapping = useSelector(state => state.mapping);

    const [url, setUrl] = useState(initialState);
    React.useEffect(() => {
        let x = getRequest({ ...getFlow(id, flow), ...mapping });
        if (x)
            setUrl(x);
    }, [mapping, id, flow]);


    // TODO check the state and if we are connected to something; fetch data
    return (
        <div>
            {type === 'text' ? <pre>
                {JSON.stringify(url, undefined, 2)}
            </pre> : <DataDisplay data={url} id={id} />
            }
        </div>
    );

}
