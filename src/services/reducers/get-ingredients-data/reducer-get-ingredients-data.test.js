import {ingredientsData} from './get-ingredients-data'
import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,

} from '../../actions/index'

describe('ingredientsData reducer', () => {
    const initialState = {
        ingredients: [],
        ingredientsRequest: false,
        ingredientsFailed: false,
        flagSuccess: false,
        ingredientsObjectWithKeyId: null
    }

    const addIngredient = [{
        _id: "60d3b41abdacab0026a733c6",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v: 0,
    }, 
]

    const addIngredientWithKeyId = {
        '60d3b41abdacab0026a733c6': {
            _id: "60d3b41abdacab0026a733c6",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0,
        },      
    }

    test('should have initial state', () => {
        const action = {type: ''}
        const reducer = ingredientsData(undefined, action)
        expect(reducer).toEqual(initialState)
    })

    test('should handle GET_INGREDIENTS', () => { 
        const reducer = ingredientsData(initialState, {type: GET_INGREDIENTS})

        expect(reducer).toEqual({
            ingredients: [],
            ingredientsRequest: true,
            ingredientsFailed: false,
            flagSuccess: false,
            ingredientsObjectWithKeyId: null
        })
    })
    
    test('should handle GET_INGREDIENTS_SUCCESS', () => { 
        const reducer = ingredientsData({
            ingredients: [],
            ingredientsRequest: true,
            ingredientsFailed: false,
            flagSuccess: false,
            ingredientsObjectWithKeyId: null
        }, {type: GET_INGREDIENTS_SUCCESS, ingredients: addIngredient})

        expect(reducer).toEqual({
            ingredients: addIngredient,
            ingredientsRequest: false,
            ingredientsFailed: false,
            flagSuccess: true,
            ingredientsObjectWithKeyId: addIngredientWithKeyId,
        })
    })

    test('should handle GET_INGREDIENTS_FAILED', () => { 
        const reducer = ingredientsData({
            ingredients: addIngredient,
            ingredientsRequest: false,
            ingredientsFailed: false,
            flagSuccess: true,
            ingredientsObjectWithKeyId: addIngredientWithKeyId,
        }, {type: GET_INGREDIENTS_FAILED})

        expect(reducer).toEqual({
            ingredients: addIngredient,
            ingredientsRequest: false,
            ingredientsFailed: true,
            flagSuccess: true,
            ingredientsObjectWithKeyId: addIngredientWithKeyId,
        })
    })
})
