import React from 'react'
import './styles.css';
export function SidebarMenu(
    {
        componentName,
        componentLocation,
        componentCallback,
        componentImage,
    }
) {
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
            onClick={componentCallback}
        >
            <div style={{
                position: 'relative',
                maxWidth: '60px',
                maxHeight: '60px',
                marginLeft: '20px',
            }}>
                <img
                    height='60px'
                    width='60px'
                    style={{ maxHeight: "60px" }}
                    alt={"Logo"} src={`${componentImage}`}></img>
            </div>
            <p className="mdc-typography--headline1" style={{ marginLeft: '10px' }}>{componentName}</p>
        </div>
    )
}
