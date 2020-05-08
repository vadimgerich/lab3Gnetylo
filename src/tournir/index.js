import { Router } from 'express';
import tournirControler from './controler.js'

const tournirRouter = new Router();

//роути 
tournirRouter.get("/init", tournirControler.init);
tournirRouter.get('/', tournirControler.get);
tournirRouter.get('/:count', tournirControler.getByCount);
tournirRouter.post('/', tournirControler.post);
tournirRouter.delete('/:id', tournirControler.delete_id);
tournirRouter.patch('/:id', tournirControler.patch);

export default tournirRouter;