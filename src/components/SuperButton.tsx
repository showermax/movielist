import React from 'react';
 type PropsType ={
     name: string
     onClickCallBack: ()=>void
     disabled?: boolean
 }

export const SuperButton = (props: PropsType) => {

    const onClickHandler = () =>{
        props.onClickCallBack()
    }

    return (
        <button onClick={onClickHandler} disabled={props.disabled}>
            {props.name}
        </button>
    );
};

