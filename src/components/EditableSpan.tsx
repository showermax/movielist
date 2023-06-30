import React, {ChangeEvent, FC, useState} from 'react';

type PropsType = {
    title:string
    editContent:(newTitle:string)=>void
}
export const EditableSpan:FC<PropsType> = (
    {
        title,
        editContent
    }
) => {
    const [edit, setEdit] = useState(true)
    const [newTitle, setNewTitle] = useState('')


    const onChangeHandler =(e:ChangeEvent<HTMLInputElement>)=>{
        setNewTitle(e.currentTarget.value)
    }

    const onEditHandler=()=>{
        if (newTitle) { }
        editContent(newTitle)
        setNewTitle('')
        setEdit(!edit)
    }

    const doubleHandler = ()=>{
        setEdit(false)
    }


    return (
            edit ? <span onDoubleClick={doubleHandler}>{title}</span> : <input type="text" value={newTitle} onChange={onChangeHandler} onBlur={onEditHandler} autoFocus/>
    );
}





