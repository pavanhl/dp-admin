(function () {
  'use strict';
  var fileSelectFunc = function ($timeout, DIMENSIONS, $q, $window,ModalMessageService) {

        var getNewDimensions = function (image) {
            var tempW = image.width;
            var tempH = image.height;
            if (tempW > tempH) {
                if (tempW > DIMENSIONS._MAX_WIDTH) {
                    tempH *= DIMENSIONS._MAX_WIDTH / tempW;
                    tempW = DIMENSIONS._MAX_WIDTH;
                }
            } else {
                if (tempH > DIMENSIONS._MAX_HEIGHT) {
                    tempW *= DIMENSIONS._MAX_HEIGHT / tempH;
                    tempH = DIMENSIONS._MAX_HEIGHT;
                }
            }

            return {
                width: tempW,
                height: tempH
            };
        };
        var dataURLToBlob= function(dataURL) {
            var BASE64_MARKER = ';base64,';
            if (dataURL.indexOf(BASE64_MARKER) == -1) {
                var partsObj = dataURL.split(',');
                var contentTypeObj = partsObj[0].split(':')[1];
                var rawObj = partsObj[1];
                return new Blob([rawObj], {type: contentTypeObj});
            }

            var parts = dataURL.split(BASE64_MARKER);
            var contentType = parts[0].split(':')[1];
            var raw = $window.atob(parts[1]);
            var rawLength = raw.length;

            var uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }

            return new Blob([uInt8Array], {type: contentType});
        };


        var getScaledImage = function (image,type) {
            var newDimensions = getNewDimensions(image);
            var canvas = angular.element('<canvas id="dummy_canvas" class="hidden" ></canvas>')[0];
            canvas.width = newDimensions.width;
            canvas.height = newDimensions.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, newDimensions.width, newDimensions.height);
            var deferred = $q.defer();
            /*if (canvas.toBlob){
               canvas.toBlob(
                    function (blob) {
                     deferred.resolve(blob)
                    },
                    type
                )
            }*/
            var blob = dataURLToBlob(canvas.toDataURL(type));
            deferred.resolve(blob);
            return deferred.promise;
        };

	var _getFileType = function(name){
	  var type = name.substring(name.lastIndexOf('.')+1,name.length);
	  if (type === 'png'){
		return 'image/png';	
	  }
	  return 'image/jpeg';
  	}; 

	var showMessage = function(message){
		ModalMessageService.open({
        			resolve: {
          				isSuccessful: function(){
            					return false; 
          				},
          				successMessage: function(){
            					return "Image Saved";            
          				},
          				errorMessage: function(){
            					return message;
          				},
          				closeFunc: function(){
            					return function(){};
          				}
        			}
        		});
	};

	var isFileValid = function(file,scale,size,w,h,fileHeight,fileWidth){
		var fileSize = Math.floor(file.size/1024);
		if (size !== undefined && fileSize > size){
	 		showMessage("Please select an image within "+size+scale);
			return false;
		};
		if ((h !== undefined && w != undefined) && (parseInt(h) !== fileHeight || parseInt(w) !== fileWidth)){
			showMessage("Please select an image of dimensions "+ w + "x" + h);
			return false;
		};
		return true;		 
	};

        var link = function (scope, element,attrs) {
            element.on("change", function () {
                scope.isUploading = true; 
                var file = element[0].files[0];
                                var tempImage = new Image();
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function () {
                    tempImage.src = reader.result;		    
                };
                angular.element(tempImage).on('load', function () {  		    
		    if (!isFileValid(file,attrs.scale,attrs.maxSize,attrs.fileWidth,attrs.fileHeight, this.height,this.width)){
				return;
		    };
		    var promise = getScaledImage(tempImage,_getFileType(file.name));
                    promise.then(function(blob){
                        blob.name = file.name;
			scope[attrs.controller].upload(blob,attrs.uploadType);
                    });
                });
            });
        };
        return {
            link: {
	           pre: link
	 	        }
        };
  };


  angular.module('CommonDirectiveModule',['ModalMessageModule'])
    .constant('DIMENSIONS', {_MAX_WIDTH: 100,_MAX_HEIGHT: 100})
    .directive("fileSelect", ['$timeout', 'DIMENSIONS', '$q','$window','ModalMessageService',fileSelectFunc]) 
    .directive('a', function () {
          return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
              if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function (e) {
                  console.log('clickinggggg');
                  e.preventDefault();
                  e.stopPropagation();
                });
              }
            }
          };
  })
  
  .directive('autoSuggest', ['$compile', function($compile) {
 /* Auto suggest directive uses bootstrap typeahead to suggest the regions
   * Input:   <auto-suggest regions="regions" ng-model="region" limit="8"></auto-suggest>
   * regions - An array of regions - ['Karnataka', 'Kerala', 'Delhi'];
   * limit - number of suggestions to show
   * Dependency - assets/bower_components/angular-bootstrap/ui-bootstrap-tpls.js
   *            - assets/css/bootstrap.min.css
   */     var link = function(scope, element, attrs) {
      element.html('<input type="text" typeahead="region for region in {{regions}} | filter: $viewValue | limitTo: {{limit}}" ng-model="region">');
      $compile(element.contents())(scope);
    };
    return {
      link: link,
      restrict: 'E', 
      replace: true,
      transclude: true,
      scope: {
        limit: '=',
        regions: '='
      }
    };
  }])
.directive('preLoadImage', function() {
  return {
    restrict: 'A',
    scope: {
      fileInfo: '='
    },
    link: function(scope, element, attrs) {
      var width = attrs.width;
      var height = attrs.height;
      scope.$watch('fileInfo', function(info, info0) {
        var file = info;
        var options = {
          maxWidth:width,minWidth:width,maxHeight:height,
          minHeight:height,cover:true,crop:true
        };
        loadImage(file,function(img){
          if(img.type !== "error"){
            element.replaceWith(img);
          }else{
            console.log('load error');
          }
        },options);
      });
    }
  };
})
.directive('hideCategory', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.click(function() {
       var open = $(attrs.hideCategory).hasClass('open');
       if(open) {
         $(attrs.hideCategory).removeClass('open');
       }else {
         $(attrs.hideCategory).addClass('open');
       }
      });
    }
  };
});
})();
