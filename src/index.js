const fastify = require('fastify')()
const queue = require('fastq')(worker, 6)
var faker = require('faker');

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

const getFake = () => {
    return faker.fake("{{commerce.productName}}-{{datatype.uuid}}");
}

const getProduct = () => {
    return {
        name: faker.unique(getFake),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        image: faker.image.image,
        createdAt: faker.date.past(),
    }
}

const productsCollection = 'products'

function worker(arg, cb) {
    // const collection = this.mongo.db.collection(productsCollection)
    // arg.collection.insertOne(arg.p, (err, result) => {
    //     cb(null, result)
    // })    
    arg.collection.find({}, {}).limit(100).toArray((err, result) => {
        cb(null, result);
    })
}

fastify.post(`/q/${productsCollection}`, function (req, reply) {
    const p = getProduct();
    const collection = this.mongo.db.collection(productsCollection)
    queue.push({ p, collection }, function (err, result) {
        reply.send(result)
    })
})

fastify.post(`/${productsCollection}`, function (req, reply) {
    const p = getProduct();
    const collection = this.mongo.db.collection(productsCollection)
    collection.insertOne(p, (err, result) => {
        reply.send(result);
    })
})

fastify.get(`/${productsCollection}`, function (req, reply) {
    const collection = this.mongo.db.collection(productsCollection)
    // collection.find({}, {}).limit(100).toArray((err, result) => {
    //     if (err) {
    //         reply.send(err)
    //         return
    //     }
    //     reply.send(result)
    // })
    queue.push({ collection }, function (err, result) {
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
    reply.send({ "success": true, time: new Date() });
    // queue.push({ "success": true, time: new Date() }, function (err, result) {
    //     if (err) { reply.send(err) }
    //     console.log('the result is', result)
    //     reply.send(result)
    // })
})

fastify.listen(3000, err => {
    if (err) throw err
    console.log('fastify is up and running in port 3000');
})