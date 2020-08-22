import React from 'react';
import { DataDisplay } from '../';

export const OutputNode = ({url, type }) => {
    console.log(url);
    // fetch data from the server
    let data = url;
    return (
        <div>
            {type === 'text' ? <pre>
                {JSON.stringify(data, undefined, 2)}
            </pre> : <DataDisplay data={data}/>
            }
        </div>
    );

}
