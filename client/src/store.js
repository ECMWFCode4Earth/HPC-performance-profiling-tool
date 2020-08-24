import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { combineReducers } from 'redux'

const initialState = {};
const TRIGGER_UPDATE = 'TRIGGER_UPDATE';
const ADD_ELEMENTS = 'ADD_ELEMENTS';


// Create Id value mapping

function updateReducer(state = initialState, action) {
  switch (action.type) {
    case TRIGGER_UPDATE:
      return { ...state, flow: action.flow };

    default:
      return state;
  }
}
function addReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ELEMENTS:
      return { ...state, elements: action.elements };
    default:
      return state;
  }
}


export const updateAction = (flow) => {
    return {
        type: TRIGGER_UPDATE,
        flow: flow,
    };
}

export const addElementsAction = (elements) => {
  return {
      type: ADD_ELEMENTS,
      elements: elements,
  };
}


export const rootReducer = combineReducers({
  elements: addReducer,
  flow: updateReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [logger],
  preloadedState: initialState
});

export default store
