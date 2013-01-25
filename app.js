app = require('express.io')()
app.http().io()

// build realtime-web app

app.listen(7076)

var Twit = require('twit')

var T = new Twit({
    consumer_key:         'DiSK7MMmimS6y7NWiyiSw'
    , consumer_secret:      '3Z4pOlUdaj7X33P88A6vn1E02eCUF7BqhBJgC9ZYro'
    , access_token:         '1115123365-SebkwfKZWxfIFtVgLQsMQrvGzsNWuyHCWlig6jk'
    , access_token_secret:  'i55NIccj45ctyZnTYWq4JiO0LU936kOESh2NJuPo'
})





app.io.route('ready', function(req) {
    req.io.emit('talk', {
        message: 'hello world'
    });

    T.stream('statuses/filter', { track: [req.data[0],req.data[1]] })
        .on('tweet', function (tweet) {
        if(tweet.text.toLowerCase().search(req.data[0]) > -1 ){
            req.io.emit('tweet',[tweet.text,req.data[0]]);
        }else{
            req.io.emit('tweet2',[tweet.text,req.data[1]]);
        }
    });
});





app.get('/', function(req, res) {
    res.sendfile(__dirname + '/views/client.html');
});