import { IPlant } from "../interfaces";
import PlantCard from "./PlantCard";
import "../styles/plantCardContainer.css";

export default function PlantCardContainer({plantList}: { plantList: IPlant[];}) {
    return (
        <section className="search-result">
            <p className="search-text title-text">{plantList.length} results found</p>
            <section className="container card-container">
                {plantList.map((plant, i) => (
                    <PlantCard key={i} plant={plant} />
                ))}
            </section>
        </section>
    );
}
