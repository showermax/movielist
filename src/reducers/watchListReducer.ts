import {Dispatch} from "redux";
import {apiWatchList} from "api/Juliya-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WatchListType} from "types/types";

export const allFilms = 1
export const topRated = 2
export const watchedFilms = 3

const initialState: WatchListType[] = []

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
export const getWatchListsTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await apiWatchList.getWatchLists()
        dispatch(watchListActions.getWatchLists({watchLists: res.data}))
        console.log(res.data)
    } catch (e) {
        console.log(e)
    }
}