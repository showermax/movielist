export type WatchListType = {
    id: string
    title: string
}
export const allFilms = 'idList1'
export const topRated = 'idList2'
export const watchedFilms = 'idList3'

const initialState: WatchListType[] = [
    {id: allFilms, title: 'Movies'},
    {id: topRated, title: 'Top Rated Movies'},
    {id: watchedFilms, title: 'Watched Movies'}
]

export const watchListReducer = (state: WatchListType[] = initialState, action: ActionTypes): WatchListType[] => {
    switch (action.type) {
        case "ADD-WATCH-LIST": {
            // setMovies({...movies, [newId]: []})
            return [...state, {id: action.payload.id, title: "newList"}]
        }
        case "REMOVE-WATCH-LIST":{
            return state.filter(list=> list.id !== action.payload.id)
        }
        case "CHANGE_TITLE": {
            return state.map(list=> list.id === action.payload.watchListId ? {...list, title: action.payload.newTitle} : list)
        }
        default:
            return state
    }
}

type ActionTypes = AddWatchListACType | RemoveWatchListAC | ChangeTitleACType

export type AddWatchListACType = ReturnType<typeof addWatchListAC>
export const addWatchListAC = (id: string) => {
    return {
        type: 'ADD-WATCH-LIST',
        payload: {
            id
        }
    } as const
}

export type RemoveWatchListAC = ReturnType<typeof removeWatchListAC>

export const removeWatchListAC = (id: string) => {
    return {
        type: 'REMOVE-WATCH-LIST',
        payload: {
            id
        }
    } as const
}

export type ChangeTitleACType = ReturnType<typeof changeTitleAC>
export const changeTitleAC = (watchListId: string, newTitle:string)=>{
    return{
        type: 'CHANGE_TITLE',
        payload:{
            watchListId,
            newTitle
        }
    }as const
}