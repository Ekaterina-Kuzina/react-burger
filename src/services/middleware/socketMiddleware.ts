import type { Middleware, MiddlewareAPI } from 'redux';
import {AppDispatch,RootState} from '../types/index'

export const socketMiddleware = ( wsActions: any): Middleware=> {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInitConnection, wsOnOpen, onMessage, onClose, onError } = wsActions;
            if (type === wsInitConnection ) {
              socket = new WebSocket(payload);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({type: wsOnOpen , payload: event});
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    dispatch({ type: onMessage, payload: parsedData });
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };

            }

            next(action);
        };
    };
};