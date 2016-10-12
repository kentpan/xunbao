"use strict";
angular.module(window.PROJACT_Name)
    .controller('product_controller', function ($rootScope, $scope, $state, $timeout, CONFIG, fetchService) {
        var api = CONFIG.api[$state.current.name];
        $scope.product = {};
        var page = 1;
        var pageSize = 20;
        $scope.product.images = [];
        $scope.product.isEnd = false;
        $scope.product.setStatus = function (e, data) {
            var list = $scope.product.images;
            $scope.product.selectedProduct = null;
            angular.forEach(list, function (v, k) {
                if (v.$$hashKey === data.$$hashKey && !data.isSelected) {
                    v.isSelected = true;
                    $scope.product.selectedProduct = v;
                } else {
                    delete v.isSelected;
                }
            });
        };
        $scope.product.selectedToCanvas = function () {
            $rootScope.commCache.selectedProduct = $scope.product.selectedProduct;
            return $state.go('canvas', {});
        };

        function pushData(p) {
            var params = {
                page: p
            };
            fetchService.get({
                    url: api.get,
                    data: params
                })
                .then(function (ret) {
                    ret = ret[0].data;
                    if (ret.ret - 0 !== 0) {
                        return $rootScope.poplayer = {
                            type: 'error',
                            content: ret.msg || '接口异常!'
                        };
                    }
                    if (ret.data.length) {
                        ret.data = ret.data.map(function (item) {
                            if (!!/^images/i.test(item.url)) {
                                item.url = CONFIG.webRoot + 'modules/common/waterfall/' + item.url;
                                return item;
                            }
                        });
                        $scope.product.images = $scope.product.images.concat(ret.data);
                        // $scope.product.images = ret.data;
                        if ($scope.product.images.length >= 50) {
                            $scope.product.images = $scope.product.images.splice(0, 50);
                            return $scope.$emit("waterfall:isEnd");
                        }
                        $timeout(function () {
                            $scope.product.text = "下一页";
                            $scope.$emit("waterfall:repeatFinished");
                        }, 300);
                    } else {
                        $scope.$emit("waterfall:isEnd");
                    }
                });
        }
        pushData(page);
        // $scope.product.text = "加载更多...";
        $scope.product.loadMore = true;
        $scope.product.loadMoreData = function () {
            if (!!$scope.product.isEnd) {
                return;
            }
            if ($scope.product.images.length >= 50) {
                return $scope.$emit("waterfall:isEnd");
            }
            $scope.product.text = "加载中，请稍后···";
            pushData(++page);
        };
        $rootScope.$on("waterfall:isEnd", function () {
            console.log("waterfall:isEnd");
            $scope.product.text = "没有更多了...";
            $scope.product.isEnd = true;
        });

        // 如果想禁止使用瀑布流方式展示请屏蔽掉下面的代码
        $scope.$on("waterfall:loadMore", function () {
            if (!!$scope.product.isEnd) {
                return;
            }
            $scope.product.text = "加载中，请稍后···";
            $scope.product.loadMoreData();
        });


    });

