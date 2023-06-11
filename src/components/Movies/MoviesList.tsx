import React, {FC} from 'react';
import {MovieType} from "../Watchlist";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import { Movie } from './Movie';


type PropsType = {
    watchListId: string
    genre: string
}

export const MoviesList: FC<PropsType> = (
    {
        watchListId,
        genre
    }
) => {

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
                    <Movie key={el.id} movieId={el.id} watchListId={watchListId}/>
                    // <li key={el.id} style={{listStyleType: "none"}}>
                    //     <SuperButton name={'del'} onClickCallBack={() => removeFilmsHandler(el.id)}/>
                    //     {/*<input type={'checkbox'} onChange={checkBoxHandler} checked={el.watched}/>*/}
                    //     <SuperCheckBox callBack={(check) => checkBoxHandler(el.id, check)} checked={el.watched}/>
                    //     {`${el.name}: ${el.rating}`}
                    // </li>
                )
            })}
        </ul>
    );
};
