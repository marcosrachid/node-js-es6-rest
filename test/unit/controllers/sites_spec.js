import SiteController from '../../../src/controllers/site-controller';
import sinon from 'sinon';
import Site from '../../../src/models/site';

describe('Controller: Site', () => {
  const defaultSite = { "_id" : '5a011039a27e510f9c6ef726', "url" : "http://www.marcosrachid.com.br", "description" : "portifolio 4", "__v" : 0 };
  const defaultRequest = { params: {} };
  const mockSite = { "url" : "http://www.marcosrachid.com.br", "description" : "portifolio 4" };
  const expectedSite = { "_id" : '5a011039a27e510f9c6ef726', "url" : "http://www.marcosrachid.com.br", "description" : "portifolio 4", "__v" : 0 };

  describe('get() sites', () => {
    it('should call send with a list of sites', () => {
      const response = {
        send: sinon.spy()
      };
      Site.find = sinon.stub();
      Site.find.withArgs({}).resolves([defaultSite]);

      const siteController = new SiteController(Site);

      return siteController.get(defaultRequest, response)
        .then(() => {
          sinon.assert.calledWith(response.send, [defaultSite]);
        });
    });

    context('when an error occurs', () => {
      it('should return 400', done => {
        const request = {};
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        };
        response.status.withArgs(400).returns(response);
        Site.find = sinon.stub();
        Site.find.withArgs({}).rejects({ message: 'Error' });

        const siteController = new SiteController(Site);

        return siteController.get(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error');
          });
      });
    });
  });

  describe('getById() site', () => {
    it('should call send with one site', done => {
      const mockId = 'anyId';
      const request = {
        params: {
          id: mockId
        }
      };
      const response = {
        send: sinon.spy()
      };

      Site.find = sinon.stub();
      Site.find.withArgs({ _id: mockId }).resolves([defaultSite]);

      const siteController = new SiteController(Site);

      return siteController.getById(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, [defaultSite]);
        });
    });

    context('when an error occurs', () => {
      it('should return 400', done => {
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

        response.status.withArgs(400).returns(response);
        Site.find = sinon.stub();
        Site.find.withArgs({ _id: mockId }).rejects({ message: 'Error' });

        const siteController = new SiteController(Site);

        return siteController.getById(request, response)
          .then(() => {
            sinon.assert.calledWith(response.send, 'Error');
          });
      });
    });
  });

  describe('create() site', () => {
    it('should call send with a new site', done => {
    });

    context('when an error occurs', () => {
      it('should return 422', done => {

      });
    });
  });

  describe('update() site', () => {
    it('should respond with 200 when the site has been updated', done => {

    });

    context('when an error occurs', () => {
      it('should return 422', done => {

      });
    });
  });

  describe('remove() site', () => {
    it('should respond with 204 when the site has been deleted', done => {

    });

    context('when an error occurs', () => {
      it('should return 400', done => {

      });
    });
  });
});
