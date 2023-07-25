import React, {memo, useState} from 'react';
import {FilterGenre} from "../FilterGenre";
import {SuperButton} from "../SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {allFilms, changeTitleAC, removeWatchListAC} from "reducers/watchListReducer";
import {EditableSpan} from "../EditableSpan";
import {addMovieTC} from "reducers/movieReducer";
import {MoviesListDND} from "../Movies/MovieListDND";
import styles from './Watchlist.module.scss';
import {getMoviesTC, ImdbMovieType} from "reducers/IMDBReducer";
import {appDispatch, AppRootStateType} from "store/store";
import {transformFilm} from "../../utils/transformFilm";
import {apiMovie} from "../../api/Juliya-api";

export type PropsType = {

    title: string
    watchListId: number
}

export type GenresType = {
    name: string
    id: number
}

export type MovieType = {
    name: string
    watched: boolean
    rating: number
    description: string
    releaseYear: string
    duration: string
    url: string
    genres: Array<GenresType>
    id: number
}

export  type MoviePayloadType = {
    watchListIds: Array<number>
    name: string
    watched: boolean
    rating: number
    description: string
    releaseYear: string
    duration: string
    url: string
    genreNames: Array<string>
}

export const Watchlist = memo((props: PropsType) => {
    const state = useSelector<AppRootStateType, ImdbMovieType[]>(state => state.Imdb)

    const dispatch = useDispatch<appDispatch>()

    const [genre, setGenre] = useState("All");
    const genreFilter = (genre: string) => {
        setGenre(genre)
    }

    const removeWatchList = () => {
        dispatch(removeWatchListAC(props.watchListId))
    }

    const editContentHandler = (newTitle: string) => {
        // console.log(newTitle)
        dispatch(changeTitleAC(props.watchListId, newTitle))
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
                        <SuperButton name={'🗑️'} onClickCallBack={removeWatchList}/>
                    </>}
                {/*{props.watchListId !== allFilms && <SuperButton name={'🗑️'} onClickCallBack={removeWatchList}/>}*/}
            </div>
            {/*<button onClick={getFilms}>Get 100 films from IMDB</button>*/}
            {/*<button onClick={addFilmIMDB} >Save film</button>*/}
            {/*<button onClick={deleteAllFilms}>Delete all films</button>*/}
            <FilterGenre genre={genre} genreFilter={genreFilter}/>
            {/*<MoviesList watchListId={props.watchListId} genre={genre}/>*/}
            <MoviesListDND watchListId={props.watchListId} genre={genre}/>
            {/*{props.watchListId !== 3 && <AddForm watchListId={props.watchListId}/>}*/}
        </div>
    );
})


// type MovieType = {
//     name: string
//     watchListId: number
//     movieListId: number
//
// }
