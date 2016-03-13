ghostApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

  

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});