import { Router, Application } from 'express'
import * as remind from '../controllers/remind'

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
  ApiRouter.get('/', remind.getRemind)
  ApiRouter.put('/:id', remind.updateRemind)
  ApiRouter.delete('/:id', remind.deleteRemind)
  app.use('/api/remind', ApiRouter)
}
