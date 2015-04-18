'use strict';

describe('Directive: Rooms', function () {

  // load the directive's module
  beforeEach(module('materialChatApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-rooms></-rooms>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the Rooms directive');
  }));
});
