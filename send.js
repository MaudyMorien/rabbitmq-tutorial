const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0
    }
    connection.createChannel( (error1, channel) => {
        if (error1) {
            throw error1
        }
        const queue = 'hello'
        const msg = 'Hello world'

        channel.assertQueue(queue, {
            durable: false
        })

        channel.sendToQueue(queue, Buffer.from(msg))
        console.log(" [x] Sent %s", msg)
    })
    setTimeout( () => (
        connection.close()&
        process.exit(0)
    ), 500)
})
