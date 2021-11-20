import {
    WS_INIT_CONNECTION,
    WS_ON_OPEN,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,

    WS_INIT_CONNECTION_HISTORY, 
    WS_ON_OPEN_HISTORY, 
    WS_CONNECTION_ERROR_HISTORY, 
    WS_CONNECTION_CLOSED_HISTORY, 
    WS_GET_MESSAGE_HISTORY, 
    WS_SEND_MESSAGE_HISTORY
} from '../constants';

export interface IwsInitConnection {
    readonly type: typeof WS_INIT_CONNECTION;
}
export interface IwsOnOpen {
    readonly type: typeof WS_ON_OPEN;
}
export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    payload: string
}
export interface IWsSendMessage {
    readonly type: typeof WS_SEND_MESSAGE;
    payload: string
}

export interface IwsInitConnectionHistory {
    readonly type: typeof WS_INIT_CONNECTION_HISTORY;
}
export interface IwsOnOpenHistory {
    readonly type: typeof WS_ON_OPEN_HISTORY;
}
export interface IWsConnectionErrorHistory {
    readonly type: typeof WS_CONNECTION_ERROR_HISTORY;
}
export interface IWsConnectionClosedHistory {
    readonly type: typeof WS_CONNECTION_CLOSED_HISTORY;
}
export interface IWsGetMessageHistory {
    readonly type: typeof WS_GET_MESSAGE_HISTORY;
    payload: string
}
export interface IWsSendMessageHistory {
    readonly type: typeof WS_SEND_MESSAGE_HISTORY;
    payload: string
}

export type TWsActions =
    | IwsInitConnection
    | IwsOnOpen
    | IWsConnectionError
    | IWsConnectionClosed
    | IWsGetMessage
    | IWsSendMessage
    |IwsInitConnectionHistory
    | IwsOnOpenHistory
    | IWsConnectionErrorHistory
    | IWsConnectionClosedHistory
    | IWsGetMessageHistory
    | IWsSendMessageHistory


export const wsInitConnection = (): IwsInitConnection => {
    return {
        type: WS_INIT_CONNECTION
    };
};
export const wsOnOpen = (): IwsOnOpen =>{
    return {
        type: WS_ON_OPEN
    };

}

export const wsConnectionError = () : IWsConnectionError=> {
    return {
        type: WS_CONNECTION_ERROR
    };
};

export const wsConnectionClosed = (): IWsConnectionClosed => {
    return {
        type: WS_CONNECTION_CLOSED
    };
};

export const wsGetMessage = (message: string): IWsGetMessage => {
    return {
        type: WS_GET_MESSAGE,
        payload: message
    };
};

export const wsSendMessage = (message: string): IWsSendMessage => {
    return {
        type: WS_SEND_MESSAGE,
        payload: message
    };
};
