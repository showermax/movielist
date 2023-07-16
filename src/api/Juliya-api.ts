import axios from "axios";
import {MoviePayloadType} from "../components/Watchlist/Watchlist";


const instanse = axios.create({
    baseURL: "http://movieapi.somee.com/api/"
})

export const apiMovie = {
    addMovie(data:MoviePayloadType){
        return instanse.post<any>("movies", data)
    },
    getMovie(id:number){
        return instanse.get(`movies/${id}`)
    },
    getMovies(WatchListid:number){
        return instanse.get(`watchlists/${WatchListid}/movies`)
    },
    updateMovie(id:number){
        return instanse.put(`movies/${id}`)
    },
    deleteMovie(id:number){
        return instanse.delete(`movies/${id}`)
    },

}

export const apiWatchList = {
    getWatchLists(){
        return instanse.get("watchlists")
    }
}