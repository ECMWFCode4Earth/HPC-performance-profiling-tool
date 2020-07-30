
import React, { useState, useRef, useEffect } from "react";

const useOutsideClick = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export const Modal = (props) => {
  const values = props.data;
  const ref = useRef();
  const [inputVal, setInputVal] = useState("");
  const [inputValStates,] = useState([]);
  useOutsideClick(ref, () => props.show && props.setModalShow(false));

  return (props.show === true ?
    <div>
      <div style={{
        position: 'absolute',
        backgroundColor: 'black',
        opacity: '0.2',
        zIndex: '19',
        height: '100%',
        width: '100%'
      }}>
      </div>
      <div ref={ref} style={{
        position: "absolute",
        zIndex: "20",
        backgroundColor: 'red',
        top: "25%",
        left: "25%",
        height: "50%",
        width: "50%"
      }}>
        <button
          type="button"
          className="btn btn-lg"
          data-toggle="modal"
          data-target="#myModal"
        >
          Add new plot
        </button>

        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" onClick={() => props.setModalShow(false)}>
                  &times;
                </button>
                <h4 className="modal-title">
                  Select the elemnts that you want to display in the chart{" "}
                </h4>
              </div>
              <div className="modal-body">
                <div>
                  {inputValStates.map((e) => (
                    <div> {e} </div>
                  ))}
                </div>
                <input
                  list="ss"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                />
                <datalist id="ss">
                  {values.map((e, idx) => (
                    <option id={e} value={e} key={idx} />
                  ))}
                </datalist>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> : <></>
  );
};