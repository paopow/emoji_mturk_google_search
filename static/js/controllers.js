'use strict';

/* Controllers */

var appModule = angular.module('myApp.controllers', []);

appModule.controller('TurkImgSelectCtrl', ['$scope','$routeParams','$window', '$http',
  	function($scope,$routeParams,$window, $http){
    $http.get('static/data/images_url.json').success(function(data) {
      $scope.images = data;
    });

}]);

