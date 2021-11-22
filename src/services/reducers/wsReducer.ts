import {
    WS_INIT_CONNECTION,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_ON_OPEN,
    FULL_OBJ_FROM_WS,

    WS_INIT_CONNECTION_HISTORY,
    WS_CONNECTION_ERROR_HISTORY,
    WS_CONNECTION_CLOSED_HISTORY,
    WS_GET_MESSAGE_HISTORY,
    WS_ON_OPEN_HISTORY,
    WS_SEND_MESSAGE_HISTORY
} from '../constants';
  import { TWsActions } from '../actions/wsActions'
  type TWsReducerInitialState = {
    wsConnected: boolean,
    wsConnectedHistory: boolean,
    messages: any,
    messagesHistory: any
    user?: any
}

  const initialState:TWsReducerInitialState = {
    wsConnected: false,
    wsConnectedHistory: false,
    messages: [],
    messagesHistory:[]
  };

  const forFullObjFromWsInitialState ={
    objFromWs: null
  }
  
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

  export const wsReducerForHistory = (state = initialState, action: any): TWsReducerInitialState => {
    switch (action.type) {
      case WS_INIT_CONNECTION_HISTORY:
        return {
          ...state,
          wsConnectedHistory: true
        };

      case WS_ON_OPEN_HISTORY:
        return {
          ...state,
          wsConnectedHistory: true
        };
  
      case WS_CONNECTION_ERROR_HISTORY:
        return {
          ...state,
          wsConnectedHistory: false
        };
  
      case WS_CONNECTION_CLOSED_HISTORY:
        return {
          ...state,
          wsConnectedHistory: false
        };
  
      case WS_GET_MESSAGE_HISTORY:
        return {
          ...state,
          messagesHistory: [action.payload]
        };
  
      default:
        return state;
    }
  };

  export const fullObjFromWs = (state = forFullObjFromWsInitialState, action: any): any => {
    switch (action.type) {
      case FULL_OBJ_FROM_WS:
        return {
          ...state,
          objFromWs: action.objFromWs
        };
  
      default:
        return state;
    }
  };

