import { Router } from 'express'
import { UserRepository } from '../repositories/user.repository'
import { SignInUserService } from '../services/users/signin.service'
import { SignUpUserService } from '../services/users/signup.service'

const userRoutes = Router()
const userRepository = new UserRepository()

userRoutes.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcopme to user route'
  })
})

userRoutes.get('/sign-up/:name/:password', async (req, res) => {
  const { name, password } = req.params

  try {
    const service = new SignUpUserService(userRepository)

    const newUser = await service.execute({ name, password })

    res.status(201).json({
      result: newUser
    })
  } catch (err: any) {
    res.status(400).json({
      message: err.message
    })
  }
})

userRoutes.get('/sign-in/:name/:password', async (req, res) => {
  const { name, password } = req.params

  try {
    const service = new SignInUserService(userRepository)

    const newUser = await service.execute({ name, password })

    res.status(201).json({
      result: newUser
    })
  } catch (err: any) {
    res.status(400).json({
      message: err.message
    })
  }
})

export { userRoutes }
