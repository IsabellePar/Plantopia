import { IPlant } from "../interfaces";
import { convertToIPlantObject } from "../service/convertToIPlantObject";

// Checks if plant is stored in LS, and if not, fetches details from API to complete plant details
export default async function getPlantDetails(plant: IPlant) {
    const fetchedPlantsLS = localStorage.getItem("fetchedPlants");
    const fetchedPlants = fetchedPlantsLS ? JSON.parse(fetchedPlantsLS) : [];
    const existingPlant: IPlant = fetchedPlants.find(
        (p: IPlant) => p.id === plant.id
    );

    try {
        if (existingPlant) {
            return existingPlant;
        } else {
            const url = `https://house-plants2.p.rapidapi.com/id/${plant.id}`;
            const options = {
                method: "GET",
                headers: {
                    "x-rapidapi-key": import.meta.env.VITE_API_KEY || '',
                    "x-rapidapi-host": "house-plants2.p.rapidapi.com",
                },
            };
            const response = await fetch(url, options);
            const result = await response.json();
            if (result) {
                const plantDetails: IPlant = convertToIPlantObject(
                    plant,
                    result
                );
                fetchedPlants.push(plantDetails);
                localStorage.setItem(
                    "fetchedPlants",
                    JSON.stringify(fetchedPlants)
                );
                return plantDetails;
            }
        }
    } catch (error) {
        console.error(error);
    }
}
