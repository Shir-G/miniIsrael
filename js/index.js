var app = angular.module('index', ['ngCookies', 'ngRoute']);

app.config(function($routeProvider){
    
        $routeProvider.when('/xhibit.html/:nameId', {
            templateUrl: 'http://shenkar.html5-book.co.il/2015-2016/ws1/dev_181/xhibit.html',
        })
        
        // .when('/resume', {
        //     templateUrl: '../views/mains/resume.html',
        //     controller: 'resumeCtrl.js',
        //     controllerAs: 'resume'
        // })
               
        // .when('/protfolio', {
        //     templateUrl: '../views/mains/protfolio.html',
        // })

        // .when('/contact', {
        //     templateUrl: '../views/mains/contact.html',
        // })
        
        // .when('/', {
        //     templateUrl: '../views/mains/index.html',
        // })
        
        .otherwise({ redirectTo: '/'});
    
});

app.controller('indexCtrl', function($scope, $http, $cookies) {

    $scope.getUser = function () {
    	$scope.userName = $cookies.get('googleUser');
    	$scope.userEmail = $cookies.get('googleEmail');
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

    	$http.post('hhttps://mini-israel-server.herokuapp.com/ws/saveUser', body).success(function (data, status, headers, config) {
	        console.log("SUCCESS 200!");
	    }).error(function (data, status, headers, config) {
	    	console.log("ERROR!!");
	    });          
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
	    }).error(function (data, status, headers, config) {
	    	console.log("ERROR!!" + status);
	    });          
    };

    $scope.addWatched = function (watchedExhibit) {
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
	        console.log("SUCCESS 200!");
	    }).error(function (data, status, headers, config) {
	    	console.log("ERROR!!" + status);
	    });          
    };

});