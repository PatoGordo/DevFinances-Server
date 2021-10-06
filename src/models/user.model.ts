import { v4 } from 'uuid'

export class User {
  id: string
  name: string
  password: string;
  photoURL: string;

  constructor ({ name, password, photoURL }: Omit<User, 'id'>) {
    this.id = v4()
    this.name = name
    this.password = password
    this.photoURL = photoURL
  }
}
