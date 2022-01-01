const fastify = require('fastify')()
var faker = require('faker');

fastify.register(require('fastify-mongodb'), {
    forceClose: true,
    url: 'mongodb://192.168.122.86:27017/appdb'
})

// products endpoint

const getFakeUniqueProductName = () => {
    return faker.fake("{{commerce.productName}} {{datatype.uuid}}");
}

const getFakeProduct = () => {
    return {
        name: faker.unique(getFakeUniqueProductName),
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
    const p = getFakeProduct();
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



// customers endpoint

const getFakeCustomerName = () => {
    return faker.fake("{{name.firstName}} {{name.lastName}}");
}

const getFakeUniqueEmail = () => {
    return faker.fake("{{datatype.uuid}}.{{internet.email}}");
}

const getFakeCustomer = () => {
    return {
        name: getFakeCustomerName(),
        email: faker.unique(getFakeUniqueEmail),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
        phone: faker.phone.phoneNumber(),
        avatar: faker.image.avatar(),
        country: faker.address.country(),
        createdAt: faker.date.past(),
    }
}

const customersCollection = 'customers'

fastify.post(`/${customersCollection}`, function (req, reply) {
    const c = getFakeCustomer();
    const collection = this.mongo.db.collection(customersCollection)
    collection.insertOne(c, (err, result) => {
        if (err) {
            console.log(err);
            reply.send(err)
        } else {
            reply.send(result)
        }
    });
})

fastify.get(`/${customersCollection}`, function (req, reply) {
    const collection = this.mongo.db.collection(customersCollection)
    collection.find({}, {}).limit(100).toArray((err, result) => {
        if (err) {
            reply.send(err)
            return
        }

        reply.send(result)
    })
});

fastify.get(`/${customersCollection}/:id`, function (req, reply) {
    const collection = this.mongo.db.collection(customersCollection)
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