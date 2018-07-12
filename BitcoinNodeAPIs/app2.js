var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

request({
    url: "https://blockchain.info/stats?format=json",
    json: true
}, function(error, response, body){
    btcPrice = body.market_price_usd;
    btcBlocks = body.n_blocks_total;

});

app.get("/", function(req,res){
res.send("bitcoin: " + btcPrice);
});

app.get("/block", function(req,res){
    res.sendfile("/index.html");
    
    res.send("current blockHeight: " + btcBlocks);
    });

app.listen(8080, function(){
    console.log("server");
});