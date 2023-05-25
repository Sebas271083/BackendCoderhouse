import {productsModel} from '../DAL/db/models/products.mode.js'

export class ProductManager {
    async getAllProducts() {
        try {
            const products = await productsModel.find().lean()
            return products;
          } catch (error) {
                console.log(error)
          }
    }

    async getPaginate(query, limit, page, sort) {
      try {
          const products = await productsModel.paginate({},{limit:limit, page:page})

          console.log(products, "products")

          const info= {
            count: products.totalDocs,
            page: products.totalPages,
            next: products.hasNextPage ? `http://localhost:8080/products/paginate?page=${products.nextPage}` : null,
            prev: products.hasPrevPage ? `http://localhost:8080/products/paginate?page=${products.prevPage}` : null

          }

          if (sort === 'asc') {
            products.docs.sort((a, b) => a.price - b.price);
        } else if (sort === 'desc') {
            products.docs.sort((a, b) => b.price - a.price);
        }

          return {info, products: products.docs};
        } catch (error) {
              console.log(error)
        }
  }



    async getProductById(id) {
        const product = await productsModel.findById(id);
        if (product) {
          return product;
        } else {
          throw new Error('Product not found');
        }
      }

      async addProduct(product) {
    
        // Verificar que no exista un producto con el mismo código
        const codeExists = await productsModel.exists({ code: product.code })
        if (codeExists) {
          console.error('Code already exists')
          return
        }
        try {
            const newProduct = productsModel.create(product)
                return newProduct
        } catch (error) {
            console.log(error)
        }
      }

      async updateProduct(id, updatedFields) {
        try {
          const product = await productsModel.findByIdAndUpdate(id, updatedFields, { new: true });
          if (!product) {
            console.error('Product not found');
            return;
          }
          // El documento actualizado está en la variable `product`
        } catch (error) {
          console.error(error);
        }
      }

      async deleteProduct(id) {
        try {
          const product = await productsModel.findByIdAndDelete(id);
          if (!product) {
            console.error('Product not found');
            return;
          }
          // El documento eliminado está en la variable `product`
        } catch (error) {
          console.error(error);
        }
      }
}

