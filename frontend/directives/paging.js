angular.module(PROJACT_Name).directive('abPaging', function ($state, $rootScope) {
    return {
        restrict: 'A',
        replace: true,
        template: '<div class="datatable-bottom">\
                        <span class="rows"></span>\
                        <div class="pull-right">\
                                <select  ng-change="index.moduleSize(index.AitemsPerPage)"  ng-model="index.AitemsPerPage"   style="width:100px;height:30px; float:left; border-radius:5px; padding:1px 0; margin-right:20px; margin-top:20px;">\
                                   <option ng-repeat="v in index.myItemsPerPage">{{v.name}}</option>\
                                </select>\
                            <div id="DataTables_Table_0_paginate" style="float:left">\
                                <ul class="pagination pagination-sm">\
                                    <li ng-class="{disabled: currentPage == 0}">\
                                        <a href ng-click="prevPage()">◀</a>\
                                    </li>\
                                    <li ng-repeat="n in range(pages)" ng-class="{active: n == currentPage}" page="{{n}}" ng-click="setPage($event)"><a href ng-bind="n + 1">1</a></li>\
                                    <li ng-class="{disabled: currentPage == pages - 1}"> <a href ng-click="nextPage()">▶</a> </li>\
                                </ul>\
                            </div>\
                        </div>\
                    </div>',
        controller: function ($scope, $element, $attrs) {
            $scope.range = function (start, end) {
                var ret = [];
                if (!end) {
                    end = start;
                    start = 0;
                }
                for (var i = start; i < end; i++) {
                    ret.push(i);
                }
                return ret;
            };
            $scope.setPage = function ($event) {
                if ($scope.currentPage === this.n) {
                    return;
                }
                $scope.currentPage = this.n;
                if ($attrs.localPaging) {
                    return;
                }
                jump($rootScope.params.aid, $scope.currentPage + 1);
            };
            $scope.prevPage = function () {
                if ($scope.currentPage <= 0) {
                    return;
                }
                if ($scope.currentPage > 0) {
                    $scope.currentPage--;
                }
                if ($attrs.localPaging) {
                    return;
                }
                jump($rootScope.params.aid, $scope.currentPage + 1);
            };
            $scope.nextPage = function () {
                if ($scope.currentPage >= $scope.pages - 1) {
                    return;
                }
                if ($scope.currentPage < $scope.pages) {
                    $scope.currentPage++;
                }
                if ($attrs.localPaging) {
                    return;
                }
                jump($rootScope.params.aid, $scope.currentPage + 1);
            };
            function jump(aid, pg){
                $attrs.abPaging !== '' && $state.go($attrs.abPaging, {
                    aid: aid,
                    page: pg
                });
            }
        },
        link: function ($scope, $element, $attrs) {
        }
    }
});