import { NavLink, Outlet } from "react-router-dom";
import "../styles/plantCare.css";

export default function Dashboard() {
    
    return (
        <section className="main-content bg-image">
            <section className="container dashboard">
                <nav className="dashboard-tabs">
                    <NavLink to="calendar-view">Calendar</NavLink>
                    <NavLink to="water-view">Watering</NavLink>
                    <NavLink to="light-view">Light needs</NavLink>
                </nav>
                <article className="tab-content">
                    <Outlet />
                </article>
            </section>
        </section>
    );
}
