import { Request, Response, Application } from 'express'
import moment from 'moment'
import morgan from 'morgan'
morgan.token('logTime', (req: Request, res: Response) => {
  return moment().format('YYYY-MM-DD HH:mm:ss')
})

const format = {
  dev: 'dev',
  manual: '[:logTime] :method :url :status :res[content-length] -:response-time ms'
}

export default (app: Application) => {
  app.use(morgan(format.manual))
}
