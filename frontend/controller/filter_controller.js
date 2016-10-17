"use strict";
angular.module(window.PROJACT_Name)
    .controller('filter_controller', function ($rootScope, $scope, $state, $timeout, CONFIG, fetchService) {
        var api = CONFIG.api[$state.current.name];
        $scope.filter = {};
        $scope.filter.defaultShow = false;


    });

