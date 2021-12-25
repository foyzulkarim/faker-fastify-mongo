const fastify = require('fastify')()

fastify.register(require('fastify-mongodb'), {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,
    url: 'mongodb://127.0.0.1:27017/mydb'
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