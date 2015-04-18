'use strict';

/**
 * @ngdoc function
 * @name materialChatApp.controller:RoomsCtrl
 * @description
 * # RoomsCtrl
 * Controller of the materialChatApp
 */
angular.module('materialChatApp')
    .controller('RoomsCtrl', function ($scope, user, Auth) {
    var vm = this;

    vm.user = user;
    $scope.$parent.pageTitle = 'Rooms';
    $scope.$parent.hideHeader = false;
    $scope.$parent.hideFooter = true;
    $scope.$parent.logout = function() { Auth.$unauth(); };
});
