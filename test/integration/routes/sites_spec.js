"use strict";
import Site from '../../../src/models/site.model';
import User from '../../../src/models/user.model';

describe('Routes: Sites', () => {

  const mockUser = { "fullName": "Fullname", "email": "email@email.com", "hash_password": "$2a$10$5RnDk8/NDaHMQx/cruN/QOizdlG3RucgLiSlXeGnIRv7dNTKxv5gG" };
  const signinUser = { "email": "email@email.com", "password": "123456" };
  let request;
  let token;

  before(() => {
    return app()
      .then(application => {
        request = supertest(application);
      })
      .then(() => {
        const user = new User(mockUser);
        User.remove({})
          .then(() => user.save());
      })
      .then(() => {
        request.post('/site/api/v1/auth/sign_in')
          .send(signinUser)
          .end((err, res) => {
            token = res.body.token;
          });
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

  describe('GET /site/api/v1/', () => {
    it('should return a list of sites', done => {
      request
        .get(`/site/api/v1/`)
        .set({"Authorization": token})
        .end((err, res) => {
          expect(res.body).to.eql([expectedSite]);
          done(err);
        });
    });

    context('when an id is specified', () => {
      it('should return a single site', done => {
        request
          .get(`/site/api/v1/${id}`)
          .set({"Authorization": token})
          .end((err, res) => {
            expect(res.body).to.eql(expectedSite);
            done(err);
          });
      });
    });
  });

  describe('POST /site/api/v1/', () => {
    context('when inserting a site', () => {
      it('should return a new site with code 201 as status code', done => {
        const customId = '56cb91bdc3464f14678934ba';
        const newSite = Object.assign({},{ _id: customId, __v:0 }, mockSite);
        request
          .post('/site/api/v1/')
          .set({"Authorization": token})
          .send(newSite)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201);
            done(err);
        });
      });
    });
  });

  describe('PUT /site/api/v1/:id', () => {
    context('when updating a site', () => {
      it('should update the site and return 200 as status code', done => {
        const customSite = {
          url: 'http://www.fwcreative.esp.br/'
        };
        const updatedSite = Object.assign({}, customSite, mockSite);
        request
          .put(`/site/api/v1/${id}`)
          .set({"Authorization": token})
          .send(updatedSite)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done(err);
        });
      });
    });
  });

  describe('DELETE /site/api/v1/:id', () => {
    context('when deleting a site', () => {
      it('should delete a site and return 204 as status code', done => {
        request
          .delete(`/site/api/v1/${id}`)
          .set({"Authorization": token})
          .end((err, res) => {
            expect(res.status).to.eql(204);
            done(err);
        });
      });
    });
  });

});
