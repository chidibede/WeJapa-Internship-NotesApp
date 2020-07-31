const mongoose = require('mongoose');
const Schema = mongoose.Schema


noteSchema = new Schema({
    title: {type: String, required: true},
    categories: {type: String, required: true},
    content: {type: String}
}, 
{timestamps: true}
)

module.exports = mongoose.model('Note', noteSchema)
