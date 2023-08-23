import { cookieExtractor } from "../config/passport.config.js";
import { TicketsService } from "../services/ticketsService.js";
import jwt  from "jsonwebtoken";

const ticketsService = new TicketsService();

export const createTicket = async (req, res) => {
    const cartID = req.params.cid;
    const email = req.user.email;
    await ticketsService.createTicket(cartID, email)
    res.send("HECHO!")
}