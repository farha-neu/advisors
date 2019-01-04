module.exports = function(app, models) {

    var recommendModel = models.recommendModel;

    app.post("/api/user/:userId/recdata", createRecommendation);
    app.get("/api/user/:userId/fetchrecdata",fetchRecommend);

    function createRecommendation(req, res) {

        console.log("PPPPPP=========>::"+JSON.stringify(req.body));
        var userId = req.params.userId;
        var newRecommendation = req.body;
        console.log("serverside"+JSON.stringify(newRecommendation));
        recommendModel
            .findRecommendById(userId)
            .then(
                function (data1) {
                    if(data1.length>0){
                        recommendModel
                            .deleteRecommendThread(userId)
                            .then(
                                recommendModel
                                    .createRecommendModelForUser(userId, newRecommendation)
                                    .then(
                                        function (newRecommendation) {
                                            res.json(newRecommendation);
                                        },
                                        function (error) {
                                            res.statusCode(400).send(error);
                                        }
                                    )
                            )

                    }
                    else{
                        recommendModel
                            .createRecommendModelForUser(userId, newRecommendation)
                            .then(
                                function (newRecommendation) {
                                    res.json(newRecommendation);
                                },
                                function (error) {
                                    res.statusCode(400).send(error);
                                }
                            )

                    }

                }
            )
 /*       recommendModel
            .createRecommendModelForUser(userId, newRecommendation)
            .then(
                function (newRecommendation) {
                    res.json(newRecommendation);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            )*/
    }

    function fetchRecommend(req,res){
        console.log("inside fetching recdata");
        var userId = req.params.userId;
        recommendModel
            .findRecommendById(userId)
            .then(
                function (recdata) {
                    res.json(recdata);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }
};