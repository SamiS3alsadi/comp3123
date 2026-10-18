const express = require('express');
const mongoose = require('mongoose');
const Notes = require('../models/NotesModel.js');

const noteRoutes = express.Router();

// Only copy the note fields we allow from the request body
const pickFields = (content = {}) => {
    const fields = ['noteTitle', 'noteDescription', 'priority', 'dateAdded', 'dateUpdated'];
    const data = {};
    fields.forEach(field => {
        if (content[field] !== undefined) data[field] = content[field];
    });
    return data;
};

const handleError = (res, err) => {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: err.message });
};

// Create a new Note
noteRoutes.post('/notes', async (req, res) => {
    if (!req.body || !req.body.content) {
        return res.status(400).send({ message: "Note content can not be empty" });
    }
    try {
        const note = new Notes(pickFields(req.body.content));
        const saved = await note.save();
        res.status(201).send(saved);
    } catch (err) {
        handleError(res, err);
    }
});

// Retrieve all Notes
noteRoutes.get('/notes', async (req, res) => {
    try {
        const notes = await Notes.find().sort({ _id: -1 });
        res.send(notes);
    } catch (err) {
        handleError(res, err);
    }
});

// Retrieve a single Note with noteId
noteRoutes.get('/notes/:noteId', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.noteId)) {
        return res.status(400).send({ message: "Invalid note id" });
    }
    try {
        const note = await Notes.findById(req.params.noteId);
        if (!note) {
            return res.status(404).send({ message: "Note not found" });
        }
        res.send(note);
    } catch (err) {
        handleError(res, err);
    }
});

// Update a Note with noteId
noteRoutes.put('/notes/:noteId', async (req, res) => {
    if (!req.body || !req.body.content) {
        return res.status(400).send({ message: "Note content can not be empty" });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.noteId)) {
        return res.status(400).send({ message: "Invalid note id" });
    }
    try {
        const data = pickFields(req.body.content);
        data.dateUpdated = new Date().toISOString();
        const updated = await Notes.findByIdAndUpdate(req.params.noteId, data, {
            new: true,
            runValidators: true
        });
        if (!updated) {
            return res.status(404).send({ message: "Note not found" });
        }
        res.send(updated);
    } catch (err) {
        handleError(res, err);
    }
});

// Delete a Note with noteId
noteRoutes.delete('/notes/:noteId', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.noteId)) {
        return res.status(400).send({ message: "Invalid note id" });
    }
    try {
        const deleted = await Notes.findByIdAndDelete(req.params.noteId);
        if (!deleted) {
            return res.status(404).send({ message: "Note not found" });
        }
        res.send({ message: "Note deleted successfully!" });
    } catch (err) {
        handleError(res, err);
    }
});

module.exports = noteRoutes;
