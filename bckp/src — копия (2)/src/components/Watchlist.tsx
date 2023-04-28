import React, {ChangeEvent, useEffect, useState} from 'react';
import {AddForm} from "./AddForm";

export type PropsType = {
    movies: MovieType[]
    title: string
    removeFilms: (id: string) => void
    addFilm: (title:string)=>void
    // genre: string
    // setGenre: (genre: string) => void
    // genreFilter: (genre: string)=>void
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
    // const filteredMovies = props.movies.filter((movie) => {
    //     if (props.genre === "All") {
    //         return true;
    //     } else {
    //         return movie.genre.toLowerCase() === props.genre.toLowerCase();
    //     }
    // });

    return (
        <>
            <h3> {props.title} </h3>
            {/*<div>*/}
            {/*    <select value={props.genre} onChange={(e) => props.genreFilter(e.currentTarget.value)}>*/}
            {/*        <option value={"All"} >All Genres</option>*/}
            {/*        <option value="Drama">Drama</option>*/}
            {/*        <option value="Crime">Crime</option>*/}
            {/*        <option value="Action">Action</option>*/}
            {/*        <option value="Military">Military</option>*/}
            {/*        <option value="Fantasy">Fantasy</option>*/}
            {/*    </select>*/}
            {/*    <span>Selected genre: {props.genre}</span>*/}
            {/*</div>*/}
            <ul style={{padding: "0"}}>
                {props.movies.map((el) => {
                    // const removeFilmsHandler = () => {
                    //   props.removeFilms(el.id)
                    // }
                    return (
                        <li key={el.id} style={{listStyleType: "none"}}>
                            <button onClick={() => removeFilmsHandler(el.id)}>x
                            </button>
                            <input type={'checkbox'} checked={el.watched}/>
                            {`${el.name}: ${el.rating}`}
                        </li>

                    )
                })}
            </ul>
            <AddForm addFilm={props.addFilm}/>
        </>
    );
};
