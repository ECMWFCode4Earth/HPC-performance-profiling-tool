import React from 'react'
import './styles.css';
export function DragableComps({ componentName, componentLocation, componentCallback, componentImage }) {
    return (
        <div className="card-1" style={{
            backgroundColor: "0xfffffff",
            width: "100%",
            height: "80px",
            display: 'flex',
            verticalAlign: 'center',
            alignContent: 'center',
            alignItems: 'center'
        }}
            // this action should come from the network but here we are prerandering some examples
            onClick={() => componentCallback(componentLocation)}>
            <div style={{
                position: 'relative',
                maxWidth: '60px',
                maxHeight: '60px',
                marginLeft: '20px',
            }}>
                <img
                    height='60px'
                    width='auto'
                    style={{ maxHeight: "60px" }}
                    alt={"Logo"} src={window.location.origin + "/assets/" + componentImage}></img>
            </div>
            <p className="mdc-typography--headline1" style={{ marginLeft: '10px' }}>{componentName}</p>
        </div>
    )
}
