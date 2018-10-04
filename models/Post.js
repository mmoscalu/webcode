const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
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
    }

});

module.exports = mongoose.model('Post', PostSchema);