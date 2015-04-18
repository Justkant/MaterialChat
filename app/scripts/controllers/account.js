'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('materialChatApp')
    .controller('AccountCtrl', function ($scope, user, Auth, Ref, $firebaseObject) {
    var vm = this;

    vm.user = user;
    $scope.$parent.pageTitle = 'Account';
    $scope.$parent.hideHeader = false;
    $scope.$parent.hideFooter = false;
    $scope.$parent.logout = function() { Auth.$unauth(); };

    var profile = $firebaseObject(Ref.child('users/'+user.uid));

    vm.changePassword = function(oldPass, newPass, confirm) {
        if( !oldPass || !newPass ) {
            toast('Please enter all fields');
        }
        else if( newPass !== confirm ) {
            toast('Passwords do not match');
        }
        else {
            Auth.$changePassword({email: profile.email, oldPassword: oldPass, newPassword: newPass})
                .then(function() {
                toast('Password changed');
            }, toast);
        }
    };

    vm.changeEmail = function(pass, newEmail) {
        Auth.$changeEmail({password: pass, newEmail: newEmail, oldEmail: profile.email})
            .then(function() {
            profile.email = newEmail;
            profile.$save();
            toast('Email changed');
        })
            .catch(toast);
    };

    function toast(msg) {
        Materialize.toast(msg, 4000);
    }

});
