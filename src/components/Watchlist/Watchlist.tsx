import React, {memo, useState} from 'react';
import {AddForm} from "../AddForm";
import {FilterGenre} from "../FilterGenre";
import {MoviesList} from "../Movies/MoviesList";
import {SuperButton} from "../SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {allFilms, changeTitleAC, removeWatchListAC} from "../../reducers/watchListReducer";
import {EditableSpan} from "../EditableSpan";
import {sortedNameAC} from "../../reducers/movieReducer";
import {MoviesListDND} from "../Movies/MovieListsDND";
import styles from './Watchlist.module.scss';
import {getMoviesTC, ImdbMovieType} from "../../reducers/IMDBReducer";
import {appDispatch, AppRootStateType} from "../../store/store";

export type PropsType = {

    title: string
    watchListId: string
}

export type MovieType = {
    id: string
    name: string
    watched: boolean
    rating: number
    genre: string
    parents: string
    order: number
}

export const Watchlist = memo((props: PropsType) => {
    const state = useSelector<AppRootStateType, ImdbMovieType[]>(state => state.Imdb)
    console.log(state)
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
        // debugger
       getMoviesTC();

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
            <button onClick={getFilms}>❗</button>
            <FilterGenre genre={genre} genreFilter={genreFilter}/>
            {/*<MoviesList watchListId={props.watchListId} genre={genre}/>*/}
            <MoviesListDND watchListId={props.watchListId} genre={genre}/>
            {props.watchListId !== 'idList3' && <AddForm watchListId={props.watchListId}/>}
        </div>
    );
})
