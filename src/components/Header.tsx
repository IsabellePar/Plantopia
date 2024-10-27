import { NavLink } from "react-router-dom";
import "../styles/header.css";
import Logo from "../assets/logo-sm.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="header">
            <NavLink className="logo" to={"/"}>
                <img src={Logo} alt="Logo" />
            </NavLink>
            <div className={`menu ${isOpen ? "open" : ""}`}>
                <NavLink
                    className={`header-navlink ${isOpen ? "open" : ""}`}
                    to={"/search"}
                    onClick={() => setIsOpen(false)}
                >
                    Search
                </NavLink>
                <NavLink
                    className={`header-navlink ${isOpen ? "open" : ""}`}
                    to={"/plant-care"}
                    onClick={() => setIsOpen(false)}
                >
                    Plant care
                </NavLink>
                <NavLink
                    className={`header-navlink ${isOpen ? "open" : ""}`}
                    to={"/my-plants"}
                    onClick={() => setIsOpen(false)}
                >
                    My plants
                </NavLink>
            </div>
            <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faBars} size="lg" style={{ color: "#fcfcec" }} />
            </div>
        </nav>
    );
}
