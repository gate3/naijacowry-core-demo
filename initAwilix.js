const awilix = require('awilix');
const container = awilix.createContainer();
const bcrypt = require('bcrypt-nodejs');
const randomstring = require("randomstring");

const initialize = _ => (
    container.loadModules([
        [
            './src/models/**/*.model.js',
            {
                register: awilix.asValue,
                lifetime: awilix.Lifetime.SINGLETON
            }
        ],
        [
            './src/helpers/**/*.helper.js',
            {
                register: awilix.asClass,
                lifetime: awilix.Lifetime.SINGLETON
            }
        ],
        [
            './src/**/*.ctrl.js',
            {
                register: awilix.asFunction,
            }
        ]
    ],
    {
        formatName:'camelCase',
    })
);

// encryption for register and login or other password hashes
container.register({
    encryptionHelper: awilix.asValue(bcrypt)
});

container.register({
    randomNumberGenerator: awilix.asValue(randomstring)
});

module.exports = {
    awilix,
    container,
    initialize
};