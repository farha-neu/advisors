module.exports = function(app) {

    var models = require("./model/models.server")();

    var userService = require("./services/user.service.server.js")(app, models);
    var ThreadService = require("./services/thread.service.server.js")(app, models);
    var CommentService = require("./services/comment.service.server.js")(app, models);
    var RecommendService = require("./services/recommend.service.server.js")(app, models);

};
