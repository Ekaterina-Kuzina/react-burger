import React, { useRef } from 'react';
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from '../../services/hooks';
import { REMOVE_CONSTRUCTER_DATA } from '../../services/actions/index'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TItemData } from '../../services/types/data'

type TItemOfConstructorProps = {
    constructerItemData: TItemData;
    id: string;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void

}
export default function ItemOfConstructor({ constructerItemData, id, index, moveCard }: TItemOfConstructorProps) {

    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement>(null)
    const handleClose = (removedElement: string) => {
        dispatch({
            type: REMOVE_CONSTRUCTER_DATA,
            _id: removedElement
        })
    }

    const [{ handlerId }, drop] = useDrop({
        accept: 'constrIng',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: { index: number }, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset()!!;
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [, drag] = useDrag({
        type: 'constrIng',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div ref={ref} data-handler-id={handlerId} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: '10px' }} className="mt-4 mb-4">
            <DragIcon type="primary" />
            <div>
                <ConstructorElement
                    text={constructerItemData.name}
                    handleClose={() => handleClose(constructerItemData._id)}
                    price={constructerItemData.price}
                    thumbnail={constructerItemData.image}

                />

            </div>
        </div>
    )
}
