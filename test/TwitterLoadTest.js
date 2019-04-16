'use strict';

const expect = require('expect.js');
const assert = require('assert');
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

});