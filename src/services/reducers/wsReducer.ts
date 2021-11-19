import {
    WS_INIT_CONNECTION,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_ON_OPEN
} from '../constants';
  import { TWsActions } from '../actions/wsActions'
  type TWsReducerInitialState = {
    wsConnected: boolean,
    messages: any,
    user?: any
}

  const initialState:TWsReducerInitialState = {
    wsConnected: false,
    messages: []
  };
  
  export const wsReducer = (state = initialState, action: TWsActions): TWsReducerInitialState => {
    switch (action.type) {
      case WS_INIT_CONNECTION:
        return {
          ...state,
          wsConnected: true
        };

      case WS_ON_OPEN:
        return {
          ...state,
          wsConnected: true
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          wsConnected: false
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false
        };
  
      case WS_GET_MESSAGE:
        return {
          ...state,
          messages: [action.payload]
        };
  
      default:
        return state;
    }
  };

  export const wsReducerForHistory = (state = initialState, action: TWsActions): TWsReducerInitialState => {
    switch (action.type) {
      case WS_INIT_CONNECTION:
        return {
          ...state,
          wsConnected: true
        };

      case WS_ON_OPEN:
        return {
          ...state,
          wsConnected: true
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          wsConnected: false
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false
        };
  
      case WS_GET_MESSAGE:
        return {
          ...state,
          messages: [action.payload]
        };
  
      default:
        return state;
    }
  };