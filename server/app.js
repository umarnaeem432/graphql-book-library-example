const express = require('express');
const graphqlHTTP = require('express-graphql'); // middleware to interact with graphql
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const PORT = process.env.PORT | 4000;

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

mongoose.connect('mongodb://localhost:27017/gq_books_library?retryWrites=true&w=majority', (err => {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`Server Started at port: ${PORT}`);
        })
    } else {
        throw err;
    } 
}));