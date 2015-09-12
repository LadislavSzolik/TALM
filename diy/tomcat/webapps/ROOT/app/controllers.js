var controllers = angular.module('mathAppControllers', ['ngRoute', 'ngAnimate']);

controllers.controller('homeController', ['$scope', 'menuData', function ($scope, menuData) {
    $scope.mainMenu = menuData;
}]);

controllers.controller('dragAndDropController', ['$scope', 'exerciseData', 'modals', '$rootScope', 'exercises', function ($scope, exerciseData, modals, $rootScope, exercises) {
    var self = this;
    var holderFrameHeight = 239;
    var holderFrameWidth = 239;
    var holderFrameArea = holderFrameHeight * holderFrameHeight;


    // to make object distribution possible
    var limitCorrection = findNextSqrt(25);

    $scope.numOfdoppedObjects = exercises.numOfdoppedObjects;

    $scope.data = exerciseData;
    $scope.data.size = Math.sqrt(parseInt(holderFrameArea / limitCorrection));

    var rowLimit = parseInt(holderFrameHeight / $scope.data.size);
    var colLimit = parseInt(holderFrameWidth / $scope.data.size);

    /* Temp solution for random function, will be replaced with backend logic */
    var numberArr = getNumberArr(exerciseData.numLimit, 3);

    self.subExes = [];
    for (i = 0; i < 6; i++) {
        var startingNumberOfObjets = 25;
        var targetNumber = (numberArr.splice(Math.floor(Math.random() * numberArr.length), 1))[0];
        var positionArray = [];
        var possiblePositions = getNumberArr(rowLimit * rowLimit, 1);
        for (var j = 0; j < startingNumberOfObjets; j++) {
            elementPosition = (possiblePositions.splice(Math.floor(Math.random() * possiblePositions.length), 1))[0];
            var coorX = parseInt($scope.data.size * (elementPosition % colLimit));
            var coorY = parseInt($scope.data.size * (parseInt(elementPosition / colLimit)));
            positionArray.push({
                left: (coorX + 10) + 'px',
                top: (coorY + 10) + 'px'
            });
        }
        var subExercise = {
            number: targetNumber,
            placedObjs: [],
            resultFieldStyle: {
                background: 'rgba(235, 123, 19,0.8)'
            },
            objPositions: positionArray
        };

        self.subExes.push(subExercise);
    }

    $scope.checkResult = function () {
        self.result = 0;
        $rootScope.$emit('validate.result');
        for (var i = 0; i < self.subExes.length; i++) {
            if (self.subExes[i].number == self.subExes[i].placedObjs.length) {
                self.result++;
            }
        }
        $scope.resultCheck = $scope.data.finalScoreText + ': ' + self.result + '/6';
        $scope.scoreActive = true;
    }

}]);


controllers.controller('exerciseOneController', ['$scope', 'exerciseData', 'modals', '$rootScope', 'exercises', function ($scope, exerciseData, modals, $rootScope, exercises) {

    var self = this;
    var holderFrameHeight = 239;
    var holderFrameWidth = 239;
    var holderFrameArea = holderFrameHeight * holderFrameHeight;

    // to make object distribution possible
    var limitCorrection = findNextSqrt(exerciseData.numLimit);


    if (angular.isUndefined(exercises.subviewInit) || exercises.subviewInit == null) {
        $scope.subviewInit = "demo";
        exercises.subviewInit = "demo";
        modals.open("demo");
        $scope.closeDemo = modals.resolve;
    }

    $scope.data = exerciseData;
    $scope.data.size = Math.sqrt(parseInt(holderFrameArea / limitCorrection));

    var rowLimit = parseInt(holderFrameHeight / $scope.data.size);
    var colLimit = parseInt(holderFrameWidth / $scope.data.size);

    /* Temp solution for random function, will be replaced with backend logic */
    var numberArr = getNumberArr(exerciseData.numLimit, 3);

    self.subExes = [];
    for (i = 0; i < 6; i++) {
        var currentNumOfObjects = (numberArr.splice(Math.floor(Math.random() * numberArr.length), 1))[0];
        var positionArray = [];
        var possiblePositions = getNumberArr(rowLimit * rowLimit, 1);
        for (var j = 0; j < currentNumOfObjects; j++) {
            elementPosition = (possiblePositions.splice(Math.floor(Math.random() * possiblePositions.length), 1))[0];
            var coorX = parseInt($scope.data.size * (elementPosition % colLimit));
            var coorY = parseInt($scope.data.size * (parseInt(elementPosition / colLimit)));
            positionArray.push({
                left: (coorX + 10) + 'px',
                top: (coorY + 10) + 'px'
            });
        }
        var subExercise = {
            number: currentNumOfObjects,
            resultStyle: {
                background: 'rgba(255, 255, 255, 0)'
            },
            objPositions: positionArray
        };

        self.subExes.push(subExercise);

        // prepare example
        if (angular.isUndefined($scope.example)) {
            $scope.example = subExercise;

        }
    }



    $scope.checkResult = function (isFormInvalid) {
        if (isFormInvalid === true) {
            var promise = modals.open(
                "result-check-incomplete", {
                    title: $scope.data.resultcheckIncompleteText,
                    yesText: $scope.data.yesText,
                    noText: $scope.data.noText
                }
            );
            promise.then(
                function handleResolve(response) {
                    if (response.isCheckRequired === "true") {
                        checkScore();
                    }
                }
            );

        } else {
            checkScore();
        }
    }


    var checkScore = function () {
        self.result = 0;
        $rootScope.$emit('validate.result');
        for (var i = 0; i < self.subExes.length; i++) {
            if (self.subExes[i].number == parseInt(self.subExes[i].userInput)) {
                self.result++;
            }
        }
        $scope.resultCheck = $scope.data.finalScoreText + ': ' + self.result + '/6';
        $scope.scoreActive = true;
    }

}]);

controllers.controller('resultCheckModalController', ['$scope', 'modals', function ($scope, modals) {
    $scope.resultcheckIncompleteText = modals.params().title;
    $scope.yesText = modals.params().yesText;
    $scope.noText = modals.params().noText;

    $scope.closeResultCheck = function (isCheckRequired) {
        modals.resolve({
            isCheckRequired: isCheckRequired
        });
    }

}]);

controllers.controller('exampleModalController', ['$scope', 'modals', function ($scope, modals) {
    $scope.exampleTitleText = modals.params().exampleTitleText;
    $scope.solutionText = modals.params().solutionText;
}]);
