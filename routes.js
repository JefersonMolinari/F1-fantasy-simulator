//jshint esversion:6

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin-jeferson:Test2020@cluster0.xerkq.mongodb.net/f1DB', {useNewUrlParser: true, useUnifiedTopology: true});

router.get('/', (req, res) => {
  res.send('Hello from router!')
});

router.put('/', (req, res) => {
  // PUT controller function 
});

router.post('/', (req, res) => {
  // POST controller function 
});

router.patch('/', (req, res) => {
  // PATCH controller function 
});

router.delete('/', (req, res) => {
  // DELETE controller function 
});

module.exports = router;