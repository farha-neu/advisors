(function(){
    angular
        .module("CCISAdvisor")
        .controller("HomeController", HomeController);

    function HomeController($location,$routeParams, ThreadService, UserService,RecommendService, $scope, $http) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.hasData1=hasData1;

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(
                    function(response){
                        vm.user = response.data;
                    }
                )

            ThreadService
                .findThreadsForUser(vm.userId)
                .then(
                    function(response){
                        vm.threads = response.data;
                        vm.hasThreads = true;
                        vm.message = false;
                        if(vm.threads == ""){
                            vm.hasThreads = false;
                            vm.message = true;
                        }
                    }
                )
        }
        init();

        function hasData1() {
            console.log("inside home hasdata1");
            RecommendService
                .fetchRecommend(vm.userId)
                .then(
                    function(response){
                        vm.recommendData=response.data;
                        console.log(vm.recommendData.length);
                        console.log("===>"+JSON.stringify(response));
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