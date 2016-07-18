var app = angular.module('xhibit', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('http://shenkar.html5-book.co.il/2015-2016/ws1/dev_181/xhibit.html', {
            controller: 'ctrl'
        })
        .when('http://shenkar.html5-book.co.il/2015-2016/ws1/dev_181/xhibit.html/:num', {
            controller: 'exhibitCtrl'
        })
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        })
        .otherwise({
            redirectTo: '/xhibit.html'
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false,
            rewriteLinks: false
        });
});

app.controller('ctrl', function() {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!111");
});

app.controller('exhibitCtrl', function($scope, $http, $location, $cookies, $sce, $q) {
    $scope.requestedExhibit = $location.path().substring(13);

    $http.get('https://mini-israel-server.herokuapp.com/xhibit/' + $scope.requestedExhibit).then(function(response){
        $scope.exhibit = response.data;
        $scope.getUser();
        $scope.addWatch($scope.requestedExhibit);
    });

    $scope.getUser = function () {
        $scope.userName = $cookies.get('googleUser');
        $scope.userEmail = $cookies.get('googleEmail');
    };

    $scope.getImage = function(){  //change the heart icon on click
        var deafultImg = "heartDisabled.png";
        var img = angular.element(document.getElementById('like')).css('backgroundImage');
 
        if( img.indexOf(deafultImg) >= 0){
            return 'url(images/heartEnabled.png)';
        }
        else return 'url(images/heartDisabled.png)';
    };

    $scope.addLike = function (likedExhibit) {
        var body = {
            email: $scope.userEmail,
            like: likedExhibit
        };

        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };

        $http.post('https://mini-israel-server.herokuapp.com/ws/addLike', body).success(function (data, status, headers, config) {
            console.log("SUCCESS 200!");
            $scope.getIfLiked();
        }).error(function (data, status, headers, config) {
            console.log("ERROR!!" + status);
        });         
    };

    $scope.addWatch = function (watchedExhibit) {
        var body = {
            email: $scope.userEmail,
            watched: watchedExhibit
        };

        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };

        $http.post('https://mini-israel-server.herokuapp.com/ws/addWatched', body).success(function (data, status, headers, config) {
        }).error(function (data, status, headers, config) {
        });         
    };

    $scope.getUser = function () {
        $scope.userName = $cookies.get('googleUser');
        $scope.userEmail = $cookies.get('googleEmail');
        $scope.getIfLiked();
    };

    $scope.addUser = function () {
        var body = {
            name: $scope.userName,
            email: $scope.userEmail
        };

        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };

        $http.post('https://mini-israel-server.herokuapp.com/ws/saveUser', body).success(function (data, status, headers, config) {
        }).error(function (data, status, headers, config) {
        });          
    };
    
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
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
            console.log("mail!: " + $scope.userEmail);
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

    $scope.getIfLiked = function() {
        $scope.isLiked($scope.requestedExhibit).then(function(data) {
            if (data) angular.element(document.getElementById('like')).css('background-image','url(images/heartEnabled.png)');
            else angular.element(document.getElementById('like')).css('background-image','url(images/heartDisabled.png)');
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

