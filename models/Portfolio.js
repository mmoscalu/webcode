const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({

    category: {
        type: Schema.Types.ObjectId,
        ref: 'portfolio-category'
    },

    title: {
        type: String,
        require: true
    },
    link: {
        type: String,
        require: true
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
    }
});

module.exports = mongoose.model('portfolio', PortfolioSchema);