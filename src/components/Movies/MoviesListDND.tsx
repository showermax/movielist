import React, {FC, DragEvent, useState} from 'react';
import {MovieType} from "../Watchlist/Watchlist";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Movie} from './Movie';


type PropsType = {
    watchListId: number
    genre: string
}
type MovieDNDType = MovieType & { order: number }
export const MoviesListDND: FC<PropsType> = (
    {
        watchListId,
        genre
    }
) => {
    const movies = useSelector<AppRootStateType, MovieType[]>(state => state.movies[watchListId])
    const moviesDND: MovieDNDType[] = movies.map((el, index) => ({...el, order: index}))

    const filteredMovies = moviesDND.filter((movie) => {
        if (genre === "All") {
            return true;
        } else {
            return movie.genres[0].name.toLowerCase() === genre.toLowerCase();
        }
    });

    const [movieListDND, setMovieListDND] = useState<any>(filteredMovies)
    const [currentMovie, setCurrentMovie] = useState<MovieDNDType | null>(null)

    const onDragHandler = (event: DragEvent<HTMLDivElement>, movie: MovieDNDType) => {
        setCurrentMovie(movie)
    }
    const onDropHandler = (event: DragEvent<HTMLDivElement>, movie: MovieDNDType) => {
        event.preventDefault()
        setMovieListDND(movieListDND.map((el:MovieDNDType) => {
          if(currentMovie !== null){
              if(el.id === movie.id){
                  return {...el, order: currentMovie.order}
              }
              if(el.id === currentMovie.id){
                  return {...el, order: movie.order}
              }
              return el
          }
        }))
    }
    const onSortedDND = () => {
        return movieListDND.sort((a:MovieDNDType,b:MovieDNDType) => a.order - b.order)
    }
    const onDragOverHandler =(event: DragEvent<HTMLDivElement>)=>{
        event.preventDefault()
    }

    return (
        <ul style={{padding: "0"}}>
            {onSortedDND().map((el:MovieDNDType) => {
                return (
                    <div draggable={true}
                         onDragStart={(event) => onDragHandler(event, el)}
                         onDrop={(event)=>onDropHandler(event, el)}
                         onDragOver={onDragOverHandler}
                    >
                        {/*<span>{el.order}</span>*/}
                        <Movie key={el.id} movieId={el.id} watchListId={watchListId}/>
                    </div>
                )
            })}
        </ul>
    );
};
