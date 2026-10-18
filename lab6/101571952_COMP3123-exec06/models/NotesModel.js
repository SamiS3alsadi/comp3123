const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    noteTitle: { type: String, required: true, trim: true },
    noteDescription: { type: String, default: '' },
    priority: { type: String, enum: ['HIGH', 'LOW', 'MEDIUM'], default: 'LOW' },
    dateAdded: { type: String, default: () => new Date().toISOString() },
    dateUpdated: { type: String, default: () => new Date().toISOString() }
});

module.exports = mongoose.model('Notes', noteSchema);
