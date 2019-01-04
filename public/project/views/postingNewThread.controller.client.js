(function(){
    angular
        .module("CCISAdvisor")
        .controller("postingNewThreadController", postingNewThreadController);

    function postingNewThreadController($routeParams, $scope, $http, UserService, ThreadService,RecommendService, $location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.courseCategory = $routeParams.courseCategory;
        vm.hasData1=hasData1;

        vm.createThread = createThread;
        vm.fullDateTime = fullDateTime;

        if(vm.courseCategory === "Human Computer Interaction")
            $scope.courses = ["CS5340 - Computer Human Interaction", "CS5350 - Applied Geometric Representation and Computation", "CS6350 - Empirical Research Methods"];
        if(vm.courseCategory === "Artificial Intelligence")
            $scope.courses = ["CS5100 - Foundations of Artificial Intelligence", "CS5355 - Robotic Science and Systems", "CS6110 - Knowledge-Based Systems"];
        if(vm.courseCategory === "Networks")
            $scope.courses = ["CS5700 - Fundamentals of Computer Networking", "CS5750 - Social Computing", "CS6710 - Wireless Network"];
        if(vm.courseCategory === "Database")
            $scope.courses = ["CS5200 - Database Management Systems", "CS6140 - Machine Learning", "CS6200 - Information Retrieval"];
        if(vm.courseCategory === "Software Engineering")
            $scope.courses = ["CS5610 - Web Development", "CS6510 - Advanced Software Development", "CS6520 - Methods of Software Development"];
        if(vm.courseCategory === "Graphics")
            $scope.courses = ["CS5310 - Computer Graphics", "CS5320 - Digital Image Processing", "CS5330 - Pattern Recognition and Computer Vision"];
        if(vm.courseCategory === "Security")
            $scope.courses = ["CS5770 - Software Vulnerabilities and Security", "CS6540 - Foundations of Formal Methods and Software Analysis", "CS6740 - Network Security"];
        if(vm.courseCategory === "Game Design")
            $scope.courses = ["CS5150 - Game Artificial Intelligence", "CS5310 - Computer Graphics", "CS5850 - Building Game Engines"];
        if(vm.courseCategory === "Systems")
            $scope.courses = ["CS5620 - Computer Architecture", "CS5650 - High Performance Computing", "CS6610 - Parallel Computing"];
        if(vm.courseCategory === "Programming Languages")
            $scope.courses = ["CS5400 - Principles of Programming Language", "CS6410 - Compilers", "CS6412 - Semantics of Programming Language"];
        if(vm.courseCategory === "Theory")
            $scope.courses = ["CS6610 - Parallel Computing", "CS6750 - Cryptography and Communications Security", "CS6800 - Application of Information Theory"];

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

        function createThread(question, course, description){
            if(question != null && course != null && description != null) {
                var thread = {"query": question, "description": description, "course": course, "courseCategory": vm.courseCategory, "views": 0, "dateTime": fullDateTime(), "numberOfComments": 0, "username": vm.user.username, "userReputationPoints": vm.user.reputationPoints};
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