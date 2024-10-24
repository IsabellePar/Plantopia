import "../styles/addEditForm.css";
import { IMyPlant } from "../interfaces";
import { useContext, useState } from "react";
import defaultPlantImg from "../assets/defaultPlant.jpg";
import PlantContext from "../contexts/PlantContext";
import { nanoid } from "nanoid";
import { lightOptions } from "../data/lists";

export default function AddEditForm({ plant, isEditing, formRef }: { plant?: IMyPlant; isEditing: boolean; formRef?: React.ForwardedRef<HTMLFormElement> }) {
    const { myPlants, setMyPlants } = useContext(PlantContext);

    // Sets pre-filled form data
    const [formInput, setFormInput] = useState<IMyPlant>({
        id: plant?.id || "",
        myId: plant?.myId || nanoid(7),
        commonName: plant?.commonName || "",
        water: plant?.water || 0,
        minLight: plant?.minLight || "",
        idealLight: plant?.idealLight || "",
        notes: plant?.notes || "",
        dateAdded: plant?.dateAdded || new Date().toISOString().split("T")[0],
        image: plant?.image || defaultPlantImg,
    });

    // Saves form input in state
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        const inputValue = e.target.type === "number" ? +value : value;
        setFormInput((prev) => ({ ...prev, [name]: inputValue }));
    };

    // Saves changes to context / localStorage
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const myPlant = { ...formInput };
        if (isEditing) {
            setMyPlants(
                myPlants.map((plant: IMyPlant) =>
                    plant.myId === myPlant.myId ? myPlant : plant
                )
            );
        } else {
            setMyPlants([...myPlants, myPlant]);
        }
    };

    if (!formInput) return;

    return (
        <form ref={formRef} className="form-content modal" onSubmit={handleSubmit}>
            <div>
                <div>
                    <label className="name-input">
                        <h5>Plant name</h5>
                        <input
                            name="commonName"
                            value={formInput.commonName}
                            placeholder="Plant name"
                            onChange={handleChange}
                            required
                            disabled={isEditing}
                        />
                    </label>
                    <label className="date-input">
                        <h5>Date added</h5>
                        <input
                            name="dateAdded"
                            value={formInput.dateAdded}
                            type="date"
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label className="min-light-input">
                        <h5>Minimum light</h5>
                        <select
                            name="minLight"
                            value={formInput.minLight}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select
                            </option>
                            {lightOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="ideal-light-input">
                        <h5>Ideal light</h5>
                        <select
                            name="idealLight"
                            value={formInput.idealLight}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select
                            </option>
                            {lightOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <label className="water-input">
                    <h5>Watering</h5>
                    <div>
                        <input
                            name="water"
                            type="number"
                            value={formInput.water}
                            onChange={handleChange}
                            min="0"
                        />
                        <p>times per week</p>
                    </div>
                </label>
            </div>
            <div>
                <label className="notes-input">
                    <h5>Notes</h5>
                    <textarea
                        name="notes"
                        value={formInput.notes}
                        placeholder="Add your own notes here"
                        onChange={handleChange}
                    />
                </label>
            </div>
        </form>
    );
}
