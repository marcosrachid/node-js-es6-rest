"use strict";
import express from 'express';
import SiteController from '../controllers/site.controller';
import UserController from '../controllers/user.controller';

const router = express.Router();
const siteController = new SiteController();
const userController = new UserController();
router.all('/*', (req, res, next) => userController.loginRequired(req, res, next));
router.get('/', (req, res) => siteController.get(req, res));
router.get('/:id', (req, res) => siteController.getById(req, res));
router.post('/', (req, res) => siteController.create(req, res));
router.put('/:id', (req, res) => siteController.update(req, res));
router.delete('/:id', (req, res) => siteController.remove(req, res));

export default router;
