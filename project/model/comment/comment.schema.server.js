module.exports = function() {
    var mongoose = require("mongoose");

    var CommentSchema = mongoose.Schema({
        _thread: {type: mongoose.Schema.ObjectId, ref: "Thread"},
        user: {type: mongoose.Schema.ObjectId, ref: "User"},
        comments: String,
        likes: Number,
        dislikes: Number,
        dateTime: String,
        username: String,
        userReputationPoints: Number,
        dateCreated: {type: Date, default: Date.now},
        order: {type: Number, default: 0}
    }, {collection: "hci.comment"});

    return CommentSchema;
};