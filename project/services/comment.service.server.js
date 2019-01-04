module.exports = function(app, models) {

    var commentModel = models.commentModel;

    app.post("/api/thread/:threadId/comment", createComment);
    app.get("/api/thread/:threadId/comment", findAllCommentsForThread);
    app.get("/api/comment/:commentId", findCommentById);
    app.put("/api/comment/:commentId", updateComment);
    app.delete("/api/comment/:commentId", deleteComment);

    function createComment(req, res) {
        var threadId = req.params.threadId;
        var newComment = req.body;
        commentModel
            .createComment(threadId, newComment)
            .then(
                function (comment) {
                    res.json(comment);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            )
    }

    function findAllCommentsForThread(req, res) {
        var threadId = req.params.threadId;
        commentModel
            .findAllCommentsForThread(threadId)
            .then(
                function (comments) {
                    res.json(comments);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function findCommentById(req, res) {
        var commentId = req.params.commentId;
        commentModel
            .findCommentById(commentId)
            .then(
                function (comment) {
                    res.json(comment);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function updateComment(req, res) {
        var commentId = req.params.commentId;
        var comment = req.body;
        commentModel
            .updateComment(commentId, comment)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deleteComment(req, res) {
        var commentId = req.params.commentId;
        commentModel
            .deleteComment(commentId)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }
}