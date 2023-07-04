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
    async getUserById(id) {
        const user = await Users.findById(id);
        if (user) {
          return user;
        } else {
          throw new Error('User not found');
        }
      }
}


