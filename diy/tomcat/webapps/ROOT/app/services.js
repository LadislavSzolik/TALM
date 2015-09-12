var mathAppServices = angular.module('mathAppServices', ['ngResource']);

mathAppServices.service('exercises', ['$http',
    function ($http) {
        var exerciseService = {
            numOfdoppedObjects: 0,

            getNumberCounterExercise: function () {
                /* needs to be changed to backend call */
                return $http.get('assets/data/objectCounterData.json').then(function (result) {
                    return result.data;
                });
            },
            getDragAndDropDataExercise: function () {
                /* needs to be changed to backend call */
                return $http.get('assets/data/dragAndDropData.json').then(function (result) {
                    return result.data;
                });
            }
        }



        return exerciseService;
  }]);

mathAppServices.factory('mainMenu', ['$http',
    function ($http) {
        var getMenuData = function () {
            return $http.get('assets/data/listOfExercises.json').then(function (result) {
                return result.data;
            });
        };
        return {
            getMenuData: getMenuData
        };
}]);



mathAppServices.service(
    "modals", ['$rootScope', '$q',

    function ($rootScope, $q) {

            var modal = {
                deferred: null,
                params: null
            };

            return ({
                open: open,
                params: params,
                reject: reject,
                resolve: resolve
            });

            function open(type, params, pipeResponse) {

                var previousDeferred = modal.deferred;
                modal.deferred = $q.defer();
                modal.params = params;

                $rootScope.$emit("modals.open", type);

                return (modal.deferred.promise);

            }

            function params() {
                return (modal.params || {});
            }


            function reject(reason) {
                if (!modal.deferred) {
                    return;
                }
                modal.deferred.reject(reason);
                modal.deferred = modal.params = null;
                $rootScope.$emit("modals.close");

            }

            function resolve(response) {
                if (!modal.deferred) {
                    return;
                }

                modal.deferred.resolve(response);
                modal.deferred = modal.params = null;
                $rootScope.$emit("modals.close");
            }

    }]
);
