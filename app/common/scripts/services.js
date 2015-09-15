angular.module('CommonServiceModule', [])
//TODO Constants will be moved to dev.json which will be read from Grunt
.factory('CommonService',['$http', 'SERVER_BASE_URL', 'ELASTIC_SERVER_BASE_URL', function($http, SERVER_BASE_URL, ELASTIC_SERVER_BASE_URL) {
  var SERVICE_URL = {
    'CATEGORIES_URL': '/admin/getCategories',
    'PAYMENT_MODE_URL': '/admin/getpaymentmode',
    'PRODUCTS_URL': '/admin/getproducts',
    'LANGUAGES_URL': '/admin/getlanguageservice',
    'CITIES_URL':'/admin/getallcity',
    'SERVICE_REGION_URL':'/admin/getregionservice',
    'STATES_URL':'/admin/getstatelist',
    'PROFILE_TYPES_URL':'/admin/getsocialprofiletypes',
    'DESC_TEMPLATES_URL':'/admin/getdescriptiontemplates'
  }; 
  var _GET_CATEGORIES_URL = SERVER_BASE_URL + SERVICE_URL.CATEGORIES_URL;
  var _GET_PAYMENT_MODES_URL = SERVER_BASE_URL + SERVICE_URL.PAYMENT_MODE_URL;
  var _GET_PRODUCTS_URL = SERVER_BASE_URL + SERVICE_URL.PRODUCTS_URL;
  var _GET_LANGUAGES_URL = SERVER_BASE_URL + SERVICE_URL.LANGUAGES_URL;
  var _GET_CITIES_URL = SERVER_BASE_URL + SERVICE_URL.CITIES_URL;
  var _GET_SERVICE_REGIONS_URL = SERVER_BASE_URL + SERVICE_URL.SERVICE_REGION_URL;
  var _GET_STATES_URL = SERVER_BASE_URL + SERVICE_URL.STATES_URL;
  var _GET_PROFILE_TYPES_URL = SERVER_BASE_URL + SERVICE_URL.PROFILE_TYPES_URL;
  var _GET_DESC_TEMPLATES_URL = SERVER_BASE_URL + SERVICE_URL.DESC_TEMPLATES_URL;

  var categories = paymentModes = productList = languages = cities = states = serviceRegions = profileTypes = descTemplates = null;

  var getCategoriesList = function(queryParams) {
     if (categories === null){
       return $http.get(_GET_CATEGORIES_URL).then(function(response){
          categories = response.data;
          return categories;
      });
     }
     return categories; 
 };

  var getPaymentModes = function() {
     if (paymentModes === null){
       return $http.get(_GET_PAYMENT_MODES_URL).then(function(response){
          paymentModes = response.data;
          return paymentModes;
      });
     }
     return paymentModes; 
  };

  var getProductList = function() {
      if (productList === null){
       return $http.get(_GET_PRODUCTS_URL).then(function(response){
          productList = response.data;
          return productList;
      });
     }
     return productList; 
  };

  var getLanguages = function() {
      if (languages === null){
       return $http.get(_GET_LANGUAGES_URL).then(function(response){
          languages = response.data;
          return languages;
      });
     }
     return languages; 
 };

  var getServiceRegions = function() {
      if (serviceRegions === null){
       return $http.get(_GET_SERVICE_REGIONS_URL).then(function(response){
          serviceRegions = response.data;
          return serviceRegions;
      });
     }
     return serviceRegions; 
  };

  var getCities = function(){
     if (cities === null){
       return $http.get(_GET_CITIES_URL).then(function(response){
          cities = response.data;
          return cities;
      });
     }
     return cities; 
 };

  var getStates = function(){
     if (states === null){
       return $http.get(_GET_STATES_URL).then(function(response){
          states = response.data;
          return states;
      });
     }
     return states; 
  };

  var _setData = function(response){
    console.log('console.log...', response);
    return response.data;
  };

  var getProfileTypes = function(){
     if (profileTypes === null){
       return $http.get(_GET_PROFILE_TYPES_URL).then(function(response){
          profileTypes = response.data;
          return profileTypes;
      });
     }
     return profileTypes; 
  };

  var getDescTemplates = function(){
     if (descTemplates === null){
       return $http.get(_GET_DESC_TEMPLATES_URL).then(function(response){
          descTemplates = response.data;
          return descTemplates;
      });
     }
     return descTemplates;
  };

 
  return {
    getCategoriesList: getCategoriesList,
    getPaymentModes: getPaymentModes,
    getProducts: getProductList,
    getLanguages: getLanguages,
    getServiceRegions: getServiceRegions,
    getStates:getStates,
    getCities:getCities,
    getProfileTypes:getProfileTypes,
    getDescTemplates:getDescTemplates    
  };
  
}]);
 
