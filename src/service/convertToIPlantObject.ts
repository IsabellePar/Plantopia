export function convertToIPlantObject(p: any, details?: any) {
    //Ensures all names are arrays
    const toArray = (names: any) => {
        if (Array.isArray(names)) return names;
        if (names) return names.split(",").map((name: string) => name.trim());
        return [];
    };

    // Sets commonName to ensure there is only one, and moves the rest to otherNames
    const commonNames = toArray(p["Common name"]);
    const additionalNames = commonNames.slice(1);
    const otherNames = [...toArray(p["Other names"]), ...additionalNames];
    const commonName = commonNames[0] || otherNames.shift() || p["Latin name"];
    const origin = toArray(p["Origin"]);

    // Formats name
    const formatName = (name: string) => {
        return name
            .replace(/\(/g, "")
            .replace(/\)/g, "")
            .split(" ")
            .map((part) => part[0].toUpperCase() + part.slice(1))
            .join(" ");
    };

    // Returns an IPlant object
    if (!details) return {
        id: p.id,
        commonName: formatName(commonName),
        latinName: formatName(p["Latin name"]),
        otherNames: otherNames.map((name) => formatName(name)),
        category: p["Categories"],
        family: p["Family"],
        image: p["Img"],
        origin: origin,
    };

    return {
        ...p,
        appeal: details["Appeal"]?.toLowerCase(),
        use: details["Use"].map((use: string) => use.toLowerCase()),
        leafColor: details["Color of leaf"].map((color: string) => color.toLowerCase()),
        bloomColor: details["Color of blooms"]?.toLowerCase().replace("&", "and"),
        bloomingSeason: details["Blooming season"]?.toLowerCase(),
        style: details["Style"]?.toLowerCase(),
        growth: details["Growth"]?.toLowerCase(),
        height: details["Height potential"]?.["CM"] || "",
        width: details["Width potential"]?.["CM"] || "",
        climate: details["Climat"]?.toLowerCase(),
        minTemp: details["Temperature min"]?.["C"] || null,
        maxTemp: details["Temperature max"]?.["C"] || null,
        insects: details["Insects"]?.map((ins: string) => ins.toLowerCase()).filter((ins: string) => ins !== "n/a"),
        disease: details["Disease"]?.split(/\s*[&,]\s*/).map((dis: string) => dis.toLowerCase().trim()).filter((dis: string) => dis !== 'n/a'),
        minLight: details["Light tolered"]?.replace(/\s*\(.*?\)\s*/g, "").trim().toLowerCase(),
        idealLight: details["Light ideal"]?.replace(/\s*\(.*?\)\s*/g, "").trim().toLowerCase(),
        water: details["Watering"]?.replace(" &", "."),
        pruning: details["Pruning"],
    }
}
