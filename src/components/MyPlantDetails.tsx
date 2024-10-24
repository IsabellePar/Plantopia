import { useNavigate } from "react-router-dom";
import { IMyPlant, IPlant } from "../interfaces";
import { useContext, useRef, useState } from "react";
import Modal, { ModalProps } from "./Modal";
import PlantContext from "../contexts/PlantContext";
import AddEditForm from "./AddEditForm";
import PlantCard from "./PlantCard";
import "../styles/myPlantDetails.css";
import Drop from "../assets/drop.svg";
import Sun from "../assets/sun.svg";
import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";
import ViewCard from "../assets/viewCard.svg";

export default function MyPlantDetails(myPlant: IMyPlant) {
    const navigate = useNavigate();
    const { myPlants, setMyPlants, allPlants } = useContext(PlantContext);
    const formRef = useRef<HTMLFormElement>(null);
    const [modal, setModal] = useState<ModalProps>({
        title: "",
        children: null,
        isOpen: false,
        onClose: () => {},
        onConfirm: () => {},
        btnText: "",
    });

    // Opens PlantDetails if plant card exists, or search modal if no card saved
    const handleViewPlantCard = () => {
        if (myPlant.id) navigate(`/details/${myPlant.id}`);
        else {
            const possiblePlants: IPlant[] = allPlants
                .filter((plant: IPlant) => {
                    const matchesName =
                        plant.commonName.includes(myPlant.commonName) ||
                        plant.latinName.includes(myPlant.commonName) ||
                        plant.otherNames.some((name) =>
                            name.includes(myPlant.commonName)
                        );
                    const notInMyPlants = !myPlants.some(
                        (myPlant) => myPlant.id === plant.id
                    );
                    return matchesName && notInMyPlants;
                })
                .slice(0, 5);

            setModal({
                title: `No plant card saved for "${myPlant.commonName}"`,
                children: (
                    <>
                        <p>
                            {possiblePlants.length > 0
                                ? "Select one of the suggested plants below, or go to search page"
                                : "Do you want to search for a matching plant?"}
                        </p>
                        {possiblePlants.length > 0 && (
                            <section className="modal-search">
                                {possiblePlants.map((plant: IPlant, i) => (
                                    <PlantCard key={i} plant={plant} />
                                ))}
                            </section>
                        )}
                    </>
                ),
                isOpen: true,
                onClose: () => setModal({ ...modal, isOpen: false }),
                onConfirm: () => navigate("/search"),
                btnText: "Go to search page",
            });
        }
    };

    // Opens delete modal
    const handleDelete = () => {
        setModal({
            title: "Delete plant",
            children: `Are you sure you want to delete ${myPlant.commonName} from My Plants?`,
            isOpen: true,
            onClose: () => setModal({ ...modal, isOpen: false }),
            onConfirm: deletePlant,
            btnText: "Delete",
        });
    };

    // Deletes plant after confirmation in modal, then closes modal
    const deletePlant = () => {
        if (myPlant) {
            setMyPlants(
                myPlants.filter(
                    (plant: IMyPlant) => plant.myId !== myPlant.myId
                )
            );
            setModal({ ...modal, isOpen: false });
        }
    };

    // Opens modal with AddEditForm in edit mode
    const handleEdit = () => {
        setModal({
            title: `Edit "${myPlant.commonName}"`,
            children: (
                <AddEditForm
                    plant={myPlant}
                    isEditing={true}
                    formRef={formRef}
                />
            ),
            isOpen: true,
            onClose: () => setModal({ ...modal, isOpen: false }),
            onConfirm: editPlant,
            btnText: "Save changes",
        });
    };

    // Triggers submit function in AddEditForm, then closes modal
    const editPlant = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
        setModal({ ...modal, isOpen: false });
    };

    const plantExists = myPlants.some(
        (plant: IMyPlant) => plant.myId === myPlant?.myId
    );

    if (!plantExists) {
        return <div>No plant selected.</div>;
    }

    return (
        <>
            <div className="title">
                <h2 className="heading-text">{myPlant.commonName}</h2>
                <p className="date-added">Added {myPlant.dateAdded}</p>
            </div>
            <hr />
            <div className="icons">
                <div>
                    <img className="icon" src={Drop} />
                    <p>{`${myPlant.water || 0} times a week`}</p>
                </div>
                <div>
                    <img className="icon" src={Sun} />
                    <p>{myPlant.minLight} - {myPlant.idealLight || "No information"}</p>
                </div>
            </div>
            <hr />
            <div className="notes">
                <h3 className="heading-text">Notes</h3>
                <p>{myPlant.notes}</p>
            </div>
            <div className="buttons">
                <button className="icon-btn" onClick={handleViewPlantCard}>
                    <img src={ViewCard} alt="View card" />
                </button>
                <button className="icon-btn" onClick={handleEdit}>
                    <img src={Edit} alt="Edit" />
                </button>
                <button className="icon-btn" onClick={handleDelete}>
                    <img src={Delete} alt="Delete" />
                </button>
            </div>
            <Modal {...modal} />
        </>
    );
}
