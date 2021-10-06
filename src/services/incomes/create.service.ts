import { Income } from '../../models/income.model'
import { IncomeRepository } from '../../repositories/income.repository'

export class CreateIncomeService {
  private repository: IncomeRepository

  constructor (repository: IncomeRepository) {
    this.repository = repository
  }

  public async execute ({
    title,
    incomeValue,
    incomeDate,
    ownerUID
  }: Omit<Income, 'id' | 'createdAt' | 'updatedAt'>): Promise<Income | undefined> {
    if (!title || title.trim() === '') {
      throw new Error('"title" is a required parameter')
    }
    if (!incomeValue) {
      throw new Error('"incomeValue" is a required parameter')
    }
    if (!incomeDate || incomeDate.trim() === '') {
      throw new Error('"incomeDate" is a required parameter')
    }
    if (!ownerUID || ownerUID.trim() === '') {
      throw new Error('"ownerUID" is a required parameter')
    }

    const income = await this.repository.create({ title, incomeValue, incomeDate, ownerUID })

    return income
  }
}
