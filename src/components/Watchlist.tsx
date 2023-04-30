import React, {ChangeEvent, useEffect, useState} from 'react';
import {AddForm} from "./AddForm";
import {FilterGenre} from "./FilterGenre";
import {SuperButton} from "./SuperButton";
import {SuperCheckBox} from "./SuperCheckBox";

export type PropsType = {
    movies: MovieType[]
    title: string
    removeFilms: (id: string,  watchListId: string) => void
    addFilm: (newFilm: MovieType) => void
    genre: string
    setGenre: (genre: string) => void
    genreFilter: (genre: string) => void
    changeStatus: (id: string, watched: boolean, watchListId: string) => void
    watchListId: string
}

export type MovieType = {
    id: string
    name: string
    watched: boolean
    rating: number
    genre: string
}


export const Watchlist = (props: PropsType) => {


    const removeFilmsHandler = (id: string) => {
        props.removeFilms(id, props.watchListId)
    }
    const filteredMovies = props.movies.filter((movie) => {
        if (props.genre === "All") {
            return true;
        } else {
            return movie.genre.toLowerCase() === props.genre.toLowerCase();
        }
    });

    const checkBoxHandler = (id: string, check: boolean) => {
        props.changeStatus(id, check, props.watchListId)
    }

    return (
        <div className={'main'}>
            <h3> {props.title} </h3>
            <FilterGenre genre={props.genre} genreFilter={props.genreFilter}/>
            <ul style={{padding: "0"}}>
                {filteredMovies.map((el) => {
                    // const checkBoxHandler = (check:boolean)=>{
                    //     props.changeStatus(el.id, check)
                    // }
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
            <AddForm addFilm={props.addFilm}/>
        </div>
    );
};
