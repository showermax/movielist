import React, {ChangeEvent, useEffect, useState} from 'react';
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

export type PropsType = {

    title: string


    /* genre: string
     setGenre: (genre: string) => void
     genreFilter: (genre: string) => void*/
    //changeStatus: (id: string, watched: boolean,  watchListId: string) => void
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

export const Watchlist = (props: PropsType) => {

    const movies = useSelector<AppRootStateType, MovieType[] >(state => state.movies[props.watchListId])

    const dispatch: Dispatch = useDispatch()

    const changeStatus = (id: string, check: boolean, watchListId: string) =>{
        dispatch(changeStatusAC(id,check,watchListId, watchedFilms))
    }
    function removeFilmsHandler(id: string) {
        dispatch(removeFilmsAC(id, props.watchListId))
    }
    const addFilm = (newFilm: MovieType, watchListId: string) => {
        dispatch(addFilmAC(newFilm, watchListId))
    }

    const [genre, setGenre] = useState("All");
    const genreFilter = (genre: string) => {
        setGenre(genre)
    }

    const filteredMovies = movies.filter((movie) => {
        if (genre === "All") {
            return true;
        } else {
            return movie.genre.toLowerCase() === genre.toLowerCase();
        }
    });

    const checkBoxHandler = (id: string, check: boolean) => {
        changeStatus(id, check, props.watchListId)
    }

    return (
        <div className={'main'}>
            <h3> {props.title} </h3>
            <FilterGenre genre={genre} genreFilter={genreFilter}/>
            <ul style={{padding: "0"}}>
                {filteredMovies.map((el) => {
                    return (
                        <li key={el.id} style={{listStyleType: "none"}}>
                            <SuperButton name={'del'} onClickCallBack={() => removeFilmsHandler(el.id)}/>
                            {/*<input type={'checkbox'} onChange={checkBoxHandler} checked={el.watched}/>*/}
                            <SuperCheckBox callBack={(check) => checkBoxHandler(el.id, check)} checked={el.watched}/>
                            {`${el.name}: ${el.rating}`}
                        </li>
                    )
                })}
            </ul>
            {props.watchListId !=='idList3' && <AddForm addFilm={addFilm} watchListId={props.watchListId}/>}
        </div>
    );
};
