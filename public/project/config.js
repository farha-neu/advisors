(function(){
    angular.module("CCISAdvisor")
        .config(Config);
    
    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "/project/views/login.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "/project/views/register.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:userId", {
                templateUrl: "/project/views/home.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/forgotPassword", {
                templateUrl: "/project/views/forgot-password.html"
            })
            .when("/user/:userId/questionnare", {
                templateUrl: "/project/views/questionaire.html",
                controller: "questionaireControllerClient",
                controllerAs: "model"
            })
            .when("/user/:userId/grades", {
                templateUrl: "/project/views/grades.html",
                controller: "gradesControllerClient",
                controllerAs: "model"
            })
            .when("/user/:userId/courses", {
                templateUrl: "/project/views/courses.html",
                controller: "coursesControllerClient",
                controllerAs: "model"
            })
            .when("/user/:userId/discussionBoard", {
                templateUrl: "/project/views/discussion-board.html",
                controller: "DiscussionBoardController",
                controllerAs: "model"
            })
            .when("/user/:userId/discussionBoard/:courseCategory/viewThreads", {
                templateUrl: "/project/views/viewThreads.html",
                controller: "viewThreadController",
                controllerAs: "model"
            })
            .when("/user/:userId/discussionBoard/:courseCategory/viewThreads/postingNewThread", {
                templateUrl: "/project/views/postingNewThread.html",
                controller: "postingNewThreadController",
                controllerAs: "model"
            })
            .when("/user/:userId/discussionBoard/:courseCategory/viewThreads/:course", {
                templateUrl: "/project/views/viewThreadsForCourse.html",
                controller: "viewCourseThreadController",
                controllerAs: "model"
            })
            .when("/user/:userId/discussionBoard/:courseCategory/viewThreads/:course/postingNewThread", {
                templateUrl: "/project/views/postingNewThreadFromCourse.html",
                controller: "postingNewThreadControllerFromCourse",
                controllerAs: "model"
            })
            .when("/user/:userId/thread/:threadId", {
                templateUrl: "/project/views/thread.html",
                controller: "ThreadController",
                controllerAs: "model"
            })
            .when("/user/:userId/thread/:threadId/comments", {
                templateUrl: "/project/views/threadCommenting.html",
                controller: "ThreadCommentingController",
                controllerAs: "model"
            })
            .when("/:userId/grades", {
                templateUrl: "/project/views/grades.html"
                //controller: "LoginController",
                //controllerAs: "model"
            })
            .when("/:userId/courses", {
                templateUrl: "/project/views/courses.html"
                //controller: "LoginController",
                //controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }

function checkLoggedIn(UserService, $location, $q, $rootScope) {
    var deferred = $q.defer();
    UserService
        .checkLoggedIn()
        .then(
            function(response) {
                var user = response.data;
                if(user == '0') {
                    $rootScope.currentUser = null;
                    deferred.reject();
                    $location.url("/login");
                } else {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                }
            },
            function(err) {
                $location.url("/login");
            }
        );
    return deferred.promise;
}
})();
