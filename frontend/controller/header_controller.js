"use strict"
angular.module(window.PROJACT_Name).controller('header_controller', function ($rootScope, $scope, $state, CONFIG) {
    $scope.username = CONFIG.USERINFOS.user;
    var from = 'http://' + location.host + location.pathname.replace(/[^\/]+\.html/i, 'index.html'); // '/frontend/loginSuccess.html';
    $scope.login = from;
});