import React, {ChangeEvent, useEffect, useState} from 'react';
import {AddForm} from "./AddForm";
import {FilterGenre} from "./FilterGenre";

export type PropsType = {
    movies: MovieType[]
    title: string
    removeFilms: (id: string) => void
    addFilm: (title: string, rating: number) => void
    genre: string
    setGenre: (genre: string) => void
    genreFilter: (genre: string)=>void
    changeStatus:(id:string, watched:boolean)=>void
}

export type MovieType = {
    id: string
    name: string
    watched: boolean
    rating:number
    genre: string
}


export const Watchlist = (props: PropsType) => {


    const removeFilmsHandler = (id: string) => {
        props.removeFilms(id)
    }
    const filteredMovies = props.movies.filter((movie) => {
        if (props.genre === "All") {
            return true;
        } else {
            return movie.genre.toLowerCase() === props.genre.toLowerCase();
        }
    });

    return (
        <>
            <h3> {props.title} </h3>
            <FilterGenre genre={props.genre} genreFilter={props.genreFilter}/>
            <ul style={{padding: "0"}}>
                {filteredMovies.map((el) => {
                    const checboxHandler = (e:ChangeEvent<HTMLInputElement>) =>{
                        props.changeStatus(el.id,e.currentTarget.checked)
                    }
                    return (
                        <li key={el.id} style={{listStyleType: "none"}}>
                            <button onClick={() => removeFilmsHandler(el.id)}>x
                            </button>
                            <input type={'checkbox'} checked={el.watched} onChange={checboxHandler}/>
                            {`${el.name}: ${el.rating}`}
                        </li>

                    )
                })}
            </ul>
            <AddForm addFilm={props.addFilm}/>
        </>
    );
};
