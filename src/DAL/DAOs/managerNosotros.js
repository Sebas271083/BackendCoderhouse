import { nosotrosModel } from "../db/models/Nosotros.js";
import mongoose from "mongoose";


export class NosotrosManager {
  async getAll() {
    try {
      const nosotros = await nosotrosModel.find().lean()
      return nosotros
    } catch (error) {
      return error
    }
  }


  async addNosotros(obj) {
    try {
      const newNosotros = nosotrosModel.create(obj)
      return newNosotros
    } catch (error) {
      console.log(error)
    }
  }


  async updateNosotros(obj) {
    try {
      // Actualiza todos los documentos de la colección con los datos proporcionados
      const updatedNosotros = await nosotrosModel.updateMany({}, obj, { new: true });
       console.log(updatedNosotros);
      return updatedNosotros;
    } catch (error) {
      console.log(error);
    }
  };

  

  
  async updateNosotrosAdmin(id, obj) {
    try {
      const nosotros = await nosotrosModel.findByIdAndUpdate(id, obj, { new: true });
      console.log(nosotros)
      if (!nosotros) {
        console.error('nosotros not found');
        return;
      }
      return nosotros  
      // El documento actualizado está en la variable `product`
    } catch (error) {
      console.error(error);
    }
  }

}











