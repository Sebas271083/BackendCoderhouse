import Users from "../db/models/Users.model.js";

export class UsersManager {
    async getAll(){
        try {
            const users = await Users.find()
            return users
        } catch (error) {
            return error
        }
    }
}