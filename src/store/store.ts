import {combineReducers, legacy_createStore} from "redux";
import {watchListReducer} from "../reducers/watchListReducer";
import {movieReducer} from "../reducers/movieReducer";

const rootReducer = combineReducers({
    watchLists: watchListReducer,
    movies: movieReducer
})

export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>