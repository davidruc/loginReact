import React from "react";
import { useOutletContext } from "react-router-dom";

export default function DashBoardView(){
    const [info] = useOutletContext();
    console.log("jue", info.user_name);
    // const [info] = "pepito"
        return(
        <div>
            <h1>Hola de vuelta {info.user_name} :D</h1>
        </div>
        )
}