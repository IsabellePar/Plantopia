import { NavLink } from "react-router-dom";
import "../styles/header.css";
import Logo from "../assets/logo-sm.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from "react";
import PlantContext from "../contexts/PlantContext";

export default function Header() {
    const { myPlants } = useContext(PlantContext);
    const [isOpen, setIsOpen] = useState(false);
    const [highlight, setHighlight] = useState<boolean>(false);

    useEffect(() => {
        setHighlight(true);
        const timer = setTimeout(() => setHighlight(false), 1500); 
        return () => clearTimeout(timer);
    }, [myPlants]);

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
                    className={`header-navlink ${isOpen ? "open" : ""} ${highlight ? 'highlight' : ''}`}
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
