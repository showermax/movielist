import React, {memo, useState} from 'react';
import {FilterGenre} from "../FilterGenre";
import {useDispatch, useSelector} from "react-redux";
import {allFilms, watchListActions} from "reducers/watchListReducer";
import {EditableSpan} from "../EditableSpan";
import {addMovieTC} from "reducers/movieReducer";
import {MoviesList} from "../Movies/MovieListDND";
import styles from '../Movies/MoviesList.module.scss';
import {getMoviesTC} from "reducers/IMDBReducer";
import {appDispatch, AppRootStateType} from "store/store";
import {transformFilm} from "utils/transformFilm";
import {apiMovie} from "api/Juliya-api";
import {ImdbMovieType} from "types/types";

export type PropsType = {
    title: string
    watchListId: number
}

export const Watchlist = memo((props: PropsType) => {
    const state = useSelector<AppRootStateType, ImdbMovieType[]>(state => state.Imdb)

    const dispatch = useDispatch<appDispatch>()

    const [genre, setGenre] = useState("All");
    const genreFilter = (genre: string) => {
        setGenre(genre)
    }

    const removeWatchList = () => {
        dispatch(watchListActions.removeWatchList({id: props.watchListId}))
    }

    const editContentHandler = (newTitle: string) => {
        // console.log(newTitle)
        dispatch(watchListActions.changeTitle({watchListId: props.watchListId, newTitle}))
    }

    const getFilms = ()=>{
       dispatch(getMoviesTC());

    }

    const addFilmIMDB = () =>{
        for (let i =0; i < state.length; i++){
            dispatch(addMovieTC(transformFilm(state[i])))
        }
    }

    const deleteAllFilms = () => {
        for (let i = 30; i < 140; i++ ) {
            apiMovie.deleteMovie(i)
        }
    }
    return (
        <div className={styles.main}>
            <div className={'watchListHeader'}>
                {props.watchListId === allFilms
                    ? <h3>{props.title}</h3>
                    : <>
                        <EditableSpan title={props.title} editContent={editContentHandler}/>
                    </>}
            </div>
            {/*<button onClick={getFilms}>Get 100 films from IMDB</button>*/}
            {/*<button onClick={addFilmIMDB} >Save film</button>*/}
            {/*<button onClick={deleteAllFilms}>Delete all films</button>*/}
            <FilterGenre genre={genre} genreFilter={genreFilter}/>
            <MoviesList watchListId={props.watchListId} genre={genre}/>
        </div>
    );
})

//!!!!!!!test
