if(process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_prod');
} else {
    module.exports = require('./keys_dev');
}


//module.exports = {
  //  mongoURI: 
    //'mongodb://justin:justin26@ds131971.mlab.com:31971/bitnetworkerco'
    
//};