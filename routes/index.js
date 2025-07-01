import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import AppRoutes from "./app.routes";
import Splash from "../pages/Splash";

export default function Routes() {
    const { loading } = useContext(AppContext);

    return loading ? <Splash /> : <AppRoutes />;
}