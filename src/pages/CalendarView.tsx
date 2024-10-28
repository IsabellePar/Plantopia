import { useContext, useEffect, useState } from "react";
import { months } from "../data/lists";
import Left from "../assets/left.svg";
import Right from "../assets/right.svg";
import PlantContext from "../contexts/PlantContext";
import { getLightIndexes } from "../service/calculateWaterAndLight";

export default function CalendarView() {
    const [currentMonth, setCurrentMonth] = useState(months[0]);
    const currentIndex = months.indexOf(currentMonth);
    const { myPlants } = useContext(PlantContext);

    useEffect(() => {
        const monthIndex = new Date().getMonth();
        setCurrentMonth(months[monthIndex]);
    }, []);

    const handlePrevMonth = () => {
        setCurrentMonth(months[currentIndex === 0 ? 11 : currentIndex - 1]);
    };

    const handleNextMonth = () => {
        setCurrentMonth(months[currentIndex === 11 ? 0 : currentIndex + 1]);
    };

    const getExtraCarePlants = () => {
        const highNeedsMonths = [0, 1, 2, 3, 8, 9, 10, 11];
        const mediumNeedsMonths = [0, 1, 10, 11];
        const lowNeedsMonths = [4, 5, 6, 7];

        const filterPlantsByLightNeeds = (min: number, max: number) =>
            myPlants.filter((plant) => {
                const { minIndex, maxIndex } = getLightIndexes(plant);
                return minIndex >= min && maxIndex === max;
            });
        if (highNeedsMonths.includes(currentIndex))
            return filterPlantsByLightNeeds(2, 2);
        if (lowNeedsMonths.includes(currentIndex))
            return filterPlantsByLightNeeds(0, 1);
        if (mediumNeedsMonths.includes(currentIndex))
            return filterPlantsByLightNeeds(1, 2);
        return [];
    };

    const extraCarePlants = getExtraCarePlants();

    if (!currentMonth) return;

    return (
        <article className="calendar">
            <div className="month-header">
                <button className="icon-btn arrow" onClick={handlePrevMonth}>
                    <img src={Left} alt="Left" />
                </button>
                <h2 className="heading-text">{currentMonth.month}</h2>
                <button className="icon-btn arrow" onClick={handleNextMonth}>
                    <img src={Right} alt="Right" />
                </button>
            </div>
            <hr />
            <div className="month-content">
                    <img className="month-image" src={currentMonth.img} />
                <div className="month-text">
                    <h3 className="title-text">Light & water needs</h3>
                    <p>
                        {currentMonth.light} {currentMonth.water}
                    </p>
                    <p>{currentMonth.additional}</p>
                    <p></p>
                    <h3 className="title-text">
                        Plants to take extra care of during {currentMonth.month}
                    </h3>
                    {extraCarePlants.length > 0 ? (
                        extraCarePlants.map((plant, i) => (
                            <p key={i}>{plant.commonName}</p>
                        ))
                    ) : (
                        <p>
                            All your plants are thriving at the moment - enjoy
                            their vibrant growth!
                        </p>
                    )}
                </div>
            </div>
        </article>
    );
}
