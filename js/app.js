var ghostApp = angular.module('ghostApp', ['ui.router', 'ui.bootstrap']);

ghostApp.controller('AppCtrl', ['$rootScope','$scope', '$http', '$uibModal', function ($rootScope, $scope, $http, $uibModal) {
    
    $scope.open = function () {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'views/welcomeModal.html',
      controller: 'ModalInstanceCtrl',
      size: 'lg',
        backdrop: 'static',
      resolve: {
        items: function () {
          return $scope.playerName;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  };
    
    $scope.open();
}])
.directive('wordBoard', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/wordboard.html'
    };
})
.directive('capitalize', function() {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
           if(inputValue == undefined) inputValue = '';
           var capitalized = inputValue.toUpperCase();
           if(capitalized !== inputValue) {
              modelCtrl.$setViewValue(capitalized);
              modelCtrl.$render();
            }         
            return capitalized;
         }
         modelCtrl.$parsers.push(capitalize);
         capitalize(scope[attrs.ngModel]);  // capitalize initial value
     }
   };
})
.directive('characterOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            var userInput = function(text) {
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