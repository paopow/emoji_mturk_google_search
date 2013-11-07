'use strict';

/* Controllers */
function getSearchUrl(query, start){
  // TODO: right now query is just one keyword
  var key = "AIzaSyDGpSyNvR1PEyuWnVn0SPQv_yeXhFdDEmg";
  var cx = "012731003498980769240%3Adzypydvp2lc";
  var searchtype = "image";
  var imgsz = "icon";
  var url = "https://www.googleapis.com/customsearch/v1?searchType="+searchtype+"&imgsz="+imgsz+"&q="+query+"&start="+start+"&cx="+cx+"&key="+key;
  return url;
}

var appModule = angular.module('myApp.controllers', []);

appModule.controller('TurkImgSelectCtrl', ['$scope','$routeParams','$window', '$http',
  	function($scope,$routeParams,$window, $http){

    var url = getSearchUrl('unicorn',1)
    console.log(url);
    $http.get(url).success(function(data) {
      $scope.images = data.items;
    });

}]);

