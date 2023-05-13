import {NavLink} from "react-router-dom"
import {SuperButton} from "./SuperButton";
import {SuperInput} from "./SuperInput";
import {FC} from "react";
import {WatchListType} from "../App";

export type NavbarPropsType = {
    addWatchList: () => void
    watchList: WatchListType[]
}
export const Navbar: FC<NavbarPropsType> = (props) => {
    const {addWatchList, watchList} = props
    const onClickHandler = () => {
        addWatchList()
    }

    return (
        <>
            {watchList.map(el => <NavLink to={el.id}> {`${el.title}`} </NavLink>)}
            <div>
                <SuperButton name={"add watchlist"} onClickCallBack={onClickHandler}/>
            </div>
        </>
    )
}