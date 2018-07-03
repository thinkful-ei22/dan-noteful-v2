'use strict';

const knex = require('../knex');

// clear the console (just a convenience)
process.stdout.write('\x1Bc');

//Get All Notes accepts a searchTerm and finds notes with titles which contain the term. It returns an array of objects.
// let searchTerm = 'gaga';
// knex
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .modify(queryBuilder => {
//     if (searchTerm) {
//       queryBuilder.where('title', 'like', `%${searchTerm}%`);
//     }
//   })
//   .orderBy('notes.id')
//   .then(results => {
//     console.log(JSON.stringify(results, null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });

//Get Note By Id accepts an ID. It returns the note as an object not an array
// let noteId = 1000;

// knex('notes')
//   .select('notes.id', 'title', 'content')
//   .where('id', noteId)
//   .debug(false)
//   .then(([res])=>console.log(res))
//   .catch(err=>console.log(err));

//Update Note By Id accepts an ID and an object with the desired updates. It returns the updated note as an object

// let noteId = 1000;
// let updatedNote = {
//   title: 'LeBron James Joins LA Lakers',
//   content:
//     'Blah blajh blah lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
// };

// knex('notes')
//   .where('id', noteId)
//   .update(updatedNote, ['id', 'title', 'content'])
//   .debug(false)
//   .then(([res])=>console.log(res))
//   .catch(err=>console.log(err));

//Create a Note accepts an object with the note properties and inserts it in the DB.It returns the new note(including the new id) as an object.

// let newNote = {
//   title: 'Internet shut down across Algeria to stop pupils cheating in exams',
//   content: 'To stop pupils cheating in Algeria, the government has taken the extreme measure of cutting internet access across the whole of the country during exam time. Mobile and web connections were stopped for two hours on Wednesday to coincide with the start of two high school diploma tests.'
// };

// knex('notes')
//   .insert(newNote, ['id', 'title', 'content'])
//   .debug(false)
//   .then(([res])=>console.log(res))
//   .catch(err=>console.log(err));

//Delete Note By Id accepts an ID and deletes the note from the DB.

// let noteId = ['1011', '1012'];

// knex('notes')
//   .where('id', 'in', noteId)
//   .del()
//   .then(res=>console.log(res))
//   .catch(err=>console.log(err))


// knex('notes')
//   .select()
//   .then(res=>console.log(res));