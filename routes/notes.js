'use strict';

const express = require('express');

// Create an router instance (aka "mini-app")
const router = express.Router();

// TEMP: Simple In-Memory Database
// const data = require('../db/notes');
// const simDB = require('../db/simDB');
// const notes = simDB.initialize(data);

const knex = require('../knex');


// Get All (and search by query)
router.get('/', (req, res, next) => {
  const { searchTerm } = req.query;
  const { folderId } = req.query;

  knex.select('notes.id', 'title', 'content', 'folders.id as folderId', 'folders.name as folderName')
    .from('notes')
    .leftJoin('folders', 'notes.folderId', 'folders.id')
    .modify(function (queryBuilder) {
      if (searchTerm) {
        queryBuilder.where('title', 'like', `%${searchTerm}%`);
      }
    })
    .modify(function (queryBuilder) {
      if (folderId) {
        queryBuilder.where('folderId', folderId);
      }
    })
    .orderBy('notes.id')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

// Get a single item
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex.select('notes.id', 'title', 'content', 'folders.id as folderId', 'folders.name as folderName')
    .from('notes')
    .leftJoin('folders', 'notes.folderId', 'folders.id')
    .where('notes.id', id)
    .then(([result]) => {
      if (result){
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => next(err));
});

// Update a note
router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['title', 'content', 'folderId'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  let noteId;
  console.log(updateObj);

  knex('notes')
    .where('id', id)
    .update(updateObj, ['id'])
    .then(([result]) => {
      if (result) {
        noteId = id;
        return knex ('notes')
          .select('notes.id', 'title', 'content', 'folderId', 'folders.name as folderName')
          .leftJoin('folders', 'notes.folderId', 'folders.id')
          .where('notes.id', noteId)
          .then(([result]) => {
            res.json(result);
          });
      } else {
        next();
      }
    })
    .catch(err=>next(err));
});

// Post (insert) an item
router.post('/', (req, res, next) => {
  const { title, content, folderId } = req.body; // Add `folderId` to object destructure

  const newItem = {
    title: title,
    content: content,
    folderId: folderId  // Add `folderId`
  };

  if (!newItem.title){
    const err = new Error ('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  
  let noteId;

  // Insert new note, instead of returning all the fields, just return the new `id`
  knex.insert(newItem)
    .into('notes')
    .returning('id')
    .then(([id]) => {
      noteId = id;
      // Using the new id, select the new note and the folder
      return knex.select('notes.id', 'title', 'content', 'folderId', 'folders.name as folderName')
        .from('notes')
        .leftJoin('folders', 'notes.folderId', 'folders.id')
        .where('notes.id', noteId);
    })
    .then(([result]) => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => next(err));
});

// Delete an item
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  knex('notes')
    .where('id', id)
    .del()
    .then(() => res.sendStatus(204))
    .catch(err=>next(err));
});

module.exports = router;