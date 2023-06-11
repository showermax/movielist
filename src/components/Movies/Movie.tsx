import React, {FC, memo} from 'react';
import {SuperButton} from "../SuperButton";
import {SuperCheckBox} from "../SuperCheckBox";
import {addFilmAC, changeStatusAC, removeFilmsAC} from "../../reducers/movieReducer";
import {MovieType} from "../Watchlist";
import {watchedFilms} from "../../reducers/watchListReducer";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";

type PropsType = {
    watchListId: string,
    movieId: string
}
export const Movie: FC<PropsType> = memo((
    {
        watchListId,
        movieId
    }) => {
    const movie = useSelector<AppRootStateType, MovieType>(
        state=> state.movies[watchListId].filter(el=>el.id === movieId)[0])

    const dispatch: Dispatch = useDispatch()

    const changeStatus = (id: string, check: boolean, watchListId: string) =>{
        dispatch(changeStatusAC(id,check,watchListId, watchedFilms))
    }
    const checkBoxHandler = (id: string, check: boolean) => {
        changeStatus(id, check, watchListId)
    }

    function removeFilmsHandler(id: string) {
        dispatch(removeFilmsAC(id, watchListId))
    }
    const addFilm = (newFilm: MovieType, watchListId: string) => {
        dispatch(addFilmAC(newFilm, watchListId))
    }

    return (
        <li style={{listStyleType: "none"}}>
            <SuperButton name={'del'} onClickCallBack={() => removeFilmsHandler(movie.id)}/>
            {/*<input type={'checkbox'} onChange={checkBoxHandler} checked={el.watched}/>*/}
            <SuperCheckBox callBack={(check) => checkBoxHandler(movie.id, check)} checked={movie.watched}/>
            {`${movie.name}: ${movie.rating}`}
        </li>
    );
})

