class SiteController {
  constructor(Site) {
    this.Site = Site;
  }

  get(req, res) {
   return this.Site.find({})
     .then(sites => res.send(sites))
     .catch(err => res.status(400).send(err.message));
 }

 getById(req, res) {
   const { params: { id } } = req;

   return this.Site.find({ _id:id })
     .then(sites => res.send(sites))
     .catch(err => res.status(400).send(err.message));
 }

 create(req, res) {
   const site = new this.Site(req.body);

   return site.save()
     .then(() => res.status(201).send(site))
     .catch(err => res.status(422).send(err.message));
 }

 update(req, res) {
   return this.Site.findOneAndUpdate({ _id: req.params.id}, req.body)
     .then(() => res.sendStatus(200))
     .catch(err => res.status(422).send(err.message));
 }

 remove(req, res) {
   return this.Site.remove({ _id: req.params.id})
     .then(() => res.sendStatus(204))
     .catch(err => res.status(400).send(err.message));
 }

}

export default SiteController;
