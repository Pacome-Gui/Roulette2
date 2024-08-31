/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/number';
const router = express.Router();

router.get('/numbers', controller.getGetNumbers);
router.delete('/numbers/last', controller.deleteLastNumber);
router.delete('/numbers', controller.deleteNumbers);
router.post('/numbers', controller.addNumber);

export = router;