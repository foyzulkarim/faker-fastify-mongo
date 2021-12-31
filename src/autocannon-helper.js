const autocannon = require('autocannon')

const url =  'http://localhost:3000'

const options = {
    url,
    connections: 10, //default
    pipelining: 1, // default
    duration: 10, // default
    requests: [
        {
            method: 'POST',
            path: '/products',
            // body: JSON.stringify({ name: Date.now().toString(36) }),
            onResponse: (status, body, context) => {
                console.log(status, body);
            }
        }
    ]
}

const finishedBench = (err, result) => {
    console.log(result)
}

autocannon(options, finishedBench);