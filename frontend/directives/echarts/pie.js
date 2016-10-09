angular.module(window.PROJACT_Name).directive("pie", function($timeout, $rootScope, CONFIG) {
            var directive = {
                restrict: 'AE',
                scope: true,
                //replace: true,
                template: '<div class="echarts-pie" style="height:100%;"></div>',
                link: function(scope, element, attrs) {
                    var option = {
                        title: {
                            text: 'IOS&Android',
                            x: 'center',
                            textStyle: {
                                fontSize: 14,
                                color: "rgb(51, 51, 51)"
                            },
                            borderColor: "#ccc",
                            padding: 20
                        },
                        //tooltip: {trigger: 'item', formatter: '{b} : {c} ({d}%)'},
                        tooltip: {
                            trigger: 'item',
                            formatter: function(val) {
                                return val.name + ': ' + CONFIG.transferKbit(val.value) + ' (' + val.percent + '%)';
                            }
                        },
                        // legendData : ['版本01', '版本02']
                        legend: {
                            x: 'center',
                            y: 'bottom',
                            top: 430,
                            data: ['IOS', 'ANDROIDAND']
                        },
                        calculable: true,
                        grid:{
                            y1:80
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
                        // seriesData : [{value:50, name:'版本01'}, {value:50, name:'版本01'}]
                        series: [{
                            name: '',
                            type: 'pie',
                            radius: [100, 140],
                            clockWise: false,
                            x: 100,
                            data: []
                        }],
                        color: ['#1AC060', '#009EF5', '#BACF00', '#008A77', '#32CBF6', '#FEE14B']
                            //olor: ['#65b9f5', '#f49465', '#52c168', '#f1da3a', '#ec605f']
                    };
                    scope.$watch(attrs.pie, function(newValue, oldValue) {
                            if (!!newValue) {
                                option.legend.data = newValue.legend;
                                option.title.text = newValue.title;
                                var newData = newValue.series;
                                for (var i = 0; i < newData.length; i++) {
                                    for (var j = i + 1; j < newData.length; j++) {
                                        if (newData[i].value > newData[j].value) {
                                            var tmp = newData[i].value;
                                            var tmpName = newData[i].name;
                                            newData[i].value = newData[j].value;
                                            newData[j].value = tmp;
                                            newData[i].name = newData[j].name;
                                            newData[j].name = tmpName;
                                        }
                                    }
                                }
                                    option.series[0].data = newValue.series;
                                    if (!!element.hasClass('busy')) {
                                        if (!$rootScope.lazyLoadList) {
                                            $rootScope.lazyLoadList = [];
                                        }
                                        return $rootScope.lazyLoadList.push({
                                            element: element,
                                            top: $(element).offset().top,
                                            back: function() {
                                                var chart = echarts.init(element[0]);
                                                chart.setOption(option);
                                            }
                                        });
                                    }
                                    var chart = echarts.init(element[0]);
                                    chart.setOption(option);
                                }
                            });
                    }
                };
                return directive;
            });