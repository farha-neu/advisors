(function(){
    angular
        .module("CCISAdvisor")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $scope){
        var vm = this;

        $scope.semesters = [1, 2, 3, 4];

        vm.register = register;

        function register(username, password, passwordVerify, firstName, lastName, semester){
            if(username != null && password != null && passwordVerify != null) {
                if(password == passwordVerify){
                    var user = {"username": username, "password": password, "firstName": firstName, "lastName": lastName, "reputationPoints": 0, "semester": semester};
                    UserService
                        .register(user)
                        .then(
                            function(response){
                                var user = response.data;
                                if (user) {
                                    $location.url("/user/" + user._id);
                                } else {
                                    vm.error = "Unable to Register. Try a different Username";
                                }
                            },
                            function(error){
                                vm.error = error.data;
                            }
                        )
                }
                else{
                    vm.error = "Passwords do not match";
                }

            }
        }
    }
})();
