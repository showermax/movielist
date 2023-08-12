import React from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from "react-redux";
import {appDispatch} from "store/store";
import {addMovieTC} from "reducers/movieReducer";
import {MoviePayloadType} from "types/types";

type _FormData = {
    name: string;
    watched: boolean;
    rating: number;
    description: string;
    releaseYear: string;
    duration: string;
    url: string;
    genreNames: string[];
    watchListIds: number[];
};


type AddMovieFormProps = {

    onSubmit: (data: MoviePayloadType) => void;
};

const AddMovieForm: React.FC<AddMovieFormProps> = ({onSubmit}) => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<MoviePayloadType>();

    const handleFormSubmit = handleSubmit((data) => {
        onSubmit(data);
    });

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" {...register('name', {
                    required: 'Name is required',
                    maxLength: {value: 100, message: 'Name exceeds the maximum length of 100 characters'}
                })} />
                {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div>
                <label>Watched:</label>
                <input type="checkbox" {...register('watched')} />
            </div>

            <div>
                <label>Rating:</label>
                <input type="number" step="0.1" min="0" max="10" {...register('rating', {required: true})} />
                {errors.rating && <span>Please enter a rating between 0 and 10</span>}
            </div>

            <div>
                <label>Description:</label>
                <textarea {...register('description', {maxLength: 500})} />
            </div>

            <div>
                <label>Release Year:</label>
                <input type="text" {...register('releaseYear', {
                    required: true,
                    pattern: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
                })} />
                {errors.releaseYear && <span>Please enter a valid release year in the format YYYY-DD-MM</span>}
            </div>

            <div>
                <label>Duration:</label>
                <input type="text" {...register('duration')} />
            </div>

            <div>
                <label>URL:</label>
                <input type="text" {...register('url')} />
            </div>

            <div>
                <label>Genre:</label>
                <select {...register('genreNames', {required: true})} multiple>
                    <option value="Drama">Drama</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                </select>
                {errors.genreNames && <span>Please select at least one genre</span>}
            </div>
            <div>
                <label>Watchlist Names:</label>
                <label>
                    <input type='checkbox' value='1' {...register('watchListIds')} /> All
                </label>
                <label>
                    <input type='checkbox' value='2' {...register('watchListIds')} /> Watchlist 1
                </label>
                <label>
                    <input type='checkbox' value='3' {...register('watchListIds')} /> Watchlist 2
                </label>
            </div>
            <button type="submit">Add Movie</button>
        </form>
    );
};

export const AddMoviePage: React.FC = () => {
    const dispatch: appDispatch = useDispatch()
    const handleAddMovie = (data: MoviePayloadType) => {
        dispatch(addMovieTC(data))
        console.log(data);
    };


    return (
        <div>
            <h1>Add Movie</h1>
            <AddMovieForm onSubmit={handleAddMovie}/>
        </div>
    );
};
