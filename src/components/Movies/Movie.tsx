import React, {FC, memo} from 'react';
import {SuperButton} from "../SuperButton";
import {SuperCheckBox} from "../SuperCheckBox";
import {addFilmAC, changeStatusAC, removeFilmsAC} from "../../reducers/movieReducer";
import {MovieType} from "../Watchlist/Watchlist";
import {watchedFilms} from "../../reducers/watchListReducer";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import styles from './Movie.module.scss';
import img from '../../img/dark_knight.jpg';

type PropsType = {
    watchListId: number,
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

    const changeStatus = (id: string, check: boolean, watchListId: number) =>{
        dispatch(changeStatusAC(id,check,watchListId, watchedFilms))
    }
    const checkBoxHandler = (id: string, check: boolean) => {
        changeStatus(id, check, watchListId)
    }

    function removeFilmsHandler(id: string) {
        dispatch(removeFilmsAC(id, watchListId))
    }
    const addFilm = (newFilm: MovieType, watchListId: number) => {
        dispatch(addFilmAC(newFilm, watchListId))
    }

    return (
        <li className={styles.list}>
            <SuperButton styles={styles.btn} name={'del'} onClickCallBack={() => removeFilmsHandler(movie.id)}/>
            <img src={img} alt={movie.name} className={styles.img}/>
            {/*<input type={'checkbox'} onChange={checkBoxHandler} checked={el.watched}/>*/}
            <div>
                <SuperCheckBox callBack={(check) => checkBoxHandler(movie.id, check)} checked={movie.watched}/>
                <span className={styles.name}>{movie.name}</span>
            </div>
            <div className={styles.rating}>{movie.rating}</div>
        </li>
    );
})

