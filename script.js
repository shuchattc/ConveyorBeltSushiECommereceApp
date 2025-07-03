const express = require('express');
const session = require('express-session');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const  FoodItemSchema  = require('./models/foodItems.js');
const OrderSchema = require('./models/orders.js');
// const foodArray = require('./seeds/index.js');

mongoose.connect('mongodb://localhost:27017/sushiApp', {
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + './public'));
app.set('trust proxy', 1) // trust first proxy
app.use(session({    
    secret: 'thisisasecret',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false
    }
}));
app.use(flash());
app.use((req,res,next) => {
    res.locals.success = req.flash('success');
    next();
});

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/product/appetizers', async(req,res) => {
    const appetizers = await FoodItemSchema.find({category:"appetizer"});
    res.render('appetizers', {appetizers});
});

app.get('/product/sushi', async(req,res) =>{
    const sushi = await FoodItemSchema.find({category: "sushi"});
    res.render('sushi', {sushi, OrderSchema});
});
app.get('/product/drinks', async(req,res) =>{
    const drink = await FoodItemSchema.find({category: "drink"});
    res.render('drink', {drink});
});;
app.get('/product/dessert', async(req,res) =>{
    const dessert = await FoodItemSchema.find({category: "dessert"});
    res.render('dessert', {dessert});
});

app.get('/kitchen', async(req,res) =>{ 
    const orders = await OrderSchema.find({});
    res.render('kitchen', {orders});
})

app.post('/kitchen', async(req,res) => {
    const newOrder = new OrderSchema(req.body.foodItem);
    const foodItem = await FoodItemSchema.findById(req.params.title);
    console.log("food item " + foodItem);
    newOrder.FoodItems.push(foodItem); //attaches the food to the order
    await newOrder.save();
    res.redirect('/');
    console.log(newOrder + "QTY +" + newOrder.qty);
});

app.delete('/kitchen', async(req,res) => {

});

app.listen(3000, () => {
    console.log('Serving on port 3000')
})