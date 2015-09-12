'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Math App', function () {

    /*it('should redirect index.html to index.html#/', function () {
        browser.get('index.html');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toEqual('/');
        });
    });


    it('should redirect index.html to index.html#/objectsCounter', function () {
        browser.get('index.html');
        element(by.linkText('N1a')).click();
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toEqual('/objectsCounter');
        });
    });

    it('should be possible to see the example play button', function () {
        browser.get('index.html#/objectsCounter');
        var demoPlay = element(by.className('demo-play-button'));
        expect(demoPlay).toBeDefined();
    });

    it('should be possible to see the example play button', function () {
        browser.get('index.html#/objectsCounter');
        element(by.className('demo-play-button')).click();
         
        element.all(by.repeater('pos in example.objPositions')).then(function (elems) {            
            var howMany = elems.lengh;
            browser.sleep(2000 + (200 * howMany));
            var imgFromExample = element(by.repeater('pos in example.objPositions').row(0).column('data.imgUrl'));
            expect(imgFromExample).toBeDefined();
        });
        
    }); */

    /*
    it('should use the play example -> close modal -> close exercise button and go back to the main page', function() {
        browser.get('index.html#/objectsCounter');
        element(by.className('demo-play-button')).click().then(function() {

            browser.sleep(500);

            element(by.buttonText('Close')).click().then(function() {
                element(by.className('svg-back')).click().then(function() {
                    browser.getLocationAbsUrl().then(function(url) {
                        expect(url).toEqual('/');
                    });
                });
            })
        });
    });*/


    it('should enter the first exercise and fill up all the fields', function () {
        browser.get('index.html#/objectsCounter');
        element(by.className('demo-play-button')).click().then(function () {

            browser.sleep(500);

            element(by.buttonText('Close')).click().then(function () {
                //var containerExercise = element(by.className('container-fluid')).element(by.className('sub-exercise-table'));
                //expect(element(by.className('container-fluid')).element(by.className('exercise-task')).element(by.className('sub-exercise-table')).element(by.model('subExe.userInput'))).toBeDefined();
                //element(by.className('container-fluid')).element(by.className('sub-exercise-table')).element(by.model('subExe.userInput')).sendKeys(3);
                //element(by.className('container-fluid')).element(by.className('btn-ckeck-result')).click();
                //expect(element(by.className('container-fluid')).element(by.className('btn-ckeck-result'))).toMatch('/Final*/');
                element.all(by.model('subExe.userInput')).sendKeys(3).then(function (succ) {
                    console.log('Values successfully set');
                    element(by.className('btn-ckeck-result')).click();

                }, function (err) {
                    console.log('Error during sendKeys to the boxes:');
                    console.log(err);
                });

            });


        });

    });


});
