const express = require('express');
const mongoose = require('mongoose');
const budgetItemsModel = require('./models/budget_items_schema');

const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017/budget';

app.use('/', express.static('public'));
app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            budgetItemsModel.find({})
                .then((data) => {
                    res.json(data);
                    mongoose.connection.close();
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
});

app.post('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            var budgetItem = new budgetItemsModel({
                title: req.body.title,
                value: req.body.value,
                color: req.body.color
            });

            budgetItemsModel.insertMany(budgetItem)
                .then((data) => {
                    res.json(data);
                    mongoose.connection.close();
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});