import { Router, Request, Response } from 'express';

import AuthController from '../controllers/auth';

const router = Router();

router.post('/token', AuthController.createToken);

export default router;
