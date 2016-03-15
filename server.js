var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/'));

app.listen(1234);
console.log('server running on port 1234');


//can it be extened to word
//is it 4+ letetrs
//is it a word or can it be extended to one
app.post('/newWord/:word', function(req, res){

    var word = req.params.word;
    console.log('word : ' + word + ' *****');

    check(word);
    check1();
    check2();


});

function check(str){
    var word = "Hello World!";
    var subString = str;

    if(word.toLowerCase().startsWith(subString.toLowerCase())){
        console.log('check 1 yessss ' + word + ' starts with ' + str);
    }
}

function check1(){
    console.log('check 2');
}

function check2(){
    console.log('check 3');
}
