import { TicketModel } from "../models/orders.model.js";

class TicketsDao {
    async createTicket(amount, purchaser) {
        const code = Math.floor(Math.random()*10000+1)
        return await TicketModel.create({ purchaser, amount, code });
    }
}
const ticketsDao = new TicketsDao();
export default ticketsDao;