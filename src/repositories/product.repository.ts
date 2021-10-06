import { Product, ProductType } from '../models/product.model'

export class ProductRepository {
  private products: Product[]

  constructor () {
    this.products = []
  }

  public findAll (): Product[] {
    return this.products
  }

  public findById (id: string): Product | undefined {
    return this.products.find(item => item.id === id)
  }

  public insertOne ({ name, description, price, productAvailability }: ProductType): Product {
    const product = new Product({
      name,
      description,
      price,
      productAvailability
    })

    this.products.push(product)

    return product
  }
}
