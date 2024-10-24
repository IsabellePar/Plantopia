import React, { useContext, useEffect, useRef, useState } from "react";
import { IPlant } from "../interfaces";
import PlantCardContainer from "../components/PlantCardContainer";
import PlantContext from "../contexts/PlantContext";
import { categories, families, origins } from "../data/lists";
import "../styles/search.css";
import Clear from '../assets/clear.svg';


export default function Search() {
    const { allPlants } = useContext(PlantContext);
    const [filteredPlants, setFilteredPlants] = useState<IPlant[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedFamily, setSelectedFamily] = useState<string>("");
    const [selectedOrigin, setSelectedOrigin] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Runs filterPlants function when selected filters changes
    useEffect(() => {
        filterPlants();
    }, [allPlants, selectedCategory, selectedFamily, selectedOrigin]);

    // Runs filterPlants function on input submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        filterPlants();
    };

    // Filters result based on input and selected filter
    const filterPlants = () => {
        const input = inputRef.current?.value.toLowerCase() || "";
        let filtered: IPlant[] = allPlants;
        filtered = filtered.filter((plant) => {
            const matchesInput = input
                ? plant.commonName?.toLowerCase().includes(input) ||
                  plant.latinName?.toLowerCase().includes(input) ||
                  plant.otherNames?.some((name) =>
                      name.toLowerCase().includes(input)
                  ) ||
                  plant.category?.toLowerCase().includes(input) ||
                  plant.family?.toLowerCase().includes(input) ||
                  plant.origin?.some((origin) =>
                      origin.toLowerCase().includes(input)
                  )
                : true;
            const matchesCategory = selectedCategory
                ? plant.category === selectedCategory
                : true;
            const matchesFamily = selectedFamily
                ? plant.family === selectedFamily
                : true;
            const matchesOrigin = selectedOrigin
                ? plant.origin.some((origin) => origin === selectedOrigin)
                : true;
            return (
                matchesInput &&
                matchesCategory &&
                matchesFamily &&
                matchesOrigin
            );
        });
        setFilteredPlants(filtered);
    };

    // Clears all filters
    const clearFilters = () => {
        setSelectedCategory("");
        setSelectedFamily("");
        setSelectedOrigin("");
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <section className="main-content search">
            <section className="search">
                <form
                    className="form-content bg-image"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <input
                        ref={inputRef}
                        className="search-input"
                        placeholder="Search for plant name, category, family or origin"
                    />
                    <div className="search-filters">
                        <select
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                        >
                            <option value="">Category</option>
                            {categories.map((cat, i) => (
                                <option value={cat} key={i}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedFamily}
                            onChange={(e) => setSelectedFamily(e.target.value)}
                        >
                            <option value="">Family</option>
                            {families.map((family, i) => (
                                <option value={family} key={i}>
                                    {family}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedOrigin}
                            onChange={(e) => setSelectedOrigin(e.target.value)}
                        >
                            <option value="">Origin</option>
                            {origins.map((origin, i) => (
                                <option value={origin} key={i}>
                                    {origin}
                                </option>
                            ))}
                        </select>
                        <button className="icon-btn" type='button' onClick={clearFilters}>
                            <img src={Clear} alt='Clear'/>
                        </button>
                    </div>
                </form>

                <PlantCardContainer plantList={filteredPlants} />
            </section>
        </section>
    );
}
