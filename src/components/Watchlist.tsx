import React, {memo, useState} from 'react';
import {AddForm} from "./AddForm";
import {FilterGenre} from "./FilterGenre";
import {MoviesList} from "./Movies/MoviesList";
import {SuperButton} from "./SuperButton";
import {useDispatch} from "react-redux";
import {allFilms, changeTitleAC, removeWatchListAC} from "../reducers/watchListReducer";
import {EditableSpan} from "./EditableSpan";

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
    const dispatch = useDispatch()

    const [genre, setGenre] = useState("All");
    const genreFilter = (genre: string) => {
        setGenre(genre)
    }

    const removeWatchList = () =>{
        dispatch(removeWatchListAC(props.watchListId))
    }

    const editContentHandler = (newTitle:string)=>{
        // console.log(newTitle)
        dispatch(changeTitleAC(props.watchListId, newTitle))
    }

    return (
        <div className={'main'}>
            <div className={'watchListHeader'}>
                <EditableSpan title={props.title} editContent={editContentHandler}/>
                {props.watchListId !== allFilms && <SuperButton name={'🗑️'} onClickCallBack={removeWatchList}/>}
            </div>
            <FilterGenre genre={genre} genreFilter={genreFilter}/>
            <MoviesList watchListId={props.watchListId} genre={genre}/>
            {props.watchListId !=='idList3' && <AddForm watchListId={props.watchListId}/>}
        </div>
    );
})
