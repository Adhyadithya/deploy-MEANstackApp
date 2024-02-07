const express = require("express");
const bodyParser = require("body-parser")
const ProductData = require("./src/model/ProductData");
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
app.use(cors());

require("dotenv").config()
const port = process.env.PORT||5050;
const path=require('path');
const {MongoClient} = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URL)

app.get('/*',function(req,res){
    // res.send("API responds correctly")
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

app.get('/api/products',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods:GET,POST,PUT,DELETE');
    ProductData.find().then(function(products){
      res.send(products);
    })
})

app.post('/api/insert',bodyParser.json(),function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods:GET,POST,PUT,DELETE')
    console.log(req.body);
    var product = {
        productID: req.body.product.productID,
        productName:req.body.product.productName,
        productCode:req.body.product.productCode,
        releaseDate:req.body.product.releaseDate,
        description:req.body.product.description,
        price:req.body.product.price,
        starRating:req.body.product.starRating,
        imageURL:req.body.product.imageURL
    }
    var product = new ProductData(product);
    product.save();
})

// app.listen(3050,function(req,res){
//     console.log("Server Started..")
// });

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URL);
      console.log(`MongoDB Connected: `);
    } catch (error){
      console.log(error);
      process.exit(1);
    }
  }
connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening for requests on ",port);
    })
})