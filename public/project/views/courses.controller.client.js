(function() {
    angular
        .module("CCISAdvisor")
        .controller("coursesControllerClient", coursesControllerClient);

    function coursesControllerClient($routeParams, $scope, $http, UserService, ThreadService,RecommendService, $location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.clearFilter=clearFilter;
        vm.hasData=false;
        vm.hasData1=hasData1;
        //vm.setGradeData = setGradeData;
        //Filter 1 for types of courses


        $scope.filterOptions = {
            stores: [
                {id : 2, name : 'Filter By Specialization', ID: 6 },
                {id : 3, name : 'Database', ID: 5 },
                {id : 4, name : 'Networks', ID: 4 },
                {id : 5, name : 'Software Engineering', ID: 3 },
                {id : 6, name : 'Security', ID: 2 },
                {id : 7, name : 'Artificial Intelligence', ID: 1 }, 
                {id : 8, name : 'Human Computer Interaction', ID: 7},
                {id : 9, name : 'Graphics', ID: 8},
                {id : 10, name :'Systems', ID: 9}
            ]
        };

        $scope.filterItem = {
            store: $scope.filterOptions.stores[0]
        };

        $scope.customFilter = function (data) {
            if (data.ID === $scope.filterItem.store.ID) {
                return true;
            } else if ($scope.filterItem.store.ID === 6) {
                return true;
            } else {
                return false;
            }
        };


        //Filter 2 for hours
        $scope.filterOptions1 = {
            stores1: [
                {id : 2, name : 'Average Study Time Per Week', ID: 99 },
                {id : 3, name : '4-8 Hours', ID: 8 },
                {id : 4, name : '8-12 Hours', ID: 12 },
                {id : 5, name : '12-16 hours', ID: 16 }
            ]
        };

        $scope.filterItem1 = {
            store1: $scope.filterOptions1.stores1[0]
        };

        $scope.customFilter1 = function (data) {
            if (data.Hours <= $scope.filterItem1.store1.ID && data.Hours>=(($scope.filterItem1.store1.ID)-4)) {
                return true;
            } else if ($scope.filterItem1.store1.ID === 99) {
                return true;
            } else {
                return false;
            }
        };


        function init() {

            console.log("courses page"+vm.userId);
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
                        console.log("Received data::"+JSON.stringify(vm.recommendData));
                        if(vm.recommendData.length>0)
                        {
                            vm.hasData=true;
                            if(vm.recommendData[0].project_like==="Strong_agree"||
                                vm.recommendData[0].project_like==="Agree")
                            {
                                vm.courseData=[{
                                    Course:"CS5320 - Digital Image Processing",
                                    Professor:"Jon Williams",
                                    Lecture_Hours:"5:00pm-7:00pm",
                                    Location:"Cargill Hall 125",
                                    Type:"Graphics",
                                    Hours:8,
                                    T1:95,
                                    T2:5,
                                    T3:0,
                                    T4:0,
                                    ID:8

                                },
                                    {
                                        Course:"CS6140 - Machine Learning",
                                        Professor:"Jenny Parker",
                                        Lecture_Hours:"5:00pm-7:00pm",
                                        Location:"Shillman Hall 135",
                                        Type:"Artificial Intelligence",
                                        Hours:12,
                                        T1:70,
                                        T2:30,
                                        T3:0,
                                        T4:0,
                                        ID:1

                                    },
                                    {
                                        Course:"CS6610 - Parallel Computing",
                                        Professor:"Sarah Dutile",
                                        Lecture_Hours:"5:00pm-7:00pm",
                                        Location:"Cargill Hall 125",
                                        Type:"Systems",
                                        Hours:10,
                                        T1:55,
                                        T2:35,
                                        T3:9,
                                        T4:1,
                                        ID:9

                                    },
                                    {
                                        Course:"CS6200 - Information Retrieval",
                                        Professor:"Kendall Borkin",
                                        Lecture_Hours:"5:00pm-7:00pm",
                                        Location:"Snell Engineering 355",
                                        Type:"Database",
                                        Hours:10,
                                        T1:55,
                                        T2:45,
                                        T3:0,
                                        T4:0,
                                        ID:5

                                    }
                                ]

                            }
                            else if(vm.recommendData[0].team_like==="Strong_agree"||
                                vm.recommendData[0].team_like==="Agree")
                            {

                                vm.courseData=[{
                                    Course:"CS5340 - Computer Human Interaction",
                                    Professor:"David Williams",
                                    Lecture_Hours:"5:00pm-7:00pm",
                                    Location:"Shillman Hall 78",
                                    Type:"Database,Airtificial intelligence",
                                    Hours:8,
                                    T1:55,
                                    T2:35,
                                    T3:9,
                                    T4:1,
                                    ID:7

                                },
                                    {
                                        Course:"CS5350 - Applied Geometric Representation and Computation",
                                        Professor:"Timothy Sakarov",
                                        Lecture_Hours:"5:00pm-7:00pm",
                                        Location:"Nightingale Hall 56",
                                        Type:"Networks",
                                        Hours:12,
                                        T1:55,
                                        T2:35,
                                        T3:9,
                                        T4:1,
                                        ID:7

                                    },
                                    {
                                        Course:"CS6350 - Empirical Research Methods",
                                        Professor:"Peter Matthew",
                                        Lecture_Hours:"5:00pm-7:00pm",
                                        Location:"Ell Hall 155",
                                        Type:"Human Computer Interaction",
                                        Hours:10,
                                        T1:55,
                                        T2:35,
                                        T3:9,
                                        T4:1,
                                        ID:7

                                    }
                                ]
                            }
                            else if(vm.recommendData[0].exam_or_assignment==="Strong_agree"||
                                vm.recommendData[0].exam_or_assignment==="Agree")
                            {

                                vm.courseData=[{
                                    Course:"CS5100 - Foundations of Artificial Intelligence",
                                    Professor:"Peter Pat",
                                    Lecture_Hours:"5:00pm-7:00pm",
                                    Location:"Forsyth Hall 90",
                                    Type:"Artificial Intelligence",
                                    Hours:8,
                                    T1:55,
                                    T2:35,
                                    T3:9,
                                    T4:1,
                                    ID:1

                                },
                                    {
                                        Course:"CS5355 - Robotic Science and Systems",
                                        Professor:"Alice Anne",
                                        Lecture_Hours:"5:00pm-7:00pm",
                                        Location:"Snell Library 135",
                                        Type:"Artificial Intelligence",
                                        Hours:12,
                                        T1:55,
                                        T2:35,
                                        T3:9,
                                        T4:1,
                                        ID:1

                                    },
                                    {
                                        Course:"CS6110 - Knowledge-Based Systems",
                                        Professor:"Anna Williams",
                                        Lecture_Hours:"5:00pm-7:00pm",
                                        Location:"Snell Library 455",
                                        Type:"Artificial Intelligence",
                                        Hours:10,
                                        T1:55,
                                        T2:35,
                                        T3:9,
                                        T4:1,
                                        ID:1

                                    }
                                ]
                            }
                            else if(vm.recommendData[0].textbook_like==="Strong_agree"||
                                vm.recommendData[0].textbook_like==="Agree")
                            {

                                vm.courseData=[{
                                    Course:"CS5700 - Fundamentals of Computer Networking",
                                    Professor:"Cling Pat",
                                    Lecture_Hours:"5:00pm-7:00pm",
                                    Location:"Snell Library 25",
                                    Type:"Networks",
                                    Hours:8,
                                    T1:55,
                                    T2:35,
                                    T3:9,
                                    T4:1,
                                    ID:4

                                },
                                    {
                                        Course:"CS5750 - Social Computing",
                                        Professor:"Ram Raj",
                                        Lecture_Hours:"5:00pm-7:00pm",
                                        Location:"Ryders 67",
                                        Type:"Networks",
                                        Hours:12,
                                        T1:55,
                                        T2:35,
                                        T3:9,
                                        T4:1,
                                        ID:4

                                    },
                                    {
                                        Course:"CS6710 - Wireless Network",
                                        Professor:"Fara Tiyara",
                                        Lecture_Hours:"5:00pm-7:00pm",
                                        Location:"Hartig Hall 155",
                                        Type:"Networks",
                                        Hours:10,
                                        T1:55,
                                        T2:35,
                                        T3:9,
                                        T4:1,
                                        ID:4

                                    }
                                ]
                            }
                            else if(vm.recommendData[0].research_paper==="Strong_agree"||
                                vm.recommendData[0].research_paper==="Agree")
                            {
                                vm.courseData=[{
                                    Course:"CS5200 - Database Management Systems",
                                    Professor:"Jon David",
                                    Lecture_Hours:"5:00pm-7:00pm",
                                    Location:"West Village 125",
                                    Type:"Database",
                                    Hours:8,
                                    T1:55,
                                    T2:35,
                                    T3:9,
                                    T4:1,
                                    ID:5

                                },
                                    {
                                        Course:"CS6140 - Machine Learning",
                                        Professor:"Williams Clever",
                                        Lecture_Hours:"5:00pm-7:00pm",
                                        Location:"East Village 135",
                                        Type:"Database",
                                        Hours:12,
                                        T1:55,
                                        T2:35,
                                        T3:9,
                                        T4:1,
                                        ID:5

                                    },
                                    {
                                        Course:"CS6200 - Information Retrieval",
                                        Professor:"Andrew Bernerd",
                                        Lecture_Hours:"5:00pm-7:00pm",
                                        Location:"Richards Hall 95",
                                        Type:"Database",
                                        Hours:10,
                                        T1:55,
                                        T2:35,
                                        T3:9,
                                        T4:1,
                                        ID:5

                                    }
                                ]

                            }
                            else{
                                vm.courseData=[{
                                    Course:"CS5610 - Web Development",
                                    Professor:"Andrea Williams",
                                    Lecture_Hours:"5:00pm-7:00pm",
                                    Location:"Cargill Hall 90",
                                    Type:"Software Engineering",
                                    Hours:8,
                                    T1:55,
                                    T2:35,
                                    T3:9,
                                    T4:1,
                                    ID:3

                                },
                                    {
                                        Course:"CS6510 - Advanced Software Development",
                                        Professor:"Abraham Lincoln",
                                        Lecture_Hours:"5:00pm-7:00pm",
                                        Location:"Egan Center 78",
                                        Type:"Software Engineering",
                                        Hours:12,
                                        T1:55,
                                        T2:35,
                                        T3:9,
                                        T4:1,
                                        ID:3

                                    },
                                    {
                                        Course:"CS6520 - Methods of Software Development",
                                        Professor:"Mike Jon",
                                        Lecture_Hours:"5:00pm-7:00pm",
                                        Location:"Shillman Hall 320",
                                        Type:"Software Engineering",
                                        Hours:10,
                                        T1:55,
                                        T2:35,
                                        T3:9,
                                        T4:1,
                                        ID:3

                                    }
                                ]
                            }

                        }
                    }
                )



        }
        init();


        function clearFilter(){

            console.log("xxx"+$scope.filterOptions.stores[0]);
            $scope.filterItem = {
                store: $scope.filterOptions.stores[0]
            };
            //store: $scope.filterOptions.stores[0]
            $scope.filterItem1 = {
                store1: $scope.filterOptions1.stores1[0]
            };


        }
        function setGradeData(){

            var recdata = {"project_like": vm.result,
                "team_like": vm.result2,
                "exams_or_assignments": vm.result3,
                "research_paper": vm.result4};
            console.log("Pranav:::"+ JSON.stringify(recdata));
            RecommendService
                .createRecommend(vm.userId, recdata)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.userId+"/courses");
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