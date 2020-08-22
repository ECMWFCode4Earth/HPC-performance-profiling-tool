import React, { useState, useEffect } from "react";
import jsonExample from "./example.json";
import ReactFlow, { MiniMap } from 'react-flow-renderer';
import {
  SidebarMenu,
  CustomComponent,
  CustomEdge,
  Filter,
  Selector,
  DataSource,
  OutputNode,
  DataDisplay
} from './components/';
import { getFlows } from './utils';
import axios from 'axios';

const nodeTypes = {
  customNode: CustomComponent,
  agregatorNode: CustomComponent
};

const edgeTypes = {
  custom: CustomEdge,
};




// TODO: connect to the server
// TODO: link rules add - check if input node or not
// TODO: bad style to keep this components here
// TODO: add all this components to the sidebar


const graphStyles = {
  width: '100vw',
  height: '100vh',
  maringLeft: '200px'
};

const BasicGraph = ({ elements, setElements }) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const removeEls = (myArray, toRemove) => {
      for (let i = myArray.length - 1; i >= 0; i--) {
        for (let j = 0; j < toRemove.length; j++) {
          if (('' + myArray[i]?.source).startsWith('' + toRemove[j].id) || (myArray[i]?.target + '').startsWith('' + toRemove[j].id)) {
            myArray.splice(i, 1);
          }
        }
      }

      for (let i = myArray.length - 1; i >= 0; i--) {
        for (let j = 0; j < toRemove.length; j++) {

          if (myArray[i] && (myArray[i].id === toRemove[j].id)) {
            myArray.splice(i, 1);
          }
        }
      }
      return myArray;
    }
    document.onkeypress = function (evt) {
      evt = evt || window.event;
      var charCode = evt.keyCode || evt.which;
      if (charCode === 127) {
        let elsCopy = [...elements];
        setElements((removeEls(elsCopy, selected)));
      }
    };
  }, [selected, setElements, elements])

  const onConnect = (params) => setElements((els) => {
    const edge = {
      ...params,
      id: 'HPC_LINK_' + params.source + params.target + '_' + (Math.random() * 100),
      type: 'custom',
      className: 'HPC_LINK'
    };
    return [...els, edge]
  });

  return (
    <ReactFlow
      onConnect={onConnect}
      nodesConnectable={true}
      elements={elements}
      style={graphStyles}
      onKeyPress={
        (e) => console.log(e)
      }
      onSelectionChange={e => {
        console.log(e);
        if (e?.length > 0) {
          setSelected(e);
          console.log(e)
        }
      }
      }
      zoomOnScroll={true}
      elementsSelectable={true}
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
    </ReactFlow>
  );

}

const getLinks = (elements) => {
  return elements?.filter(e => e.target);
}


const initialElements = [
  {
    id: '1',
    type: 'customNode',
    data: { children: <DataSource />, type: 'Dsource' },
    style: { border: '1px solid #777' },
    position: { x: 250, y: 50 },
  },
  {
    id: '3',
    type: 'customNode',
    data: { children: <DataSource />, type: 'Dsource' },
    style: { border: '1px solid #777' },
    position: { x: 250, y: 50 },
  },
  {
    id: '2',
    type: 'customNode',
    data: {
      children: <OutputNode type='text' url={{
        "data": {
          "x": "1",
          "y": "1",
          "url": "http://url.com"
        },
        "event": "start",
        "show": 1,
        "id": 50
      }} />, type: 'Onode'
    },
    style: { border: '1px solid #777' },
    position: { x: 450, y: 50 },
  },
  {
    id: '3',
    type: 'customNode',
    data: {
      children: <OutputNode type='dispaly' url={'url'} />, type: 'Onode'
    },
    style: { border: '1px solid #777' },
    position: { x: 450, y: 50 },
  },
];

export default function App() {
  const [index, setIndex] = useState(1);
  const [dragableObjects, setDragableObjects] = useState([]);
  const [elements, setElements] = useState(initialElements);


  useEffect(() => {
    if (!dragableObjects.length)
      return
    let newElem = {
      id: '' + ((Math.random() * 1000) % 1000),
      data: { label: dragableObjects },
      position: { x: ((Math.random() * 500) % 500), y: ((Math.random() * 500) % 500) }
    };
    setElements(els => [...els, newElem]);
  }, [dragableObjects]);

  return (
    <div onKeyPress={e => console.log(e)}>
      <button onClick={() => {
        // get the links
        console.log(getLinks(elements));
        console.log(getFlows(getLinks(elements)));
      }}> Get the links to the console </button>
      <button onClick={() => {
        console.log(elements)
      }}> get to server </button>
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
            jsonExample.array.map((e, idx) => <SidebarMenu
              key={idx}
              componentName={e.componentName}
              componentLocation={e.componentLocation}
              componentCallback={(name) => setDragableObjects(name)}
              componentImage={e.componentImage}
            />
            )
          }
        </div>
        <BasicGraph elements={elements} setElements={setElements} />
      </div>
    </div>
  );
}
