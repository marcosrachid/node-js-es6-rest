"use strict";
import SiteController from '../../../src/controllers/site.controller';
import Site from '../../../src/models/site.model';

describe('Controller: Site', () => {
  const defaultSite = { "_id" : '5a011039a27e510f9c6ef726', "url" : "http://www.marcosrachid.com.br", "description" : "portifolio 4", "__v" : 0 };
  const mockSite = { "url" : "http://www.marcosrachid.com.br", "description" : "portifolio 4" };
  const defaultRequest = { params: {} };

  describe('get() sites', () => {
    it('should call send with a list of sites', () => {
      const response = {
        json: sinon.spy()
      };

      const SiteMock = sinon.mock(Site);
      SiteMock
        .expects('find')
        .withArgs({})
        .resolves([defaultSite]);

      const siteController = new SiteController(Site);

      return siteController.get(defaultRequest, response)
        .then(() => {
          SiteMock.verify();
          SiteMock.restore();
          sinon.assert.calledWith(response.json, [defaultSite]);
        });
    });

    context('when an error occurs', () => {
      it('should return 400', () => {
        const request = {};
        const response = {
          json: sinon.spy(),
          status: sinon.stub()
        };

        response.status.withArgs(400).returns(response);
        const SiteMock = sinon.mock(Site);
        SiteMock
          .expects('find')
          .withArgs({})
          .rejects({ message: 'Error' });

        const siteController = new SiteController(Site);

        return siteController.get(request, response)
          .then(() => {
            SiteMock.verify();
            SiteMock.restore();
            sinon.assert.calledWith(response.json, { message: 'Error' });
          });
      });
    });
  });

  describe('getById() site', () => {
    it('should call send with one site', () => {
      const mockId = 'anyId';
      const request = {
        params: {
          id: mockId
        }
      };
      const response = {
        json: sinon.spy()
      };

      const SiteMock = sinon.mock(Site);
      SiteMock
        .expects('findOne')
        .withArgs({ _id: mockId })
        .resolves([defaultSite]);

      const siteController = new SiteController(Site);

      return siteController.getById(request, response)
        .then(() => {
          SiteMock.verify();
          SiteMock.restore();
          sinon.assert.calledWith(response.json, [defaultSite]);
        });
    });

    context('when an error occurs', () => {
      it('should return 400', () => {
        const mockId = 'anyId';
        const request = {
          params: {
            id: mockId
          }
        };
        const response = {
          json: sinon.spy(),
          status: sinon.stub()
        };

        response.status.withArgs(400).returns(response);
        const SiteMock = sinon.mock(Site);
        SiteMock
          .expects('findOne')
          .withArgs({ _id: mockId })
          .rejects({ message: 'Error' });

        const siteController = new SiteController(Site);

        return siteController.getById(request, response)
          .then(() => {
            SiteMock.verify();
            SiteMock.restore();
            sinon.assert.calledWith(response.json, { message: 'Error' });
          });
      });
    });
  });

  describe('create() site', () => {
    it('should call send with a new site', () => {
      const requestWithBody = Object.assign({}, { body: mockSite }, defaultRequest);
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      };
      class FakeSite {
        save(){}
      }

      response.status.withArgs(201).returns(response);
      sinon.stub(FakeSite.prototype, 'save')
        .withArgs()
        .resolves();

      const siteController = new SiteController(FakeSite);

      return siteController.create(requestWithBody, response)
        .then(() => {
          sinon.assert.calledWith(response.status, 201);
          sinon.assert.calledWith(response.send);
        });
    });

    context('when an error occurs', () => {
      it('should return 422', () => {
        const requestWithBody = Object.assign({}, { body: mockSite }, defaultRequest);
        const response = {
          json: sinon.spy(),
          status: sinon.stub()
        };
        class FakeSite {
          save(){}
        }

        response.status.withArgs(422).returns(response);
        sinon.stub(FakeSite.prototype, 'save')
          .withArgs()
          .rejects({ message: 'Error' });

        const siteController = new SiteController(FakeSite);

        return siteController.create(requestWithBody, response)
          .then(() => {
            sinon.assert.calledWith(response.status, 422);
            sinon.assert.calledWith(response.json, { message: 'Error' });
          });
      });
    });
  });

  describe('update() site', () => {
    it('should respond with 200 when the site has been updated', () => {
      const mockId = 'anyId';
      let updatedSite = defaultSite;
      updatedSite._id = mockId;
      updatedSite.mockSite = 'http://www.fwcreative.esp.br/';
      const request = {
        params: {
          id: mockId
        },
        body: updatedSite
      };
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      };
      class FakeSite {
        static findOneAndUpdate() {}
      }

      response.status.withArgs(200).returns(response);
      sinon.stub(FakeSite, 'findOneAndUpdate')
        .withArgs({ _id: mockId }, updatedSite)
        .resolves();

      const siteController = new SiteController(FakeSite);

      return siteController.update(request, response)
        .then(() => {
          sinon.assert.calledWith(response.status, 200);
          sinon.assert.calledWith(response.send);
        });
    });

    context('when an error occurs', () => {
      it('should return 422', () => {
        const mockId = 'anyId';
        let updatedSite = defaultSite;
        updatedSite._id = mockId;
        updatedSite.mockSite = 'http://www.fwcreative.esp.br/';
        const request = {
          params: {
            id: mockId
          },
          body: updatedSite
        };
        const response = {
          json: sinon.spy(),
          status: sinon.stub()
        };
        class FakeSite {
          static findOneAndUpdate() {}
        }

        response.status.withArgs(422).returns(response);
        sinon.stub(FakeSite, 'findOneAndUpdate')
          .withArgs({ _id: mockId }, updatedSite)
          .rejects({ message: 'Error' });

        const siteController = new SiteController(FakeSite);

        return siteController.update(request, response)
          .then(() => {
            sinon.assert.calledWith(response.status, 422);
            sinon.assert.calledWith(response.json, { message: 'Error' });
          });
      });
    });
  });

  describe('remove() site', () => {
    it('should respond with 204 when the site has been deleted', () => {
      const mockId = 'anyId';
      const request = {
        params: {
          id: mockId
        }
      };
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      };
      class FakeSite {
        static remove() {}
      }

      response.status.withArgs(204).returns(response);
      sinon.stub(FakeSite, 'remove')
        .withArgs({ _id: mockId })
        .resolves();

      const siteController = new SiteController(FakeSite);

      return siteController.remove(request, response)
        .then(() => {
          sinon.assert.calledWith(response.status, 204);
          sinon.assert.calledWith(response.send);
        });
    });

    context('when an error occurs', () => {
      it('should return 400', () => {
        const mockId = 'anyId';
        const request = {
          params: {
            id: mockId
          }
        };
        const response = {
          json: sinon.spy(),
          status: sinon.stub()
        };
        class FakeSite {
          static remove() {}
        }

        response.status.withArgs(400).returns(response);
        sinon.stub(FakeSite, 'remove')
          .withArgs({ _id: mockId })
          .rejects({ message: 'Error' });

        const siteController = new SiteController(FakeSite);

        return siteController.remove(request, response)
          .then(() => {
            sinon.assert.calledWith(response.status, 400);
            sinon.assert.calledWith(response.json, { message: 'Error' });
          });
      });
    });
  });
});
