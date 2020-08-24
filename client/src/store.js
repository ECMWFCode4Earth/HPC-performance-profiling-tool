import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { combineReducers } from 'redux'

const initialState = {};
const TRIGGER_UPDATE = 'TRIGGER_UPDATE';
function updateReducer(state = initialState, action) {
  switch (action.type) {
    case TRIGGER_UPDATE:
      return { ...state, flow: action.flow };
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

export const rootReducer = combineReducers({
  flow: updateReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [logger],
  preloadedState: initialState
});

export default store
