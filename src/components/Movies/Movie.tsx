import React, {FC, memo} from 'react';
import {SuperButton} from "../SuperButton";
import {SuperCheckBox} from "../SuperCheckBox";
import {changeStatusAC, removeFilmsAC} from "../../reducers/movieReducer";
import {watchedFilms} from "../../reducers/watchListReducer";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {MovieType} from "../Watchlist";

type PropsType = {
    watchListId: string,
    movieId: string
}

export const Movie: FC<PropsType> = memo(({watchListId, movieId}) => {
    const movie = useSelector<AppRootStateType, MovieType>(
        state => state.movies[watchListId].filter(el => el.id === movieId)[0]
    )
    const dispatch: Dispatch = useDispatch()

    const checkBoxHandler = (id: string, check: boolean) => {
        changeStatus(id, check, watchListId)
    }
    const changeStatus = (id: string, check: boolean, watchListId: string) => {
        dispatch(changeStatusAC(id, check, watchListId, watchedFilms))
    }
    const removeFilmsHandler = (id: string) => {
        dispatch(removeFilmsAC(id, watchListId))
    }

    return (
        <li style={{listStyleType: "none"}}>
            <SuperButton name={'del'} onClickCallBack={() => removeFilmsHandler(movie.id)}/>
            <SuperCheckBox callBack={(check) => checkBoxHandler(movie.id, check)} checked={movie.watched}/>
            {`${movie.name}: ${movie.rating}`}
        </li>
    );
});
