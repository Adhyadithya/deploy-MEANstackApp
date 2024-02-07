const mongoose = require('mongoose')
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URL)
 
//.connect("mongodb+srv://Adithya:Appuskunju5@cluster0.kkxodvi.mongodb.net/ProductsDB")

const Schema = mongoose.Schema;
const ProductsSchema = new Schema({
    productID:Number,
    productName:String,
    productCode:String,
    releaseDate:String,
    description:String,
    price:Number,
    starRating:Number,
    imageURL:String
})

//Model creation
var ProductData = mongoose.model('products',ProductsSchema)
module.exports = ProductData
