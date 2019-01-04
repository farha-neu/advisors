(function() {
    angular
        .module("CCISAdvisor")
        .factory("RecommendService", RecommendService);

    function RecommendService($http) {

        var api = {
            createRecommend: createRecommend,
            fetchRecommend:fetchRecommend

        };
        return api;

        function createRecommend(userId, recData) {
            console.log("clientside");
            var url = "/api/user/"+userId+"/recdata";
            return $http.post(url, recData);
        }

        function fetchRecommend(userId){
            console.log("fetching");
            var url="/api/user/"+userId+"/fetchrecdata";
            return $http.get(url);
        }

    }
})();