ghostApp.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
    //console.log("Hello World from controller");
    $scope.wholeWord = '';
    $scope.lettersArray = [];
    $scope.submit = {};



    $scope.game.turnControll = function (word) {
        $scope.game.player1plays = !$scope.game.player1plays;
        if($scope.players.number != 2){
            if($scope.game.player1plays){
                //computer move
                $scope.players.currentPlayer = $scope.players.player2;

                //check a chances to win if there is a word
                $http.get('/calcWinGetLetter/' + word)
                    .then(function(response){

                        //play around set random letter before submiting response letter
                        $scope.setRandomCharacter(response.data.letter);

                    })
                        .catch(function(error){
                        console.log('ERROR!! calculateWin' + JSON.stringify(error));
                    });

                //if low get the fastes win
                //if high play longest possible word
            }else{
                $scope.players.currentPlayer = $scope.players.player1;
            }
        }
    };


    $scope.addLetter = function(str){
        if(str.length === 1 && str.match(/[a-z]/i)){

            $scope.lettersArray.push(str);
            $scope.wholeWord += str;


            $http.post('/newWord/' + $scope.wholeWord)
                .then(function(response){

                    $scope.message = response.data.message;
                    $scope.submit.letter = '';
                    if(!response.data.end){
                        $scope.game.turnControll($scope.wholeWord);
                    }else{
                        $scope.message += ' player ' + $scope.players.currentPlayer + ' LOOSE the game!'
                        $scope.game.end = !$scope.game.end;
                    }

                })
                .catch(function(error){
                    console.log('ERROR!! newWord' +  JSON.stringify(error));
                });

        }else{
            $scope.messageBox = 'Not a letter dude !';
            $scope.submit.letter = '';
        }
    };
    $scope.playAgain = function(){
        $scope.game.end = !$scope.game.end;
        $http.post('/playAgain' )
            .then(function(response){

                $scope.message = response.data.message;
                $scope.submit.letter = '';
                $scope.wholeWord = '';
                $scope.lettersArray = [];
                //player one start the game
                $scope.game.player1plays = true;
                $scope.game.turnControll($scope.wholeWord);
            })
            .catch(function(error){
                console.log('ERROR!! playAgain' +  JSON.stringify(error));
            });
    };
    $scope.test = function(){
        $scope.submit.letter = "M";
    }
    $scope.setRandomCharacter = function(letter) {
        debugger;
        var chars = 'abcdefghijklmnopqrstuvwxyz';
        var random = chars.substr(Math.floor(Math.random() * 26), 1);
        $scope.submit.letter = random.toUpperCase();

        setTimeout(function(){
            $scope.addLetter(letter);
        }, 4000);

    };
}]);
