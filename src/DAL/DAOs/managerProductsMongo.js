import {productsModel} from '../db/models/products.mode.js'

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
        try {
          const product = await productsModel.findById(id);
          if (product) {
            return product;
          } else {
            throw new Error('Product not found');
          }
        } catch (error) {
         console.log(error) 
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

      async updateProductAdmin(id, obj) {
        try {
          const product = await productsModel.findByIdAndUpdate(id, obj, { new: true });
          console.log(product)
          if (!product) {
            console.error('Product not found');
            return;
          }
          return product  
          // El documento actualizado está en la variable `product`
        } catch (error) {
          console.error(error);
        }
      }

      async deleteProduct(id) {
        try {
          const product = await productsModel.deleteOne({_id: id});
          if (!product) {
            console.error('Product not found');
            return;
          }
          return product
          // El documento eliminado está en la variable `product`
        } catch (error) {
          console.error(error);
        }
      }
}

