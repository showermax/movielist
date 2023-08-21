import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {appDispatch, AppRootStateType} from "store/store";
import {Movie} from './Movie';
import styles from "./MoviesList.module.scss";
import {getMoviesTC} from "reducers/movieReducer";
import {MovieType} from "types/types";

type Props = {
    watchListId: number
    genre: string
}

export const MoviesList: FC<Props> = (
    {
        watchListId,
        genre
    }
) => {
    const movies = useSelector<AppRootStateType, MovieType[] >(state => state.movies[watchListId])
    const dispatch: appDispatch = useDispatch()
    useEffect(()=>{
        dispatch(getMoviesTC(watchListId))
    },[watchListId])
    // const [moviesListDND, setMoviesListDND] = useState<any>(filteredMovies)
    const [currentMovie, setCurrentMovie] = useState<MovieType | null>(null)
    const onSorted =()=>{
        // return filteredMovies.sort((a,b) => a.order - b.order)
    }

    const onDragHandler =(e:React.DragEvent<HTMLDivElement>, movie:MovieType)=>{
        setCurrentMovie(movie)
    }

    const onDragOverHandler=(e:React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault()
    }
    const onDropHandler = (e: React.DragEvent<HTMLDivElement>, movie: MovieType) => {
        // e.preventDefault()
        // if (currentMovie !== null) {
        //     if (currentMovie.order < movie.order) {
        //         const newArrMovies = filteredMovies
        //             .map(m => (m.order < currentMovie.order || m.order > movie.order)
        //             ? m : m.id === currentMovie.id ? {...m, order: movie.order} : {...m, order: m.order - 1})
        //         dispatch(sortDNDAC(watchListId, newArrMovies))
        //     }
        //     if (currentMovie.order > movie.order) {
        //         const newArrMovies = filteredMovies
        //             .map(o => (o.order > currentMovie.order || o.order < movie.order)
        //             ? o : o.id === currentMovie.id ? {...o, order: movie.order} : {...o, order: o.order + 1})
        //         dispatch(sortDNDAC(watchListId, newArrMovies))
        //     }
        // }
    }

    return (
        <ul className={styles.blocks}>
            {movies?.map((el) => {
                return (
                    <div>
                        <Movie key={el.id} movieId={el.id} watchListId={watchListId}/>
                    </div>
                )
            })}
        </ul>
    );
};
