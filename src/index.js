const fastify = require('fastify')()

fastify.register(require('fastify-mongodb'), {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,
    url: 'mongodb://127.0.0.1:27017/mydb'
})

const usersCollection = 'users'

fastify.get('/users/:id', function (req, reply) {
    const users = this.mongo.db.collection(usersCollection)
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
})

fastify.post('/users', function (req, reply) {
    const users = this.mongo.db.collection(usersCollection)
    users.insert(req.body, (err, result) => {
        if (err) {
            reply.send(err)
            return
        }
        reply.send(result)
    })
})

const productsCollection = 'products'

fastify.post(`/${productsCollection}`, function (req, reply) {
    const collection = this.mongo.db.collection(productsCollection)
    collection.insert(req.body, (err, result) => {
        if (err) {
            reply.send(err)
            return
        }
        reply.send(result)
    })
})

fastify.get(`/${productsCollection}`, function (req, reply) {
    const collection = this.mongo.db.collection(productsCollection)
    collection.find({}, {}).toArray((err, result) => {
        if (err) {
            reply.send(err)
            return
        }
        reply.send(result)
    })
});

fastify.get(`/${productsCollection}/:id`, function (req, reply) {
    const collection = this.mongo.db.collection(productsCollection)
    const id = this.mongo.ObjectId(req.params.id)
    console.log(id);
    collection.find({ _id: id }, {}).toArray((err, result) => {
        if (err) {
            reply.send(err)
            return
        }
        reply.send(result)
    })
});

fastify.get('/', function (req, reply) {
    reply.send({ "success": true });
})

fastify.listen(3000, err => {
    if (err) throw err
    console.log('fastify is up and running in port 3000');
})