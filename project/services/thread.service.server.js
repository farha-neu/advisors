module.exports = function(app, models) {

    var threadModel = models.threadModel;

    app.post("/api/user/:userId/thread", createThread);
    app.get("/api/user/:userId/thread", findAllThreadsForUser);
    app.get("/api/:courseCategory/thread", findThreadsForcourseCategory);
    app.get("/api/:course/courseThread", findThreadsForCourse);
    app.get("/api/thread/:threadId", findThreadById);
    app.put("/api/thread/:threadId", updateThread);
    app.delete("/api/thread/:threadId", deleteThread);

    function createThread(req, res) {
        var userId = req.params.userId;
        var newThread = req.body;
        threadModel
            .createThreadForUser(userId, newThread)
            .then(
                function (thread) {
                    res.json(thread);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            )
    }

    function findAllThreadsForUser(req, res) {
        var userId = req.params.userId;
        threadModel
            .findAllThreadsForUser(userId)
            .then(
                function (threads) {
                    res.json(threads);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function findThreadsForcourseCategory(req, res) {
        var courseCategory = req.params.courseCategory;
        threadModel
            .findThreadsForcourseCategory(courseCategory)
            .then(
                function (threads) {
                    res.json(threads);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function findThreadsForCourse(req, res) {
        var course = req.params.course;
        threadModel
            .findThreadsForCourse(course)
            .then(
                function (threads) {
                    res.json(threads);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function findThreadById(req, res) {
        var threadId = req.params.threadId;
        threadModel
            .findThreadById(threadId)
            .then(
                function (thread) {
                    res.json(thread);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function updateThread(req, res) {
        var threadId = req.params.threadId;
        var thread = req.body;
        threadModel
            .updateThread(threadId, thread)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deleteThread(req, res) {
        var threadId = req.params.threadId;
        threadModel
            .deleteThread(threadId)
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