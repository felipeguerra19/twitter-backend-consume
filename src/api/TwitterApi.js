'use strict';

const Hapi = require('hapi');
const TwitterService = require('../service/TwitterService');

const init = async () => {

    const server = Hapi.server({
        port: process.env.SERVER_PORT || 3000,
        host: process.env.SERVER_HOST || '127.0.0.1'
    });

    server.route({
        method: 'GET',
        path:'/twitter-consumer/search-tweets',
        handler: (request, h) => {
            let param = request.params.hashtag;

            // TwitterService.pesquisarTweetsPorHashtag(param, function(err, tweets) {
            //     if(err) {
            //         return err;
            //     }else {
            //         return tweets;
            //     }
            // });
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();