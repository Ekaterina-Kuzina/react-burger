import {
    WS_INIT_CONNECTION,
    WS_ON_OPEN,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
    WS_USER_NAME_UPDATE
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
export interface IWsUserNameUpdate {
    readonly type: typeof WS_USER_NAME_UPDATE;
    payload: string
}
export type TWsActions =
    | IwsInitConnection
    |IwsOnOpen
    | IWsConnectionError
    | IWsConnectionClosed
    | IWsGetMessage
    | IWsSendMessage
    | IWsUserNameUpdate

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

export const wsUserNameUpdate = (userName: any): IWsUserNameUpdate => {
    return {
        type: WS_USER_NAME_UPDATE,
        payload: userName
    };
};

