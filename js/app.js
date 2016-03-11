var ghostApp = angular.module('ghostApp', ['ui.router']);

ghostApp.controller('AppCtrl', ['$rootScope','$scope', '$http', function ($rootScope, $scope, $http) {

}])
.directive('wordBoard', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/wordboard.html'
    };
});
