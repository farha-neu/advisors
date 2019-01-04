module.exports = function() {

    var mongoose = require('mongoose');
    var connectionString =  process.env.MONGODB_URI || 'mongodb://localhost/hci';

    // if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    //     connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    //         process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    //         process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    //         process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    //         process.env.OPENSHIFT_APP_NAME;
    // }

    mongoose.connect(connectionString);

    var models = {
        userModel: require("./user/user.model.server")(),
        threadModel: require("./thread/thread.model.server")(),
        commentModel: require("./comment/comment.model.server")(),
        recommendModel: require("./recommend/recommend.model.server")()
    };
    return models;
};