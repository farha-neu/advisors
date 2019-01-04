(function() {
    angular
        .module("CCISAdvisor")
        .controller("questionaireControllerClient", questionaireControllerClient);

    function questionaireControllerClient($routeParams, $scope, $http, UserService, ThreadService,RecommendService, $location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.setData = setData;
        vm.hasData1=hasData1;
        vm.buttonname="Next"
        vm.heading="Please Select Your Preferences";

        function init() {
            console.log("PPPP"+vm.userId);
            UserService
                .findUserById(vm.userId)
                .then(
                    function(response){
                        vm.user = response.data;
                    }
                );

            RecommendService
                .fetchRecommend(vm.userId)
                .then(
                    function(response){
                        vm.recommendData=response.data;
                        if(vm.recommendData.length<=0){
                            vm.heading="Please Select Your Preferences";
                            vm.buttonname="Next";

                        }else{
                            vm.heading="Edit Your Preferences";
                            vm.buttonname="Update";

                        }
                    })

        }
        init();


        function setData(){

            var recdata = {"project_like": vm.result,
                "team_like": vm.result1,
                "exam_or_assignment": vm.result2,
                "textbook_like":vm.result3,
                "research_paper": vm.result4};
            console.log("Pranav:::"+ JSON.stringify(recdata));
            RecommendService
                .createRecommend(vm.userId, recdata)
                .then(
                    function (response) {
                        if(vm.buttonname=="Update"){
                            $location.url("/user/" + vm.userId+"/courses");
                        }
                        else{
                            $location.url("/user/" + vm.userId+"/grades");
                        }

                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )


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