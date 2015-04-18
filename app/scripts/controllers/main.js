'use strict';

/**
 * @ngdoc function
 * @name materialChatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the materialChatApp
 */
angular.module('materialChatApp')
    .controller('MainCtrl', function ($scope, user, Auth) {
    var vm = this;

    vm.user = user;
    $scope.$parent.pageTitle = 'Home';
    $scope.$parent.hideHeader = false;
    $scope.$parent.hideFooter = false;
    $scope.$parent.logout = function() { Auth.$unauth(); };
});
