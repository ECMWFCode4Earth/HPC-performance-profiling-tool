import React, { useState, useEffect } from "react";
import { DragableComps } from './components/DragableComps';
import jsonExample from "./example.json";
import ReactFlow, { MiniMap } from 'react-flow-renderer';
import CustomComponent from './components/CustomComponent';
import CustomEdge from './components/CustomEdge';

const nodeTypes = {
  selectorNode: CustomComponent,
  agregatorNode: CustomComponent
};

const edgeTypes = {
  custom: CustomEdge,
};


const initialElements = [
  {
    id: '1',
    type: 'selectorNode',
    data: { onChange: () => 'aa', color: 'red' },
    style: { border: '1px solid #777' },
    position: { x: 250, y: 50 },
  },
  {
    id: '2',
    type: 'selectorNode',
    data: { onChange: () => 'aa', color: 'red' },
    style: { border: '1px solid #777' },
    position: { x: 450, y: 50 },
  },
];

// add remove
// trebuie sa ma uit cum fac event de double click sau imi fac eu niste event uri acolo
// React flow get status
// get on connect source and target and like so we know if input or output node
// the links disapear when you add new element
// delete possibility for the nodes
// connect to the server
// investigate nodes horizontal
// add delete button
// link rules add

const graphStyles = { width: '100vw', height: '100vh', maringLeft: '200px' };

const BasicGraph = ({ elements, setElements }) => {
  // get on connect source and target and like so we know if input or output node
  const onConnect = (params) => setElements((els) => {
    const edge = { ...params, id: 'HPC_LINK_' + params.source + params.target + '_' + (Math.random() * 100), type: 'custom', className: 'HPC_LINK' };
    console.log(els);

    // check if not already linked
    return [...els, edge]
  });

  const removeEl = (el) => {
    // create get connected edges
    // remove the link as well
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
    edgeTypes={edgeTypes}
    connectionLineStyle={{ strokeWidth: '5px', stroke: '#3289a8' }}
  >
    <MiniMap
      nodeColor={(node) => {
        switch (node.type) {
          case 'input': return 'red';
          case 'default': return '#00ff00';
          case 'output': return 'rgb(0,0,255)';
          default: return '#eee';
        }
      }}
    />
  </ReactFlow>;

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
      <button onClick={() => {
        [...document.getElementsByClassName('HPC_LINK')].map(e => console.log(e.childNodes[0].id));
        // get the id for each of the links; that use it to map the tree
      }}> aaa</button>
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
