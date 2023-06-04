import {SuperButton} from "../SuperButton";
import {SuperCheckBox} from "../SuperCheckBox";
import React, {FC} from "react";
import {changeStatusAC, removeFilmsAC} from "../../reducers/movieReducer";
import {watchedFilms} from "../../reducers/watchListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {MovieType} from "../Watchlist";
import {Dispatch} from "redux";
import {Movie} from "./Movie";


type PropsType = {
    watchListId: string,
    genre:string
}

export const MoviesList: FC<PropsType> = ({watchListId, genre}) => {
    const movies = useSelector<AppRootStateType, MovieType[] >(state => state.movies[watchListId])


    const filteredMovies = movies.filter((movie) => {
        if (genre === "All") {
            return true;
        } else {
            return movie.genre.toLowerCase() === genre.toLowerCase();
        }
    });


    return (
        <ul style={{padding: "0"}}>
            {filteredMovies.map((el) => {
                return (
                   <Movie key = {el.id} movieId={el.id} watchListId={watchListId}/>
                )
            })}
        </ul>
    );
};

