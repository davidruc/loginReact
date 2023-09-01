import React from "react";
import { useState } from "react";
import ProtoTypes from "prop-types"


export default function Formulary() {
    const [info, setInfo] = useState(null);
        async function gettoken () {
            const user_name = document.querySelector("[name='user']").value;
            const password = document.querySelector("[name='pass']").value;
            const response = await fetch("http://127.10.10.11:5005/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_name, password })
            });
            const pasrs = await response.json()
            setInfo(pasrs)          
        }
    return (
        <>
            <div>Log In</div>
            <input type="text" name="user" placeholder="ingrese el usuario" /><br></br>
            <input type="text" name="pass" placeholder="ingrese la contraseña" /><br></br>
            <div id="info">
                { info ? 
                    (!info.user_name ? 
                        info.mesaage : 
                        `Bienvenido ${info.user_name}!`) 
                        : 'Ingresar' }
                <button onClick={ gettoken }>Click</button>
            </div>
        </>
    )
}

Formulary.prototype = {
    datos: ProtoTypes.string.isRequired
}
