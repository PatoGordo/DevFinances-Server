import { v4 } from 'uuid'

export class Income {
  id: string
  title: string
  ownerUID: string;
  incomeValue: number;
  incomeDate: string;
  createdAt: Date;
  updatedAt: Date;

  constructor ({ title, ownerUID, incomeValue, incomeDate, createdAt, updatedAt }: Omit<Income, 'id'>) {
    this.id = v4()
    this.title = title
    this.ownerUID = ownerUID
    this.incomeValue = incomeValue
    this.incomeDate = incomeDate
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
