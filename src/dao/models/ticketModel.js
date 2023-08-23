import mongoose from "mongoose";

const {Schema} = mongoose;

export const ticketsCollection = 'ticket';

const ticketsSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    purchase_dateTime: {
        type: Date,
        default: Date.now()
    },
    amount: Number,
    purchaser: String,
});

const TicketsModel = mongoose.model(ticketsCollection, ticketsSchema);

export default TicketsModel;