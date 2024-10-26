import { NavLink } from "react-router-dom";
import "../styles/header.css";
import Logo from "../assets/logo-sm.png";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="header">
            <NavLink className="logo" to={"/"}>
                <img src={Logo} alt="Logo" />
            </NavLink>
            <div className={`menu ${isOpen ? "open" : ""}`}>
                <NavLink className={`header-navlink ${isOpen ? "open" : ""}`} to={"/search"}>Search</NavLink>
                <NavLink className={`header-navlink ${isOpen ? "open" : ""}`} to={"/plant-care"}>Plant care</NavLink>
                <NavLink className={`header-navlink ${isOpen ? "open" : ""}`} to={"/my-plants"}>My plants</NavLink>
            </div>
            <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>🟰</div>
        </nav>
    );
}
