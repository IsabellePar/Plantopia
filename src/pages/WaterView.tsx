import { useContext } from "react";
import PlantContext from "../contexts/PlantContext";

export default function WaterView() {
    const { myPlants } = useContext(PlantContext);

    const monday = myPlants;
    const tuesday = myPlants.filter((plant) => plant.water > 6);
    const wednesday = myPlants.filter(
        (plant) => plant.water > 2 && plant.water < 8
    );
    const thursday = myPlants.filter(
        (plant) => plant.water > 4 && plant.water < 8
    );
    const friday = myPlants.filter(
        (plant) => plant.water > 1 && plant.water < 8 && plant.water !== 5
    );
    const saturday = myPlants.filter(
        (plant) => plant.water > 3 && plant.water < 8
    );
    const sunday = myPlants.filter(
        (plant) => plant.water > 4 && plant.water < 8
    );

    return (
        <>
            <h2 className="heading-text">Watering</h2>
            <hr/>
            <p className="dashboard-text">
                Water is key to keeping your plants healthy, helping them soak
                up nutrients and grow strong. Remember, their watering needs
                varies with the seasons, temperature, and light. Be sure to
                adjust their care routine if they start needing more or less
                water as time goes on.
            </p>
            <section className="water-table">
                <div>
                    <h3 className="header-row heading-text">Mon</h3>
                    {monday.map((plant, i) => (
                        <p className="title-text" key={i}>
                            {plant.commonName}
                        </p>
                    ))}
                </div>
                <div>
                    <h3 className="header-row heading-text">Tue</h3>
                    {tuesday.map((plant, i) => (
                        <p className="title-text" key={i}>
                            {plant.commonName}
                        </p>
                    ))}
                </div>
                <div>
                    <h3 className="header-row heading-text">Wed</h3>
                    {wednesday.map((plant, i) => (
                        <p className="title-text" key={i}>
                            {plant.commonName}
                        </p>
                    ))}
                </div>
                <div>
                    <h3 className="header-row heading-text">Thu</h3>
                    {thursday.map((plant, i) => (
                        <p className="title-text" key={i}>
                            {plant.commonName}
                        </p>
                    ))}
                </div>
                <div>
                    <h3 className="header-row heading-text">Fri</h3>
                    {friday.map((plant, i) => (
                        <p className="title-text" key={i}>
                            {plant.commonName}
                        </p>
                    ))}
                </div>
                <div>
                    <h3 className="header-row heading-text">Sat</h3>
                    {saturday.map((plant, i) => (
                        <p className="title-text" key={i}>
                            {plant.commonName}
                        </p>
                    ))}
                </div>
                <div>
                    <h3 className="header-row heading-text">Sun</h3>
                    {sunday.map((plant, i) => (
                        <p className="title-text" key={i}>
                            {plant.commonName}
                        </p>
                    ))}
                </div>
            </section>
        </>
    );
}
