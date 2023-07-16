import React, {FC} from 'react';
import {MovieType} from "../Watchlist/Watchlist";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import { Movie } from './Movie';
import styles from './MoviesList.module.scss';


type PropsType = {
    watchListId: number
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
            return movie.genres[0].name.toLowerCase() === genre.toLowerCase();
        }
    });

    // const onSorted = () => filteredMovies.sort ((a,b) => a.name.localeCompare(b.name) )





    return (
        <ul className={styles.blocks}>
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
