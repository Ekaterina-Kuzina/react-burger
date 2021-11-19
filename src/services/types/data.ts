export type TItemData = {
    _id: string;
    type: string;
    name: string;
    constructerID: string;
    index: number;
    price: number;
    image: string;
    image_mobile?: string;
    image_large?: string;
    proteins?: number;
    fat?: number;
    carbohydrates?:number;
    calories?:number;
}

export type TLoginData = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: {email: string ; name: string};
}

export type TLogout = {
    success: boolean;
    message: string;
}

export type TUserInfo = {
    email: string;
    name: string;
}

export type TWsOrder = {
    ingredients: string[];
    name: string;
    _id:  string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
}

export type TWsUserOrders = {
    success: boolean;
    orders: TWsOrder[];
    total: number;
    totalToday: number;
}

