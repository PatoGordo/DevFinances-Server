import { User } from '../../models/user.model'
import { UserRepository } from '../../repositories/user.repository'

export class SignInUserService {
  private repository: UserRepository;

  constructor (repository: UserRepository) {
    this.repository = repository
  }

  public async execute ({ name, password }: Omit<Omit<User, 'id'>, 'photoURL'>): Promise<User | undefined> {
    if (!name || name.trim() === '') {
      throw new Error('"name" is a required parameter')
    }
    if (!password || password.trim() === '') {
      throw new Error('"password" is a required parameter')
    }

    const user = await this.repository.SingIn({ name, password })

    return user
  }
}
