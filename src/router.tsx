import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MyPlants from "./pages/MyPlants";
import PlantDetails from "./pages/PlantDetails";
import NotFound from "./pages/NotFound";
import CalendarView from "./pages/CalendarView";
import WaterView from "./pages/WaterView";
import LightView from "./pages/LightView";
import PlantCare from "./pages/PlantCare";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="plant-care" element={<PlantCare />}>
                <Route index element={<Navigate to="calendar-view" />} />
                <Route path="calendar-view" element={<CalendarView />} />
                <Route path="water-view" element={<WaterView />} />
                <Route path="light-view" element={<LightView />} />
            </Route>
            <Route path="my-plants" element={<MyPlants />} />
            <Route path="details/:id" element={<PlantDetails />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);
