(function(){
    angular
        .module("CCISAdvisor")
        .factory("CommentService", CommentService);

    function CommentService($http) {
        var api = {
            createComment: createComment,
            findCommentsForThread: findCommentsForThread,
            findCommentById: findCommentById,
            updateComment: updateComment,
            deleteComment: deleteComment,

        };
        return api;

        function createComment(threadId, comment) {
            var url = "/api/thread/"+threadId+"/comment";
            return $http.post(url, comment);
        }

        function findCommentsForThread(threadId) {
            var url = "/api/thread/"+threadId+"/comment";
            return $http.get(url);
        }

        function findCommentById(commentId) {
            var url = "/api/comment/"+commentId;
            return $http.get(url);
        }

        function updateComment(commentId, comment) {
            console.log(comment);
            var url = "/api/comment/"+commentId;
            return $http.put(url, comment);
        }

        function deleteComment(commentId) {
            var url = "/api/comment/"+commentId;
            return $http.delete(url);
        }
    }
})();