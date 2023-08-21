
export type MoviesType = {
    [key: string]: MovieType[]
}

export type WatchListType = {
    id: number
    title: string
}
export type NavbarPropsType = {
    watchList: WatchListType[]
    addWatchList: ()=>void
}

export type MovieType = {
    id: number
    description: string
    duration: string
    genreNames: Array<string>
    name: string
    rating: number
    releaseYear: string
    url: string
    watchListNames: Array<string>
    watched: boolean
}

export  type MoviePayloadType = {
    description: string
    duration: string
    genreNames: Array<string>
    name: string
    rating: number
    releaseYear: string
    url: string
    watchListIds: Array<number>
    watched: boolean
}
export type ImdbMovieType = {
    _id: string
    id: string
    __v: number
    description: string
    director: string[]
    genre: string[]
    image: Array<string[]>
    imdbid: string
    rank: number
    rating: string
    thumbnail: string
    title: string
    writers: string[]
    year: number
}

export type GetMoviesFromWatchlist = {
    data: ResponseGetMovieType
    status: number
    statusText: string
}
export type ResponseWatchlistsType = {
    title: string
    id: number
}

export type ResponseGetMovieType = {
    items: MovieType []
    totalCount: number
    pageNumber: number
    pageSize: number
}

export type GenresType = {
    name: string
    id: number
}

