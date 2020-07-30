import React, { useState } from "react";
import { DragableComps } from './components/DragableComps';
import jsonExample from "./example.json";
import ResizableComponent from './components/ResizableComponent.js'
import { Modal } from './components';

export default function App() {
  const parentBoundary = {
    width: "100%",
  };

  const [dragableObjects, setDragableObjects] = useState([])
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <Modal data={[1, 2]} show={modalShow} setModalShow={setModalShow}/>
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
              modalShow={modalShow}
              setModalShow={setModalShow}
              componentCallback={(name) => setDragableObjects([...dragableObjects, name])}
              componentImage={e.componentImage}
            />
            )
          }
        </div>
        <div style={{ ...parentBoundary, height: "97vh", margin: "20px" }}>
          {dragableObjects.map((e, idx) => <ResizableComponent key={idx} componentLocation={e} />)}
        </div>
      </div>
    </div>
  );
}
