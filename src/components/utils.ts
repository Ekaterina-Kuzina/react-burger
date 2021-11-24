import {TWsOrder, TIngredientsObjectWithKeyId} from '../services/types/data'
//подсчет даты заказа

export function getDate (date: string) {
    const createdAtDate = new Date(date);
    const CurrentDate = new Date().setHours(0, 0, 0, 0);
    const day = (dayCount: number) =>
    dayCount === 0
        ? "Сегодня"
        : dayCount === 1
            ? "Вчера"
            : `${dayCount} дня(-ей) назад`;


    const dayCount = Math.ceil(
        (CurrentDate - createdAtDate.getTime()) / (60 * 60 * 24 * 1000)
    );
    const hours =
        createdAtDate.getHours() > 9
            ? createdAtDate.getHours()
            : `0${createdAtDate.getHours()}`;
    const minutes =
        createdAtDate.getMinutes() > 9
            ? createdAtDate.getMinutes()
            : `0${createdAtDate.getMinutes()}`;

    return `${day(dayCount)}, ${hours}:${minutes} i-GMT+${(createdAtDate.getTimezoneOffset() * -1) / 60
        }`;
};


//подсчет суммы заказа

export const countPrice = (objectOfIdIngredients:TWsOrder, ingredientObjectWithKeyId:TIngredientsObjectWithKeyId | null) => {
    let price = 0
    if(objectOfIdIngredients.ingredients){
        objectOfIdIngredients.ingredients.forEach((ingredientId: string, index: number) => {
            if (ingredientObjectWithKeyId) {
                price += Number(ingredientObjectWithKeyId[ingredientId].price)
            }
        })
    }

    return price
}