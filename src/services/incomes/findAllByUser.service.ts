import { Income } from '../../models/income.model'
import { IncomeRepository } from '../../repositories/income.repository'

export class FindAllByUserService {
  private repository: IncomeRepository;

  constructor (repository: IncomeRepository) {
    this.repository = repository
  }

  public async execute (ownerUID: string): Promise<Income[] | undefined> {
    if (!ownerUID || ownerUID.trim() === '') {
      throw new Error('"ownerUID" is a required parameter')
    }

    const incomes = await this.repository.findAllByUser(ownerUID)

    return incomes
  }
}
