import {RootState} from '../types'
// export const getMessages = (store: RootState)=> store.chat.messages || [];
export const getUser = (store: RootState) => store.getUserInfo.userInfo;