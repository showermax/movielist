import React, {ChangeEvent} from 'react';
type SuperCheckBoxType = {
    callBack: (check: boolean)=>void
    checked: boolean
}
export const SuperCheckBox = (props: SuperCheckBoxType) => {
    const checkBoxHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        props.callBack(e.currentTarget.checked)
    }

    return (
            <input type={'checkbox'} onChange={checkBoxHandler} checked={props.checked}/>
    );
};
