import express from 'express'
import routes from './routes'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

class App {
  public server: express.Express

  constructor() {
    this.server = express()

    this.middlewares()
    this.swagger()
    this.routes()
  }

  middlewares() {
    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: true }))
    this.server.use(cors({ origin: '*', credentials: true }))
  }

  routes() {
    this.server.use('/api', routes)
  }

  swagger() {
    this.server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  }
}

export default new App().server
