"use strict";
angular.module(window.PROJACT_Name).controller('addtion_controller',
    function ($rootScope, $scope, $state, CONFIG, fetchService) {
        var api = CONFIG.api[$state.current.name];
        $scope.addtion = {};
        $scope.addtion.types = 1;
        var baseVersion = {
            vCode: '',
            filename: '',
            detail: ''
        };
        $scope.addtion.vList = [
            angular.extend({}, baseVersion)
        ];
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
                url: api.add,
                data: data
            }).then(function (ret) {
                ret = ret[0].data;
                console.log(ret);
                if (ret.error_code - 0 !== 0) {
                    return $rootScope.poplayer = {
                        type: 'error',
                        content: ret.msg || '组件提交失败'
                    };
                }
                return $rootScope.poplayer = {
                    type: 'succ',
                    content: '组件提交成功',
                    redirect: function () {
                        $state.go('index');
                    }
                };
            });
        };
    });