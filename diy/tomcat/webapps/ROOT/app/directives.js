var mathAppDirectives = angular.module('mathAppDirectives', []);

mathAppDirectives.directive(
    "mathModals", ['$rootScope', 'modals', '$animate',
    function ($rootScope, modals, $animate) {

            return (link);

            function link(scope, element, attributes) {

                scope.subview = scope.subviewInit || null;

                element.on(
                    "click",
                    function handleClickEvent(event) {
                        if (element[0] !== event.target) {
                            return;
                        }
                        scope.$apply(modals.reject);
                    }
                );


                $rootScope.$on(
                    "modals.open",
                    function handleModalOpenEvent(event, modalType) {
                        scope.subview = modalType;


                    }
                );
                $rootScope.$on(
                    "modals.close",
                    function handleModalCloseEvent(event) {
                        scope.subview = null;
                        $animate.leave(element);
                    }
                );

            }

    }]
);

mathAppDirectives.directive('mathObject', ['$rootScope', function ($rootScope) {
    return (link);

    function link(scope, element, attributes) {
        $rootScope.$on('demo.play', function () {

            jQuery(element).css({
                position: 'absolute',
                top: attributes.futureHeight / 2 + 'px',
                left: attributes.futureHeight / 2 + 'px'
            });

            jQuery(element).delay(100 + (100 * attributes.objectDelay)).animate({
                'height': attributes.futureHeight + 'px',
                'top': '0px',
                'left': '0px'
            }, 800, 'easeInExpo');
        });

    }
}]);


mathAppDirectives.directive('demoPlayBtn', ['$rootScope', function ($rootScope) {
    return (link);

    function link(scope, element, attributes) {

        element.on('click', function handleClickEvent(event) {
            var buttonDetails = {};
            buttonDetails.overall = attributes.demoResult;
            if (attributes.demoResult > 9) {
                var resultInString = attributes.demoResult.toString();
                buttonDetails.numberOne = parseInt(resultInString.substring(0, 1));
                buttonDetails.numberTwo = parseInt(resultInString.substring(1, 2));
            } else {
                buttonDetails.numberOne = attributes.demoResult;
            }

            $rootScope.$emit('demo.play', buttonDetails);
            jQuery(element).fadeOut(200);
        });
    }
}]);


mathAppDirectives.directive('closeButton', ['$location', '$rootScope', 'modals', 'exercises', function ($location, $rootScope, modals, exercises) {
    return {
        link: link,
        templateUrl: 'app/components/grafics/closeButton.html'
    }

    function link(scope, element, attributes) {
        element.on('click', function handleClickEvent(event) {
            if (attributes.whatToClose == 'exercise') {
                if (angular.isDefined(exercises.subviewInit)) {
                    exercises.subviewInit = null;
                }
                $location.path('/');
                scope.$apply();
            } else if (attributes.whatToClose == 'demo') {
                // this action is handled from the exercise controller
            }
        });
    }

}]);


mathAppDirectives.directive('reloadExerciseButton', ['$route', function ($route) {
    return {
        link: link,
        templateUrl: 'app/components/grafics/refreshButton.html'
    }

    function link(scope, element, attributes) {
        element.on('click', function handleClickEvent(event) {
            $route.reload();
        });
    }
            }]);


mathAppDirectives.directive('resultInputField', ['$rootScope', '$interval', function ($rootScope, $interval) {
    return {
        link: link
    }

    function link(scope, element, attributes) {


        $rootScope.$on('demo.play', function (event, buttonDetails) {

            if (attributes.isDemo === "true") {
                var overallDelay = 1500 + buttonDetails.overall * 100;
                if (angular.isDefined(buttonDetails.numberTwo)) {
                    overallDelay += 1000;
                }
                $interval(function () {
                    jQuery(element).val(buttonDetails.overall);
                    jQuery(element).animate({
                        'background-color': 'rgba(0, 255, 0, .4)'
                    }, 800);
                }, overallDelay);
            }
        });

        $rootScope.$on('validate.result', function () {
            var validatedBcgColor = 'rgba(255, 0, 0, .5)';
            if (jQuery(element).val() === attributes.expectedInput) {
                validatedBcgColor = 'rgba(0, 255, 0, .5)'
            }
            jQuery(element).animate({
                'background-color': validatedBcgColor,
            }, 800);
        });

    }
}]);



/* -----------------------------------------------------------*/
/* directive to add additional ability to correct the solution*/
/* -----------------------------------------------------------*/
mathAppDirectives.directive('removeButton', ['$location', '$rootScope', '$window', function ($location, $rootScope, $window) {
    return {
        scope: {
            typedValue: '=resultProposal',
            scoreActive: '='
        },
        transclude: true,
        link: link,
        templateUrl: 'app/components/grafics/removeButton.html',
        controller: function ($scope, $element, $attrs) {
            $scope.removeProposal = function () {
                if (angular.isDefined($scope.typedValue)) {
                    $scope.typedValue = $scope.typedValue.substring(0, $scope.typedValue.length - 1);
                }
            }
            $scope.getButtonStyle = function () {
                if (angular.isDefined($scope.scoreActive) && $scope.scoreActive) {
                    return 'remove-button-disabled';
                } else {
                    return 'remove-button';
                }
            }
        }
    }

    function link(scope, element, attributes) {}

}]);

/* ------------------------------------*/
/* directive to handle keyboard element*/
/* ------------------------------------*/
mathAppDirectives.directive('keyboard', function () {
    return {

        scope: {
            typedValue: '=resultProposal',
            scoreActive: '='
        },
        transclude: true,
        templateUrl: "app/components/grafics/keyboard.html",
        link: function (scope, elm, attrs) {
            scope.isDemo = attrs.isDemo;
        },
        controller: function ($scope, $element, $attrs) {

            $scope.updatePoposal = function (newVal) {
                if (angular.isUndefined($scope.typedValue)) {
                    $scope.typedValue = String(newVal);
                } else if ($scope.typedValue.length < 2) {
                    $scope.typedValue = $scope.typedValue + String(newVal);
                }

            }
        }
    }
});

mathAppDirectives.directive('keyboardButton', ['$rootScope', function ($rootScope) {
    return {
        link: link
    }

    function link(scope, element, attributes) {

        $rootScope.$on('demo.play', function (event, buttonDetails) {

            if (attributes.isDemoKey == 'true' && (attributes.value == buttonDetails.numberOne || attributes.value == buttonDetails.numberTwo)) {
                var generalDelay = 1500 + buttonDetails.overall * 100;

                if (attributes.value == buttonDetails.numberTwo) {
                    generalDelay += 500;
                }


                jQuery(element).delay(generalDelay).animate({
                    'background-color': 'rgba(255, 255, 255, 0.8)'
                }, 50, 'easeOutCubic').delay(200).animate({
                    'background-color': 'rgba(255, 255, 255, 0)'
                }, 500);
            }
        });

    }
            }]);


mathAppDirectives.directive('draggableObject', ['$document', function ($document) {
    return {
        link: function (scope, element, attr) {

            element.css({
                cursor: 'pointer'
            });
            element.draggable({
                revert: function (ui) {
                    if (!ui) {
                        return true;
                    }
                }
            });
        }
    };
}]);

mathAppDirectives.directive('droppableField', ['$document', '$rootScope', function ($document, $rootScope) {
    return {
        transclude: true,
        templateUrl: 'app/components/grafics/objectArea.html',
        scope: {
            exercise: '=',
            data: '=',
            imgRow: '='
        },
        controller: function ($scope) {},
        controllerAs: 'objectAreaCtrl',
        link: function (scope, element, attr, ctrl) {
            if (attr.isTarget == "true") {
                ctrl.area = null;
            } else {
                ctrl.area = scope.exercise;
            }

            $rootScope.$on('validate.result', function () {
                var validatedBcgColor = 'rgba(255, 0, 0, .5)';
                if (attr.isTarget == "true") {
                    if (scope.exercise.number === scope.exercise.placedObjs.length) {
                        validatedBcgColor = 'rgba(0, 255, 0, .5)'
                    }
                    jQuery(element).animate({
                        'background-color': validatedBcgColor,
                    }, 800);
                }
            });


            element.droppable({
                accept: function (ui) {
                    if (ui.attr("img-row") == attr.listRow) {
                        return true;
                    }
                },
                drop: function (event, ui) {
                    var index = scope.exercise.placedObjs.indexOf(ui.draggable.attr("img-seq"));
                    if (index > -1 && attr.isTarget == "false") {
                        scope.exercise.placedObjs.splice(index, 1);
                    } else if (index < 0 && attr.isTarget == "true") {
                        scope.exercise.placedObjs.push(ui.draggable.attr("img-seq"));
                    }
                }
            });
        }
    }
            }]);
