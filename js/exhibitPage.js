var app = angular.module('exhibitPage', ['ngCookies']);

var model;

app.run(function($http) {
    $http.get('https://mini-israel-server.herokuapp.com/ws/getExhibits').success(function(data) {
        model = data;
    });
});

app.controller('exhibitCtrl', function($scope, $http,  $cookies, $q) {

    $http.get('https://mini-israel-server.herokuapp.com/ws/getExhibits').then(function(response){
        $scope.exhibits = response.data;
        $scope.getUser();
    });

    $scope.getUser = function () {
        $scope.userName = $cookies.get('googleUser');
        $scope.userEmail = $cookies.get('googleEmail');
    };

    $scope.isLiked = function(exhibit) {
        var defer = $q.defer();
        var body = {
            email: $scope.userEmail,
            exhibit: exhibit
        };
        
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };

        $http.post('https://mini-israel-server.herokuapp.com/ws/isLiked', body).success(function (data, status, headers, config) {
            console.log("SUCCESS 200!");
            defer.resolve(data.liked);
            
        }).error(function (data, status, headers, config) {
            console.log("ERROR!!" + status);
            window.data = data.liked;
        });
        return defer.promise;
    };

    $scope.isWatched = function(exhibit) {
        var defer = $q.defer();
        var body = {
            email: $scope.userEmail,
            exhibit: exhibit
        };
        
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };

        $http.post('https://mini-israel-server.herokuapp.com/ws/isWatched', body).success(function (data, status, headers, config) {
            console.log("SUCCESS 200!");
            defer.resolve(data.watched);
            
        }).error(function (data, status, headers, config) {
            console.log("ERROR!!" + status);
            window.data = data.watched;
        });
        return defer.promise;
    };

    $scope.getIfLiked = function(exhibit) {
        $scope.isLiked(exhibit).then(function(data) {
            var element = "heart-" + exhibit;
            if (data) angular.element(document.getElementById(element)).css('background-image','url(images/heartEnabled.png)');
            else angular.element(document.getElementById(element)).css('background-image','url(images/heartDisabled.png)');
        });
    };

    $scope.getIfWatched = function(exhibit) {
        $scope.isWatched(exhibit).then(function(data) {
            var element = "watched-" + exhibit;
            console.log(element + " is " + data);
            if (data) angular.element(document.getElementById(element)).css('background-image','url(images/eye-icon.png)');
            else angular.element(document.getElementById(element)).css('display','none');
        });
    };

});

app.directive('myDirective', function(){
  return {
    restrict: "A",
    scope: {
      myDirective: '=',
      ctrlFunc: '&callbackFn'
    },
    link: function(scope, element, attrs) {
        scope.ctrlFunc({exhibit: scope.myDirective});
    }
  };
});

app.directive('myDirective2', function(){
  return {
    restrict: "A",
    scope: {
      myDirective: '=',
      ctrlFunc: '&callbackFn'
    },
    link: function(scope, element, attrs) {
        scope.ctrlFunc({exhibit: scope.myDirective2});
    }
  };
});