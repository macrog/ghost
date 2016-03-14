var ghostApp = angular.module('ghostApp', ['ui.router', 'ui.bootstrap']);

ghostApp.controller('AppCtrl', ['$rootScope', '$scope', '$http', '$uibModal', 'laodDic', function ($rootScope, $scope, $http, $uibModal, laodDic) {
        $scope.player1plays = true;
        $scope.players = {};
        $scope.players.player1 = '';
        $scope.players.player2 = '';

        $scope.open = function () {

            var modalInstance = $uibModal.open({
                animation: true
                , templateUrl: 'views/welcomeModal.html'
                , controller: 'ModalInstanceCtrl'
                , size: 'lg'
                , backdrop: 'static'
                , resolve: {
                    players: function () {
                        return $scope.players;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.turnControll ();
            }, function () {

            });
        };

        $scope.turnControll = function () {

            $scope.player1plays = !$scope.player1plays;

        };
        //    laodDic.getDic()
        //        .then(function(res){
        //
        //            var array = res.data.split("\n");
        //
        //            for(var i = 0; i <array.length; i++){
        //                var substring = 'abando';
        //                if(array[i].indexOf(substring) > -1){
        //
        //                    console.log(array[i]);
        //                }
        //            }
        //
        //            var erliestEnt = _.min(array, function(str){
        //                if(str.length > 0){
        //                    var d = str.length;
        //                    return d;
        //                }
        //            });
        //            var longest = array.sort(function (a, b) { return b.length - a.length; })[0];
        //        })
        //        .catch(function(err){debugger});
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
    })
    .service('laodDic', ['$http', '$q', function ($http, $q) {

        var dic = {
            getDic: function () {
                var defferd = $q.defer();
                $http.get('data/word.lst')
                    .then(function (response) {
                        defferd.resolve(response);
                    })
                    .catch(function (error) {
                        defferd.reject(error);
                    });

                return defferd.promise;
            }
        };
        return dic;

}]);
