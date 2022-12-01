"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
require('dotenv').config();
//* Directory Imports
const logging_1 = __importDefault(require("./config/logging"));
const indexController_1 = __importDefault(require("./Controllers/indexController"));
const blogController_1 = __importDefault(require("./Controllers/blogController"));
const userController_1 = __importDefault(require("./Controllers/userController"));
//* Server setup
const port = process.env.PORT;
const host = process.env.HOST;
const dbURL = process.env.DBURL;
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use((0, cors_1.default)());
server.use(express_1.default.static(__dirname + "/public"));
server.use(body_parser_1.default.urlencoded({ extended: false }));
server.use(body_parser_1.default.json());
//* Database Setup
(0, mongoose_1.connect)(dbURL)
    .then(() => {
    logging_1.default.info(`Connected to Database`);
    server.listen(port, host, () => {
        logging_1.default.info(`Server listening at http://${host}:${port}`);
    });
}).catch((err) => {
    logging_1.default.error(err);
    process.exit(1);
});
//* Routing
server.use(indexController_1.default);
server.use('/blog', blogController_1.default);
server.use('/user', userController_1.default);
