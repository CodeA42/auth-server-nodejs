import * as dotenv from "dotenv";
dotenv.config({path:'./lib/config/.env'});

import * as express from "express";
const app = express();

import { configExpress } from "./lib/config/express";
configExpress(app);

import router from "./lib/routes";
app.use(router);

import "reflect-metadata";