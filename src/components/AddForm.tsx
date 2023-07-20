import React, {ChangeEvent, FC, memo, useState} from 'react';
import {SuperButton} from "./SuperButton";
import {MovieType} from "./Watchlist/Watchlist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";


type PropsType = {
    watchListId: number
}
export const AddForm: FC<PropsType> = memo(({watchListId}) => {
    const moviesArray = useSelector<AppRootStateType, MovieType[]>(state => state.movies[watchListId])
    const newLastOrder = moviesArray.length > 0
        ? moviesArray[moviesArray.length-1].id +1
        : 1
    const dispatch = useDispatch()
    const [newFilm, setNewFilm] = useState<MovieType | null>(
        // {id: 0, name: "", watched: false, rating: NaN, genres: []
            // , parents: watchListId, order: 0
        // }
    )
    const [addForm, setAddForm] = useState<boolean>(false)
    // const [text, setText] = useState<string>("")
    // const [genre, setGenre] = useState<string>('')
    // const [rating, setRating] = useState<number>(0)
    // const [buttonDisabled, setButtonDisabled] = useState(false)

    let buttonDisabled = false

    const addFilmHandler = () => {
        // dispatch(addFilmAC(newFilm, watchListId))
        // setNewFilm({id: 0, name: "", watched: false, rating: NaN, genre: "", parents: watchListId, order: 0})
    }

    // if (newFilm.rating > 100 || newFilm.rating < 0) {
    //     buttonDisabled = true
    // }
    const onChangeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        // setNewFilm({...newFilm, genres: e.currentTarget.value})

    }
    const setNewFilmHandler = (newFilm: MovieType) => {
        // setNewFilm({...newFilm, order: newLastOrder})
    }

    return (
        <>
            <SuperButton name={'ADD FILM'} onClickCallBack={() => setAddForm(!addForm)}/>
            {addForm && <div>

                {/*<SuperInput value={newFilm.name} type={'text'} newFilm={newFilm} setNewFilm={setNewFilmHandler}*/}
                {/*            property={'name'}/>*/}
                {/*<SuperInput value={newFilm.rating} type={'number'} newFilm={newFilm} setNewFilm={setNewFilm}*/}
                {/*            property={'rating'}/>*/}
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
})


