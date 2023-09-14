import React from "react";
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function Formulary() {
    const navigate = useNavigate();

    const [showFormulary, setShowFormulary] = useState(true);
    
    const [info, setInfo] = useState({
        user_name: "",
        password: ""
    });

    const home = ()=>{
        navigate("/login/home")
    }

    const handleUsername = (e) =>{
        setInfo({
            ...info,
            user_name : e.target.value
        });
    };

    const handlePassword = (e) => {
        setInfo({
            ...info,
            password : e.target.value
        })
    }
    
    async function gettoken () {
        const res = await fetch("http://127.10.10.11:5005/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
        const response = await res.json()
        return response;
    
    }
    async function enviar(e){
        e.preventDefault();
        const info_res = await gettoken();
        setInfo(info_res);
        if(!info_res.mesaage){
            home();
            setShowFormulary(false);
        }else {
            console.log("alert");
        }
    }
    return (
        <>
            {showFormulary && (
            <div>
                <div>Log In</div>
                <input type="text" name="user" placeholder="ingrese el usuario" onChange={handleUsername} /><br></br>
                <input type="text" name="pass" onChange={handlePassword} placeholder="ingrese la contraseña" /><br></br>
                <div id="info">
                    <button type="submit" onClick={(e)=>{enviar(e); console.log(info);}}>Click</button>
                </div>
            </div>
            )}

            <Outlet context={[info]} />
        </>
    )
}