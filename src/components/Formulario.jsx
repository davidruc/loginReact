import React from "react";
import { useState, useEffect } from "react";
import ProtoTypes from "prop-types"

export default function Formulary({nombre}) {
    const [nom, setNombre] = useState(nombre);
    const enviar = async () =>{
            let res = await (await fetch("http://127.10.10.11:5005/prueba")).json();
            setNombre(JSON.stringify(res));
    };
    return (
        <>
            <div>Formulary</div>
            <input type="text" value="user name" /><br></br>
            <input type="text" value="password" /><br></br>
            <button onClick={enviar}>Click</button>
            <div id="info">
                {nom}
            </div>
        </>
    )
}

Formulary.prototype={
    nombre: ProtoTypes.string.isRequired
}

Formulary.defaultProps={
    nombre: "aaaa"
}
