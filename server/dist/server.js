"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//#region System Imports
const mongoose_1 = require("mongoose");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
require('dotenv').config();
//#endregion
//#region Directory Imports
const logging_1 = __importDefault(require("./config/logging"));
const indexController_1 = __importDefault(require("./Controllers/indexController"));
const blogController_1 = __importDefault(require("./Controllers/blogController"));
const userController_1 = __importDefault(require("./Controllers/userController"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
//#endregion
//#region Server setup
const port = process.env.PORT;
const dbURL = process.env.DBURL;
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use((0, cors_1.default)(corsOptions_1.default));
server.use(body_parser_1.default.urlencoded({ extended: false }));
server.use(body_parser_1.default.json());
//#endregion
//#region Routing
server.use('/home', indexController_1.default);
server.use('/blog', blogController_1.default);
server.use('/user', userController_1.default);
//#endregion
//#region Connecting M.E.R.N
server.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
// server.all('*', (req, res) => {
//      res.status(404)
//      if (req.accepts('html')) {
//          res.sendFile(path.join(__dirname, 'views', '404.html'))
//      } else if (req.accepts('json')) {
//          res.json({ message: '404 Not Found' })
//      } else {
//          res.type('txt').send('404 Not Found')
//      }
//  })
//#endregion
//#region Database Setup
(0, mongoose_1.connect)(dbURL)
    .then(() => {
    logging_1.default.info(`Connected to Database`);
    server.listen(port, () => {
        logging_1.default.info(`Server running on: ${port}`);
    });
}).catch((err) => {
    logging_1.default.error(err);
    process.exit(1);
});
//#endregion
