const app  = require("./app.js")
const connectBD = require('./db');


connectBD()

app.listen(9001)
console.log('server on port', 9001)
