"use strict";
angular.module(window.PROJACT_Name).controller('product_controller',
    function ($rootScope, $scope, $state, CONFIG, fetchService) {
        var api = CONFIG.api[$state.current.name];
        $scope.product = {};
        $scope.product.types = 1;
        var baseVersion = {
            vCode: '',
            filename: '',
            detail: ''
        };
    });