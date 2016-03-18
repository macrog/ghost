var ghostApp = angular.module('ghostApp', ['ui.router', 'ui.bootstrap']);

ghostApp.controller('AppCtrl', ['$scope', '$http', '$uibModal', '$window', function ($scope, $http, $uibModal, $window) {

        $scope.players = {};
        $scope.players.player1 = '';
        $scope.players.player2 = '';
        $scope.players.number = '';
        $scope.players.currentPlayer = '';
        $scope.game = {};
        $scope.game.end = false;
        $scope.game.player1plays = true;

        $scope.open = function () {
            var modalInstance = $uibModal.open({
                animation: true
                , templateUrl: 'views/welcomeModal.html'
                , controller: 'ModalInstanceCtrl'
                , size: 'lg'
                , keyboard: false
                , backdrop: 'static'
                , resolve: {
                    players: function () {
                        return $scope.players;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.game.turnControll();
            }, function () {

            });
        };
        //When loading the first time open welcome modal with game rules and player(s) input(s) name(s)
        $scope.open();
    }])
    .directive('wordBoard', function () {
        return {
            restrict: 'E'
            , templateUrl: 'views/wordboard.html'
        };
    })
    .directive('capitalize', function () {
        return {
            require: 'ngModel'
            , link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {
                    if (inputValue == undefined) inputValue = '';
                    var capitalized = inputValue.toUpperCase();
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]); // capitalize initial value
            }
        };
    })
    .directive('characterOnly', function () {
        return {
            require: 'ngModel'
            , link: function (scope, element, attr, ngModelCtrl) {
                var userInput = function (text) {
                    if (text) {
                        var transformedInput = text.replace(/[^a-zA-Z]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(userInput);
            }
        };
    });
