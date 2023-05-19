import {MovieType} from "../components/Watchlist";
import {WatchListType} from "../App";


export const watchListReducer =(state:WatchListType[], action: ActionTypes): WatchListType[] => {
    switch (action.type) {
        case "ADD-WATCH-LIST": {
            // setMovies({...movies, [newId]: []})
            return [...state, {id: action.payload.id, title: "newList"}]
        }
        default: return state
    }
}

type ActionTypes = AddWatchListACType

export type AddWatchListACType = ReturnType<typeof addWatchListAC>
export const addWatchListAC = (id: string)=> {
    return {
        type: 'ADD-WATCH-LIST',
        payload: {
            id
        }
    }as const
}
