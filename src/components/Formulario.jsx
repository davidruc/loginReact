import React from "react";
import { useState } from "react";
import PropTypes from "prop-types"
import { useNavigate, Outlet, useOutletContext } from "react-router-dom";

export default function Formulary() {
    const navigate = useNavigate();
    const outletContext = useOutletContext();

    const home = ()=>{
        navigate("/login/home")
    }

    const [info, setInfo] = useState({
        user_name: "",
        password: ""
    });

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
        // const user_name = document.querySelector("[name='user']").value;
        // const password = document.querySelector("[name='pass']").value;
        const res = await fetch("http://127.10.10.11:5005/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })

        const response = await res.json()

        console.log(response);
        return response;
    
    }
    async function enviar(e){
        e.preventDefault();
        
        console.log(info);
        const info_res = await gettoken();
        setInfo(info_res);
        <Outlet context={[info]}/>
        if(!info_res.mesaage){
            home()
        }else {
            console.log("alert");
        }
        

    }
    return (
        <>
            <div>Log In</div>
            <input type="text" name="user" placeholder="ingrese el usuario" onChange={handleUsername} /><br></br>
            <input type="text" name="pass" onChange={handlePassword} placeholder="ingrese la contraseña" /><br></br>
            <div id="info">
                <button type="submit" onClick={(e)=>{enviar(e); console.log(info);}}>Click</button>
            </div>
            <Outlet context={[info]} />

        </>
    )
}
// Formulary.propTypes = {
//     datos: PropTypes.string.isRequired
//   };