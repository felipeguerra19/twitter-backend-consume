'use strict';

const config = require('../application.json');
const TwitterService = require('../service/TwitterService');
const TweetModel = require('../model/Tweet');

const consultarTweets = (callback) => {
    //consulta todas as tags
    const hashtags = config['DEV'].hashtags;
    let tweets = [];
    let err_api = null;

    for(let i=0; i<hashtags.length; i++) {
        TwitterService.pesquisarTweetsPorHashtag(hashtags[i], function(err, data) {
            if(err) {
                err_api = err;
                return;
            }else {
                //retira os caractéres que quebram o parsing
                const re = new RegExp(/"'|'"/g, 'g')
                let json_twitees = data.replace(re, '');
                let statuses = JSON.parse(json_twitees)['statuses'];
                tweets = tweets.concat(statuses);
            }
        });
    }
    callback(err_api, tweets);
}

module.exports = { consultarTweets };