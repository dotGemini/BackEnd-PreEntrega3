import MessagesModel from "../models/messagesModel.js";

class MessagesManager {
    async getMessage() {
        try {
            const messages = await MessagesModel.find();
            return messages;
        } catch (error) {
            throw new Error (`Error: ${error.message}`)
        }
    }

    async addMessage(user, message){
        try {
            const newMessage = await MessagesModel.create({user, message});
            return newMessage;
        } catch (error) {
            throw new Error(`Error: ${error.message}`)
        }
    }
}

export {MessagesManager};