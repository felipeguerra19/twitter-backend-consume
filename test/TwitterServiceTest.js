'use strict';

const expect = require('expect.js');
const assert = require('assert');

const TwitterService = require('../src/service/TwitterService');

describe('TwitterService TestCases', function() {

    describe('new TwitterService', () => {
        it('Tem que carregar o TwitterService com sucesso', function(done) {
            expect(TwitterService).not.to.equal(null);
            done();
        });
    });

    describe('TwitterService::pesquisarTweetsPorHashtag', () => {
        it('Tem que dar erro na pesquisa', function(done) {
            TwitterService.pesquisarTweetsPorHashtag('#test', function(err, tweets) {
                if(err) {
                    expect(err).not.to.equal(null);
                    done();
                }else {
                    assert.fail(err, null, JSON.stringify(err), null);
                }
            });
        });
    });

});