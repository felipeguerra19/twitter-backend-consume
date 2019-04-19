'use strict';

const expect = require('expect.js');
const assert = require('assert');

const TweetModel = require('../src/model/Tweet');

describe('TweetModel TestCases', function() {

    describe('new TweetModel', () => {
        it('Tem que carregar o TwitterService com sucesso', function(done) {
            expect(TweetModel).not.to.equal(null);
            done();
        });
    });

    // describe('TweetModel::criarTabelas', () => {
    //     it('Tem que dar erro na hora de criar as tabelas', function(done) {
    //         TweetModel.criarTabelas(function(err, data) {
    //             if(err) {
    //                 expect(err).not.to.equal(null);
    //                 done();
    //             }else {
    //                 assert.fail(data, null, JSON.stringify(data), null);
    //             }
    //         });
    //     });
    // });

    describe('TweetModel::gravarUsuariosESeguidores', () => {
        it('Tem que dar erro na hora de gravar', function(done) {
            TweetModel.gravarUsuariosESeguidores('1', 1000, function(err, data) {
                if(err) {
                    expect(err).not.to.equal(null);
                    done();
                }else {
                    assert.fail(data, null, JSON.stringify(data), null);
                }
            });
        });
    });

});
