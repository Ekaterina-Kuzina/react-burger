import type { Middleware, MiddlewareAPI } from 'redux';

export const socketMiddlewareForHistory = (wsUrl: string, wsActions: any): Middleware=> {
    return (store) => {
        let socket: WebSocket | null = null;

        return next => (action) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInitConnection, wsOnOpen, wsSendMessage, onMessage, onClose, onError } = wsActions;
            const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');
            if (type === wsInitConnection ) {
              socket = new WebSocket(`${wsUrl}?token=${token}`);
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

                if (type === wsSendMessage) {
                    socket.send(JSON.stringify({
                        ...payload,
                        token: token
                    }));
                }
            }

            next(action);
        };
    };
};