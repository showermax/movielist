import React, {useReducer, useState} from 'react';
import './App.css';

import {MovieType, Watchlist} from "./components/Watchlist";
import {Navbar} from "./components/Navbar";
import {Route, Routes, Navigate, useNavigate} from "react-router-dom";
import {addFilmAC, changeStatusAC, movieReducer, removeFilmsAC} from "./reducers/movieReducer";
import {addWatchListAC, allFilms, watchedFilms, watchListReducer} from "./reducers/watchListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {Dispatch} from "redux";
import {v1} from "uuid";

export type MoviesType = {
    [key: string]: MovieType[]
}

export type WatchListType = {
    id: string
    title: string
}

//Проверка ГИТХАБ
function App() {
    const watchLists = useSelector<AppRootStateType, WatchListType[]>(state => state.watchLists)

    const dispatch: Dispatch = useDispatch()

    const navigate = useNavigate();

    const addWatchList = () => {
        const newId = v1();
        navigate(newId)
        dispatch(addWatchListAC(newId))
    }
    return (
        <div className="App">
            <header className={"App-header"}>
                <Navbar
                    addWatchList={addWatchList}
                    watchList={watchLists}
                />
            </header>
            <div className={'list'}>
                <Routes>
                    {watchLists.map(el => {
                            return (
                                <Route path={el.id} element={
                                    <Watchlist
                                        key={el.id}
                                        watchListId={el.id}
                                        title={el.title}
                                        /* genreFilter={genreFilter}
                                         setGenre={setGenre}
                                         genre={genre}*/
                                    />
                                }
                                />
                            )
                        }
                    )}
                    <Route path={'/*'} element={<Navigate to={allFilms}/>}/>

                </Routes>
            </div>
        </div>
    );
}

export default App;


