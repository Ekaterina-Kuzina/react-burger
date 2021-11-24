import {
    WS_INIT_CONNECTION,
    WS_ON_OPEN,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
} from '../constants';
import{TWsUserOrders} from '../types/data'
export interface IwsInitConnection {
    readonly type: typeof WS_INIT_CONNECTION;
    payload: string
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
    payload: TWsUserOrders
}
export interface IWsSendMessage {
    readonly type: typeof WS_SEND_MESSAGE;
    payload: string
}

export type TWsActions =
    | IwsInitConnection
    | IwsOnOpen
    | IWsConnectionError
    | IWsConnectionClosed
    | IWsGetMessage
    | IWsSendMessage

export const wsInitConnection = (url: string): IwsInitConnection => {
    return {
        type: WS_INIT_CONNECTION,
        payload: url

    };
};
export const wsOnOpen = (): IwsOnOpen => {
    return {
        type: WS_ON_OPEN
    };

}

export const wsConnectionError = (): IWsConnectionError => {
    return {
        type: WS_CONNECTION_ERROR
    };
};

export const wsConnectionClosed = (): IWsConnectionClosed => {
    return {
        type: WS_CONNECTION_CLOSED
    };
};

export const wsGetMessage = (message: TWsUserOrders): IWsGetMessage => {
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
