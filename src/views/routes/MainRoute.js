import React from "react";
import {Outlet} from "react-router-dom";
import DefaultHeader from "../components/header/DefaultHeader";
import ProtectedRoute from "./ProtectedRoute";

const MainRoute = () => {
    return (
        <ProtectedRoute>
            <div className="mainPage">
                <DefaultHeader/>
                <Outlet/>
            </div>
        </ProtectedRoute>
    );
};

export default MainRoute;
