import {ImdbMovieType, MoviePayloadType} from "types/types";

export const transformFilm = (film: ImdbMovieType):MoviePayloadType => {
    const transformGenres: Array<string> = film.genre.map(genre=>genre.trim())
    const movie:MoviePayloadType = {
        watchListIds: [1],
        name: film.title,
        watched: false,
        rating: Number(film.rating),
        description: film.description,
        releaseYear: `${film.year}-01-01`,
        duration: "11:22:00",
        url: film.image[0][1],
        genreNames: transformGenres
    }
    return movie
}
