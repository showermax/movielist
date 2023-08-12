import React, {useEffect} from 'react';
import './App.css';
import {Watchlist} from "components/Watchlist/Watchlist";
import {Navbar} from "components/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {allFilms, getWatchListsTC} from "reducers/watchListReducer";
import {useDispatch, useSelector} from "react-redux";
import {appDispatch, AppRootStateType} from "store/store";
import styles from './App.module.scss';
import {WatchListType} from "types/types";

function App() {
    const dispatch: appDispatch = useDispatch()

    useEffect(()=>{
        dispatch(getWatchListsTC())
    },[dispatch])
    console.log("APP")

    const watchLists = useSelector<AppRootStateType, WatchListType[]>(state => state.watchLists)

    return (
        <div className={styles.App}>
            <header className={"App-header"}>
                <Navbar
                    watchList={watchLists}
                />
            </header>
            <div className={styles.list}>
                <Routes>
                    {watchLists.map(el => {
                            return (
                                <Route key={el.id} path={`${el.id}`} element={
                                    <Watchlist
                                        watchListId={el.id}
                                        title={el.title}
                                    />
                                }
                                />
                            )
                        }
                    )}
                    <Route path={'/*'} element={<Navigate to={watchLists.length ? watchLists[0].id.toString() : allFilms.toString()}/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;


