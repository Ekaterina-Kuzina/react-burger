import {constructerData, bunData, countedPrice} from './burger-constructor';
import{GET_CONSTRUCTER_DATA, FILTER_CONSTRUCTER,REMOVE_CONSTRUCTER_DATA, CLEAR_CONSTRUCTER_DATA , GET_BUN_DATA, CLEAR_BUN_DATA, COUNT_PRICE} from '../../constants/burger-constructor'

describe('constructerData reducer', () => {
    const initialState = {
        constructerIngredients: [],
        constructerBun: null,
        price: 0
    }

    const addItemFirst = {
        _id: "60d3b41abdacab0026a733cb",
        name: "Биокотлета из марсианской Магнолии",
        type: "main",
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: "https://code.s3.yandex.net/react/code/meat-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
        __v: 0,
        constructerID: "79f69d2e-86bd-422c-aa29-6c03ac9a14f8",
        index: 0,
    };

    const addItemSecond = {
        _id: "60d3b41abdacab0026a733ca",
        name: "Говяжий метеорит (отбивная)",
        type: "main",
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: "https://code.s3.yandex.net/react/code/meat-04.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
        __v: 0,
        constructerID: "44091238-bfdb-4b4c-a8f3-fc90982ffcd4",
        index: 1,
    };

    test('should have initial state', () =>{
        const action = {type: '', constructerIngredients: null}
        const reducer = constructerData(undefined, action)
        expect(reducer).toEqual(initialState)
    });

    test('should handle GET_CONSTRUCTER_DATA', () =>{
        const reducer = constructerData(initialState, {type: GET_CONSTRUCTER_DATA, constructerIngredients: addItemFirst})
        const reducer2 = constructerData(
            {
                constructerIngredients: [addItemFirst],
                constructerBun: null,
                price: 0
            }
            , {type: GET_CONSTRUCTER_DATA, constructerIngredients: addItemSecond})

        expect(reducer).toEqual(
            {
                constructerIngredients: [addItemFirst],
                constructerBun: null,
                price: 0
            }
        )
        expect(reducer2).toEqual(
            {
                constructerIngredients: [addItemFirst, addItemSecond],
                constructerBun: null,
                price: 0
            }
        )
    });

    // test ('should handle FILTER_CONSTRUCTER', () => {
    //     const reducer = constructerData({
    //         constructerIngredients: [addItemFirst, addItemSecond],
    //         constructerBun: null,
    //         price: 0
    //     }, 
    //     {
    //         type: FILTER_CONSTRUCTER
    //     })

    //     expect(reducer).toEqual({
    //         constructerIngredients: [ addItemSecond, addItemFirst],
    //         constructerBun: null,
    //         price: 0
    //     })
    // });

    // test ('should handle REMOVE_CONSTRUCTER_DATA', () => {
    //     const reducer = constructerData({
    //         constructerIngredients: [addItemFirst, addItemSecond],
    //         constructerBun: null,
    //         price: 0
    //     }, 
    //     {
    //         type: REMOVE_CONSTRUCTER_DATA
    //     })

    //     expect(reducer).toEqual({
    //         constructerIngredients: [addItemFirst],
    //         constructerBun: null,
    //         price: 0
    //     })
    // });

    test('should handle CLEAR_CONSTRUCTER_DATA', () => {
        const reducer = constructerData({
            constructerIngredients: [addItemFirst, addItemSecond],
            constructerBun: null,
            price: 0
        }, 
        {
            type: CLEAR_CONSTRUCTER_DATA
        })

        expect(reducer).toEqual(initialState)
    });
})

describe('bunData reducer', () => {
    const initialState = {
        constructerIngredients: [],
        constructerBun: null,
        price: 0
    }

    const addBunItem = {
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
    }
    test('should have initial state', () =>{
        const action = {type: ''}
        const reducer = constructerData(undefined, action)
        expect(reducer).toEqual(initialState)
    });

    test('should handle GET_BUN_DATA', () => {
        const reducer = bunData(initialState, {type: GET_BUN_DATA, constructerBun: addBunItem})

        expect(reducer).toEqual({
            constructerIngredients: [],
            constructerBun: addBunItem,
            price: 0
        })
    })

    test('should handle CLEAR_BUN_DATA', () => {
        const reducer = bunData(initialState, {type: CLEAR_BUN_DATA})

        expect(reducer).toEqual(initialState)
    })
})

describe('countedPrice reducer', () => {
    const initialState = {
        constructerIngredients: [],
        constructerBun: null,
        price: 0
    }

    const priceItem = 1000

    test('should have initial state', () =>{
        const action = {type: ''}
        const reducer = constructerData(undefined, action)
        expect(reducer).toEqual(initialState)
    });

    test('should handle COUNT_PRICE', () => {
        const reducer = countedPrice(initialState, {type: COUNT_PRICE, price: priceItem })

        expect(reducer).toEqual({
            constructerIngredients: [],
            constructerBun: null,
            price: 1000
        })
    })
})


