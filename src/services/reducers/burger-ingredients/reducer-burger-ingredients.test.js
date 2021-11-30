import {selectedIngredient} from './burger-ingredients'
import {
    SELECT_INGREDIENT,
    CLEAR_INGREDIENT,
} from '../../actions/index';

describe('selectedIngredient reducer', () => {
    const initialState = {
        selected: {},
    }

    const selectedItem = {
        _id: "60d3b41abdacab0026a733c9",
        name: "Мясо бессмертных моллюсков Protostomia",
        type: "main",
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: "https://code.s3.yandex.net/react/code/meat-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
        __v: 0,
    }

    test('should have initial state', () =>{
        const action = {type: ''}
        const reducer = selectedIngredient(undefined, action)
        expect(reducer).toEqual(initialState)
    });

    test('should handle SELECT_INGREDIENT', () => {
        const reducer = selectedIngredient(initialState,{type: SELECT_INGREDIENT, selected: selectedItem})

        expect(reducer).toEqual({
            selected: selectedItem,
        })
    })
    
    test('should handle CLEAR_INGREDIENT', () => {
        const reducer = selectedIngredient(initialState,{type: CLEAR_INGREDIENT})

        expect(reducer).toEqual(initialState)
    })

})