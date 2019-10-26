import _ from 'lodash'
import routes from '../routes'
import { Application } from 'express'

export default (app: Application) => {
  _.each(routes, route => {
    route(app)
  })
}
