import { SignJWT, jwtVerify } from "jose";
import { connect } from "../db/connection.js";
import { ObjectId } from "mongodb";
import config from "../utils/config.js";
 
export const crearToken = async(req, res, next)=>{
    const  conexionDB = await connect(); 
    const result = await conexionDB.collection('users').findOne(req.body);
    if (JSON.stringify(Object.keys(req.body)) !== JSON.stringify(['user_name', 'password'])) return res.status(417).send({message: "el valor que debes suministrar para el inicio de la sesión debe ser el user_name y la clave."})
    if (!result) return res.status(401).send({mesaage: "session no encontrada"});
    const encoder = new TextEncoder();
    const id = result._id.toString();
    const jwtConstructor = await new SignJWT({ id: id})
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('3h')
        .sign(encoder.encode(config.key));
    req.data = {status: 200, message: jwtConstructor, usuario: result.nombre };
    next(); 
} 

export const validarToken = async (req, token) => {
    try {
        const  conexionDB = await connect(); 
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            token,
            encoder.encode(config.key)
        );
        let res = await conexionDB.collection('users').findOne(
            {
                _id: new ObjectId(jwtData.payload.id), 
                [`permisos.${req.baseUrl}`]: `${req.headers["accept-version"]}`
            }
        );
        const error = {message: "no tienes acceso a este método"}
        if(!res.permisos[req.baseUrl].includes(req.method)) return error; 
        let {_id, permisos, ...session} = res;
        return session;
    } catch (error) { 
        return false;
    }
}