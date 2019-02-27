const redis = require('redis');
const {promisify} = require('util')

class CacheHelper {
    constructor () {
        this.CONSTANTS = {
            USERNAMES:'usernames'
        }
        const options = {}
        if(process.env.NODE_ENV === 'production'){
            options['host'] = 'redis'
        }
        this.client = redis.createClient(options);
    }

    addToSet (key, value) {
        const sadd = this.promisifyFunc('sadd')
        return sadd(key, value)
    }

    checkIfInSet (key, value) {
        const sismember = this.promisifyFunc('sismember')
        return sismember(key, value)
    }

    getValueFromSet (key) {
        const smembers = this.promisifyFunc('smembers')
        return smembers(key)
    }

    setValue (key, value) {
        const set = this.promisifyFunc('set')
        return set(key, value)
    }

    getValue (key) {
        const get = this.promisifyFunc('get')
        return get(key)
    }

    promisifyFunc (func) {
        return promisify(this.client[func]).bind(this.client)
    }
}

module.exports = CacheHelper;
