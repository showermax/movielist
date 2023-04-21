import React from 'react';

type ButtonPropsType ={
    buttonCallback: ()=> void
    title: string
    disabled?: boolean
}
export function SuperButton(props: ButtonPropsType) {

    return (
        <button onClick={props.buttonCallback} disabled={props.disabled}>{props.title}</button>
    )

}

