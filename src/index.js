const fastify = require('fastify')()
var faker = require('faker');

fastify.register(require('fastify-mongodb'), {
    forceClose: true,
    url: 'mongodb://192.168.122.86:27017/appdb'
})

fastify.register(require('fastify-axios'))

const getFake = () => {
    return faker.fake("{{commerce.productName}} {{datatype.uuid}}");
}

const getProduct = () => {
    return {
        name: faker.unique(getFake),
        price: faker.commerce.price(),
        product: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        image: faker.image.image,
        company: faker.company.companyName(),
        country: faker.address.country(),
        createdAt: faker.date.past(),
    }
}

const productsCollection = 'products'

fastify.post(`/${productsCollection}`, function (req, reply) {
    const p = getProduct();
    const collection = this.mongo.db.collection(productsCollection)
    collection.insertOne(p, (err, result) => {
        if (err) {
            console.log(err);
            reply.send(err)
        } else {
            reply.send(result)
        }
    });
})

fastify.get(`/${productsCollection}`, function (req, reply) {
    const collection = this.mongo.db.collection(productsCollection)
    collection.find({}, {}).limit(100).toArray((err, result) => {
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
    reply.send({ "success": true, time: new Date() });
})

fastify.listen(3000, err => {
    if (err) throw err
    console.log('fastify is up and running in port 3000');
})