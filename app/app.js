var mathApp = angular.module('mathApp', ['ngRoute', 'mathAnimations', 'mathAppControllers', 'mathAppServices', 'mathAppDirectives'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
                templateUrl: 'app/components/home/homeView.html',
                controller: 'homeController',
                resolve: {
                    menuData: ['mainMenu', function (mainMenu) {
                        return mainMenu.getMenuData();
            }]
                }
            })
            .when('/objectsCounter', {
                templateUrl: 'app/components/exercises/objectsCounterView.html',
                controller: 'exerciseOneController',
                controllerAs: 'exercise',
                resolve: {
                    exerciseData: ['exercises', function (exercises) {
                        return exercises.getNumberCounterExercise();
            }]
                }
            })
            .when('/dragAndDropExercise', {
                templateUrl: 'app/components/exercises/dragAndDropExerciseView.html',
                controller: 'dragAndDropController',
                controllerAs: 'exercise',
                resolve: {
                    exerciseData: ['exercises', function (exercises) {
                        return exercises.getDragAndDropDataExercise();
                    }]
                }
            })
            .otherwise({
                redirectTo: '/'
            });
}]);
