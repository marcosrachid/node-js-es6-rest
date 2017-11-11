"use strict";
import Site from '../../../src/models/site.model';

describe('Routes: Sites', () => {

  let request;

  before(()=> {
    return app()
      .then(appplication => {
        request = supertest(appplication);
      });
  });

  const id = '5a011039a27e510f9c6ef726';
  const mockSite = { "url" : "http://www.marcosrachid.com.br", "description" : "portifolio 4" };
  const expectedSite = { "_id" : id, "url" : "http://www.marcosrachid.com.br", "description" : "portifolio 4", "__v" : 0 };

  beforeEach(() => {
    const site = new Site(mockSite);
    site._id = id;
    return Site.remove({})
      .then(() => site.save());
  });

  afterEach(() => Site.remove({}));

  describe('GET /api', () => {
    it('should return a list of sites', done => {
      request
        .get(`/api`)
        .end((err, res) => {
          expect(res.body).to.eql([expectedSite]);
          done(err);
        });
    });

    context('when an id is specified', () => {
      it('should return a single site', done => {
        request
          .get(`/api/${id}`)
          .end((err, res) => {
            expect(res.body.length).to.eql(1);
            expect(res.body).to.eql([expectedSite]);
            done(err);
          });
      });
    });
  });

  describe('POST /api', () => {
    context('when inserting a site', () => {
      it('should return a new site with code 201 as status code', done => {
        const customId = '56cb91bdc3464f14678934ba';
        const newSite = Object.assign({},{ _id: customId, __v:0 }, mockSite);
        const expectedSavedSite = { __v: 0, _id: customId, "url" : "http://www.marcosrachid.com.br", "description" : "portifolio 4" };
        request
          .post('/api')
          .send(newSite)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201);
            expect(res.body).to.eql(expectedSavedSite);
            done(err);
        });
      });
    });
  });

  describe('PUT /api/:id', () => {
    context('when updating a site', () => {
      it('should update the site and return 200 as status code', done => {
        const customSite = {
          url: 'http://www.fwcreative.esp.br/'
        };
        const updatedSite = Object.assign({}, customSite, mockSite);
        request
          .put(`/api/${id}`)
          .send(updatedSite)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done(err);
        });
      })
    });
  });

  describe('DELETE /api/:id', () => {
    context('when deleting a site', () => {
      it('should delete a site and return 204 as status code', done => {
        request
          .delete(`/api/${id}`)
          .end((err, res) => {
            expect(res.status).to.eql(204);
            done(err);
        });
      });
    });
  });

});
