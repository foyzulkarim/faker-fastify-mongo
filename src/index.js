const fastify = require('fastify')()

fastify.register(require('fastify-mongodb'), {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,
    url: 'mongodb://127.0.0.1:27017/mydb'
})

fastify.get('/users/:id', function (req, reply) {
    // Or this.mongo.client.db('mydb').collection('users')
    const users = this.mongo.db.collection('myCollection')
    // console.log(users);
    // if the id is an ObjectId format, you need to create a new ObjectId
    const id = this.mongo.ObjectId(req.params.id)
    console.log(id);
    let x = users.find({}, {}).toArray().then((err, user) => {
        if (err) {
            console.log(err);
            reply.send(err)
            return
        }
        console.log('user ', user);
        reply.send(user)
    });
    console.log('hello\t', x);
    // reply.send(x);
})

fastify.get('/', function (req, reply) {
    reply.send({ "success": true });
})

fastify.listen(3000, err => {
    if (err) throw err
    console.log('fastify is up and running in port 3000');
})