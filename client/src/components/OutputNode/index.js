import React from 'react';
import { DataDisplay } from '../';

export const OutputNode = (data) => {
    // fetch data from the server
    let type = data.type;
    let url = data.url;
    let id = data.props.id;

    // TODO check the state and if we are connected to something; fetch data
    return (
        <div>
            {type === 'text' ? <pre>
                {JSON.stringify(url, undefined, 2)}
            </pre> : <DataDisplay data={url}/>
            }
        </div>
    );

}
