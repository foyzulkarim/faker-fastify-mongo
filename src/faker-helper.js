var faker = require('faker');

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

const getProduct = () => {
    return {
        name: faker.unique(faker.commerce.productName),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        image: faker.image.image,
    }
}

const getProducts = (number) => {
    let products = [];
    for (let index = 0; index < number; index++) {
        products.push(getProduct());
    }
    return products;
}

const names = [];
getProducts(1000).map(product => names.push(product.name));
var unique_array = [...new Set(names)];
console.log(unique_array.length, names);