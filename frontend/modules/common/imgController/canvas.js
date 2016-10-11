'@file: loading';
angular.module(PROJACT_Name).directive('canvas', function ($timeout, CONFIG) {
    var directive = {
        restrict: 'A',
        // replace: true,
        scope: true,
        template: '<canvas id="canvid1"></canvas>',
        link: function ($scope, $element, $attrs) {
            var CanvasBabys = function() {
                var win = $(window);
                var canvas1;
                var img = {};
                return {
                    init: function() {
                        var _this = this;
                        var conf = $scope.$eval($attrs.canvas);
                        var root = conf.root || 'canvasContainer';
                        console.log(conf);
                        canvas1 = new Canvas.Element();
                        canvas1.init('canvid1',  {root: root, width: win.width(), height: win.height()});
                        /*var oView = new Image();
                            oView.onload = function () {
                                console.log(win.height(), this.height, win.width(), this.width);
                                img.view = new Canvas.Img(this, {
                                    top: (win.height()) / 2,
                                    left: (win.width()) / 2
                                });

                                canvas1.addImage(img.view);
                                _this.showCorners.call(_this);
                            };
                            oView.src = 'imgs/7.jpg';*/
                        var oBg = new Image();
                            oBg.onload = function () {
                                img.bg = new Canvas.Img(this, {});
                                canvas1.setCanvasBackground(img.bg);
                            };
                            oBg.src = conf.bg;
                        //img[img.length] = new Canvas.Img('img2', {});
                        //img[img.length] = new Canvas.Img('img3', {});
                        // img.bg = new Canvas.Img('bg', {});
                        //img[img.length] = new Canvas.Img('img4', {});
                        //img[img.length] = new Canvas.Img('img4', {});
                    
                        // @param array of images ToDo: individual images
                        
                        //canvas1.addImage(img[1]);
                        //canvas1.addImage(img[2]);
                        //canvas1.addImage(img[4]);
         
                        // this.initEvents();
                    },
                    initEvents: function() {
                        var _this = this;
                        $('#switchBg').on('click', function (e) {
                            _this.switchBg.call(_this, e);
                        });
                        $('#switchView').on('click', function (e) {
                            _this.switchView.call(_this, e);
                        });
                        $('#showcorners').on('click', function (e) {
                            _this.showCorners.call(_this, e);
                        });
                        $('#togglenone').on('click', function (e) {
                            _this.toggleNone.call(_this, e);
                        });
                        $('#toggleborders').on('click', function (e) {
                            _this.toggleBorders.call(_this, e);
                        });
                        $('#togglepolaroid').on('click', function (e) {
                            _this.togglePolaroid.call(_this, e);
                        });
                        $('#pngbutton').on('click', function (e) {
                            _this.convertTo.call(_this, 'png');
                        });
                        $('#jpegbutton').on('click', function (e) {
                            _this.convertTo.call(_this, 'jpeg');
                        });
                    },
                    switchView: function() {
                        // canvas1.fillBackground = (!canvas1.fillBackground) ? true : false;
                        var _this = this;
                        var oView = new Image();
                        oView.onload = function () {
                            var t = img.view.top;
                            var l = img.view.left;
                            var w = img.view.width;
                            var h = img.view.height;
                            var sx= img.view.scalex;
                            var sy= img.view.scaley;
                            var tt= img.view.theta;
                            console.log(img.view);
                            img.view = new Canvas.Img(this, {
                                top: t,
                                left: l,
                                width: w,
                                height: h,
                                scalex: sx,
                                scaley: sy,
                                theta: tt
                            });
                            canvas1.changeImage(img.view);
                            _this.showCorners.call(_this);
                        };
                        var list = [4, 5, 7, 8 , 9, 'bg'];
                        var rnd  = parseInt(Math.random() *  6, 10);
                        oView.src = 'imgs/' + list[rnd] + '.jpg';
                        // canvas1.renderAll();
                    },
                    switchBg: function() {
                        // canvas1.fillBackground = (!canvas1.fillBackground) ? true : false;

                        var oBg = new Image();
                            oBg.onload = function () {
                                img.bg = new Canvas.Img(this, {});
                                canvas1.setCanvasBackground(img.bg);
                            };
                            var list = [4, 5, 7, 8 , 9, 'bg'];
                            var rnd  = parseInt(Math.random() *  6, 10);
                            oBg.src = 'imgs/' + list[rnd] + '.jpg';
                        // canvas1.renderAll();
                    },
                    
                    //! insert these functions to the library. No access to _aImages should be done from here
                    showCorners: function() {
                        this.cornersvisible = (this.cornersvisible) ? false : true;
                        for (var i = 0, l = canvas1._aImages.length; i < l; i += 1) {
                            canvas1._aImages[i].setCornersVisibility(this.cornersvisible);
                        }
                        canvas1.renderAll();
                    }
                }
            }();
            
            
            
            
            CanvasBabys.init.call(CanvasBabys);
        }
    };
    return directive;
});