import React, {FC, useEffect, useState} from 'react';
import {MovieType} from "../Watchlist/Watchlist";
import {useDispatch, useSelector} from "react-redux";
import {appDispatch, AppRootStateType} from "../../store/store";
import {Movie} from './Movie';
import styles from "./MoviesList.module.scss";
import {getMoviesTC, sortDNDAC} from "../../reducers/movieReducer";


type PropsType = {
    watchListId: number
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
    const dispatch: appDispatch = useDispatch()
   /*
   const moviesDND: MovieDNDType[]  = movies.map((el, index)=> ({...el, order: index+1}))*/
    useEffect(()=>{
        dispatch(getMoviesTC(watchListId))
    },[])
    console.log('hi')
    const filteredMovies= movies.filter((movie) => {
        if (genre === "All") {
            return true;
        } else {
            const stringOfGenres = JSON.stringify(movie.genres)
            console.log(movie)
            // return movie.genres[0]..toLowerCase() === genre.toLowerCase();
        }
    });

    const [moviesListDND, setMoviesListDND] = useState<any>(filteredMovies)
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
            {movies.map((el) => {
                return (
                    <div draggable={true} onDragStart={(e)=>onDragHandler(e, el)}
                    onDrop={(e)=>onDropHandler(e,el)} onDragOver={(e)=>onDragOverHandler(e)}
                    > <div>HI</div>
                        {/*<span>{el.id}</span>*/}
                        <Movie key={el.id} movieId={el.id} watchListId={watchListId}/>
                    </div>
                )
            })}
        </ul>
    );
};