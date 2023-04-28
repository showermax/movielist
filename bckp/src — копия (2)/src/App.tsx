import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Watchlist} from "./components/Watchlist";

function App() {
    const title = 'Best movies'
   const [movies, setMovies] = useState([
        {id: v1(), name: 'The Shawshank Redemption', watched: false, rating: 93, genre: "Drama"},
        {id: v1(), name: 'The Godfather', watched: false, rating: 92, genre: "Crime"},
        {id: v1(), name: 'The Dark Knight', watched: false, rating: 91, genre: "Action"},
        {id: v1(), name: 'The Godfather Part II', watched: false, rating: 90, genre: "Crime"},
        {id: v1(), name: 'Schindler\'s List', watched: false, rating: 89, genre: "Military"},
        {id: v1(), name: 'The Lord of the Rings', watched: false, rating: 89, genre: "Fantasy"},
        {id: v1(), name: ' Pulp Fiction', watched: false, rating: 89, genre: "Crime"}
    ])

const [genre, setGenre] = useState("All");

    function removeFilms(id: string) {
        setMovies(movies.filter(el => el.id !== id))
    }
 const addFilm = (title:string) => {
            let newFilm = {id: v1(), name: title, watched: false, rating: 98, genre: "Crime"}
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
                        movies={movies}
                        title={title}
                        removeFilms={removeFilms}
                        addFilm={addFilm}
                    />
                </ul>
            </div>
        </header>
    );
}

export default App;
