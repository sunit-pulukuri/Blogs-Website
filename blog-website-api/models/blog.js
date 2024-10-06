const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
    title : {type : String, required: true, default : "Unnamed Blog"},
    image : {type : String, required: true, default : "Default Image"},
    matter : {type : String, required: true, default : "Default Matter"},
    author : {type : String, required: true, default : "Unknown Author"},
    createdBy : {type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true},
    comments : [
        {
            userId : { type : mongoose.Schema.Types.ObjectId, ref : 'User'},
            comment : {type : String}
        }
    ],
    createdAt : {type : Date, default : Date.now}
});

const Blog = mongoose.model('Blog', BlogSchema)
module.exports = Blog