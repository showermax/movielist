import React, {ChangeEvent, FC, memo} from 'react';
import {MovieType} from "./Watchlist";



type SuperInputType ={
    value: string | number
    type: string
    newFilm: MovieType
    setNewFilm: (newFilm: MovieType)=>void
    property: string
}

export const SuperInput: FC<SuperInputType> = memo((props) => {
const  {value,type,newFilm,setNewFilm,property } = props
    const onchangeHandler =(e: ChangeEvent<HTMLInputElement>)=> {
        setNewFilm(type==='number'
            ?{...newFilm, [property]: +e.currentTarget.value}
            : {...newFilm, [property]: e.currentTarget.value})
    }
    return (
        <div>
            <input value={value} type={type} onChange={onchangeHandler}/>
        </div>
    );
})
