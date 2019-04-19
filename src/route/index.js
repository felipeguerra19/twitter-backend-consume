
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
        handler: (request, h) => {
            TweetModel.getDynamoDBTables(function(err, data) {
                if(err) {
                    return err;
                }else {
                    return data;
                }
            });
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