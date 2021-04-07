import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import colors from "../../utils/colors";

export const DataSelector = (props) => {
    const [data, setData] = useState();
    const [selection, setSelection] = useState('Sunburst');

    const selected = useSelector(state => state.state.selected);
    const options = ['Sunburst', 'Spider Web', 'Roofline'];
    useEffect(() => {
        try {
            setData(JSON.parse(props.data.data));
        }
        catch (e) {
            setData(props.data);
        }
    }, [props, selection]);


    console.log(props);


    const setSelection1 = props.setSelection;
    React.useEffect(() => {
        setSelection1(selection);
    }, [selection, setSelection1]);

    return (
        <div style={{
            backgroundColor: [...selectedFromStore].map(element => element.id).includes(id) ? colors.selectedColor : colors.unselectedColor,
            height: '200px',
            width: '200px'
        }}>
            {
                data ? (<>
                    <select name="graph-type" id="graph-type" onInput={e => setSelection(e.target.value)}>
                        {options.map((e, idx) => <option key={idx} value={e}>{e}</option>)}
                    </select>
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


