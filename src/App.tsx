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

    const allFilms = 'idList1'
    const topRated = 'idList2'
    const watchedFilms = 'idList3'

    const [movies, setMovies] = useState<MoviesType>({
        [allFilms]: [
            {id: v1(), name: 'The Shawshank Redemption', watched: false, rating: 93, genre: "Drama", parents: allFilms},
            {id: v1(), name: 'The Godfather', watched: false, rating: 92, genre: "Crime", parents: allFilms},
            {id: v1(), name: 'The Dark Knight', watched: false, rating: 91, genre: "Action", parents: allFilms},
            {id: v1(), name: 'The Godfather Part II', watched: false, rating: 90, genre: "Crime", parents: allFilms},
            {id: v1(), name: 'Schindler\'s List', watched: false, rating: 89, genre: "Military", parents: allFilms},
            {id: v1(), name: 'The Lord of the Rings', watched: false, rating: 87, genre: "Fantasy", parents: allFilms},
            {id: v1(), name: 'Pulp Fiction', watched: false, rating: 89, genre: "Crime", parents: allFilms}
        ],
        [topRated]: [
            {id: v1(), name: 'The Shawshank Redemption', watched: false, rating: 93, genre: "Drama", parents: topRated},
            {id: v1(), name: 'The Godfather', watched: false, rating: 92, genre: "Crime", parents: topRated},
            {id: v1(), name: 'The Dark Knight', watched: false, rating: 91, genre: "Action", parents: topRated},
        ],
        [watchedFilms]: [
        ]
    })

    const [watchList, setWatchlist] = useState<WatchListType[]>([
        {id: allFilms, title: 'Movies'},
        {id: topRated, title: 'Top Rated Movies'},
        {id: watchedFilms, title: 'Watched Movies'}
    ])

    const changeStatus = (id: string, check: boolean, watchListId: string) => {
        const parentsId = movies[watchListId].filter(el=> el.id===id)[0].parents
        if (watchListId !== watchedFilms) {
            setMovies({
                ...movies,
                [watchListId]: movies[watchListId].filter(el => el.id !== id),
                [watchedFilms]: [...movies[watchedFilms], {
                    ...movies[watchListId].filter(el => el.id === id)[0],
                    watched: check
                }]
            })
        } else {
            setMovies({
                    ...movies,
                    [watchListId]: movies[watchListId].filter(f => f.id !== id),
                    [parentsId]: [...movies[parentsId],
                        ...movies[watchListId].filter(f => f.id === id).map(el => ({...el,
                        watched: false
                    }))]
                }
            )
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
                                watchListId={el.id}
                                movies={movies[el.id]}
                                title={el.title}
                                removeFilms={(id) => removeFilms(id, el.id)}
                                addFilm={addFilm}
                                /* genreFilter={genreFilter}
                                 setGenre={setGenre}
                                 genre={genre}*/
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


