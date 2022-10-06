const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = new mongoose.Schema({
    first_name:{
        type: String
    },
    last_name:{
        type: String
    },
    creation_date: {
      type: String
    },
    updation_date: {
      type: String
    }
})

module.exports = mongoose.model('Person', personSchema);