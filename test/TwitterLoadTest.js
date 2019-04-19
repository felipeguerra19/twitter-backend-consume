'use strict';

const expect = require('expect.js');
const assert = require('assert');
const moment = require('moment');
const fs = require('fs');

describe('Carregar e ler os tweets do arquivo', function() {

    describe('Testa o carregamento do arquivo', function() {
        it('Tem que carregar o arquivo com sucesso', function(done) {
            try {
                //lendo o arquivo no mesmo path
                let json_file = __dirname + '/twitter_search_api.json';
                let binary_twitees = fs.readFileSync(json_file, 'utf8');
                let json_twitees = JSON.parse(JSON.stringify(binary_twitees));
                expect(json_twitees).not.to.equal(null);
                done();

            }catch(e) {
                console.error(e);
                assert.fail(e, null, JSON.stringify(e), null);
            }
        })
    });

    describe('Lê o arquivo e carrega para um array', function() {
        it('O array precisa ter elementos', function(done) {
            try {
                //lendo o arquivo no mesmo path
                let json_file = __dirname + '/twitter_search_api.json';
                console.log('Lendo o arquivo', json_file);
                let binary_twitees = fs.readFileSync(json_file, 'utf8');
                let json_twitees = JSON.parse(JSON.stringify(binary_twitees));
                expect(json_twitees.lenght).not.to.equal(0);
                done();

            }catch(e) {
                console.error(e);
                assert.fail(e, null, JSON.stringify(e), null);
            }
        })
    });

    describe('Lê o arquivo, carrega para um array e faz ordenação', function() {
        it('Ordena o array pelo número de seguidores', function(done) {
            try {
                //lendo o arquivo no mesmo path
                let json_file = __dirname + '/twitter_search_api.json';
                let binary_twitees = fs.readFileSync(json_file, 'utf8');
                //retira os caractéres que quebram o parsing
                let re = new RegExp(/"'|'"/g, 'g')
                binary_twitees = binary_twitees.replace(re, '');
                
                let json_twitees = JSON.parse(binary_twitees);
                
                let statuses = json_twitees['statuses'];
                const last_count_followers = statuses[statuses.length-1]['user'].followers_count;

                statuses.sort((x, y) => {
                    return y['user'].followers_count - x['user'].followers_count;
                });
                
                expect(last_count_followers).not.to.equal(statuses[statuses.length-1]['user'].followers_count);
                done();

            }catch(e) {
                console.error(e);
                assert.fail(e, null, JSON.stringify(e), null);
            }
        })
    });

    describe('Pega as datas utilizada nos elementos do array para fazer map/filter/sort', function() {
        it('A data depois do parsing não pode ser nula', function(done) {
            try {
                //lendo o arquivo no mesmo path
                let json_file = __dirname + '/twitter_search_api.json';
                let binary_twitees = fs.readFileSync(json_file, 'utf8');
                //retira os caractéres que quebram o parsing
                let re = new RegExp(/"'|'"/g, 'g')
                binary_twitees = binary_twitees.replace(re, '');

                let json_twitees = JSON.parse(binary_twitees);

                let test_date = moment(json_twitees['statuses'][0].created_at, "ddd MMM DD HH:mm:ss ZZ YYYY");
                
                expect(test_date).not.to.equal('undefined');
                done();

            }catch(e) {
                console.error(e);
                assert.fail(e, null, JSON.stringify(e), null);
            }
        })
    });

    describe('Pega as datas utilizada nos elementos do array para fazer map/filter/sort', function() {
        it('Retorna um array com os elementos alterados', function(done) {
            try {
                //lendo o arquivo no mesmo path
                let json_file = __dirname + '/twitter_search_api.json';
                let binary_twitees = fs.readFileSync(json_file, 'utf8');
                //retira os caractéres que quebram o parsing
                let re = new RegExp(/"'|'"/g, 'g')
                binary_twitees = binary_twitees.replace(re, '');

                let json_twitees = JSON.parse(binary_twitees);
                let arr_twitees = json_twitees['statuses'];

                let sorted_array = arr_twitees.map(element => {
                    let time_in_milliseconds = moment(element.created_at, "ddd MMM DD HH:mm:ss ZZ YYYY");
                    element['created_at_in_millisecdond'] = time_in_milliseconds.valueOf();

                    return element;
                });
                
                expect(sorted_array.length).equal(arr_twitees.length);
                done();

            }catch(e) {
                console.error(e);
                assert.fail(e, null, JSON.stringify(e), null);
            }
        })
    });

    describe('Pega as datas utilizada nos elementos do array para fazer map/filter/sort', function() {
        it('Retorna um array com os elementos alterados e ordenados', function(done) {
            try {
                //lendo o arquivo no mesmo path
                let json_file = __dirname + '/twitter_search_api.json';
                let binary_twitees = fs.readFileSync(json_file, 'utf8');
                //retira os caractéres que quebram o parsing
                let re = new RegExp(/"'|'"/g, 'g')
                binary_twitees = binary_twitees.replace(re, '');

                let json_twitees = JSON.parse(binary_twitees);
                let arr_twitees = json_twitees['statuses'];

                let sorted_array = arr_twitees.map(element => {
                    let time_in_milliseconds = moment(element.created_at, "ddd MMM DD HH:mm:ss ZZ YYYY");
                    element['created_at_in_millisecdond'] = time_in_milliseconds.valueOf();

                    return element;
                });

                //ordena
                sorted_array.sort((x, y) => {
                    return x['created_at_in_millisecdond'] - y['created_at_in_millisecdond'];
                });

                expect(sorted_array.length).equal(arr_twitees.length);
                done();

            }catch(e) {
                console.error(e);
                assert.fail(e, null, JSON.stringify(e), null);
            }
        })
    });

    describe('Pega as datas utilizada nos elementos do array para fazer map/reduce', function() {
        it('Retorna um array com os elementos alterados e ordenados', function(done) {
            try {
                //lendo o arquivo no mesmo path
                let json_file = __dirname + '/twitter_search_api.json';
                let binary_twitees = fs.readFileSync(json_file, 'utf8');
                //retira os caractéres que quebram o parsing
                let re = new RegExp(/"'|'"/g, 'g')
                binary_twitees = binary_twitees.replace(re, '');

                let json_twitees = JSON.parse(binary_twitees);
                let arr_twitees = json_twitees['statuses'];

                let sorted_array = arr_twitees.map(element => {
                    let time_in_milliseconds = moment(element.created_at, "ddd MMM DD HH:mm:ss ZZ YYYY");
                    element['created_at_in_millisecdond'] = time_in_milliseconds.valueOf();

                    return element;
                });

                //ordena
                sorted_array.sort((x, y) => {
                    return x['created_at_in_millisecdond'] - y['created_at_in_millisecdond'];
                });

                //reduce
                let group_tweets = sorted_array.reduce((tweets, element) => {
                    let time_in_milliseconds = moment(element.created_at, "ddd MMM DD HH:mm:ss ZZ YYYY");

                    //constrói uma chave de busca para redução
                    const this_key = time_in_milliseconds.format('YYYY-MM-DD') + 'T'
                                    + time_in_milliseconds.hours() + ':00:00.000';

                    if( this_key in tweets ) {
                        tweets[this_key]++;
                    }else {
                        tweets[this_key] = 1;
                    }
                    return tweets;

                }, {});

                expect(group_tweets).not.to.equal(5);
                done();

            }catch(e) {
                console.error(e);
                assert.fail(e, null, JSON.stringify(e), null);
            }
        })
    });

    describe('Faz o teste com o payload para map/reduce das hashtags de acordo com a localidade', function() {
        it('Agrupar os tweets por hashtag e localidade com sucesso', function(done) {
            try {
                //lendo o arquivo no mesmo path
                let json_file = __dirname + '/twitter_search_api.1.json';
                let binary_twitees = fs.readFileSync(json_file, 'utf8');
                //retira os caractéres que quebram o parsing
                let re = new RegExp(/"'|'"/g, 'g')
                binary_twitees = binary_twitees.replace(re, '');

                let json_twitees = JSON.parse(binary_twitees);
                let arr_twitees = json_twitees['statuses'];

                //ordena
                arr_twitees.sort((x, y) => {
                    return x.lang > y.lang;
                });

                //reduce
                let group_tweets = arr_twitees.reduce((tweets, element) => {
                    //constrói uma chave de busca para redução
                    const this_key = element.lang + ':' + element['entities'].hashtags[0].text;

                    if( this_key in tweets ) {
                        tweets[this_key]++;
                    }else {
                        tweets[this_key] = 1;
                    }
                    return tweets;

                }, {});

                expect(group_tweets).not.to.equal(null);
                done();

            }catch(e) {
                console.error(e);
                assert.fail(e, null, JSON.stringify(e), null);
            }
        })
    });

});