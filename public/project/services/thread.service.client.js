(function(){
    angular
        .module("CCISAdvisor")
        .factory("ThreadService", ThreadService);

    function ThreadService($http) {
        var api = {
            createThread: createThread,
            findThreadsForUser: findThreadsForUser,
            findThreadById: findThreadById,
            updateThread: updateThread,
            deleteThread: deleteThread,
            findThreadsForcourseCategory: findThreadsForcourseCategory,
            findThreadsForCourse: findThreadsForCourse
        };
        return api;

        function createThread(userId, thread) {
            var url = "/api/user/"+userId+"/thread";
            return $http.post(url, thread);
        }

        function findThreadsForUser(userId) {
            var url = "/api/user/"+userId+"/thread";
            return $http.get(url);
        }

        function findThreadsForcourseCategory(courseCategory) {
            var url = "/api/"+courseCategory+"/thread";
            return $http.get(url);
        }

        function findThreadsForCourse(course) {
            var url = "/api/"+course+"/courseThread";
            return $http.get(url);
        }

        function findThreadById(threadId) {
            var url = "/api/thread/"+threadId;
            return $http.get(url);
        }

        function updateThread(threadId, thread) {
            var url = "/api/thread/"+threadId;
            return $http.put(url, thread);
        }

        function deleteThread(threadId) {
            var url = "/api/thread/"+threadId;
            return $http.delete(url);
        }
    }
})();