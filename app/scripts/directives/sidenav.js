'use strict';

/**
 * @ngdoc directive
 * @name materialChatApp.directive:sidenav
 * @description
 * # sidenav
 */
angular.module('materialChatApp')
  .directive('sidenav', function () {
    return {
      restrict: 'E',
      compile: function(element) {
        element.sideNav();
      }
    };
  });
