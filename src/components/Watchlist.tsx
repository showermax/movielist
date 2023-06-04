import React, {ChangeEvent, memo, useEffect, useState} from 'react';
import {AddForm} from "./AddForm";
import {FilterGenre} from "./FilterGenre";
import {SuperButton} from "./SuperButton";
import {SuperCheckBox} from "./SuperCheckBox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {MoviesType} from "../App";
import {Dispatch} from "redux";
import {addFilmAC, changeStatusAC, removeFilmsAC} from "../reducers/movieReducer";
import {watchedFilms} from "../reducers/watchListReducer";
import {MoviesList} from "./Movies/MoviesList";

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
}

export const Watchlist = memo((props: PropsType) => {
    console.log("Watchlist")

    const [genre, setGenre] = useState("All");
    const genreFilter = (genre: string) => {
        setGenre(genre)
    }

    return (
        <div className={'main'}>
            <h3> {props.title} </h3>
            <FilterGenre genre={genre} genreFilter={genreFilter}/>
            <MoviesList genre={genre} watchListId={props.watchListId}/>
            {props.watchListId !=='idList3' && <AddForm watchListId={props.watchListId}/>}
        </div>
    );
});
