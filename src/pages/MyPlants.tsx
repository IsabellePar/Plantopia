import { useContext, useRef, useState } from "react";
import { IMyPlant } from "../interfaces";
import "../styles/myPlants.css";
import MyPlantDetails from "../components/MyPlantDetails";
import PlantContext from "../contexts/PlantContext";
import Modal, { ModalProps } from "../components/Modal";
import AddEditForm from "../components/AddEditForm";
import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";
import Add from "../assets/add.svg";

export default function MyPlants() {
    const { myPlants } = useContext(PlantContext);
    const formRef = useRef<HTMLFormElement>(null);
    const [selectedPlant, setSelectedPlant] = useState<IMyPlant>();
    const [modal, setModal] = useState<ModalProps>({
        title: "",
        children: null,
        isOpen: false,
        onClose: () => {},
        onConfirm: () => {},
        btnText: "",
    });

    // Opens AddPlant modal
    const handleAddNew = () => {
        setModal({
            title: "Add new plant",
            children: <AddEditForm isEditing={false} formRef={formRef} />,
            isOpen: true,
            onClose: () => setModal({ ...modal, isOpen: false }),
            onConfirm: addPlant,
            btnText: "Save plant",
        });
    };

    // Triggers submit function in AddPlant, then closes modal
    const addPlant = () => {
        if (formRef.current) {
            if (formRef.current.checkValidity()) {
                formRef.current.requestSubmit();
                setModal({ ...modal, isOpen: false });
            } else {
                formRef.current.reportValidity();
            }
        } 
    };

    if (!myPlants) return;

    return (
        <section className="main-content bg-image">
            <section className="container my-plants">
                <div>
                    <h1 className="heading-text">My plants</h1>
                    <button onClick={handleAddNew}>
                        <img src={Add} alt='Add new'/>
                    </button>
                </div>
                <div className="my-plants-content">
                    <section className="my-plants-list">
                        {myPlants.map((plant, i) => (
                            <article
                                className="my-plant-item"
                                key={i}
                                onClick={() => setSelectedPlant(plant)}
                            >
                                <img src={plant.image} alt={plant.commonName} />
                                <div className="text">
                                    <h3 className="heading-text">{plant.commonName}</h3>
                                    <p>Added {plant.dateAdded}</p>
                                </div>
                            </article>
                        ))}
                    </section>
                    <section className="my-plants-info">
                        {selectedPlant ? (
                            <MyPlantDetails {...selectedPlant} />
                        ) : (
                            <p>Please select a plant to view details</p>
                        )}
                    </section>
                </div>
            </section>
            <Modal {...modal} />
        </section>
    );
}
