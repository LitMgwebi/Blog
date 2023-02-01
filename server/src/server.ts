//#region System Imports
import { connect } from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
require('dotenv').config();
//#endregion

//#region Directory Imports
import log from "./config/logging";
import indexRouter from "./Controllers/indexController";
import blogRouter from "./Controllers/blogController";
import userRouter from "./Controllers/userController";
import corsOptions from "./config/corsOptions";
//#endregion

//#region Server setup
const port: any = process.env.PORT;
const host: string = process.env.HOST;
const dbURL: string = process.env.DBURL;

const server = express();
server.use(express.json());
server.use(cors(corsOptions));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
//#endregion

//#region Routing
server.use('/home', indexRouter);
server.use('/blog', blogRouter);
server.use('/user', userRouter);
//#endregion

//#region Connecting M.E.R.N
server.use(express.static(path.join(__dirname, '../../client/build')));
server.all('*', (req, res) => {
     res.status(404)
     if (req.accepts('html')) {
         res.sendFile(path.join(__dirname, 'views', '404.html'))
     } else if (req.accepts('json')) {
         res.json({ message: '404 Not Found' })
     } else {
         res.type('txt').send('404 Not Found')
     }
 })
//#endregion

//#region Database Setup
connect(dbURL)
     .then(() => {
          log.info(`Connected to Database`);
          server.listen(port, host, () => {
               log.info(`Server running on: ${port}`);
          })
     }).catch((err: Error) => {
          log.error(err);
          process.exit(1);
     });
//#endregion