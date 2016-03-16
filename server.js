var express = require('express');
var fs = require('fs');
var _u = require("underscore");


var app = express();

var dictionary = [];
var possibleWords = [];


app.use(express.static(__dirname + '/'));


function loadDictionar() {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('data/word.lst')
    });

    lineReader.on('line', function (line) {
        dictionary.push(line);
    });
}

loadDictionar();

app.post('/newWord/:word', function(req, res){

    var subString = req.params.word.toLowerCase();
    var message = ''

    possibleWords = _u.filter(dictionary, function(word){
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
//    lineReader.on('line', function (line) {
//
//        if(line.toLowerCase() === word.toLowerCase()){
//            console.log(line + ' and ' + word + ' are aqual - GAME ENDS HERE !!!');
//        }
//        if(line.toLowerCase().startsWith(word.toLowerCase())){
//            console.log('These words: ' + line + ' starts with ' + word);
//        }
//    });


//        lineReader.on('line', function (line) {
//
//            if(word.length >= 4){
//                console.log('bigger then 4');
//            }else{
//                console.log('smaller then 4');
//            }

//            if(line.toLowerCase() === word.toLowerCase()){
//                console.log(line + ' and ' + word + ' are aqual - GAME ENDS HERE !!!');
//            } else
//            if(line.toLowerCase().startsWith(word.toLowerCase())){
//                console.log('These words: ' + line + ' starts with ' + word);
//            }else{
//                console.log('MORE THEN 4 LETTERS')
//            }
//        });

    res.status(200).send(message);;


});


app.listen(1234);
console.log('server running on port 1234');

