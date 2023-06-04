import {NavLink} from "react-router-dom"
import {SuperButton} from "./SuperButton";
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
        <div className={'navbar'}>
            {watchList.map(el => <div key={el.id} className={'navItem'}><NavLink to={el.id}> {`${el.title}`} </NavLink></div>)}
            <div className={'navItem'}>
                <SuperButton name={"Add new +"} onClickCallBack={onClickHandler}/>
            </div>
        </div>
    )
}