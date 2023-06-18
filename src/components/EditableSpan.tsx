import React, {ChangeEvent, FC, useEffect, useState} from 'react';

type PropsType = {
    title: string
    editContent: (newTitle: string) => void
}
export const EditableSpan: FC<PropsType> = (
    {
        title,
        editContent
    }
) => {
    const [edit, setEdit] = useState(true)
    const [newTitle, setNewTitle] = useState(title)
    const [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        if (newTitle.trim().length > 15) {
            setError('Название слишком длинное')}
    }

    const onEditHandler = () => {
        if (newTitle.trim() === '') {
            setError('Введите название')
        } else {
            editContent(newTitle)
            setNewTitle('')
            setEdit(!edit)
            setError('')
        }
    }

    const doubleHandler = () => {
        setEdit(false)
    }


    return (
        edit
            ? <span onDoubleClick={doubleHandler}>{title}</span>
            : <>
                <input type="text" value={newTitle} onChange={onChangeHandler} onBlur={onEditHandler} autoFocus/>
                {error && <span>{error}</span>}
            </>
    );
}





