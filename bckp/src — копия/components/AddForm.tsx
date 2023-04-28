import React, {ChangeEvent, useState} from 'react';


type PropsType = {
    addFilm: (title: string) => void
}
export const AddForm = (props: PropsType) => {

    const [addForm, setAddForm] = useState<boolean>(false)
    const [text, setText] = useState<string>("")

    const updateText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
  
    const addFilmHandler = () => {
        props.addFilm(text)
    }
    return (
        <>
            <button onClick={() => setAddForm(!addForm)}>ADD FILM</button>
            {addForm && <div>
                <input value={text}  type="text" onChange={updateText}/>
                <input type="text" />
                <button onClick={addFilmHandler}>ADD</button>
            </div>
            }
        </>

    );
};
