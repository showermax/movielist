import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {appDispatch, AppRootStateType} from "store/store";
import {Movie} from './Movie';
import styles from "./MoviesList.module.scss";
import {getMoviesTC} from "reducers/movieReducer";
import {MovieType} from "types/types";

type Props = {
    watchListId: number
    genre: string
}

export const MoviesList: FC<Props> = (
    {
        watchListId,
        genre
    }
) => {
    const movies = useSelector<AppRootStateType, MovieType[] >(state => state.movies[watchListId])
    const dispatch: appDispatch = useDispatch()
    useEffect(()=>{
        dispatch(getMoviesTC(watchListId))
    },[])

    return (
        <ul className={styles.blocks}>
            {movies?.map((el) => {
                return (
                    <div>
                        <Movie key={el.id} movieId={el.id} watchListId={watchListId}/>
                    </div>
                )
            })}
        </ul>
    );
};