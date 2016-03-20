ghostApp.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
    //console.log("Hello World from controller");
    $scope.wholeWord = '';
    $scope.lettersArray = [];
    $scope.submit = {};

    $scope.game.turnControll = function (word) {
        $scope.game.player1plays = !$scope.game.player1plays;
        if ($scope.players.number != 2) {
            if ($scope.game.player1plays) {
                //computer move
                $scope.players.currentPlayer = $scope.players.player2;
                //check a chances to win, get back a letter and submit to play
                $http.get('/calcWinGetLetter/' + word)
                    .then(function (response) {
                        //submit a PC letter with randome time 
                        var randomTime = _.random(1000, 3000);
                        //console.log(randomTime)                        
                        setTimeout(function () {
                            $scope.addLetter(response.data.letter);
                        }, randomTime);

                    })
                    .catch(function (error) {
                        console.log('ERROR!! calculateWin function' + JSON.stringify(error));
                    });

            } else {
                $scope.players.currentPlayer = $scope.players.player1;
            }
        }
    };

    $scope.addLetter = function (str) {
        if (str.length === 1 && str.match(/[a-z]/i)) {

            $scope.lettersArray.push(str);
            $scope.wholeWord += str;

            $http.post('/newWord/' + $scope.wholeWord)
                .then(function (response) {

                    $scope.message = response.data.message;
                    $scope.submit.letter = '';
                    if (!response.data.end) {
                        $scope.game.turnControll($scope.wholeWord);
                    } else {
                        $scope.message += $scope.players.currentPlayer + ' - lose the game!'
                        $scope.game.end = !$scope.game.end;
                    }

                })
                .catch(function (error) {
                    console.log('ERROR!! newWord function' + JSON.stringify(error));
                });

        } else {
            $scope.messageBox = 'Not a letter dude !';
            $scope.submit.letter = '';
        }
    };
    $scope.playAgain = function () {

        $http.post('/playAgain')
            .then(function (response) {
                $scope.submit.letter = '';
                $scope.wholeWord = '';
                $scope.lettersArray = [];
                //player one start the game
                $scope.game.player1plays = true;
                $scope.game.turnControll($scope.wholeWord);
                $scope.game.end = !$scope.game.end;
            })
            .catch(function (error) {
                console.log('ERROR!! playAgain function' + JSON.stringify(error));
            });
    };
    //check if 2 players, if not check if pc move or not ?
    $scope.pcMove = function () {
        if ($scope.players.number != 2) {
            if ($scope.game.player1plays === true) {
                return true;
            }
        } else {
            return false;
        }
    };
}]);