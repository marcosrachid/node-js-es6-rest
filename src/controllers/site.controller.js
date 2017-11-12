"use strict";

class SiteController {
  constructor(Site) {
    this.Site = Site;
  }

  get(req, res) {
   return this.Site.find({})
     .then(sites => res.json(sites))
     .catch(err => res.status(400).json(err));
 }

 getById(req, res) {
   const { params: { id } } = req;

   return this.Site.findOne({ _id: id })
     .then(site => res.json(site))
     .catch(err => res.status(400).json(err));
 }

 create(req, res) {
   const site = new this.Site(req.body);

   return site.save()
     .then(() => res.status(201).send(''))
     .catch(err => res.status(422).json(err));
 }

 update(req, res) {
   return this.Site.findOneAndUpdate({ _id: req.params.id}, req.body)
     .then(() => res.status(200).send(''))
     .catch(err => res.status(422).json(err));
 }

 remove(req, res) {
   return this.Site.remove({ _id: req.params.id})
     .then(() => res.status(204).send(''))
     .catch(err => res.status(400).json(err));
 }

}

export default SiteController;
