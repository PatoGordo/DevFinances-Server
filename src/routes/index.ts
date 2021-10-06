import { Router } from 'express'
import { productRoutes } from './product.routes'

const routes = Router()

routes.use('/products', productRoutes)

routes.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World'
  })
})

export { routes }
