import React, {ChangeEvent, useEffect, useState} from 'react';
import {AddForm} from "./AddForm";
import {FilterGenre} from "./FilterGenre";
import {SuperButton} from "./SuperButton";
import {SuperCheckBox} from "./SuperCheckBox";

export type PropsType = {
    movies: MovieType[]
    title: string
    removeFilms: (id: string) => void
    addFilm: (newFilm: MovieType, watchListId: string) => void
   /* genre: string
    setGenre: (genre: string) => void
    genreFilter: (genre: string) => void*/
    changeStatus: (id: string, watched: boolean) => void
    //watchListId: string
}

export type MovieType = {
    id: string
    name: string
    watched: boolean
    rating: number
    genre: string
}


export const Watchlist = (props: PropsType) => {
    const [genre, setGenre] = useState("All");
    const genreFilter = (genre: string) => {
        setGenre(genre)
    }

    const removeFilmsHandler = (id: string) => {
        props.removeFilms(id)
    }
    const filteredMovies = props.movies.filter((movie) => {
        if (genre === "All") {
            return true;
        } else {
            return movie.genre.toLowerCase() === genre.toLowerCase();
        }
    });

    const checkBoxHandler = (id: string, check: boolean) => {
        props.changeStatus(id, check)
    }

    return (
        <div className={'main'}>
            <h3> {props.title} </h3>
            <FilterGenre genre={genre} genreFilter={genreFilter}/>
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
           {/* <AddForm addFilm={props.addFilm} watchListId={props.watchListId}/>*/}
        </div>
    );
};
