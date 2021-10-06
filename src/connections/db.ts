import { Client } from 'pg'

export function db (): Client {
  return new Client({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    database: process.env.PG_DB,
    password: process.env.PG_PASS
  })
}
