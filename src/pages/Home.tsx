import { useContext, useEffect, useState } from "react";
import { months } from "../data/lists";
import "../styles/home.css";
import PlantContext from "../contexts/PlantContext";
import { IPlant } from "../interfaces";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const { allPlants } = useContext(PlantContext);
    const navigate = useNavigate();
    const [randomPlant, setRandomPlant] = useState<IPlant>();
    const monthIndex = new Date().getMonth();

    useEffect(() => {
            const today = new Date();
            const day = today.getDate(); 
            const month = today.getMonth() + 1; 
            const index = (month * 31 + day) % 355;
        if (allPlants.length > 0) {
            setRandomPlant(allPlants[index]);
        }
    }, [allPlants]);


    return (
        <section className="main-content home">
            <section className="hero">
                <div className="logo">
                    <img className='logo-img' src="../logo-lg.png" alt="Logo" />
                    <p className="hero-text">
                        Explore a wide variety of houseplants, discover care
                        tips, and track your personal plant collection - all in
                        one place!
                    </p>
                </div>
            </section>
            <section className="container home-container">
                <article onClick={() => navigate('/plant-care')}>
                    <img src={months[monthIndex].img} />
                    <h3 className="heading-text">{months[monthIndex].month}</h3>
                    <p>
                        Stay on top of your plant care with seasonal tips
                    </p>
                </article>
                <article onClick={() => navigate('/plant-care/water-view')}>
                    <img src="https://images.unsplash.com/photo-1682209267973-20b23747b57b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGxhbnQlMjBjYXJlfGVufDB8fDB8fHwy" />
                    <h3 className="heading-text">Watering routines</h3>
                    <p>
                        Weekly schedule to keep your plants happy
                    </p>
                </article>
                <article onClick={() => navigate(`/details/${randomPlant?.id}`)}>
                    <img src={randomPlant?.image} />
                    <h3 className="heading-text">Discover something new</h3>
                    <p>Get inspired for your next green addition</p>
                </article>
            </section>
        </section>
    );
}
