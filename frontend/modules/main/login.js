var mba = angular.module('xunbao', []);
/**
 * Login Controller
 */

mba.controller('LoginCtrl', function ($rootScope, $scope) {
    $scope.year = new Date().getFullYear();
    var path = location.pathname.match(/^.*\//);
    // $scope.uuap_callback_url = "http://" + location.host + path + 'run.html#/index';
});
