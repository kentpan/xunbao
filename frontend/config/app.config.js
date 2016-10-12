'@file: app.config';
'use strict';
angular.module(window.PROJACT_Name, ['ngRoute', 'ui.router', 'ngCookies', 'oc.lazyLoad']).constant('CONFIG', {
    debuger: false, // 是否开启debugger模式
    noCache: true,
    version: window.PROJACT_Version || '1.0.1',
    webRoot: './frontend/',
    getApi: function (online) {
        var isLocal = !!(/((kent|tianbin|qiuzhiqun|luoaihua)\.baidu\.com|\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3})/i
    .test(location.hostname));
        var uri = online.match(/[^\/]+$/);
        if ((!!uri.length && online.indexOf('/api/api_') === -1) || !!isLocal) {
            uri = this.webRoot + '/api/api_' + uri[0] + '.json';
        } else {
            uri = online;
        }
        return uri;
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
            list: 'api/list', // 所有组件列表
            publish: 'api/publish' // 发布组件
        },
        product: { //选艺品
            get: 'api/getimages' // 新增组件
        },
        modify: { //修改组件
            search: 'api/search', // 根据id获取组件信息
            update: 'api/update'  // 根据id更新组件信息
        }
    }
}).run(function ($rootScope, $ocLazyLoad, $state, CONFIG) {
    CONFIG.USERINFOS = window.USERINFOS;
    delete window.USERINFOS;
    $rootScope.poplayer = {};
    $ocLazyLoad.__load = $ocLazyLoad.load;
    $ocLazyLoad.load = function (files) {
        if (!!angular.isArray(files)) {
            files = files.map(function (item) {
                return item.indexOf(CONFIG.webRoot) < 0 ? CONFIG.webRoot + item : item;
            });
        } else {
            files = files.indexOf(CONFIG.webRoot) < 0 ? CONFIG.webRoot + files : files;
        }
        var conf = (!!CONFIG.noCache) ? {
            cache: true,
            version: CONFIG.version
        } : {};
        return $ocLazyLoad.__load(files, conf);
    };
    $ocLazyLoad.load([
        'modules/common/loading/loading.css',
        'service/fetch.js'
    ]);
    $rootScope.$on('$stateChangeSuccess', function (evt, toState, toParams, fromState, fromParams) {
        $rootScope.params = toParams;
        console.log($state.current.name);
        $rootScope.poplayer.type === 'loading' && ($rootScope.poplayer.type = '');
    });
    // 系统全局参数
    $rootScope.$state = $state;
    $rootScope.commParams = {};
    $rootScope.commCache = {};
    /*$rootScope.checkPermission = function (key, aid) {
     aid = aid || $rootScope.params.aid;
     return permissionService.permissionCheck(key, aid);
     };*/
});

(function () {
    var html = $('html');
    /*var api = './frontend/api/permission.json';
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
        angular.bootstrap(html[0], [PROJACT_Name]);
    });
})();
