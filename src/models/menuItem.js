const mongoose = require("mongoose");

const MenuListSchema = new mongoose.Schema({
    dish_name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

const MenuList = mongoose.model("MenuList", MenuListSchema);

module.exports = MenuList;