import React, {ChangeEvent, useState} from 'react';
import {SuperButton} from "./SuperButton";
import {v1} from "uuid";
import {SuperInput} from "./SuperInput";
import {MovieType} from "./Watchlist";
// import {InputGenre} from './InputGenre'


type PropsType = {
    addFilm: (newFilm: MovieType, watchListId: string) => void
    watchListId: string
}
export const AddForm: React.FC<PropsType> = ({watchListId, addFilm}) => {

    const [newFilm, setNewFilm] = useState<MovieType>(
        {id: v1(), name: "", watched: false, rating: NaN, genre: "", parents: watchListId}
    )
    const [addForm, setAddForm] = useState<boolean>(false)
    // const [text, setText] = useState<string>("")
    // const [genre, setGenre] = useState<string>('')
    // const [rating, setRating] = useState<number>(0)
    // const [buttonDisabled, setButtonDisabled] = useState(false)

    let buttonDisabled = false

    const addFilmHandler = () => {
        addFilm(newFilm, watchListId)
        setNewFilm({id: v1(), name: "", watched: false, rating: NaN, genre: "", parents: watchListId})
    }

    if (newFilm.rating > 100 || newFilm.rating < 0) {
        buttonDisabled = true
    }
    const onChangeSelectHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
        setNewFilm({...newFilm, genre: e.currentTarget.value})


    }

    return (
        <>
            <SuperButton name={'ADD FILM'} onClickCallBack={() => setAddForm(!addForm)}/>
            {addForm && <div>

                <SuperInput value={newFilm.name} type={'text'} newFilm={newFilm} setNewFilm={setNewFilm}
                            property={'name'}/>
                <SuperInput value={newFilm.rating} type={'number'} newFilm={newFilm} setNewFilm={setNewFilm}
                            property={'rating'}/>
               {/* <SuperInput value={newFilm.genre} type={'text'} newFilm={newFilm} setNewFilm={setNewFilm}
                            property={'genre'}/>*/}
                <select name="movies" onChange={onChangeSelectHandler}>
                    <option value="All">All Genre</option>
                    <option value="Drama">Drama</option>
                    <option value="Crime">Crime</option>
                    <option value="Action">Action</option>
                    <option value="Military">Military</option>
                    <option value="Fantasy">Fantasy</option>
                </select>


                <SuperButton name={'ADD'} onClickCallBack={addFilmHandler} disabled={buttonDisabled}/>
            </div>
            }
        </>

    );
};


