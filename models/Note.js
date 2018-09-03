var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    body: {
        type: String,
        required: true,
        unique: true
    }
});
  
var Note = mongoose.model("Note", NoteSchema);
  
module.exports = Note;