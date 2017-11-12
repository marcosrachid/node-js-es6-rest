"use strict";
import express from 'express';
import siteRoutes from './site.routes';
import userRoutes from './user.routes';

const router = express.Router();

router.use('/site/api/v1/auth', userRoutes);
router.use('/site/api/v1/', siteRoutes);

export default router;
