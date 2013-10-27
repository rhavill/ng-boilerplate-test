// Code copied from http://www.benlesh.com/2013/06/angular-js-unit-testing-services.html

describe('login service tests', function () {
  var login,
      httpBackend;

  beforeEach(function () {
    //load the module.
    module('login');

    //get your service, also get $httpBackend
    //$httpBackend will be a mock, thanks to angular-mocks.js
    inject(function ($httpBackend, _login_) {
      login = _login_;
      httpBackend = $httpBackend;
    });
  });

  //make sure no expectations were missed in you tests.
  //(e.g. expectGET or expectPOST)
  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should set user to null and not be authenticated after failed login.', function () {
    //set up some data for the http call to return and test later.
    var returnData = { id: 0 };

    //expectPOST to make sure this is called once.
    httpBackend.expectPOST('/login',{username:'test',password:'wrong'}).respond(returnData);

    expect(login.user).toBeNull();
    login.login('test', 'wrong');
    //flush the backend to "execute" the request to do the expectedGET assertion.
    httpBackend.flush();
    expect(login.user).toBeNull();
    expect(login.isAuthenticated()).toBeFalsy();
  });
});