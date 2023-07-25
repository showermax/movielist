import {Dispatch} from "redux";
import {apiWatchList} from "../api/Juliya-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type WatchListType = {
    id: number
    title: string
}
export const allFilms = 1
export const topRated = 2
export const watchedFilms = 3

const initialState: WatchListType[] = [
    // {id: allFilms, title: 'Movies'},
    // {id: topRated, title: 'Top Rated Movies'},
    // {id: watchedFilms, title: 'Watched Movies'}
]

const slice = createSlice({
    name: "watchList",
    initialState,
    reducers: {
        addWatchList: (state, action: PayloadAction<{id: number}>)=>{
            state.push({id: action.payload.id, title: "newList"})
        },
        removeWatchList: (state, action: PayloadAction<{id: number}>)=>{
            const index = state.findIndex((watchList) => watchList.id === action.payload.id);
            if (index !== -1) state.slice(index, 1);
        },
        changeTitle: (state, action: PayloadAction<{watchListId: number, newTitle:string}>)=> {
            const watchList = state.find((watchList) => watchList.id === action.payload.watchListId);
            if (watchList) {
                watchList.title = action.payload.newTitle;
            }
        },
        getWatchLists: (state, action: PayloadAction<{watchLists: WatchListType[]}>)=> {
            return action.payload.watchLists
        }
    }
})

export const watchListReducer = slice.reducer
export const watchListActions = slice.actions

// export const watchListReducer = (state: WatchListType[] = initialState, action: ActionTypes): WatchListType[] => {
//     switch (action.type) {
//         case "ADD-WATCH-LIST": {
//             // setMovies({...movies, [newId]: []})
//             return [...state, {id: action.payload.id, title: "newList"}]
//         }
//         case "REMOVE-WATCH-LIST":{
//             return state.filter(list=> list.id !== action.payload.id)
//         }
//         case "CHANGE_TITLE": {
//             return state.map(list=> list.id === action.payload.watchListId ? {...list, title: action.payload.newTitle} : list)
//         }
//         case "GET_WATCHLISTS": {
//             return action.payload.watchList
//         }
//         default:
//             return state
//     }
// }

// type ActionTypes = AddWatchListACType | RemoveWatchListAC | ChangeTitleACType | GetWatchListsACType
//
// export type AddWatchListACType = ReturnType<typeof addWatchListAC>
// export const addWatchListAC = (id: number) => {
//     return {
//         type: 'ADD-WATCH-LIST',
//         payload: {
//             id
//         }
//     } as const
// }
//
// export type RemoveWatchListAC = ReturnType<typeof removeWatchListAC>
//
// export const removeWatchListAC = (id: number) => {
//     return {
//         type: 'REMOVE-WATCH-LIST',
//         payload: {
//             id
//         }
//     } as const
// }
//
// export type ChangeTitleACType = ReturnType<typeof changeTitleAC>
// export const changeTitleAC = (watchListId: number, newTitle:string)=>{
//     return{
//         type: 'CHANGE_TITLE',
//         payload:{
//             watchListId,
//             newTitle
//         }
//     }as const
// }
//
// type GetWatchListsACType = ReturnType<typeof getWatchListsAC>
// export const getWatchListsAC = (watchList: WatchListType[])=>{
//     return{
//         type: 'GET_WATCHLISTS',
//         payload: {watchList}
//     }as const
// }

export const getWatchListsTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await apiWatchList.getWatchLists()
        dispatch(watchListActions.getWatchLists({watchLists: res.data}))
        console.log(res.data)
    } catch (e) {
        console.log(e)
    }
}