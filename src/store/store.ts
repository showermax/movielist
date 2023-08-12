import {AnyAction, combineReducers} from "redux";
import {watchListReducer} from "reducers/watchListReducer";
import {ThunkDispatch} from "redux-thunk";
import {IMDBReducer} from "reducers/IMDBReducer";
import {configureStore} from "@reduxjs/toolkit";
import {movieReducer} from "reducers/movieReducer";

const rootReducer = combineReducers({
    watchLists: watchListReducer,
    movies: movieReducer,
    Imdb: IMDBReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type appDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>


export type AppRootStateType = ReturnType<typeof rootReducer>