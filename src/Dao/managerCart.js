import {cartsModel} from '../db/models/Carts.model.js'


export class ManagerCart {
    constructor(path){
        this.path = path
    }

    async getCarts() {
        try {
            const carts = await cartsModel.find({})
            return carts
        } catch (err) {
            console.log(err)
            return []
        }
    }

    async getCart(id) {
        try {
          const cart = await cartsModel.findOne({ _id: id }).populate('product');
          return cart;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
      

async createCart() {
  const newCart = await cartsModel.create({
  });
  return newCart;
}

async addProductToCart(idCart, idProduct) {
  const cart = await cartsModel.findOne({ _id: idCart });
  if (!cart) return 'Cart not found';
  const productIndex = cart.product.findIndex(p => p.toString() === idProduct);
  if (productIndex === -1) {
    cart.product.push(idProduct);
  } else {
    cart.product[productIndex] = idProduct;
  }
  await cart.save();
  return 'Product added to cart';
}


  

  async deleteProduct(pid) {
    try {
      const productDelete = await Product.findByIdAndDelete(pid)
      return 'product delete, ' + productDelete 
    } catch (error) {
      console.error(error)
      return 'error deleting product'
    }
  }
  


}