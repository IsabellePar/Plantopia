import { NavLink } from "react-router-dom";
import "../styles/header.css";
import Logo from '../assets/logo-sm.png';

export default function Header() {
    return (
        <nav className="header">
            <NavLink className='logo' to={"/"}>
                <img src={Logo} alt='Logo'/>
            </NavLink>
            <NavLink to={"/search"}>Search</NavLink>
            <NavLink to={"/plant-care"}>Plant care</NavLink>
            <NavLink to={"/my-plants"}>My plants</NavLink>
        </nav>
    );
}
