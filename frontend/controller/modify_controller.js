"use strict";
angular.module(window.PROJACT_Name).controller('modify_controller',
    function ($rootScope, $scope, $state, CONFIG, fetchService) {
        var api = CONFIG.api[$state.current.name];
        $scope.addtion = {};
        var id = $rootScope.params.id;
        if (!id) {
            return $rootScope.poplayer = {
                type: 'error',
                content: '参数错误!',
                redirect: function () {
                    return $state.go('index');
                }
            };
        }
        var baseVersion = {
            vCode: '',
            filename: '',
            detail: ''
        };
        // 是否显示删除按钮
        $scope.addtion.onlyOne = function () {
            return this.vList.length === 1 ? false : true;
        };
        // 删除版本
        $scope.addtion.removeVersion = function (evt) {
            var dom = evt.target;
            var wrap = dom.parentNode;
            var index = $(wrap).index();
            if (index >= 0) {
                this.vList.splice(index, 1);
            }
        };
        // 新增版本
        $scope.addtion.addVersion = function () {
            return this.vList.unshift(angular.extend({}, baseVersion));
        };
        $scope.addtion.post = function () {
            var data = angular.extend({}, this);
            delete data.post;
            delete data.addVersion;
            delete data.removeVersion;
            delete data.onlyOne;
            fetchService.jsonp({
                url: api.update,
                data: data
            }).then(function (ret) {});
        };
        fetchService.jsonp({
            url: api.search,
            data: {
                id: id
            }
        }).then(function (ret) {
            var result = ret[0].data;
            if (!result || !result.data) {
                return $rootScope.poplayer = {
                    type: 'error',
                    content: '数据异常!',
                    redirect: function () {
                        return $state.go('index');
                    }
                };
            }
            $scope.addtion = result.data[0] || [];
            if (!$scope.addtion.vList) {
                $scope.addtion.vList = [
                    angular.extend({}, baseVersion)
                ];
            }
            console.log(result, ret, $scope.addtion);
        });
    });