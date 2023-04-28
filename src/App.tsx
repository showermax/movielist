import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {MovieType, Watchlist} from "./components/Watchlist";



function App() {
    const title:string = 'Best movies'
    const [movies, setMovies] = useState<Array<MovieType>>([
        {id: v1(), name: 'The Shawshank Redemption', watched: false, rating: 93, genre: "Drama"},
        {id: v1(), name: 'The Godfather', watched: false, rating: 92, genre: "Crime"},
        {id: v1(), name: 'The Dark Knight', watched: false, rating: 91, genre: "Action"},
        {id: v1(), name: 'The Godfather Part II', watched: false, rating: 90, genre: "Crime"},
        {id: v1(), name: 'Schindler\'s List', watched: false, rating: 89, genre: "Military"},
        {id: v1(), name: 'The Lord of the Rings', watched: false, rating: 89, genre: "Fantasy"},
        {id: v1(), name: ' Pulp Fiction', watched: false, rating: 89, genre: "Crime"}
    ])

    const [genre, setGenre] = useState("All");

    const changeStatus = (id: string, watched: boolean) => {
        setMovies(movies.map(el => el.id === id ? {...el, watched: watched} : el))
    }

    function removeFilms(id: string) {
        setMovies(movies.filter(el => el.id !== id))
    }

    const addFilm = (newFilm:MovieType) => {
        setMovies([...movies, newFilm])
    }
    const genreFilter = (genre: string) => {
        setGenre(genre)
    }
    const filteredMovies = movies.filter((m) => genre === "All" ? m : m.genre.toLowerCase() === genre.toLowerCase())

    return (
        <header className="App">
            <div className={'main'}>
                <ul>
                    <Watchlist
                        movies={filteredMovies}
                        title={title}
                        removeFilms={removeFilms}
                        addFilm={addFilm}
                        genreFilter={genreFilter}
                        setGenre={setGenre}
                        genre={genre}
                        changeStatus={changeStatus}
                    />
                </ul>
            </div>
        </header>
    );
}

export default App;
