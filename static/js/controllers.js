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

appModule.controller('TurkImgSelectCtrl', ['$scope','$routeParams','$window', '$http','$location',
  	function($scope,$routeParams,$window, $http, $location){
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
    var startTime = Date.now();
    var assignmentId = $routeParams.assignmentId;
    var hitId = $routeParams.hitId;
    var workerId = $routeParams.workerId;
    $scope.numSelected = 0;
    var hashtag = $routeParams.keyword;
    $scope.keyword = keywordTable[hashtag]['key'];
    $scope.images = [];
    $http.get('static/data/'+keywordTable[hashtag]['file']).success(function(data){
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
        var endTime = Date.now();
        var results = {
          'assignmentId': assignmentId,
          'workerId': workerId,
          'hitId': hitId,
          'keyword': $scope.keyword,
          'startTime': startTime,
          'endTime': endTime
        };
        results['images'] = $scope.images.filter(function(x){
          return x.selected;
        });

        //save file
        // $http.post("/emoji/save_json", results).success(function(data){
        //     //Callback function here.
        //     //"data" is the response from the server.
        //     alert(data);
        // });
        $http({
                url: '/emoji/save_json',
                method: "POST",
                data: JSON.stringify(results),
                headers: {'Content-Type': 'application/json'}
              }).success(function (data) {
                  if(data=="success"){
                    var mturk = 'http://www.mturk.com/mturk/externalSubmit?assignmentId=';
                    var url = mturk + assignmentId + '&q='+hashtag + '&start='+startTime+'&endTime'+endTime;
                    $window.location.href = url;
                  }else{
                    alert("There was an error on our server. Please try submit again.");
                  }
              });

      }

    }

}]);

