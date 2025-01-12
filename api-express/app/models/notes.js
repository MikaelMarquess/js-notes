const mongoose = require('mongoose')

//modelo do schema das notas
let notesSchema = new mongoose.Schema({
    title: String,
    body: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

notesSchema.index({'title': 'text', 'body': 'text'})

module.exports = mongoose.model('Notes', notesSchema)