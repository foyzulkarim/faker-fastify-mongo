const fastify = require('fastify')()

fastify.get('/', function (req, reply) {
    reply.send({ "success2": true, time: new Date() });
})

fastify.listen(3001, err => {
    if (err) throw err    
    console.log('fastify is up and running in port 3001');
})