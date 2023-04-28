import React from 'react';

type PropsType = {
        genre: string
        genreFilter: (genre: string) => void
    }
export const FilterGenre = (props: PropsType) => {
    return (
        <div>
            <select name={"movies"} onChange={(e) => props.genreFilter(e.currentTarget.value)}>
                <option value="All">All Genre</option>
                <option value="Drama">Drama</option>
                <option value="Crime">Crime</option>
                <option value="Action">Action</option>
                <option value="Military">Military</option>
                <option value="Fantasy">Fantasy</option>
            </select>
            <span>Selected genre: {props.genre}</span>
        </div>
    );
};

