import { crearToken } from "../helpers/JWT.js";
import { Router } from "express";
import { loginV1 } from "../controller/login.js";

const appLogin = Router();

appLogin.use(crearToken);
appLogin.post("/", loginV1);

export {appLogin};