import React, { useState, useEffect } from "react";
import { DragableComps } from './components/DragableComps';
import jsonExample from "./example.json";
import ReactFlow, { addEdge } from 'react-flow-renderer';
import CustomComponent from './components/CustomComponent';
const nodeTypes = {
  selectorNode: CustomComponent,
  agregatorNode: CustomComponent 
};

const initialElements = [
  {
    id: '0',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 }
  },
  {
    id: '2',
    type: 'selectorNode',
    data: { onChange: () => 'aa', color: 'red' },
    style: { border: '1px solid #777', padding: 10 },
    position: { x: 250, y: 50 },
  },
];

// add zoom out
// add remove
// add minimap
// trebuie sa ma uit cum fac event de double click sau imi fac eu niste event uri acolo
// trebuie sa imi fac o functie de delete
// React flow get status
// trebuie sa ma uit cum fac event de double click sau imi fac eu niste event uri acolo
// trebuie sa imi fac o functie de delete
// React flow get status
// get on connect source and target and like so we know if input or output node
// the links disapear when you add new element
// delete possibility for the nodes
// connect to the server

const graphStyles = { width: '100vw', height: '100vh', maringLeft: '200px' };

const BasicGraph = ({ elements, setElements }) => {
  // get on connect source and target and like so we know if input or output node
  const onConnect = (params) => setElements((els) => {
    // check if not already linked
    return addEdge(params, els)
  });

  const removeEl = (el) => {
    // create get connected edges
    // remove the link as well
    console.log();
    return elements;
    // return elements.filter(e => e.id !== el.id);

  }
  useEffect(() => {
    console.log(elements);
  }, [elements])
  return <ReactFlow
    onElementClick={(event, el) => { setElements(removeEl(el)); }}
    onConnect={onConnect}
    nodesConnectable={true}
    elements={elements}
    style={graphStyles}
    nodeTypes={nodeTypes}
    />;

}


export default function App() {
  const [dragableObjects, setDragableObjects] = useState([]);
  const [elements, setElements] = useState(initialElements);
  useEffect(() => {
    let newElem = [];
    dragableObjects.forEach((e, idx) => {
      newElem.push(
       {
        id: '' + (idx + 1),
        data: { label: e },
        position: { x: 250, y: 100 }
      })
    })
    console.log(newElem);
    setElements([...initialElements, ...newElem]);
    console.log(dragableObjects);
  }, [dragableObjects])
  return (
    <div>
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
        <BasicGraph elements={elements} setElements={setElements} />
        {/* <div style={{ ...parentBoundary, height: "97vh", margin: "20px" }}>
          {dragableObjects.map((e, idx) => <   key={idx} componentLocation={e} />)}
        </div> */}
      </div>
    </div>
  );
}
