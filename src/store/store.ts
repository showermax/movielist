import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {watchListReducer} from "../reducers/watchListReducer";
import {movieReducer} from "../reducers/movieReducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {IMDBReducer} from "../reducers/IMDBReducer";

const rootReducer = combineReducers({
    watchLists: watchListReducer,
    movies: movieReducer,
    Imdb: IMDBReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type appDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>


export type AppRootStateType = ReturnType<typeof rootReducer>