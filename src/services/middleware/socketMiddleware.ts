import type { Middleware, MiddlewareAPI } from 'redux';



// export const socketMiddleware = (wsUrl: string, wsActions: TwsActionTypes): Middleware => {
//     return store => {
//       let socket: WebSocket | null = null;
  
//       return next => (action) => {
//         const { dispatch } = store;
//         const { payload } = action;
//         const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
//         if (wsInit.match(action)) {
//             socket = new WebSocket(payload);
//         }
//         if (socket) {
//           socket.onopen = event => {
//             dispatch( onOpen('WS_CONNECTION_SUCCESS'));
//           };
  
//           socket.onerror = event => {
//             dispatch(onError('WS_CONNECTION_ERROR'));
//           };
  
//           socket.onmessage = event => {
//             const { data } = event;
//             const parsedData = JSON.parse(data);
  
//             dispatch(onMessage(parsedData));
//           };
  
//           socket.onclose = event => {
//             dispatch( onClose());
//           };
  
//            if (wsSendMessage && wsSendMessage.match(action)) {
//             socket.send(JSON.stringify(payload));
//           }
//         }
  
//         next(action);
//       };
//     };
//   };

export const socketMiddleware = (wsUrl: string, wsActions: any): Middleware=> {
    return (store) => {
        let socket: WebSocket | null = null;

        return next => (action) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInitConnection, wsOnOpen, wsSendMessage, onMessage, onClose, onError } = wsActions;
            const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');
            if (type === wsInitConnection  ) {
              socket = new WebSocket(wsUrl);
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