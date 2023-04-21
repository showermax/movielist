import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Watchlist} from "./Watchlist";

type MovieType = {
    id: string
    name:string
    watched: boolean
    rating: number
}
function App() {
    const [movies, setMovies] = useState<Array<MovieType>>([
        {id: v1(), name: 'The Godfather Part II', watched: false, rating: 90},
        {id: v1(), name: 'The Shawshank Redemption', watched: false, rating: 93},
        {id: v1(), name: 'The Dark Knight', watched: false, rating: 91},
        {id: v1(), name: 'Schindler\'s List', watched: false, rating: 89},
        {id: v1(), name: 'The Lord of the Rings', watched: false, rating: 89},
        {id: v1(), name: 'The Godfather', watched: false, rating: 92},
        {id: v1(), name: 'Pulp Fiction', watched: false, rating: 89}
    ])

    // const watchList = movies.map(el=><li key={el.id}><input type='checkbox' checked={el.watched}></input><span>{el.name}</span> {` - ${el.rating}`}</li>)



    return (
    <div className="App">
      <header className="App-header"> Best App Ever
      </header>
      <div className="main">
            <ul>
                {/*{watchList}*/}
                <Watchlist movies={movies} title={'My first List'} />
            </ul>
      </div>
    </div>
  );
}

export default App;
