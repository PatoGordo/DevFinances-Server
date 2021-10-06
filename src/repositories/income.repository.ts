import { db } from '../connections/db'
import { Income } from '../models/income.model'

export class IncomeRepository {
  public async create ({
    title,
    incomeValue,
    incomeDate,
    ownerUID
  }: Omit<Income, 'id' | 'createdAt' | 'updatedAt'>): Promise<Income | undefined> {
    const income = new Income({
      title,
      incomeValue,
      incomeDate,
      ownerUID,
      updatedAt: new Date(),
      createdAt: new Date()
    })

    const connection = db()
    await connection.connect()
    try {
      await connection.query(
        `INSERT INTO incomes
        (id, title, incomeValue, incomeDate, ownerUID, updatedAt, createdAt)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [income.id, title, incomeValue, incomeDate, ownerUID, income.updatedAt, income.createdAt]
      )

      return income
    } catch (err: any) {
      connection.end()
      if (err) {
        throw new Error(err.message)
      }
    }
  }

  public async findAllByUser (ownerUID: string): Promise<Income[] | undefined> {
    const connection = db()
    await connection.connect()

    try {
      const result = await connection.query('SELECT * FROM incomes WHERE ownerUID = $1', [ownerUID])
      connection.end()

      return result.rows
    } catch (err: any) {
      connection.end()
      if (err) {
        throw new Error(err.message)
      }
    }
  }
}
