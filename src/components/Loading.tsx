import "../styles/loading.css";
import Leaf from "../assets/leaf.svg";

export default function Loading() {
    return (
        <section className="loading">
            <p>Loading...</p>
            <img className="loading-leaf" src={Leaf} />
        </section>
    );
}
