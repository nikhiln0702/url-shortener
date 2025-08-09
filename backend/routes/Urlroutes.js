import express from 'express';
import { shortenUrl,shortCode ,admin} from '../controllers/controller.js';

const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/admin', admin);

export default router;
