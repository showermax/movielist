import React, {useEffect} from 'react';
import './App.css';

import {MovieType, Watchlist} from "./components/Watchlist/Watchlist";
import {Navbar} from "./components/Navbar";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {addWatchListAC, allFilms, getWatchListsTC} from "./reducers/watchListReducer";
import {useDispatch, useSelector} from "react-redux";
import {appDispatch, AppRootStateType} from "./store/store";
import {v1} from "uuid";
import styles from './App.module.scss';

export type MoviesType = {
    [key: string]: MovieType[]
}

export type WatchListType = {
    id: string
    title: string
}

//Проверка ГИТХАБ
function App() {
    const dispatch: appDispatch = useDispatch()

    useEffect(()=>{
        dispatch(getWatchListsTC())
    },[])
    console.log("APP")

    const watchLists = useSelector<AppRootStateType, WatchListType[]>(state => state.watchLists)

    const navigate = useNavigate();

    const addWatchList = () => {
        const newId = v1();
        navigate(newId)
        dispatch(addWatchListAC(newId))
    }
    return (
        <div className={styles.App}>
            <header className={"App-header"}>
                <Navbar
                    addWatchList={addWatchList}
                    watchList={watchLists}
                />
            </header>
            <div className={styles.list}>
                <Routes>
                    {watchLists.map(el => {
                            return (
                                <Route key={el.id} path={el.id} element={
                                    <Watchlist
                                        watchListId={el.id}
                                        title={el.title}
                                    />
                                }
                                />
                            )
                        }
                    )}
                    <Route path={'/*'} element={<Navigate to={watchLists.length ? watchLists[0].id : allFilms}/>}/>

                </Routes>
            </div>
        </div>
    );
}

export default App;


