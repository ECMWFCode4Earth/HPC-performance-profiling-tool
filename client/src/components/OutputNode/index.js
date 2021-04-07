import React, { useState } from 'react';
import { DataDisplay } from '../';
import { useSelector } from 'react-redux';
import axios from 'axios';
import colors from "../../utils/colors";

async function getImageData({ flow, id, mapping }, url) {
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
    requestObject['type'] = url;
    let data = await axios.post('/getPlot', {
        data: requestObject,
        responseType: 'arraybuffer'
    })

    return `data:image/png;base64,${data.data}`;
}

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

const getRequest = ({ flow, id, mapping }, url) => {
    let requestObject = { type: url };
    if (!flow || !id || !mapping) {
        return false;
    }
    let chain = flow.chain;

    for (let i = 0; i < chain.length; i++) {
        if (!mapping[chain[i]])
            continue;
        requestObject[mapping[chain[i]].type] = mapping[chain[i]].val;
    }
    requestObject['type'] = url;
    return requestObject;
    // get with the id-value selector
}



export const OutputNode = (data) => {

    // fetch data from the server
    let type = data.type;
    let id = data.props.id;

    const flow = useSelector(state => state.flow.flow);
    const mapping = useSelector(state => state.mapping);
    const selected = useSelector(state => state.state.selected);
    const [url, setUrl] = useState('Sunburst');
    const [result, setResult] = useState();

    React.useEffect(() => {

        if (url === 'Spider Web') {
            getImageData({ ...getFlow(id, flow), ...mapping }, url).then(e => {
                setResult(e)
            });
            return;
        }

        const x = getRequest({ ...getFlow(id, flow), ...mapping }, url);
        if (x) {
            axios.post('/getPlot', {
                data: x
            }).then(e => setResult(e))
        }
    }, [mapping, id, flow, url]);


    return (
        <div style={{
            maxWidth: '600px',
            height: '600px',
            width: '600px',
            backgroundColor: [...selected].map(element => element.id).includes(id) ? colors.selectedColor : colors.unselectedColor,
        }}>
            {type === 'text' ? (result ? <pre style={{ maxWidth: '500px' }}>
                {JSON.stringify(result, undefined, 2)}
            </pre> : <>
                <h1> Output text </h1>
                <h2> Please choose a data flow</h2>
            </>) : <DataDisplay data={result} id={id} setSelection={setUrl} />
            }
        </div>
    );
}
