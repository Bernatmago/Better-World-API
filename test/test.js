process.env.TESTING = 'yes'
const assert = require('chai').assert;
const app = require('../server');
const mongoose = require('mongoose');

describe('Test del test', function() {
    
    before((done) => {
        app.on('appStarted', () => done());
    });

    //Como se accede de forma asincrona
    //a la db hay que llamar a done como callback
    //Esto se ejecuta para resetear la db en un estado en cada test
    beforeEach((done) => {
        /*mongoose.collections.User.drop(() => {
            done();
        });*/
        done();
    });
    it('Esto es una prova crack', function(done) {
        assert.equal(1,1);
        //Done se llama cuando termina el test
        //A prueba de asincrono
        done();
    });
    it('Esto peta', function(done) {
        assert.equal(1,3);
        done();
    });
});