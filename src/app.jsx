import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import DashBoardView from "./views/DashBoard";

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeView/>} />
                <Route path="/login/" element={<LoginView/>}>    
                    <Route path="home" element={<DashBoardView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}