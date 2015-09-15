"use strict";

describe("Common Service", function() {
  var CommonService, httpBackEnd;
  beforeEach(module("CommonServiceModule"));

  beforeEach(inject(function(_CommonService_, $httpBackend) {
    CommonService = _CommonService_;
    httpBackEnd = $httpBackend;
  }));

  it("test get categories", function() {
    httpBackEnd.whenGET("http://10.30.0.83:8080/photographers/admin/getCategories").respond();
    CommonService.getCategoriesList().then(function(categories) {
      
    });

    httpBackEnd.flush();
  });

  it("test get payment modes", function() {
    httpBackEnd.whenGET("http://10.30.0.83:8080/photographers/admin/getpaymentmode").respond();
    CommonService.getPaymentModes().then(function(modes) {

    });
  }); 

   it("test get products", function() {
    httpBackEnd.whenGET("http://10.30.0.83:8080/photographers/admin/getproducts").respond();
    CommonService.getProductsList().then(function(products) {

    });
  }); 

   it("test get payment modes", function() {
     httpBackEnd.whenGET("http://10.30.0.83:8080/photographers/admin/getlanguageservice").respond();
     CommonService.getLanguages().then(function(languages) {

     });
   }); 


});


