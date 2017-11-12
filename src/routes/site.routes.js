"use strict";
import express from 'express';
import SiteController from '../controllers/site.controller';
import Site from '../models/site.model';
import UserController from '../controllers/user.controller';
import User from '../models/user.model';

const router = express.Router();
const siteController = new SiteController(Site);
const userController = new UserController(User);
router.all('/', (req, res, next) => userController.loginRequired(req, res, next));
router.all('/:id', (req, res, next) => userController.loginRequired(req, res, next));
router.get('/', (req, res) => siteController.get(req, res));
router.get('/:id', (req, res) => siteController.getById(req, res));
router.post('/', (req, res, next) => siteController.create(req, res));
router.put('/:id', (req, res, next) => siteController.update(req, res));
router.delete('/:id', (req, res, next) => siteController.remove(req, res));

export default router;
