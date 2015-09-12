'use strict';

/* jasmine specs for controllers go here */
describe('MathApp controllers', function () {

    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });
    beforeEach(module('mathApp'));
    beforeEach(module('mathAppServices'));

    describe('homeController', function () {
        var scope, ctrl;

        beforeEach(inject(function ($rootScope, $controller) {
           
            var mainMenuData = {
                mainMenuTitleText: "Welcome",
                exerciseTabs: [
                [
                        {
                            name: "N1a",
                            url: "#/objectsCounter",
                            bcgColor: "{'background': '#FFB2FF','color': '#FFFFFF'}",
                            textColor: "{'color': '#FFFFFF'}"
                    }
                ]
            ]
            };

            scope = $rootScope.$new();
            ctrl = $controller('homeController', {
                $scope: scope,
                menuData:mainMenuData
            });
        }));


        it('should recieve main menu data from backend', function () {
            expect(scope.mainMenu).toBeDefined();
        });
    });


    describe('exerciseOneController', function () {
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function ($rootScope, $controller) {

            var async = {
                imgUrl: "assets/img/pink-flower.png",
                numLimit: 10,
                randomNumberArray: "",
                titleText: "How many flowers do you see?",
                checkButtonText: "Check"
            };

            scope = $rootScope.$new();

            ctrl = $controller('exerciseOneController', {
                $scope: scope,
                exerciseData: async
            });
        }));

        it('Shold check whether the texts are set correctly', function () {
            expect(scope.data.titleText).toBe("How many flowers do you see?");
        });


        it('Should calculate the object size max', function () {
            expect(scope.data.size).toBeDefined();
        });

        it('Should create 10 exercises in one array', function () {
            expect(ctrl.subExes.length).toBe(10);
        });
    });

});
