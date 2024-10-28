import { useContext, useEffect, useRef, useState } from "react";
import getPlantDetails from "../service/getPlantDetails";
import { useParams } from "react-router-dom";
import { IMyPlant, IPlant } from "../interfaces";
import "../styles/plantDetails.css";
import { createDescription } from "../service/createDescription";
import PlantCard from "../components/PlantCard";
import Drop from "../assets/drop.svg";
import Sun from "../assets/sun.svg";
import Scissors from "../assets/scissors.svg";
import Loading from "../components/Loading";
import Modal, { ModalProps } from "../components/Modal";
import { nanoid } from "nanoid";
import { getWateringFrequency } from "../service/calculateWaterAndLight";
import PlantContext from "../contexts/PlantContext";

export default function PlantDetails() {
    const { id } = useParams();
    const { myPlants, setMyPlants, allPlants } = useContext(PlantContext);
    const selectedMyPlantRef = useRef<HTMLSelectElement>(null);
    const [details, setDetails] = useState<IPlant>();
    const [loading, setLoading] = useState<boolean>(false);
    const [highlight, setHighlight] = useState(false);
    const [modal, setModal] = useState<ModalProps>({
        title: "",
        children: null,
        isOpen: false,
        onClose: () => {},
        onConfirm: () => {},
        btnText: "",
    });
    const plant = allPlants.find((plant: IPlant) => plant.id === id);
    const isMyPlant = myPlants.some((myPlant) => myPlant.id === id);
    const availableMyPlants = myPlants.filter((plant) => !plant.id);

    // Fetches data from LS or API
    useEffect(() => {
        if (!plant) return;
        const getData = async () => {
            setLoading(true);
            try {
                const data = await getPlantDetails(plant);
                if (data) setDetails(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [plant]);

    // Formats the description text
    const description = details && createDescription(details);

    setTimeout(() => {
        setHighlight(false);
    }, 1000);
    
    // Adds current plant to MyPlants, then closes modal
    const addPlant = () => {
        if (!details) return;
        const selectedPlantId = selectedMyPlantRef.current?.value;
        const myPlantToUpdate = myPlants.find(
            (myPlant) => myPlant.myId === selectedMyPlantRef.current?.value
        );
        const plantData: IMyPlant = {
            id: details.id,
            myId: myPlantToUpdate?.myId || nanoid(7), 
            commonName: myPlantToUpdate?.commonName || details.commonName,
            water: myPlantToUpdate?.water ? myPlantToUpdate.water : details.water ? getWateringFrequency(details?.water) : 0,
            minLight: myPlantToUpdate?.minLight || details.minLight || "",
            idealLight: myPlantToUpdate?.idealLight || details.idealLight || "",
            notes: myPlantToUpdate?.notes || "",
            dateAdded: myPlantToUpdate?.dateAdded || new Date().toISOString().split("T")[0],
            image: details.image,
        };
        if (myPlantToUpdate) {
            setMyPlants(
                myPlants.map((plant) =>
                    plant.myId === selectedPlantId ? plantData : plant
                )
            );
        } else {
            setMyPlants([...myPlants, plantData]);
        }
        setModal({ ...modal, isOpen: false }); 
        setHighlight(true);
    };

    // Removes plant from My Plants, then closes modal
    const removePlant = () => {
        setMyPlants(myPlants.filter((plant) => plant.id !== id));
        setModal({ ...modal, isOpen: false });
    };

    // Opens modal to add or remove plant from My Plants
    const toggleAddRemove = () => {
        if (!details) return;
        setModal({
            title: `${isMyPlant ? 'Remove from' : 'Add to'} My Plants`,
            children: (
                <>
                    Do you want to {isMyPlant ? 'remove' : 'add'} {details.commonName} {isMyPlant ? 'from' : 'to'} My Plants?
                    {!isMyPlant && availableMyPlants.length > 0 && (
                        <div>
                            <p>Add as... </p>
                            <select
                                ref={selectedMyPlantRef}
                                name="selectedMyPlant"
                            >
                                <option value="">New plant</option>
                                {availableMyPlants.map((plant, i) => (
                                    <option key={i} value={plant.myId}>
                                        {plant.commonName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </>
            ),
            isOpen: true,
            onClose: () => setModal({ ...modal, isOpen: false }),
            onConfirm: isMyPlant ? removePlant : addPlant,
            btnText: isMyPlant ? 'Remove' : 'Add',
        });
    };

    

    return (
        <section className="main-content bg-image">
            <section className="container plant-details">
                {loading ? <Loading /> :
                details ? (
                    <>
                        <PlantCard plant={details} isLarge={true} />
                        <article className="details-content">
                            <div>
                                <h2 className="heading-text">{details.commonName}</h2>
                                <p className="italic">{details.latinName}</p>
                            </div>
                            <hr />
                            <div className="details-tags">
                                <p><b>Category:</b>{'\n'}{details.category || "Unknown"}</p>
                                <p><b>Origin:</b>{'\n'}{details.origin || "Unknown"}</p>
                                <p><b>Blooming:</b>{'\n'}{details.bloomingSeason || "Unknown"}</p>
                            </div>
                            <div className="details-description">
                                <h3 className="heading-text">Description</h3>
                                <p>{description}</p>
                            </div>
                            <hr />
                            <h3 className="heading-text">Plant care</h3>
                            <section className="details-care">
                                <div>
                                    <img src={Sun} alt="Sun icon" />
                                    <p>
                                        Prefers {details.idealLight}.{"\n"}
                                        Tolerates {details.minLight}.
                                    </p>
                                </div>
                                <div>
                                    <img src={Drop} alt="Water icon" />
                                    <p>
                                        {details.water?.replace(". ", ".\n")}.
                                    </p>
                                </div>
                                <div>
                                    <img src={Scissors} alt="Scissors icon" />
                                    <p>Pruning: {details.pruning}</p>
                                </div>
                            </section>
                            <button onClick={toggleAddRemove}>
                                {isMyPlant
                                    ? "Remove from My Plants"
                                    : "Add to My Plants"}
                            </button>
                        </article>
                    </>
                ) : (
                    <p>No details available</p>
                )}
            </section>
            <Modal {...modal} />
        </section>
    );
}
