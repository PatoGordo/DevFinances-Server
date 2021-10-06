import { Router } from 'express'
import { IncomeRepository } from '../repositories/income.repository'
import { CreateIncomeService } from '../services/incomes/create.service'
import { FindAllByUserService } from '../services/incomes/findAllByUser.service'

const incomeRoutes = Router()
const incomeRepository = new IncomeRepository()

incomeRoutes.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to income route'
  })
})

incomeRoutes.get('/get/all/:ownerUID', async (req, res) => {
  const { ownerUID } = req.params

  try {
    const service = new FindAllByUserService(incomeRepository)

    const result = await service.execute(ownerUID)

    return res.status(200).json({
      result
    })
  } catch (err: any) {
    return res.status(400).json({
      message: err.message
    })
  }
})

incomeRoutes.post('/set', async (req, res) => {
  const { title, incomeValue, incomeDate, ownerUID } = req.body

  const service = new CreateIncomeService(incomeRepository)

  try {
    const newIncome = await service.execute({ title, incomeValue, incomeDate, ownerUID })

    return res.status(201).json({
      result: newIncome
    })
  } catch (err: any) {
    return res.status(400).json({
      message: err.message
    })
  }
})

export { incomeRoutes }
