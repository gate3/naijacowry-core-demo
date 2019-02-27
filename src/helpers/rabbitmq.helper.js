const rabbitMq = require('amqplib');
//const CONSTANTS = require('./constants');

class RabbitMqHelper {
    constructor (channel_name) {
        this.channel = null;
        this.connection = null;
        this.queueAssert = null;
        this.channel_name = channel_name
    }

    async setup () {
        try{
            const conn = await rabbitMq.connect(process.env.RABBITMQ_URL)
            const ch = await conn.createChannel()
            this.queueAssert = ch.assertQueue(this.channel_name, {durable:true})
            this.channel = ch
            
            return Promise.resolve(this.queueAssert)
        }catch(e){
            //console.log(e, 'Here')
            return Promise.reject(e)
        }
    }

    sendToQueue (message) {
        this.channel.sendToQueue(this.channel_name, Buffer.from(message), {persistent: true});
    }
}

module.exports = RabbitMqHelper
