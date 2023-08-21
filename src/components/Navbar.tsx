import {NavLink} from "react-router-dom"
import {FC} from "react";
import {NavbarPropsType} from "types/types";
import {SuperButton} from "components/SuperButton";

export const Navbar: FC<NavbarPropsType> = (
    {
        addWatchList,
        watchList
    }) => {

    const onClickHandler = () => {
        addWatchList()
    }

    return (
        <div className={'navbar'}>
            {watchList.map(el => <div key={el.id} className={'navItem'}><NavLink to={el.id.toString()}> {`${el.title}`} </NavLink></div>)}
            <div className={'navItem'}>
                <SuperButton name={"Add new +"} onClickCallBack={onClickHandler}/>
            </div>
        </div>
    )
}