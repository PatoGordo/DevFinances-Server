import { Router } from 'express'
import { incomeRoutes } from './incomes.routes'
import { userRoutes } from './user.routes'

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/income', incomeRoutes)

routes.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World'
  })
})

export { routes }
