import {MovieType} from "../components/Watchlist";
import {MoviesType} from "../App";
import {AddWatchListACType} from "./watchListReducer";

export const movieReducer = (state: MoviesType, action:ActionsType):MoviesType => {
    switch (action.type){
        case "ADD-FILM": {
            return {...state,
                [action.payload.watchListId]:
                    [action.payload.newFilm, ...state[action.payload.watchListId]]}
        }
        case  "ADD-WATCH-LIST" : {
            return {...state, [action.payload.id]: []}
        }
        default: return state

    }
}

type ActionsType = AddFilmACType | AddWatchListACType

type AddFilmACType = ReturnType<typeof addFilmAC>
export const addFilmAC =(newFilm: MovieType, watchListId: string)=>{
    return {
        type: "ADD-FILM",
        payload: {
            newFilm,
            watchListId
        }
    } as const
}

