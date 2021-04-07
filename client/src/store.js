import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { combineReducers } from 'redux'

const initialState = {};
const TRIGGER_UPDATE = 'TRIGGER_UPDATE';
const ADD_ELEMENTS = 'ADD_ELEMENTS';
const ID_MAPPING = 'ID_MAPPING';
const SELECTED = 'SELECTED';

// Create Id value mapping


function stateReducer(state = initialState, action) {
  switch (action.type) {
    case SELECTED:
      return { ...state, selected: [...action.payload] };
    default:
      return state;
  }
}

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

function idMappingReducer(state = initialState, action) {
  switch (action.type) {
    case ID_MAPPING:
      let newState = state.mapping ?? {};
      newState[action.mapping.id] = { val: action.mapping.value, type: action.mapping.type };
      return { ...state, mapping: newState };
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

export const mappingElementsAction = (mapping) => {
  return {
    type: ID_MAPPING,
    mapping: mapping,
  };
}

export const rootReducer = combineReducers({
  state: stateReducer,
  elements: addReducer,
  mapping: idMappingReducer,
  flow: updateReducer
});

const middlewares = false ? [logger] : [];
const store = configureStore({
  reducer: rootReducer,
  middleware: [...middlewares],
  preloadedState: initialState
});

export default store
