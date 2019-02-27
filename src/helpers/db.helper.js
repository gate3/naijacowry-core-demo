const mongoose = require('mongoose');

class DbHelper {
    constructor () {
        this.options = {
            useNewUrlParser:true,
            useCreateIndex: true,
        }
        this.connection = null
        this.connect()
    }

    connect () {
        this.connection = mongoose.connect(
            process.env.MONGO_URI,
            this.options,
            (err) => {
              if (err) throw err;
              console.log('db connected.');
            },
        );
    }
}

module.exports = new DbHelper();