import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";

export function Default() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}