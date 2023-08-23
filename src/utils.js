import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const PRIVATE_KEY = "CoderKeyFeliz";

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (user,password) => bcrypt.hashSync(password,bcrypt.genSaltSync(10));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const authToken = (role) => {
    return async (req, res, next) => {
        const authHeader = req.headers.codercookietoken;
        if (!authHeader) return res.status(401).send({ status: "error", error: "Unauthorized" })
        const token = authHeader.split(' ')[1];
        jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
            if (error) return res.status(401).send({ status: "error", error: "Unauthorized" })
            req.user = credentials;
            if (role !== req.user.admin) return res.send({status:0, msg: "forbidden"})
            next();
        })
}}
export default __dirname;