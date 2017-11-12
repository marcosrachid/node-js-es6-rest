"use strict";
import express from 'express';
import UserController from '../controllers/user.controller';
import User from '../models/user.model';

const router = express.Router();
const userController = new UserController(User);
router.post('/register', (req, res) => userController.register(req, res));
router.post('/sign_in', (req, res) => userController.signIn(req, res));

export default router;
