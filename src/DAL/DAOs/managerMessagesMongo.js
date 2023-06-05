import Message from "../db/models/messagesModel.js";


export class MessageManager {

async addMessage(message) {
    
    try {
        const newMessage = await Message.create(message)
            return newMessage
    } catch (error) {
        console.log(error)
    }
  }
}