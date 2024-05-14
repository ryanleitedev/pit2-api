import express from 'express'
import routes from './routes'
import cors from 'cors'

class App {
  public server: express.Express

  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: true }))
    this.server.use(cors({ origin: '*', credentials: true }))
  }

  routes() {
    this.server.use(routes)
  }
}

export default new App().server
