ghostApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, players) {

    $scope.players = players;

    $scope.selectPlayers = true;
    $scope.numberOfPlayers = 0;
    
    $scope.selectdPlayer = function (number) {
        $scope.numberOfPlayers = number;
        $scope.selectPlayers = false;
    };

    $scope.goBack = function () {
        $scope.players.player1 = '';
        $scope.players.player2 = '';
        $scope.numberOfPlayers = 0;
        $scope.selectPlayers = true;
    };

    $scope.disableBTN = function () {
        if ($scope.numberOfPlayers == 1) {
            if ($scope.players.player1.length > 0) {
                return false;
            }
        } else if ($scope.numberOfPlayers == 2) {
            if ($scope.players.player1.length > 0 && $scope.players.player2.length > 0) {
                return false;
            }
        }
        return true;
    };

    $scope.play = function () {
        if ($scope.numberOfPlayers == 1) {
            $scope.players.player2 = 'PC';
            $scope.players.number = 1;
        } else {
            $scope.players.number = 2;
        }
        $uibModalInstance.close();
    };
});