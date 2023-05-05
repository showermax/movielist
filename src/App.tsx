import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {MovieType, Watchlist} from "./components/Watchlist";


type MoviesType = {
    [key: string]: MovieType[]
}
type WatchListType = {
    id: string
    title: string
}

//Проверка ГИТХАБ
function App() {
    const title: string = 'Best movies'
    /* const [movies, setMovies] = useState<Array<MovieType>>([
         {id: v1(), name: 'The Shawshank Redemption', watchedFilms: false, rating: 93, genre: "Drama"},
         {id: v1(), name: 'The Godfather', watchedFilms: false, rating: 92, genre: "Crime"},
         {id: v1(), name: 'The Dark Knight', watchedFilms: false, rating: 91, genre: "Action"},
         {id: v1(), name: 'The Godfather Part II', watchedFilms: false, rating: 90, genre: "Crime"},
         {id: v1(), name: 'Schindler\'s List', watchedFilms: false, rating: 89, genre: "Military"},
         {id: v1(), name: 'The Lord of the Rings', watchedFilms: false, rating: 87, genre: "Fantasy"},
         {id: v1(), name: 'Pulp Fiction', watchedFilms: false, rating: 89, genre: "Crime"}
     ])*/

    const allFilms = 'idList1'
    const topRated = 'idList2'
    const watchedFilms = 'idList3'

    const [movies, setMovies] = useState<MoviesType>({
        [allFilms]: [
            {id: v1(), name: 'The Shawshank Redemption', watched: false, rating: 93, genre: "Drama"},
            {id: v1(), name: 'The Godfather', watched: false, rating: 92, genre: "Crime"},
            {id: v1(), name: 'The Dark Knight', watched: false, rating: 91, genre: "Action"},
            {id: v1(), name: 'The Godfather Part II', watched: false, rating: 90, genre: "Crime"},
            {id: v1(), name: 'Schindler\'s List', watched: false, rating: 89, genre: "Military"},
            {id: v1(), name: 'The Lord of the Rings', watched: false, rating: 87, genre: "Fantasy"},
            {id: v1(), name: 'Pulp Fiction', watched: false, rating: 89, genre: "Crime"}
        ],
        [topRated]: [
            {id: v1(), name: 'The Shawshank Redemption', watched: false, rating: 93, genre: "Drama"},
            {id: v1(), name: 'The Godfather', watched: false, rating: 92, genre: "Crime"},
            {id: v1(), name: 'The Dark Knight', watched: false, rating: 91, genre: "Action"},
        ],
        [watchedFilms]: [
            {id: v1(), name: 'The Shawshank Redemption', watched: true, rating: 93, genre: "Drama"},
        ]
    })

    const [watchList, setWatchlist] = useState<WatchListType[]>([
        {id: allFilms, title: 'Movies'},
        {id: topRated, title: 'Top Rated Movies'},
        {id: watchedFilms, title: 'Watched Movies'}
    ])


    const changeStatus = (id: string, watched: boolean, watchListId: string) => {
        if (watchListId !== watchedFilms) {
            setMovies({
                ...movies,
                //[watchListId]: movies[watchListId].map(el => el.id !== id ? el : {...el, watched: watched}),
                [watchedFilms]: [...movies[watchedFilms],
                    {...movies[watchListId].filter(el => el.id === id)[0], watched: watched}],
                [watchListId]: movies[watchListId].filter(el => el.id !== id)

            })
        }

    }

    function removeFilms(id: string, watchListId: string) {
        setMovies({...movies, [watchListId]: movies[watchListId].filter(el => el.id !== id)})
    }

    const addFilm = (newFilm: MovieType, watchListId: string) => {
        setMovies({...movies, [watchListId]: [newFilm, ...movies[watchListId]]})
    }

    //const filteredMovies = movies.filter((m) => genre === "All" ? m : m.genre.toLowerCase() === genre.toLowerCase())

    return (
        <header className="App">
            <div className={'list'}>
                {watchList.map(el => {
                        return (
                            <Watchlist
                                key={el.id}
                                // watchListId={el.id}
                                movies={movies[el.id]}
                                title={el.title}
                                removeFilms={(id) => removeFilms(id, el.id)}
                                addFilm={addFilm}
                                /* genreFilter={genreFilter}
                                 setGenre={setGenre}
                                 genre={genre}*/
                                changeStatus={(id, check)=>changeStatus(id, check, el.id)}
                            />
                        )
                    }
                )}
            </div>
        </header>
    );
}

export default App;


