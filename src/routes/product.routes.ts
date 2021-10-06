import { Router } from 'express'
import { ProductRepository } from '../repositories/product.repository'
import { CreateProductService } from '../services/products/create.service'

const productRoutes = Router()
const productRepository = new ProductRepository()

productRoutes.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to products route'
  })
})

productRoutes.get('/get/all', (req, res) => {
  res.status(200).json({
    result: productRepository.findAll()
  })
})

productRoutes.get('/get/:id', (req, res) => {
  const { id } = req.params

  res.status(200).json({
    result: productRepository.findById(id)
  })
})

productRoutes.post('/set', (req, res) => {
  const { name, description, price, productAvailability } = req.body

  try {
    const service = new CreateProductService(productRepository)

    const newProduct = service.execute({
      name,
      description,
      price,
      productAvailability
    })

    return res.status(201).json({
      result: newProduct
    })
  } catch (err) {
    res.status(400).json({
      err
    })
  }
})

export { productRoutes }
