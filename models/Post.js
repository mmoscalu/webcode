const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },

    title: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: 'public'
    },
    description: {
        type: String,
        require: true
    },
    file: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    translitTitle: {
        type: String
    }
});

module.exports = mongoose.model('Post', PostSchema);