/**
 * @file index_controller the file
 */
'use strict';
angular.module(window.PROJACT_Name).controller('index_controller',
    function ($rootScope, $scope, $state, CONFIG, fetchService) {
        var api = CONFIG.api[$state.current.name];
        fetchService.jsonp([{
            url: api.list,
            data: {}
        }]).then(function (ret) {
            console.log(ret, '==================');
        });
    });