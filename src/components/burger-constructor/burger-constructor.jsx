import React, { useState,useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { ConstructerData, MakeOrder } from '../app/data-context';
import { useDrop, useDrag } from "react-dnd";
import bunImg from '../../images/bun-01.png'

import { ConstructorElement, DragIcon, Button, CurrencyIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructor from './burger-constructor.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder } from '../../services/actions/index'
import {SELECT_INGREDIENT, GET_CONSTRUCTER_DATA, GET_BUN_DATA, REMOVE_CONSTRUCTER_DATA,FILTER_CONSTRUCTER} from '../../services/actions/index'

// const url = 'https://norma.nomoreparties.space/api/orders';
function BurgerConstructor(props) {
    const dispatch = useDispatch();

    // const ingredients = useSelector((state) => state.ingredientsData.ingredients)
    const price = useSelector((state) => state.countedPrice.price)
    // const {setMakeOrder} = useContext(MakeOrder)
    const [orderList, setOrderList] = useState([])

    const constructerIngredients = useSelector((state) => state.constructerData.constructerIngredients)
    const constructerBun = useSelector((state) => state.bunData.constructerBun)


    useEffect(()=>{
        let ids = [constructerBun._id]
        constructerIngredients.forEach(item => {
            ids.push(item._id)
        });
        setOrderList(ids)
    }, [constructerIngredients, constructerBun])

    const sendRequest = (orderList)=>{
        dispatch(sendOrder(orderList))
    }

    const onDropHandler = (item) =>{
        if(item.type === 'bun' ){
            dispatch({
                type: GET_BUN_DATA, 
                constructerBun: item
            })
            // setDraggetBun(item)
        }else{
            dispatch({
                type: GET_CONSTRUCTER_DATA,
                constructerIngredients: item
            })
            // setDraggetElem([...draggetElem, item])
        }
    }
    const [, dropTarget] = useDrop({
        accept: "ingredients",
        drop(item) {
            onDropHandler(item);
        }
    });


    return (

        <section className={`${constructor.wrapper} pt-15`}>
            <div className={`${constructor.inner_wrapper}`}>
                <div ref={dropTarget}>
                    <div className="pl-10">
                        {constructerBun !== undefined &&
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${constructerBun.name} (верх)`}
                                price={constructerBun.price}
                                thumbnail={constructerBun.image}
                            />
                        }
                    </div>

                    <div  >
                        {constructerIngredients !== [] &&
                            constructerIngredients.map((constructerItemData) => {
                                constructerItemData.constructerID = uuidv4();
                                
                                return (
                                    constructerItemData.type !== 'bun' &&
                                    <div key={constructerItemData.constructerID} className={`${constructor.item_wrapper} ${constructor.custom_scroll} pl-2 pr-2`}>
                                        <ItemOfConstructor constructerItemData={constructerItemData} />
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="pl-10">
                        {constructerBun !== undefined &&
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${constructerBun.name} (низ)`}
                                price={constructerBun.price}
                                thumbnail={constructerBun.image}
                            />
                        }

                    </div>
                </div>
                <div className={`${constructor.order} mt-10`}>
                    <div className={`${constructor.final_cost} mr-10`}>
                        <span className="mr-2 text text_type_digits-medium">{price}</span>
                        <CurrencyIcon type="primary" />
                    </div>

                    <Button onClick={() => {
                        props.orderButtonClicked();
                        sendRequest(orderList)
                    }} type="primary" size="large">Оформить заказ</Button>

                </div>
            </div>
        </section>
    )
}

function ItemOfConstructor({constructerItemData}) {
    const dispatch = useDispatch();
    const handleClose=(removedElement)=>{

        dispatch({
            type: REMOVE_CONSTRUCTER_DATA,
            _id: removedElement
        })
    }

    const onDropHandler = (item) =>{
        dispatch({
            type: FILTER_CONSTRUCTER, 
            constructerBun: item
        })
    }
    const [, dropTarget] = useDrop({
        accept: "constrIng",
        drop(constructerItemData) {
            onDropHandler(constructerItemData);
        }
    });
    const [{isDrag}, dragRef] = useDrag({
        type: "constrIng",
        constructerItemData: constructerItemData,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    console.log({dragRef});

        return (
            !isDrag && (
            <div ref={dragRef} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: '10px' }} className="mt-4 mb-4">
                <DragIcon type="primary" />
                <div>
                    <ConstructorElement
                        text={constructerItemData.name}
                        handleClose={()=>handleClose(constructerItemData._id)}
                        price={constructerItemData.price}
                        thumbnail={constructerItemData.image}

                    />

                </div>
            </div>
        )
        )
}

// BurgerConstructor.propTypes = {
//     bunData: PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         image: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//     }),
//     priceState: PropTypes.number.isRequired,
// }
// ItemOfConstructor.propTypes = {
//     constructerItemData: PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         image: PropTypes.string.isRequired,
//     })
// }

export default BurgerConstructor;
