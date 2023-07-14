import axios from "axios";
import {MoviePayloadType} from "../components/Watchlist/Watchlist";
import retryTimes = jest.retryTimes;


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
    getAllMovies(WatchListid:number){
        return instanse.get(`movies/${WatchListid}`)
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