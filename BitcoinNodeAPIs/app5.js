var express = require ("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");
var bitcore = require("bitcore-lib");

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set("view engine", "ejs");

function brainWallet(uinput, callback){
    var input = new Buffer(uinput);
    var bn = bitcore.crypto.BN.fromBuffer(hash)
    var pk = new bitcore.PrivateKey(bn).toAddress();
    callback (pk, addy);
};

app.get("/", function(req,res){
    res.render("index5.ejs");

});

app.post("/wallet", function(req,res){
    var brainsrc = req.body.brainsrc;
    console.log(brainsrc);
    brainWallet(brainsrc, function(priv, addr){
        res.send("The Brain wallet of: "+brainsrc + "<br>Addy:" + " addr = <br>Private Key: " +priv);
    });
});