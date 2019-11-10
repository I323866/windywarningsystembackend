import { Router, Application } from 'express'
import * as AWOSWarning from '../controllers/AWOSWarning'

const ApiRouter: Router = Router()

export default (app: Application) => {
  // app.use(function(req, res, next) {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'Origin, X-Requested-With, Content-Type, Accept'
  //   );
  //   next();
  // });
  ApiRouter.get('/', AWOSWarning.getAWOSs)
  ApiRouter.post('/warning/', AWOSWarning.updateWarningOn)
  ApiRouter.post('/disable/', AWOSWarning.updateDisable)
  app.use('/api/AWOSwarning', ApiRouter)
}
