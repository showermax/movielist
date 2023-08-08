import {Dispatch} from "redux";
import {getIMDB} from "api/IMDB-api";
import {ImdbMovieType} from "types/types";

const initialState:ImdbMovieType[] = []

export const IMDBReducer = (state = initialState, action: GetMoviesACType) =>{
    switch (action.type) {
        case "GET_IMDB_MOVIES":{
            return action.payload.movies
        }default: return state
    }
}

type GetMoviesACType = ReturnType<typeof getMoviesAC>
const getMoviesAC = (movies:any) =>{
    return{
        type: "GET_IMDB_MOVIES",
        payload: {
            movies
        }
    }as const
}

export const getMoviesTC = () =>{
    return async (dispatch: Dispatch)  => {
        try{
            const response = await getIMDB()
            dispatch(getMoviesAC(response.data))
        } catch (e) {
        }
    }
}