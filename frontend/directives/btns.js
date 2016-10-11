angular.module(window.PROJACT_Name).directive("btns", function ($timeout) {
    var directive = {
        restrict: 'AE',
        scope: {
            btns: '='
        },
        replace: true,
        template: function (element, attrs) {
            console.log(attrs.btns);
            if (attrs.btns === 'btns.photo') {
                //<input type="file" accept="video/*;capture=camcorder"> <input type="file" accept="audio/*;capture=microphone">
                //<input type="file" accept="image/*;capture=camera">
                return '<a class="btns btns-{{btns.key}}" ng-href="{{btns.href}}">{{btns.value}}<input type="file" accept="image/*;capture=camera" size="700" style="position: absolute;left: 0;"></a>';
            } else {
                return '<a class="btns btns-{{btns.key}}" ng-href="{{btns.href}}">{{btns.value}}</a>';
            }
        },
        link: function (scope, element, attrs) {
            var btnData = scope.btns;
            angular.element(element).on('click', scope.btns.service);
            /*scope.$watch(attrs.datePicker, function (newValue, oldValue) {
                if (!!newValue) {
                    angular.element(element).val(newValue);
                }
            }, true);
            scope.$on('$destroy', function () {
                
            });*/
        }
    };
    return directive;
});
