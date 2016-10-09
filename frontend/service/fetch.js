angular.module(window.PROJACT_Name).factory('fetchService', function ($http, $q, $rootScope, CONFIG) {
    return {
        get: function(params) {
            if(!params) return {};
            var promises = [];
            angular.forEach(params, function(param) {
                if(!param.url) return;
                var _url = param.url;
                if (typeof _url === 'string' && !!CONFIG.getApi) {
                    _url = CONFIG.getApi(_url);
                }
                if (!!CONFIG.noCache && param.data && !param.data._v) {
                    param.data._v = CONFIG.version;
                }
                var _data = (!!param.method && param.method.toLowerCase()) === 'post' ? {
                    url: _url,
                    method: param.method || 'GET',
                    data: param.data || {}
                } : {
                    url: _url,
                    method: param.method || 'GET',
                    params: param.data || {}
                };
                var promise = $http(_data);
                promises.push(promise);
            });
            return $q.all(promises);
        },
        jsonp: function(params) {
            if(!params) return {};
            var promises = [];
            var parseArgs = function (args) {
                if (!args) return '';
                var _args = [];
                angular.forEach(args, function(v, k) {
                    _args.push(k + '=' + v);
                });
                return '?' + _args.join('&');
            };
            if (!angular.isArray(params)) {
                params = [params];
            }
            angular.forEach(params, function(param) {
                if(!param.url) return;
                var _url = param.url;
                if (typeof _url === 'string' && !!CONFIG.getApi) {
                    _url = CONFIG.getApi(_url);
                }
                if (!param.data) {
                    param.data = {};
                }
                if (!!CONFIG.noCache && param.data && !param.data._v) {
                    param.data._v = CONFIG.version;
                }
                param.data.callback = 'JSON_CALLBACK';
                _url += parseArgs(param.data);
                console.log(params, _url);
                var promise = $http.jsonp(_url);
                promises.push(promise);
            });
            return $q.all(promises);
        }
    };
});
