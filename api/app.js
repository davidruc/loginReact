import  express  from "express";
import { appLogin } from "./router/login.js";
import config from "./utils/config.js";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json())

app.use("/login", appLogin);

const configuration = {
    port: config.portBack,
    host: config.host
}
app.listen(configuration, ()=>{
    console.log(`El servidor está activo: http://${config.host}:${config.portBack}`);
});