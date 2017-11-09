"use strict";
import express from 'express';
import SiteController from '../controllers/site-controller';
import Site from '../models/site';

const router = express.Router();
const siteController = new SiteController(Site);
router.get('/api', (req, res) => siteController.get(req, res));
router.get('/api/:id', (req, res) => siteController.getById(req, res));
router.post('/api', (req, res) => siteController.create(req, res));
router.put('/api/:id', (req, res) => siteController.update(req, res));
router.delete('/api/:id', (req, res) => siteController.remove(req, res));

export default router;
