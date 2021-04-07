import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import colors from "../../utils/colors";

export const DataDisplay = (props) => {
    // the data contains the data and the layout data
    const [data, setData] = useState();
    const [selection, setSelection] = useState('Sunburst');
    const selected = useSelector(state => state.state.selected);
    const options = ['Sunburst', 'Spider Web', 'Roofline'];
    let id = props.id;
    useEffect(() => {
        try {
            setData(JSON.parse(props.data.data));
        }
        catch (e) {
            setData(props.data);
        }
    }, [props, selection]);
    const setSelection1 = props.setSelection;
    React.useEffect(() => {
        setSelection1(selection);
    }, [selection, setSelection1]);


    // TODO get the state into here
    // The state changes so the graph dissapears

    return (
        <div style={{
            height: '200px',
            backgroundColor: [...selected].map(element => element.id).includes(id) ? colors.selectedColor : colors.unselectedColor,
            width: '200px'
        }}>
            <select name="graph-type" id="graph-type" onInput={e => setSelection(e.target.value)}>
                {options.map((e, idx) => <option key={idx} value={e}>{e}</option>)}
            </select>
            {
                data ? (<>
                    {selection === 'Spider Web' ? <img height='500px' width='500px' src={data} alt='plot' /> :
                        <Plot
                            onClickAnnotation={e => console.log(e)}
                            onClick={e => console.log(e)}
                            data={data.data}
                            layout={data.layout}
                        />
                    }
                </>) : <>
                    <h1> Display data </h1>
                    <h2> Please choose a data flow</h2>
                </>
            }
        </div>
    )
}


