import { useState } from "react"

export default function Menu() {
    const [isOpen, setIsOpen] =useState(false);

    return (
        <nav className="menu">
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '✖️' : '🟰'} 
        </div>
        <ul className={`menu-items ${isOpen ? 'open' : ''}`}>
            {/* <li><a href="/search">Search</a></li>
            <li><a href="/my-plants">My Plants</a></li>
            <li><a href="/plant-care">Plant Care</a></li> */}
        </ul>
    </nav>
    )
}