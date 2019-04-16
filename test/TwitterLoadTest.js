'use strict';

const expect = require('expect.js');
const assert = require('assert');
const fs = require('fs');


describe('Carregar e ler os tweets do arquivo', function() {

    describe('Testa o carregamento do arquivo', function() {
        it('Tem que carregar o arquivo com sucesso', function(done) {
            try {
                //lendo o arquivo no mesmo path
                let binary_twitees = fs.readFileSync('/Users/felipeguerraoliveira/Projetos/Exams/Itau/Backend/twitter-backend-consume/test/twitter_search_api.json',
                                                    'utf8');
                expect(binary_twitees).not.to.equal(null);
                done();

            }catch(e) {
                console.error(e);
                assert.fail(e, null, JSON.stringify(e), null);
            }
        })
    });

});