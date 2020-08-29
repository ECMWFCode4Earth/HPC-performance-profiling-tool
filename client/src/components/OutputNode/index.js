import React, { useState } from 'react';
import { DataDisplay } from '../';
import { useSelector } from 'react-redux';
import axios from 'axios';

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
    const [result, setResult] = useState('');
    // React.useEffect(() => {
    //     let x = getRequest({ ...getFlow(id, flow), ...mapping });
    //     if (x) {
    //         setUrl(x);
    //     }
    // }, [mapping, id, flow]);
    React.useEffect(() => {
        let x = getRequest({ ...getFlow(id, flow), ...mapping });
        if (x) {
            axios.post('/getSunburstController', {
                data: x
            }).then(e => setResult(e))
        }
    }, [mapping, id, flow]);


    // TODO check the state and if we are connected to something; fetch data
    // TODO implement the change between server response and what you are sending

    // return (
    //     <div>
    //         {type === 'text' ? <pre>
    //             {JSON.stringify(url, undefined, 2)}
    //         </pre> : <DataDisplay data={url} id={id} />
    //         }
    //     </div>
    // );




    return (
        <div style={{maxWidth:'500px'}}>
            {type === 'text' ? <pre style={{maxWidth:'500px'}}>
                {JSON.stringify(result, undefined, 2)}
            </pre> : <DataDisplay data={result} id={id} />
            }
        </div>
    );
}
