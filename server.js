var express = require('express');
var fs = require('fs');
var _u = require("underscore");
var open = require('open');

var portNumber = 2255;

var app = express();

var dictionary = [];
var possibleWords = [];
var uniqueDictionary = [];

app.use(express.static(__dirname + '/'));

app.post('/newWord/:word', function(req, res){

    var subString = req.params.word.toLowerCase();
    var resObj = {};

    uniqueDictionary = _u.filter(uniqueDictionary, function(word){
        return word.toLowerCase().startsWith(subString);
    });

    var match = _u.find(uniqueDictionary, function(word){
        return word === subString;
    });

    if(uniqueDictionary.length === 0){
        console.log(log('Not a word on a list - GAME ENDS'));
        resObj = {'message' : 'GAME OVER\n' + subString.toUpperCase() + ' - its not a word\n',
                  'end':true,
                  'definition':false
                 };
    }

    if(subString.length >= 4){
        if(match){
            console.log(log('Exact match found on a list - GAME ENDS : ' + match));
            resObj = { 'message' : 'GAME OVER\n You have completed the spelling of: ' + match.toUpperCase() + '\n',
                        'end':true,
                        'definition':true
                     };
        }
    }

    res.status(200).send(resObj);;

});

app.get('/calcWinGetLetter/:word', function(req, res){

    var currentString = req.params.word.toLowerCase();
    var resObj = {};

    var total = uniqueDictionary.length;

    var winWords = _u.filter(uniqueDictionary, function(word){
        return word.length % 2 != 0;
    });

    var percent = 100 - (winWords.length * 100 / total);

    if(winWords.length === 0){
        var random = random_character()
        resObj = {'letter': random};
        console.log("random_character: " + random);
    }else{
        if(percent > 45) {
            var randomWord = winWords[Math.floor(Math.random() * winWords.length)];
            var char = randomWord.substring(currentString.length, currentString.length+1);
            resObj = {'letter':char};
            console.log("randomWord " +randomWord);
        }else{
            var longestWord = _u.max(winWords, function(word){
                return word.length;
            });
            var char = longestWord.substring(currentString.length, currentString.length+1);
            resObj = {'letter':char};
            console.log("longestWord " + longestWord);
        }
    }
    res.status(200).send(resObj);

});

//play agin, reset the uniqueDictionary
app.post('/playAgain', function(req, res){
    var resObj = {};

    selectUniqueWords();

    resObj = { 'message' : 'Ready to play again. Good Luck',
              'end':false
             };

    res.status(200).send(resObj);
});

app.listen(portNumber);
console.log(log('Server running on port ' + portNumber));
open('http://localhost:' + portNumber );


/**************** PRIVATE FUNCTIONS ***************/
function loadDictionar() {
    //create a read line interface with a stream
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('data/words.lst')
    });
    //lineReader goes async
    lineReader.on('line', function (line) {
        dictionary.push(line.toLowerCase());
    });
    //lineReader finish, run function to select a unique words only.
    lineReader.on('close', function(){
        selectUniqueWords();
    });
};
function selectUniqueWords(){
    // loop through the array and get only the unique words out.
    for(var i = 0; i < dictionary.length; i ++){
        var word = dictionary[i];
        if (word.length >= 4) {
            var previousWord = dictionary[i-1];

            if(!previousWord){
                //console.log('No previous word');
                previousWord = '';
            }

            if (previousWord.length > 4 ) {
                if (!word.startsWith(uniqueDictionary[uniqueDictionary.length - 1])){
                    uniqueDictionary.push(word);
                }
            }else {
                if(!word.startsWith(uniqueDictionary[uniqueDictionary.length - 1])){
                    uniqueDictionary.push(word);
                }
            }
        }
    }
    // just for a stats, check percentage of odd and even lenght of a uniqueDictionary words.
    var odd = _u.filter(uniqueDictionary, function(word){
        return word.length % 2 !== 0;
    });
    var oddPercent = decimalDisplay(odd.length * 100 / uniqueDictionary.length);

    var even = _u.filter(uniqueDictionary, function(word){
        return word.length % 2 === 0;
    });
    var evenPercent = decimalDisplay(even.length * 100 / uniqueDictionary.length);


    console.log(log('uniqueDictionary created, ' + uniqueDictionary.length + ' words available. ' + odd.length + ' (' + oddPercent +'%) words with odd lenght of a word and ' + even.length + ' (' + evenPercent +'%) even lenght. Have fun!'));
};
function log(str){
    return 'NODE SERVER: \x1b[31m ' + str + ' \x1b[37m';
};
function decimalDisplay(number){
    return parseFloat(Math.round(number * 100) / 100).toFixed(2);
};
function random_character() {
    var chars = 'abcdefghijklmnopqrstuvwxyz';
    return chars.substr(Math.floor(Math.random() * 26), 1);
};
//on server start trigger dictionary load
loadDictionar();

