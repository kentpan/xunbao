/**
 * @file index_controller the file
 */
'use strict';
angular.module(window.PROJACT_Name).controller('canvas_controller',
    function ($rootScope, $scope, $state, CONFIG, fetchService) {
        var api = CONFIG.api[$state.current.name];
        /*fetchService.jsonp([{
            url: api.list,
            data: {}
        }]).then(function (ret) {
            console.log(ret, '==================');
        });*/
        $scope.canvas = {};
        $scope.canvas.canvasConf = {
            bg: $rootScope.commCache.canvasConfBg || CONFIG.webRoot + 'modules/common/imgController/imgs/bg1.jpg',
            product: $rootScope.commCache.selectedProduct ? $rootScope.commCache.selectedProduct.url : ''
        };
    });