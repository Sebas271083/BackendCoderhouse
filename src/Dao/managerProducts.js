import fs  from 'fs'

export class ProductManager {
  constructor(path) {
    this.path = path
    try {
      const data = fs.readFileSync(this.path, 'utf-8')
      this.products = JSON.parse(data)
    } catch (error) {
      this.products = []
    }
  }

  getAllProducts() {
    return this.products
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === Number(id));
    if (product) {
      return product;
    } else {
      throw new Error('Product not found');
    }
  }

  addProduct(product) {
    // Validar que todos los parámetros sean obligatorios
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.error('All fields are required')
      return
    }

    // Verificar que no exista un producto con el mismo código
    const codeExists = this.products.some(existingProduct => existingProduct.code === product.code)
    if (codeExists) {
      console.error('Code already exists')
      return
    }

    const newProduct = {
      id: this.#generarId(),
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
    }

    this.products.push(newProduct)
    this.#guardarProductos()
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex(product => product.id === id)
    if (index === -1) {
      console.error('Product not found')
      return
    }

    this.products[index] = {
      ...this.products[index],
      ...updatedFields
    }
    this.#guardarProductos()
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id)
    if (index === -1) {
      console.error('Product not found')
      return
    }

    this.products.splice(index, 1)
    this.#guardarProductos()
  }

  #generarId() {
    const id =
      this.products.length === 0
        ? 1
        : this.products[this.products.length - 1].id + 1
    return id
  }

  #guardarProductos() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
  }
}


/*const productManager = new ProductManager('./productos.json')

for (let i = 1; i <= 10; i++) {
  const newProduct = {
    title: `Product ${i}`,
    description: `Description for product ${i}`,
    price: Math.floor(Math.random() * 100),
    thumbnail: `https://via.placeholder.com/150x150?text=Product${i}`,
    code: `CODE${i}`,
    stock: Math.floor(Math.random() * 100)
  }

  productManager.addProduct(newProduct)
}*/

console.log('Products created successfully')
