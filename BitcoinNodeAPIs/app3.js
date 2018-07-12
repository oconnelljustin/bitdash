var express = require("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");
var bitcore = require ("bitcore-lib");

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

app.get("/", function(req,res){
    res.sendfile(__dirname + "/index.html");
});

app.post("/wallet", function(req,res){
    var brainsrc = req.body.brainsrc;
    console.log(brainsrc);
    var input = new Buffer(brainsrc);
    var hash = bitcore.crypto.Hash.sha256(input);
    var bn = bitcore.crypto.BN.fromBuffer(hash);
    var pk = new bitcore.PrivateKey(bn).toWIF();
    var addy = new bitcore.PrivateKey(bn).toAddress();
    res.send("the brain wallet of: + brainsrc + <br>Addy: " + addy +"<br>PrivateKey: " + pk); 

});

//res.send("complete" + brainsrc);

app.listen(8081,function(){
    console.log("server");
});