import { useContext } from "react";
import PlantContext from "../contexts/PlantContext";
import { lightOptions } from "../data/lists";
import { getLightIndexes } from "../service/calculateWaterAndLight";

export default function LightView() {
    const { myPlants } = useContext(PlantContext);

    return (
        <>
            <h2 className="heading-text">Light needs</h2>
            <hr/>
            <p className="dashboard-text">
                Each plant has its own light preferences, and understanding them
                is essential for healthy growth. Warmer temperatures often mean
                your plants need more light, while cooler conditions may require
                less. Find out what kind of light each plant prefers to give
                them the perfect spot to grow.
            </p>
            <section className="light-table">
                <div className="row header-row">
                    <h3 className="heading-text">Plant</h3>
                    {lightOptions.map((op, i) => (
                        <h3 className="heading-text" key={i}>
                            {op}
                        </h3>
                    ))}
                    <h3 className="heading-text">Other</h3>
                </div>
                {myPlants.map((plant, i) => {
                    const { minIndex, maxIndex } = getLightIndexes(plant);

                    return (
                        <div key={i} className="row">
                            <p className="title-text">{plant.commonName}</p>

                            {minIndex >= 0 && maxIndex >= 0 && (
                                <div
                                    className="light-gradient"
                                    style={{
                                        gridColumnStart: minIndex + 2,
                                        gridColumnEnd: maxIndex + 3,
                                    }}
                                ></div>
                            )}

                            <div
                                className="light-other"
                                style={{ gridColumn: 5 }}
                            >
                                {!plant.minLight && !plant.idealLight ? (
                                    <p>No information</p>
                                ) : (
                                    <>
                                        {maxIndex < 0 && (
                                            <p>
                                                {plant.idealLight ||
                                                    plant.minLight}
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </section>
        </>
    );
}
