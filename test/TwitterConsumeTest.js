'use strict';
const expect = require('expect.js');
const assert = require('assert');

const TwitterConsume = require('../src/business/TwitterConsume');

describe('Testar a lógica de consulta/transformação/gravação dos Tweets', function() {

    describe('TwitterConsume::consultarTweets', function() {
        it('Tem que dar erro na consulta', function(done) {
            try {
                TwitterConsume.consultarTweets(function(err, tweets) {
                    if(err) {
                        expect(err).not.to.equal(null);
                        done();
                    }else {
                        assert.fail(tweets, null, JSON.stringify(tweets), null);
                    }
                });
            }catch(e) {
                expect(e).not.to.equal(null);
                done();
            }
        });
    });
});