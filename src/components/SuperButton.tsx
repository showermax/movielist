import React, {memo} from 'react';

 type PropsType ={
     name: string
     onClickCallBack: ()=>void
     disabled?: boolean
     styles?: string
 }

export const SuperButton = memo((props: PropsType) => {

    const onClickHandler = () =>{
        props.onClickCallBack()
    }

    return (
        <button className={props.styles} onClick={onClickHandler} disabled={props.disabled}>
            {props.name}
        </button>
    );
})

