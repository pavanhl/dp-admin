
(function(){

var homeCtrl = function(){
  var vm = this;
  
  var _init = function(){
    console.log("in home ctrl");
  };

  _init();
};

angular.module('admin.home',[])
 .controller('homeCtrl',[homeCtrl])
})();