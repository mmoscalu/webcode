const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    translitTitleCat: {
        type: String
    }
});

module.exports = mongoose.model('Category', CategorySchema);