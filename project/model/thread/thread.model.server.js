module.exports = function() {

    var mongoose = require("mongoose");
    var ThreadSchema = require("./thread.schema.server")();
    var Thread = mongoose.model("Thread", ThreadSchema);

    var api = {
        createThreadForUser: createThreadForUser,
        findAllThreadsForUser: findAllThreadsForUser,
        findThreadById: findThreadById,
        updateThread: updateThread,
        deleteThread: deleteThread,
        findThreadsForcourseCategory: findThreadsForcourseCategory,
        findThreadsForCourse: findThreadsForCourse
    };
    return api;

    function createThreadForUser(userId, thread) {
        thread._user = userId;
        return Thread.create(thread);
    }

    function findAllThreadsForUser(userId) {
        return Thread.find({_user: userId}).sort( { dateCreated: -1 } );
    }

    function findThreadsForcourseCategory(courseCategory) {
        return Thread.find({courseCategory: courseCategory}).sort( { dateCreated: -1 } );
    }

    function findThreadsForCourse(course) {
        return Thread.find({course: course}).sort( { dateCreated: -1 } );
    }

    function findThreadById(threadId) {
        return Thread.findById(threadId);
    }

    function updateThread(threadId, thread) {
        return Thread
                .update({_id: threadId},{
                    $set: {
                        views: thread.views,
                        numberOfComments: thread.numberOfComments
                    }
                });
    }

    function deleteThread(threadId) {
        return Thread.remove({_id: threadId});
    }
};