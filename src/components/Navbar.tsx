import {NavLink} from "react-router-dom"
import {FC} from "react";
import {NavbarPropsType} from "types/types";


export const Navbar: FC<NavbarPropsType> = (
    {
        watchList
    }) => {

    return (
        <div className={'navbar'}>
            {watchList.map(el => <div key={el.id} className={'navItem'}><NavLink to={el.id.toString()}> {`${el.title}`} </NavLink></div>)}
            <div className={'navItem'}>
            </div>
        </div>
    )
}