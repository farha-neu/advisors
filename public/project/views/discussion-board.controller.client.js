(function(){
    angular
        .module("CCISAdvisor")
        .controller("DiscussionBoardController", DiscussionBoardController);

    function DiscussionBoardController($location,RecommendService,$routeParams, $scope, $http, UserService) {
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
    }
})();