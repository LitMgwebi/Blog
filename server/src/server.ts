import { connect } from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
require('dotenv').config();

//* Directory Imports
import log from "./config/logging";
import indexRouter from "./Controllers/indexController";
import blogRouter from "./Controllers/blogController";
import userRouter from "./Controllers/userController";

//* Server setup
const port: any = process.env.PORT;
const host: string = process.env.HOST;
const dbURL: string = process.env.DBURL;

const server = express();
server.use(express.json());
server.use(cors());
server.use(express.static(__dirname + "/public"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//* Database Setup
connect(dbURL)
     .then(() => {
          log.info(`Connected to Database`);
          server.listen(port, host, () => {
               log.info(`Server listening at http://${host}:${port}`);
          })
     }).catch((err: Error) => {
          log.error(err);
          process.exit(1);
     });

//* Routing
server.use('/home', indexRouter);
server.use('/blog', blogRouter);
server.use('/user', userRouter);