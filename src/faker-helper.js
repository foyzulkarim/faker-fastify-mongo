var faker = require('faker');
const axios = require('axios').default;

// axios.post('https://httpbin.org/post', {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
// })
//     .then(function (response) {
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
// const data = await response.json();

// for (let index = 0; index < 50; index++) {
//     const element = 50;
//     console.log(faker.name.firstName())
// }

// const name = faker.fake("{{name.firstName}} {{name.lastName}}");
// console.log(name);
// console.log(faker.address.streetAddress());
// console.log(faker.fake("{{commerce.productName}}\n {{commerce.productAdjective}} \n{{commerce.productMaterial}} \n{{commerce.product}} \n{{commerce.department}} \n{{commerce.price}} "));
// console.log(faker.date.soon(), faker.date.past(), faker.date.future(), faker.time.recent());
// console.log(faker.image.animals());
// let names = [];
// let names2 = [];
// for (let index = 0; index < 1000; index++) {
//     names.push(faker.unique(faker.name.firstName));
//     names2.push(faker.name.firstName());
// }
// names = names.sort();
// var unique_array = [...new Set(names)];
// console.log(unique_array.length);
// names2 = names2.sort();
// var unique_array2 = [...new Set(names2)];
// console.log(unique_array2.length);

const getFake = () => {
    return faker.fake("{{commerce.productName}}-{{datatype.uuid}}");
    // return faker.commerce.productName();
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

const getFakeUniqueProductName = () => {
    return faker.fake("{{commerce.productName}} {{datatype.uuid}}");
}

const getFakeProduct2 = () => {
    return {
        name: faker.unique(getFakeUniqueProductName),
        sku: faker.helpers.slugify(faker.fake("{{commerce.productName}}")),
        cost: faker.commerce.price(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        manufacturingDate: faker.date.past(),
        expiryDate: faker.date.future(),
        size: faker.helpers.randomize([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    }
}

const getProducts = (number) => {
    let products = [];
    for (let index = 0; index < number; index++) {
        products.push(getProduct());
    }
    return products;
}
const start = new Date();
console.log(start);
// const products = getProducts(1000);
// console.log(new Date() - start, products.length);
// products.map(product => {
//     console.log(product.name);
//     axios.post('http://localhost:3000/products', product)
//         .then(function (response) {
//             console.log(response.data, start, new Date() - start);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// });
console.log('starting my cannon', start);
for (let index = 0; index < 1; index++) {
    // const product = getFakeProduct2();
    // console.log('product', product);
    axios.post('http://localhost:3000/products', {})
        .then(function (response) {
            console.log(response.data, index, new Date() - start);
        })
        .catch(function (error) {
            console.log(error);
        });

}
// console.log('ending cannon', new Date() - start);