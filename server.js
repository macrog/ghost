var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/'));

app.listen(1234);
console.log('server running on port 1234');


app.post('/newWord/:word', function(req, res){

    var word = req.params.word;
    console.log('word : ' + word + ' *****');

    
    fs.readFile('data/word.lst', function (err, data) {
        if (err){ 
            console.log("error");
            throw err; 
        }
       var array = data.split("\n");

        for(var i = 0; i <array.length; i++){
            var substring = 'why';
            if(array[i].indexOf(substring) > -1){

                console.log(array[i]);
            }
        }
    });
    
    if(word.length >= 4 ){
        //is it a word or can it be extended to one
    }else{
        //can it be extened to word
    }
    


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
