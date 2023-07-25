import axios, {AxiosResponse} from "axios";
import {MoviePayloadType, MovieType} from "components/Watchlist/Watchlist";

type GetMoviesFromWatchlist = {
    data: ResponseGetMovieType
    status: number
    statusText: string
}
type ResponseWatchlistsType = {
    title: string
    id: number
}


export type ResponseGetMovieType = {
    items: MovieType []
    totalCount: number
    pageNumber: number
    pageSize: number
}
const instanse = axios.create({
    baseURL: "http://movieapi.somee.com/api/"
})

export const apiMovie = {
    addMovie(data: MoviePayloadType) {
        return instanse.post<ResponseGetMovieType, AxiosResponse<ResponseGetMovieType>, MoviePayloadType>("movies", data)
    },
    getMovie(id: number) {
        return instanse.get<ResponseGetMovieType>(`movies/${id}`)
    },
    getMovies(watchListid: number) {
        return instanse.get<ResponseGetMovieType, AxiosResponse<ResponseGetMovieType>, {
            watchListid: number
        }>(`watchlists/${watchListid}/movies`)
    },
    updateMovie(id: number) {
        return instanse.put(`movies/${id}`)
    },
    deleteMovie(id: number) {
        return instanse.delete<null>(`movies/${id}`)
    },

}

export const apiWatchList = {
    getWatchLists() {
        return instanse.get<ResponseWatchlistsType[]>("watchlists")
    }
}