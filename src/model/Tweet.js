'use strict';

const Joi = require('joi');
const dynamodb = require('dynamodb');
const AWS = require('aws-sdk');

let config = {};
config['region'] = 'us-east-1';

//Conexão local ao DynamoDB
if( process.env.DYNAMODB_ENDPOINT ) {
    config['endpoint'] = process.env.DYNAMODB_ENDPOINT;
}

const dynamo = new AWS.DynamoDB(config);
dynamodb.AWS.config.update(config);

const getDynamoDBTables = async () => {
    return await dynamo.listTables({});
};

//Usuario com mais seguidores;
const User = dynamodb.define('User', {
    hashKey: 'Id',
    schema: {
        Id: Joi.string(),
        Seguidores: Joi.number()
    }
});

const TweetGrupoData = dynamodb.define('User', {
    hashKey: 'Id',
    schema: {
        Id: Joi.string(),
        Data: Joi.string(),
        Hora: Joi.string(),
        Quantidade: Joi.number()
    }
});

const TweetLocalidade = dynamodb.define('User', {
    hashKey: 'Id',
    schema: {
        Id: Joi.string(),
        Idioma: Joi.string(),
        Hashtag: Joi.string(),
        Quantidade: Joi.number()
    }
});

const gravarUsuariosESeguidores = ( userId, followers, callback ) => {
    let params = {};
    params.Id = userId;
    params.Seguidores = followers
    
    User.create(params, function(err, result) {
        if(err) {
            console.error('Erro ao tentar gravar os Usuários e Seguidores: ' + JSON.stringify(err));
            callback(err, null);
        }else {
            callback(null, result);
        }
    });
}

const criarTabelas = (callback) => {
    dynamodb.createTables(function(err) {
        if (err) {
            callback('Error creating tables: ' + err, null);
        } else {
            callback(null, 'Tables has been created');
        }
    });
}

module.exports = { criarTabelas, gravarUsuariosESeguidores, getDynamoDBTables };