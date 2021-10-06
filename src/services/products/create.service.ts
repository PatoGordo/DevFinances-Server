import { Product, ProductType } from '../../models/product.model'
import { ProductRepository } from '../../repositories/product.repository'

export class CreateProductService {
  private repository: ProductRepository;

  constructor (repository: ProductRepository) {
    this.repository = repository
  }

  public execute ({ name, description, price, productAvailability }: ProductType): Product {
    if (!name || name.trim() === '') {
      throw new Error('"name" is a required parameter')
    }
    if (!description || description.trim() === '') {
      throw new Error('"description" is a required parameter')
    }
    if (!price) {
      throw new Error('"price" is a required parameter')
    }
    if (!productAvailability) {
      throw new Error('"productAvailability" is a required parameter')
    }

    const product = this.repository.insertOne({ name, description, price, productAvailability })

    return product
  }
}
