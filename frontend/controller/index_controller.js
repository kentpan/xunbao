/**
 * @file index_controller the file
 */
'use strict';
angular.module(window.PROJACT_Name).controller('index_controller',
    function ($rootScope, $scope, $state, CONFIG, fetchService) {
        var api = CONFIG.api[$state.current.name];
        /*fetchService.jsonp([{
            url: api.list,
            data: {}
        }]).then(function (ret) {
            console.log(ret, '==================');
        });*/
        $scope.index = $scope.btns = $scope.canvas = {};
        $scope.canvas.switchBtn = true;
        $scope.index.canvasConf = {
            bg: $rootScope.commCache.canvasConfBg || CONFIG.webRoot + 'modules/common/imgController/imgs/bg1.jpg',
            product: ''
        };
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