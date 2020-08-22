import React from 'react'

export const OutputNode = ({ data = { 'data': '123', 'dats2': '124321' } }) => {
    var data = {
        "data": {
            "x": "1",
            "y": "1",
            "url": "http://url.com"
        },
        "event": "start",
        "show": 1,
        "id": 50
    };
    console.log(data);

    return (
        <div>
            <pre>
                {JSON.stringify(data, undefined, 2)}
            </pre>
        </div>
    );

}
