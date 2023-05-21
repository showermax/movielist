import {MovieType} from "../components/Watchlist";
import {MoviesType} from "../App";
import {AddWatchListACType} from "./watchListReducer";

export const movieReducer = (state: MoviesType, action: ActionsType): MoviesType => {
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
        default:
            return state
    }
}

type ActionsType = AddFilmACType | AddWatchListACType | RemoveFilmsACType | ChangeStatusACType

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

