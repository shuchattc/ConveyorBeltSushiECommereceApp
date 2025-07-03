const mongoose = require('mongoose');
const Foods = require('../models/foodItems');

mongoose.connect('mongodb://localhost:27017/sushiApp', {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const foodArray = [
    new Foods({
        price: 2,
        title: "Edamame",
        image: `${("../pictures/appetizer/edamame.jpg")}`,
        description: "Hot salted edamame",
        category: "appetizer",
    }),
    new Foods({
        price: 3,
        title: "Gyoza",
        image: `${("../pictures/appetizer/gyoza.jpg")}`,
        description: "Pan fried pork gyoza. (6 pieces)",
        category: "appetizer",
    }),
    new Foods({
        price: 3.50,
        title: "Negima",
        image: `${("../pictures/appetizer/negima.jpg")}`,
        description: "Skewer with chicken and leek glazed in teriyaki sauce. (2 skewers)",
        category: "appetizer",
    }),
    new Foods({
        price: 2,
        title: "Pickled Cucumber Salad",
        image: `${("../pictures/appetizer/pickled_cucumbers.jpg")}`,
        description: "Cucumber salad in a vinegar dressing",
        category: "appetizer",
    }),
    new Foods({
        price: 4.50,
        title: "Takoyaki",
        image: `${("../pictures/appetizer/takoyaki.jpg")}`,
        description: "Fried dough balls filled with octopus and a teriyaki sauce on top. (8 pieces)",
        category: "appetizer",
    }),
    new Foods({
        price: 3,
        title: "Cucumber Roll",
        image: `${("../pictures/sushi/cucumberRoll.jpg")}`,
        description: "Cucumber Roll wrapped in nori.",
        category: "sushi",
    }),
    new Foods({
        price: 4.50,
        title: "Ikura Nigiri",
        image: `${("../pictures/sushi/ikuraNigiri.jpg")}`,
        description: "Sushi topped with Cod Roe wrapped in nori.",
        category: "sushi",
    }),
    new Foods({
        price: 5,
        title: "Philly Roll",
        image: `${("../pictures/sushi/phillyRoll.jpg")}`,
        description: "Tuna and Cucumber roll with cream cheese.",
        category: "sushi",
    }),
    new Foods({
        price: 5,
        title: "Salmon Nigiri",
        image: `${("../pictures/sushi/salmonNigiri.jpg")}`,
        description: "Bed of rice topped with fresh salmon",
        category: "sushi",
    }),
    new Foods({
        price: 5,
        title: "Tuna Nigiri",
        image: `${("../pictures/sushi/tunaNigiri.jpg")}`,
        description: "Bed of rice topped with fresh tuna.",
        category: "sushi",
    }),
    new Foods({
        price: 3,
        title: "Beer",
        image: `${("../pictures/drink/beer.jpg")}`,
        description: "Ice cold beer",
        category: "drink",
    }),
    new Foods({
        price: 2.50,
        title: "Black Tea",
        image: `${("../pictures/drink/blacktea.jpg")}`,
        description: "Hot black tea.",
        category: "drink",
    }),
    new Foods({
        price: 2.50,
        title: "Green Tea",
        image: `${("../pictures/drink/greentea.jpg")}`,
        description: "Hot Green Tea",
        category: "drink",
    }),
    new Foods({
        price: 3,
        title: "Melon Soda",
        image: `${("../pictures/drink/melonsoda.jpg")}`,
        description: "Ice cold melon soda with cherry garnish.",
        category: "drink",
    }),
    new Foods({
        price: 5,
        title: "Ramune",
        image: `${("../pictures/drink/ramnune.jpg")}`,
        description: "Ice cold ramune soda.",
        category: "drink",
    }),
    new Foods({
        price: 3,
        title: "Mochi Ice Cream",
        image: `${("../pictures/dessert/mochi_icecream.jpg")}`,
        description: "Ice Cream wrapped in soft mochi.",
        category: "dessert",
    }),
    new Foods({
        price: 2.50,
        title: "Shaved Ice",
        image: `${("../pictures/dessert/shavedice.jpg")}`,
        description: "Shaved Ice flavored with a fruity syrup.",
        category: "dessert",
    }),
    new Foods({
        price: 2.50,
        title: "Strawberry Parfait",
        image: `${("../pictures/dessert/strawberryParfait.jpg")}`,
        description: "Vanilla Ice Cream with strawberries and strawberry syrup on top.",
        category: "dessert",
    }),
    new Foods({
        price: 3,
        title: "Taiyaki",
        image: `${('../pictures/dessert/taiyaki.jpg')}`,
        description: "Fish shaped pastry with red bean filling",
        category: "dessert",
    }),
    new Foods({
        price: 5,
        title: "Taiyaki Ice Cream",
        image: `${("../pictures/dessert/ramnune.jpg")}`,
        description: "Fish shaped pastry cone, with vanilla ice cream.",
        category: "dessert",
    }),
];

const seedDB = async () => {
   try{
    await Foods.deleteMany({});
    for (let i = 0; i < foodArray.length; i++) {
        await foodArray[i].save();
    }
    }
    catch (err){
    console.error(err);
    }
}

seedDB().then(() => {
    console.log("seeded menu");
    console.log(foodArray);
    mongoose.connection.close();
})