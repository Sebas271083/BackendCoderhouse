import Users from "../db/models/Users.model.js";
import mongoose from "mongoose";


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

    async getUserByEmail(email) {  
      try {
      const users = await Users.find(); // Llama a la función getAll() para obtener todos los usuarios
      const user = users.find(user => user.email === email); // Filtra el usuario por correo electrónico
      console.log("USER::::::" + users)
      return user;
    } catch (error) {
      return error;
    }
  }

  async comprobarToken(token) {
    try {
      const users = await Users.find();
      const user = users.find(user => user.token === token)
      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateUser (userId, token) {
    try {
      // Verifica si el userId es válido
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('El userId no es válido');
      }
  
      // Actualiza el usuario con el nuevo token
      const updatedUser = await Users.findByIdAndUpdate(userId, { token }, { new: true });
  
      if (!updatedUser) {
        throw new Error('No se encontró ningún usuario con el userId proporcionado');
      }
  
      console.log(updatedUser);
      return updatedUser;
    } catch (error) {
      console.log(error);
    }
  };

    async actualizarPassword(userId, password) {
        try {
          // Verifica si el userId es válido
          if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('El userId no es válido');
          }
      
          // Actualiza el usuario con el nuevo token
          const updatedUser = await Users.findByIdAndUpdate(userId, { password }, { new: true });
      
          if (!updatedUser) {
            throw new Error('No se encontró ningún usuario con el userId proporcionado');
          }
      
          console.log(updatedUser);
          return updatedUser;
        } catch (error) {
          console.log(error);
        }
      };
    }
      
  
  








