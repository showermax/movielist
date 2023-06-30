import React, {FC, useState} from 'react';
import {MovieType} from "../Watchlist/Watchlist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import { Movie } from './Movie';
import styles from "./MoviesList.module.scss";
import {sortDNDAC} from "../../reducers/movieReducer";


type PropsType = {
    watchListId: string
    genre: string
}
type MovieDNDType = MovieType & {order: number}
export const MoviesListDND: FC<PropsType> = (
    {
        watchListId,
        genre
    }
) => {
    const movies = useSelector<AppRootStateType, MovieType[] >(state => state.movies[watchListId])
    const dispatch = useDispatch()
   /* const moviesDND: MovieDNDType[]  = movies.map((el, index)=> ({...el, order: index+1}))*/

    const filteredMovies= movies.filter((movie) => {
        if (genre === "All") {
            return true;
        } else {
            return movie.genre.toLowerCase() === genre.toLowerCase();
        }
    });

    const [moviesListDND, setMoviesListDND] = useState<any>(filteredMovies)
    const [currentMovie, setCurrentMovie] = useState<MovieType | null>(null)
    const onSorted =()=>{
        return filteredMovies.sort((a,b) => a.order - b.order)
    }

    const onDragHandler =(e:React.DragEvent<HTMLDivElement>, movie:MovieType)=>{

        setCurrentMovie(movie)
    }

    const onDragOverHandler=(e:React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault()
    }

    const onDropHandler =(e:React.DragEvent<HTMLDivElement>, movie:MovieDNDType)=>{
        e.preventDefault()
        const newArrMovies = filteredMovies.map((m:MovieDNDType)=> {
            if (currentMovie !== null){
                if (m.id === movie.id) {
                    return {...m, order: currentMovie.order}
                }
                if (m.id === currentMovie.id) {
                    return {...m, order: movie.order}
                }
                return m
            } else {
                return m
            }
        })
        dispatch(sortDNDAC(watchListId, newArrMovies ))
    }



    return (
        <ul className={styles.blocks}>
            {onSorted().map((el:MovieDNDType) => {
                return (
                    <div draggable={true} onDragStart={(e)=>onDragHandler(e, el)}
                    onDrop={(e)=>onDropHandler(e,el)} onDragOver={(e)=>onDragOverHandler(e)}
                    >
                        <span>{el.order}</span>
                        <Movie key={el.id} movieId={el.id} watchListId={watchListId}/>
                    </div>
                )
            })}
        </ul>
    );
};