import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "store/store";
import {Movie} from './Movie';
import styles from './MoviesList.module.scss';
import {MovieType} from "types/types";


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

    const movies = useSelector<AppRootStateType, MovieType[]>(state => state.movies[watchListId])

    const filteredMovies = movies.filter((movie) => {
        if (genre === "All") {
            return true;
        } else {
            return movie.genreNames[0].toLowerCase() === genre.toLowerCase();
        }
    });

    // const onSorted = () => filteredMovies.sort ((a,b) => a.name.localeCompare(b.name) )


    return (
        <ul className={styles.blocks}>
            {filteredMovies.map((el) => {
                return (
                    <Movie key={el.id} movieId={el.id} watchListId={watchListId}/>

                )
            })}
        </ul>
    );
};
