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
        $scope.canvas.switchBtn  = false;
        $scope.canvas.menuText   = '换 一 换';
        $scope.canvas.switchBtns = function (e) {
            console.log(e, $scope.canvas.switchBtn);
            if (!$scope.canvas.switchBtn) {
                $scope.canvas.switchBtn = true;
                $scope.canvas.menuText = '不 换 了';
            } else {
                $scope.canvas.switchBtn = false;
                $scope.canvas.menuText = '换 一 换';
            }
        };
        $scope.canvas.canvasConf = {
            bg: $rootScope.commCache.canvasConfBg || CONFIG.webRoot + 'modules/common/imgController/imgs/bg1.jpg',
            product: $rootScope.commCache.selectedProduct ? $rootScope.commCache.selectedProduct.url : ''
        };
        $scope.btns = {};
        $scope.btns.photo = {
            key: 'photo',
            value: '拍实景',
            href: '###',
            service: function (e) {
                console.log(e, this);
            }
        };
        $scope.btns.product = {
            key: 'product',
            value: '选艺品',
            href: '#/product',
            service: function (e) {
                console.log(e, this);
            }
        };
    });