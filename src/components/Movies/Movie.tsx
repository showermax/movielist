import React, {FC, memo} from 'react';
import {SuperButton} from "../SuperButton";
import {SuperCheckBox} from "../SuperCheckBox";
import {movieActions} from "reducers/movieReducer";
import {watchedFilms} from "reducers/watchListReducer";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "store/store";
import styles from './Movie.module.scss';
import img from '../../assets/img/dark_knight.jpg';
import {MovieType} from "types/types";

type PropsType = {
    watchListId: number,
    movieId: number
}
export const Movie: FC<PropsType> = memo((
    {
        watchListId,
        movieId
    }) => {
    const movie = useSelector<AppRootStateType, MovieType>(
        state=> state.movies[watchListId].filter(el=>el.id === movieId)[0])

    const dispatch: Dispatch = useDispatch()

    const changeStatus = (id: number, check: boolean, watchListId: number) =>{
        dispatch(movieActions.changeStatus({id,check,watchListId, watchedFilms}))
    }
    const checkBoxHandler = (id: number, check: boolean) => {
        changeStatus(id, check, watchListId)
    }

    function removeFilmsHandler(id: number) {
        dispatch(movieActions.removeFilm({id, watchListId}))
    }
    const addFilm = (newFilm: MovieType, watchListId: number) => {
        dispatch(movieActions.addFilm({newFilm, watchListId}))
    }

    return (
        <li className={styles.list}>
            <SuperButton styles={styles.btn} name={'del'} onClickCallBack={() => removeFilmsHandler(movie.id)}/>
            <img src={movie.url} alt={movie.name} className={styles.img}/>
            {/*<input type={'checkbox'} onChange={checkBoxHandler} checked={el.watched}/>*/}
            <div>
                <SuperCheckBox callBack={(check) => checkBoxHandler(movie.id, check)} checked={movie.watched}/>
                <span className={styles.name}>{movie.name}</span>
            </div>
            <div className={styles.rating}>{movie.rating}</div>
        </li>
    );
})

