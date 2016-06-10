ghostGame.service("httpService", function( $http, $q ) {
        // Return public API.
        return({
            calculateWinAndGetLetter: calculateWinAndGetLetter,
            addLetter: addLetter,
            playAgain: playAgain
        });
        // ---
        // PUBLIC METHODS.
        // ---
        // calculate win percentage and get letter to submit
        function calculateWinAndGetLetter(word) {
            var request = $http({
                method: "get",
                url: "/calcWinGetLetter/" + word
            });
            return( request.then( handleSuccess, handleError ) );
        };
        // adds a letter to an existnig word
        function addLetter(wholeWord) {
            var request = $http({
                method: "post",
                url: "/newWord/" + wholeWord
            });
            return( request.then( handleSuccess, handleError ) );
        };
        //rester dictionary and set to play again
        function playAgain() {
            var request = $http({
                method: "post",
                url: "/playAgain"
            });
            return( request.then( handleSuccess, handleError ) );
        };

        // ---
        // PRIVATE METHODS.
        // ---
        function handleError( response ) {
            // The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (! angular.isObject( response.data ) || ! response.data.message){
                return( $q.reject( "An unknown error occurred." ) );
            }
            // Otherwise, use expected error message.
            return( $q.reject(respons) );
        }
        // Successful response
        function handleSuccess( response ) {
            return(response);
        }
    }
);
