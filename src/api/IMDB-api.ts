import axios from 'axios';
import {AxiosResponse} from 'axios'
import {ImdbMovieType} from "types/types";

const options = {
    method: 'GET',
    url: 'https://imdb-top-100-movies1.p.rapidapi.com/',
    headers: {
        'X-RapidAPI-Key': '4a4a721ffamsh95b7e4b3a5d75a5p1aa010jsnf31c84a2b7fb',
        'X-RapidAPI-Host': 'imdb-top-100-movies1.p.rapidapi.com'
    }
};

export function getIMDB( ) {
    return(
        axios.request<AxiosResponse<ImdbMovieType[]>>(options)
    )
}
