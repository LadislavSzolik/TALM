'use strict';

describe('service', function() {

    // load modules
    beforeEach(module('mathApp'));

    // Test service availability
    it('check the existence of exercises factory', inject(function(exercises) {
      expect(exercises).toBeDefined();
    }));
    
    it('check the existence of mainMenu factory', inject(function(mainMenu) {
      expect(mainMenu).toBeDefined();
    }));
    
    it('check the existence of modals service', inject(function(modals) {
      expect(modals).toBeDefined();
    }));
    
});
