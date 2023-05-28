export type WatchListType = {
    id: string
    title: string
}
const allFilms = 'idList1'
const topRated = 'idList2'
const watchedFilms = 'idList3'
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
        default:
            return state
    }
}

type ActionTypes = AddWatchListACType

export type AddWatchListACType = ReturnType<typeof addWatchListAC>
export const addWatchListAC = (id: string) => {
    return {
        type: 'ADD-WATCH-LIST',
        payload: {
            id
        }
    } as const
}
