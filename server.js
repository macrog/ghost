var express = require('express');
var fs = require('fs');
var _u = require("underscore");
var open = require('open');

var portNumber = 2255;

var app = express();

var dictionary = [];
var possibleWords = [];
var uniqArray = [];

app.use(express.static(__dirname + '/'));


function loadDictionar() {
    //create a read line interface with a stream
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('data/word.lst')
    });
    //lineReader goes async
    lineReader.on('line', function (line) {
        dictionary.push(line);
    });
    //lineReader finish, run function to select a uniq words only.
    lineReader.on('close', function(){
        selectUniqWords();
    });
};
function selectUniqWords(){
    // loop through the array and get only the uniq words out.
    for(var i = 0; i < dictionary.length; i ++){
        var word = dictionary[i];

//        if(word.toLowerCase().startsWith('aal')){
//            console.log('1 ' + word);
//        }

        if(word.length >= 4){
            var previousWord = dictionary[i-1];
//            if(word.toLowerCase().startsWith('aal')){
//            console.log('2 ' + previousWord);
//            console.log(('3 ' + !word.toLowerCase().startsWith(previousWord)));
//            console.log('4 ' + !word.toLowerCase().startsWith(uniqArray[uniqArray.length-1]));
//            }
            if(previousWord.length > 4 ){
                if((!word.toLowerCase().startsWith(previousWord)) && (!word.toLowerCase().startsWith(uniqArray[uniqArray.length-1]))){
                    uniqArray.push(word);
                }
            }
        }
    }
    console.log(uniqArray);
};

app.post('/newWord/:word', function(req, res){

    var subString = req.params.word.toLowerCase();
    var message = '';

    possibleWords = _u.filter(dictionary, function(word){
        return word.toLowerCase().startsWith(subString);
    });
    uniqArray = _u.filter(uniqArray, function(word){
        return word.toLowerCase().startsWith(subString);
    });

    var match = _u.find(possibleWords, function(word){
        return word === subString;
    });

    if(possibleWords.length === 0){
        console.log('Not a word on a list - GAME ENDS');
        message = 'Not a word on a list - GAME ENDS';
    }else{
        console.log(possibleWords);
    }

    if(subString.length >= 4){
        // is it a word or can it be extended to one
        console.log(possibleWords);
        if(match){
            console.log('Exact match found on a list - GAME ENDS : ' + match);
            message = 'Exact match found on a list - GAME ENDS : ' + match;
        }
    }

    res.status(200).send(message);;

});

app.get('/calculateWin/:word', function(req, res){

    var curentString = req.params.word.toLowerCase();

    console.log('UniqWords : '  + uniqArray);
    var total = uniqArray.length;
    console.log('Total words: '  + total);



    var winWords = _u.filter(uniqArray, function(word){
        return word.length % 2 === 0;
    });
    console.log('win words: '  + winWords.length);
    var percetage = winWords.length * 100 / total;
    console.log('Winnnign words: ' + winWords);
    console.log('percetage: '  + percetage);
    var obj = {'percentage:' : percetage};

    res.status(200).send(obj);;

});

//app.get('/getLetter', function(req, res){
//    var message = '';
//
//    res.status(200).send(message);;
//
//});

//_u.each(dictionary, function(word){
//    console.log('3');
//    if(word.length >= 4){
//        var match = _u.find(possibleWords, function(word){
//            return word === subString;
//        });
//
//        if(match){
//            _u.each(dictionary, function(uniq){
//
//                if(uniq.toLowerCase().startsWith(match)){
//                    console.log(uniq);
//                }
//            });
//        }
//    }
//});


app.listen(portNumber);
console.log('server running on port ' + portNumber);
//open('http://localhost:' + portNumber );

loadDictionar();

