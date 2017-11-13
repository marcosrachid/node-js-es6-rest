"use strict";
import Site from '../models/site.model';

class SiteController {

  get(req, res) {
   return Site.find({})
     .then(sites => res.json(sites))
     .catch(err => res.status(400).json(err));
 }

 getById(req, res) {
   const { params: { id } } = req;

   return Site.findOne({ _id: id })
     .then(site => res.json(site))
     .catch(err => res.status(400).json(err));
 }

 create(req, res) {
   const site = new Site(req.body);

   return site.save()
     .then(() => res.status(201).send(''))
     .catch(err => res.status(422).json(err));
 }

 update(req, res) {
   return Site.findOneAndUpdate({ _id: req.params.id}, req.body)
     .then(() => res.status(200).send(''))
     .catch(err => res.status(422).json(err));
 }

 remove(req, res) {
   return Site.remove({ _id: req.params.id})
     .then(() => res.status(204).send(''))
     .catch(err => res.status(400).json(err));
 }

}

export default SiteController;
