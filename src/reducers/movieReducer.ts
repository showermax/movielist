import {MoviePayloadType, MovieType} from "../components/Watchlist/Watchlist";
import {AddWatchListACType, allFilms, RemoveWatchListAC, topRated, watchedFilms} from "./watchListReducer";
import {v1} from "uuid";
import {MoviesType} from "../App";
import {Dispatch} from "redux";
import {apiMovie} from "../api/Juliya-api";

/*description: required(string)
title: required(string)
completed: required(boolean)
status: required(integer)
priority: required(integer)
startDate: required(datetime)
deadline: required(datetime)
id: required(string)
todoListId: required(string)
order: required(integer)
addedDate: required(datetime)*/

const initialState = {
    [allFilms]: [
        {
            id: v1(),
            name: 'The Shawshank Redemption',
            watched: false,
            rating: 93,
            genre: "Drama",
            parents: allFilms,
            order: 1
        },
        {id: v1(), name: 'The Godfather', watched: false, rating: 92, genre: "Crime", parents: allFilms, order: 2},
        {id: v1(), name: 'The Dark Knight', watched: false, rating: 91, genre: "Action", parents: allFilms, order: 3},
        {
            id: v1(),
            name: 'The Godfather Part II',
            watched: false,
            rating: 90,
            genre: "Crime",
            parents: allFilms,
            order: 4
        },
        {
            id: v1(),
            name: 'Schindler\'s List',
            watched: false,
            rating: 89,
            genre: "Military",
            parents: allFilms,
            order: 5
        },
        {
            id: v1(),
            name: 'The Lord of the Rings',
            watched: false,
            rating: 87,
            genre: "Fantasy",
            parents: allFilms,
            order: 6
        },
        {id: v1(), name: 'Pulp Fiction', watched: false, rating: 89, genre: "Crime", parents: allFilms, order: 7}
    ],
    [topRated]: [
        {
            id: v1(),
            name: 'The Shawshank Redemption',
            watched: false,
            rating: 93,
            genre: "Drama",
            parents: topRated,
            order: 1
        },
        {id: v1(), name: 'The Godfather', watched: false, rating: 92, genre: "Crime", parents: topRated, order: 2},
        {id: v1(), name: 'The Dark Knight', watched: false, rating: 91, genre: "Action", parents: topRated, order: 3},
    ],
    [watchedFilms]: []
}

export const movieReducer = (state: MoviesType = initialState, action: ActionsType): MoviesType => {
    switch (action.type) {
        case "ADD-FILM": {
            return {
                ...state,
                [action.payload.watchListId]:
                    [...state[action.payload.watchListId], action.payload.newFilm]
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
        case "SORTED_NAME": {
            return {
                ...state,
                [action.payload.watchListId]: [...state[action.payload.watchListId].sort((a, b) => a.name.localeCompare(b.name))]
                // state.sort ((a,b) => a.name.localeCompare(b.name) )
            }
        }
        case "SORTED-DND":{
            return {
                ...state,
                [action.payload.watchListId]: action.payload.moviesArr
            }
        }
        default:
            return state
    }
}

type ActionsType =
    AddFilmACType
    | AddWatchListACType
    | RemoveFilmsACType
    | ChangeStatusACType
    | RemoveWatchListAC
    | SortedNameAC
    | SortDNDAC

type AddFilmACType = ReturnType<typeof addFilmAC>
export const addFilmAC = (newFilm: MovieType, watchListId: number) => {
    return {
        type: "ADD-FILM",
        payload: {
            newFilm,
            watchListId
        }
    } as const
}


type RemoveFilmsACType = ReturnType<typeof removeFilmsAC>
export const removeFilmsAC = (id: string, watchListId: number) => {
    return {
        type: "REMOVE-FILMS",
        payload: {
            id,
            watchListId
        }
    } as const
}


type ChangeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (id: string, check: boolean, watchListId: number, watchedFilms: string) => {
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
export const sortedNameAC = (watchListId: number) => {
    return {
        type: 'SORTED_NAME',
        payload: {
            watchListId
        }
    } as const
}
type SortDNDAC = ReturnType<typeof sortDNDAC>
export const sortDNDAC = (watchListId: number, moviesArr: MovieType[]) => {
    return {
        type: 'SORTED-DND',
        payload: {
            watchListId,
            moviesArr
        }
    } as const
}

export const addMovieTC = (data:MoviePayloadType) => async (dispatch:Dispatch)=>{
    try {
        const res = await apiMovie.addMovie(data)
        console.log(res)

    } catch (e) {

    }
}

// export const getMovie
