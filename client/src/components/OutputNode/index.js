import React from 'react';
import { DataDisplay } from '../';

export const OutputNode = (data) => {
    // fetch data from the server
    let type = data.type;
    let url = data.url;
    let id = data.props.id;
    console.log(url)
    console.log(id)
    return (
        <div>
            {type === 'text' ? <pre>
                {JSON.stringify(url, undefined, 2)}
            </pre> : <DataDisplay data={url}/>
            }
        </div>
    );

}
