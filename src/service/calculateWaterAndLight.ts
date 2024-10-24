import { lightOptions } from "../data/lists";
import { IMyPlant } from "../interfaces";

// Calculates watering frequency
export function getWateringFrequency(water: string): number {
    const waterArr = water?.split(/[&.]+/).map((desc) => desc.trim()) || water;
    const wateringMap: { [key: string]: number } = {
        "water only when dry": 0.5,
        "must dry between watering": 0.5,
        "can dry between watering": 1.5,
        "water when soil is half dry": 2.5,
        "keep moist between watering": 3.5,
        "must not dry between watering": 4.5,
    };
    const water1 = wateringMap[waterArr[0]?.toLowerCase()] || 0;
    const water2 = wateringMap[waterArr[1]?.toLowerCase()] || 0;
    const averageWatering = (water1 + water2) / 2;

    return Math.floor(averageWatering);
};

export const getLightIndexes = (plant: IMyPlant) => {
    const minIndex = lightOptions.indexOf(
        plant.minLight?.toLowerCase() || plant.idealLight?.toLowerCase()
    );
    const maxIndex = lightOptions.indexOf(
        plant.idealLight?.toLowerCase() || plant.minLight?.toLowerCase()
    );
    return { minIndex, maxIndex };
};

