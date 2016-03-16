ghostApp.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
    //console.log("Hello World from controller");
    $scope.wholeWord = '';
    $scope.lettersArray = [];

    $scope.playerName = 'ELizabeth';

    $scope.addLetter = function(str){
        debugger;
            if(str.length === 1 && str.match(/[a-z]/i)){

                $scope.lettersArray.push(str);
                $scope.wholeWord += str;
                $scope.submit.letter = '';
                $scope.turnControll();

                $http.post('/newWord/' + $scope.wholeWord)
                    .then(function(response){
                    debugger;
                    $scope.message = response.data;

                    })
                    .catch(function(error){
                    debugger;
                    });

                //console.log('thats a valid input: ' + str);
            }else{
                $scope.messageBox = 'Not a letter dude !';
                $scope.submit.letter = '';
            }

    }
}]);
