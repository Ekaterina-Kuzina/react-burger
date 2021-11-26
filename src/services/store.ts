import  {rootReducer}  from './reducers/index'
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {socketMiddleware} from './middleware/socketMiddleware'


import {
  WS_INIT_CONNECTION,
  WS_ON_OPEN,
  WS_SEND_MESSAGE,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
} from './constants'


export const composeEnhancers =
  typeof window === 'object' &&(window as any ).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any ).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;


export const wsActions = {
  wsInitConnection: WS_INIT_CONNECTION,
  wsOnOpen: WS_ON_OPEN,
  wsSendMessage: WS_SEND_MESSAGE,
  onMessage: WS_GET_MESSAGE,
  onClose:WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
};

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

export const store = createStore(rootReducer, enhancer)

