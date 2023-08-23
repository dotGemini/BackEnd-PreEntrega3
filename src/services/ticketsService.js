import TicketManager from "../dao/ticketManager.js";

export class TicketsService{
    constructor(){
        this.ticketDao = new TicketManager();
    }

    async createTicket(cartID, email) {
        return await this.ticketDao.createTicket(cartID, email);
    }
}