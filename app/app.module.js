/*The app.module.js file will handle the setup of the app, load in AngularJS dependencies and so on.*/

(function() {
  'use strict';

 var initService = function(){
   console.log('App is initialized');
 };

 var configService = function($routeProvider,VIEWS){
   var config = {
     routes: function($routeProvider){
       $routeProvider
         .when(VIEWS.HOME.path, VIEWS.HOME.routeParams)
        .otherwise({redirectTo: '/home'});     
     }
   };
  config.routes($routeProvider);   
  };

  var pathConstants = {
         DEFAULT:{path: '/home'},
         HOME:{
            path: '/home',
               routeParams:{ 
                      controller: 'homeCtrl',
                      templateUrl: 'modules/home/home.tpl.html'
               }
         }

   };

  function appCtrl($route,$rootScope){
        $rootScope.$on('$routeChangeSuccess',function(event) {
            console.log('changing route Params'); 
                 
       });
  };

angular.module('adminApp',['ngRoute','admin.home'])
  .constant('VIEWS',pathConstants)
  .config(['$routeProvider','VIEWS', configService])
  .run(initService)
  .controller('appCtrl',['$route','$rootScope',appCtrl]);
})();


