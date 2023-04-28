import React, {ChangeEvent, useState} from 'react';
import {SuperButton} from "./SuperButton";


type PropsType = {
    addFilm: (title: string, rating: number) => void
}
export const AddForm = (props: PropsType) => {

    const [addForm, setAddForm] = useState<boolean>(false)
    const [text, setText] = useState<string>("")
    const [rating, setRating] = useState<number>(98)

    const updateText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const updateRating = (e: ChangeEvent<HTMLInputElement>) => {
        setRating(+e.currentTarget.value)
    }
    let error = false
    if (isNaN(rating) || rating >100 || rating < 0) {
        error = true
    }
    const addFilmHandler = () => {
        props.addFilm(text,rating)
        setAddForm(false)
    }
    return (
        <>
            <button onClick={() => setAddForm(!addForm)}>ADD FILM</button>
            {addForm && <div>
                <input value={text} type="text" onChange={updateText}/>
                <input value={rating} type='number' onChange={updateRating} />
                {/*<button onClick={addFilmHandler} disabled={error}>ADD</button>*/}
                <SuperButton buttonCallback={addFilmHandler} title={'ADD'} disabled={error}/>
                {error && <div> Enter the number between 0 and 100</div>}
            </div>

            }
        </>

    );
};
