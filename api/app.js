import  express  from "express";
import { appLogin } from "./router/login.js";
import config from "./utils/config.js";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json())

app.get("/prueba", (req,res)=>{
    res.status(200).json({message: "hello"})
})
app.use("/login", appLogin);
app.listen(config.server, ()=>{
    console.log(`El servidor está activo: http://${config.server.hostname}:${config.server.port}`);
});