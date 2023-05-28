import {combineReducers, legacy_createStore} from "redux";
import {watchListReducer} from "../reducers/watchListReducer";

const rootReducer = combineReducers({
    watchLists: watchListReducer

})

export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>