const amqp = require("amqplib")


connect()
async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString())
            console.log(`Recieved job with input ${input.number}`)
        })
        
        console.log("Wating for message...")
    } catch (error) {
        console.log(error)
    }
}