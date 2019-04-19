//const Boom = require('Boom');
const TweetModel = require('../model/Tweet');

module.exports = [
    {
        method: 'GET',
        path:'/ping',
        handler: (request, h) => {
            return "pong";
        }
    },
    {
        method: 'GET',
        path:'/database-health',
        handler: async (request, h) => {
            const result = await TweetModel.getDynamoDBTables();

            return {
                Tables: result.response.data
            };
        }
    },
    {
        method: 'GET',
        path:'/twitter-consumer/search-tweets',
        handler: (request, h) => {
            let param = request.params.hashtag;
        }
    }
];