import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./styles/App.css";
import { PlantContextProvider } from "./contexts/PlantContext";
import Footer from "./components/Footer";

export default function App() {
    return (
        <PlantContextProvider>
            <Header />
            <Outlet />
            <Footer />
        </PlantContextProvider>
    );
}
