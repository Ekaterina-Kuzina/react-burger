import {
    GET_CONSTRUCTER_DATA, 
    REMOVE_CONSTRUCTER_DATA, 
    FILTER_CONSTRUCTER, 
    GET_BUN_DATA, 
    COUNT_PRICE 
} from '../constants'

import {TItemData} from '../types/data'

export interface IGetConstructerData {
    readonly type: typeof GET_CONSTRUCTER_DATA;
    readonly constructerIngredients: TItemData;
}

export interface IRemoveConstructerData {
    readonly type: typeof REMOVE_CONSTRUCTER_DATA;
    readonly _id: string;
}

export interface IFilterConstructer {
    readonly type: typeof FILTER_CONSTRUCTER;
    readonly dragIndex: number;
    readonly hoverIndex : number;
}

export interface IGetBunData{
    readonly type: typeof GET_BUN_DATA;
    readonly constructerBun: TItemData;
}

export interface ICountPrice{
    readonly type: typeof COUNT_PRICE;
    readonly price: number;
}
