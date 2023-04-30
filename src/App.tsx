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
         {id: v1(), name: 'The Shawshank Redemption', watched: false, rating: 93, genre: "Drama"},
         {id: v1(), name: 'The Godfather', watched: false, rating: 92, genre: "Crime"},
         {id: v1(), name: 'The Dark Knight', watched: false, rating: 91, genre: "Action"},
         {id: v1(), name: 'The Godfather Part II', watched: false, rating: 90, genre: "Crime"},
         {id: v1(), name: 'Schindler\'s List', watched: false, rating: 89, genre: "Military"},
         {id: v1(), name: 'The Lord of the Rings', watched: false, rating: 87, genre: "Fantasy"},
         {id: v1(), name: 'Pulp Fiction', watched: false, rating: 89, genre: "Crime"}
     ])*/

    const allFilms = 'idList1'
    const topRated = 'idList2'
    const watched = 'idList3'

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
        [watched]: [
            {id: v1(), name: 'The Shawshank Redemption', watched: true, rating: 93, genre: "Drama"},
        ]
    })

    const [watchList, setWatchlist] = useState<WatchListType[]>([
        {id: allFilms, title: 'Movies'},
        {id: topRated, title: 'Top Rated Movies'},
        {id: watched, title: 'Watched Movies'}
    ])

    const [genre, setGenre] = useState("All");

    const changeStatus = (id: string, watched: boolean, watchListId: string) => {
        setMovies({
            ...movies,
            [watchListId]: movies[watchListId].map(el => el.id !== id ? el : {...el, watched: watched})
        })
    }
    function removeFilms(id: string, watchListId: string) {
        setMovies({...movies, [watchListId]: movies[watchListId].filter(el => el.id !== id)})
    }
    const addFilm = (newFilm: MovieType, watchListId: string) => {
        setMovies({...movies, [watchListId]: [newFilm, ...movies[watchListId]]})

        //setMovies([...movies, newFilm])
    }
    const genreFilter = (genre: string) => {
        //setGenre(genre)
    }
    //const filteredMovies = movies.filter((m) => genre === "All" ? m : m.genre.toLowerCase() === genre.toLowerCase())

    return (
        <header className="App">
            <div className={'list'}>
                {watchList.map(el => {
                        return (
                            <Watchlist
                                key={el.id}
                                watchListId={el.id}
                                movies={movies[el.id]}
                                title={el.title}
                                removeFilms={removeFilms}
                                addFilm={addFilm}
                                genreFilter={genreFilter}
                                setGenre={setGenre}
                                genre={genre}
                                changeStatus={changeStatus}
                            />
                        )
                    }
                )}


            </div>
        </header>
    );
}

export default App;


