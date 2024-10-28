import { IPlant } from "../interfaces";

// Creates a description text from the objects detail props
export function createDescription(plant: IPlant) {
    const formatList = (list: string[]) => {
        if (list.length < 2) return list.toString();
        return list.slice(0, -1).join(", ") + " and " + list[list.length - 1];
    };

    const otherNames =
        plant.otherNames.length > 0
            ? `, also called ${formatList(plant.otherNames)},`
            : "";
    const appeal = plant.appeal
        ? ` and is mainly known for its unique ${plant.appeal}`
        : "";
    const bloomColor = plant.bloomColor
        ? `${
              plant.leafColor ? ` combined with ` : `With its `
          } ${plant.bloomColor} flowers`
        : "";
    const leafColor = plant.leafColor
        ? `With its ${formatList(plant.leafColor)} leaves ${bloomColor}`
        : "";
    const use = plant.use
        ? `, it is often used for ${formatList(plant.use)} decorations.`
        : ", it adds a colorful touch to any environment.";
    const style = plant.style ? `${plant.style} style and a ` : "";
    const growth = plant.growth ? `${plant.growth} growth habit` : "";
    const height = plant.height
        ? `, reaching a height of ${plant.height} cm`
        : "";
    const width = plant.width
        ? `spreading to a potential width of ${plant.width} cm`
        : "";
    const temp = plant.minTemp && plant.maxTemp ? ` ranging from ${plant.minTemp} C° to ${plant.maxTemp} C°` : plant.minTemp || plant.maxTemp ? ` around ${plant.minTemp || plant.maxTemp} C°` : ' that are similar to this'
    const insects = plant.insects && plant.insects.length > 0
        ? ` insects such as ${formatList(plant.insects)}`
        : "";
    const disease = plant.disease && plant.disease.length > 0
            ? ` diseases like ${formatList(plant.disease)}`
            : "";

    // Description text
    return `${plant.commonName}${otherNames} belongs to the family ${plant.family}${appeal}. ${plant.leafColor ? leafColor : bloomColor}${use} 
    
    The ${plant.commonName} has a ${style}${growth}${
        height && width ? `${height} and ${width}` : height || width}. Native to ${plant.climate} climates, it thrives in temperatures${temp}.
    
    Threats related to these plants are${insects && disease ? `${insects}, as well as ${disease}`
            : insects || disease || " rare"
    }.`;
}
