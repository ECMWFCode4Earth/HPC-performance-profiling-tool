import React, { useState } from "react";
import { DragableComps } from './components/DragableComps';
import jsonExample from "./example.json";
import ResizableComponent from './components/ResizableComponent.js'

export default function App() {
  const parentBoundary = {
    width: "100%",
  };

  const [dragableObjects, setDragableObjects] = useState([])

  return (
    <div style={{ display: "flex" }}>
      <div style={{
        width: "300px",
        height: "100vh",
        boxShadow: "0 20px 20px rgba(0,0,0,0.30)"
      }}>
        <div style={{ boxShadow: "0 2px 0px rgba(0,0,0,0.20)", paddingBottom: '0.5px' }}>
          <p className="mdc-typography--headline1"
            style={{
              textAlign: "center",
              fontSize: "30px"
            }}>
            Dashboard Menu
          </p>
        </div>
        {
          jsonExample.array.map((e, idx) => <DragableComps
            key={idx}
            componentName={e.componentName}
            componentLocation={e.componentLocation}
            componentCallback={(name) => setDragableObjects([...dragableObjects, name])}
            componentImage={e.componentImage}
          />
          )
        }
      </div>
      <div style={{ ...parentBoundary, height: "97vh", margin: "20px" }}>
        {dragableObjects.map((e, idx) => <ResizableComponent key={idx} componentLocation={e}/>)}
      </div>
    </div>
  );
}
