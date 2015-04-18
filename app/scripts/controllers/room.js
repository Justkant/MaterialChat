'use strict';

/**
 * @ngdoc function
 * @name materialChatApp.controller:RoomCtrl
 * @description
 * # RoomCtrl
 * Controller of the materialChatApp
 */
angular.module('materialChatApp')
    .controller('RoomCtrl', function ($scope, user, Auth) {
    var vm = this;

    vm.user = user;
    $scope.$parent.hideHeader = false;
    $scope.$parent.hideFooter = true;
    $scope.$parent.logout = function() { Auth.$unauth(); };
});
