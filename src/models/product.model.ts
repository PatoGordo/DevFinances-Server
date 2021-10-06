import { v4 } from 'uuid'

export type ProductType = {
  name: string;
  description: string;
  price: number;
  productAvailability: number;
}

export class Product {
  id: string
  name: string
  description: string
  price: number
  productAvailability: number

  constructor ({ name, description, price, productAvailability }: Omit<Product, 'id'>) {
    this.id = v4()
    this.name = name
    this.description = description
    this.price = price
    this.productAvailability = productAvailability
  }
}
