import {MovieType} from "../components/Watchlist/Watchlist";
import {AddWatchListACType, allFilms, RemoveWatchListAC, topRated, watchedFilms} from "./watchListReducer";
import {v1} from "uuid";
import {MoviesType} from "../App";
import {useReducer} from "react";


const initialState = {
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
    [watchedFilms]: []
}

export const movieReducer = (state: MoviesType = initialState, action: ActionsType): MoviesType => {
    switch (action.type) {
        case "ADD-FILM": {
            return {
                ...state,
                [action.payload.watchListId]:
                    [action.payload.newFilm, ...state[action.payload.watchListId]]
            }
        }
        case "ADD-WATCH-LIST" : {
            return {...state, [action.payload.id]: []}
        }

        case 'REMOVE-WATCH-LIST': {
            delete state[action.payload.id]
            return state
        }
        case "REMOVE-FILMS": {
            return {
                ...state,
                [action.payload.watchListId]:
                    state[action.payload.watchListId].filter(f => f.id !== action.payload.id)
            }
        }
        case "CHANGE-STATUS": {
            const parentsId = state[action.payload.watchListId].filter(el => el.id === action.payload.id)[0].parents
            const {watchedFilms, watchListId, check, id} = action.payload

            if (action.payload.watchListId !== watchedFilms) {
                return {
                    ...state,
                    [watchListId]: state[watchListId].filter(el => el.id !== id),
                    [watchedFilms]: [...state[watchedFilms], {
                        ...state[watchListId].filter(el => el.id === id)[0],
                        watched: check
                    }]
                }
            } else {
                return {
                    ...state,
                    [watchedFilms]: state[watchedFilms].filter(f => f.id !== id),
                    [parentsId]: [...state[parentsId], ...state[watchedFilms].filter(f => f.id === id).map(el => ({
                        ...el,
                        watched: false
                    }))]
                }

            }
        }
        case "SORTED_NAME":{
            return {
                ...state,
                [action.payload.watchListId]: [...state[action.payload.watchListId].sort ((a,b) => a.name.localeCompare(b.name) )]
                // state.sort ((a,b) => a.name.localeCompare(b.name) )
            }
        }
        default:
            return state
    }
}

type ActionsType = AddFilmACType | AddWatchListACType | RemoveFilmsACType | ChangeStatusACType | RemoveWatchListAC | SortedNameAC

type AddFilmACType = ReturnType<typeof addFilmAC>
export const addFilmAC = (newFilm: MovieType, watchListId: string) => {
    return {
        type: "ADD-FILM",
        payload: {
            newFilm,
            watchListId
        }
    } as const
}


type RemoveFilmsACType = ReturnType<typeof removeFilmsAC>
export const removeFilmsAC = (id: string, watchListId: string) => {
    return {
        type: "REMOVE-FILMS",
        payload: {
            id,
            watchListId
        }
    } as const
}


type ChangeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (id: string, check: boolean, watchListId: string, watchedFilms: string) => {
    return {
        type: "CHANGE-STATUS",
        payload: {
            id,
            check,
            watchListId,
            watchedFilms
        }
    } as const
}

type SortedNameAC = ReturnType<typeof sortedNameAC>
export const sortedNameAC = (watchListId:string) => {
    return{
        type: 'SORTED_NAME',
        payload:{
            watchListId
        }
    } as const
}

