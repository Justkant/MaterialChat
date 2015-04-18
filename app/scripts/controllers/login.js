'use strict';
/**
 * @ngdoc function
 * @name materialChatApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('materialChatApp')
    .controller('LoginCtrl', function ($scope, Auth, $location, $q, Ref, $timeout) {
    var vm = this;

    $scope.$parent.hideHeader = true;
    $scope.$parent.hideFooter = true;
    vm.passwordLogin = function() {
        Auth.$authWithPassword({email: vm.email, password: vm.pass}, {rememberMe: true}).then(
            redirect, showError
        );
    };

    vm.createAccount = function() {
        if( !vm.pass ) {
            showError('Please enter a password');
        }
        else if( vm.pass !== vm.confirm ) {
            showError('Passwords do not match');
        }
        else {
            Auth.$createUser({email: vm.email, password: vm.pass})
                .then(function () {
                // authenticate so we have permission to write to Firebase
                return Auth.$authWithPassword({email: vm.email, password: vm.pass}, {rememberMe: true});
            })
                .then(createProfile)
                .then(redirect, showError);
        }

        function createProfile(user) {
            var ref = Ref.child('users', user.uid), def = $q.defer();
            ref.set({email: vm.email, name: firstPartOfEmail(vm.email)}, function(err) {
                $timeout(function() {
                    if( err ) {
                        def.reject(err);
                    }
                    else {
                        def.resolve(ref);
                    }
                });
            });
            return def.promise;
        }
    };

    function firstPartOfEmail(email) {
        return ucfirst(email.substr(0, email.indexOf('@'))||'');
    }

    function ucfirst (str) {
        // inspired by: http://kevin.vanzonneveld.net
        str += '';
        var f = str.charAt(0).toUpperCase();
        return f + str.substr(1);
    }



    function redirect() {
        $location.path('/');
    }

    function showError(err) {
        Materialize.toast(err, 4000);
    }


});
