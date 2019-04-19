'use strict';

const config = require('../application.json');
const TwitterService = require('../service/TwitterService');
const TweetModel = require('../model/Tweet');

const cadastrarUsuariosESeguidores = async () => {
    TweetModel.criarTabelas(function(err, data) {
        if(err) {
            return;
        }else {
            //lendo o arquivo no mesmo path
            let json_file = '../twitter_search_api.json';
            let binary_twitees = fs.readFileSync(json_file, 'utf8');
            //retira os caractéres que quebram o parsing
            let re = new RegExp(/"'|'"/g, 'g')
            binary_twitees = binary_twitees.replace(re, '');
            
            let json_twitees = JSON.parse(binary_twitees);
            
            let statuses = json_twitees['statuses'];
            
            statuses.sort((x, y) => {
                return y['user'].followers_count - x['user'].followers_count;
            });

            for(let i=0; i<statuses.length; i++) {
                TweetModel.gravarUsuariosESeguidores(statuses[i]['user'].str_id, 
                                                    statuses[i]['user'].followers_count,
                                                    function(err, data) {
                                                        if(err) {
                                                            return;
                                                        }else {
                                                            console.log(data)
                                                        }
                                                    });
            }
        }
    });
}


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

module.exports = { consultarTweets, cadastrarUsuariosESeguidores };