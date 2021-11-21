import type { Middleware, MiddlewareAPI } from 'redux';

export const socketMiddlewareForHistory = (wsUrlForHistory: string, wsActionsHistory: any): Middleware=> {
    return (store) => {
        let socket: WebSocket | null = null;

        return next => (action) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInitConnectionHistiry, wsOnOpenHistiry, wsSendMessageHistiry, onMessageHistiry, onCloseHistiry, onErrorHistiry } = wsActionsHistory;
            const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');

            if (type === wsInitConnectionHistiry && token ) {
              socket = new WebSocket(`${wsUrlForHistory}?token=${token}`);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({type: wsOnOpenHistiry , payload: event});
                };

                socket.onerror = event => {
                    dispatch({ type: onErrorHistiry, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    dispatch({ type: onMessageHistiry, payload: parsedData });
                };

                socket.onclose = event => {
                    dispatch({ type: onCloseHistiry, payload: event });
                };

                if (type === wsSendMessageHistiry) {
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