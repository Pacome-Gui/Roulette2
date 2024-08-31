/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/message';
const router = express.Router();

router.get('/messages', controller.getMessage);
router.post('/messages', controller.addMessage);

export = router;