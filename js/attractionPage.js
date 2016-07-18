var app = angular.module('attractionPage', []);

var model;

app.controller('attractionCtrl', function($scope, $http) {
    $http.get('https://mini-israel-server.herokuapp.com/ws/getExhibits').then(function(response){
        $scope.exhibits = response.data;
    });

    $http.get('https://mini-israel-server.herokuapp.com/ws/getAttractions').then(function(response){
        $scope.attractions = response.data;
    });

    $scope.getExhibit = function(name) {
        var result = null;
        angular.forEach($scope.exhibits, function(exhibit) {
            if (exhibit.name === name && !result) {
                result = exhibit.nameId;
            }
        });
        return result;
    };

});