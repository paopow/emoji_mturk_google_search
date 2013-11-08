'use strict';

/* Controllers */
function getSearchUrl(query, start){
  // TODO: right now query is just one keyword
  var key = "AIzaSyAGSyPVoP7tTL72hZxvgqBNgIrAk1k4ENw";
  var cx = "012731003498980769240%3Adzypydvp2lc";
  var searchtype = "image";
  var imgsz = "icon";
  var url = "https://www.googleapis.com/customsearch/v1?searchType="+searchtype+"&imgsz="+imgsz+"&q="+query+"&start="+start+"&cx="+cx+"&key="+key;
  return url;
}


var appModule = angular.module('myApp.controllers', []);

appModule.controller('TurkImgSelectCtrl', ['$scope','$routeParams','$window', '$http',
  	function($scope,$routeParams,$window, $http){
      var keywordTable = {
        'unicorn': {
          'key':'Unicorn',
          'file':'images_url.json'
        },
        'taco': {
          'key':'Taco',
          'file':'images_url_taco.json'
        },
        'blonde': {
          'key':'Blonde girl',
          'file':'images_url_blonde.json'
        }
      };
    $scope.numSelected = 0;
    $scope.keyword = keywordTable[$routeParams.keyword]['key'];
    $scope.images = [];
    $http.get('static/data/'+keywordTable[$routeParams.keyword]['file']).success(function(data){
      $scope.images = data;
    });

  
    $scope.mouseHover = function(item){
      item.darken = true;

    };

    $scope.mouseLeave = function(item){
      item.darken = false;
    };

    $scope.selectToggle = function(item){
      if(item.selected == undefined){
        item.selected = true;
        $scope.numSelected = $scope.numSelected + 1;
      } else{
        item.selected = !item.selected
        if(item.selected){
          $scope.numSelected = $scope.numSelected+1;
        }else{
          $scope.numSelected = $scope.numSelected-1;
        }
      }
    };

    $scope.submitTask = function(){
      if($scope.numSelected != 3){
        alert("Please select only three best images. No more. No less.");
      }else{
        //save file
        //submit to mturk
      }

    }

}]);

