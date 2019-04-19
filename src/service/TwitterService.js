'use strict';

const Twitter = require('twitter');

const client = new Twitter({
    // consumer_key: process.env.TWITTER_CONSUMER_KEY,
    // consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    // access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    // access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
});

const pesquisarTweetsPorHashtag = (hashtag, callback) => {
    let param = {
        q: hashtag
    };
    
    try {
        client.get('search/tweets', param, function(error, tweets, response) {
            if(error) {
                callback(error, null)
            }else {
                callback(null, tweets);
            }
        });

    }catch(e) {
        console.error('Erro ao tentar pesquisar os Tweets pela hashtag: ' + hashtag, e);
        callback(e, null);
    }
};

module.exports = { pesquisarTweetsPorHashtag };