'@file: app.config';
'use strict';
var isLocal = !!(/((kent|tianbin|qiuzhiqun|luoaihua)\.baidu\.com|\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3})/i
        .test(location.hostname)) || location.protocol === 'file:';
(function () {
    /*var html = $('html');
    var api = './frontend/api/permission.json';
    var ajax = $.ajax({
        url: api,
        headers: {
            'X-Requested-With': 'xmlhttprequest'
        },
        data: {_v: window.PROJACT_Version},
        dataType: 'json'
    });
    ajax.always(function (ret) {
        if ((ret.errno - 0) === 0) {
            window.USERINFOS = {
                user: ret.userName || 'user01',
                permission: ['all']
            };
            $.getScript('./frontend/modules/common/loading/loading.js', function () {
                angular.bootstrap(html[0], [PROJACT_Name]);
            });
        } else {
            // alert('请先登录!!');
            var path = location.pathname.match(/^.*\//);
            // var uuap_callback_url = "http://" + location.host + path + 'run.html#/index';
            //return location.href = (ret.redirect || 'https://uuap.baidu.com/login?service=' + uuap_callback_url);
            // return location.replace((ret.redirect || 'http://' + location.host + '/searchboxbi/api/login'));
        }
    });*/
    window.USERINFOS = {
        user: 'user01',
        permission: ['all']
    };
    $.getScript('./frontend/modules/common/loading/loading.js', function () {
        angular.bootstrap($('html')[0], [PROJACT_Name]);
    });
})();
angular.module(window.PROJACT_Name, ['ngRoute', 'ui.router', 'ngCookies', 'oc.lazyLoad']).constant('CONFIG', {
    debuger: false, // 是否开启debugger模式
    noCache: true,
    version: window.PROJACT_Version || '1.0.1',
    webRoot: './frontend/',
    getApi: function (online) {
        var uri = online.match(/[^\/]+$/);
        if (!!uri.length && online.indexOf('/api/api_') === -1) {
            uri = this.WebRoot + '/api/api_' + uri[0] + '.json';
        } else {
            uri = online;
        }
        return online;
    },
    transferKbit: function (num) {
        if (!num) {
            return '';
        }
        var output = num.toString();
        if (!!/^\d{4,}$/.test(output)) {
            output = output.replace(/(\d{1,2})(?=(\d{3})+\b)/g, '$1,');
        }
        return output;
    },
    setRepeat: function (arr, row, col) {
        var value = '',
            last = '',
            index = 1;
        for (var i = row; i < arr.length; i++) {
            value = arr[i][col].txt;
            if (last === value) {
                arr[i][col].display = 'none';
                if (typeof arr[i - index][col].rowSpan === 'undefined') {
                    arr[i - index][col].rowSpan = 1;
                }
                arr[i - index][col].rowSpan = arr[i - index][col].rowSpan + 1;
                index++;
            } else {
                last = value;
                index = 1;
            }
        }
        return arr;
    },
    tmpl: {
        homepage: '/',
        index: '/',
        login: 'http://' + location.host + '/searchboxbi/api/login'
    },
    api: {
        common: {},
        index: { //列表页
            list: 'http://10.143.86.29:8888/api/list', // 所有组件列表
            publish: 'http://10.143.86.29:8888/api/publish' // 发布组件
        },
        addtion: { //新增组件
            add: 'http://10.143.86.29:8888/api/add' // 新增组件
        },
        modify: { //修改组件
            search: 'http://10.143.86.29:8888/api/search', // 根据id获取组件信息
            update: 'http://10.143.86.29:8888/api/update'  // 根据id更新组件信息
        }
    }
}).run(function ($rootScope, $ocLazyLoad, $state, CONFIG) {
    CONFIG.USERINFOS = window.USERINFOS;
    delete window.USERINFOS;
    $rootScope.poplayer = {};
    if (!!CONFIG.noCache) {
        $ocLazyLoad.cacheList = {};
        $ocLazyLoad.__load = $ocLazyLoad.load;
        $ocLazyLoad.load = function (files) {
            if (!!angular.isArray(files)) {
                files = files.map(function (item) {
                    return item.indexOf(CONFIG.webRoot) < 0 ? CONFIG.webRoot + item : item;
                });
            } else {
                files = files.indexOf(CONFIG.webRoot) < 0 ? CONFIG.webRoot + files : files;
            }
            return $ocLazyLoad.__load(files, {
                cache: true,
                version: CONFIG.version
            });
        };
    }
    $ocLazyLoad.load([
        'modules/common/loading/loading.css',
        'service/fetch.js'
    ]);
    $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
        var current = toState.name === '' ? fromState : toState;
        var args = toState.name === '' ? fromParams : toParams;
        if (!$rootScope.commParams.pages) {
            $rootScope.commParams.pages = {};
        }
        if (toParams.page) {
            if (!$rootScope.commParams.pages[current.name]
                || fromState.name === ''
                || fromState.name === toState.name) {
                $rootScope.commParams.pages[current.name] = toParams.page;
            }
            toParams.page = $rootScope.commParams.pages[current.name] || 1;
        }
        $rootScope.poplayer = {
            type: 'loading'
        };
        $rootScope.transferParam = function (name) {
            var params = angular.extend(toParams, fromParams);
            var pages = $rootScope.commParams.pages || {};
            $rootScope.commParams = {};
            $rootScope.commParams.pages = pages;
            if (!!name) {
                return $state.go(name, params);
            }
            return $state.go((toState.name || 'index'), params);
        };
        function autoBack() {
            var _url = fromState.name || 'index';
            return $state.go(_url, fromParams);
        }

        !!CONFIG.debuger && console.log(CONFIG.USERINFOS.permission, $rootScope.commParams, toParams, fromParams);
    });
    $rootScope.$on('$stateChangeSuccess', function (evt, toState, toParams, fromState, fromParams) {
        $rootScope.params = toParams;
        $rootScope.poplayer.type === 'loading' && ($rootScope.poplayer.type = '');
    });
    // 系统全局参数
    $rootScope.$state = $state;
    $rootScope.commParams = {};
    /*$rootScope.checkPermission = function (key, aid) {
     aid = aid || $rootScope.params.aid;
     return permissionService.permissionCheck(key, aid);
     };*/
});
