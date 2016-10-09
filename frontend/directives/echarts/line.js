angular.module(window.PROJACT_Name).directive("line", function ($timeout, $rootScope, CONFIG) {
    var directive = {
        restrict: 'AE',
        scope: true,
        //replace: true,
        template: '<div class="echarts-line" style="height:100%;"></div>',
        link: function (scope, element, attrs) {
            var option = {
                title: {
                    text: '',
                    x: 'center',
                    textStyle: {fontSize: 14, color: 'rgb(51, 51, 51)'}, borderColor: '#ccc', padding: 20
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: "Temperature : {c}"
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    padding: 10,
                    data: []
                },
                toolbox: {
                    show: true,
                    padding: 30,
                    feature: {
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: [],
                        splitLine: false
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: '',
                        type: 'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: [11, 11, 15, 13, 12, 13, 10]
                    },
                    {
                        name: '',
                        type: 'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: [1, -2, 2, 5, 3, 2, 0]
                    }
                ],
                color: ['#1AC060', '#009EF5', '#BACF00', '#008A77', '#32CBF6', '#FEE14B']
            };
            scope.$watch(attrs.line, function (newValue, oldValue) {
                var chart = echarts.init(element[0]);
                if (!!newValue) {
                    option.xAxis[0].data = newValue.title;
                    option.series = newValue.series;
                    option.legend.data = newValue.legend;
                    angular.forEach(newValue.series, function (v, k) {
                        v.itemStyle = {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        }
                    });
                    if (newValue.suffix === '%') {
                        option.yAxis[0].axisLabel.formatter = function (parm) {
                            return parseInt(parm * 100) + '%'
                        }
                        option.tooltip.formatter = function (param) {
                            var _ret = [];
                            angular.forEach(param, function (o, i) {
                                var s = o.value == '-' ? 0 : (o.value * 100).toFixed(2) + '%';
                                _ret.push(o.seriesName + ': ' + s);
                            });
                            return _ret.join('</br>');
                        }
                    } else {
                        option.yAxis[0].axisLabel.formatter = function (parm) {
                            return CONFIG.transferKbit(parm);
                        }
                        option.tooltip.formatter = function (param) {
                            var _ret = [];
                            angular.forEach(param, function (o, i) {
                                var s = o.value == '-' ? 0 : /\.\d{4,}/.test(o.value.toString()) ? o.value.toFixed(2) : o.value;
                                _ret.push(o.name);
                                _ret.push(o.seriesName + ': ' + CONFIG.transferKbit(s));

                            });
                            return _ret.join('</br>');
                        }
                    }
                    if(scope.index.twoLine == false){
                        scope.index.lineWidth = $('#showEcharts').width();
                    }
                    if (!!element.hasClass('busy')) {
                        if (!$rootScope.lazyLoadList) {
                            $rootScope.lazyLoadList = [];
                        }
                        return $rootScope.lazyLoadList.push({
                            element: element,
                            top: $(element).offset().top,
                            back: function () {
                                var chart = echarts.init(element[0]);
                                chart.setOption(option);
                            }
                        });
                    }
                    
                    chart.setOption(option);
                } else if(newValue === null){
                    chart.dispose();
                    element.html('<div ng-show="index.notDataExpression" class="indexNotData"><img src="./frontend/theme/default/images/notdata.png" height="164" width="250"></div>');
                }
            });
        }
    };
    return directive;
});
