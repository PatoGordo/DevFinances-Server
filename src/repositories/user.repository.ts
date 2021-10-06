import { User } from '../models/user.model'
import bcrypt from 'bcryptjs'
import { db } from '../connections/db'

export class UserRepository {
  public async SingUp ({ name, password }: { name: string, password: string; }): Promise<User | undefined> {
    const connection1 = db()
    await connection1.connect()

    try {
      const result = await connection1.query('SELECT * FROM users WHERE name = $1', [name])
      await connection1.end()

      if (result.rows.length) {
        throw new Error('This username already exists, try other')
      }

      const connection2 = db()
      await connection2.connect()
      try {
        const hashedPassword = bcrypt.hashSync(password, 10)

        const user = new User({
          name,
          password: hashedPassword,
          photoURL: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
        })

        await connection2.query(
          'INSERT INTO users (id, name, password, photoURL) VALUES ($1, $2, $3, $4)',
          [user.id, user.name, user.password, user.photoURL]
        )
        connection2.end()

        return user
      } catch (err: any) {
        connection2.end()
        if (err) {
          throw new Error(err.message)
        }
      }
    } catch (err: any) {
      await connection1.end()
      if (err) {
        throw new Error(err.message)
      }
    }
  }

  public async SingIn ({ name, password }: { name: string, password: string }): Promise<User | undefined> {
    const connection = db()
    await connection.connect()

    try {
      const result = await connection.query('SELECT * FROM users WHERE name = $1', [name])
      await connection.end()

      if (!result.rows.length) {
        throw new Error('Incorret user or passoword')
      }

      const passwordComparation = bcrypt.compareSync(password, result.rows[0].password)

      if (!passwordComparation) {
        throw new Error('Incorret user or passoword')
      }

      return result.rows[0] as User
    } catch (err: any) {
      await connection.end()
      if (err) {
        throw new Error(err.message)
      }
    }
  }
}
