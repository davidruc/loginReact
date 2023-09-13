import { crearToken } from "../helpers/JWT.js";
import { Router } from "express";
import { loginV1 } from "../controller/login.js";
import session from "express-session";

const appLogin = Router();

appLogin.use(session({secret:'mi-secreto', resave: false,saveUninitialized: true}));
appLogin.use(crearToken);
appLogin.post("/", loginV1);

export {appLogin};