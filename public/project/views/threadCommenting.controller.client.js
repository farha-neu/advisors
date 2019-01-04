(function(){
    angular
        .module("CCISAdvisor")
        .controller("ThreadCommentingController", ThreadCommentingController);

    function ThreadCommentingController($routeParams,RecommendService, ThreadService, UserService, $scope, $http, CommentService, $location, $window) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.threadId = $routeParams.threadId;
        vm.hasData1=hasData1;

        vm.createComment = createComment;
        vm.fullDateTime = fullDateTime;
        vm.updateThreadForUpVote = updateThreadForUpVote;
        vm.updateThreadForDownVote = updateThreadForDownVote;

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(
                    function(response){
                        vm.user = response.data;
                    }
                )

            ThreadService
                .findThreadById(vm.threadId)
                .then(
                    function(response){
                        vm.thread = response.data;
                        CommentService
                            .findCommentsForThread(vm.threadId)
                            .then(
                                function(response){
                                    vm.comments = response.data;
                                }
                            )
                    }
                )


        }
        init();
        function hasData1() {
            RecommendService
                .fetchRecommend(vm.userId)
                .then(
                    function(response){
                        vm.recommendData=response.data;
                        if(vm.recommendData.length<=0){
                            $location.url("/user/"+ vm.userId+"/questionnare" );
                        }else
                        {
                            $location.url("/user/"+ vm.userId+"/courses" );
                        }

                    })

        }

        function createComment(comment){
            if(comment != "") {
                var newComment = {"comments": comment, "user": vm.userId, "likes": 0, "dislikes": 0, "dateTime": fullDateTime(), "username": vm.user.username, "userReputationPoints": vm.user.reputationPoints};
                CommentService
                    .createComment(vm.threadId, newComment)
                    .then(
                        function (response) {
                            ThreadService
                                .findThreadById(vm.threadId)
                                .then(
                                    function(response){
                                        vm.thread = response.data;

                                        var newThread = {"query": vm.thread.query, "description": vm.thread.description, "course": vm.thread.course, "courseCategory": vm.thread.courseCategory, "numberOfComments": vm.thread.numberOfComments + 1 , "views": vm.thread.views - 1, "dateTime": vm.thread.dateTime};

                                        ThreadService
                                            .updateThread(vm.threadId, newThread)
                                            .then(
                                                function (response) {
                                                    $location.url("/user/" + vm.userId + "/thread/" + vm.threadId);
                                                },
                                                function (error) {
                                                    vm.error = error.data;
                                                }
                                            )
                                    }
                                )

                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    )
            }else{
                vm.error = "Comments are Required";
            }
        }

        function fullDateTime() {
            var d = new Date();
            var n = d.toLocaleString([], { hour12: true});
            return n;
        }

        function updateThreadForUpVote(commentId){
            CommentService
                .findCommentById(commentId)
                .then(
                    function(response){
                        vm.getComment = response.data;

                        var newComment = {"comments": vm.getComment.comments, "user": vm.getComment.user, "likes": vm.getComment.likes + 1, "dislikes": vm.getComment.dislikes, "dateTime": vm.getComment.dateTime, "username": vm.getComment.username, "userReputationPoints": vm.getComment.userReputationPoints};

                        CommentService
                            .updateComment(commentId, newComment)
                            .then(
                                function (response) {
                                    $window.location.reload();
                                    var newUser = {"reputationPoints": vm.user.reputationPoints + 1};
                                    UserService
                                        .updateUser(vm.userId, newUser)
                                        .then(
                                            function(response){

                                            },
                                            function(error){
                                                vm.error = error.data;
                                            }
                                        )
                                },
                                function (error) {
                                    vm.error = error.data;
                                }
                            )
                    }
                )
        }

        function updateThreadForDownVote(commentId){
            CommentService
                .findCommentById(commentId)
                .then(
                    function(response){
                        vm.getComment = response.data;

                        var newComment = {"comments": vm.getComment.comments, "user": vm.getComment.user, "likes": vm.getComment.likes, "dislikes": vm.getComment.dislikes + 1, "dateTime": vm.getComment.dateTime, "username": vm.getComment.username, "userReputationPoints": vm.getComment.userReputationPoints};

                        CommentService
                            .updateComment(commentId, newComment)
                            .then(
                                function (response) {
                                    $window.location.reload();
                                    var newUser = {"reputationPoints": vm.user.reputationPoints - 1};
                                    UserService
                                        .updateUser(vm.userId, newUser)
                                        .then(
                                            function(response){

                                            },
                                            function(error){
                                                vm.error = error.data;
                                            }
                                        )
                                },
                                function (error) {
                                    vm.error = error.data;
                                }
                            )
                    }
                )
        }

    }
})();