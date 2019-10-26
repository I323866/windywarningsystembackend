import { Router, Application } from 'express'
import * as PhotoController from '../controllers/AWOS'

const ApiRouter: Router = Router()

export default (app: Application) => {
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
  ApiRouter.get('/', PhotoController.getAWOSs)

  app.use('/api/AWOS', ApiRouter)
}
