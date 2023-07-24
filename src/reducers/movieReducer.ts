import {MoviePayloadType, MovieType} from "../components/Watchlist/Watchlist";
import {Dispatch} from "redux";
import {apiMovie} from "../api/Juliya-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {watchListActions} from "../reducers/watchListReducer";

const initialState: MoviesStateType = {
    // [allFilms]: [],
    // [topRated]: [],
    // [watchedFilms]: [],
}

export type MoviesStateType = {
    [key: number]: MovieType[]
}

const slice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        getMovies: (state, action: PayloadAction<{ watchListId: number, arrMovies: Array<MovieType> }>) => {
            //     return {
            //         ...state,
            //         [action.payload.watchListId]: action.payload.arrMovies
            //     }
            state[action.payload.watchListId] = action.payload.arrMovies
        },
        addFilm: (state, action: PayloadAction<{ newFilm: MovieType, watchListId: number }>) => {
            //     return {
            //         ...state,
            //         [action.payload.watchListId]:
            //             [...state[action.payload.watchListId], action.payload.newFilm]
            //     }
            state[action.payload.watchListId].push(action.payload.newFilm)
        },
        removeFilm: (state, action: PayloadAction<{ id: number, watchListId: number }>) => {
        // ...state,
        //         [action.payload.watchListId]:
        //     state[action.payload.watchListId].filter(f => f.id !== action.payload.id)
            const index = state[action.payload.watchListId].findIndex(film => film.id === action.payload.id)
                if (index !== -1) state[action.payload.watchListId].slice(index, 1)
        },
        changeStatus: (state, action: PayloadAction<{id: number, check: boolean, watchListId: number, watchedFilms: number}>)=>{
            //in progress
        },
        sortByName: (state, action: PayloadAction<{watchListId: number}>)=>{
            state[action.payload.watchListId].sort((a, b) => a.name.localeCompare(b.name))
        },
        sortByDnD: (state, action)=>{
            state[action.payload.watchListId] = action.payload.moviesArr
        }

    },
    extraReducers: builder => {
        builder.addCase(watchListActions.addWatchList,(state, action: PayloadAction<{id: number}>)=>{
            state[action.payload.id]= []
        })
        .addCase(watchListActions.removeWatchList,(state, action: PayloadAction<{id: number}>)=>{
            // const index = state.findIndex(wl => wl.id === action.payload.id)
            // if (index !== -1) state.slice(index, 1)
            delete state[action.payload.id]
        })
    }
})

export const movieReducer = slice.reducer

export const movieActions = slice.actions

//thunk

export const addMovieTC = (data: MoviePayloadType) => async (dispatch: Dispatch) => {
    try {
        const res = await apiMovie.addMovie(data)
        console.log(res)

    } catch (e) {

    }
}

export const getMoviesTC = (watchListId: number) => async (dispatch: Dispatch) => {
    try {
        const res = await apiMovie.getMovies(watchListId);
        dispatch(movieActions.getMovies({watchListId, arrMovies: res.data.items}));
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}
