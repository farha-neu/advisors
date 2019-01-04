module.exports = function() {
    var mongoose = require("mongoose");

    var ThreadSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "User"},
        query: String,
        course: String,
        courseCategory: String,
        description: String,
        comments: [{type: mongoose.Schema.ObjectId, ref: "Comment"}],
        views: Number,
        numberOfComments: Number,
        username: String,
        userReputationPoints: Number,
        dateTime: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "hci.thread"});

    return ThreadSchema;
};