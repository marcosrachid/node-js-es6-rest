import SiteController from '../../../src/controllers/site-controller';
import sinon from 'sinon';
import Site from '../../../src/models/site';

describe('Controller: Site', () => {
  const defaultSite = [{ "_id" : '5a011039a27e510f9c6ef726', "url" : "http://www.marcosrachid.com.br", "description" : "portifolio 4", "__v" : 0 }];
  const defaultRequest = { params: {} };

  describe('get() sites', () => {
    it('should call send with a list of sites', () => {
      const response = {
        send: sinon.spy()
      };
      Site.find = sinon.stub();
      Site.find.withArgs({}).resolves(defaultSite);

      const siteController = new SiteController(Site);

      return siteController.get(defaultRequest, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultSite);
        });
    });

    it('should return 400 when an error occurs', () => {
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

  describe('getById() site', () => {
    it('should call send with one site', () => {
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
      Site.find.withArgs({ _id: mockId }).resolves(defaultSite);

      const siteController = new SiteController(Site);

      return siteController.getById(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultSite);
        });
    });

    it('should return 400 when an error occurs', () => {
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

  describe('create() site', () => {

  });

  describe('update() site', () => {

  });

  describe('remove() site', () => {

  });
});
