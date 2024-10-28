import { createContext, ReactNode, useEffect, useState } from "react";
import { IMyPlant, IPlant } from "../interfaces";
import plantData from "../data/data.json";
import { convertToIPlantObject } from "../service/convertToIPlantObject";

interface AllPlantsType {
    allPlants: IPlant[],
    setAllPlants: (plants: IPlant[]) => void,
    myPlants: IMyPlant[],
    setMyPlants: (myPlants: IMyPlant[]) => void,
}

const defaultValue: AllPlantsType = {
    allPlants: [],
    setAllPlants: () => [],
    myPlants: [],
    setMyPlants: () => []
};

const PlantContext = createContext<AllPlantsType>(defaultValue);

interface PlantProviderProps {
    children: ReactNode;
}

export function PlantContextProvider({ children }: PlantProviderProps) {
    const [allPlants, setAllPlants] = useState<IPlant[]>([]);
    const storedMyPlants = localStorage.getItem('myPlants');
    const [myPlants, setMyPlants] = useState<IMyPlant[]>(storedMyPlants ? JSON.parse(storedMyPlants) : []);

    // Gets all plants from data.json and converts them to IPlant before saving to context
    useEffect(() => {
        const plants: IPlant[] = plantData.map((p: any) => {
            return convertToIPlantObject(p);
        });
        setAllPlants(plants);
    }, []);
    
    // Saves MyPlants to LS upon update
    useEffect(() => {
        localStorage.setItem("myPlants", JSON.stringify(myPlants));
    }, [myPlants]);

    return (
        <PlantContext.Provider value={{ allPlants, setAllPlants, myPlants, setMyPlants }}>
            {children}
        </PlantContext.Provider>
    );
}

export default PlantContext;
