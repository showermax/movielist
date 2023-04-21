import React from 'react';
type PropsType = {
    movies:any[]
    title: string
}
export const Watchlist = (props:PropsType) => {
    return (
        <>
            <h1>{props.title}</h1>
            <ul>
                {props.movies.map(el => <li key={el.id}>
                    <input type='checkbox' checked={el.watched} ></input>
                    <span>{el.name}</span> {` - ${el.rating}`}
                    <button>х</button>
                </li>)}
            </ul>
        </>
    );
};


