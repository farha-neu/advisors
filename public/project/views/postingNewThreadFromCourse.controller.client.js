(function(){
    angular
        .module("CCISAdvisor")
        .controller("postingNewThreadControllerFromCourse", postingNewThreadControllerFromCourse);

    function postingNewThreadControllerFromCourse($routeParams, $scope, $http, UserService, ThreadService,RecommendService, $location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.courseCategory = $routeParams.courseCategory;
        vm.course = $routeParams.course;
        vm.hasData1=hasData1;

        vm.createThread = createThread;
        vm.fullDateTime = fullDateTime;


        function init() {
            UserService
                .findUserById(vm.userId)
                .then(
                    function(response){
                        vm.user = response.data;
                    }
                )

        }
        init();

        function createThread(question, description){
            if(question != null && description != null) {
                var thread = {"query": question, "description": description, "course":  vm.course, "courseCategory": vm.courseCategory, "views": 0, "dateTime": fullDateTime(), "numberOfComments": 0, "username": vm.user.username, "userReputationPoints": vm.user.reputationPoints};
            ThreadService
                    .createThread(vm.userId, thread)
                    .then(
                        function (response) {
                            $location.url("/user/" + vm.userId);
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    )
        }else{
            vm.error = "All input fields are required";
        }
            
        }


        function init() {
            UserService
                .findUserById(vm.userId)
                .then(
                    function(response){
                        vm.user = response.data;
                    }
                )

        }
        init();

        function fullDateTime() {
            var d = new Date();
            var n = d.toLocaleString([], { hour12: true});
            return n;
        }
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

    }
})();