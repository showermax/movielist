import {MoviesType, WatchListType} from "../App";
import {v1} from "uuid";
import {addFilmAC, changeStatusAC, movieReducer, removeFilmsAC} from "./movieReducer";
import {allFilms, topRated} from "./watchListReducer";



let startState: MoviesType
beforeEach(() => {
    startState = {
        ['allFilms']: [
            {id: v1(), name: 'The Shawshank Redemption', watched: false, rating: 93, genre: "Drama", parents: allFilms, order: 1},
            {id: v1(), name: 'The Godfather', watched: false, rating: 92, genre: "Crime", parents: allFilms, order: 2},
            {id: v1(), name: 'The Dark Knight', watched: false, rating: 91, genre: "Action", parents: allFilms, order: 3},
            {id: v1(), name: 'The Godfather Part II', watched: false, rating: 90, genre: "Crime", parents: allFilms, order: 4},
            {id: v1(), name: 'Schindler\'s List', watched: false, rating: 89, genre: "Military", parents: allFilms, order: 5},
            {id: v1(), name: 'The Lord of the Rings', watched: false, rating: 87, genre: "Fantasy", parents: allFilms, order: 6},
            {id: v1(), name: 'Pulp Fiction', watched: false, rating: 89, genre: "Crime", parents: allFilms, order: 7}
        ],
        ['topRated']: [
            {id: v1(), name: 'The Shawshank Redemption', watched: false, rating: 93, genre: "Drama", parents: topRated, order: 1},
            {id: v1(), name: 'The Godfather', watched: false, rating: 92, genre: "Crime", parents: topRated, order: 2},
            {id: v1(), name: 'The Dark Knight', watched: false, rating: 91, genre: "Action", parents: topRated, order: 3},
        ],
        ['watchedFilms']: []
    }
})

test('should be add newFilm', ()=>{
    const newFilm = {
        id: 'newId',
        name: 'Spider-Man',
        watched: false,
        rating: 87,
        genre: "Fantasy",
        parents: 'allFilms',
        order: 9
    }
    let endState = movieReducer(startState,addFilmAC(newFilm, 'allFilms'))

    expect(startState['allFilms'].length).toBe(7)
    expect(endState['allFilms'].length).toBe(8)
    expect(endState['allFilms'][0].name).toBe('Spider-Man')
    expect(endState['allFilms'][0].parents).toBe('allFilms')
    expect(endState['allFilms'].at(-1)).toEqual(startState['allFilms'].at(-1))
})

test('should be delete film', ()=>{

    let endState = movieReducer(startState, removeFilmsAC(startState['allFilms'][0].id, 'allFilms'))

    expect(startState['allFilms'][0].id).toBeDefined()
    expect(startState['allFilms'][1].id).toBe(endState['allFilms'][0].id)
    expect(endState['allFilms'].length).toBe(6)
    expect(endState['allFilms'][0].name !== 'The Shawshank Redemption').toBeTruthy()

})

test('should be change status', ()=>{

    let endState = movieReducer(startState, changeStatusAC(startState['allFilms'][0].id, true,'allFilms', 'watchedFilms'))


    expect(endState['watchedFilms'].length).toBe(1)
    expect(endState['allFilms'].length).toBe(startState['allFilms'].length-1)
    expect(endState['watchedFilms'][0].name).toBe('The Shawshank Redemption')
    expect(endState['allFilms'][0].name === 'The Shawshank Redemption').toBeFalsy()


})