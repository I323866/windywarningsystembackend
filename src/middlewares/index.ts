import routes from './routes'
import logger from './logger'
import { Application } from 'express'
import statics from './statics'
import parser from './parser'

export default (app: Application) => {
  logger(app)
  statics(app)
  parser(app)
  routes(app)

}
