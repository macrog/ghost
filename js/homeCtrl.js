ghostApp.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
    //console.log("Hello World from controller");
    $scope.word = ['o','a'];

    $scope.playerName = 'ELizabeth';

    $scope.addLetter = function(str){

            if(str.length === 1 && str.match(/[a-z]/i)){
                $scope.word.push(str);
                $scope.submit.letter = '';
                $scope.turnControll();
                console.log('thats a valid input: ' + str);
            }else{
                $scope.messageBox = 'Not a letter dude !';
                $scope.submit.letter = '';
            }

    }
}]);
