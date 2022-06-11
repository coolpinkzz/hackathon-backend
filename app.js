const express = require('express');
const app = express();
const port = 8080
const { MongoClient } = require("mongodb");
const { default: mongoose } = require('mongoose');
const MenuList = require('./src/models/menuItem');
require('dotenv').config()

const connectionString = process.env.MONGO_URL
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '1.5MB' }))

mongoose.connect(
    connectionString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then((_result) => {
    console.log("DB Connected")
}).catch((err) => {
    console.log(err)
})



// app.use('/', route)

app.post('/menu_list', async (req, res) => {
    // console.log(req.body)
    const menuList = new MenuList(req.body)
    try {
        const insert_menu = await menuList.save();
        res.json(insert_menu);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

app.get('/menu_list', (req, res) => {
    // console.log(req.body)
    try {
        MenuList.find({}, function (err, result) {
            if (err) {
                res.json(err.message)
            }
            else {
                res.json(result);
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})