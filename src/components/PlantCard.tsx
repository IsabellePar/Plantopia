import { useNavigate } from "react-router-dom";
import { IPlant } from "../interfaces";
import "../styles/plantCard.css";

interface IPlantCardProps {
    plant: IPlant;
    isLarge?: boolean;
}

export default function PlantCard({plant, isLarge}: IPlantCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/details/${plant.id}`);
    };

    return (
        <article
            className={`plant-card ${isLarge ? "large" : ""}`}
            onClick={!isLarge ? handleClick : undefined}
        >
            <section className="img-container">
                <img
                    className="card-img"
                    src={plant.image}
                    alt={plant.commonName}
                />
                {!isLarge && (
                    <section className="overlay overlay-text">
                        <p>{plant.commonName}</p>
                        <p className="italic">{plant.latinName}</p>
                        <hr />
                        <p>Family: {plant.family}</p>
                        <p>Origin: {plant.origin}</p>
                        <p>Category: {plant.category}</p>
                    </section>
                )}
            </section>
            <section className="card-text">
                <p className="title-text">{plant.commonName}</p>
            </section>
        </article>
    );
}
