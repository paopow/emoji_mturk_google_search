'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/:keyword',{
    templateUrl:'static/partials/turk_img_select.html',
    controller: 'TurkImgSelectCtrl'
  });

  $routeProvider.otherwise({redirectTo: '/'});
}]);
