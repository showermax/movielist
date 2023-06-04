import React, {memo} from 'react';
 type PropsType ={
     name: string
     onClickCallBack: ()=>void
     disabled?: boolean
 }

export const SuperButton = memo((props: PropsType) => {
    console.log("SUPER BUTTON" + " " + props.name)
    const onClickHandler = () =>{
        props.onClickCallBack()
    }

    return (
        <button onClick={onClickHandler} disabled={props.disabled}>
            {props.name}
        </button>
    );
});

