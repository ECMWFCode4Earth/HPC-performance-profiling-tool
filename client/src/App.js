import React, { useState, useEffect } from "react";
import ReactFlow, { MiniMap } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios';
import {
  SidebarMenu,
  CustomComponent,
  CustomEdge,
  Selector,
  DataSource,
  OutputNode,
  SelectorPlot
  // DataDisplay
} from './components/';
import { getFlows } from './utils';
import { updateAction, addElementsAction } from './store';
import { useHotkeys } from 'react-hotkeys-hook';

const nodeTypes = {
  customNode: CustomComponent,
  agregatorNode: CustomComponent
};

const edgeTypes = {
  custom: CustomEdge,
};

const graphStyles = {
  width: '100vw',
  height: '100vh',
  maringLeft: '200px'
};

const BasicGraph = ({ elements, setElements }) => {
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();

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
        dispatch(addElementsAction(removeEls(elsCopy, selected)));
      }
    };
  }, [selected, setElements, elements, dispatch])


  const [copy, setCopy] = useState(false);
  const [paste, setPaste] = useState(false);
  useHotkeys('ctrl+c', () => setCopy(true));
  useHotkeys('ctrl+v', () => setPaste(true));
  const [clipboard, setClipboard] = useState([]); // :clipboard:

  useEffect(
    () => {
      if (!copy) {
        setPaste(false);
      }

      if (selected.length > 0 && copy) {
        setClipboard(selected);
        // set the copy item
        // if that item is set paste the item
        if (clipboard.length > 0 && paste) {
          setCopy(false);
          setPaste(false);
        }
      }
    }, [copy, paste, clipboard.length, selected]
  );

  useEffect(() => {
// There are some connection issues also they do not keep the state
    if (copy && paste) {
      const res = [
        ...elements,
        ...clipboard.map((e, index) => {
          let element = elements.filter(elem => elem.id === e.id);
          if (!element || !element.length > 0)
            return null;
          let newE = {...element[0]};

          if (newE?.type === 'customNode') {
            newE.position = { x: 300, y: 900 + (index) * (200) };
            newE.id += '_copy' + elements.length;
          } else {
            // TODO copy of a copy problems
            newE.id += '_copy' + elements.length;
            const regex = /([0-9]*__)(.*)/;
            const sourceRe = newE.source.match(regex);
            newE.source = sourceRe[1].replace('__', '_') + `copy${elements.length}__` + sourceRe[2];
            const targetRe = newE.target.match(regex);
            newE.target = targetRe[1].replace('__', '_') + `copy${elements.length}__` + targetRe[2];
          }
          return newE;
        })
      ];
      setElements(res);
    }

  }, [clipboard, paste, elements, copy, setElements]);


  useEffect(() => {
    console.log(elements)
  }, [elements])


  const onConnect = (params) => {
    console.log(params)
    setElements((els) => {
      const edge = {
        ...params,
        id: 'HPC_LINK_' + params.source + params.target + '_' + (Math.random() * 100),
        type: 'custom',
        className: 'HPC_LINK'
      };
      dispatch(addElementsAction([...els, edge]));

      return [...els, edge];
    });
  }

  return (
    <ReactFlow
      onConnect={onConnect}
      nodesConnectable={true}
      elements={elements}
      style={graphStyles}
      onSelectionChange={e => {
        if (e?.length > 0)
          setSelected(e);
      }}
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

const getNodes = (elements) => {
  return elements?.filter(e => e.data);
}


/**
 * Also the output node has a type for :: plotly picture sau text output
 * TODO create factory for the nodes; 
 * Add every node in there
 */
const initialElements = [];

export default function App() {
  const [dragableObjects,] = useState([]);
  const [elements, setElements] = useState(initialElements);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dragableObjects.length)
      return
    let newElem = {
      // TODO do not calculate id like this
      id: '' + ((Math.random() * 1000) % 1000),
      data: { label: dragableObjects },
      position: { x: ((Math.random() * 500) % 500), y: ((Math.random() * 500) % 500) }
    };
    setElements(els => [...els, newElem]);
    dispatch(addElementsAction([...elements, newElem]));
  }, [dragableObjects, dispatch, elements]);

  useEffect(() => {
    // DEBUG This works
    dispatch(updateAction(getFlows(getLinks(elements), getNodes(elements))));
  }, [elements, dispatch]);

  const getID = (e) => {
    return '' + e.length;
  }
  const stateSave = useSelector(state => state);

  const sideBarObject = [

    {
      name: 'Source',
      img: 'data:image/png;base64,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',
      callback: () => setElements(e => [
        ...e,
        {
          id: getID(e),
          type: 'customNode',
          data: { children: (props) => <DataSource {...props} />, type: 'Dsource' },
          style: { border: '1px solid #777' },
          position: { x: 250, y: 150 },
        },
      ])
    },
    {
      name: 'Selector',
      img: 'https://www.zmangames.com/static/admin/img/search.svg',
      callback: () => setElements(e => [
        ...e,
        {
          id: getID(e),
          type: 'customNode',
          data: { children: (props) => <Selector {...props} endpoint='columns' />, type: 'DSelector' },
          style: { border: '1px solid #777' },
          position: { x: 100, y: 100 },
        },
      ])
    },
    {
      name: 'Filter',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Filter_font_awesome.svg/1200px-Filter_font_awesome.svg.png',
      callback: () => setElements(e => [
        ...e,
        {
          id: getID(e),
          type: 'customNode',
          data: { children: (props) => <Selector {...props} endpoint='rows' />, type: 'DSelector' },
          style: { border: '1px solid #777' },
          position: { x: 100, y: 100 },
        },
      ])
    },
    {
      name: 'Data display',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTIVIXDccWKBWH-t3x8ALOVNADWMYxOWmyfGw&usqp=CAU',
      callback: () => setElements(e => [
        ...e,
        {
          id: getID(e),
          type: 'customNode',
          data: { children: (props) => <OutputNode props={props} type='display' />, type: 'Onode' },
          style: { border: '1px solid #777' },
          position: { x: 100, y: 100 },
        },
      ])
    },
    {
      name: 'Graph Selector',
      img: 'https://svgjs.com/docs/3.0/assets/images/logo-svg-js-01d.png',
      callback: () => setElements(e => [
        ...e,
        {
          id: getID(e),
          type: 'customNode',
          data: { children: (props) => <SelectorPlot {...props} endpoint='get-sources-tree' />, type: 'DSelector' },
          style: { border: '1px solid #777' },
          position: { x: 100, y: 100 },
        },
      ])
    },
    {
      name: 'Save',
      img: 'data:image/jpeg;base64,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',
      callback: () => {
        saveFile(stateSave)
      }
    },
  ]

  function saveFile(state) {
    var text = JSON.stringify(state),
      blob = new Blob([text], { type: 'text/plain' }),
      anchor = document.createElement('a');
    anchor.download = "state.txt";
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
    anchor.click();
  }

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
            sideBarObject.map((e, idx) =>
              <SidebarMenu
                key={idx}
                componentName={e.name}
                componentCallback={e.callback}
                componentImage={e.img}
              />
            )
          }
        </div>
        <BasicGraph elements={elements} setElements={setElements} />
      </div>
    </div>
  );
}
