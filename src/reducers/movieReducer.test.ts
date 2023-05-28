import {MoviesType, WatchListType} from "../App";
import {v1} from "uuid";
import {addFilmAC, changeStatusAC, movieReducer, removeFilmsAC} from "./movieReducer";



let startState: MoviesType
beforeEach(() => {
    startState = {
        ['allFilms']: [
            {id: v1(), name: 'The Shawshank Redemption', watched: false, rating: 93, genre: "Drama", parents: 'allFilms'},
            {id: v1(), name: 'The Godfather', watched: false, rating: 92, genre: "Crime", parents: 'allFilms'},
            {id: v1(), name: 'The Dark Knight', watched: false, rating: 91, genre: "Action", parents: 'allFilms'},
            {id: v1(), name: 'The Godfather Part II', watched: false, rating: 90, genre: "Crime", parents: 'allFilms'},
            {id: v1(), name: 'Schindler\'s List', watched: false, rating: 89, genre: "Military", parents: 'allFilms'},
            {id: v1(), name: 'The Lord of the Rings', watched: false, rating: 87, genre: "Fantasy", parents: 'allFilms'},
            {id: v1(), name: 'Pulp Fiction', watched: false, rating: 89, genre: "Crime", parents: 'allFilms'}
        ],
        ['topRated']: [
            {id: v1(), name: 'The Shawshank Redemption', watched: false, rating: 93, genre: "Drama", parents: 'topRated'},
            {id: v1(), name: 'The Godfather', watched: false, rating: 92, genre: "Crime", parents: 'topRated'},
            {id: v1(), name: 'The Dark Knight', watched: false, rating: 91, genre: "Action", parents: 'topRated'},
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
        parents: 'allFilms'
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