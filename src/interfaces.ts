export interface IPlant {
    id: string;
    commonName: string;
    latinName: string;
    otherNames: string[];
    category: string;
    family: string;
    origin: string[];
    image: string;
    appeal?: string;
    use?: string[];
    leafColor?: string[];
    bloomColor?: string;
    bloomingSeason?: string;
    style?: string;
    growth?: string;
    height?: string;
    width?: string;
    climate?: string;
    minTemp?: string;
    maxTemp?: string;
    disease?: string[];
    insects?: string[];
    minLight?: string;
    idealLight?: string;
    water?: string;
    pruning?: string;
}

export interface IMyPlant {
    id?: string;
    myId: string;
    commonName: string;
    dateAdded: string;
    water: number;
    minLight: string;
    idealLight: string;
    notes: string;
    image: string;
}