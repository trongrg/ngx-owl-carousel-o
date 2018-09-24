(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/platform-browser'), require('rxjs'), require('@angular/core'), require('rxjs/observable/merge'), require('rxjs/operators'), require('@angular/common'), require('@angular/animations'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('ngx-owl-carousel-o', ['exports', '@angular/platform-browser', 'rxjs', '@angular/core', 'rxjs/observable/merge', 'rxjs/operators', '@angular/common', '@angular/animations', '@angular/router'], factory) :
    (factory((global['ngx-owl-carousel-o'] = {}),global.ng.platformBrowser,global.rxjs,global.ng.core,global.rxjs['observable/merge'],global.rxjs.operators,global.ng.common,global.ng.animations,global.ng.router));
}(this, (function (exports,platformBrowser,rxjs,core,merge,operators,common,animations,router) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ResizeService = (function () {
        function ResizeService(eventManager) {
            this.eventManager = eventManager;
            this.resizeSubject = new rxjs.Subject();
            this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
            this.eventManager.addGlobalEventListener('window', 'onload', this.onLoaded.bind(this));
        }
        Object.defineProperty(ResizeService.prototype, "onResize$", {
            /**
             * Makes resizeSubject become Observable
             * @returns Observable of resizeSubject
             */
            get: /**
             * Makes resizeSubject become Observable
             * @return {?} Observable of resizeSubject
             */ function () {
                return this.resizeSubject.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Handler of 'resize' event. Passes data throw resizeSubject
         * @param {?} event Event Object of 'resize' event
         * @return {?}
         */
        ResizeService.prototype.onResize = /**
         * Handler of 'resize' event. Passes data throw resizeSubject
         * @param {?} event Event Object of 'resize' event
         * @return {?}
         */
            function (event) {
                this.resizeSubject.next(/** @type {?} */ (event.target));
            };
        /**
         * Handler of 'onload' event. Defines the width of window
         * @param {?} event Event Object of 'onload' event
         * @return {?}
         */
        ResizeService.prototype.onLoaded = /**
         * Handler of 'onload' event. Defines the width of window
         * @param {?} event Event Object of 'onload' event
         * @return {?}
         */
            function (event) {
                this.windowWidth = /** @type {?} */ (event.target);
            };
        ResizeService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ResizeService.ctorParameters = function () {
            return [
                { type: platformBrowser.EventManager }
            ];
        };
        return ResizeService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Defaults value of options
     */
    var /**
     * Defaults value of options
     */ OwlCarouselOConfig = (function () {
        function OwlCarouselOConfig() {
            this.items = 3;
            this.loop = false;
            this.center = false;
            this.rewind = false;
            this.mouseDrag = true;
            this.touchDrag = true;
            this.pullDrag = true;
            this.freeDrag = false;
            this.margin = 0;
            this.stagePadding = 0;
            this.merge = false;
            this.mergeFit = true;
            this.autoWidth = false;
            this.startPosition = 0;
            this.rtl = false;
            this.smartSpeed = 250;
            this.fluidSpeed = false;
            this.dragEndSpeed = false;
            this.responsive = {};
            this.responsiveRefreshRate = 200;
            // defaults to Navigation
            this.nav = false;
            this.navText = ['prev', 'next'];
            this.navSpeed = false;
            this.slideBy = 1;
            this.dots = true;
            this.dotsEach = false;
            this.dotsData = false;
            this.dotsSpeed = false;
            // defaults to Autoplay
            this.autoplay = false;
            this.autoplayTimeout = 5000;
            this.autoplayHoverPause = false;
            this.autoplaySpeed = false;
            // defaults to LazyLoading
            this.lazyLoad = false;
            this.lazyLoadEager = 0;
            // defaults to Animate
            this.animateOut = false;
            this.animateIn = false;
            // defaults to AutoHeight
            this.autoHeight = false;
            // defaults to Hash
            this.URLhashListener = false;
        }
        return OwlCarouselOConfig;
    }());
    /**
     * we can't read types from OwlOptions in javascript because of props have undefined value and types of those props are used for validating inputs
     * class below is copy of OwlOptions but its all props have string value showing certain type;
     * this is class is being used just in method _validateOptions() of CarouselService;
     */
    var /**
     * we can't read types from OwlOptions in javascript because of props have undefined value and types of those props are used for validating inputs
     * class below is copy of OwlOptions but its all props have string value showing certain type;
     * this is class is being used just in method _validateOptions() of CarouselService;
     */ OwlOptionsMockedTypes = (function () {
        function OwlOptionsMockedTypes() {
            this.items = 'number';
            this.loop = 'boolean';
            this.center = 'boolean';
            this.rewind = 'boolean';
            this.mouseDrag = 'boolean';
            this.touchDrag = 'boolean';
            this.pullDrag = 'boolean';
            this.freeDrag = 'boolean';
            this.margin = 'number';
            this.stagePadding = 'number';
            this.merge = 'boolean';
            this.mergeFit = 'boolean';
            this.autoWidth = 'boolean';
            this.startPosition = 'number|string';
            this.rtl = 'boolean';
            this.smartSpeed = 'number';
            this.fluidSpeed = 'boolean';
            this.dragEndSpeed = 'number|boolean';
            this.responsive = {};
            this.responsiveRefreshRate = 'number';
            // defaults to Navigation
            this.nav = 'boolean';
            this.navText = 'string[]';
            this.navSpeed = 'number|boolean';
            this.slideBy = 'number|string';
            this.dots = 'boolean';
            this.dotsEach = 'number|boolean';
            this.dotsData = 'boolean';
            this.dotsSpeed = 'number|boolean';
            // defaults to Autoplay
            this.autoplay = 'boolean';
            this.autoplayTimeout = 'number';
            this.autoplayHoverPause = 'boolean';
            this.autoplaySpeed = 'number|boolean';
            // defaults to LazyLoading
            this.lazyLoad = 'boolean';
            this.lazyLoadEager = 'number';
            // defaults to Animate
            this.animateOut = 'string|boolean';
            this.animateIn = 'string|boolean';
            // defaults to AutoHeight
            this.autoHeight = 'boolean';
            // defaults to Hash
            this.URLhashListener = "boolean";
        }
        return OwlOptionsMockedTypes;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var Type = {
        Event: 'event',
        State: 'state',
    };
    /** @enum {string} */
    var Width = {
        Default: 'default',
        Inner: 'inner',
        Outer: 'outer',
    };
    var CarouselService = (function () {
        function CarouselService() {
            var _this = this;
            /**
             * Subject for passing data needed for managing View
             */
            this._viewSettingsShipper$ = new rxjs.Subject();
            /**
             * Subject for notification when the carousel got initializes
             */
            this._initializedCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification when the carousel's settings start changinf
             */
            this._changeSettingsCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification when the carousel's settings have changed
             */
            this._changedSettingsCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification when the carousel starts translating or moving
             */
            this._translateCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification when the carousel stopped translating or moving
             */
            this._translatedCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification when the carousel's rebuilding caused by 'resize' event starts
             */
            this._resizeCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification  when the carousel's rebuilding caused by 'resize' event is ended
             */
            this._resizedCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification when the refresh of carousel starts
             */
            this._refreshCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification when the refresh of carousel is ended
             */
            this._refreshedCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification when the dragging of carousel starts
             */
            this._dragCarousel$ = new rxjs.Subject();
            /**
             * Subject for notification when the dragging of carousel is ended
             */
            this._draggedCarousel$ = new rxjs.Subject();
            /**
             * Current settings for the carousel.
             */
            this.settings = {
                items: 0
            };
            /**
             * Initial data for setting classes to element .owl-carousel
             */
            this.owlDOMData = {
                rtl: false,
                isResponsive: false,
                isRefreshed: false,
                isLoaded: false,
                isLoading: false,
                isMouseDragable: false,
                isGrab: false,
                isTouchDragable: false
            };
            /**
             * Initial data of .owl-stage
             */
            this.stageData = {
                transform: 'translate3d(0px,0px,0px)',
                transition: '0s',
                width: 0,
                paddingL: 0,
                paddingR: 0
            };
            /**
             * All real items.
             */
            this._items = [];
            /**
             * Array with width of every slide.
             */
            this._widths = [];
            /**
             * Currently suppressed events to prevent them from beeing retriggered.
             */
            this._supress = {};
            /**
             * References to the running plugins of this carousel.
             */
            this._plugins = {};
            /**
             * Absolute current position.
             */
            this._current = null;
            /**
             * All cloned items.
             */
            this._clones = [];
            /**
             * Merge values of all items.
             * \@todo Maybe this could be part of a plugin.
             */
            this._mergers = [];
            /**
             * Animation speed in milliseconds.
             */
            this._speed = null;
            /**
             * Coordinates of all items in pixel.
             * \@todo The name of this member is missleading.
             */
            this._coordinates = [];
            /**
             * Current breakpoint.
             * \@todo Real media queries would be nice.
             */
            this._breakpoint = null;
            /**
             * Prefix for id of cloned slides
             */
            this.clonedIdPrefix = 'cloned-';
            /**
             * Current options set by the caller including defaults.
             */
            this._options = {};
            /**
             * Invalidated parts within the update process.
             */
            this._invalidated = {};
            /**
             * Current state information and their tags.
             */
            this._states = {
                current: {},
                tags: {
                    initializing: ['busy'],
                    animating: ['busy'],
                    dragging: ['interacting']
                }
            };
            /**
             * Ordered list of workers for the update process.
             */
            this._pipe = [
                // {
                //   filter: ['width', 'settings'],
                //   run: () => {
                //     this._width = this.carouselWindowWidth;
                //   }
                // },
                {
                    filter: ['width', 'items', 'settings'],
                    run: function (cache) {
                        cache.current = _this._items && _this._items[_this.relative(_this._current)].id;
                    }
                },
                // {
                //   filter: ['items', 'settings'],
                //   run: function() {
                //     // this.$stage.children('.cloned').remove();
                //   }
                // },
                {
                    filter: ['width', 'items', 'settings'],
                    run: function (cache) {
                        /** @type {?} */
                        var margin = _this.settings.margin || '';
                        /** @type {?} */
                        var grid = !_this.settings.autoWidth;
                        /** @type {?} */
                        var rtl = _this.settings.rtl;
                        /** @type {?} */
                        var css = {
                            'margin-left': rtl ? margin : '',
                            'margin-right': rtl ? '' : margin
                        };
                        if (!grid) {
                            _this.slidesData.forEach(function (slide) {
                                slide.marginL = css['margin-left'];
                                slide.marginR = css['margin-right'];
                            });
                        }
                        cache.css = css;
                    }
                }, {
                    filter: ['width', 'items', 'settings'],
                    run: function (cache) {
                        /** @type {?} */
                        var width = +(_this.width() / _this.settings.items).toFixed(3) - _this.settings.margin;
                        /** @type {?} */
                        var grid = !_this.settings.autoWidth;
                        /** @type {?} */
                        var widths = [];
                        /** @type {?} */
                        var merge$$1 = null;
                        /** @type {?} */
                        var iterator = _this._items.length;
                        cache.items = {
                            merge: false,
                            width: width
                        };
                        while (iterator--) {
                            merge$$1 = _this._mergers[iterator];
                            merge$$1 = _this.settings.mergeFit && Math.min(merge$$1, _this.settings.items) || merge$$1;
                            cache.items.merge = merge$$1 > 1 || cache.items.merge;
                            widths[iterator] = !grid ? _this._items[iterator].width ? _this._items[iterator].width : width : width * merge$$1;
                        }
                        _this._widths = widths;
                        _this.slidesData.forEach(function (slide, i) {
                            slide.width = _this._widths[i];
                            slide.marginR = cache.css['margin-right'];
                            slide.marginL = cache.css['margin-left'];
                        });
                    }
                }, {
                    filter: ['items', 'settings'],
                    run: function () {
                        /** @type {?} */
                        var clones = [];
                        /** @type {?} */
                        var items = _this._items;
                        /** @type {?} */
                        var settings = _this.settings;
                        /** @type {?} */
                        var 
                        // TODO: Should be computed from number of min width items in stage
                        view = Math.max(settings.items * 2, 4);
                        /** @type {?} */
                        var size = Math.ceil(items.length / 2) * 2;
                        /** @type {?} */
                        var append = [];
                        /** @type {?} */
                        var prepend = [];
                        /** @type {?} */
                        var repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0;
                        repeat /= 2;
                        while (repeat--) {
                            // Switch to only using appended clones
                            clones.push(_this.normalize(clones.length / 2, true));
                            append.push(__assign({}, _this.slidesData[clones[clones.length - 1]]));
                            clones.push(_this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
                            prepend.unshift(__assign({}, _this.slidesData[clones[clones.length - 1]]));
                        }
                        _this._clones = clones;
                        append = append.map(function (slide) {
                            slide.id = "" + _this.clonedIdPrefix + slide.id;
                            slide.isActive = false;
                            slide.isCloned = true;
                            return slide;
                        });
                        prepend = prepend.map(function (slide) {
                            slide.id = "" + _this.clonedIdPrefix + slide.id;
                            slide.isActive = false;
                            slide.isCloned = true;
                            return slide;
                        });
                        _this.slidesData = prepend.concat(_this.slidesData).concat(append);
                    }
                }, {
                    filter: ['width', 'items', 'settings'],
                    run: function () {
                        /** @type {?} */
                        var rtl = _this.settings.rtl ? 1 : -1;
                        /** @type {?} */
                        var size = _this._clones.length + _this._items.length;
                        /** @type {?} */
                        var coordinates = [];
                        /** @type {?} */
                        var iterator = -1;
                        /** @type {?} */
                        var previous = 0;
                        /** @type {?} */
                        var current = 0;
                        while (++iterator < size) {
                            previous = coordinates[iterator - 1] || 0;
                            current = _this._widths[_this.relative(iterator)] + _this.settings.margin;
                            coordinates.push(previous + current * rtl);
                        }
                        _this._coordinates = coordinates;
                    }
                }, {
                    filter: ['width', 'items', 'settings'],
                    run: function () {
                        /** @type {?} */
                        var padding = _this.settings.stagePadding;
                        /** @type {?} */
                        var coordinates = _this._coordinates;
                        /** @type {?} */
                        var css = {
                            'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
                            'padding-left': padding || '',
                            'padding-right': padding || ''
                        };
                        _this.stageData.width = css.width; // use this property in *ngIf directive for .owl-stage element
                        _this.stageData.paddingL = css['padding-left'];
                        _this.stageData.paddingR = css['padding-right'];
                    }
                }, {
                    //   filter: [ 'width', 'items', 'settings' ],
                    //   run: cache => {
                    // 		// this method sets the width for every slide, but I set it in different way earlier
                    // 		const grid = !this.settings.autoWidth,
                    // 		items = this.$stage.children(); // use this.slidesData
                    //     let iterator = this._coordinates.length;
                    //     if (grid && cache.items.merge) {
                    //       while (iterator--) {
                    //         cache.css.width = this._widths[this.relative(iterator)];
                    //         items.eq(iterator).css(cache.css);
                    //       }
                    //     } else if (grid) {
                    //       cache.css.width = cache.items.width;
                    //       items.css(cache.css);
                    //     }
                    //   }
                    // }, {
                    //   filter: [ 'items' ],
                    //   run: function() {
                    //     this._coordinates.length < 1 && this.$stage.removeAttr('style');
                    //   }
                    // }, {
                    filter: ['width', 'items', 'settings'],
                    run: function (cache) {
                        /** @type {?} */
                        var current = cache.current ? _this.slidesData.findIndex(function (slide) { return slide.id === cache.current; }) : 0;
                        current = Math.max(_this.minimum(), Math.min(_this.maximum(), current));
                        _this.reset(current);
                    }
                }, {
                    filter: ['position'],
                    run: function () {
                        _this.animate(_this.coordinates(_this._current));
                    }
                }, {
                    filter: ['width', 'position', 'items', 'settings'],
                    run: function () {
                        /** @type {?} */
                        var rtl = _this.settings.rtl ? 1 : -1;
                        /** @type {?} */
                        var padding = _this.settings.stagePadding * 2;
                        /** @type {?} */
                        var matches = [];
                        /** @type {?} */
                        var begin;
                        /** @type {?} */
                        var end;
                        /** @type {?} */
                        var inner;
                        /** @type {?} */
                        var outer;
                        /** @type {?} */
                        var i;
                        /** @type {?} */
                        var n;
                        begin = _this.coordinates(_this.current());
                        if (typeof begin === 'number') {
                            begin += padding;
                        }
                        else {
                            begin = 0;
                        }
                        end = begin + _this.width() * rtl;
                        if (rtl === -1 && _this.settings.center) {
                            /** @type {?} */
                            var result = _this._coordinates.filter(function (element) {
                                return _this.settings.items % 2 === 1 ? element >= begin : element > begin;
                            });
                            begin = result.length ? result[result.length - 1] : begin;
                        }
                        for (i = 0, n = _this._coordinates.length; i < n; i++) {
                            inner = Math.ceil(_this._coordinates[i - 1] || 0);
                            outer = Math.ceil(Math.abs(_this._coordinates[i]) + padding * rtl);
                            if ((_this._op(inner, '<=', begin) && (_this._op(inner, '>', end)))
                                || (_this._op(outer, '<', begin) && _this._op(outer, '>', end))) {
                                matches.push(i);
                            }
                        }
                        _this.slidesData.forEach(function (slide) {
                            slide.isActive = false;
                            return slide;
                        });
                        matches.forEach(function (item) {
                            _this.slidesData[item].isActive = true;
                        });
                        if (_this.settings.center) {
                            _this.slidesData.forEach(function (slide) {
                                slide.isCentered = false;
                                return slide;
                            });
                            _this.slidesData[_this.current()].isCentered = true;
                        }
                    }
                }
            ];
        }
        Object.defineProperty(CarouselService.prototype, "invalidated", {
            // Is needed for tests
            get: /**
             * @return {?}
             */ function () {
                return this._invalidated;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CarouselService.prototype, "states", {
            // is needed for tests
            get: /**
             * @return {?}
             */ function () {
                return this._states;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Makes _viewSettingsShipper$ Subject become Observable
         * @returns Observable of _viewSettingsShipper$ Subject
         */
        /**
         * Makes _viewSettingsShipper$ Subject become Observable
         * @return {?} Observable of _viewSettingsShipper$ Subject
         */
        CarouselService.prototype.getViewCurSettings = /**
         * Makes _viewSettingsShipper$ Subject become Observable
         * @return {?} Observable of _viewSettingsShipper$ Subject
         */
            function () {
                return this._viewSettingsShipper$.asObservable();
            };
        /**
         * Makes _initializedCarousel$ Subject become Observable
         * @returns Observable of _initializedCarousel$ Subject
         */
        /**
         * Makes _initializedCarousel$ Subject become Observable
         * @return {?} Observable of _initializedCarousel$ Subject
         */
        CarouselService.prototype.getInitializedState = /**
         * Makes _initializedCarousel$ Subject become Observable
         * @return {?} Observable of _initializedCarousel$ Subject
         */
            function () {
                return this._initializedCarousel$.asObservable();
            };
        /**
         * Makes _changeSettingsCarousel$ Subject become Observable
         * @returns Observable of _changeSettingsCarousel$ Subject
         */
        /**
         * Makes _changeSettingsCarousel$ Subject become Observable
         * @return {?} Observable of _changeSettingsCarousel$ Subject
         */
        CarouselService.prototype.getChangeState = /**
         * Makes _changeSettingsCarousel$ Subject become Observable
         * @return {?} Observable of _changeSettingsCarousel$ Subject
         */
            function () {
                return this._changeSettingsCarousel$.asObservable();
            };
        /**
         * Makes _changedSettingsCarousel$ Subject become Observable
         * @returns Observable of _changedSettingsCarousel$ Subject
         */
        /**
         * Makes _changedSettingsCarousel$ Subject become Observable
         * @return {?} Observable of _changedSettingsCarousel$ Subject
         */
        CarouselService.prototype.getChangedState = /**
         * Makes _changedSettingsCarousel$ Subject become Observable
         * @return {?} Observable of _changedSettingsCarousel$ Subject
         */
            function () {
                return this._changedSettingsCarousel$.asObservable();
            };
        /**
         * Makes _translateCarousel$ Subject become Observable
         * @returns Observable of _translateCarousel$ Subject
         */
        /**
         * Makes _translateCarousel$ Subject become Observable
         * @return {?} Observable of _translateCarousel$ Subject
         */
        CarouselService.prototype.getTranslateState = /**
         * Makes _translateCarousel$ Subject become Observable
         * @return {?} Observable of _translateCarousel$ Subject
         */
            function () {
                return this._translateCarousel$.asObservable();
            };
        /**
         * Makes _translatedCarousel$ Subject become Observable
         * @returns Observable of _translatedCarousel$ Subject
         */
        /**
         * Makes _translatedCarousel$ Subject become Observable
         * @return {?} Observable of _translatedCarousel$ Subject
         */
        CarouselService.prototype.getTranslatedState = /**
         * Makes _translatedCarousel$ Subject become Observable
         * @return {?} Observable of _translatedCarousel$ Subject
         */
            function () {
                return this._translatedCarousel$.asObservable();
            };
        /**
         * Makes _resizeCarousel$ Subject become Observable
         * @returns Observable of _resizeCarousel$ Subject
         */
        /**
         * Makes _resizeCarousel$ Subject become Observable
         * @return {?} Observable of _resizeCarousel$ Subject
         */
        CarouselService.prototype.getResizeState = /**
         * Makes _resizeCarousel$ Subject become Observable
         * @return {?} Observable of _resizeCarousel$ Subject
         */
            function () {
                return this._resizeCarousel$.asObservable();
            };
        /**
         * Makes _resizedCarousel$ Subject become Observable
         * @returns Observable of _resizedCarousel$ Subject
         */
        /**
         * Makes _resizedCarousel$ Subject become Observable
         * @return {?} Observable of _resizedCarousel$ Subject
         */
        CarouselService.prototype.getResizedState = /**
         * Makes _resizedCarousel$ Subject become Observable
         * @return {?} Observable of _resizedCarousel$ Subject
         */
            function () {
                return this._resizedCarousel$.asObservable();
            };
        /**
         * Makes _refreshCarousel$ Subject become Observable
         * @returns Observable of _refreshCarousel$ Subject
         */
        /**
         * Makes _refreshCarousel$ Subject become Observable
         * @return {?} Observable of _refreshCarousel$ Subject
         */
        CarouselService.prototype.getRefreshState = /**
         * Makes _refreshCarousel$ Subject become Observable
         * @return {?} Observable of _refreshCarousel$ Subject
         */
            function () {
                return this._refreshCarousel$.asObservable();
            };
        /**
         * Makes _refreshedCarousel$ Subject become Observable
         * @returns Observable of _refreshedCarousel$ Subject
         */
        /**
         * Makes _refreshedCarousel$ Subject become Observable
         * @return {?} Observable of _refreshedCarousel$ Subject
         */
        CarouselService.prototype.getRefreshedState = /**
         * Makes _refreshedCarousel$ Subject become Observable
         * @return {?} Observable of _refreshedCarousel$ Subject
         */
            function () {
                return this._refreshedCarousel$.asObservable();
            };
        /**
         * Makes _dragCarousel$ Subject become Observable
         * @returns Observable of _dragCarousel$ Subject
         */
        /**
         * Makes _dragCarousel$ Subject become Observable
         * @return {?} Observable of _dragCarousel$ Subject
         */
        CarouselService.prototype.getDragState = /**
         * Makes _dragCarousel$ Subject become Observable
         * @return {?} Observable of _dragCarousel$ Subject
         */
            function () {
                return this._dragCarousel$.asObservable();
            };
        /**
         * Makes _draggedCarousel$ Subject become Observable
         * @returns Observable of _draggedCarousel$ Subject
         */
        /**
         * Makes _draggedCarousel$ Subject become Observable
         * @return {?} Observable of _draggedCarousel$ Subject
         */
        CarouselService.prototype.getDraggedState = /**
         * Makes _draggedCarousel$ Subject become Observable
         * @return {?} Observable of _draggedCarousel$ Subject
         */
            function () {
                return this._draggedCarousel$.asObservable();
            };
        /**
         * Setups custom options expanding default options
         * @param options custom options
         */
        /**
         * Setups custom options expanding default options
         * @param {?} options custom options
         * @return {?}
         */
        CarouselService.prototype.setOptions = /**
         * Setups custom options expanding default options
         * @param {?} options custom options
         * @return {?}
         */
            function (options) {
                /** @type {?} */
                var configOptions = new OwlCarouselOConfig();
                /** @type {?} */
                var checkedOptions = this._validateOptions(options, configOptions);
                this._options = __assign({}, configOptions, checkedOptions);
            };
        /**
         * Checks whether user's option are set properly. Cheking is based on typings;
         * @param {?} options options set by user
         * @param {?} configOptions default options
         * @return {?} checked and modified (if it's needed) user's options
         *
         * Notes:
         *  - if user set option with wrong type, it'll be written in console
         */
        CarouselService.prototype._validateOptions = /**
         * Checks whether user's option are set properly. Cheking is based on typings;
         * @param {?} options options set by user
         * @param {?} configOptions default options
         * @return {?} checked and modified (if it's needed) user's options
         *
         * Notes:
         *  - if user set option with wrong type, it'll be written in console
         */
            function (options, configOptions) {
                /** @type {?} */
                var checkedOptions = __assign({}, options);
                /** @type {?} */
                var mockedTypes = new OwlOptionsMockedTypes();
                var _loop_1 = function (key) {
                    if (checkedOptions.hasOwnProperty(key)) {
                        // condition could be shortened but it gets harder for understanding
                        if (mockedTypes[key] === 'number') {
                            if (this_1._isNumeric(checkedOptions[key])) {
                                checkedOptions[key] = +checkedOptions[key];
                                checkedOptions[key] = key === 'items' ? this_1._validateItems(checkedOptions[key]) : checkedOptions[key];
                            }
                            else {
                                checkedOptions[key] = setRightOption(mockedTypes[key], key);
                            }
                        }
                        else if (mockedTypes[key] === 'boolean' && typeof checkedOptions[key] !== 'boolean') {
                            checkedOptions[key] = setRightOption(mockedTypes[key], key);
                        }
                        else if (mockedTypes[key] === 'number|boolean' && !this_1._isNumberOrBoolean(checkedOptions[key])) {
                            checkedOptions[key] = setRightOption(mockedTypes[key], key);
                        }
                        else if (mockedTypes[key] === 'number|string' && !this_1._isNumberOrString(checkedOptions[key])) {
                            checkedOptions[key] = setRightOption(mockedTypes[key], key);
                        }
                        else if (mockedTypes[key] === 'string|boolean' && !this_1._isStringOrBoolean(checkedOptions[key])) {
                            checkedOptions[key] = setRightOption(mockedTypes[key], key);
                        }
                        else if (mockedTypes[key] === 'string[]') {
                            if (Array.isArray(checkedOptions[key])) {
                                /** @type {?} */
                                var isString_1 = false;
                                checkedOptions[key].forEach(function (element) {
                                    isString_1 = typeof element === 'string' ? true : false;
                                });
                                if (!isString_1) {
                                    checkedOptions[key] = setRightOption(mockedTypes[key], key);
                                }
                            }
                            else {
                                checkedOptions[key] = setRightOption(mockedTypes[key], key);
                            }
                        }
                    }
                };
                var this_1 = this;
                for (var key in checkedOptions) {
                    _loop_1(key);
                }
                /**
                 * @param {?} type
                 * @param {?} key
                 * @return {?}
                 */
                function setRightOption(type, key) {
                    console.log("options." + key + " must be type of " + type + "; " + key + "=" + options[key] + " skipped to defaults: " + key + "=" + configOptions[key]);
                    return configOptions[key];
                }
                return checkedOptions;
            };
        /**
         * Checks option items set by user and if it bigger than number of slides then returns number of slides
         * @param {?} items option items set by user
         * @return {?} right number of items
         */
        CarouselService.prototype._validateItems = /**
         * Checks option items set by user and if it bigger than number of slides then returns number of slides
         * @param {?} items option items set by user
         * @return {?} right number of items
         */
            function (items) {
                /** @type {?} */
                var result;
                if (items >= this._items.length) {
                    result = this._items.length;
                    console.log('option \'items\' in your options is bigger than number of slides; This option is updated to current number of slides and navigation got disabled');
                }
                else {
                    result = items;
                }
                return result;
            };
        /**
         * Set current width of carousel
         * @param width width of carousel Window
         */
        /**
         * Set current width of carousel
         * @param {?} width width of carousel Window
         * @return {?}
         */
        CarouselService.prototype.setCarouselWidth = /**
         * Set current width of carousel
         * @param {?} width width of carousel Window
         * @return {?}
         */
            function (width) {
                this._width = width;
            };
        /**
         * Setups the current settings.
         * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
         * @todo Support for media queries by using `matchMedia` would be nice.
         * @param carouselWidth width of carousel
         * @param slides array of slides
         * @param options options set by user
         */
        /**
         * Setups the current settings.
         * \@todo Remove responsive classes. Why should adaptive designs be brought into IE8?
         * \@todo Support for media queries by using `matchMedia` would be nice.
         * @param {?} carouselWidth width of carousel
         * @param {?} slides array of slides
         * @param {?} options options set by user
         * @return {?}
         */
        CarouselService.prototype.setup = /**
         * Setups the current settings.
         * \@todo Remove responsive classes. Why should adaptive designs be brought into IE8?
         * \@todo Support for media queries by using `matchMedia` would be nice.
         * @param {?} carouselWidth width of carousel
         * @param {?} slides array of slides
         * @param {?} options options set by user
         * @return {?}
         */
            function (carouselWidth, slides, options) {
                this.setCarouselWidth(carouselWidth);
                this.setItems(slides);
                this._defineSlidesData();
                this.setOptions(options);
                this.settings = __assign({}, this._options);
                this.setViewportItemsN();
                this._trigger('change', { property: { name: 'settings', value: this.settings } });
                this.invalidate('settings'); // must be call of this function;
                this._trigger('changed', { property: { name: 'settings', value: this.settings } });
            };
        /**
         * Set number of items for current viewport
         */
        /**
         * Set number of items for current viewport
         * @return {?}
         */
        CarouselService.prototype.setViewportItemsN = /**
         * Set number of items for current viewport
         * @return {?}
         */
            function () {
                /** @type {?} */
                var viewport = this._width;
                /** @type {?} */
                var overwrites = this._options.responsive;
                /** @type {?} */
                var match = -1;
                if (!Object.keys(overwrites).length) {
                    return;
                }
                for (var key in overwrites) {
                    if (overwrites.hasOwnProperty(key)) {
                        if (+key <= viewport && +key > match) {
                            match = Number(key);
                        }
                    }
                }
                this.settings = __assign({}, this.settings, { items: this._validateItems(overwrites[match].items) });
                // if (typeof this.settings.stagePadding === 'function') {
                // 	this.settings.stagePadding = this.settings.stagePadding();
                // }
                delete this.settings.responsive;
                this.owlDOMData.isResponsive = true;
                this._breakpoint = match;
                this.invalidate('settings');
            };
        /**
         * Initializes the carousel.
         * @param slides array of CarouselSlideDirective
         */
        /**
         * Initializes the carousel.
         * @param {?} slides array of CarouselSlideDirective
         * @return {?}
         */
        CarouselService.prototype.initialize = /**
         * Initializes the carousel.
         * @param {?} slides array of CarouselSlideDirective
         * @return {?}
         */
            function (slides) {
                var _this = this;
                this.enter('initializing');
                // this.trigger('initialize');
                this.owlDOMData.rtl = this.settings.rtl;
                slides.forEach(function (item) {
                    /** @type {?} */
                    var mergeN = _this.settings.merge ? item.dataMerge : 1;
                    _this._mergers.push(mergeN);
                });
                this.reset(this._isNumeric(this.settings.startPosition) ? +this.settings.startPosition : 0);
                this.invalidate('items');
                this.refresh();
                this.owlDOMData.isLoaded = true;
                this.owlDOMData.isMouseDragable = this.settings.mouseDrag;
                this.owlDOMData.isTouchDragable = this.settings.touchDrag;
                this.sendChanges();
                this.leave('initializing');
                this._trigger('initialized');
            };
        /**
         * Sends all data needed for View
         */
        /**
         * Sends all data needed for View
         * @return {?}
         */
        CarouselService.prototype.sendChanges = /**
         * Sends all data needed for View
         * @return {?}
         */
            function () {
                this._viewSettingsShipper$.next({
                    owlDOMData: this.owlDOMData,
                    stageData: this.stageData,
                    slidesData: this.slidesData,
                    navData: this.navData,
                    dotsData: this.dotsData
                });
            };
        /**
         * Updates option logic if necessery
         * @return {?}
         */
        CarouselService.prototype._optionsLogic = /**
         * Updates option logic if necessery
         * @return {?}
         */
            function () {
                if (this.settings.autoWidth) {
                    this.settings.stagePadding = 0;
                    this.settings.merge = false;
                }
            };
        /**
         * Updates the view
         */
        /**
         * Updates the view
         * @return {?}
         */
        CarouselService.prototype.update = /**
         * Updates the view
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var i = 0;
                /** @type {?} */
                var n = this._pipe.length;
                /** @type {?} */
                var filter = function (item) { return _this._invalidated[item]; };
                /** @type {?} */
                var cache = {};
                while (i < n) {
                    /** @type {?} */
                    var filteredPipe = this._pipe[i].filter.filter(filter);
                    if (this._invalidated.all || filteredPipe.length > 0) {
                        this._pipe[i].run(cache);
                    }
                    i++;
                }
                this.slidesData.forEach(function (slide) { return slide.classes = _this.setCurSlideClasses(slide); });
                this.sendChanges();
                this._invalidated = {};
                if (!this.is('valid')) {
                    this.enter('valid');
                }
            };
        /**
         * Gets the width of the view.
         * @param [dimension=Width.Default] The dimension to return
         * @returns The width of the view in pixel.
         */
        /**
         * Gets the width of the view.
         * @param {?=} dimension
         * @return {?} The width of the view in pixel.
         */
        CarouselService.prototype.width = /**
         * Gets the width of the view.
         * @param {?=} dimension
         * @return {?} The width of the view in pixel.
         */
            function (dimension) {
                dimension = dimension || Width.Default;
                switch (dimension) {
                    case Width.Inner:
                    case Width.Outer:
                        return this._width;
                    default:
                        return this._width - this.settings.stagePadding * 2 + this.settings.margin;
                }
            };
        /**
         * Refreshes the carousel primarily for adaptive purposes.
         */
        /**
         * Refreshes the carousel primarily for adaptive purposes.
         * @return {?}
         */
        CarouselService.prototype.refresh = /**
         * Refreshes the carousel primarily for adaptive purposes.
         * @return {?}
         */
            function () {
                this.enter('refreshing');
                this._trigger('refresh');
                this._defineSlidesData();
                this.setViewportItemsN();
                this._optionsLogic();
                // this.$element.addClass(this.options.refreshClass);
                this.update();
                // this.$element.removeClass(this.options.refreshClass);
                this.leave('refreshing');
                this._trigger('refreshed');
            };
        /**
         * Checks window `resize` event.
         * @param curWidth width of .owl-carousel
         */
        /**
         * Checks window `resize` event.
         * @param {?} curWidth width of .owl-carousel
         * @return {?}
         */
        CarouselService.prototype.onResize = /**
         * Checks window `resize` event.
         * @param {?} curWidth width of .owl-carousel
         * @return {?}
         */
            function (curWidth) {
                if (!this._items.length) {
                    return false;
                }
                this.setCarouselWidth(curWidth);
                this.enter('resizing');
                // if (this.trigger('resize').isDefaultPrevented()) {
                // 	this.leave('resizing');
                // 	return false;
                // }
                this._trigger('resize');
                this.invalidate('width');
                this.refresh();
                this.leave('resizing');
                this._trigger('resized');
            };
        /**
         * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
         * @todo Horizontal swipe threshold as option
         * @todo #261
         * @param event - The event arguments.
         * @returns stage - object with 'x' and 'y' coordinates of .owl-stage
         */
        /**
         * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
         * \@todo Horizontal swipe threshold as option
         * \@todo #261
         * @param {?} event - The event arguments.
         * @return {?} stage - object with 'x' and 'y' coordinates of .owl-stage
         */
        CarouselService.prototype.prepareDragging = /**
         * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
         * \@todo Horizontal swipe threshold as option
         * \@todo #261
         * @param {?} event - The event arguments.
         * @return {?} stage - object with 'x' and 'y' coordinates of .owl-stage
         */
            function (event) {
                /** @type {?} */
                var stage = null;
                /** @type {?} */
                var transformArr;
                // could be 5 commented lines below; However there's stage transform in stageData and in updates after each move of stage
                // stage = getComputedStyle(this.el.nativeElement).transform.replace(/.*\(|\)| /g, '').split(',');
                // stage = {
                //   x: stage[stage.length === 16 ? 12 : 4],
                //   y: stage[stage.length === 16 ? 13 : 5]
                // };
                transformArr = this.stageData.transform.replace(/.*\(|\)| |[^,-\d]\w|\)/g, '').split(',');
                stage = {
                    x: +transformArr[0],
                    y: +transformArr[1]
                };
                if (this.is('animating')) {
                    this.invalidate('position');
                }
                if (event.type === 'mousedown') {
                    this.owlDOMData.isGrab = true;
                }
                this.speed(0);
                return stage;
            };
        /**
         * Enters into a 'dragging' state
         */
        /**
         * Enters into a 'dragging' state
         * @return {?}
         */
        CarouselService.prototype.enterDragging = /**
         * Enters into a 'dragging' state
         * @return {?}
         */
            function () {
                this.enter('dragging');
                this._trigger('drag');
            };
        /**
         * Defines new coords for .owl-stage while dragging it
         * @todo #261
         * @param event the event arguments.
         * @param dragData initial data got after starting dragging
         * @returns coords or false
         */
        /**
         * Defines new coords for .owl-stage while dragging it
         * \@todo #261
         * @param {?} event the event arguments.
         * @param {?} dragData initial data got after starting dragging
         * @return {?} coords or false
         */
        CarouselService.prototype.defineNewCoordsDrag = /**
         * Defines new coords for .owl-stage while dragging it
         * \@todo #261
         * @param {?} event the event arguments.
         * @param {?} dragData initial data got after starting dragging
         * @return {?} coords or false
         */
            function (event, dragData) {
                /** @type {?} */
                var minimum = null;
                /** @type {?} */
                var maximum = null;
                /** @type {?} */
                var pull = null;
                /** @type {?} */
                var delta = this.difference(dragData.pointer, this.pointer(event));
                /** @type {?} */
                var stage = this.difference(dragData.stage.start, delta);
                if (!this.is('dragging')) {
                    return false;
                }
                if (this.settings.loop) {
                    minimum = this.coordinates(this.minimum());
                    maximum = +this.coordinates(this.maximum() + 1) - minimum;
                    stage.x = (((stage.x - minimum) % maximum + maximum) % maximum) + minimum;
                }
                else {
                    minimum = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
                    maximum = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
                    pull = this.settings.pullDrag ? -1 * delta.x / 5 : 0;
                    stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
                }
                return stage;
            };
        /**
         * Finishes dragging of carousel when `touchend` and `mouseup` events fire.
         * @todo #261
         * @todo Threshold for click event
         * @param event the event arguments.
         * @param dragObj the object with dragging settings and states
         * @param clickAttacher function which attaches click handler to slide or its children elements in order to prevent event bubling
         */
        /**
         * Finishes dragging of carousel when `touchend` and `mouseup` events fire.
         * \@todo #261
         * \@todo Threshold for click event
         * @param {?} event the event arguments.
         * @param {?} dragObj the object with dragging settings and states
         * @param {?} clickAttacher function which attaches click handler to slide or its children elements in order to prevent event bubling
         * @return {?}
         */
        CarouselService.prototype.finishDragging = /**
         * Finishes dragging of carousel when `touchend` and `mouseup` events fire.
         * \@todo #261
         * \@todo Threshold for click event
         * @param {?} event the event arguments.
         * @param {?} dragObj the object with dragging settings and states
         * @param {?} clickAttacher function which attaches click handler to slide or its children elements in order to prevent event bubling
         * @return {?}
         */
            function (event, dragObj, clickAttacher) {
                /** @type {?} */
                var delta = this.difference(dragObj.pointer, this.pointer(event));
                /** @type {?} */
                var stage = dragObj.stage.current;
                /** @type {?} */
                var direction = delta.x > +this.settings.rtl ? 'left' : 'right';
                /** @type {?} */
                var currentSlideI;
                /** @type {?} */
                var current;
                /** @type {?} */
                var newCurrent;
                if (delta.x !== 0 && this.is('dragging') || !this.is('valid')) {
                    this.speed(+this.settings.dragEndSpeed || this.settings.smartSpeed);
                    currentSlideI = this.closest(stage.x, delta.x !== 0 ? direction : dragObj.direction);
                    current = this.current();
                    newCurrent = this.current(currentSlideI === -1 ? undefined : currentSlideI);
                    if (current !== newCurrent) {
                        this.invalidate('position');
                        this.update();
                    }
                    dragObj.direction = direction;
                    if (Math.abs(delta.x) > 3 || new Date().getTime() - dragObj.time > 300) {
                        clickAttacher();
                    }
                }
                if (!this.is('dragging')) {
                    return;
                }
                this.leave('dragging');
                this._trigger('dragged');
            };
        /**
         * Gets absolute position of the closest item for a coordinate.
         * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
         * @param coordinate The coordinate in pixel.
         * @param direction The direction to check for the closest item. Ether `left` or `right`.
         * @returns The absolute position of the closest item.
         */
        /**
         * Gets absolute position of the closest item for a coordinate.
         * \@todo Setting `freeDrag` makes `closest` not reusable. See #165.
         * @param {?} coordinate The coordinate in pixel.
         * @param {?} direction The direction to check for the closest item. Ether `left` or `right`.
         * @return {?} The absolute position of the closest item.
         */
        CarouselService.prototype.closest = /**
         * Gets absolute position of the closest item for a coordinate.
         * \@todo Setting `freeDrag` makes `closest` not reusable. See #165.
         * @param {?} coordinate The coordinate in pixel.
         * @param {?} direction The direction to check for the closest item. Ether `left` or `right`.
         * @return {?} The absolute position of the closest item.
         */
            function (coordinate, direction) {
                /** @type {?} */
                var pull = 30;
                /** @type {?} */
                var width = this.width();
                /** @type {?} */
                var coordinates = (this.coordinates());
                /** @type {?} */
                var position = -1;
                if (this.settings.center) {
                    coordinates = coordinates.map(function (item) {
                        if (item === 0) {
                            item += 0.000001;
                        }
                        return item;
                    });
                }
                // option 'freeDrag' doesn't have realization and using it here creates problem:
                // variable 'position' stays unchanged (it equals -1 at the begging) and thus method returns -1
                // Returning value is consumed by method current(), which taking -1 as argument calculates the index of new current slide
                // In case of having 5 slides ans 'loop=false; calling 'current(-1)' sets props '_current' as 4. Just last slide remains visible instead of 3 last slides.
                // if (!this.settings.freeDrag) {
                // check closest item
                for (var i = 0; i < coordinates.length; i++) {
                    if (direction === 'left' && coordinate > coordinates[i] - pull && coordinate < coordinates[i] + pull) {
                        position = i;
                        // on a right pull, check on previous index
                        // to do so, subtract width from value and set position = index + 1
                    }
                    else if (direction === 'right' && coordinate > coordinates[i] - width - pull && coordinate < coordinates[i] - width + pull) {
                        position = i + 1;
                    }
                    else if (this._op(coordinate, '<', coordinates[i])
                        && this._op(coordinate, '>', coordinates[i + 1] || coordinates[i] - width)) {
                        position = direction === 'left' ? i + 1 : i;
                    }
                    else if (direction === null && coordinate > coordinates[i] - pull && coordinate < coordinates[i] + pull) {
                        position = i;
                    }
                    if (position !== -1) {
                        break;
                    }
                }
                // }
                if (!this.settings.loop) {
                    // non loop boundries
                    if (this._op(coordinate, '>', coordinates[this.minimum()])) {
                        position = coordinate = this.minimum();
                    }
                    else if (this._op(coordinate, '<', coordinates[this.maximum()])) {
                        position = coordinate = this.maximum();
                    }
                }
                return position;
            };
        /**
         * Animates the stage.
         * @todo #270
         * @param coordinate The coordinate in pixels.
         */
        /**
         * Animates the stage.
         * \@todo #270
         * @param {?} coordinate The coordinate in pixels.
         * @return {?}
         */
        CarouselService.prototype.animate = /**
         * Animates the stage.
         * \@todo #270
         * @param {?} coordinate The coordinate in pixels.
         * @return {?}
         */
            function (coordinate) {
                /** @type {?} */
                var animate = this.speed() > 0;
                if (this.is('animating')) {
                    this.onTransitionEnd();
                }
                if (animate) {
                    this.enter('animating');
                    this._trigger('translate');
                }
                this.stageData.transform = 'translate3d(' + coordinate + 'px,0px,0px)';
                this.stageData.transition = (this.speed() / 1000) + 's';
                // also there was transition by means of JQuery.animate or css-changing property left
            };
        /**
         * Checks whether the carousel is in a specific state or not.
         * @param state The state to check.
         * @returns The flag which indicates if the carousel is busy.
         */
        /**
         * Checks whether the carousel is in a specific state or not.
         * @param {?} state The state to check.
         * @return {?} The flag which indicates if the carousel is busy.
         */
        CarouselService.prototype.is = /**
         * Checks whether the carousel is in a specific state or not.
         * @param {?} state The state to check.
         * @return {?} The flag which indicates if the carousel is busy.
         */
            function (state) {
                return this._states.current[state] && this._states.current[state] > 0;
            };
        /**
         * Sets the absolute position of the current item.
         * @param position The new absolute position or nothing to leave it unchanged.
         * @returns The absolute position of the current item.
         */
        /**
         * Sets the absolute position of the current item.
         * @param {?=} position The new absolute position or nothing to leave it unchanged.
         * @return {?} The absolute position of the current item.
         */
        CarouselService.prototype.current = /**
         * Sets the absolute position of the current item.
         * @param {?=} position The new absolute position or nothing to leave it unchanged.
         * @return {?} The absolute position of the current item.
         */
            function (position) {
                if (position === undefined) {
                    return this._current;
                }
                if (this._items.length === 0) {
                    return undefined;
                }
                position = this.normalize(position);
                if (this._current !== position) {
                    /** @type {?} */
                    var event_1 = this._trigger('change', { property: { name: 'position', value: position } });
                    // if (event.data !== undefined) {
                    // 	position = this.normalize(event.data);
                    // }
                    this._current = position;
                    this.invalidate('position');
                    this._trigger('changed', { property: { name: 'position', value: this._current } });
                }
                return this._current;
            };
        /**
         * Invalidates the given part of the update routine.
         * @param part The part to invalidate.
         * @returns The invalidated parts.
         */
        /**
         * Invalidates the given part of the update routine.
         * @param {?} part The part to invalidate.
         * @return {?} The invalidated parts.
         */
        CarouselService.prototype.invalidate = /**
         * Invalidates the given part of the update routine.
         * @param {?} part The part to invalidate.
         * @return {?} The invalidated parts.
         */
            function (part) {
                if (typeof part === 'string') {
                    this._invalidated[part] = true;
                    if (this.is('valid')) {
                        this.leave('valid');
                    }
                }
                return Object.keys(this._invalidated);
            };
        /**
         * Resets the absolute position of the current item.
         * @param position the absolute position of the new item.
         */
        /**
         * Resets the absolute position of the current item.
         * @param {?} position the absolute position of the new item.
         * @return {?}
         */
        CarouselService.prototype.reset = /**
         * Resets the absolute position of the current item.
         * @param {?} position the absolute position of the new item.
         * @return {?}
         */
            function (position) {
                position = this.normalize(position);
                if (position === undefined) {
                    return;
                }
                this._speed = 0;
                this._current = position;
                this._suppress(['translate', 'translated']);
                this.animate(this.coordinates(position));
                this._release(['translate', 'translated']);
            };
        /**
         * Normalizes an absolute or a relative position of an item.
         * @param position The absolute or relative position to normalize.
         * @param relative Whether the given position is relative or not.
         * @returns The normalized position.
         */
        /**
         * Normalizes an absolute or a relative position of an item.
         * @param {?} position The absolute or relative position to normalize.
         * @param {?=} relative Whether the given position is relative or not.
         * @return {?} The normalized position.
         */
        CarouselService.prototype.normalize = /**
         * Normalizes an absolute or a relative position of an item.
         * @param {?} position The absolute or relative position to normalize.
         * @param {?=} relative Whether the given position is relative or not.
         * @return {?} The normalized position.
         */
            function (position, relative) {
                /** @type {?} */
                var n = this._items.length;
                /** @type {?} */
                var m = relative ? 0 : this._clones.length;
                if (!this._isNumeric(position) || n < 1) {
                    position = undefined;
                }
                else if (position < 0 || position >= n + m) {
                    position = ((position - m / 2) % n + n) % n + m / 2;
                }
                return position;
            };
        /**
         * Converts an absolute position of an item into a relative one.
         * @param position The absolute position to convert.
         * @returns The converted position.
         */
        /**
         * Converts an absolute position of an item into a relative one.
         * @param {?} position The absolute position to convert.
         * @return {?} The converted position.
         */
        CarouselService.prototype.relative = /**
         * Converts an absolute position of an item into a relative one.
         * @param {?} position The absolute position to convert.
         * @return {?} The converted position.
         */
            function (position) {
                position -= this._clones.length / 2;
                return this.normalize(position, true);
            };
        /**
         * Gets the maximum position for the current item.
         * @param relative Whether to return an absolute position or a relative position.
         * @returns number of maximum position
         */
        /**
         * Gets the maximum position for the current item.
         * @param {?=} relative Whether to return an absolute position or a relative position.
         * @return {?} number of maximum position
         */
        CarouselService.prototype.maximum = /**
         * Gets the maximum position for the current item.
         * @param {?=} relative Whether to return an absolute position or a relative position.
         * @return {?} number of maximum position
         */
            function (relative) {
                if (relative === void 0) {
                    relative = false;
                }
                /** @type {?} */
                var settings = this.settings;
                /** @type {?} */
                var maximum = this._coordinates.length;
                /** @type {?} */
                var iterator;
                /** @type {?} */
                var reciprocalItemsWidth;
                /** @type {?} */
                var elementWidth;
                if (settings.loop) {
                    maximum = this._clones.length / 2 + this._items.length - 1;
                }
                else if (settings.autoWidth || settings.merge) {
                    iterator = this._items.length;
                    reciprocalItemsWidth = this.slidesData[--iterator].width;
                    elementWidth = this._width;
                    while (iterator--) {
                        // it could be use this._items instead of this.slidesData;
                        reciprocalItemsWidth += +this.slidesData[iterator].width + this.settings.margin;
                        if (reciprocalItemsWidth > elementWidth) {
                            break;
                        }
                    }
                    maximum = iterator + 1;
                }
                else if (settings.center) {
                    maximum = this._items.length - 1;
                }
                else {
                    maximum = this._items.length - settings.items;
                }
                if (relative) {
                    maximum -= this._clones.length / 2;
                }
                return Math.max(maximum, 0);
            };
        /**
         * Gets the minimum position for the current item.
         * @param relative Whether to return an absolute position or a relative position.
         * @returns number of minimum position
         */
        /**
         * Gets the minimum position for the current item.
         * @param {?=} relative Whether to return an absolute position or a relative position.
         * @return {?} number of minimum position
         */
        CarouselService.prototype.minimum = /**
         * Gets the minimum position for the current item.
         * @param {?=} relative Whether to return an absolute position or a relative position.
         * @return {?} number of minimum position
         */
            function (relative) {
                if (relative === void 0) {
                    relative = false;
                }
                return relative ? 0 : this._clones.length / 2;
            };
        /**
         * Gets an item at the specified relative position.
         * @param position The relative position of the item.
         * @returns The item at the given position or all items if no position was given.
         */
        /**
         * Gets an item at the specified relative position.
         * @param {?=} position The relative position of the item.
         * @return {?} The item at the given position or all items if no position was given.
         */
        CarouselService.prototype.items = /**
         * Gets an item at the specified relative position.
         * @param {?=} position The relative position of the item.
         * @return {?} The item at the given position or all items if no position was given.
         */
            function (position) {
                if (position === undefined) {
                    return this._items.slice();
                }
                position = this.normalize(position, true);
                return [this._items[position]];
            };
        /**
         * Gets an item at the specified relative position.
         * @param position The relative position of the item.
         * @returns The item at the given position or all items if no position was given.
         */
        /**
         * Gets an item at the specified relative position.
         * @param {?} position The relative position of the item.
         * @return {?} The item at the given position or all items if no position was given.
         */
        CarouselService.prototype.mergers = /**
         * Gets an item at the specified relative position.
         * @param {?} position The relative position of the item.
         * @return {?} The item at the given position or all items if no position was given.
         */
            function (position) {
                if (position === undefined) {
                    return this._mergers.slice();
                }
                position = this.normalize(position, true);
                return this._mergers[position];
            };
        /**
         * Gets the absolute positions of clones for an item.
         * @param position The relative position of the item.
         * @returns The absolute positions of clones for the item or all if no position was given.
         */
        /**
         * Gets the absolute positions of clones for an item.
         * @param {?=} position The relative position of the item.
         * @return {?} The absolute positions of clones for the item or all if no position was given.
         */
        CarouselService.prototype.clones = /**
         * Gets the absolute positions of clones for an item.
         * @param {?=} position The relative position of the item.
         * @return {?} The absolute positions of clones for the item or all if no position was given.
         */
            function (position) {
                /** @type {?} */
                var odd = this._clones.length / 2;
                /** @type {?} */
                var even = odd + this._items.length;
                /** @type {?} */
                var map = function (index) { return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2; };
                if (position === undefined) {
                    return this._clones.map(function (v, i) { return map(i); });
                }
                return this._clones.map(function (v, i) { return v === position ? map(i) : null; }).filter(function (item) { return item; });
            };
        /**
         * Sets the current animation speed.
         * @param speed The animation speed in milliseconds or nothing to leave it unchanged.
         * @returns The current animation speed in milliseconds.
         */
        /**
         * Sets the current animation speed.
         * @param {?=} speed The animation speed in milliseconds or nothing to leave it unchanged.
         * @return {?} The current animation speed in milliseconds.
         */
        CarouselService.prototype.speed = /**
         * Sets the current animation speed.
         * @param {?=} speed The animation speed in milliseconds or nothing to leave it unchanged.
         * @return {?} The current animation speed in milliseconds.
         */
            function (speed) {
                if (speed !== undefined) {
                    this._speed = speed;
                }
                return this._speed;
            };
        /**
         * Gets the coordinate of an item.
         * @todo The name of this method is missleanding.
         * @param position The absolute position of the item within `minimum()` and `maximum()`.
         * @returns The coordinate of the item in pixel or all coordinates.
         */
        /**
         * Gets the coordinate of an item.
         * \@todo The name of this method is missleanding.
         * @param {?=} position The absolute position of the item within `minimum()` and `maximum()`.
         * @return {?} The coordinate of the item in pixel or all coordinates.
         */
        CarouselService.prototype.coordinates = /**
         * Gets the coordinate of an item.
         * \@todo The name of this method is missleanding.
         * @param {?=} position The absolute position of the item within `minimum()` and `maximum()`.
         * @return {?} The coordinate of the item in pixel or all coordinates.
         */
            function (position) {
                var _this = this;
                /** @type {?} */
                var multiplier = 1;
                /** @type {?} */
                var newPosition = position - 1;
                /** @type {?} */
                var coordinate;
                /** @type {?} */
                var result;
                if (position === undefined) {
                    result = this._coordinates.map(function (item, index) {
                        return /** @type {?} */ (_this.coordinates(index));
                    });
                    return result;
                }
                if (this.settings.center) {
                    if (this.settings.rtl) {
                        multiplier = -1;
                        newPosition = position + 1;
                    }
                    coordinate = this._coordinates[position];
                    coordinate += (this.width() - coordinate + (this._coordinates[newPosition] || 0)) / 2 * multiplier;
                }
                else {
                    coordinate = this._coordinates[newPosition] || 0;
                }
                coordinate = Math.ceil(coordinate);
                return coordinate;
            };
        /**
         * Calculates the speed for a translation.
         * @param {?} from The absolute position of the start item.
         * @param {?} to The absolute position of the target item.
         * @param {?=} factor [factor=undefined] - The time factor in milliseconds.
         * @return {?} The time in milliseconds for the translation.
         */
        CarouselService.prototype._duration = /**
         * Calculates the speed for a translation.
         * @param {?} from The absolute position of the start item.
         * @param {?} to The absolute position of the target item.
         * @param {?=} factor [factor=undefined] - The time factor in milliseconds.
         * @return {?} The time in milliseconds for the translation.
         */
            function (from, to, factor) {
                if (factor === 0) {
                    return 0;
                }
                return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((+factor || this.settings.smartSpeed));
            };
        /**
         * Slides to the specified item.
         * @param position The position of the item.
         * @param speed The time in milliseconds for the transition.
         */
        /**
         * Slides to the specified item.
         * @param {?} position The position of the item.
         * @param {?} speed The time in milliseconds for the transition.
         * @return {?}
         */
        CarouselService.prototype.to = /**
         * Slides to the specified item.
         * @param {?} position The position of the item.
         * @param {?} speed The time in milliseconds for the transition.
         * @return {?}
         */
            function (position, speed) {
                var _this = this;
                /** @type {?} */
                var current = this.current();
                /** @type {?} */
                var revert = null;
                /** @type {?} */
                var distance = position - this.relative(current);
                /** @type {?} */
                var maximum = this.maximum();
                /** @type {?} */
                var direction = +(distance > 0) - +(distance < 0);
                /** @type {?} */
                var items = this._items.length;
                /** @type {?} */
                var minimum = this.minimum();
                if (this.settings.loop) {
                    if (!this.settings.rewind && Math.abs(distance) > items / 2) {
                        distance += direction * -1 * items;
                    }
                    position = current + distance;
                    revert = ((position - minimum) % items + items) % items + minimum;
                    if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
                        current = revert - distance;
                        position = revert;
                        this.reset(current);
                        this.sendChanges();
                    }
                }
                else if (this.settings.rewind) {
                    maximum += 1;
                    position = (position % maximum + maximum) % maximum;
                }
                else {
                    position = Math.max(minimum, Math.min(maximum, position));
                }
                setTimeout(function () {
                    _this.speed(_this._duration(current, position, speed));
                    _this.current(position);
                    _this.update();
                }, 0);
            };
        /**
         * Slides to the next item.
         * @param speed The time in milliseconds for the transition.
         */
        /**
         * Slides to the next item.
         * @param {?} speed The time in milliseconds for the transition.
         * @return {?}
         */
        CarouselService.prototype.next = /**
         * Slides to the next item.
         * @param {?} speed The time in milliseconds for the transition.
         * @return {?}
         */
            function (speed) {
                speed = speed || false;
                this.to(this.relative(this.current()) + 1, speed);
            };
        /**
         * Slides to the previous item.
         * @param speed The time in milliseconds for the transition.
         */
        /**
         * Slides to the previous item.
         * @param {?} speed The time in milliseconds for the transition.
         * @return {?}
         */
        CarouselService.prototype.prev = /**
         * Slides to the previous item.
         * @param {?} speed The time in milliseconds for the transition.
         * @return {?}
         */
            function (speed) {
                speed = speed || false;
                this.to(this.relative(this.current()) - 1, speed);
            };
        /**
         * Handles the end of an animation.
         * @param event - The event arguments.
         */
        /**
         * Handles the end of an animation.
         * @param {?=} event - The event arguments.
         * @return {?}
         */
        CarouselService.prototype.onTransitionEnd = /**
         * Handles the end of an animation.
         * @param {?=} event - The event arguments.
         * @return {?}
         */
            function (event) {
                // if css2 animation then event object is undefined
                if (event !== undefined) {
                    // event.stopPropagation();
                    // // Catch only owl-stage transitionEnd event
                    // if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)	) {
                    // 	return false;
                    // }
                    return false;
                }
                this.leave('animating');
                this._trigger('translated');
            };
        /**
         * Gets viewport width.
         * @return {?} - The width in pixel.
         */
        CarouselService.prototype._viewport = /**
         * Gets viewport width.
         * @return {?} - The width in pixel.
         */
            function () {
                /** @type {?} */
                var width;
                if (this._width) {
                    width = this._width;
                }
                else {
                    console.warn('Can not detect viewport width.');
                }
                return width;
            };
        /**
         * Sets _items
         * @param content The list of slides put into CarouselSlideDirectives.
         */
        /**
         * Sets _items
         * @param {?} content The list of slides put into CarouselSlideDirectives.
         * @return {?}
         */
        CarouselService.prototype.setItems = /**
         * Sets _items
         * @param {?} content The list of slides put into CarouselSlideDirectives.
         * @return {?}
         */
            function (content) {
                this._items = content;
            };
        /**
         * Sets slidesData using this._items
         * @return {?}
         */
        CarouselService.prototype._defineSlidesData = /**
         * Sets slidesData using this._items
         * @return {?}
         */
            function () {
                /** @type {?} */
                var loadMap;
                if (this.slidesData && this.slidesData.length) {
                    loadMap = new Map();
                    this.slidesData.forEach(function (item) {
                        if (item.load) {
                            loadMap.set(item.id, item.load);
                        }
                    });
                }
                this.slidesData = this._items.map(function (slide) {
                    return {
                        id: "" + slide.id,
                        isActive: false,
                        tplRef: slide.tplRef,
                        dataMerge: slide.dataMerge,
                        width: 0,
                        isCloned: false,
                        load: loadMap ? loadMap.get(slide.id) : false,
                        hashFragment: slide.dataHash
                    };
                });
            };
        /**
         * Sets current classes for slide
         * @param slide Slide of carousel
         * @returns object with names of css-classes which are keys and true/false values
         */
        /**
         * Sets current classes for slide
         * @param {?} slide Slide of carousel
         * @return {?} object with names of css-classes which are keys and true/false values
         */
        CarouselService.prototype.setCurSlideClasses = /**
         * Sets current classes for slide
         * @param {?} slide Slide of carousel
         * @return {?} object with names of css-classes which are keys and true/false values
         */
            function (slide) {
                /** @type {?} */
                var currentClasses = {
                    'active': slide.isActive,
                    'center': slide.isCentered,
                    'cloned': slide.isCloned,
                    'animated': slide.isAnimated,
                    'owl-animated-in': slide.isDefAnimatedIn,
                    'owl-animated-out': slide.isDefAnimatedOut
                };
                if (this.settings.animateIn) {
                    currentClasses[(this.settings.animateIn)] = slide.isCustomAnimatedIn;
                }
                if (this.settings.animateOut) {
                    currentClasses[(this.settings.animateOut)] = slide.isCustomAnimatedOut;
                }
                return currentClasses;
            };
        /**
         * Operators to calculate right-to-left and left-to-right.
         * @param {?} a - The left side operand.
         * @param {?} o - The operator.
         * @param {?} b - The right side operand.
         * @return {?} true/false meaning right-to-left or left-to-right
         */
        CarouselService.prototype._op = /**
         * Operators to calculate right-to-left and left-to-right.
         * @param {?} a - The left side operand.
         * @param {?} o - The operator.
         * @param {?} b - The right side operand.
         * @return {?} true/false meaning right-to-left or left-to-right
         */
            function (a, o, b) {
                /** @type {?} */
                var rtl = this.settings.rtl;
                switch (o) {
                    case '<':
                        return rtl ? a > b : a < b;
                    case '>':
                        return rtl ? a < b : a > b;
                    case '>=':
                        return rtl ? a <= b : a >= b;
                    case '<=':
                        return rtl ? a >= b : a <= b;
                    default:
                        break;
                }
            };
        /**
         * Triggers a public event.
         * \@todo Remove `status`, `relatedTarget` should be used instead.
         * @param {?} name The event name.
         * @param {?=} data The event data.
         * @param {?=} namespace The event namespace.
         * @param {?=} state The state which is associated with the event.
         * @param {?=} enter Indicates if the call enters the specified state or not.
         * @return {?}
         */
        CarouselService.prototype._trigger = /**
         * Triggers a public event.
         * \@todo Remove `status`, `relatedTarget` should be used instead.
         * @param {?} name The event name.
         * @param {?=} data The event data.
         * @param {?=} namespace The event namespace.
         * @param {?=} state The state which is associated with the event.
         * @param {?=} enter Indicates if the call enters the specified state or not.
         * @return {?}
         */
            function (name, data, namespace, state, enter) {
                switch (name) {
                    case 'initialized':
                        this._initializedCarousel$.next(name);
                        break;
                    case 'change':
                        this._changeSettingsCarousel$.next(data);
                        break;
                    case 'changed':
                        this._changedSettingsCarousel$.next(data);
                        break;
                    case 'drag':
                        this._dragCarousel$.next(name);
                        break;
                    case 'dragged':
                        this._draggedCarousel$.next(name);
                        break;
                    case 'resize':
                        this._resizeCarousel$.next(name);
                        break;
                    case 'resized':
                        this._resizedCarousel$.next(name);
                        break;
                    case 'refresh':
                        this._refreshCarousel$.next(name);
                        break;
                    case 'refreshed':
                        this._refreshedCarousel$.next(name);
                        break;
                    case 'translate':
                        this._translateCarousel$.next(name);
                        break;
                    case 'translated':
                        this._translatedCarousel$.next(name);
                        break;
                    default:
                        break;
                }
            };
        /**
         * Enters a state.
         * @param name - The state name.
         */
        /**
         * Enters a state.
         * @param {?} name - The state name.
         * @return {?}
         */
        CarouselService.prototype.enter = /**
         * Enters a state.
         * @param {?} name - The state name.
         * @return {?}
         */
            function (name) {
                var _this = this;
                [name].concat(this._states.tags[name] || []).forEach(function (stateName) {
                    if (_this._states.current[stateName] === undefined) {
                        _this._states.current[stateName] = 0;
                    }
                    _this._states.current[stateName]++;
                });
            };
        /**
         * Leaves a state.
         * @param name - The state name.
         */
        /**
         * Leaves a state.
         * @param {?} name - The state name.
         * @return {?}
         */
        CarouselService.prototype.leave = /**
         * Leaves a state.
         * @param {?} name - The state name.
         * @return {?}
         */
            function (name) {
                var _this = this;
                [name].concat(this._states.tags[name] || []).forEach(function (stateName) {
                    if (_this._states.current[stateName] === 0 || !!_this._states.current[stateName]) {
                        _this._states.current[stateName]--;
                    }
                });
            };
        /**
         * Registers an event or state.
         * @param object - The event or state to register.
         */
        /**
         * Registers an event or state.
         * @param {?} object - The event or state to register.
         * @return {?}
         */
        CarouselService.prototype.register = /**
         * Registers an event or state.
         * @param {?} object - The event or state to register.
         * @return {?}
         */
            function (object) {
                var _this = this;
                if (object.type === Type.State) {
                    if (!this._states.tags[object.name]) {
                        this._states.tags[object.name] = object.tags;
                    }
                    else {
                        this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
                    }
                    this._states.tags[object.name] = this._states.tags[object.name].filter(function (tag, i) {
                        return _this._states.tags[object.name].indexOf(tag) === i;
                    });
                }
            };
        /**
         * Suppresses events.
         * @param {?} events The events to suppress.
         * @return {?}
         */
        CarouselService.prototype._suppress = /**
         * Suppresses events.
         * @param {?} events The events to suppress.
         * @return {?}
         */
            function (events) {
                var _this = this;
                events.forEach(function (event) {
                    _this._supress[event] = true;
                });
            };
        /**
         * Releases suppressed events.
         * @param {?} events The events to release.
         * @return {?}
         */
        CarouselService.prototype._release = /**
         * Releases suppressed events.
         * @param {?} events The events to release.
         * @return {?}
         */
            function (events) {
                var _this = this;
                events.forEach(function (event) {
                    delete _this._supress[event];
                });
            };
        /**
         * Gets unified pointer coordinates from event.
         * @todo #261
         * @param event The `mousedown` or `touchstart` event.
         * @returns Object Coords which contains `x` and `y` coordinates of current pointer position.
         */
        /**
         * Gets unified pointer coordinates from event.
         * \@todo #261
         * @param {?} event The `mousedown` or `touchstart` event.
         * @return {?} Object Coords which contains `x` and `y` coordinates of current pointer position.
         */
        CarouselService.prototype.pointer = /**
         * Gets unified pointer coordinates from event.
         * \@todo #261
         * @param {?} event The `mousedown` or `touchstart` event.
         * @return {?} Object Coords which contains `x` and `y` coordinates of current pointer position.
         */
            function (event) {
                /** @type {?} */
                var result = { x: null, y: null };
                event = event.originalEvent || event || window.event;
                event = event.touches && event.touches.length ?
                    event.touches[0] : event.changedTouches && event.changedTouches.length ?
                    event.changedTouches[0] : event;
                if (event.pageX) {
                    result.x = event.pageX;
                    result.y = event.pageY;
                }
                else {
                    result.x = event.clientX;
                    result.y = event.clientY;
                }
                return result;
            };
        /**
         * Determines if the input is a Number or something that can be coerced to a Number
         * @param {?} number The input to be tested
         * @return {?} An indication if the input is a Number or can be coerced to a Number
         */
        CarouselService.prototype._isNumeric = /**
         * Determines if the input is a Number or something that can be coerced to a Number
         * @param {?} number The input to be tested
         * @return {?} An indication if the input is a Number or can be coerced to a Number
         */
            function (number) {
                return !isNaN(parseFloat(number));
            };
        /**
         * Determines whether value is number or boolean type
         * @param {?} value The input to be tested
         * @return {?} An indication if the input is a Number or can be coerced to a Number, or Boolean
         */
        CarouselService.prototype._isNumberOrBoolean = /**
         * Determines whether value is number or boolean type
         * @param {?} value The input to be tested
         * @return {?} An indication if the input is a Number or can be coerced to a Number, or Boolean
         */
            function (value) {
                return this._isNumeric(value) || typeof value === 'boolean';
            };
        /**
         * Determines whether value is number or string type
         * @param {?} value The input to be tested
         * @return {?} An indication if the input is a Number or can be coerced to a Number, or String
         */
        CarouselService.prototype._isNumberOrString = /**
         * Determines whether value is number or string type
         * @param {?} value The input to be tested
         * @return {?} An indication if the input is a Number or can be coerced to a Number, or String
         */
            function (value) {
                return this._isNumeric(value) || typeof value === 'string';
            };
        /**
         * Determines whether value is number or string type
         * @param {?} value The input to be tested
         * @return {?} An indication if the input is a Number or can be coerced to a Number, or String
         */
        CarouselService.prototype._isStringOrBoolean = /**
         * Determines whether value is number or string type
         * @param {?} value The input to be tested
         * @return {?} An indication if the input is a Number or can be coerced to a Number, or String
         */
            function (value) {
                return typeof value === 'string' || typeof value === 'boolean';
            };
        /**
         * Gets the difference of two vectors.
         * @todo #261
         * @param first The first vector.
         * @param second- The second vector.
         * @returns The difference.
         */
        /**
         * Gets the difference of two vectors.
         * \@todo #261
         * @param {?} first The first vector.
         * @param {?} second
         * @return {?} The difference.
         */
        CarouselService.prototype.difference = /**
         * Gets the difference of two vectors.
         * \@todo #261
         * @param {?} first The first vector.
         * @param {?} second
         * @return {?} The difference.
         */
            function (first, second) {
                return {
                    x: first.x - second.x,
                    y: first.y - second.y
                };
            };
        CarouselService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        CarouselService.ctorParameters = function () { return []; };
        return CarouselService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NavigationService = (function () {
        function NavigationService(carouselService) {
            this.carouselService = carouselService;
            /**
             * Indicates whether the plugin is initialized or not.
             */
            this._initialized = false;
            /**
             * The current paging indexes.
             */
            this._pages = [];
            /**
             * Data for navigation elements of the user interface.
             */
            this._navData = {
                disabled: false,
                prev: {
                    disabled: false,
                    htmlText: ''
                },
                next: {
                    disabled: false,
                    htmlText: ''
                },
            };
            /**
             * Data for dot elements of the user interface.
             */
            this._dotsData = {
                disabled: false,
                dots: []
            };
            this.spyDataStreams();
        }
        /**
         * @return {?}
         */
        NavigationService.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.navSubscription.unsubscribe();
            };
        /**
         * Defines Observables which service must observe
         */
        /**
         * Defines Observables which service must observe
         * @return {?}
         */
        NavigationService.prototype.spyDataStreams = /**
         * Defines Observables which service must observe
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var initializedCarousel$ = this.carouselService.getInitializedState().pipe(operators.tap(function (state) {
                    _this.initialize();
                    _this._updateNavPages();
                    _this.draw();
                    _this.update();
                    _this.carouselService.sendChanges();
                }));
                /** @type {?} */
                var changedSettings$ = this.carouselService.getChangedState().pipe(operators.filter(function (data) { return data.property.name === 'position'; }), operators.tap(function (data) {
                    _this.update();
                    // should be the call of the function written at the end of comment
                    // but the method carouselServive.to() has setTimeout(f, 0) which contains carouselServive.update() which calls sendChanges() method.
                    // carouselService.navData and carouselService.dotsData update earlier than carouselServive.update() gets called
                    // updates of carouselService.navData and carouselService.dotsData are being happening withing carouselService.current(position) method which calls next() of _changedSettingsCarousel$
                    // carouselService.current(position) is being calling earlier than carouselServive.update();
                    // this.carouselService.sendChanges();
                }));
                /** @type {?} */
                var refreshedCarousel$ = this.carouselService.getRefreshedState().pipe(operators.tap(function () {
                    _this._updateNavPages();
                    _this.draw();
                    _this.update();
                    _this.carouselService.sendChanges();
                }));
                /** @type {?} */
                var navMerge$ = merge.merge(initializedCarousel$, changedSettings$, refreshedCarousel$);
                this.navSubscription = navMerge$.subscribe(function () { });
            };
        /**
           * Initializes the layout of the plugin and extends the carousel.
           */
        /**
         * Initializes the layout of the plugin and extends the carousel.
         * @return {?}
         */
        NavigationService.prototype.initialize = /**
         * Initializes the layout of the plugin and extends the carousel.
         * @return {?}
         */
            function () {
                this._navData.disabled = true;
                this._navData.prev.htmlText = this.carouselService.settings.navText[0];
                this._navData.next.htmlText = this.carouselService.settings.navText[1];
                this._dotsData.disabled = true;
                this.carouselService.navData = this._navData;
                this.carouselService.dotsData = this._dotsData;
            };
        /**
         * Calculates internal states and updates prop _pages
         * @return {?}
         */
        NavigationService.prototype._updateNavPages = /**
         * Calculates internal states and updates prop _pages
         * @return {?}
         */
            function () {
                /** @type {?} */
                var i;
                /** @type {?} */
                var j;
                /** @type {?} */
                var k;
                /** @type {?} */
                var lower = this.carouselService.clones().length / 2;
                /** @type {?} */
                var upper = lower + this.carouselService.items().length;
                /** @type {?} */
                var maximum = this.carouselService.maximum(true);
                /** @type {?} */
                var pages = [];
                /** @type {?} */
                var settings = this.carouselService.settings;
                /** @type {?} */
                var size = settings.center || settings.autoWidth || settings.dotsData
                    ? 1 : settings.dotsEach || settings.items;
                size = +size;
                if (settings.slideBy !== 'page') {
                    settings.slideBy = Math.min(+settings.slideBy, settings.items);
                }
                if (settings.dots || settings.slideBy === 'page') {
                    for (i = lower, j = 0, k = 0; i < upper; i++) {
                        if (j >= size || j === 0) {
                            pages.push({
                                start: Math.min(maximum, i - lower),
                                end: i - lower + size - 1
                            });
                            if (Math.min(maximum, i - lower) === maximum) {
                                break;
                            }
                            j = 0, ++k;
                        }
                        j += /** @type {?} */ (this.carouselService.mergers(this.carouselService.relative(i)));
                    }
                }
                this._pages = pages;
            };
        /**
           * Draws the user interface.
           * @todo The option `dotsData` wont work.
           */
        /**
         * Draws the user interface.
         * \@todo The option `dotsData` wont work.
         * @return {?}
         */
        NavigationService.prototype.draw = /**
         * Draws the user interface.
         * \@todo The option `dotsData` wont work.
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var difference;
                /** @type {?} */
                var settings = this.carouselService.settings;
                /** @type {?} */
                var items = this.carouselService.items();
                /** @type {?} */
                var disabled = items.length <= settings.items;
                this._navData.disabled = !settings.nav || disabled;
                this._dotsData.disabled = !settings.dots || disabled;
                if (settings.dots) {
                    difference = this._pages.length - this._dotsData.dots.length;
                    if (settings.dotsData && difference !== 0) {
                        this._dotsData.dots = [];
                        items.forEach(function (item) {
                            _this._dotsData.dots.push({
                                active: false,
                                id: "dot-" + item.id,
                                innerContent: item.dotContent,
                                showInnerContent: true
                            });
                        });
                    }
                    else if (difference > 0) {
                        /** @type {?} */
                        var startI = this._dotsData.dots.length > 0 ? this._dotsData.dots.length : 0;
                        for (var i = 0; i < difference; i++) {
                            this._dotsData.dots.push({
                                active: false,
                                id: "dot-" + (i + startI),
                                showInnerContent: false
                            });
                        }
                    }
                    else if (difference < 0) {
                        this._dotsData.dots.splice(difference, Math.abs(difference));
                    }
                }
                this.carouselService.navData = this._navData;
                this.carouselService.dotsData = this._dotsData;
            };
        /**
         * Updates navigation buttons's and dots's states
         */
        /**
         * Updates navigation buttons's and dots's states
         * @return {?}
         */
        NavigationService.prototype.update = /**
         * Updates navigation buttons's and dots's states
         * @return {?}
         */
            function () {
                this._updateNavButtons();
                this._updateDots();
            };
        /**
         * Changes state of nav buttons (disabled, enabled)
         * @return {?}
         */
        NavigationService.prototype._updateNavButtons = /**
         * Changes state of nav buttons (disabled, enabled)
         * @return {?}
         */
            function () {
                /** @type {?} */
                var settings = this.carouselService.settings;
                /** @type {?} */
                var loop = settings.loop || settings.rewind;
                /** @type {?} */
                var index = this.carouselService.relative(this.carouselService.current());
                if (settings.nav) {
                    this._navData.prev.disabled = !loop && index <= this.carouselService.minimum(true);
                    this._navData.next.disabled = !loop && index >= this.carouselService.maximum(true);
                }
                this.carouselService.navData = this._navData;
            };
        /**
         * Changes active dot if page becomes changed
         * @return {?}
         */
        NavigationService.prototype._updateDots = /**
         * Changes active dot if page becomes changed
         * @return {?}
         */
            function () {
                /** @type {?} */
                var curActiveDotI;
                this._dotsData.dots.forEach(function (item) {
                    if (item.active === true) {
                        item.active = false;
                    }
                });
                curActiveDotI = this._current();
                if (this._dotsData.dots.length) {
                    this._dotsData.dots[curActiveDotI].active = true;
                }
                this.carouselService.dotsData = this._dotsData;
            };
        /**
         * Gets the current page position of the carousel.
         * @return {?} the current page position of the carousel
         */
        NavigationService.prototype._current = /**
         * Gets the current page position of the carousel.
         * @return {?} the current page position of the carousel
         */
            function () {
                /** @type {?} */
                var current = this.carouselService.relative(this.carouselService.current());
                /** @type {?} */
                var finalCurrent;
                /** @type {?} */
                var pages = this._pages.filter(function (page, index) {
                    return page.start <= current && page.end >= current;
                }).pop();
                finalCurrent = this._pages.findIndex(function (page) {
                    return page.start === pages.start && page.end === pages.end;
                });
                return finalCurrent;
            };
        /**
         * Gets the current succesor/predecessor position.
         * @param {?} successor
         * @return {?} the current succesor/predecessor position
         */
        NavigationService.prototype._getPosition = /**
         * Gets the current succesor/predecessor position.
         * @param {?} successor
         * @return {?} the current succesor/predecessor position
         */
            function (successor) {
                /** @type {?} */
                var position;
                /** @type {?} */
                var length;
                /** @type {?} */
                var settings = this.carouselService.settings;
                if (settings.slideBy === 'page') {
                    position = this._current();
                    length = this._pages.length;
                    successor ? ++position : --position;
                    position = this._pages[((position % length) + length) % length].start;
                }
                else {
                    position = this.carouselService.relative(this.carouselService.current());
                    length = this.carouselService.items().length;
                    successor ? position += +settings.slideBy : position -= +settings.slideBy;
                }
                return position;
            };
        /**
           * Slides to the next item or page.
           * @param speed The time in milliseconds for the transition.
           */
        /**
         * Slides to the next item or page.
         * @param {?} speed The time in milliseconds for the transition.
         * @return {?}
         */
        NavigationService.prototype.next = /**
         * Slides to the next item or page.
         * @param {?} speed The time in milliseconds for the transition.
         * @return {?}
         */
            function (speed) {
                this.carouselService.to(this._getPosition(true), speed);
            };
        /**
         * Slides to the previous item or page.
         * @param speed The time in milliseconds for the transition.
         */
        /**
         * Slides to the previous item or page.
         * @param {?} speed The time in milliseconds for the transition.
         * @return {?}
         */
        NavigationService.prototype.prev = /**
         * Slides to the previous item or page.
         * @param {?} speed The time in milliseconds for the transition.
         * @return {?}
         */
            function (speed) {
                this.carouselService.to(this._getPosition(false), speed);
            };
        /**
         * Slides to the specified item or page.
         * @param position - The position of the item or page.
         * @param speed - The time in milliseconds for the transition.
         * @param standard - Whether to use the standard behaviour or not. Default meaning false
         */
        /**
         * Slides to the specified item or page.
         * @param {?} position - The position of the item or page.
         * @param {?} speed - The time in milliseconds for the transition.
         * @param {?=} standard - Whether to use the standard behaviour or not. Default meaning false
         * @return {?}
         */
        NavigationService.prototype.to = /**
         * Slides to the specified item or page.
         * @param {?} position - The position of the item or page.
         * @param {?} speed - The time in milliseconds for the transition.
         * @param {?=} standard - Whether to use the standard behaviour or not. Default meaning false
         * @return {?}
         */
            function (position, speed, standard) {
                /** @type {?} */
                var length;
                if (!standard && this._pages.length) {
                    length = this._pages.length;
                    this.carouselService.to(this._pages[((position % length) + length) % length].start, speed);
                }
                else {
                    this.carouselService.to(position, speed);
                }
            };
        /**
         * Moves carousel after user's clicking on any dots
         */
        /**
         * Moves carousel after user's clicking on any dots
         * @param {?} dotId
         * @return {?}
         */
        NavigationService.prototype.moveByDot = /**
         * Moves carousel after user's clicking on any dots
         * @param {?} dotId
         * @return {?}
         */
            function (dotId) {
                /** @type {?} */
                var index = this._dotsData.dots.findIndex(function (dot) { return dotId === dot.id; });
                this.to(index, this.carouselService.settings.dotsSpeed);
            };
        /**
         * rewinds carousel to slide with needed id
         * @param id id of slide
         */
        /**
         * rewinds carousel to slide with needed id
         * @param {?} id id of slide
         * @return {?}
         */
        NavigationService.prototype.toSlideById = /**
         * rewinds carousel to slide with needed id
         * @param {?} id id of slide
         * @return {?}
         */
            function (id) {
                /** @type {?} */
                var position = this.carouselService.slidesData.findIndex(function (slide) { return slide.id === id && slide.isCloned === false; });
                if (position === -1 || position === this.carouselService.current()) {
                    return;
                }
                this.carouselService.to(this.carouselService.relative(position), false);
            };
        NavigationService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NavigationService.ctorParameters = function () {
            return [
                { type: CarouselService }
            ];
        };
        return NavigationService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * Create a new injection token for injecting the window into a component.
      @type {?} */
    var WINDOW = new core.InjectionToken('WindowToken');
    /**
     * Define abstract class for obtaining reference to the global window object.
     * @abstract
     */
    var /**
     * Define abstract class for obtaining reference to the global window object.
     * @abstract
     */ WindowRef = (function () {
        function WindowRef() {
        }
        Object.defineProperty(WindowRef.prototype, "nativeWindow", {
            get: /**
             * @return {?}
             */ function () {
                throw new Error('Not implemented.');
            },
            enumerable: true,
            configurable: true
        });
        return WindowRef;
    }());
    /**
     * Define class that implements the abstract class and returns the native window object.
     */
    var /**
     * Define class that implements the abstract class and returns the native window object.
     */ BrowserWindowRef = (function (_super) {
        __extends(BrowserWindowRef, _super);
        function BrowserWindowRef() {
            return _super.call(this) || this;
        }
        Object.defineProperty(BrowserWindowRef.prototype, "nativeWindow", {
            /**
             * @returns window object
             */
            get: /**
             * @return {?} window object
             */ function () {
                return window;
            },
            enumerable: true,
            configurable: true
        });
        return BrowserWindowRef;
    }(WindowRef));
    /**
     * Create an factory function that returns the native window object.
     * @param {?} browserWindowRef Native window object
     * @param {?} platformId id of platform
     * @return {?} type of platform of empty object
     */
    function windowFactory(browserWindowRef, platformId) {
        if (common.isPlatformBrowser(platformId)) {
            return browserWindowRef.nativeWindow;
        }
        return new Object();
    }
    /** *
     * Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class.
      @type {?} */
    var browserWindowProvider = {
        provide: WindowRef,
        useClass: BrowserWindowRef
    };
    /** *
     * Create an injectable provider that uses the windowFactory function for returning the native window object.
      @type {?} */
    var windowProvider = {
        provide: WINDOW,
        useFactory: windowFactory,
        deps: [WindowRef, core.PLATFORM_ID]
    };
    /** *
     * Create an array of providers.
      @type {?} */
    var WINDOW_PROVIDERS = [browserWindowProvider, windowProvider];

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** *
     * Create a new injection token for injecting the Document into a component.
      @type {?} */
    var DOCUMENT = new core.InjectionToken('DocumentToken');
    /**
     * Define abstract class for obtaining reference to the global Document object.
     * @abstract
     */
    var /**
     * Define abstract class for obtaining reference to the global Document object.
     * @abstract
     */ DocumentRef = (function () {
        function DocumentRef() {
        }
        Object.defineProperty(DocumentRef.prototype, "nativeDocument", {
            get: /**
             * @return {?}
             */ function () {
                throw new Error('Not implemented.');
            },
            enumerable: true,
            configurable: true
        });
        return DocumentRef;
    }());
    /**
     * Define class that implements the abstract class and returns the native Document object.
     */
    var /**
     * Define class that implements the abstract class and returns the native Document object.
     */ BrowserDocumentRef = (function (_super) {
        __extends(BrowserDocumentRef, _super);
        function BrowserDocumentRef() {
            return _super.call(this) || this;
        }
        Object.defineProperty(BrowserDocumentRef.prototype, "nativeDocument", {
            /**
             * @returns Document object
             */
            get: /**
             * @return {?} Document object
             */ function () {
                return document;
            },
            enumerable: true,
            configurable: true
        });
        return BrowserDocumentRef;
    }(DocumentRef));
    /**
     * Create an factory function that returns the native Document object.
     * @param {?} browserDocumentRef Native Document object
     * @param {?} platformId id of platform
     * @return {?} type of platform of empty object
     */
    function documentFactory(browserDocumentRef, platformId) {
        if (common.isPlatformBrowser(platformId)) {
            return browserDocumentRef.nativeDocument;
        }
        return new Object();
    }
    /** *
     * Create a injectable provider for the DocumentRef token that uses the BrowserDocumentRef class.
      @type {?} */
    var browserDocumentProvider = {
        provide: DocumentRef,
        useClass: BrowserDocumentRef
    };
    /** *
     * Create an injectable provider that uses the DocumentFactory function for returning the native Document object.
      @type {?} */
    var documentProvider = {
        provide: DOCUMENT,
        useFactory: documentFactory,
        deps: [DocumentRef, core.PLATFORM_ID]
    };
    /** *
     * Create an array of providers.
      @type {?} */
    var DOCUMENT_PROVIDERS = [browserDocumentProvider, documentProvider];

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AutoplayService = (function () {
        function AutoplayService(carouselService, winRef, docRef) {
            this.carouselService = carouselService;
            /**
             * The autoplay timeout.
             */
            this._timeout = null;
            /**
             * Indicates whenever the autoplay is paused.
             */
            this._paused = false;
            this.winRef = /** @type {?} */ (winRef);
            this.docRef = /** @type {?} */ (docRef);
            this.spyDataStreams();
        }
        /**
         * @return {?}
         */
        AutoplayService.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.autoplaySubscription.unsubscribe();
            };
        /**
         * Defines Observables which service must observe
         */
        /**
         * Defines Observables which service must observe
         * @return {?}
         */
        AutoplayService.prototype.spyDataStreams = /**
         * Defines Observables which service must observe
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var initializedCarousel$ = this.carouselService.getInitializedState().pipe(operators.tap(function () {
                    if (_this.carouselService.settings.autoplay) {
                        _this.play();
                    }
                }));
                /** @type {?} */
                var changedSettings$ = this.carouselService.getChangedState().pipe(operators.tap(function (data) {
                    _this._handleChangeObservable(data);
                }));
                /** @type {?} */
                var autoplayMerge$ = merge.merge(initializedCarousel$, changedSettings$);
                this.autoplaySubscription = autoplayMerge$.subscribe(function () { });
            };
        /**
           * Starts the autoplay.
           * @param timeout The interval before the next animation starts.
           * @param speed The animation speed for the animations.
           */
        /**
         * Starts the autoplay.
         * @param {?=} timeout The interval before the next animation starts.
         * @param {?=} speed The animation speed for the animations.
         * @return {?}
         */
        AutoplayService.prototype.play = /**
         * Starts the autoplay.
         * @param {?=} timeout The interval before the next animation starts.
         * @param {?=} speed The animation speed for the animations.
         * @return {?}
         */
            function (timeout, speed) {
                if (this._paused) {
                    this._paused = false;
                    this._setAutoPlayInterval();
                }
                if (this.carouselService.is('rotating')) {
                    return;
                }
                this.carouselService.enter('rotating');
                this._setAutoPlayInterval();
            };
        /**
         * Gets a new timeout
         * @param {?=} timeout - The interval before the next animation starts.
         * @param {?=} speed - The animation speed for the animations.
         * @return {?}
         */
        AutoplayService.prototype._getNextTimeout = /**
         * Gets a new timeout
         * @param {?=} timeout - The interval before the next animation starts.
         * @param {?=} speed - The animation speed for the animations.
         * @return {?}
         */
            function (timeout, speed) {
                var _this = this;
                if (this._timeout) {
                    this.winRef.clearTimeout(this._timeout);
                }
                return this.winRef.setTimeout(function () {
                    if (_this._paused || _this.carouselService.is('busy') || _this.carouselService.is('interacting') || _this.docRef.hidden) {
                        return;
                    }
                    _this.carouselService.next(speed || _this.carouselService.settings.autoplaySpeed);
                }, timeout || this.carouselService.settings.autoplayTimeout);
            };
        /**
         * Sets autoplay in motion.
         * @return {?}
         */
        AutoplayService.prototype._setAutoPlayInterval = /**
         * Sets autoplay in motion.
         * @return {?}
         */
            function () {
                this._timeout = this._getNextTimeout();
            };
        /**
         * Stops the autoplay.
         */
        /**
         * Stops the autoplay.
         * @return {?}
         */
        AutoplayService.prototype.stop = /**
         * Stops the autoplay.
         * @return {?}
         */
            function () {
                if (!this.carouselService.is('rotating')) {
                    return;
                }
                this.winRef.clearTimeout(this._timeout);
                this.carouselService.leave('rotating');
            };
        /**
           * Stops the autoplay.
           */
        /**
         * Stops the autoplay.
         * @return {?}
         */
        AutoplayService.prototype.pause = /**
         * Stops the autoplay.
         * @return {?}
         */
            function () {
                if (!this.carouselService.is('rotating')) {
                    return;
                }
                this._paused = true;
            };
        /**
         * Manages by autoplaying according to data passed by _changedSettingsCarousel$ Obsarvable
         * @param {?} data object with current position of carousel and type of change
         * @return {?}
         */
        AutoplayService.prototype._handleChangeObservable = /**
         * Manages by autoplaying according to data passed by _changedSettingsCarousel$ Obsarvable
         * @param {?} data object with current position of carousel and type of change
         * @return {?}
         */
            function (data) {
                if (data.property.name === 'settings') {
                    if (this.carouselService.settings.autoplay) {
                        this.play();
                    }
                    else {
                        this.stop();
                    }
                }
                else if (data.property.name === 'position') {
                    //console.log('play?', e);
                    if (this.carouselService.settings.autoplay) {
                        this._setAutoPlayInterval();
                    }
                }
            };
        /**
         * Starts pausing
         */
        /**
         * Starts pausing
         * @return {?}
         */
        AutoplayService.prototype.startPausing = /**
         * Starts pausing
         * @return {?}
         */
            function () {
                if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is('rotating')) {
                    this.pause();
                }
            };
        /**
         * Starts playing after mouse leaves carousel
         */
        /**
         * Starts playing after mouse leaves carousel
         * @return {?}
         */
        AutoplayService.prototype.startPlayingMouseLeave = /**
         * Starts playing after mouse leaves carousel
         * @return {?}
         */
            function () {
                if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is('rotating')) {
                    this.pause();
                }
            };
        /**
         * Starts playing after touch ends
         */
        /**
         * Starts playing after touch ends
         * @return {?}
         */
        AutoplayService.prototype.startPlayingTouchEnd = /**
         * Starts playing after touch ends
         * @return {?}
         */
            function () {
                if (this.carouselService.settings.autoplayHoverPause && this.carouselService.is('rotating')) {
                    this.pause();
                }
            };
        AutoplayService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        AutoplayService.ctorParameters = function () {
            return [
                { type: CarouselService },
                { type: undefined, decorators: [{ type: core.Inject, args: [WINDOW,] }] },
                { type: undefined, decorators: [{ type: core.Inject, args: [DOCUMENT,] }] }
            ];
        };
        return AutoplayService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LazyLoadService = (function () {
        function LazyLoadService(carouselService) {
            this.carouselService = carouselService;
            this.spyDataStreams();
        }
        /**
         * @return {?}
         */
        LazyLoadService.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.lazyLoadSubscription.unsubscribe();
            };
        /**
         * Defines Observables which service must observe
         */
        /**
         * Defines Observables which service must observe
         * @return {?}
         */
        LazyLoadService.prototype.spyDataStreams = /**
         * Defines Observables which service must observe
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var initializedCarousel$ = this.carouselService.getInitializedState().pipe(operators.tap(function () {
                    /** @type {?} */
                    var isLazyLoad = _this.carouselService.settings && !_this.carouselService.settings.lazyLoad;
                    _this.carouselService.slidesData.forEach(function (item) { return item.load = isLazyLoad ? true : false; });
                }));
                /** @type {?} */
                var changeSettings$ = this.carouselService.getChangeState();
                /** @type {?} */
                var resizedCarousel$ = this.carouselService.getResizedState();
                /** @type {?} */
                var lazyLoadMerge$ = merge.merge(initializedCarousel$, changeSettings$, resizedCarousel$).pipe(operators.tap(function (data) { return _this._defineLazyLoadSlides(data); }));
                this.lazyLoadSubscription = lazyLoadMerge$.subscribe(function () { });
            };
        /**
         * @param {?} data
         * @return {?}
         */
        LazyLoadService.prototype._defineLazyLoadSlides = /**
         * @param {?} data
         * @return {?}
         */
            function (data) {
                var _this = this;
                if (!this.carouselService.settings || !this.carouselService.settings.lazyLoad) {
                    return;
                }
                if ((data.property && data.property.name === 'position') || data === 'initialized' || data === "resized") {
                    /** @type {?} */
                    var settings = this.carouselService.settings;
                    /** @type {?} */
                    var clones = this.carouselService.clones().length;
                    /** @type {?} */
                    var n = (settings.center && Math.ceil(settings.items / 2) || settings.items);
                    /** @type {?} */
                    var i = ((settings.center && n * -1) || 0);
                    /** @type {?} */
                    var position = (data.property && data.property.value !== undefined ? data.property.value : this.carouselService.current()) + i;
                    // load = $.proxy(function(i, v) { this.load(v) }, this);
                    //TODO: Need documentation for this new option
                    if (settings.lazyLoadEager > 0) {
                        n += settings.lazyLoadEager;
                        // If the carousel is looping also preload images that are to the "left"
                        if (settings.loop) {
                            position -= settings.lazyLoadEager;
                            n++;
                        }
                    }
                    while (i++ < n) {
                        this._load(clones / 2 + this.carouselService.relative(position));
                        if (clones) {
                            this.carouselService.clones(this.carouselService.relative(position)).forEach(function (value) { return _this._load(value); });
                        }
                        position++;
                    }
                }
            };
        /**
         * Loads all resources of an item at the specified position.
         * @param {?} position - The absolute position of the item.
         * @return {?}
         */
        LazyLoadService.prototype._load = /**
         * Loads all resources of an item at the specified position.
         * @param {?} position - The absolute position of the item.
         * @return {?}
         */
            function (position) {
                if (this.carouselService.slidesData[position].load) {
                    return;
                }
                this.carouselService.slidesData[position].load = true;
            };
        LazyLoadService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        LazyLoadService.ctorParameters = function () {
            return [
                { type: CarouselService }
            ];
        };
        return LazyLoadService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AnimateService = (function () {
        function AnimateService(carouselService) {
            this.carouselService = carouselService;
            /**
             * s
             */
            this.swapping = true;
            /**
             * active slide before translating
             */
            this.previous = undefined;
            /**
             * new active slide after translating
             */
            this.next = undefined;
            this.spyDataStreams();
        }
        /**
         * @return {?}
         */
        AnimateService.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.animateSubscription.unsubscribe();
            };
        /**
         * Defines Observables which service must observe
         */
        /**
         * Defines Observables which service must observe
         * @return {?}
         */
        AnimateService.prototype.spyDataStreams = /**
         * Defines Observables which service must observe
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var changeSettings$ = this.carouselService.getChangeState().pipe(operators.tap(function (data) {
                    if (data.property.name === 'position') {
                        _this.previous = _this.carouselService.current();
                        _this.next = data.property.value;
                    }
                }));
                /** @type {?} */
                var dragCarousel$ = this.carouselService.getDragState();
                /** @type {?} */
                var draggedCarousel$ = this.carouselService.getDraggedState();
                /** @type {?} */
                var translatedCarousel$ = this.carouselService.getTranslatedState();
                /** @type {?} */
                var dragTranslatedMerge$ = merge.merge(dragCarousel$, draggedCarousel$, translatedCarousel$).pipe(operators.tap(function (data) { return _this.swapping = data === 'translated'; }));
                /** @type {?} */
                var translateCarousel$ = this.carouselService.getTranslateState().pipe(operators.tap(function (data) {
                    if (_this.swapping && (_this.carouselService._options.animateOut || _this.carouselService._options.animateIn)) {
                        _this._swap();
                    }
                }));
                /** @type {?} */
                var animateMerge$ = merge.merge(changeSettings$, translateCarousel$, dragTranslatedMerge$).pipe();
                this.animateSubscription = animateMerge$.subscribe(function () { });
            };
        /**
         * Toggles the animation classes whenever an translations starts.
         * @return {?}
         */
        AnimateService.prototype._swap = /**
         * Toggles the animation classes whenever an translations starts.
         * @return {?}
         */
            function () {
                if (this.carouselService.settings.items !== 1) {
                    return;
                }
                // if (!$.support.animation || !$.support.transition) {
                // 	return;
                // }
                this.carouselService.speed(0);
                /** @type {?} */
                var left;
                /** @type {?} */
                var previous = this.carouselService.slidesData[this.previous];
                /** @type {?} */
                var next = this.carouselService.slidesData[this.next];
                /** @type {?} */
                var incoming = this.carouselService.settings.animateIn;
                /** @type {?} */
                var outgoing = this.carouselService.settings.animateOut;
                if (this.carouselService.current() === this.previous) {
                    return;
                }
                if (outgoing) {
                    left = +this.carouselService.coordinates(this.previous) - +this.carouselService.coordinates(this.next);
                    this.carouselService.slidesData.forEach(function (slide) {
                        if (slide.id === previous.id) {
                            slide.left = left + "px";
                            slide.isAnimated = true;
                            slide.isDefAnimatedOut = true;
                            slide.isCustomAnimatedOut = true;
                        }
                    });
                }
                if (incoming) {
                    this.carouselService.slidesData.forEach(function (slide) {
                        if (slide.id === next.id) {
                            slide.isAnimated = true;
                            slide.isDefAnimatedIn = true;
                            slide.isCustomAnimatedIn = true;
                        }
                    });
                }
            };
        /**
         * Handles the end of 'animationend' event
         * @param id Id of slides
         */
        /**
         * Handles the end of 'animationend' event
         * @param {?} id Id of slides
         * @return {?}
         */
        AnimateService.prototype.clear = /**
         * Handles the end of 'animationend' event
         * @param {?} id Id of slides
         * @return {?}
         */
            function (id) {
                var _this = this;
                this.carouselService.slidesData.forEach(function (slide) {
                    if (slide.id === id) {
                        slide.left = '';
                        slide.isAnimated = false;
                        slide.isDefAnimatedOut = false;
                        slide.isCustomAnimatedOut = false;
                        slide.isDefAnimatedIn = false;
                        slide.isCustomAnimatedIn = false;
                        slide.classes = _this.carouselService.setCurSlideClasses(slide);
                    }
                });
                this.carouselService.onTransitionEnd();
            };
        AnimateService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        AnimateService.ctorParameters = function () {
            return [
                { type: CarouselService }
            ];
        };
        return AnimateService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AutoHeightService = (function () {
        function AutoHeightService(carouselService) {
            this.carouselService = carouselService;
            this.spyDataStreams();
        }
        /**
         * @return {?}
         */
        AutoHeightService.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.autoHeightSubscription.unsubscribe();
            };
        /**
         * Defines Observables which service must observe
         */
        /**
         * Defines Observables which service must observe
         * @return {?}
         */
        AutoHeightService.prototype.spyDataStreams = /**
         * Defines Observables which service must observe
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var initializedCarousel$ = this.carouselService.getInitializedState().pipe(operators.tap(function (data) {
                    if (_this.carouselService.settings.autoHeight) {
                        _this.update();
                    }
                    else {
                        _this.carouselService.slidesData.forEach(function (slide) { return slide.heightState = 'full'; });
                    }
                }));
                /** @type {?} */
                var changedSettings$ = this.carouselService.getChangedState().pipe(operators.tap(function (data) {
                    if (_this.carouselService.settings.autoHeight && data.property.name === 'position') {
                        _this.update();
                    }
                }));
                /** @type {?} */
                var refreshedCarousel$ = this.carouselService.getRefreshedState().pipe(operators.tap(function (data) {
                    if (_this.carouselService.settings.autoHeight) {
                        _this.update();
                    }
                }));
                /** @type {?} */
                var autoHeight$ = merge.merge(initializedCarousel$, changedSettings$, refreshedCarousel$);
                this.autoHeightSubscription = autoHeight$.subscribe(function () { });
            };
        /**
         * Updates the prop 'heightState' of slides
         */
        /**
         * Updates the prop 'heightState' of slides
         * @return {?}
         */
        AutoHeightService.prototype.update = /**
         * Updates the prop 'heightState' of slides
         * @return {?}
         */
            function () {
                /** @type {?} */
                var items = this.carouselService.settings.items;
                /** @type {?} */
                var start = this.carouselService.current();
                /** @type {?} */
                var end = start + items;
                if (this.carouselService.settings.center) {
                    start = items % 2 === 1 ? start - (items - 1) / 2 : start - items / 2;
                    end = items % 2 === 1 ? start + items : start + items + 1;
                }
                this.carouselService.slidesData.forEach(function (slide, i) {
                    slide.heightState = (i >= start && i < end) ? 'full' : 'nulled';
                });
            };
        AutoHeightService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        AutoHeightService.ctorParameters = function () {
            return [
                { type: CarouselService }
            ];
        };
        return AutoHeightService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var HashService = (function () {
        function HashService(carouselService) {
            this.carouselService = carouselService;
            this.spyDataStreams();
        }
        /**
         * @return {?}
         */
        HashService.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.hashSubscription.unsubscribe();
            };
        /**
         * Defines Observables which service must observe
         */
        /**
         * Defines Observables which service must observe
         * @return {?}
         */
        HashService.prototype.spyDataStreams = /**
         * Defines Observables which service must observe
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var initializedCarousel$ = this.carouselService.getInitializedState();
                /** @type {?} */
                var changedSettings$ = this.carouselService.getChangedState().pipe(operators.tap(function (data) {
                    if (_this.carouselService.settings.URLhashListener && data.property.name === 'position') {
                        /** @type {?} */
                        var newCurSlide = _this.carouselService.current();
                        /** @type {?} */
                        var newCurFragment = _this.carouselService.slidesData[newCurSlide].hashFragment;
                        if (!newCurFragment || newCurFragment === _this.currentHashFragment) {
                            return;
                        }
                    }
                }));
                /** @type {?} */
                var hashFragment$ = merge.merge(initializedCarousel$, changedSettings$);
                this.hashSubscription = hashFragment$.subscribe(function () { });
            };
        /**
         * rewinds carousel to slide which has the same hashFragment as fragment of current url
         * @param fragment fragment of url
         */
        /**
         * rewinds carousel to slide which has the same hashFragment as fragment of current url
         * @param {?} fragment fragment of url
         * @return {?}
         */
        HashService.prototype.rewind = /**
         * rewinds carousel to slide which has the same hashFragment as fragment of current url
         * @param {?} fragment fragment of url
         * @return {?}
         */
            function (fragment) {
                /** @type {?} */
                var position = this.carouselService.slidesData.findIndex(function (slide) { return slide.hashFragment === fragment && slide.isCloned === false; });
                if (position === -1 || position === this.carouselService.current()) {
                    return;
                }
                this.carouselService.to(this.carouselService.relative(position), false);
            };
        HashService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        HashService.ctorParameters = function () {
            return [
                { type: CarouselService }
            ];
        };
        return HashService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var nextId = 0;
    var CarouselSlideDirective = (function () {
        function CarouselSlideDirective(tplRef) {
            this.tplRef = tplRef;
            /**
             * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
             * Will be auto-generated if not provided.
             */
            this.id = "owl-slide-" + nextId++;
            /**
             * Defines how much widths of common slide will current slide have
             * e.g. if _mergeData=2, the slide will twice wider then slides with _mergeData=1
             */
            this._dataMerge = 1;
            /**
             * Width of slide
             */
            this.width = 0;
            /**
             * Inner content of dot for certain slide; can be html-markup
             */
            this.dotContent = '';
            /**
             * Hash (fragment) of url which corresponds to certain slide
             */
            this.dataHash = '';
        }
        Object.defineProperty(CarouselSlideDirective.prototype, "dataMerge", {
            get: /**
             * @return {?}
             */ function () {
                return this._dataMerge;
            },
            set: /**
             * @param {?} data
             * @return {?}
             */ function (data) {
                this._dataMerge = this.isNumeric(data) ? data : 1;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Determines if the input is a Number or something that can be coerced to a Number
         * @param - The input to be tested
         * @returns - An indication if the input is a Number or can be coerced to a Number
         */
        /**
         * Determines if the input is a Number or something that can be coerced to a Number
         * @param {?} number
         * @return {?} - An indication if the input is a Number or can be coerced to a Number
         */
        CarouselSlideDirective.prototype.isNumeric = /**
         * Determines if the input is a Number or something that can be coerced to a Number
         * @param {?} number
         * @return {?} - An indication if the input is a Number or can be coerced to a Number
         */
            function (number) {
                return !isNaN(parseFloat(number));
            };
        CarouselSlideDirective.decorators = [
            { type: core.Directive, args: [{ selector: 'ng-template[carouselSlide]' },] }
        ];
        /** @nocollapse */
        CarouselSlideDirective.ctorParameters = function () {
            return [
                { type: core.TemplateRef }
            ];
        };
        CarouselSlideDirective.propDecorators = {
            id: [{ type: core.Input }],
            dataMerge: [{ type: core.Input }],
            width: [{ type: core.Input }],
            dotContent: [{ type: core.Input }],
            dataHash: [{ type: core.Input }]
        };
        return CarouselSlideDirective;
    }());
    /**
     * Data which will be passed out after ending of transition of carousel
     */
    var /**
     * Data which will be passed out after ending of transition of carousel
     */ SlidesOutputData = (function () {
        function SlidesOutputData() {
        }
        return SlidesOutputData;
    }());
    var CarouselComponent = (function () {
        function CarouselComponent(el, resizeService, carouselService, navigationService, autoplayService, lazyLoadService, animateService, autoHeightService, hashService) {
            // empty
            this.el = el;
            this.resizeService = resizeService;
            this.carouselService = carouselService;
            this.navigationService = navigationService;
            this.autoplayService = autoplayService;
            this.lazyLoadService = lazyLoadService;
            this.animateService = animateService;
            this.autoHeightService = autoHeightService;
            this.hashService = hashService;
            this.translated = new core.EventEmitter();
            /**
             * Shows whether carousel is loaded of not.
             */
            this.carouselLoaded = false;
        }
        /**
         * @return {?}
         */
        CarouselComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.spyDataStreams();
                this.carouselWindowWidth = this.el.nativeElement.querySelector('.owl-carousel').clientWidth;
            };
        /**
         * @return {?}
         */
        CarouselComponent.prototype.ngAfterContentChecked = /**
         * @return {?}
         */
            function () {
            };
        // ngAfterContentChecked() END
        /**
         * @return {?}
         */
        CarouselComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
            function () {
                this.carouselService.setup(this.carouselWindowWidth, this.slides.toArray(), this.options);
                this.carouselService.initialize(this.slides.toArray());
                this._winResizeWatcher();
            };
        /**
         * @return {?}
         */
        CarouselComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                if (this.resizeSubscription) {
                    this.resizeSubscription.unsubscribe();
                }
                this._allObservSubscription.unsubscribe();
            };
        /**
         * Joins the observable login in one place: sets values to some observables, merges this observables and
         * subcribes to merge func
         */
        /**
         * Joins the observable login in one place: sets values to some observables, merges this observables and
         * subcribes to merge func
         * @return {?}
         */
        CarouselComponent.prototype.spyDataStreams = /**
         * Joins the observable login in one place: sets values to some observables, merges this observables and
         * subcribes to merge func
         * @return {?}
         */
            function () {
                var _this = this;
                this._viewCurSettings$ = this.carouselService.getViewCurSettings().pipe(operators.tap(function (data) {
                    _this.owlDOMData = data.owlDOMData;
                    _this.stageData = data.stageData;
                    _this.slidesData = data.slidesData;
                    if (!_this.carouselLoaded) {
                        _this.carouselLoaded = true;
                    }
                    _this.navData = data.navData;
                    _this.dotsData = data.dotsData;
                }));
                this._translatedCarousel$ = this.carouselService.getTranslatedState().pipe(operators.tap(function () {
                    _this.gatherTranslatedData();
                    _this.translated.emit(_this.slidesOutputData);
                    _this.slidesOutputData = {};
                }));
                this._carouselMerge$ = merge.merge(this._viewCurSettings$, this._translatedCarousel$);
                this._allObservSubscription = this._carouselMerge$.subscribe(function () {
                });
            };
        /**
         * Init subscription to resize event and attaches handler for this event
         * @return {?}
         */
        CarouselComponent.prototype._winResizeWatcher = /**
         * Init subscription to resize event and attaches handler for this event
         * @return {?}
         */
            function () {
                var _this = this;
                if (Object.keys(this.carouselService._options.responsive).length) {
                    this.resizeSubscription = this.resizeService.onResize$
                        .pipe(operators.filter(function () { return _this.carouselWindowWidth !== _this.el.nativeElement.querySelector('.owl-carousel').clientWidth; }), operators.delay(this.carouselService.settings.responsiveRefreshRate))
                        .subscribe(function () {
                        _this.carouselService.onResize(_this.el.nativeElement.querySelector('.owl-carousel').clientWidth);
                        _this.carouselWindowWidth = _this.el.nativeElement.querySelector('.owl-carousel').clientWidth;
                    });
                }
            };
        /**
         * Handler for transitioend event
         */
        /**
         * Handler for transitioend event
         * @return {?}
         */
        CarouselComponent.prototype.onTransitionEnd = /**
         * Handler for transitioend event
         * @return {?}
         */
            function () {
                this.carouselService.onTransitionEnd();
            };
        /**
         * Handler for click event, attached to next button
         */
        /**
         * Handler for click event, attached to next button
         * @return {?}
         */
        CarouselComponent.prototype.next = /**
         * Handler for click event, attached to next button
         * @return {?}
         */
            function () {
                this.navigationService.next(this.carouselService.settings.navSpeed);
            };
        /**
         * Handler for click event, attached to prev button
         */
        /**
         * Handler for click event, attached to prev button
         * @return {?}
         */
        CarouselComponent.prototype.prev = /**
         * Handler for click event, attached to prev button
         * @return {?}
         */
            function () {
                this.navigationService.prev(this.carouselService.settings.navSpeed);
            };
        /**
         * Handler for click event, attached to dots
         */
        /**
         * Handler for click event, attached to dots
         * @param {?} dotId
         * @return {?}
         */
        CarouselComponent.prototype.moveByDot = /**
         * Handler for click event, attached to dots
         * @param {?} dotId
         * @return {?}
         */
            function (dotId) {
                this.navigationService.moveByDot(dotId);
            };
        /**
         * rewinds carousel to slide with needed id
         * @param id fragment of url
         */
        /**
         * rewinds carousel to slide with needed id
         * @param {?} id fragment of url
         * @return {?}
         */
        CarouselComponent.prototype.to = /**
         * rewinds carousel to slide with needed id
         * @param {?} id fragment of url
         * @return {?}
         */
            function (id) {
                this.navigationService.toSlideById(id);
            };
        /**
         * Gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
         */
        /**
         * Gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
         * @return {?}
         */
        CarouselComponent.prototype.gatherTranslatedData = /**
         * Gathers and prepares data intended for passing to the user by means of firing event translatedCarousel
         * @return {?}
         */
            function () {
                /** @type {?} */
                var startPosition;
                /** @type {?} */
                var clonedIdPrefix = this.carouselService.clonedIdPrefix;
                /** @type {?} */
                var activeSlides = this.slidesData
                    .filter(function (slide) { return slide.isActive === true; })
                    .map(function (slide) {
                    /** @type {?} */
                    var id = slide.id.indexOf(clonedIdPrefix) >= 0 ? slide.id.slice(clonedIdPrefix.length) : slide.id;
                    return {
                        id: id,
                        width: slide.width,
                        marginL: slide.marginL,
                        marginR: slide.marginR,
                        center: slide.isCentered
                    };
                });
                startPosition = this.carouselService.relative(this.carouselService.current());
                this.slidesOutputData = {
                    startPosition: startPosition,
                    slides: activeSlides
                };
            };
        /**
         * Starts pausing
         */
        /**
         * Starts pausing
         * @return {?}
         */
        CarouselComponent.prototype.startPausing = /**
         * Starts pausing
         * @return {?}
         */
            function () {
                this.autoplayService.startPausing();
            };
        /**
         * Starts playing after mouse leaves carousel
         */
        /**
         * Starts playing after mouse leaves carousel
         * @return {?}
         */
        CarouselComponent.prototype.startPlayML = /**
         * Starts playing after mouse leaves carousel
         * @return {?}
         */
            function () {
                this.autoplayService.startPlayingMouseLeave();
            };
        /**
         * Starts playing after touch ends
         */
        /**
         * Starts playing after touch ends
         * @return {?}
         */
        CarouselComponent.prototype.startPlayTE = /**
         * Starts playing after touch ends
         * @return {?}
         */
            function () {
                this.autoplayService.startPlayingTouchEnd();
            };
        CarouselComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'owl-carousel-o',
                        template: "\n    <div class=\"owl-carousel owl-theme\" #owlCarousel\n         [ngClass]=\"{'owl-rtl': owlDOMData?.rtl,\n                  'owl-loaded': owlDOMData?.isLoaded,\n                  'owl-responsive': owlDOMData?.isResponsive,\n                  'owl-drag': owlDOMData?.isMouseDragable,\n                  'owl-grab': owlDOMData?.isGrab}\"\n         (mouseover)=\"startPausing()\"\n         (mouseleave)=\"startPlayML()\"\n         (touchstart)=\"startPausing()\"\n         (touchend)=\"startPlayTE()\">\n\n      <div *ngIf=\"carouselLoaded\" class=\"owl-stage-outer\">\n        <owl-stage\n          [owlDraggable]=\"{'isMouseDragable': owlDOMData?.isMouseDragable, 'isTouchDragable': owlDOMData?.isTouchDragable}\"\n          [stageData]=\"stageData\"\n          [slidesData]=\"slidesData\"></owl-stage>\n      </div> <!-- /.owl-stage-outer -->\n      <div class=\"owl-nav\" [ngClass]=\"{'disabled': navData?.disabled}\">\n        <div class=\"owl-prev\" [ngClass]=\"{'disabled': navData?.prev?.disabled}\" (click)=\"prev()\"\n             [innerHTML]=\"navData?.prev?.htmlText\"></div>\n        <div class=\"owl-next\" [ngClass]=\"{'disabled': navData?.next?.disabled}\" (click)=\"next()\"\n             [innerHTML]=\"navData?.next?.htmlText\"></div>\n      </div> <!-- /.owl-nav -->\n      <div class=\"owl-dots\" [ngClass]=\"{'disabled': dotsData?.disabled}\">\n        <div *ngFor=\"let dot of dotsData?.dots\" class=\"owl-dot\"\n             [ngClass]=\"{'active': dot.active, 'owl-dot-text': dot.showInnerContent}\" (click)=\"moveByDot(dot.id)\">\n          <span [innerHTML]=\"dot.innerContent\"></span>\n        </div>\n      </div> <!-- /.owl-dots -->\n    </div> <!-- /.owl-carousel owl-loaded -->\n  ",
                        providers: [
                            NavigationService,
                            AutoplayService,
                            CarouselService,
                            LazyLoadService,
                            AnimateService,
                            AutoHeightService,
                            HashService
                        ],
                        styles: [".owl-theme {\n      display: block;\n  }"]
                    }] }
        ];
        /** @nocollapse */
        CarouselComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: ResizeService },
                { type: CarouselService },
                { type: NavigationService },
                { type: AutoplayService },
                { type: LazyLoadService },
                { type: AnimateService },
                { type: AutoHeightService },
                { type: HashService }
            ];
        };
        CarouselComponent.propDecorators = {
            slides: [{ type: core.ContentChildren, args: [CarouselSlideDirective,] }],
            translated: [{ type: core.Output }],
            options: [{ type: core.Input }]
        };
        return CarouselComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var StageComponent = (function () {
        function StageComponent(zone, el, renderer, carouselService, animateService) {
            var _this = this;
            this.zone = zone;
            this.el = el;
            this.renderer = renderer;
            this.carouselService = carouselService;
            this.animateService = animateService;
            /**
             * Object with data needed for dragging
             */
            this._drag = {
                time: null,
                target: null,
                pointer: null,
                stage: {
                    start: null,
                    current: null
                },
                direction: null,
                active: false,
                moving: false
            };
            /**
             * Subject for notification when the carousel's rebuilding caused by resize event starts
             */
            this._oneDragMove$ = new rxjs.Subject();
            /**
             * Passes this to _oneMouseTouchMove();
             */
            this.bindOneMouseTouchMove = function (ev) {
                _this._oneMouseTouchMove(ev);
            };
            /**
             * Passes this to _onDragMove();
             */
            this.bindOnDragMove = function (ev) {
                _this._onDragMove(ev);
            };
            /**
             * Passes this to _onDragMove();
             */
            this.bindOnDragEnd = function (ev) {
                // this.zone.run(() => {
                // this.zone.run(() => {
                _this._onDragEnd(ev);
                // });
            };
            /**
             * Attaches handler for 'click' event on any element in .owl-stage in order to prevent dragging when moving of cursor is less than 3px
             */
            this._oneClickHandler = function () {
                _this.listenerOneClick = _this.renderer.listen(_this._drag.target, 'click', function () { return false; });
                _this.listenerOneClick();
            };
        }
        /**
         * @param {?} event
         * @return {?}
         */
        StageComponent.prototype.onMouseDown = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (this.owlDraggable.isMouseDragable) {
                    this._onDragStart(event);
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        StageComponent.prototype.onTouchStart = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (this.owlDraggable.isTouchDragable) {
                    this._onDragStart(event);
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        StageComponent.prototype.onTouchCancel = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this._onDragEnd(event);
            };
        /**
         * @return {?}
         */
        StageComponent.prototype.onDragStart = /**
         * @return {?}
         */
            function () {
                if (this.owlDraggable.isMouseDragable) {
                    return false;
                }
            };
        /**
         * @return {?}
         */
        StageComponent.prototype.onSelectStart = /**
         * @return {?}
         */
            function () {
                if (this.owlDraggable.isMouseDragable) {
                    return false;
                }
            };
        /**
         * @return {?}
         */
        StageComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this._oneMoveSubsription = this._oneDragMove$
                    .pipe(operators.first())
                    .subscribe(function () {
                    _this._sendChanges();
                });
            };
        /**
         * @return {?}
         */
        StageComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this._oneMoveSubsription.unsubscribe();
            };
        /**
         * Handles `touchstart` and `mousedown` events.
         * \@todo Horizontal swipe threshold as option
         * \@todo #261
         * @param {?} event - The event arguments.
         * @return {?}
         */
        StageComponent.prototype._onDragStart = /**
         * Handles `touchstart` and `mousedown` events.
         * \@todo Horizontal swipe threshold as option
         * \@todo #261
         * @param {?} event - The event arguments.
         * @return {?}
         */
            function (event) {
                var _this = this;
                /** @type {?} */
                var stage = null;
                if (event.which === 3) {
                    return;
                }
                stage = this._prepareDragging(event);
                this._drag.time = new Date().getTime();
                this._drag.target = event.target;
                this._drag.stage.start = stage;
                this._drag.stage.current = stage;
                this._drag.pointer = this._pointer(event);
                this._drag.active = true;
                this.listenerMouseUp = this.renderer.listen(document, 'mouseup', this.bindOnDragEnd);
                this.listenerTouchEnd = this.renderer.listen(document, 'touchend', this.bindOnDragEnd);
                this.zone.runOutsideAngular(function () {
                    _this.listenerOneMouseMove = _this.renderer.listen(document, 'mousemove', _this.bindOneMouseTouchMove);
                    _this.listenerOneTouchMove = _this.renderer.listen(document, 'touchmove', _this.bindOneMouseTouchMove);
                });
            };
        /**
         * Attaches listeners to `touchmove` and `mousemove` events; initiates updating carousel after starting dragging
         * @param {?} event event objech of mouse or touch event
         * @return {?}
         */
        StageComponent.prototype._oneMouseTouchMove = /**
         * Attaches listeners to `touchmove` and `mousemove` events; initiates updating carousel after starting dragging
         * @param {?} event event objech of mouse or touch event
         * @return {?}
         */
            function (event) {
                if (!this._drag.active)
                    return false;
                /** @type {?} */
                var delta = this._difference(this._drag.pointer, this._pointer(event));
                this.listenerOneMouseMove();
                this.listenerOneTouchMove();
                if (Math.abs(delta.x) < Math.abs(delta.y) && this._is('valid')) {
                    this._drag.active = false;
                    return;
                }
                this._drag.moving = true;
                this.listenerMouseMove = this.renderer.listen(document, 'mousemove', this.bindOnDragMove);
                this.listenerTouchMove = this.renderer.listen(document, 'touchmove', this.bindOnDragMove);
                event.preventDefault();
                this._enterDragging();
                this._oneDragMove$.next(event);
                // this._sendChanges();
            };
        /**
         * Handles the `touchmove` and `mousemove` events.
         * \@todo #261
         * @param {?} event - The event arguments.
         * @return {?}
         */
        StageComponent.prototype._onDragMove = /**
         * Handles the `touchmove` and `mousemove` events.
         * \@todo #261
         * @param {?} event - The event arguments.
         * @return {?}
         */
            function (event) {
                if (!this._drag.active)
                    return false;
                /** @type {?} */
                var stage;
                /** @type {?} */
                var stageOrExit = this.carouselService.defineNewCoordsDrag(event, this._drag);
                if (stageOrExit === false) {
                    return;
                }
                stage = /** @type {?} */ (stageOrExit);
                event.preventDefault();
                this._drag.stage.current = stage;
                this._animate(stage.x - this._drag.stage.start.x);
            };
        /**
         * Moves .owl-stage left-right
         * @param {?} coordinate coordinate to be set to .owl-stage
         * @return {?}
         */
        StageComponent.prototype._animate = /**
         * Moves .owl-stage left-right
         * @param {?} coordinate coordinate to be set to .owl-stage
         * @return {?}
         */
            function (coordinate) {
                this.renderer.setStyle(this.el.nativeElement.children[0], 'transform', "translate3d(" + coordinate + "px,0px,0px");
                this.renderer.setStyle(this.el.nativeElement.children[0], 'transition', '0s');
            };
        /**
         * Handles the `touchend` and `mouseup` events.
         * \@todo #261
         * \@todo Threshold for click event
         * @param {?} event - The event arguments.
         * @return {?}
         */
        StageComponent.prototype._onDragEnd = /**
         * Handles the `touchend` and `mouseup` events.
         * \@todo #261
         * \@todo Threshold for click event
         * @param {?} event - The event arguments.
         * @return {?}
         */
            function (event) {
                this.carouselService.owlDOMData.isGrab = false;
                if (this._drag.moving) {
                    this.renderer.setStyle(this.el.nativeElement.children[0], 'transform', "");
                    this.renderer.setStyle(this.el.nativeElement.children[0], 'transition', this.carouselService.speed(+this.carouselService.settings.dragEndSpeed || this.carouselService.settings.smartSpeed) / 1000 + 's');
                    this._finishDragging(event);
                    this.listenerMouseMove();
                    this.listenerTouchMove();
                }
                this._drag = {
                    time: null,
                    target: null,
                    pointer: null,
                    stage: {
                        start: null,
                        current: null
                    },
                    direction: null,
                    active: false,
                    moving: false
                };
                // this.carouselService.trigger('dragged');
                this.listenerMouseUp();
                this.listenerTouchEnd();
            };
        /**
         * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
         * @param {?} event - The event arguments.
         * @return {?} stage - object with 'x' and 'y' coordinates of .owl-stage
         */
        StageComponent.prototype._prepareDragging = /**
         * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
         * @param {?} event - The event arguments.
         * @return {?} stage - object with 'x' and 'y' coordinates of .owl-stage
         */
            function (event) {
                return this.carouselService.prepareDragging(event);
            };
        /**
         * Finishes dragging
         * @param {?} event object event of 'mouseUp' of 'touchend' events
         * @return {?}
         */
        StageComponent.prototype._finishDragging = /**
         * Finishes dragging
         * @param {?} event object event of 'mouseUp' of 'touchend' events
         * @return {?}
         */
            function (event) {
                this.carouselService.finishDragging(event, this._drag, this._oneClickHandler);
            };
        /**
         * Gets unified pointer coordinates from event.
         * @param {?} event The `mousedown` or `touchstart` event.
         * @return {?} Contains `x` and `y` coordinates of current pointer position.
         */
        StageComponent.prototype._pointer = /**
         * Gets unified pointer coordinates from event.
         * @param {?} event The `mousedown` or `touchstart` event.
         * @return {?} Contains `x` and `y` coordinates of current pointer position.
         */
            function (event) {
                return this.carouselService.pointer(event);
            };
        /**
         * Gets the difference of two vectors.
         * @param {?} firstC
         * @param {?} second
         * @return {?} The difference.
         */
        StageComponent.prototype._difference = /**
         * Gets the difference of two vectors.
         * @param {?} firstC
         * @param {?} second
         * @return {?} The difference.
         */
            function (firstC, second) {
                return this.carouselService.difference(firstC, second);
            };
        /**
         * Checks whether the carousel is in a specific state or not.
         * @param {?} state The state to check.
         * @return {?} The flag which indicates if the carousel is busy.
         */
        StageComponent.prototype._is = /**
         * Checks whether the carousel is in a specific state or not.
         * @param {?} state The state to check.
         * @return {?} The flag which indicates if the carousel is busy.
         */
            function (state) {
                return this.carouselService.is(state);
            };
        /**
         * Enters a state.
         * @param {?} name The state name.
         * @return {?}
         */
        StageComponent.prototype._enter = /**
         * Enters a state.
         * @param {?} name The state name.
         * @return {?}
         */
            function (name) {
                this.carouselService.enter(name);
            };
        /**
         * Sends all data needed for View.
         * @return {?}
         */
        StageComponent.prototype._sendChanges = /**
         * Sends all data needed for View.
         * @return {?}
         */
            function () {
                this.carouselService.sendChanges();
            };
        /**
         * Handler for transitioend event
         */
        /**
         * Handler for transitioend event
         * @return {?}
         */
        StageComponent.prototype.onTransitionEnd = /**
         * Handler for transitioend event
         * @return {?}
         */
            function () {
                this.carouselService.onTransitionEnd();
            };
        /**
         * Enters into a 'dragging' state
         * @return {?}
         */
        StageComponent.prototype._enterDragging = /**
         * Enters into a 'dragging' state
         * @return {?}
         */
            function () {
                this.carouselService.enterDragging();
            };
        /**
         * Handles the end of 'animationend' event
         * @param id Id of slides
         */
        /**
         * Handles the end of 'animationend' event
         * @param {?} id Id of slides
         * @return {?}
         */
        StageComponent.prototype.clear = /**
         * Handles the end of 'animationend' event
         * @param {?} id Id of slides
         * @return {?}
         */
            function (id) {
                this.animateService.clear(id);
            };
        StageComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'owl-stage',
                        template: "\n    <div>\n      <div class=\"owl-stage\" [ngStyle]=\"{'width': stageData.width + 'px',\n                                        'transform': stageData.transform,\n                                        'transition': stageData.transition,\n                                        'padding-left': stageData.paddingL + 'px',\n                                        'padding-right': stageData.paddingR + 'px' }\"\n          (transitionend)=\"onTransitionEnd()\">\n        <ng-container *ngFor=\"let slide of slidesData; let i = index\">\n          <div class=\"owl-item\" [ngClass]=\"slide.classes\"\n                                [ngStyle]=\"{'width': slide.width + 'px',\n                                            'margin-left': slide.marginL + 'px',\n                                            'margin-right': slide.marginR + 'px',\n                                            'left': slide.left}\"\n                                (animationend)=\"clear(slide.id)\"\n                                [@autoHeight]=\"slide.heightState\">\n            <ng-template *ngIf=\"slide.load\" [ngTemplateOutlet]=\"slide.tplRef\"></ng-template>\n          </div><!-- /.owl-item -->\n        </ng-container>\n      </div><!-- /.owl-stage -->\n    </div>\n  ",
                        animations: [
                            animations.trigger('autoHeight', [
                                animations.state('nulled', animations.style({ height: 0 })),
                                animations.state('full', animations.style({ height: '*' })),
                                animations.transition('full => nulled', [
                                    // style({height: '*'}),
                                    animations.animate('700ms 350ms')
                                ]),
                                animations.transition('nulled => full', [
                                    // style({height: 0}),
                                    animations.animate(350)
                                ]),
                            ])
                        ]
                    }] }
        ];
        /** @nocollapse */
        StageComponent.ctorParameters = function () {
            return [
                { type: core.NgZone },
                { type: core.ElementRef },
                { type: core.Renderer2 },
                { type: CarouselService },
                { type: AnimateService }
            ];
        };
        StageComponent.propDecorators = {
            owlDraggable: [{ type: core.Input }],
            stageData: [{ type: core.Input }],
            slidesData: [{ type: core.Input }],
            onMouseDown: [{ type: core.HostListener, args: ['mousedown', ['$event'],] }],
            onTouchStart: [{ type: core.HostListener, args: ['touchstart', ['$event'],] }],
            onTouchCancel: [{ type: core.HostListener, args: ['touchcancel', ['$event'],] }],
            onDragStart: [{ type: core.HostListener, args: ['dragstart',] }],
            onSelectStart: [{ type: core.HostListener, args: ['selectstart',] }]
        };
        return StageComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var routes = [];
    var CarouselModule = (function () {
        function CarouselModule() {
        }
        CarouselModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, router.RouterModule.forChild(routes)],
                        declarations: [CarouselComponent, CarouselSlideDirective, StageComponent],
                        exports: [CarouselComponent, CarouselSlideDirective],
                        providers: [WINDOW_PROVIDERS, ResizeService, DOCUMENT_PROVIDERS]
                    },] }
        ];
        return CarouselModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.CarouselModule = CarouselModule;
    exports.CarouselComponent = CarouselComponent;
    exports.CarouselSlideDirective = CarouselSlideDirective;
    exports.SlidesOutputData = SlidesOutputData;
    exports.ɵw = StageComponent;
    exports.ɵs = AnimateService;
    exports.ɵt = AutoHeightService;
    exports.ɵc = AutoplayService;
    exports.ɵb = CarouselService;
    exports.ɵm = BrowserDocumentRef;
    exports.ɵk = DOCUMENT;
    exports.ɵq = DOCUMENT_PROVIDERS;
    exports.ɵl = DocumentRef;
    exports.ɵo = browserDocumentProvider;
    exports.ɵn = documentFactory;
    exports.ɵp = documentProvider;
    exports.ɵu = HashService;
    exports.ɵr = LazyLoadService;
    exports.ɵa = NavigationService;
    exports.ɵv = ResizeService;
    exports.ɵf = BrowserWindowRef;
    exports.ɵd = WINDOW;
    exports.ɵj = WINDOW_PROVIDERS;
    exports.ɵe = WindowRef;
    exports.ɵh = browserWindowProvider;
    exports.ɵg = windowFactory;
    exports.ɵi = windowProvider;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW93bC1jYXJvdXNlbC1vLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9yZXNpemUuc2VydmljZS50cyIsbnVsbCwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL2Nhcm91c2VsL293bC1jYXJvdXNlbC1vLWNvbmZpZy50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy93aW5kb3ctcmVmLnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvc2VydmljZXMvZG9jdW1lbnQtcmVmLnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvc2VydmljZXMvYXV0b3BsYXkuc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9sYXp5bG9hZC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL3NlcnZpY2VzL2FuaW1hdGUuc2VydmljZS50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9zZXJ2aWNlcy9hdXRvaGVpZ2h0LnNlcnZpY2UudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvc2VydmljZXMvaGFzaC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vbGliL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW93bC1jYXJvdXNlbC1vL2xpYi9jYXJvdXNlbC9zdGFnZS9zdGFnZS5jb21wb25lbnQudHMiLCJuZzovL25neC1vd2wtY2Fyb3VzZWwtby9saWIvY2Fyb3VzZWwvY2Fyb3VzZWwubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVzaXplU2VydmljZSB7XG4gIC8qKlxuICAgKiBXaWR0aCBvZiB3aW5kb3dcbiAgICovXG4gIHB1YmxpYyB3aW5kb3dXaWR0aDogYW55O1xuXG4gIC8qKlxuICAgKiBNYWtlcyByZXNpemVTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgcmVzaXplU3ViamVjdFxuICAgKi9cbiAgZ2V0IG9uUmVzaXplJCgpOiBPYnNlcnZhYmxlPFdpbmRvdz4ge1xuICAgIHJldHVybiB0aGlzLnJlc2l6ZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogU3ViamVjdCBvZiAncmVzaXplJyBldmVudFxuICAgKi9cbiAgcHJpdmF0ZSByZXNpemVTdWJqZWN0OiBTdWJqZWN0PFdpbmRvdz47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlcikge1xuICAgIHRoaXMucmVzaXplU3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgdGhpcy5ldmVudE1hbmFnZXIuYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcihcbiAgICAgICd3aW5kb3cnLFxuICAgICAgJ3Jlc2l6ZScsXG4gICAgICB0aGlzLm9uUmVzaXplLmJpbmQodGhpcylcbiAgICApO1xuICAgIHRoaXMuZXZlbnRNYW5hZ2VyLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoXG4gICAgICAnd2luZG93JyxcbiAgICAgICdvbmxvYWQnLFxuICAgICAgdGhpcy5vbkxvYWRlZC5iaW5kKHRoaXMpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIG9mICdyZXNpemUnIGV2ZW50LiBQYXNzZXMgZGF0YSB0aHJvdyByZXNpemVTdWJqZWN0XG4gICAqIEBwYXJhbSBldmVudCBFdmVudCBPYmplY3Qgb2YgJ3Jlc2l6ZScgZXZlbnRcbiAgICovXG4gIHByaXZhdGUgb25SZXNpemUoZXZlbnQ6IFVJRXZlbnQpIHtcbiAgICB0aGlzLnJlc2l6ZVN1YmplY3QubmV4dCg8V2luZG93PmV2ZW50LnRhcmdldCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlciBvZiAnb25sb2FkJyBldmVudC4gRGVmaW5lcyB0aGUgd2lkdGggb2Ygd2luZG93XG4gICAqIEBwYXJhbSBldmVudCBFdmVudCBPYmplY3Qgb2YgJ29ubG9hZCcgZXZlbnRcbiAgICovXG4gIHByaXZhdGUgb25Mb2FkZWQoZXZlbnQ6IFVJRXZlbnQpIHtcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gPFdpbmRvdz5ldmVudC50YXJnZXQ7XG4gIH1cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gXCIuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWxcIjtcblxuLyoqXG4gKiBEZWZhdWx0cyB2YWx1ZSBvZiBvcHRpb25zXG4gKi9cbmV4cG9ydCBjbGFzcyBPd2xDYXJvdXNlbE9Db25maWcgaW1wbGVtZW50cyBPd2xPcHRpb25zIHtcbiAgaXRlbXMgPSAzO1xuICBsb29wID0gZmFsc2U7XG4gIGNlbnRlciA9IGZhbHNlO1xuICByZXdpbmQgPSBmYWxzZTtcblxuICBtb3VzZURyYWcgPSB0cnVlO1xuICB0b3VjaERyYWcgPSB0cnVlO1xuICBwdWxsRHJhZyA9IHRydWU7XG4gIGZyZWVEcmFnID0gZmFsc2U7XG5cbiAgbWFyZ2luID0gMDtcbiAgc3RhZ2VQYWRkaW5nID0gMDtcblxuICBtZXJnZSA9IGZhbHNlO1xuICBtZXJnZUZpdCA9IHRydWU7XG4gIGF1dG9XaWR0aCA9IGZhbHNlO1xuXG4gIHN0YXJ0UG9zaXRpb24gPSAwO1xuICBydGwgPSBmYWxzZTtcblxuICBzbWFydFNwZWVkID0gMjUwO1xuICBmbHVpZFNwZWVkID0gZmFsc2U7XG4gIGRyYWdFbmRTcGVlZCA9IGZhbHNlO1xuXG4gIHJlc3BvbnNpdmUgPSB7fTtcbiAgcmVzcG9uc2l2ZVJlZnJlc2hSYXRlID0gMjAwO1xuXG4gIC8vIGRlZmF1bHRzIHRvIE5hdmlnYXRpb25cbiAgbmF2ID0gZmFsc2U7XG4gIG5hdlRleHQgPSBbICdwcmV2JywgJ25leHQnIF07XG4gIG5hdlNwZWVkID0gZmFsc2U7XG4gIHNsaWRlQnkgPSAxOyAvLyBzdGFnZSBtb3ZlcyBvbiAxIHdpZHRoIG9mIHNsaWRlOyBpZiBzbGlkZUJ5ID0gMiwgc3RhZ2UgbW92ZXMgb24gMiB3aWR0aHMgb2Ygc2xpZGVcbiAgZG90cyA9IHRydWU7XG4gIGRvdHNFYWNoID0gZmFsc2U7XG4gIGRvdHNEYXRhID0gZmFsc2U7XG4gIGRvdHNTcGVlZCA9IGZhbHNlO1xuXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9wbGF5XG4gIGF1dG9wbGF5ID0gZmFsc2U7XG4gIGF1dG9wbGF5VGltZW91dCA9IDUwMDA7XG4gIGF1dG9wbGF5SG92ZXJQYXVzZSA9IGZhbHNlO1xuICBhdXRvcGxheVNwZWVkID0gZmFsc2U7XG5cbiAgLy8gZGVmYXVsdHMgdG8gTGF6eUxvYWRpbmdcbiAgbGF6eUxvYWQgPSBmYWxzZTtcbiAgbGF6eUxvYWRFYWdlciA9IDA7XG5cbiAgLy8gZGVmYXVsdHMgdG8gQW5pbWF0ZVxuICBhbmltYXRlT3V0ID0gZmFsc2U7XG4gIGFuaW1hdGVJbiA9IGZhbHNlO1xuXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9IZWlnaHRcbiAgYXV0b0hlaWdodCA9IGZhbHNlO1xuXG4gIC8vIGRlZmF1bHRzIHRvIEhhc2hcbiAgVVJMaGFzaExpc3RlbmVyID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG5cbi8qKlxuICogd2UgY2FuJ3QgcmVhZCB0eXBlcyBmcm9tIE93bE9wdGlvbnMgaW4gamF2YXNjcmlwdCBiZWNhdXNlIG9mIHByb3BzIGhhdmUgdW5kZWZpbmVkIHZhbHVlIGFuZCB0eXBlcyBvZiB0aG9zZSBwcm9wcyBhcmUgdXNlZCBmb3IgdmFsaWRhdGluZyBpbnB1dHNcbiAqIGNsYXNzIGJlbG93IGlzIGNvcHkgb2YgT3dsT3B0aW9ucyBidXQgaXRzIGFsbCBwcm9wcyBoYXZlIHN0cmluZyB2YWx1ZSBzaG93aW5nIGNlcnRhaW4gdHlwZTtcbiAqIHRoaXMgaXMgY2xhc3MgaXMgYmVpbmcgdXNlZCBqdXN0IGluIG1ldGhvZCBfdmFsaWRhdGVPcHRpb25zKCkgb2YgQ2Fyb3VzZWxTZXJ2aWNlO1xuICovXG5leHBvcnQgY2xhc3MgT3dsT3B0aW9uc01vY2tlZFR5cGVzIHtcbiAgaXRlbXMgPSAnbnVtYmVyJztcbiAgbG9vcCA9ICdib29sZWFuJztcbiAgY2VudGVyID0gJ2Jvb2xlYW4nO1xuICByZXdpbmQgPSAnYm9vbGVhbic7XG5cbiAgbW91c2VEcmFnID0gJ2Jvb2xlYW4nO1xuICB0b3VjaERyYWcgPSAnYm9vbGVhbic7XG4gIHB1bGxEcmFnID0gJ2Jvb2xlYW4nO1xuICBmcmVlRHJhZyA9ICdib29sZWFuJztcblxuICBtYXJnaW4gPSAnbnVtYmVyJztcbiAgc3RhZ2VQYWRkaW5nID0gJ251bWJlcic7XG5cbiAgbWVyZ2UgPSAnYm9vbGVhbic7XG4gIG1lcmdlRml0ID0gJ2Jvb2xlYW4nO1xuICBhdXRvV2lkdGggPSAnYm9vbGVhbic7XG5cbiAgc3RhcnRQb3NpdGlvbiA9ICdudW1iZXJ8c3RyaW5nJztcbiAgcnRsID0gJ2Jvb2xlYW4nO1xuXG4gIHNtYXJ0U3BlZWQgPSAnbnVtYmVyJztcbiAgZmx1aWRTcGVlZCA9ICdib29sZWFuJztcbiAgZHJhZ0VuZFNwZWVkID0gJ251bWJlcnxib29sZWFuJztcblxuICByZXNwb25zaXZlID0ge307XG4gIHJlc3BvbnNpdmVSZWZyZXNoUmF0ZSA9ICdudW1iZXInO1xuXG4gIC8vIGRlZmF1bHRzIHRvIE5hdmlnYXRpb25cbiAgbmF2ID0gJ2Jvb2xlYW4nO1xuICBuYXZUZXh0ID0gJ3N0cmluZ1tdJztcbiAgbmF2U3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xuICBzbGlkZUJ5ID0gJ251bWJlcnxzdHJpbmcnOyAvLyBzdGFnZSBtb3ZlcyBvbiAxIHdpZHRoIG9mIHNsaWRlOyBpZiBzbGlkZUJ5ID0gMiwgc3RhZ2UgbW92ZXMgb24gMiB3aWR0aHMgb2Ygc2xpZGVcbiAgZG90cyA9ICdib29sZWFuJztcbiAgZG90c0VhY2ggPSAnbnVtYmVyfGJvb2xlYW4nO1xuICBkb3RzRGF0YSA9ICdib29sZWFuJztcbiAgZG90c1NwZWVkID0gJ251bWJlcnxib29sZWFuJztcblxuICAvLyBkZWZhdWx0cyB0byBBdXRvcGxheVxuICBhdXRvcGxheSA9ICdib29sZWFuJztcbiAgYXV0b3BsYXlUaW1lb3V0ID0gJ251bWJlcic7XG4gIGF1dG9wbGF5SG92ZXJQYXVzZSA9ICdib29sZWFuJztcbiAgYXV0b3BsYXlTcGVlZCA9ICdudW1iZXJ8Ym9vbGVhbic7XG5cbiAgLy8gZGVmYXVsdHMgdG8gTGF6eUxvYWRpbmdcbiAgbGF6eUxvYWQgPSAnYm9vbGVhbic7XG4gIGxhenlMb2FkRWFnZXIgPSAnbnVtYmVyJztcblxuICAvLyBkZWZhdWx0cyB0byBBbmltYXRlXG4gIGFuaW1hdGVPdXQgPSAnc3RyaW5nfGJvb2xlYW4nO1xuICBhbmltYXRlSW4gPSAnc3RyaW5nfGJvb2xlYW4nO1xuXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9IZWlnaHRcbiAgYXV0b0hlaWdodCA9ICdib29sZWFuJztcblxuICAvLyBkZWZhdWx0cyB0byBIYXNoXG4gIFVSTGhhc2hMaXN0ZW5lciA9IFwiYm9vbGVhblwiO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxufSIsImltcG9ydCB7IFN0YWdlRGF0YSB9IGZyb20gJy4uL21vZGVscy9zdGFnZS1kYXRhLm1vZGVsJztcblxuaW1wb3J0IHsgT3dsRE9NRGF0YSB9IGZyb20gJy4uL21vZGVscy9vd2xET00tZGF0YS5tb2RlbCc7XG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSB9IGZyb20gJy4uL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZSc7XG5pbXBvcnQgeyBTbGlkZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3NsaWRlLm1vZGVsJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE93bENhcm91c2VsT0NvbmZpZywgT3dsT3B0aW9uc01vY2tlZFR5cGVzIH0gZnJvbSAnLi4vY2Fyb3VzZWwvb3dsLWNhcm91c2VsLW8tY29uZmlnJztcbmltcG9ydCB7IE93bE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWwnO1xuXG5pbXBvcnQgeyBOYXZEYXRhLCBEb3RzRGF0YSB9IGZyb20gJy4uL21vZGVscy9uYXZpZ2F0aW9uLWRhdGEubW9kZWxzJztcblxuLyoqXG4gKiBDdXJyZW50IHN0YXRlIGluZm9ybWF0aW9uIGFuZCB0aGVpciB0YWdzLlxuICovXG5leHBvcnQgY2xhc3MgU3RhdGVzIHtcbiAgY3VycmVudDoge307XG4gIHRhZ3M6IHtcbiAgICBba2V5OiBzdHJpbmddOiBzdHJpbmdbXTtcbiAgfTtcbn1cblxuLyoqXG4gKiBFbnVtZXJhdGlvbiBmb3IgdHlwZXMuXG4gKiBAZW51bSB7U3RyaW5nfVxuICovXG5leHBvcnQgZW51bSBUeXBlIHtcbiAgRXZlbnQgPSAnZXZlbnQnLFxuICBTdGF0ZSA9ICdzdGF0ZSdcbn07XG5cbi8qKlxuICogRW51bWVyYXRpb24gZm9yIHdpZHRoLlxuICogQGVudW0ge1N0cmluZ31cbiAqL1xuZXhwb3J0IGVudW0gV2lkdGgge1xuICBEZWZhdWx0ID0gJ2RlZmF1bHQnLFxuICBJbm5lciA9ICdpbm5lcicsXG4gIE91dGVyID0gJ291dGVyJ1xufTtcblxuLyoqXG4gKiBNb2RlbCBmb3IgY29vcmRzIG9mIC5vd2wtc3RhZ2VcbiAqL1xuZXhwb3J0IGNsYXNzIENvb3JkcyB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xufVxuXG4vKipcbiAqIE1vZGVsIGZvciBhbGwgY3VycmVudCBkYXRhIG9mIGNhcm91c2VsXG4gKi9cbmV4cG9ydCBjbGFzcyBDYXJvdXNlbEN1cnJlbnREYXRhIHtcbiAgb3dsRE9NRGF0YTogT3dsRE9NRGF0YTtcbiAgc3RhZ2VEYXRhOiBTdGFnZURhdGE7XG4gIHNsaWRlc0RhdGE6IFNsaWRlTW9kZWxbXTtcbiAgbmF2RGF0YTogTmF2RGF0YTtcbiAgZG90c0RhdGE6IERvdHNEYXRhO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIFN1YmplY3QgZm9yIHBhc3NpbmcgZGF0YSBuZWVkZWQgZm9yIG1hbmFnaW5nIFZpZXdcbiAgICovXG4gIHByaXZhdGUgX3ZpZXdTZXR0aW5nc1NoaXBwZXIkID0gbmV3IFN1YmplY3Q8Q2Fyb3VzZWxDdXJyZW50RGF0YT4oKTtcbiAgLyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCBnb3QgaW5pdGlhbGl6ZXNcbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxpemVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gIC8qKlxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwncyBzZXR0aW5ncyBzdGFydCBjaGFuZ2luZlxuICAgKi9cbiAgcHJpdmF0ZSBfY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgLyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHNldHRpbmdzIGhhdmUgY2hhbmdlZFxuICAgKi9cbiAgcHJpdmF0ZSBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAvKipcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsIHN0YXJ0cyB0cmFuc2xhdGluZyBvciBtb3ZpbmdcbiAgICovXG4gIHByaXZhdGUgX3RyYW5zbGF0ZUNhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgLyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCBzdG9wcGVkIHRyYW5zbGF0aW5nIG9yIG1vdmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBfdHJhbnNsYXRlZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgLyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHJlYnVpbGRpbmcgY2F1c2VkIGJ5ICdyZXNpemUnIGV2ZW50IHN0YXJ0c1xuICAgKi9cbiAgcHJpdmF0ZSBfcmVzaXplQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAvKipcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uICB3aGVuIHRoZSBjYXJvdXNlbCdzIHJlYnVpbGRpbmcgY2F1c2VkIGJ5ICdyZXNpemUnIGV2ZW50IGlzIGVuZGVkXG4gICAqL1xuICBwcml2YXRlIF9yZXNpemVkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAvKipcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIHJlZnJlc2ggb2YgY2Fyb3VzZWwgc3RhcnRzXG4gICAqL1xuICBwcml2YXRlIF9yZWZyZXNoQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAvKipcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIHJlZnJlc2ggb2YgY2Fyb3VzZWwgaXMgZW5kZWRcbiAgICovXG4gIHByaXZhdGUgX3JlZnJlc2hlZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgLyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBkcmFnZ2luZyBvZiBjYXJvdXNlbCBzdGFydHNcbiAgICovXG4gIHByaXZhdGUgX2RyYWdDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gIC8qKlxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgZHJhZ2dpbmcgb2YgY2Fyb3VzZWwgaXMgZW5kZWRcbiAgICovXG4gIHByaXZhdGUgX2RyYWdnZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgc2V0dGluZ3MgZm9yIHRoZSBjYXJvdXNlbC5cbiAgICovXG4gIHNldHRpbmdzOiBPd2xPcHRpb25zID0ge1xuICAgIGl0ZW1zOiAwXG4gIH07XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgZGF0YSBmb3Igc2V0dGluZyBjbGFzc2VzIHRvIGVsZW1lbnQgLm93bC1jYXJvdXNlbFxuICAgKi9cbiAgb3dsRE9NRGF0YTogT3dsRE9NRGF0YSA9IHtcbiAgICBydGw6IGZhbHNlLFxuICAgIGlzUmVzcG9uc2l2ZTogZmFsc2UsXG4gICAgaXNSZWZyZXNoZWQ6IGZhbHNlLFxuICAgIGlzTG9hZGVkOiBmYWxzZSxcbiAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgIGlzTW91c2VEcmFnYWJsZTogZmFsc2UsXG4gICAgaXNHcmFiOiBmYWxzZSxcbiAgICBpc1RvdWNoRHJhZ2FibGU6IGZhbHNlXG4gIH07XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgZGF0YSBvZiAub3dsLXN0YWdlXG4gICAqL1xuICBzdGFnZURhdGE6IFN0YWdlRGF0YSA9IHtcbiAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwcHgsMHB4LDBweCknLFxuICAgIHRyYW5zaXRpb246ICcwcycsXG4gICAgd2lkdGg6IDAsXG4gICAgcGFkZGluZ0w6IDAsXG4gICAgcGFkZGluZ1I6IDBcbiAgfTtcblxuICAvKipcbiAgICogIERhdGEgb2YgZXZlcnkgc2xpZGVcbiAgICovXG4gIHNsaWRlc0RhdGE6IFNsaWRlTW9kZWxbXTtcblxuICAvKipcbiAgICogRGF0YSBvZiBuYXZpZ2F0aW9uIGJsb2NrXG4gICAqL1xuICBuYXZEYXRhOiBOYXZEYXRhO1xuXG4gIC8qKlxuICAgKiBEYXRhIG9mIGRvdHMgYmxvY2tcbiAgICovXG4gIGRvdHNEYXRhOiBEb3RzRGF0YTtcblxuICAvKipcbiAgICogQ2Fyb3VzZWwgd2lkdGhcbiAgICovXG4gIHByaXZhdGUgX3dpZHRoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEFsbCByZWFsIGl0ZW1zLlxuICAgKi9cbiAgcHJpdmF0ZSBfaXRlbXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSA9IFtdOyAvLyBpcyBlcXVhbCB0byB0aGlzLnNsaWRlc1xuXG4gIC8qKlxuICAgKiBBcnJheSB3aXRoIHdpZHRoIG9mIGV2ZXJ5IHNsaWRlLlxuICAgKi9cbiAgcHJpdmF0ZSBfd2lkdGhzOiBhbnlbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50bHkgc3VwcHJlc3NlZCBldmVudHMgdG8gcHJldmVudCB0aGVtIGZyb20gYmVlaW5nIHJldHJpZ2dlcmVkLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3VwcmVzczogYW55ID0ge307XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZXMgdG8gdGhlIHJ1bm5pbmcgcGx1Z2lucyBvZiB0aGlzIGNhcm91c2VsLlxuICAgKi9cbiAgcHJpdmF0ZSBfcGx1Z2luczogYW55ID0ge307XG5cbiAgLyoqXG4gICAqIEFic29sdXRlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogQWxsIGNsb25lZCBpdGVtcy5cbiAgICovXG4gIHByaXZhdGUgX2Nsb25lczogYW55W10gPSBbXTtcblxuICAvKipcbiAgICogTWVyZ2UgdmFsdWVzIG9mIGFsbCBpdGVtcy5cbiAgICogQHRvZG8gTWF5YmUgdGhpcyBjb3VsZCBiZSBwYXJ0IG9mIGEgcGx1Z2luLlxuICAgKi9cbiAgcmVhZG9ubHkgX21lcmdlcnM6IGFueVtdID0gW107XG5cbiAgLyoqXG4gICAqIEFuaW1hdGlvbiBzcGVlZCBpbiBtaWxsaXNlY29uZHMuXG4gICAqL1xuICBwcml2YXRlIF9zcGVlZDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIENvb3JkaW5hdGVzIG9mIGFsbCBpdGVtcyBpbiBwaXhlbC5cbiAgICogQHRvZG8gVGhlIG5hbWUgb2YgdGhpcyBtZW1iZXIgaXMgbWlzc2xlYWRpbmcuXG4gICAqL1xuICBwcml2YXRlIF9jb29yZGluYXRlczogbnVtYmVyW10gPSBbXTtcblxuICAvKipcbiAgICogQ3VycmVudCBicmVha3BvaW50LlxuICAgKiBAdG9kbyBSZWFsIG1lZGlhIHF1ZXJpZXMgd291bGQgYmUgbmljZS5cbiAgICovXG4gIHByaXZhdGUgX2JyZWFrcG9pbnQ6IGFueSA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFByZWZpeCBmb3IgaWQgb2YgY2xvbmVkIHNsaWRlc1xuICAgKi9cbiAgY2xvbmVkSWRQcmVmaXggPSAnY2xvbmVkLSc7XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgb3B0aW9ucyBzZXQgYnkgdGhlIGNhbGxlciBpbmNsdWRpbmcgZGVmYXVsdHMuXG4gICAqL1xuICBfb3B0aW9uczogT3dsT3B0aW9ucyA9IHt9O1xuXG4gIC8qKlxuICAgKiBJbnZhbGlkYXRlZCBwYXJ0cyB3aXRoaW4gdGhlIHVwZGF0ZSBwcm9jZXNzLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW52YWxpZGF0ZWQ6IGFueSA9IHt9O1xuXG4gIC8vIElzIG5lZWRlZCBmb3IgdGVzdHNcbiAgZ2V0IGludmFsaWRhdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9pbnZhbGlkYXRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHN0YXRlIGluZm9ybWF0aW9uIGFuZCB0aGVpciB0YWdzLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3RhdGVzOiBTdGF0ZXMgPSB7XG4gICAgY3VycmVudDoge30sXG4gICAgdGFnczoge1xuICAgICAgaW5pdGlhbGl6aW5nOiBbJ2J1c3knXSxcbiAgICAgIGFuaW1hdGluZzogWydidXN5J10sXG4gICAgICBkcmFnZ2luZzogWydpbnRlcmFjdGluZyddXG4gICAgfVxuICB9O1xuXG4gIC8vIGlzIG5lZWRlZCBmb3IgdGVzdHNcbiAgZ2V0IHN0YXRlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIE9yZGVyZWQgbGlzdCBvZiB3b3JrZXJzIGZvciB0aGUgdXBkYXRlIHByb2Nlc3MuXG4gICAqL1xuICBwcml2YXRlIF9waXBlOiBhbnlbXSA9IFtcbiAgICAvLyB7XG4gICAgLy8gICBmaWx0ZXI6IFsnd2lkdGgnLCAnc2V0dGluZ3MnXSxcbiAgICAvLyAgIHJ1bjogKCkgPT4ge1xuICAgIC8vICAgICB0aGlzLl93aWR0aCA9IHRoaXMuY2Fyb3VzZWxXaW5kb3dXaWR0aDtcbiAgICAvLyAgIH1cbiAgICAvLyB9LFxuICAgIHtcbiAgICAgIGZpbHRlcjogWyd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncyddLFxuICAgICAgcnVuOiBjYWNoZSA9PiB7XG4gICAgICAgIGNhY2hlLmN1cnJlbnQgPSB0aGlzLl9pdGVtcyAmJiB0aGlzLl9pdGVtc1t0aGlzLnJlbGF0aXZlKHRoaXMuX2N1cnJlbnQpXS5pZDtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIHtcbiAgICAvLyAgIGZpbHRlcjogWydpdGVtcycsICdzZXR0aW5ncyddLFxuICAgIC8vICAgcnVuOiBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgLy8gdGhpcy4kc3RhZ2UuY2hpbGRyZW4oJy5jbG9uZWQnKS5yZW1vdmUoKTtcbiAgICAvLyAgIH1cbiAgICAvLyB9LFxuICAgIHtcbiAgICAgIGZpbHRlcjogWyd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncyddLFxuICAgICAgcnVuOiAoY2FjaGUpID0+IHtcbiAgICAgICAgY29uc3QgbWFyZ2luID0gdGhpcy5zZXR0aW5ncy5tYXJnaW4gfHwgJycsXG4gICAgICAgICAgZ3JpZCA9ICF0aGlzLnNldHRpbmdzLmF1dG9XaWR0aCxcbiAgICAgICAgICBydGwgPSB0aGlzLnNldHRpbmdzLnJ0bCxcbiAgICAgICAgICBjc3MgPSB7XG4gICAgICAgICAgICAnbWFyZ2luLWxlZnQnOiBydGwgPyBtYXJnaW4gOiAnJyxcbiAgICAgICAgICAgICdtYXJnaW4tcmlnaHQnOiBydGwgPyAnJyA6IG1hcmdpblxuICAgICAgICAgIH07XG5cbiAgICAgICAgaWYgKCFncmlkKSB7XG4gICAgICAgICAgdGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgICAgICAgc2xpZGUubWFyZ2luTCA9IGNzc1snbWFyZ2luLWxlZnQnXTtcbiAgICAgICAgICAgIHNsaWRlLm1hcmdpblIgPSBjc3NbJ21hcmdpbi1yaWdodCddO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FjaGUuY3NzID0gY3NzO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGZpbHRlcjogWyd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncyddLFxuICAgICAgcnVuOiAoY2FjaGUpID0+IHtcbiAgICAgICAgY29uc3Qgd2lkdGg6IGFueSA9ICsodGhpcy53aWR0aCgpIC8gdGhpcy5zZXR0aW5ncy5pdGVtcykudG9GaXhlZCgzKSAtIHRoaXMuc2V0dGluZ3MubWFyZ2luLFxuICAgICAgICAgIGdyaWQgPSAhdGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgsXG4gICAgICAgICAgd2lkdGhzID0gW107XG4gICAgICAgIGxldCBtZXJnZSA9IG51bGwsXG4gICAgICAgICAgaXRlcmF0b3IgPSB0aGlzLl9pdGVtcy5sZW5ndGg7XG5cbiAgICAgICAgY2FjaGUuaXRlbXMgPSB7XG4gICAgICAgICAgbWVyZ2U6IGZhbHNlLFxuICAgICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgICB9O1xuXG4gICAgICAgIHdoaWxlIChpdGVyYXRvci0tKSB7XG4gICAgICAgICAgbWVyZ2UgPSB0aGlzLl9tZXJnZXJzW2l0ZXJhdG9yXTtcbiAgICAgICAgICBtZXJnZSA9IHRoaXMuc2V0dGluZ3MubWVyZ2VGaXQgJiYgTWF0aC5taW4obWVyZ2UsIHRoaXMuc2V0dGluZ3MuaXRlbXMpIHx8IG1lcmdlO1xuICAgICAgICAgIGNhY2hlLml0ZW1zLm1lcmdlID0gbWVyZ2UgPiAxIHx8IGNhY2hlLml0ZW1zLm1lcmdlO1xuXG4gICAgICAgICAgd2lkdGhzW2l0ZXJhdG9yXSA9ICFncmlkID8gdGhpcy5faXRlbXNbaXRlcmF0b3JdLndpZHRoID8gdGhpcy5faXRlbXNbaXRlcmF0b3JdLndpZHRoIDogd2lkdGggOiB3aWR0aCAqIG1lcmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fd2lkdGhzID0gd2lkdGhzO1xuXG4gICAgICAgIHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKChzbGlkZSwgaSkgPT4ge1xuICAgICAgICAgIHNsaWRlLndpZHRoID0gdGhpcy5fd2lkdGhzW2ldO1xuICAgICAgICAgIHNsaWRlLm1hcmdpblIgPSBjYWNoZS5jc3NbJ21hcmdpbi1yaWdodCddO1xuICAgICAgICAgIHNsaWRlLm1hcmdpbkwgPSBjYWNoZS5jc3NbJ21hcmdpbi1sZWZ0J107XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGZpbHRlcjogWydpdGVtcycsICdzZXR0aW5ncyddLFxuICAgICAgcnVuOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsb25lczogYW55W10gPSBbXSxcbiAgICAgICAgICBpdGVtczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdID0gdGhpcy5faXRlbXMsXG4gICAgICAgICAgc2V0dGluZ3M6IGFueSA9IHRoaXMuc2V0dGluZ3MsXG4gICAgICAgICAgLy8gVE9ETzogU2hvdWxkIGJlIGNvbXB1dGVkIGZyb20gbnVtYmVyIG9mIG1pbiB3aWR0aCBpdGVtcyBpbiBzdGFnZVxuICAgICAgICAgIHZpZXcgPSBNYXRoLm1heChzZXR0aW5ncy5pdGVtcyAqIDIsIDQpLFxuICAgICAgICAgIHNpemUgPSBNYXRoLmNlaWwoaXRlbXMubGVuZ3RoIC8gMikgKiAyO1xuICAgICAgICBsZXQgYXBwZW5kOiBhbnlbXSA9IFtdLFxuICAgICAgICAgIHByZXBlbmQ6IGFueVtdID0gW10sXG4gICAgICAgICAgcmVwZWF0ID0gc2V0dGluZ3MubG9vcCAmJiBpdGVtcy5sZW5ndGggPyBzZXR0aW5ncy5yZXdpbmQgPyB2aWV3IDogTWF0aC5tYXgodmlldywgc2l6ZSkgOiAwO1xuXG4gICAgICAgIHJlcGVhdCAvPSAyO1xuXG4gICAgICAgIHdoaWxlIChyZXBlYXQtLSkge1xuICAgICAgICAgIC8vIFN3aXRjaCB0byBvbmx5IHVzaW5nIGFwcGVuZGVkIGNsb25lc1xuICAgICAgICAgIGNsb25lcy5wdXNoKHRoaXMubm9ybWFsaXplKGNsb25lcy5sZW5ndGggLyAyLCB0cnVlKSk7XG4gICAgICAgICAgYXBwZW5kLnB1c2goey4uLnRoaXMuc2xpZGVzRGF0YVtjbG9uZXNbY2xvbmVzLmxlbmd0aCAtIDFdXX0pO1xuICAgICAgICAgIGNsb25lcy5wdXNoKHRoaXMubm9ybWFsaXplKGl0ZW1zLmxlbmd0aCAtIDEgLSAoY2xvbmVzLmxlbmd0aCAtIDEpIC8gMiwgdHJ1ZSkpO1xuICAgICAgICAgIHByZXBlbmQudW5zaGlmdCh7Li4udGhpcy5zbGlkZXNEYXRhW2Nsb25lc1tjbG9uZXMubGVuZ3RoIC0gMV1dfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jbG9uZXMgPSBjbG9uZXM7XG5cbiAgICAgICAgYXBwZW5kID0gYXBwZW5kLm1hcChzbGlkZSA9PiB7XG4gICAgICAgICAgc2xpZGUuaWQgPSBgJHt0aGlzLmNsb25lZElkUHJlZml4fSR7c2xpZGUuaWR9YDtcbiAgICAgICAgICBzbGlkZS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIHNsaWRlLmlzQ2xvbmVkID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gc2xpZGU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByZXBlbmQgPSBwcmVwZW5kLm1hcChzbGlkZSA9PiB7XG4gICAgICAgICAgc2xpZGUuaWQgPSBgJHt0aGlzLmNsb25lZElkUHJlZml4fSR7c2xpZGUuaWR9YDtcbiAgICAgICAgICBzbGlkZS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIHNsaWRlLmlzQ2xvbmVkID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gc2xpZGU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2xpZGVzRGF0YSA9IHByZXBlbmQuY29uY2F0KHRoaXMuc2xpZGVzRGF0YSkuY29uY2F0KGFwcGVuZCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAgZmlsdGVyOiBbJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJ10sXG4gICAgICBydW46ICgpID0+IHtcbiAgICAgICAgY29uc3QgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwgPyAxIDogLTEsXG4gICAgICAgICAgc2l6ZSA9IHRoaXMuX2Nsb25lcy5sZW5ndGggKyB0aGlzLl9pdGVtcy5sZW5ndGgsXG4gICAgICAgICAgY29vcmRpbmF0ZXMgPSBbXTtcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gLTEsXG4gICAgICAgICAgcHJldmlvdXMgPSAwLFxuICAgICAgICAgIGN1cnJlbnQgPSAwO1xuXG4gICAgICAgIHdoaWxlICgrK2l0ZXJhdG9yIDwgc2l6ZSkge1xuICAgICAgICAgIHByZXZpb3VzID0gY29vcmRpbmF0ZXNbaXRlcmF0b3IgLSAxXSB8fCAwO1xuICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLl93aWR0aHNbdGhpcy5yZWxhdGl2ZShpdGVyYXRvcildICsgdGhpcy5zZXR0aW5ncy5tYXJnaW47XG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChwcmV2aW91cyArIGN1cnJlbnQgKiBydGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcztcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBmaWx0ZXI6IFsnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnXSxcbiAgICAgIHJ1bjogKCkgPT4ge1xuICAgICAgICBjb25zdCBwYWRkaW5nID0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcsXG4gICAgICAgICAgY29vcmRpbmF0ZXMgPSB0aGlzLl9jb29yZGluYXRlcyxcbiAgICAgICAgICBjc3MgPSB7XG4gICAgICAgICAgICAnd2lkdGgnOiBNYXRoLmNlaWwoTWF0aC5hYnMoY29vcmRpbmF0ZXNbY29vcmRpbmF0ZXMubGVuZ3RoIC0gMV0pKSArIHBhZGRpbmcgKiAyLFxuICAgICAgICAgICAgJ3BhZGRpbmctbGVmdCc6IHBhZGRpbmcgfHwgJycsXG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IHBhZGRpbmcgfHwgJydcbiAgICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc3RhZ2VEYXRhLndpZHRoID0gY3NzLndpZHRoOyAvLyB1c2UgdGhpcyBwcm9wZXJ0eSBpbiAqbmdJZiBkaXJlY3RpdmUgZm9yIC5vd2wtc3RhZ2UgZWxlbWVudFxuICAgICAgICB0aGlzLnN0YWdlRGF0YS5wYWRkaW5nTCA9IGNzc1sncGFkZGluZy1sZWZ0J107XG4gICAgICAgIHRoaXMuc3RhZ2VEYXRhLnBhZGRpbmdSID0gY3NzWydwYWRkaW5nLXJpZ2h0J107XG4gICAgICB9XG4gICAgfSwge1xuICAgICAgLy8gICBmaWx0ZXI6IFsgJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJyBdLFxuICAgICAgLy8gICBydW46IGNhY2hlID0+IHtcbiAgICAgIC8vIFx0XHQvLyB0aGlzIG1ldGhvZCBzZXRzIHRoZSB3aWR0aCBmb3IgZXZlcnkgc2xpZGUsIGJ1dCBJIHNldCBpdCBpbiBkaWZmZXJlbnQgd2F5IGVhcmxpZXJcbiAgICAgIC8vIFx0XHRjb25zdCBncmlkID0gIXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLFxuICAgICAgLy8gXHRcdGl0ZW1zID0gdGhpcy4kc3RhZ2UuY2hpbGRyZW4oKTsgLy8gdXNlIHRoaXMuc2xpZGVzRGF0YVxuICAgICAgLy8gICAgIGxldCBpdGVyYXRvciA9IHRoaXMuX2Nvb3JkaW5hdGVzLmxlbmd0aDtcblxuICAgICAgLy8gICAgIGlmIChncmlkICYmIGNhY2hlLml0ZW1zLm1lcmdlKSB7XG4gICAgICAvLyAgICAgICB3aGlsZSAoaXRlcmF0b3ItLSkge1xuICAgICAgLy8gICAgICAgICBjYWNoZS5jc3Mud2lkdGggPSB0aGlzLl93aWR0aHNbdGhpcy5yZWxhdGl2ZShpdGVyYXRvcildO1xuICAgICAgLy8gICAgICAgICBpdGVtcy5lcShpdGVyYXRvcikuY3NzKGNhY2hlLmNzcyk7XG4gICAgICAvLyAgICAgICB9XG4gICAgICAvLyAgICAgfSBlbHNlIGlmIChncmlkKSB7XG4gICAgICAvLyAgICAgICBjYWNoZS5jc3Mud2lkdGggPSBjYWNoZS5pdGVtcy53aWR0aDtcbiAgICAgIC8vICAgICAgIGl0ZW1zLmNzcyhjYWNoZS5jc3MpO1xuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSwge1xuICAgICAgLy8gICBmaWx0ZXI6IFsgJ2l0ZW1zJyBdLFxuICAgICAgLy8gICBydW46IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gICAgIHRoaXMuX2Nvb3JkaW5hdGVzLmxlbmd0aCA8IDEgJiYgdGhpcy4kc3RhZ2UucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSwge1xuICAgICAgZmlsdGVyOiBbJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJ10sXG4gICAgICBydW46IGNhY2hlID0+IHtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBjYWNoZS5jdXJyZW50ID8gdGhpcy5zbGlkZXNEYXRhLmZpbmRJbmRleChzbGlkZSA9PiBzbGlkZS5pZCA9PT0gY2FjaGUuY3VycmVudCkgOiAwO1xuICAgICAgICBjdXJyZW50ID0gTWF0aC5tYXgodGhpcy5taW5pbXVtKCksIE1hdGgubWluKHRoaXMubWF4aW11bSgpLCBjdXJyZW50KSk7XG4gICAgICAgIHRoaXMucmVzZXQoY3VycmVudCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAgZmlsdGVyOiBbJ3Bvc2l0aW9uJ10sXG4gICAgICBydW46ICgpID0+IHtcbiAgICAgICAgdGhpcy5hbmltYXRlKHRoaXMuY29vcmRpbmF0ZXModGhpcy5fY3VycmVudCkpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGZpbHRlcjogWyd3aWR0aCcsICdwb3NpdGlvbicsICdpdGVtcycsICdzZXR0aW5ncyddLFxuICAgICAgcnVuOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsID8gMSA6IC0xLFxuICAgICAgICAgIHBhZGRpbmcgPSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyAqIDIsXG4gICAgICAgICAgbWF0Y2hlcyA9IFtdO1xuICAgICAgICBsZXQgYmVnaW4sIGVuZCwgaW5uZXIsIG91dGVyLCBpLCBuO1xuXG4gICAgICAgIGJlZ2luID0gdGhpcy5jb29yZGluYXRlcyh0aGlzLmN1cnJlbnQoKSk7XG4gICAgICAgIGlmICh0eXBlb2YgYmVnaW4gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgYmVnaW4gKz0gcGFkZGluZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBiZWdpbiA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBlbmQgPSBiZWdpbiArIHRoaXMud2lkdGgoKSAqIHJ0bDtcblxuICAgICAgICBpZiAocnRsID09PSAtMSAmJiB0aGlzLnNldHRpbmdzLmNlbnRlcikge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX2Nvb3JkaW5hdGVzLmZpbHRlcihlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLml0ZW1zICUgMiA9PT0gMSA/IGVsZW1lbnQgPj0gYmVnaW4gOiBlbGVtZW50ID4gYmVnaW47XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYmVnaW4gPSByZXN1bHQubGVuZ3RoID8gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSA6IGJlZ2luO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMCwgbiA9IHRoaXMuX2Nvb3JkaW5hdGVzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgIGlubmVyID0gTWF0aC5jZWlsKHRoaXMuX2Nvb3JkaW5hdGVzW2kgLSAxXSB8fCAwKTtcbiAgICAgICAgICBvdXRlciA9IE1hdGguY2VpbChNYXRoLmFicyh0aGlzLl9jb29yZGluYXRlc1tpXSkgKyBwYWRkaW5nICogcnRsKTtcblxuICAgICAgICAgIGlmICgodGhpcy5fb3AoaW5uZXIsICc8PScsIGJlZ2luKSAmJiAodGhpcy5fb3AoaW5uZXIsICc+JywgZW5kKSkpXG4gICAgICAgICAgICB8fCAodGhpcy5fb3Aob3V0ZXIsICc8JywgYmVnaW4pICYmIHRoaXMuX29wKG91dGVyLCAnPicsIGVuZCkpKSB7XG4gICAgICAgICAgICBtYXRjaGVzLnB1c2goaSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgICAgIHNsaWRlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIHNsaWRlO1xuICAgICAgICB9KTtcbiAgICAgICAgbWF0Y2hlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIHRoaXMuc2xpZGVzRGF0YVtpdGVtXS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNlbnRlcikge1xuICAgICAgICAgIHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgICAgIHNsaWRlLmlzQ2VudGVyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBzbGlkZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnNsaWRlc0RhdGFbdGhpcy5jdXJyZW50KCldLmlzQ2VudGVyZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICBdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2VzIF92aWV3U2V0dGluZ3NTaGlwcGVyJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3ZpZXdTZXR0aW5nc1NoaXBwZXIkIFN1YmplY3RcbiAgICovXG4gIGdldFZpZXdDdXJTZXR0aW5ncygpOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5fdmlld1NldHRpbmdzU2hpcHBlciQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZXMgX2luaXRpYWxpemVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQgU3ViamVjdFxuICAgKi9cbiAgZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJC5hc09ic2VydmFibGUoKVxuICB9XG5cbiAgLyoqXG4gICAqIE1ha2VzIF9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3RcbiAgICovXG4gIGdldENoYW5nZVN0YXRlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2VzIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdFxuICAgKi9cbiAgZ2V0Q2hhbmdlZFN0YXRlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlcyBfdHJhbnNsYXRlQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfdHJhbnNsYXRlQ2Fyb3VzZWwkIFN1YmplY3RcbiAgICovXG4gIGdldFRyYW5zbGF0ZVN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zbGF0ZUNhcm91c2VsJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlcyBfdHJhbnNsYXRlZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3RyYW5zbGF0ZWRDYXJvdXNlbCQgU3ViamVjdFxuICAgKi9cbiAgZ2V0VHJhbnNsYXRlZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZXMgX3Jlc2l6ZUNhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3Jlc2l6ZUNhcm91c2VsJCBTdWJqZWN0XG4gICAqL1xuICBnZXRSZXNpemVTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9yZXNpemVDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZXMgX3Jlc2l6ZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZXNpemVkQ2Fyb3VzZWwkIFN1YmplY3RcbiAgICovXG4gIGdldFJlc2l6ZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9yZXNpemVkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2VzIF9yZWZyZXNoQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVmcmVzaENhcm91c2VsJCBTdWJqZWN0XG4gICAqL1xuICBnZXRSZWZyZXNoU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVmcmVzaENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlcyBfcmVmcmVzaGVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVmcmVzaGVkQ2Fyb3VzZWwkIFN1YmplY3RcbiAgICovXG4gIGdldFJlZnJlc2hlZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlZnJlc2hlZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlcyBfZHJhZ0Nhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2RyYWdDYXJvdXNlbCQgU3ViamVjdFxuICAgKi9cbiAgZ2V0RHJhZ1N0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2RyYWdDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZXMgX2RyYWdnZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9kcmFnZ2VkQ2Fyb3VzZWwkIFN1YmplY3RcbiAgICovXG4gIGdldERyYWdnZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9kcmFnZ2VkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHVwcyBjdXN0b20gb3B0aW9ucyBleHBhbmRpbmcgZGVmYXVsdCBvcHRpb25zXG4gICAqIEBwYXJhbSBvcHRpb25zIGN1c3RvbSBvcHRpb25zXG4gICAqL1xuICBzZXRPcHRpb25zKG9wdGlvbnM6IE93bE9wdGlvbnMpIHtcbiAgICBjb25zdCBjb25maWdPcHRpb25zOiBPd2xPcHRpb25zID0gbmV3IE93bENhcm91c2VsT0NvbmZpZygpO1xuICAgIGNvbnN0IGNoZWNrZWRPcHRpb25zOiBPd2xPcHRpb25zID0gdGhpcy5fdmFsaWRhdGVPcHRpb25zKG9wdGlvbnMsIGNvbmZpZ09wdGlvbnMpO1xuICAgIHRoaXMuX29wdGlvbnMgPSB7Li4uY29uZmlnT3B0aW9ucywgLi4uY2hlY2tlZE9wdGlvbnN9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIHVzZXIncyBvcHRpb24gYXJlIHNldCBwcm9wZXJseS4gQ2hla2luZyBpcyBiYXNlZCBvbiB0eXBpbmdzO1xuICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIHNldCBieSB1c2VyXG4gICAqIEBwYXJhbSBjb25maWdPcHRpb25zIGRlZmF1bHQgb3B0aW9uc1xuICAgKiBAcmV0dXJucyBjaGVja2VkIGFuZCBtb2RpZmllZCAoaWYgaXQncyBuZWVkZWQpIHVzZXIncyBvcHRpb25zXG4gICAqXG4gICAqIE5vdGVzOlxuICAgKiAgLSBpZiB1c2VyIHNldCBvcHRpb24gd2l0aCB3cm9uZyB0eXBlLCBpdCdsbCBiZSB3cml0dGVuIGluIGNvbnNvbGVcbiAgICovXG4gIHByaXZhdGUgX3ZhbGlkYXRlT3B0aW9ucyhvcHRpb25zOiBPd2xPcHRpb25zLCBjb25maWdPcHRpb25zOiBPd2xPcHRpb25zKTogT3dsT3B0aW9ucyB7XG4gICAgY29uc3QgY2hlY2tlZE9wdGlvbnM6IE93bE9wdGlvbnMgPSB7Li4ub3B0aW9uc307XG4gICAgY29uc3QgbW9ja2VkVHlwZXMgPSBuZXcgT3dsT3B0aW9uc01vY2tlZFR5cGVzKCk7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjaGVja2VkT3B0aW9ucykge1xuICAgICAgaWYgKGNoZWNrZWRPcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuICAgICAgICAvLyBjb25kaXRpb24gY291bGQgYmUgc2hvcnRlbmVkIGJ1dCBpdCBnZXRzIGhhcmRlciBmb3IgdW5kZXJzdGFuZGluZ1xuICAgICAgICBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBpZiAodGhpcy5faXNOdW1lcmljKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XG4gICAgICAgICAgICBjaGVja2VkT3B0aW9uc1trZXldID0gK2NoZWNrZWRPcHRpb25zW2tleV07XG4gICAgICAgICAgICBjaGVja2VkT3B0aW9uc1trZXldID0ga2V5ID09PSAnaXRlbXMnID8gdGhpcy5fdmFsaWRhdGVJdGVtcyhjaGVja2VkT3B0aW9uc1trZXldKSA6IGNoZWNrZWRPcHRpb25zW2tleV07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnYm9vbGVhbicgJiYgdHlwZW9mIGNoZWNrZWRPcHRpb25zW2tleV0gIT09ICdib29sZWFuJykge1xuICAgICAgICAgIGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xuICAgICAgICB9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdudW1iZXJ8Ym9vbGVhbicgJiYgIXRoaXMuX2lzTnVtYmVyT3JCb29sZWFuKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XG4gICAgICAgICAgY2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XG4gICAgICAgIH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ251bWJlcnxzdHJpbmcnICYmICF0aGlzLl9pc051bWJlck9yU3RyaW5nKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XG4gICAgICAgICAgY2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XG4gICAgICAgIH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ3N0cmluZ3xib29sZWFuJyAmJiAhdGhpcy5faXNTdHJpbmdPckJvb2xlYW4oY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcbiAgICAgICAgICBjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcbiAgICAgICAgfSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnc3RyaW5nW10nKSB7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcbiAgICAgICAgICAgIGxldCBpc1N0cmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgY2hlY2tlZE9wdGlvbnNba2V5XS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICBpc1N0cmluZyA9IHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFpc1N0cmluZykge1xuICAgICAgICAgICAgICBjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRSaWdodE9wdGlvbih0eXBlOiBzdHJpbmcsIGtleTogYW55KTogYW55IHtcbiAgICAgIGNvbnNvbGUubG9nKGBvcHRpb25zLiR7a2V5fSBtdXN0IGJlIHR5cGUgb2YgJHt0eXBlfTsgJHtrZXl9PSR7b3B0aW9uc1trZXldfSBza2lwcGVkIHRvIGRlZmF1bHRzOiAke2tleX09JHtjb25maWdPcHRpb25zW2tleV19YCk7XG4gICAgICByZXR1cm4gY29uZmlnT3B0aW9uc1trZXldO1xuICAgIH1cblxuICAgIHJldHVybiBjaGVja2VkT3B0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3Mgb3B0aW9uIGl0ZW1zIHNldCBieSB1c2VyIGFuZCBpZiBpdCBiaWdnZXIgdGhhbiBudW1iZXIgb2Ygc2xpZGVzIHRoZW4gcmV0dXJucyBudW1iZXIgb2Ygc2xpZGVzXG4gICAqIEBwYXJhbSBpdGVtcyBvcHRpb24gaXRlbXMgc2V0IGJ5IHVzZXJcbiAgICogQHJldHVybnMgcmlnaHQgbnVtYmVyIG9mIGl0ZW1zXG4gICAqL1xuICBwcml2YXRlIF92YWxpZGF0ZUl0ZW1zKGl0ZW1zOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCByZXN1bHQ6IG51bWJlcjtcbiAgICBpZiAoaXRlbXMgPj0gdGhpcy5faXRlbXMubGVuZ3RoKSB7XG4gICAgICByZXN1bHQgPSB0aGlzLl9pdGVtcy5sZW5ndGg7XG4gICAgICBjb25zb2xlLmxvZygnb3B0aW9uIFxcJ2l0ZW1zXFwnIGluIHlvdXIgb3B0aW9ucyBpcyBiaWdnZXIgdGhhbiBudW1iZXIgb2Ygc2xpZGVzOyBUaGlzIG9wdGlvbiBpcyB1cGRhdGVkIHRvIGN1cnJlbnQgbnVtYmVyIG9mIHNsaWRlcyBhbmQgbmF2aWdhdGlvbiBnb3QgZGlzYWJsZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gaXRlbXM7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGN1cnJlbnQgd2lkdGggb2YgY2Fyb3VzZWxcbiAgICogQHBhcmFtIHdpZHRoIHdpZHRoIG9mIGNhcm91c2VsIFdpbmRvd1xuICAgKi9cbiAgc2V0Q2Fyb3VzZWxXaWR0aCh3aWR0aDogbnVtYmVyKSB7XG4gICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXR1cHMgdGhlIGN1cnJlbnQgc2V0dGluZ3MuXG4gICAqIEB0b2RvIFJlbW92ZSByZXNwb25zaXZlIGNsYXNzZXMuIFdoeSBzaG91bGQgYWRhcHRpdmUgZGVzaWducyBiZSBicm91Z2h0IGludG8gSUU4P1xuICAgKiBAdG9kbyBTdXBwb3J0IGZvciBtZWRpYSBxdWVyaWVzIGJ5IHVzaW5nIGBtYXRjaE1lZGlhYCB3b3VsZCBiZSBuaWNlLlxuICAgKiBAcGFyYW0gY2Fyb3VzZWxXaWR0aCB3aWR0aCBvZiBjYXJvdXNlbFxuICAgKiBAcGFyYW0gc2xpZGVzIGFycmF5IG9mIHNsaWRlc1xuICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIHNldCBieSB1c2VyXG4gICAqL1xuICBzZXR1cChjYXJvdXNlbFdpZHRoOiBudW1iZXIsIHNsaWRlczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdLCBvcHRpb25zOiBPd2xPcHRpb25zKSB7XG4gICAgdGhpcy5zZXRDYXJvdXNlbFdpZHRoKGNhcm91c2VsV2lkdGgpO1xuICAgIHRoaXMuc2V0SXRlbXMoc2xpZGVzKTtcbiAgICB0aGlzLl9kZWZpbmVTbGlkZXNEYXRhKCk7XG4gICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgdGhpcy5zZXR0aW5ncyA9IHsuLi50aGlzLl9vcHRpb25zfTtcblxuICAgIHRoaXMuc2V0Vmlld3BvcnRJdGVtc04oKTtcblxuICAgIHRoaXMuX3RyaWdnZXIoJ2NoYW5nZScsIHtwcm9wZXJ0eToge25hbWU6ICdzZXR0aW5ncycsIHZhbHVlOiB0aGlzLnNldHRpbmdzfX0pO1xuICAgIHRoaXMuaW52YWxpZGF0ZSgnc2V0dGluZ3MnKTsgLy8gbXVzdCBiZSBjYWxsIG9mIHRoaXMgZnVuY3Rpb247XG4gICAgdGhpcy5fdHJpZ2dlcignY2hhbmdlZCcsIHtwcm9wZXJ0eToge25hbWU6ICdzZXR0aW5ncycsIHZhbHVlOiB0aGlzLnNldHRpbmdzfX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBudW1iZXIgb2YgaXRlbXMgZm9yIGN1cnJlbnQgdmlld3BvcnRcbiAgICovXG4gIHNldFZpZXdwb3J0SXRlbXNOKCkge1xuICAgIGNvbnN0IHZpZXdwb3J0ID0gdGhpcy5fd2lkdGgsXG4gICAgICBvdmVyd3JpdGVzID0gdGhpcy5fb3B0aW9ucy5yZXNwb25zaXZlO1xuICAgIGxldCBtYXRjaCA9IC0xO1xuXG4gICAgaWYgKCFPYmplY3Qua2V5cyhvdmVyd3JpdGVzKS5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvdmVyd3JpdGVzKSB7XG4gICAgICBpZiAob3ZlcndyaXRlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGlmICgra2V5IDw9IHZpZXdwb3J0ICYmICtrZXkgPiBtYXRjaCkge1xuICAgICAgICAgIG1hdGNoID0gTnVtYmVyKGtleSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldHRpbmdzID0gey4uLnRoaXMuc2V0dGluZ3MsIGl0ZW1zOiB0aGlzLl92YWxpZGF0ZUl0ZW1zKG92ZXJ3cml0ZXNbbWF0Y2hdLml0ZW1zKX07XG4gICAgLy8gaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIFx0dGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZygpO1xuICAgIC8vIH1cbiAgICBkZWxldGUgdGhpcy5zZXR0aW5ncy5yZXNwb25zaXZlO1xuICAgIHRoaXMub3dsRE9NRGF0YS5pc1Jlc3BvbnNpdmUgPSB0cnVlO1xuICAgIHRoaXMuX2JyZWFrcG9pbnQgPSBtYXRjaDtcblxuICAgIHRoaXMuaW52YWxpZGF0ZSgnc2V0dGluZ3MnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgY2Fyb3VzZWwuXG4gICAqIEBwYXJhbSBzbGlkZXMgYXJyYXkgb2YgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVxuICAgKi9cbiAgaW5pdGlhbGl6ZShzbGlkZXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSkge1xuICAgIHRoaXMuZW50ZXIoJ2luaXRpYWxpemluZycpO1xuICAgIC8vIHRoaXMudHJpZ2dlcignaW5pdGlhbGl6ZScpO1xuXG4gICAgdGhpcy5vd2xET01EYXRhLnJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsO1xuXG4gICAgc2xpZGVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBjb25zdCBtZXJnZU46IG51bWJlciA9IHRoaXMuc2V0dGluZ3MubWVyZ2UgPyBpdGVtLmRhdGFNZXJnZSA6IDE7XG4gICAgICB0aGlzLl9tZXJnZXJzLnB1c2gobWVyZ2VOKTtcbiAgICB9KTtcblxuICAgIHRoaXMucmVzZXQodGhpcy5faXNOdW1lcmljKHRoaXMuc2V0dGluZ3Muc3RhcnRQb3NpdGlvbikgPyArdGhpcy5zZXR0aW5ncy5zdGFydFBvc2l0aW9uIDogMCk7XG5cbiAgICB0aGlzLmludmFsaWRhdGUoJ2l0ZW1zJyk7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG5cbiAgICB0aGlzLm93bERPTURhdGEuaXNMb2FkZWQgPSB0cnVlO1xuICAgIHRoaXMub3dsRE9NRGF0YS5pc01vdXNlRHJhZ2FibGUgPSB0aGlzLnNldHRpbmdzLm1vdXNlRHJhZztcbiAgICB0aGlzLm93bERPTURhdGEuaXNUb3VjaERyYWdhYmxlID0gdGhpcy5zZXR0aW5ncy50b3VjaERyYWc7XG5cbiAgICB0aGlzLnNlbmRDaGFuZ2VzKCk7XG5cbiAgICB0aGlzLmxlYXZlKCdpbml0aWFsaXppbmcnKTtcbiAgICB0aGlzLl90cmlnZ2VyKCdpbml0aWFsaXplZCcpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZW5kcyBhbGwgZGF0YSBuZWVkZWQgZm9yIFZpZXdcbiAgICovXG4gIHNlbmRDaGFuZ2VzKCkge1xuICAgIHRoaXMuX3ZpZXdTZXR0aW5nc1NoaXBwZXIkLm5leHQoe1xuICAgICAgb3dsRE9NRGF0YTogdGhpcy5vd2xET01EYXRhLFxuICAgICAgc3RhZ2VEYXRhOiB0aGlzLnN0YWdlRGF0YSxcbiAgICAgIHNsaWRlc0RhdGE6IHRoaXMuc2xpZGVzRGF0YSxcbiAgICAgIG5hdkRhdGE6IHRoaXMubmF2RGF0YSxcbiAgICAgIGRvdHNEYXRhOiB0aGlzLmRvdHNEYXRhXG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIG9wdGlvbiBsb2dpYyBpZiBuZWNlc3NlcnlcbiAgICovXG4gIHByaXZhdGUgX29wdGlvbnNMb2dpYygpIHtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nID0gMDtcbiAgICAgIHRoaXMuc2V0dGluZ3MubWVyZ2UgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgdmlld1xuICAgKi9cbiAgdXBkYXRlKCkge1xuICAgIGxldCBpID0gMDtcbiAgICBjb25zdCBuID0gdGhpcy5fcGlwZS5sZW5ndGgsXG4gICAgICBmaWx0ZXIgPSBpdGVtID0+IHRoaXMuX2ludmFsaWRhdGVkW2l0ZW1dLFxuICAgICAgY2FjaGUgPSB7fTtcblxuICAgIHdoaWxlIChpIDwgbikge1xuICAgICAgY29uc3QgZmlsdGVyZWRQaXBlID0gdGhpcy5fcGlwZVtpXS5maWx0ZXIuZmlsdGVyKGZpbHRlcik7XG4gICAgICBpZiAodGhpcy5faW52YWxpZGF0ZWQuYWxsIHx8IGZpbHRlcmVkUGlwZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuX3BpcGVbaV0ucnVuKGNhY2hlKTtcbiAgICAgIH1cbiAgICAgIGkrKztcbiAgICB9XG4gICAgdGhpcy5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4gc2xpZGUuY2xhc3NlcyA9IHRoaXMuc2V0Q3VyU2xpZGVDbGFzc2VzKHNsaWRlKSk7XG4gICAgdGhpcy5zZW5kQ2hhbmdlcygpO1xuXG4gICAgdGhpcy5faW52YWxpZGF0ZWQgPSB7fTtcblxuICAgIGlmICghdGhpcy5pcygndmFsaWQnKSkge1xuICAgICAgdGhpcy5lbnRlcigndmFsaWQnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgd2lkdGggb2YgdGhlIHZpZXcuXG4gICAqIEBwYXJhbSBbZGltZW5zaW9uPVdpZHRoLkRlZmF1bHRdIFRoZSBkaW1lbnNpb24gdG8gcmV0dXJuXG4gICAqIEByZXR1cm5zIFRoZSB3aWR0aCBvZiB0aGUgdmlldyBpbiBwaXhlbC5cbiAgICovXG4gIHdpZHRoKGRpbWVuc2lvbj86IFdpZHRoKTogbnVtYmVyIHtcbiAgICBkaW1lbnNpb24gPSBkaW1lbnNpb24gfHwgV2lkdGguRGVmYXVsdDtcbiAgICBzd2l0Y2ggKGRpbWVuc2lvbikge1xuICAgICAgY2FzZSBXaWR0aC5Jbm5lcjpcbiAgICAgIGNhc2UgV2lkdGguT3V0ZXI6XG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aCAtIHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nICogMiArIHRoaXMuc2V0dGluZ3MubWFyZ2luO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZyZXNoZXMgdGhlIGNhcm91c2VsIHByaW1hcmlseSBmb3IgYWRhcHRpdmUgcHVycG9zZXMuXG4gICAqL1xuICByZWZyZXNoKCkge1xuICAgIHRoaXMuZW50ZXIoJ3JlZnJlc2hpbmcnKTtcbiAgICB0aGlzLl90cmlnZ2VyKCdyZWZyZXNoJyk7XG4gICAgdGhpcy5fZGVmaW5lU2xpZGVzRGF0YSgpO1xuICAgIHRoaXMuc2V0Vmlld3BvcnRJdGVtc04oKTtcblxuICAgIHRoaXMuX29wdGlvbnNMb2dpYygpO1xuXG4gICAgLy8gdGhpcy4kZWxlbWVudC5hZGRDbGFzcyh0aGlzLm9wdGlvbnMucmVmcmVzaENsYXNzKTtcblxuICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICAvLyB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMub3B0aW9ucy5yZWZyZXNoQ2xhc3MpO1xuXG4gICAgdGhpcy5sZWF2ZSgncmVmcmVzaGluZycpO1xuICAgIHRoaXMuX3RyaWdnZXIoJ3JlZnJlc2hlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aW5kb3cgYHJlc2l6ZWAgZXZlbnQuXG4gICAqIEBwYXJhbSBjdXJXaWR0aCB3aWR0aCBvZiAub3dsLWNhcm91c2VsXG4gICAqL1xuICBvblJlc2l6ZShjdXJXaWR0aDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLl9pdGVtcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLnNldENhcm91c2VsV2lkdGgoY3VyV2lkdGgpO1xuXG4gICAgdGhpcy5lbnRlcigncmVzaXppbmcnKTtcblxuICAgIC8vIGlmICh0aGlzLnRyaWdnZXIoJ3Jlc2l6ZScpLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgLy8gXHR0aGlzLmxlYXZlKCdyZXNpemluZycpO1xuICAgIC8vIFx0cmV0dXJuIGZhbHNlO1xuICAgIC8vIH1cbiAgICB0aGlzLl90cmlnZ2VyKCdyZXNpemUnKTtcbiAgICB0aGlzLmludmFsaWRhdGUoJ3dpZHRoJyk7XG5cbiAgICB0aGlzLnJlZnJlc2goKTtcblxuICAgIHRoaXMubGVhdmUoJ3Jlc2l6aW5nJyk7XG4gICAgdGhpcy5fdHJpZ2dlcigncmVzaXplZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmVzIGRhdGEgZm9yIGRyYWdnaW5nIGNhcm91c2VsLiBJdCBzdGFydHMgYWZ0ZXIgZmlyaW5nIGB0b3VjaHN0YXJ0YCBhbmQgYG1vdXNlZG93bmAgZXZlbnRzLlxuICAgKiBAdG9kbyBIb3Jpem9udGFsIHN3aXBlIHRocmVzaG9sZCBhcyBvcHRpb25cbiAgICogQHRvZG8gIzI2MVxuICAgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxuICAgKiBAcmV0dXJucyBzdGFnZSAtIG9iamVjdCB3aXRoICd4JyBhbmQgJ3knIGNvb3JkaW5hdGVzIG9mIC5vd2wtc3RhZ2VcbiAgICovXG4gIHByZXBhcmVEcmFnZ2luZyhldmVudDogYW55KTogQ29vcmRzIHtcbiAgICBsZXQgc3RhZ2U6IENvb3JkcyA9IG51bGwsXG4gICAgICB0cmFuc2Zvcm1BcnI6IHN0cmluZ1tdO1xuXG4gICAgLy8gY291bGQgYmUgNSBjb21tZW50ZWQgbGluZXMgYmVsb3c7IEhvd2V2ZXIgdGhlcmUncyBzdGFnZSB0cmFuc2Zvcm0gaW4gc3RhZ2VEYXRhIGFuZCBpbiB1cGRhdGVzIGFmdGVyIGVhY2ggbW92ZSBvZiBzdGFnZVxuICAgIC8vIHN0YWdlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpLnRyYW5zZm9ybS5yZXBsYWNlKC8uKlxcKHxcXCl8IC9nLCAnJykuc3BsaXQoJywnKTtcbiAgICAvLyBzdGFnZSA9IHtcbiAgICAvLyAgIHg6IHN0YWdlW3N0YWdlLmxlbmd0aCA9PT0gMTYgPyAxMiA6IDRdLFxuICAgIC8vICAgeTogc3RhZ2Vbc3RhZ2UubGVuZ3RoID09PSAxNiA/IDEzIDogNV1cbiAgICAvLyB9O1xuXG4gICAgdHJhbnNmb3JtQXJyID0gdGhpcy5zdGFnZURhdGEudHJhbnNmb3JtLnJlcGxhY2UoLy4qXFwofFxcKXwgfFteLC1cXGRdXFx3fFxcKS9nLCAnJykuc3BsaXQoJywnKTtcbiAgICBzdGFnZSA9IHtcbiAgICAgIHg6ICt0cmFuc2Zvcm1BcnJbMF0sXG4gICAgICB5OiArdHJhbnNmb3JtQXJyWzFdXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmlzKCdhbmltYXRpbmcnKSkge1xuICAgICAgdGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xuICAgIH1cblxuICAgIGlmIChldmVudC50eXBlID09PSAnbW91c2Vkb3duJykge1xuICAgICAgdGhpcy5vd2xET01EYXRhLmlzR3JhYiA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5zcGVlZCgwKTtcbiAgICByZXR1cm4gc3RhZ2U7XG4gIH1cblxuICAvKipcbiAgICogRW50ZXJzIGludG8gYSAnZHJhZ2dpbmcnIHN0YXRlXG4gICAqL1xuICBlbnRlckRyYWdnaW5nKCkge1xuICAgIHRoaXMuZW50ZXIoJ2RyYWdnaW5nJyk7XG4gICAgdGhpcy5fdHJpZ2dlcignZHJhZycpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgbmV3IGNvb3JkcyBmb3IgLm93bC1zdGFnZSB3aGlsZSBkcmFnZ2luZyBpdFxuICAgKiBAdG9kbyAjMjYxXG4gICAqIEBwYXJhbSBldmVudCB0aGUgZXZlbnQgYXJndW1lbnRzLlxuICAgKiBAcGFyYW0gZHJhZ0RhdGEgaW5pdGlhbCBkYXRhIGdvdCBhZnRlciBzdGFydGluZyBkcmFnZ2luZ1xuICAgKiBAcmV0dXJucyBjb29yZHMgb3IgZmFsc2VcbiAgICovXG4gIGRlZmluZU5ld0Nvb3Jkc0RyYWcoZXZlbnQ6IGFueSwgZHJhZ0RhdGE6IGFueSk6IGJvb2xlYW4gfCBDb29yZHMge1xuICAgIGxldCBtaW5pbXVtID0gbnVsbCxcbiAgICAgIG1heGltdW0gPSBudWxsLFxuICAgICAgcHVsbCA9IG51bGw7XG4gICAgY29uc3QgZGVsdGEgPSB0aGlzLmRpZmZlcmVuY2UoZHJhZ0RhdGEucG9pbnRlciwgdGhpcy5wb2ludGVyKGV2ZW50KSksXG4gICAgICBzdGFnZSA9IHRoaXMuZGlmZmVyZW5jZShkcmFnRGF0YS5zdGFnZS5zdGFydCwgZGVsdGEpO1xuXG4gICAgaWYgKCF0aGlzLmlzKCdkcmFnZ2luZycpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MubG9vcCkge1xuICAgICAgbWluaW11bSA9IHRoaXMuY29vcmRpbmF0ZXModGhpcy5taW5pbXVtKCkpO1xuICAgICAgbWF4aW11bSA9ICt0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpICsgMSkgLSBtaW5pbXVtO1xuICAgICAgc3RhZ2UueCA9ICgoKHN0YWdlLnggLSBtaW5pbXVtKSAlIG1heGltdW0gKyBtYXhpbXVtKSAlIG1heGltdW0pICsgbWluaW11bTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWluaW11bSA9IHRoaXMuc2V0dGluZ3MucnRsID8gdGhpcy5jb29yZGluYXRlcyh0aGlzLm1heGltdW0oKSkgOiB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKTtcbiAgICAgIG1heGltdW0gPSB0aGlzLnNldHRpbmdzLnJ0bCA/IHRoaXMuY29vcmRpbmF0ZXModGhpcy5taW5pbXVtKCkpIDogdGhpcy5jb29yZGluYXRlcyh0aGlzLm1heGltdW0oKSk7XG4gICAgICBwdWxsID0gdGhpcy5zZXR0aW5ncy5wdWxsRHJhZyA/IC0xICogZGVsdGEueCAvIDUgOiAwO1xuICAgICAgc3RhZ2UueCA9IE1hdGgubWF4KE1hdGgubWluKHN0YWdlLngsIG1pbmltdW0gKyBwdWxsKSwgbWF4aW11bSArIHB1bGwpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5pc2hlcyBkcmFnZ2luZyBvZiBjYXJvdXNlbCB3aGVuIGB0b3VjaGVuZGAgYW5kIGBtb3VzZXVwYCBldmVudHMgZmlyZS5cbiAgICogQHRvZG8gIzI2MVxuICAgKiBAdG9kbyBUaHJlc2hvbGQgZm9yIGNsaWNrIGV2ZW50XG4gICAqIEBwYXJhbSBldmVudCB0aGUgZXZlbnQgYXJndW1lbnRzLlxuICAgKiBAcGFyYW0gZHJhZ09iaiB0aGUgb2JqZWN0IHdpdGggZHJhZ2dpbmcgc2V0dGluZ3MgYW5kIHN0YXRlc1xuICAgKiBAcGFyYW0gY2xpY2tBdHRhY2hlciBmdW5jdGlvbiB3aGljaCBhdHRhY2hlcyBjbGljayBoYW5kbGVyIHRvIHNsaWRlIG9yIGl0cyBjaGlsZHJlbiBlbGVtZW50cyBpbiBvcmRlciB0byBwcmV2ZW50IGV2ZW50IGJ1YmxpbmdcbiAgICovXG4gIGZpbmlzaERyYWdnaW5nKGV2ZW50OiBhbnksIGRyYWdPYmo6IGFueSwgY2xpY2tBdHRhY2hlcjogKCkgPT4gdm9pZCkge1xuICAgIGNvbnN0IGRlbHRhID0gdGhpcy5kaWZmZXJlbmNlKGRyYWdPYmoucG9pbnRlciwgdGhpcy5wb2ludGVyKGV2ZW50KSksXG4gICAgICBzdGFnZSA9IGRyYWdPYmouc3RhZ2UuY3VycmVudCxcbiAgICAgIGRpcmVjdGlvbiA9IGRlbHRhLnggPiArdGhpcy5zZXR0aW5ncy5ydGwgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgIGxldCBjdXJyZW50U2xpZGVJOiBudW1iZXIsIGN1cnJlbnQ6IG51bWJlciwgbmV3Q3VycmVudDogbnVtYmVyO1xuXG4gICAgaWYgKGRlbHRhLnggIT09IDAgJiYgdGhpcy5pcygnZHJhZ2dpbmcnKSB8fCAhdGhpcy5pcygndmFsaWQnKSkge1xuICAgICAgdGhpcy5zcGVlZCgrdGhpcy5zZXR0aW5ncy5kcmFnRW5kU3BlZWQgfHwgdGhpcy5zZXR0aW5ncy5zbWFydFNwZWVkKTtcbiAgICAgIGN1cnJlbnRTbGlkZUkgPSB0aGlzLmNsb3Nlc3Qoc3RhZ2UueCwgZGVsdGEueCAhPT0gMCA/IGRpcmVjdGlvbiA6IGRyYWdPYmouZGlyZWN0aW9uKTtcbiAgICAgIGN1cnJlbnQgPSB0aGlzLmN1cnJlbnQoKTtcbiAgICAgIG5ld0N1cnJlbnQgPSB0aGlzLmN1cnJlbnQoY3VycmVudFNsaWRlSSA9PT0gLTEgPyB1bmRlZmluZWQgOiBjdXJyZW50U2xpZGVJKTtcblxuICAgICAgaWYgKGN1cnJlbnQgIT09IG5ld0N1cnJlbnQpIHtcbiAgICAgICAgdGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgfVxuXG4gICAgICBkcmFnT2JqLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcblxuICAgICAgaWYgKE1hdGguYWJzKGRlbHRhLngpID4gMyB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGRyYWdPYmoudGltZSA+IDMwMCkge1xuICAgICAgICBjbGlja0F0dGFjaGVyKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdGhpcy5pcygnZHJhZ2dpbmcnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmxlYXZlKCdkcmFnZ2luZycpO1xuICAgIHRoaXMuX3RyaWdnZXIoJ2RyYWdnZWQnKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGNsb3Nlc3QgaXRlbSBmb3IgYSBjb29yZGluYXRlLlxuICAgKiBAdG9kbyBTZXR0aW5nIGBmcmVlRHJhZ2AgbWFrZXMgYGNsb3Nlc3RgIG5vdCByZXVzYWJsZS4gU2VlICMxNjUuXG4gICAqIEBwYXJhbSBjb29yZGluYXRlIFRoZSBjb29yZGluYXRlIGluIHBpeGVsLlxuICAgKiBAcGFyYW0gZGlyZWN0aW9uIFRoZSBkaXJlY3Rpb24gdG8gY2hlY2sgZm9yIHRoZSBjbG9zZXN0IGl0ZW0uIEV0aGVyIGBsZWZ0YCBvciBgcmlnaHRgLlxuICAgKiBAcmV0dXJucyBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGNsb3Nlc3QgaXRlbS5cbiAgICovXG4gIGNsb3Nlc3QoY29vcmRpbmF0ZTogbnVtYmVyLCBkaXJlY3Rpb246IHN0cmluZyk6IG51bWJlciB7XG4gICAgY29uc3QgcHVsbCA9IDMwLFxuICAgICAgd2lkdGggPSB0aGlzLndpZHRoKCk7XG4gICAgbGV0IGNvb3JkaW5hdGVzOiBudW1iZXJbXSA9IHRoaXMuY29vcmRpbmF0ZXMoKSBhcyBudW1iZXJbXSxcbiAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcbiAgICAgIGNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbSA9PT0gMCkge1xuICAgICAgICAgIGl0ZW0gKz0gMC4wMDAwMDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIG9wdGlvbiAnZnJlZURyYWcnIGRvZXNuJ3QgaGF2ZSByZWFsaXphdGlvbiBhbmQgdXNpbmcgaXQgaGVyZSBjcmVhdGVzIHByb2JsZW06XG4gICAgLy8gdmFyaWFibGUgJ3Bvc2l0aW9uJyBzdGF5cyB1bmNoYW5nZWQgKGl0IGVxdWFscyAtMSBhdCB0aGUgYmVnZ2luZykgYW5kIHRodXMgbWV0aG9kIHJldHVybnMgLTFcbiAgICAvLyBSZXR1cm5pbmcgdmFsdWUgaXMgY29uc3VtZWQgYnkgbWV0aG9kIGN1cnJlbnQoKSwgd2hpY2ggdGFraW5nIC0xIGFzIGFyZ3VtZW50IGNhbGN1bGF0ZXMgdGhlIGluZGV4IG9mIG5ldyBjdXJyZW50IHNsaWRlXG4gICAgLy8gSW4gY2FzZSBvZiBoYXZpbmcgNSBzbGlkZXMgYW5zICdsb29wPWZhbHNlOyBjYWxsaW5nICdjdXJyZW50KC0xKScgc2V0cyBwcm9wcyAnX2N1cnJlbnQnIGFzIDQuIEp1c3QgbGFzdCBzbGlkZSByZW1haW5zIHZpc2libGUgaW5zdGVhZCBvZiAzIGxhc3Qgc2xpZGVzLlxuXG4gICAgLy8gaWYgKCF0aGlzLnNldHRpbmdzLmZyZWVEcmFnKSB7XG4gICAgLy8gY2hlY2sgY2xvc2VzdCBpdGVtXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcgJiYgY29vcmRpbmF0ZSA+IGNvb3JkaW5hdGVzW2ldIC0gcHVsbCAmJiBjb29yZGluYXRlIDwgY29vcmRpbmF0ZXNbaV0gKyBwdWxsKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgLy8gb24gYSByaWdodCBwdWxsLCBjaGVjayBvbiBwcmV2aW91cyBpbmRleFxuICAgICAgICAvLyB0byBkbyBzbywgc3VidHJhY3Qgd2lkdGggZnJvbSB2YWx1ZSBhbmQgc2V0IHBvc2l0aW9uID0gaW5kZXggKyAxXG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3JpZ2h0JyAmJiBjb29yZGluYXRlID4gY29vcmRpbmF0ZXNbaV0gLSB3aWR0aCAtIHB1bGwgJiYgY29vcmRpbmF0ZSA8IGNvb3JkaW5hdGVzW2ldIC0gd2lkdGggKyBwdWxsKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaSArIDE7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX29wKGNvb3JkaW5hdGUsICc8JywgY29vcmRpbmF0ZXNbaV0pXG4gICAgICAgICYmIHRoaXMuX29wKGNvb3JkaW5hdGUsICc+JywgY29vcmRpbmF0ZXNbaSArIDFdIHx8IGNvb3JkaW5hdGVzW2ldIC0gd2lkdGgpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gZGlyZWN0aW9uID09PSAnbGVmdCcgPyBpICsgMSA6IGk7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gbnVsbCAmJiBjb29yZGluYXRlID4gY29vcmRpbmF0ZXNbaV0gLSBwdWxsICYmIGNvb3JkaW5hdGUgPCBjb29yZGluYXRlc1tpXSArIHB1bGwpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgfVxuXG4gICAgICBpZiAocG9zaXRpb24gIT09IC0xKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICA7XG4gICAgfVxuICAgIC8vIH1cblxuICAgIGlmICghdGhpcy5zZXR0aW5ncy5sb29wKSB7XG4gICAgICAvLyBub24gbG9vcCBib3VuZHJpZXNcbiAgICAgIGlmICh0aGlzLl9vcChjb29yZGluYXRlLCAnPicsIGNvb3JkaW5hdGVzW3RoaXMubWluaW11bSgpXSkpIHtcbiAgICAgICAgcG9zaXRpb24gPSBjb29yZGluYXRlID0gdGhpcy5taW5pbXVtKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX29wKGNvb3JkaW5hdGUsICc8JywgY29vcmRpbmF0ZXNbdGhpcy5tYXhpbXVtKCldKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGNvb3JkaW5hdGUgPSB0aGlzLm1heGltdW0oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogQW5pbWF0ZXMgdGhlIHN0YWdlLlxuICAgKiBAdG9kbyAjMjcwXG4gICAqIEBwYXJhbSBjb29yZGluYXRlIFRoZSBjb29yZGluYXRlIGluIHBpeGVscy5cbiAgICovXG4gIGFuaW1hdGUoY29vcmRpbmF0ZTogbnVtYmVyIHwgbnVtYmVyW10pIHtcbiAgICBjb25zdCBhbmltYXRlID0gdGhpcy5zcGVlZCgpID4gMDtcblxuICAgIGlmICh0aGlzLmlzKCdhbmltYXRpbmcnKSkge1xuICAgICAgdGhpcy5vblRyYW5zaXRpb25FbmQoKTtcbiAgICB9XG5cbiAgICBpZiAoYW5pbWF0ZSkge1xuICAgICAgdGhpcy5lbnRlcignYW5pbWF0aW5nJyk7XG4gICAgICB0aGlzLl90cmlnZ2VyKCd0cmFuc2xhdGUnKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YWdlRGF0YS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIGNvb3JkaW5hdGUgKyAncHgsMHB4LDBweCknO1xuICAgIHRoaXMuc3RhZ2VEYXRhLnRyYW5zaXRpb24gPSAodGhpcy5zcGVlZCgpIC8gMTAwMCkgKyAncyc7XG5cbiAgICAvLyBhbHNvIHRoZXJlIHdhcyB0cmFuc2l0aW9uIGJ5IG1lYW5zIG9mIEpRdWVyeS5hbmltYXRlIG9yIGNzcy1jaGFuZ2luZyBwcm9wZXJ0eSBsZWZ0XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGNhcm91c2VsIGlzIGluIGEgc3BlY2lmaWMgc3RhdGUgb3Igbm90LlxuICAgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyBUaGUgZmxhZyB3aGljaCBpbmRpY2F0ZXMgaWYgdGhlIGNhcm91c2VsIGlzIGJ1c3kuXG4gICAqL1xuICBpcyhzdGF0ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlXSAmJiB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZV0gPiAwO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBpdGVtLlxuICAgKiBAcGFyYW0gcG9zaXRpb24gVGhlIG5ldyBhYnNvbHV0ZSBwb3NpdGlvbiBvciBub3RoaW5nIHRvIGxlYXZlIGl0IHVuY2hhbmdlZC5cbiAgICogQHJldHVybnMgVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGl0ZW0uXG4gICAqL1xuICBjdXJyZW50KHBvc2l0aW9uPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2l0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uKTtcblxuICAgIGlmICh0aGlzLl9jdXJyZW50ICE9PSBwb3NpdGlvbikge1xuICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLl90cmlnZ2VyKCdjaGFuZ2UnLCB7cHJvcGVydHk6IHtuYW1lOiAncG9zaXRpb24nLCB2YWx1ZTogcG9zaXRpb259fSk7XG5cbiAgICAgIC8vIGlmIChldmVudC5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIFx0cG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShldmVudC5kYXRhKTtcbiAgICAgIC8vIH1cblxuICAgICAgdGhpcy5fY3VycmVudCA9IHBvc2l0aW9uO1xuXG4gICAgICB0aGlzLmludmFsaWRhdGUoJ3Bvc2l0aW9uJyk7XG4gICAgICB0aGlzLl90cmlnZ2VyKCdjaGFuZ2VkJywge3Byb3BlcnR5OiB7bmFtZTogJ3Bvc2l0aW9uJywgdmFsdWU6IHRoaXMuX2N1cnJlbnR9fSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogSW52YWxpZGF0ZXMgdGhlIGdpdmVuIHBhcnQgb2YgdGhlIHVwZGF0ZSByb3V0aW5lLlxuICAgKiBAcGFyYW0gcGFydCBUaGUgcGFydCB0byBpbnZhbGlkYXRlLlxuICAgKiBAcmV0dXJucyBUaGUgaW52YWxpZGF0ZWQgcGFydHMuXG4gICAqL1xuICBpbnZhbGlkYXRlKHBhcnQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBpZiAodHlwZW9mIHBhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9pbnZhbGlkYXRlZFtwYXJ0XSA9IHRydWU7XG4gICAgICBpZiAodGhpcy5pcygndmFsaWQnKSkge1xuICAgICAgICB0aGlzLmxlYXZlKCd2YWxpZCcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5faW52YWxpZGF0ZWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGl0ZW0uXG4gICAqIEBwYXJhbSBwb3NpdGlvbiB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIG5ldyBpdGVtLlxuICAgKi9cbiAgcmVzZXQocG9zaXRpb246IG51bWJlcikge1xuICAgIHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24pO1xuXG4gICAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9zcGVlZCA9IDA7XG4gICAgdGhpcy5fY3VycmVudCA9IHBvc2l0aW9uO1xuXG4gICAgdGhpcy5fc3VwcHJlc3MoWyd0cmFuc2xhdGUnLCAndHJhbnNsYXRlZCddKTtcblxuICAgIHRoaXMuYW5pbWF0ZSh0aGlzLmNvb3JkaW5hdGVzKHBvc2l0aW9uKSk7XG5cbiAgICB0aGlzLl9yZWxlYXNlKFsndHJhbnNsYXRlJywgJ3RyYW5zbGF0ZWQnXSk7XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplcyBhbiBhYnNvbHV0ZSBvciBhIHJlbGF0aXZlIHBvc2l0aW9uIG9mIGFuIGl0ZW0uXG4gICAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgYWJzb2x1dGUgb3IgcmVsYXRpdmUgcG9zaXRpb24gdG8gbm9ybWFsaXplLlxuICAgKiBAcGFyYW0gcmVsYXRpdmUgV2hldGhlciB0aGUgZ2l2ZW4gcG9zaXRpb24gaXMgcmVsYXRpdmUgb3Igbm90LlxuICAgKiBAcmV0dXJucyBUaGUgbm9ybWFsaXplZCBwb3NpdGlvbi5cbiAgICovXG4gIG5vcm1hbGl6ZShwb3NpdGlvbjogbnVtYmVyLCByZWxhdGl2ZT86IGJvb2xlYW4pOiBudW1iZXIge1xuICAgIGNvbnN0IG4gPSB0aGlzLl9pdGVtcy5sZW5ndGgsXG4gICAgICBtID0gcmVsYXRpdmUgPyAwIDogdGhpcy5fY2xvbmVzLmxlbmd0aDtcblxuICAgIGlmICghdGhpcy5faXNOdW1lcmljKHBvc2l0aW9uKSB8fCBuIDwgMSkge1xuICAgICAgcG9zaXRpb24gPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIGlmIChwb3NpdGlvbiA8IDAgfHwgcG9zaXRpb24gPj0gbiArIG0pIHtcbiAgICAgIHBvc2l0aW9uID0gKChwb3NpdGlvbiAtIG0gLyAyKSAlIG4gKyBuKSAlIG4gKyBtIC8gMjtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYW4gYWJzb2x1dGUgcG9zaXRpb24gb2YgYW4gaXRlbSBpbnRvIGEgcmVsYXRpdmUgb25lLlxuICAgKiBAcGFyYW0gcG9zaXRpb24gVGhlIGFic29sdXRlIHBvc2l0aW9uIHRvIGNvbnZlcnQuXG4gICAqIEByZXR1cm5zIFRoZSBjb252ZXJ0ZWQgcG9zaXRpb24uXG4gICAqL1xuICByZWxhdGl2ZShwb3NpdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBwb3NpdGlvbiAtPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMjtcbiAgICByZXR1cm4gdGhpcy5ub3JtYWxpemUocG9zaXRpb24sIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG1heGltdW0gcG9zaXRpb24gZm9yIHRoZSBjdXJyZW50IGl0ZW0uXG4gICAqIEBwYXJhbSByZWxhdGl2ZSBXaGV0aGVyIHRvIHJldHVybiBhbiBhYnNvbHV0ZSBwb3NpdGlvbiBvciBhIHJlbGF0aXZlIHBvc2l0aW9uLlxuICAgKiBAcmV0dXJucyBudW1iZXIgb2YgbWF4aW11bSBwb3NpdGlvblxuICAgKi9cbiAgbWF4aW11bShyZWxhdGl2ZTogYm9vbGVhbiA9IGZhbHNlKTogbnVtYmVyIHtcbiAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3M7XG4gICAgbGV0IG1heGltdW0gPSB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGgsXG4gICAgICBpdGVyYXRvcixcbiAgICAgIHJlY2lwcm9jYWxJdGVtc1dpZHRoLFxuICAgICAgZWxlbWVudFdpZHRoO1xuXG4gICAgaWYgKHNldHRpbmdzLmxvb3ApIHtcbiAgICAgIG1heGltdW0gPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMiArIHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDE7XG4gICAgfSBlbHNlIGlmIChzZXR0aW5ncy5hdXRvV2lkdGggfHwgc2V0dGluZ3MubWVyZ2UpIHtcbiAgICAgIGl0ZXJhdG9yID0gdGhpcy5faXRlbXMubGVuZ3RoO1xuICAgICAgcmVjaXByb2NhbEl0ZW1zV2lkdGggPSB0aGlzLnNsaWRlc0RhdGFbLS1pdGVyYXRvcl0ud2lkdGg7XG4gICAgICBlbGVtZW50V2lkdGggPSB0aGlzLl93aWR0aDtcbiAgICAgIHdoaWxlIChpdGVyYXRvci0tKSB7XG4gICAgICAgIC8vIGl0IGNvdWxkIGJlIHVzZSB0aGlzLl9pdGVtcyBpbnN0ZWFkIG9mIHRoaXMuc2xpZGVzRGF0YTtcbiAgICAgICAgcmVjaXByb2NhbEl0ZW1zV2lkdGggKz0gK3RoaXMuc2xpZGVzRGF0YVtpdGVyYXRvcl0ud2lkdGggKyB0aGlzLnNldHRpbmdzLm1hcmdpbjtcbiAgICAgICAgaWYgKHJlY2lwcm9jYWxJdGVtc1dpZHRoID4gZWxlbWVudFdpZHRoKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG1heGltdW0gPSBpdGVyYXRvciArIDE7XG4gICAgfSBlbHNlIGlmIChzZXR0aW5ncy5jZW50ZXIpIHtcbiAgICAgIG1heGltdW0gPSB0aGlzLl9pdGVtcy5sZW5ndGggLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXhpbXVtID0gdGhpcy5faXRlbXMubGVuZ3RoIC0gc2V0dGluZ3MuaXRlbXM7XG4gICAgfVxuXG4gICAgaWYgKHJlbGF0aXZlKSB7XG4gICAgICBtYXhpbXVtIC09IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyO1xuICAgIH1cblxuICAgIHJldHVybiBNYXRoLm1heChtYXhpbXVtLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBtaW5pbXVtIHBvc2l0aW9uIGZvciB0aGUgY3VycmVudCBpdGVtLlxuICAgKiBAcGFyYW0gcmVsYXRpdmUgV2hldGhlciB0byByZXR1cm4gYW4gYWJzb2x1dGUgcG9zaXRpb24gb3IgYSByZWxhdGl2ZSBwb3NpdGlvbi5cbiAgICogQHJldHVybnMgbnVtYmVyIG9mIG1pbmltdW0gcG9zaXRpb25cbiAgICovXG4gIG1pbmltdW0ocmVsYXRpdmU6IGJvb2xlYW4gPSBmYWxzZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHJlbGF0aXZlID8gMCA6IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYW4gaXRlbSBhdCB0aGUgc3BlY2lmaWVkIHJlbGF0aXZlIHBvc2l0aW9uLlxuICAgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHJlbGF0aXZlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxuICAgKiBAcmV0dXJucyBUaGUgaXRlbSBhdCB0aGUgZ2l2ZW4gcG9zaXRpb24gb3IgYWxsIGl0ZW1zIGlmIG5vIHBvc2l0aW9uIHdhcyBnaXZlbi5cbiAgICovXG4gIGl0ZW1zKHBvc2l0aW9uPzogbnVtYmVyKTogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdIHtcbiAgICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLnNsaWNlKCk7XG4gICAgfVxuXG4gICAgcG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbiwgdHJ1ZSk7XG4gICAgcmV0dXJuIFt0aGlzLl9pdGVtc1twb3NpdGlvbl1dO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYW4gaXRlbSBhdCB0aGUgc3BlY2lmaWVkIHJlbGF0aXZlIHBvc2l0aW9uLlxuICAgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHJlbGF0aXZlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxuICAgKiBAcmV0dXJucyBUaGUgaXRlbSBhdCB0aGUgZ2l2ZW4gcG9zaXRpb24gb3IgYWxsIGl0ZW1zIGlmIG5vIHBvc2l0aW9uIHdhcyBnaXZlbi5cbiAgICovXG4gIG1lcmdlcnMocG9zaXRpb246IG51bWJlcik6IG51bWJlciB8IG51bWJlcltdIHtcbiAgICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX21lcmdlcnMuc2xpY2UoKTtcbiAgICB9XG5cbiAgICBwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uLCB0cnVlKTtcbiAgICByZXR1cm4gdGhpcy5fbWVyZ2Vyc1twb3NpdGlvbl07XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgYWJzb2x1dGUgcG9zaXRpb25zIG9mIGNsb25lcyBmb3IgYW4gaXRlbS5cbiAgICogQHBhcmFtIHBvc2l0aW9uIFRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cbiAgICogQHJldHVybnMgVGhlIGFic29sdXRlIHBvc2l0aW9ucyBvZiBjbG9uZXMgZm9yIHRoZSBpdGVtIG9yIGFsbCBpZiBubyBwb3NpdGlvbiB3YXMgZ2l2ZW4uXG4gICAqL1xuICBjbG9uZXMocG9zaXRpb24/OiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgY29uc3Qgb2RkID0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDIsXG4gICAgICBldmVuID0gb2RkICsgdGhpcy5faXRlbXMubGVuZ3RoLFxuICAgICAgbWFwID0gaW5kZXggPT4gaW5kZXggJSAyID09PSAwID8gZXZlbiArIGluZGV4IC8gMiA6IG9kZCAtIChpbmRleCArIDEpIC8gMjtcblxuICAgIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY2xvbmVzLm1hcCgodiwgaSkgPT4gbWFwKGkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fY2xvbmVzLm1hcCgodiwgaSkgPT4gdiA9PT0gcG9zaXRpb24gPyBtYXAoaSkgOiBudWxsKS5maWx0ZXIoaXRlbSA9PiBpdGVtKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjdXJyZW50IGFuaW1hdGlvbiBzcGVlZC5cbiAgICogQHBhcmFtIHNwZWVkIFRoZSBhbmltYXRpb24gc3BlZWQgaW4gbWlsbGlzZWNvbmRzIG9yIG5vdGhpbmcgdG8gbGVhdmUgaXQgdW5jaGFuZ2VkLlxuICAgKiBAcmV0dXJucyBUaGUgY3VycmVudCBhbmltYXRpb24gc3BlZWQgaW4gbWlsbGlzZWNvbmRzLlxuICAgKi9cbiAgc3BlZWQoc3BlZWQ/OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmIChzcGVlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9zcGVlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjb29yZGluYXRlIG9mIGFuIGl0ZW0uXG4gICAqIEB0b2RvIFRoZSBuYW1lIG9mIHRoaXMgbWV0aG9kIGlzIG1pc3NsZWFuZGluZy5cbiAgICogQHBhcmFtIHBvc2l0aW9uIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSB3aXRoaW4gYG1pbmltdW0oKWAgYW5kIGBtYXhpbXVtKClgLlxuICAgKiBAcmV0dXJucyBUaGUgY29vcmRpbmF0ZSBvZiB0aGUgaXRlbSBpbiBwaXhlbCBvciBhbGwgY29vcmRpbmF0ZXMuXG4gICAqL1xuICBjb29yZGluYXRlcyhwb3NpdGlvbj86IG51bWJlcik6IG51bWJlciB8IG51bWJlcltdIHtcbiAgICBsZXQgbXVsdGlwbGllciA9IDEsXG4gICAgICBuZXdQb3NpdGlvbiA9IHBvc2l0aW9uIC0gMSxcbiAgICAgIGNvb3JkaW5hdGUsXG4gICAgICByZXN1bHQ6IG51bWJlcltdO1xuXG4gICAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX2Nvb3JkaW5hdGVzLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29vcmRpbmF0ZXMoaW5kZXgpIGFzIG51bWJlcjtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLnJ0bCkge1xuICAgICAgICBtdWx0aXBsaWVyID0gLTE7XG4gICAgICAgIG5ld1Bvc2l0aW9uID0gcG9zaXRpb24gKyAxO1xuICAgICAgfVxuXG4gICAgICBjb29yZGluYXRlID0gdGhpcy5fY29vcmRpbmF0ZXNbcG9zaXRpb25dO1xuICAgICAgY29vcmRpbmF0ZSArPSAodGhpcy53aWR0aCgpIC0gY29vcmRpbmF0ZSArICh0aGlzLl9jb29yZGluYXRlc1tuZXdQb3NpdGlvbl0gfHwgMCkpIC8gMiAqIG11bHRpcGxpZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvb3JkaW5hdGUgPSB0aGlzLl9jb29yZGluYXRlc1tuZXdQb3NpdGlvbl0gfHwgMDtcbiAgICB9XG5cbiAgICBjb29yZGluYXRlID0gTWF0aC5jZWlsKGNvb3JkaW5hdGUpO1xuXG4gICAgcmV0dXJuIGNvb3JkaW5hdGU7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgc3BlZWQgZm9yIGEgdHJhbnNsYXRpb24uXG4gICAqIEBwYXJhbSBmcm9tIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgc3RhcnQgaXRlbS5cbiAgICogQHBhcmFtIHRvIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgdGFyZ2V0IGl0ZW0uXG4gICAqIEBwYXJhbSBmYWN0b3IgW2ZhY3Rvcj11bmRlZmluZWRdIC0gVGhlIHRpbWUgZmFjdG9yIGluIG1pbGxpc2Vjb25kcy5cbiAgICogQHJldHVybnMgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNsYXRpb24uXG4gICAqL1xuICBwcml2YXRlIF9kdXJhdGlvbihmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGZhY3Rvcj86IG51bWJlciB8IGJvb2xlYW4pOiBudW1iZXIge1xuICAgIGlmIChmYWN0b3IgPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChNYXRoLmFicyh0byAtIGZyb20pLCAxKSwgNikgKiBNYXRoLmFicygoK2ZhY3RvciB8fCB0aGlzLnNldHRpbmdzLnNtYXJ0U3BlZWQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTbGlkZXMgdG8gdGhlIHNwZWNpZmllZCBpdGVtLlxuICAgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxuICAgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cbiAgICovXG4gIHRvKHBvc2l0aW9uOiBudW1iZXIsIHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XG4gICAgbGV0IGN1cnJlbnQgPSB0aGlzLmN1cnJlbnQoKSxcbiAgICAgIHJldmVydCA9IG51bGwsXG4gICAgICBkaXN0YW5jZSA9IHBvc2l0aW9uIC0gdGhpcy5yZWxhdGl2ZShjdXJyZW50KSxcbiAgICAgIG1heGltdW0gPSB0aGlzLm1heGltdW0oKTtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSArKGRpc3RhbmNlID4gMCkgLSArKGRpc3RhbmNlIDwgMCksXG4gICAgICBpdGVtcyA9IHRoaXMuX2l0ZW1zLmxlbmd0aCxcbiAgICAgIG1pbmltdW0gPSB0aGlzLm1pbmltdW0oKTtcblxuICAgIGlmICh0aGlzLnNldHRpbmdzLmxvb3ApIHtcbiAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5yZXdpbmQgJiYgTWF0aC5hYnMoZGlzdGFuY2UpID4gaXRlbXMgLyAyKSB7XG4gICAgICAgIGRpc3RhbmNlICs9IGRpcmVjdGlvbiAqIC0xICogaXRlbXM7XG4gICAgICB9XG5cbiAgICAgIHBvc2l0aW9uID0gY3VycmVudCArIGRpc3RhbmNlO1xuICAgICAgcmV2ZXJ0ID0gKChwb3NpdGlvbiAtIG1pbmltdW0pICUgaXRlbXMgKyBpdGVtcykgJSBpdGVtcyArIG1pbmltdW07XG5cbiAgICAgIGlmIChyZXZlcnQgIT09IHBvc2l0aW9uICYmIHJldmVydCAtIGRpc3RhbmNlIDw9IG1heGltdW0gJiYgcmV2ZXJ0IC0gZGlzdGFuY2UgPiAwKSB7XG4gICAgICAgIGN1cnJlbnQgPSByZXZlcnQgLSBkaXN0YW5jZTtcbiAgICAgICAgcG9zaXRpb24gPSByZXZlcnQ7XG4gICAgICAgIHRoaXMucmVzZXQoY3VycmVudCk7XG4gICAgICAgIHRoaXMuc2VuZENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuc2V0dGluZ3MucmV3aW5kKSB7XG4gICAgICBtYXhpbXVtICs9IDE7XG4gICAgICBwb3NpdGlvbiA9IChwb3NpdGlvbiAlIG1heGltdW0gKyBtYXhpbXVtKSAlIG1heGltdW07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvc2l0aW9uID0gTWF0aC5tYXgobWluaW11bSwgTWF0aC5taW4obWF4aW11bSwgcG9zaXRpb24pKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc3BlZWQodGhpcy5fZHVyYXRpb24oY3VycmVudCwgcG9zaXRpb24sIHNwZWVkKSk7XG4gICAgICB0aGlzLmN1cnJlbnQocG9zaXRpb24pO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH0sIDApO1xuXG4gIH1cblxuICAvKipcbiAgICogU2xpZGVzIHRvIHRoZSBuZXh0IGl0ZW0uXG4gICAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxuICAgKi9cbiAgbmV4dChzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xuICAgIHNwZWVkID0gc3BlZWQgfHwgZmFsc2U7XG4gICAgdGhpcy50byh0aGlzLnJlbGF0aXZlKHRoaXMuY3VycmVudCgpKSArIDEsIHNwZWVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTbGlkZXMgdG8gdGhlIHByZXZpb3VzIGl0ZW0uXG4gICAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxuICAgKi9cbiAgcHJldihzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xuICAgIHNwZWVkID0gc3BlZWQgfHwgZmFsc2U7XG4gICAgdGhpcy50byh0aGlzLnJlbGF0aXZlKHRoaXMuY3VycmVudCgpKSAtIDEsIHNwZWVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBlbmQgb2YgYW4gYW5pbWF0aW9uLlxuICAgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxuICAgKi9cbiAgb25UcmFuc2l0aW9uRW5kKGV2ZW50PzogYW55KSB7XG4gICAgLy8gaWYgY3NzMiBhbmltYXRpb24gdGhlbiBldmVudCBvYmplY3QgaXMgdW5kZWZpbmVkXG4gICAgaWYgKGV2ZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAvLyAvLyBDYXRjaCBvbmx5IG93bC1zdGFnZSB0cmFuc2l0aW9uRW5kIGV2ZW50XG4gICAgICAvLyBpZiAoKGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50IHx8IGV2ZW50Lm9yaWdpbmFsVGFyZ2V0KSAhPT0gdGhpcy4kc3RhZ2UuZ2V0KDApXHQpIHtcbiAgICAgIC8vIFx0cmV0dXJuIGZhbHNlO1xuICAgICAgLy8gfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLmxlYXZlKCdhbmltYXRpbmcnKTtcbiAgICB0aGlzLl90cmlnZ2VyKCd0cmFuc2xhdGVkJyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB2aWV3cG9ydCB3aWR0aC5cbiAgICogQHJldHVybnMgLSBUaGUgd2lkdGggaW4gcGl4ZWwuXG4gICAqL1xuICBwcml2YXRlIF92aWV3cG9ydCgpOiBudW1iZXIge1xuICAgIGxldCB3aWR0aDtcbiAgICBpZiAodGhpcy5fd2lkdGgpIHtcbiAgICAgIHdpZHRoID0gdGhpcy5fd2lkdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybignQ2FuIG5vdCBkZXRlY3Qgdmlld3BvcnQgd2lkdGguJyk7XG4gICAgfVxuICAgIHJldHVybiB3aWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIF9pdGVtc1xuICAgKiBAcGFyYW0gY29udGVudCBUaGUgbGlzdCBvZiBzbGlkZXMgcHV0IGludG8gQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZXMuXG4gICAqL1xuICBzZXRJdGVtcyhjb250ZW50OiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10pIHtcbiAgICB0aGlzLl9pdGVtcyA9IGNvbnRlbnQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBzbGlkZXNEYXRhIHVzaW5nIHRoaXMuX2l0ZW1zXG4gICAqL1xuICBwcml2YXRlIF9kZWZpbmVTbGlkZXNEYXRhKCkge1xuICAgIC8vIE1heWJlIGNyZWF0aW5nIGFuZCB1c2luZyBsb2FkTWFwIHdvdWxkIGJlIGJldHRlciBpbiBMYXp5TG9hZFNlcnZpY2UuXG4gICAgLy8gSG92ZXdlciBpbiB0aGF0IGNhc2Ugd2hlbiAncmVzaXplJyBldmVudCBmaXJlcywgcHJvcCAnbG9hZCcgb2YgYWxsIHNsaWRlcyB3aWxsIGdldCAnZmFsc2UnIGFuZCBzdWNoIHN0YXRlIG9mIHByb3Agd2lsbCBiZSBzZWVuIGJ5IFZpZXcgZHVyaW5nIGl0cyB1cGRhdGluZy4gQWNjb3JkaW5nbHkgdGhlIGNvZGUgd2lsbCByZW1vdmUgc2xpZGVzJ3MgY29udGVudCBmcm9tIERPTSBldmVuIGlmIGl0IHdhcyBsb2FkZWQgYmVmb3JlLlxuICAgIC8vIFRodXMgaXQgd291bGQgYmUgbmVlZGVkIHRvIGFkZCB0aGF0IGNvbnRlbnQgaW50byBET00gYWdhaW4uXG4gICAgLy8gSW4gb3JkZXIgdG8gYXZvaWQgYWRkaXRpb25hbCByZW1vdmluZy9hZGRpbmcgbG9hZGVkIHNsaWRlcydzIGNvbnRlbnQgd2UgdXNlIGxvYWRNYXAgaGVyZSBhbmQgc2V0IHJlc3RvcmUgc3RhdGUgb2YgcHJvcCAnbG9hZCcgYmVmb3JlIHRoZSBWaWV3IHdpbGwgZ2V0IGl0LlxuICAgIGxldCBsb2FkTWFwOiBNYXA8c3RyaW5nLCBib29sZWFuPjtcblxuICAgIGlmICh0aGlzLnNsaWRlc0RhdGEgJiYgdGhpcy5zbGlkZXNEYXRhLmxlbmd0aCkge1xuICAgICAgbG9hZE1hcCA9IG5ldyBNYXAoKTtcbiAgICAgIHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbS5sb2FkKSB7XG4gICAgICAgICAgbG9hZE1hcC5zZXQoaXRlbS5pZCwgaXRlbS5sb2FkKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLnNsaWRlc0RhdGEgPSB0aGlzLl9pdGVtcy5tYXAoc2xpZGUgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IGAke3NsaWRlLmlkfWAsXG4gICAgICAgIGlzQWN0aXZlOiBmYWxzZSxcbiAgICAgICAgdHBsUmVmOiBzbGlkZS50cGxSZWYsXG4gICAgICAgIGRhdGFNZXJnZTogc2xpZGUuZGF0YU1lcmdlLFxuICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgaXNDbG9uZWQ6IGZhbHNlLFxuICAgICAgICBsb2FkOiBsb2FkTWFwID8gbG9hZE1hcC5nZXQoc2xpZGUuaWQpIDogZmFsc2UsXG4gICAgICAgIGhhc2hGcmFnbWVudDogc2xpZGUuZGF0YUhhc2hcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBjdXJyZW50IGNsYXNzZXMgZm9yIHNsaWRlXG4gICAqIEBwYXJhbSBzbGlkZSBTbGlkZSBvZiBjYXJvdXNlbFxuICAgKiBAcmV0dXJucyBvYmplY3Qgd2l0aCBuYW1lcyBvZiBjc3MtY2xhc3NlcyB3aGljaCBhcmUga2V5cyBhbmQgdHJ1ZS9mYWxzZSB2YWx1ZXNcbiAgICovXG4gIHNldEN1clNsaWRlQ2xhc3NlcyhzbGlkZTogU2xpZGVNb2RlbCk6IHtba2V5OiBzdHJpbmddOiBib29sZWFufSB7XG4gICAgLy8gQ1NTIGNsYXNzZXM6IGFkZGVkL3JlbW92ZWQgcGVyIGN1cnJlbnQgc3RhdGUgb2YgY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICBjb25zdCBjdXJyZW50Q2xhc3Nlczoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0ge1xuICAgICAgJ2FjdGl2ZSc6IHNsaWRlLmlzQWN0aXZlLFxuICAgICAgJ2NlbnRlcic6IHNsaWRlLmlzQ2VudGVyZWQsXG4gICAgICAnY2xvbmVkJzogc2xpZGUuaXNDbG9uZWQsXG4gICAgICAnYW5pbWF0ZWQnOiBzbGlkZS5pc0FuaW1hdGVkLFxuICAgICAgJ293bC1hbmltYXRlZC1pbic6IHNsaWRlLmlzRGVmQW5pbWF0ZWRJbixcbiAgICAgICdvd2wtYW5pbWF0ZWQtb3V0Jzogc2xpZGUuaXNEZWZBbmltYXRlZE91dFxuICAgIH07XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZUluKSB7XG4gICAgICBjdXJyZW50Q2xhc3Nlc1t0aGlzLnNldHRpbmdzLmFuaW1hdGVJbiBhcyBzdHJpbmddID0gc2xpZGUuaXNDdXN0b21BbmltYXRlZEluO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5hbmltYXRlT3V0KSB7XG4gICAgICBjdXJyZW50Q2xhc3Nlc1t0aGlzLnNldHRpbmdzLmFuaW1hdGVPdXQgYXMgc3RyaW5nXSA9IHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRPdXQ7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50Q2xhc3NlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVyYXRvcnMgdG8gY2FsY3VsYXRlIHJpZ2h0LXRvLWxlZnQgYW5kIGxlZnQtdG8tcmlnaHQuXG4gICAqIEBwYXJhbSBhIC0gVGhlIGxlZnQgc2lkZSBvcGVyYW5kLlxuICAgKiBAcGFyYW0gbyAtIFRoZSBvcGVyYXRvci5cbiAgICogQHBhcmFtIGIgLSBUaGUgcmlnaHQgc2lkZSBvcGVyYW5kLlxuICAgKiBAcmV0dXJucyB0cnVlL2ZhbHNlIG1lYW5pbmcgcmlnaHQtdG8tbGVmdCBvciBsZWZ0LXRvLXJpZ2h0XG4gICAqL1xuICBwcml2YXRlIF9vcChhOiBudW1iZXIsIG86IHN0cmluZywgYjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGw7XG4gICAgc3dpdGNoIChvKSB7XG4gICAgICBjYXNlICc8JzpcbiAgICAgICAgcmV0dXJuIHJ0bCA/IGEgPiBiIDogYSA8IGI7XG4gICAgICBjYXNlICc+JzpcbiAgICAgICAgcmV0dXJuIHJ0bCA/IGEgPCBiIDogYSA+IGI7XG4gICAgICBjYXNlICc+PSc6XG4gICAgICAgIHJldHVybiBydGwgPyBhIDw9IGIgOiBhID49IGI7XG4gICAgICBjYXNlICc8PSc6XG4gICAgICAgIHJldHVybiBydGwgPyBhID49IGIgOiBhIDw9IGI7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcnMgYSBwdWJsaWMgZXZlbnQuXG4gICAqIEB0b2RvIFJlbW92ZSBgc3RhdHVzYCwgYHJlbGF0ZWRUYXJnZXRgIHNob3VsZCBiZSB1c2VkIGluc3RlYWQuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBldmVudCBuYW1lLlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgZXZlbnQgZGF0YS5cbiAgICogQHBhcmFtIG5hbWVzcGFjZSBUaGUgZXZlbnQgbmFtZXNwYWNlLlxuICAgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHdoaWNoIGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgZXZlbnQuXG4gICAqIEBwYXJhbSBlbnRlciBJbmRpY2F0ZXMgaWYgdGhlIGNhbGwgZW50ZXJzIHRoZSBzcGVjaWZpZWQgc3RhdGUgb3Igbm90LlxuICAgKi9cbiAgcHJpdmF0ZSBfdHJpZ2dlcihuYW1lOiBzdHJpbmcsIGRhdGE/OiBhbnksIG5hbWVzcGFjZT86IHN0cmluZywgc3RhdGU/OiBzdHJpbmcsIGVudGVyPzogYm9vbGVhbikge1xuICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgY2FzZSAnaW5pdGlhbGl6ZWQnOlxuICAgICAgICB0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJC5uZXh0KG5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NoYW5nZSc6XG4gICAgICAgIHRoaXMuX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkLm5leHQoZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2hhbmdlZCc6XG4gICAgICAgIHRoaXMuX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJC5uZXh0KGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RyYWcnOlxuICAgICAgICB0aGlzLl9kcmFnQ2Fyb3VzZWwkLm5leHQobmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZHJhZ2dlZCc6XG4gICAgICAgIHRoaXMuX2RyYWdnZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXNpemUnOlxuICAgICAgICB0aGlzLl9yZXNpemVDYXJvdXNlbCQubmV4dChuYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXNpemVkJzpcbiAgICAgICAgdGhpcy5fcmVzaXplZENhcm91c2VsJC5uZXh0KG5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JlZnJlc2gnOlxuICAgICAgICB0aGlzLl9yZWZyZXNoQ2Fyb3VzZWwkLm5leHQobmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVmcmVzaGVkJzpcbiAgICAgICAgdGhpcy5fcmVmcmVzaGVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndHJhbnNsYXRlJzpcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlQ2Fyb3VzZWwkLm5leHQobmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndHJhbnNsYXRlZCc6XG4gICAgICAgIHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBFbnRlcnMgYSBzdGF0ZS5cbiAgICogQHBhcmFtIG5hbWUgLSBUaGUgc3RhdGUgbmFtZS5cbiAgICovXG4gIGVudGVyKG5hbWU6IHN0cmluZykge1xuICAgIFtuYW1lXS5jb25jYXQodGhpcy5fc3RhdGVzLnRhZ3NbbmFtZV0gfHwgW10pLmZvckVhY2goKHN0YXRlTmFtZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdID0gMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSsrO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBMZWF2ZXMgYSBzdGF0ZS5cbiAgICogQHBhcmFtIG5hbWUgLSBUaGUgc3RhdGUgbmFtZS5cbiAgICovXG4gIGxlYXZlKG5hbWU6IHN0cmluZykge1xuICAgIFtuYW1lXS5jb25jYXQodGhpcy5fc3RhdGVzLnRhZ3NbbmFtZV0gfHwgW10pLmZvckVhY2goKHN0YXRlTmFtZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0gPT09IDAgfHwgISF0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0tLTtcbiAgICAgIH1cbiAgICB9KVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgb3Igc3RhdGUuXG4gICAqIEBwYXJhbSBvYmplY3QgLSBUaGUgZXZlbnQgb3Igc3RhdGUgdG8gcmVnaXN0ZXIuXG4gICAqL1xuICByZWdpc3RlcihvYmplY3Q6IGFueSkge1xuICAgIGlmIChvYmplY3QudHlwZSA9PT0gVHlwZS5TdGF0ZSkge1xuICAgICAgaWYgKCF0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0pIHtcbiAgICAgICAgdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdID0gb2JqZWN0LnRhZ3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0gPSB0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0uY29uY2F0KG9iamVjdC50YWdzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdID0gdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdLmZpbHRlcigodGFnLCBpKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0uaW5kZXhPZih0YWcpID09PSBpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN1cHByZXNzZXMgZXZlbnRzLlxuICAgKiBAcGFyYW0gZXZlbnRzIFRoZSBldmVudHMgdG8gc3VwcHJlc3MuXG4gICAqL1xuICBwcml2YXRlIF9zdXBwcmVzcyhldmVudHM6IHN0cmluZ1tdKSB7XG4gICAgZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgdGhpcy5fc3VwcmVzc1tldmVudF0gPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbGVhc2VzIHN1cHByZXNzZWQgZXZlbnRzLlxuICAgKiBAcGFyYW0gZXZlbnRzIFRoZSBldmVudHMgdG8gcmVsZWFzZS5cbiAgICovXG4gIHByaXZhdGUgX3JlbGVhc2UoZXZlbnRzOiBzdHJpbmdbXSkge1xuICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9zdXByZXNzW2V2ZW50XTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHVuaWZpZWQgcG9pbnRlciBjb29yZGluYXRlcyBmcm9tIGV2ZW50LlxuICAgKiBAdG9kbyAjMjYxXG4gICAqIEBwYXJhbSBldmVudCBUaGUgYG1vdXNlZG93bmAgb3IgYHRvdWNoc3RhcnRgIGV2ZW50LlxuICAgKiBAcmV0dXJucyBPYmplY3QgQ29vcmRzIHdoaWNoIGNvbnRhaW5zIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzIG9mIGN1cnJlbnQgcG9pbnRlciBwb3NpdGlvbi5cbiAgICovXG4gIHBvaW50ZXIoZXZlbnQ6IGFueSk6IENvb3JkcyB7XG4gICAgY29uc3QgcmVzdWx0ID0ge3g6IG51bGwsIHk6IG51bGx9O1xuXG4gICAgZXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcblxuICAgIGV2ZW50ID0gZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aCA/XG4gICAgICBldmVudC50b3VjaGVzWzBdIDogZXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID9cbiAgICAgICAgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0gOiBldmVudDtcblxuICAgIGlmIChldmVudC5wYWdlWCkge1xuICAgICAgcmVzdWx0LnggPSBldmVudC5wYWdlWDtcbiAgICAgIHJlc3VsdC55ID0gZXZlbnQucGFnZVk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC54ID0gZXZlbnQuY2xpZW50WDtcbiAgICAgIHJlc3VsdC55ID0gZXZlbnQuY2xpZW50WTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIHNvbWV0aGluZyB0aGF0IGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXG4gICAqIEBwYXJhbSBudW1iZXIgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxuICAgKiBAcmV0dXJucyBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxuICAgKi9cbiAgcHJpdmF0ZSBfaXNOdW1lcmljKG51bWJlcjogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG51bWJlcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciB2YWx1ZSBpcyBudW1iZXIgb3IgYm9vbGVhbiB0eXBlXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXG4gICAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyLCBvciBCb29sZWFuXG4gICAqL1xuICBwcml2YXRlIF9pc051bWJlck9yQm9vbGVhbih2YWx1ZTogbnVtYmVyIHwgYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc051bWVyaWModmFsdWUpIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciB2YWx1ZSBpcyBudW1iZXIgb3Igc3RyaW5nIHR5cGVcbiAgICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcbiAgICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXIsIG9yIFN0cmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBfaXNOdW1iZXJPclN0cmluZyh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzTnVtZXJpYyh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdmFsdWUgaXMgbnVtYmVyIG9yIHN0cmluZyB0eXBlXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXG4gICAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyLCBvciBTdHJpbmdcbiAgICovXG4gIHByaXZhdGUgX2lzU3RyaW5nT3JCb29sZWFuKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkaWZmZXJlbmNlIG9mIHR3byB2ZWN0b3JzLlxuICAgKiBAdG9kbyAjMjYxXG4gICAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgdmVjdG9yLlxuICAgKiBAcGFyYW0gc2Vjb25kLSBUaGUgc2Vjb25kIHZlY3Rvci5cbiAgICogQHJldHVybnMgVGhlIGRpZmZlcmVuY2UuXG4gICAqL1xuICBkaWZmZXJlbmNlKGZpcnN0OiBDb29yZHMsIHNlY29uZDogQ29vcmRzKTogQ29vcmRzIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogZmlyc3QueCAtIHNlY29uZC54LFxuICAgICAgeTogZmlyc3QueSAtIHNlY29uZC55XG4gICAgfTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdkRhdGEsIERvdHNEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL25hdmlnYXRpb24tZGF0YS5tb2RlbHMnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSB9IGZyb20gJy4uL2Nhcm91c2VsL2Nhcm91c2VsLm1vZHVsZSc7XG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZSB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9tZXJnZSc7XG5pbXBvcnQgeyB0YXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE93bE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogU3Vic2NyaW9wdGlvbiB0byBtZXJnZSBPYnNlcnZhYmxlICBmcm9tIENhcm91c2VsU2VydmljZVxuICAgKi9cbiAgbmF2U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwbHVnaW4gaXMgaW5pdGlhbGl6ZWQgb3Igbm90LlxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBwYWdpbmcgaW5kZXhlcy5cbiAgICovXG4gIHByb3RlY3RlZCBfcGFnZXM6IGFueVtdID0gW107XG5cbiAgLyoqXG4gICAqIERhdGEgZm9yIG5hdmlnYXRpb24gZWxlbWVudHMgb2YgdGhlIHVzZXIgaW50ZXJmYWNlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9uYXZEYXRhOiBOYXZEYXRhID0ge1xuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBwcmV2OiB7XG4gICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICBodG1sVGV4dDogJydcbiAgICB9LFxuICAgIG5leHQ6IHtcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIGh0bWxUZXh0OiAnJ1xuICAgIH0sXG4gIH07XG5cbiAgLyoqXG4gICAqIERhdGEgZm9yIGRvdCBlbGVtZW50cyBvZiB0aGUgdXNlciBpbnRlcmZhY2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2RvdHNEYXRhOiBEb3RzRGF0YSA9IHtcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgZG90czogW11cbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlKSB7XG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5uYXZTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXG4gICAqL1xuICBzcHlEYXRhU3RyZWFtcygpIHtcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoc3RhdGUgPT4ge1xuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlTmF2UGFnZXMoKTtcbiAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICAvLyBtb3N0bHkgY2hhbmdlcyBpbiBjYXJvdXNlbFNlcnZpY2UgYW5kIGNhcm91c2VsIGF0IGFsbCBjYXVzZXMgY2Fyb3VzZWxTZXJ2aWNlLnRvKCkuIEl0IG1vdmVzIHN0YWdlIHJpZ2h0LWxlZnQgYnkgaXRzIGNvZGUgYW5kIGNhbGxpbmcgbmVlZGVkIGZ1bmN0aW9uc1xuICAgIC8vIFRodXMgdGhpcyBtZXRob2QgYnkgY2FsbGluZyBjYXJvdXNlbFNlcnZpY2UuY3VycmVudChwb3NpdGlvbikgbm90aWZpZXMgYWJvdXQgY2hhbmdlc1xuICAgIGNvbnN0IGNoYW5nZWRTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZWRTdGF0ZSgpLnBpcGUoXG4gICAgICBmaWx0ZXIoZGF0YSA9PiBkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpLFxuICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAvLyBzaG91bGQgYmUgdGhlIGNhbGwgb2YgdGhlIGZ1bmN0aW9uIHdyaXR0ZW4gYXQgdGhlIGVuZCBvZiBjb21tZW50XG4gICAgICAgIC8vIGJ1dCB0aGUgbWV0aG9kIGNhcm91c2VsU2Vydml2ZS50bygpIGhhcyBzZXRUaW1lb3V0KGYsIDApIHdoaWNoIGNvbnRhaW5zIGNhcm91c2VsU2Vydml2ZS51cGRhdGUoKSB3aGljaCBjYWxscyBzZW5kQ2hhbmdlcygpIG1ldGhvZC5cbiAgICAgICAgLy8gY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgYW5kIGNhcm91c2VsU2VydmljZS5kb3RzRGF0YSB1cGRhdGUgZWFybGllciB0aGFuIGNhcm91c2VsU2Vydml2ZS51cGRhdGUoKSBnZXRzIGNhbGxlZFxuICAgICAgICAvLyB1cGRhdGVzIG9mIGNhcm91c2VsU2VydmljZS5uYXZEYXRhIGFuZCBjYXJvdXNlbFNlcnZpY2UuZG90c0RhdGEgYXJlIGJlaW5nIGhhcHBlbmluZyB3aXRoaW5nIGNhcm91c2VsU2VydmljZS5jdXJyZW50KHBvc2l0aW9uKSBtZXRob2Qgd2hpY2ggY2FsbHMgbmV4dCgpIG9mIF9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCRcbiAgICAgICAgLy8gY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQocG9zaXRpb24pIGlzIGJlaW5nIGNhbGxpbmcgZWFybGllciB0aGFuIGNhcm91c2VsU2Vydml2ZS51cGRhdGUoKTtcbiAgICAgICAgLy8gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2VuZENoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IHJlZnJlc2hlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0UmVmcmVzaGVkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgdGhpcy5fdXBkYXRlTmF2UGFnZXMoKTtcbiAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCBuYXZNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IG1lcmdlKGluaXRpYWxpemVkQ2Fyb3VzZWwkLCBjaGFuZ2VkU2V0dGluZ3MkLCByZWZyZXNoZWRDYXJvdXNlbCQpO1xuICAgIHRoaXMubmF2U3Vic2NyaXB0aW9uID0gbmF2TWVyZ2UkLnN1YnNjcmliZShcbiAgICAgICgpID0+IHt9XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuXHQgKiBJbml0aWFsaXplcyB0aGUgbGF5b3V0IG9mIHRoZSBwbHVnaW4gYW5kIGV4dGVuZHMgdGhlIGNhcm91c2VsLlxuXHQgKi9cblx0aW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLl9uYXZEYXRhLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9uYXZEYXRhLnByZXYuaHRtbFRleHQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5uYXZUZXh0WzBdO1xuICAgIHRoaXMuX25hdkRhdGEubmV4dC5odG1sVGV4dCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLm5hdlRleHRbMV07XG5cbiAgICB0aGlzLl9kb3RzRGF0YS5kaXNhYmxlZCA9IHRydWU7XG5cbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5uYXZEYXRhID0gdGhpcy5fbmF2RGF0YTtcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5kb3RzRGF0YSA9IHRoaXMuX2RvdHNEYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgaW50ZXJuYWwgc3RhdGVzIGFuZCB1cGRhdGVzIHByb3AgX3BhZ2VzXG4gICAqL1xuXHRwcml2YXRlIF91cGRhdGVOYXZQYWdlcygpIHtcblx0XHRsZXQgaTogbnVtYmVyLCBqOiBudW1iZXIsIGs6IG51bWJlcjtcblx0XHRjb25zdCBsb3dlcjogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY2xvbmVzKCkubGVuZ3RoIC8gMixcbiAgICAgIHVwcGVyOiBudW1iZXIgPSBsb3dlciArIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLml0ZW1zKCkubGVuZ3RoLFxuICAgICAgbWF4aW11bTogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UubWF4aW11bSh0cnVlKSxcbiAgICAgIHBhZ2VzOiBhbnlbXSA9IFtdLFxuICAgICAgc2V0dGluZ3M6IE93bE9wdGlvbnMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncztcbiAgICAgbGV0IHNpemUgPSBzZXR0aW5ncy5jZW50ZXIgfHwgc2V0dGluZ3MuYXV0b1dpZHRoIHx8IHNldHRpbmdzLmRvdHNEYXRhXG4gICAgICAgID8gMSA6IHNldHRpbmdzLmRvdHNFYWNoIHx8IHNldHRpbmdzLml0ZW1zO1xuICAgICAgc2l6ZSA9ICtzaXplO1xuXHRcdGlmIChzZXR0aW5ncy5zbGlkZUJ5ICE9PSAncGFnZScpIHtcblx0XHRcdHNldHRpbmdzLnNsaWRlQnkgPSBNYXRoLm1pbigrc2V0dGluZ3Muc2xpZGVCeSwgc2V0dGluZ3MuaXRlbXMpO1xuXHRcdH1cblxuXHRcdGlmIChzZXR0aW5ncy5kb3RzIHx8IHNldHRpbmdzLnNsaWRlQnkgPT09ICdwYWdlJykge1xuXG5cdFx0XHRmb3IgKGkgPSBsb3dlciwgaiA9IDAsIGsgPSAwOyBpIDwgdXBwZXI7IGkrKykge1xuXHRcdFx0XHRpZiAoaiA+PSBzaXplIHx8IGogPT09IDApIHtcblx0XHRcdFx0XHRwYWdlcy5wdXNoKHtcblx0XHRcdFx0XHRcdHN0YXJ0OiBNYXRoLm1pbihtYXhpbXVtLCBpIC0gbG93ZXIpLFxuXHRcdFx0XHRcdFx0ZW5kOiBpIC0gbG93ZXIgKyBzaXplIC0gMVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGlmIChNYXRoLm1pbihtYXhpbXVtLCBpIC0gbG93ZXIpID09PSBtYXhpbXVtKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aiA9IDAsICsraztcblx0XHRcdFx0fVxuXHRcdFx0XHRqICs9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1lcmdlcnModGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUoaSkpIGFzIG51bWJlcjtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fcGFnZXMgPSBwYWdlcztcblx0fVxuXG4gIC8qKlxuXHQgKiBEcmF3cyB0aGUgdXNlciBpbnRlcmZhY2UuXG5cdCAqIEB0b2RvIFRoZSBvcHRpb24gYGRvdHNEYXRhYCB3b250IHdvcmsuXG5cdCAqL1xuICBkcmF3KCkge1xuXHRcdGxldCBkaWZmZXJlbmNlOiBudW1iZXI7XG4gICAgY29uc3RcdHNldHRpbmdzOiBPd2xPcHRpb25zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MsXG4gICAgICBpdGVtczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXRlbXMoKSxcbiAgICAgIGRpc2FibGVkID0gaXRlbXMubGVuZ3RoIDw9IHNldHRpbmdzLml0ZW1zO1xuXG5cdFx0dGhpcy5fbmF2RGF0YS5kaXNhYmxlZCA9ICFzZXR0aW5ncy5uYXYgfHwgZGlzYWJsZWQ7XG5cdFx0dGhpcy5fZG90c0RhdGEuZGlzYWJsZWQgPSAhc2V0dGluZ3MuZG90cyB8fCBkaXNhYmxlZDtcblxuXHRcdGlmIChzZXR0aW5ncy5kb3RzKSB7XG5cdFx0XHRkaWZmZXJlbmNlID0gdGhpcy5fcGFnZXMubGVuZ3RoIC0gdGhpcy5fZG90c0RhdGEuZG90cy5sZW5ndGg7XG5cblx0XHRcdGlmIChzZXR0aW5ncy5kb3RzRGF0YSAmJiBkaWZmZXJlbmNlICE9PSAwKSB7XG4gICAgICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMgPSBbXTtcbiAgICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzLnB1c2goe1xuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIGlkOiBgZG90LSR7aXRlbS5pZH1gLFxuICAgICAgICAgICAgaW5uZXJDb250ZW50OiBpdGVtLmRvdENvbnRlbnQsXG4gICAgICAgICAgICBzaG93SW5uZXJDb250ZW50OiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXHRcdFx0fSBlbHNlIGlmIChkaWZmZXJlbmNlID4gMCkge1xuICAgICAgICBjb25zdCBzdGFydEk6IG51bWJlciA9IHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoID4gMCA/IHRoaXMuX2RvdHNEYXRhLmRvdHMubGVuZ3RoIDogMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWZmZXJlbmNlOyBpKyspIHtcbiAgICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzLnB1c2goe1xuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIGlkOiBgZG90LSR7aSArIHN0YXJ0SX1gLFxuICAgICAgICAgICAgc2hvd0lubmVyQ29udGVudDogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdFx0fSBlbHNlIGlmIChkaWZmZXJlbmNlIDwgMCkge1xuICAgICAgICB0aGlzLl9kb3RzRGF0YS5kb3RzLnNwbGljZShkaWZmZXJlbmNlLCBNYXRoLmFicyhkaWZmZXJlbmNlKSlcblx0XHRcdH1cbiAgICB9XG5cbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5uYXZEYXRhID0gdGhpcy5fbmF2RGF0YTtcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5kb3RzRGF0YSA9IHRoaXMuX2RvdHNEYXRhO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVcGRhdGVzIG5hdmlnYXRpb24gYnV0dG9ucydzIGFuZCBkb3RzJ3Mgc3RhdGVzXG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5fdXBkYXRlTmF2QnV0dG9ucygpO1xuICAgIHRoaXMuX3VwZGF0ZURvdHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2VzIHN0YXRlIG9mIG5hdiBidXR0b25zIChkaXNhYmxlZCwgZW5hYmxlZClcbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZU5hdkJ1dHRvbnMoKSB7XG4gICAgY29uc3RcdHNldHRpbmdzOiBPd2xPcHRpb25zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MsXG4gICAgICBsb29wOiBib29sZWFuID0gc2V0dGluZ3MubG9vcCB8fCBzZXR0aW5ncy5yZXdpbmQsXG4gICAgICBpbmRleDogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcblxuICAgIGlmIChzZXR0aW5ncy5uYXYpIHtcbiAgICAgIHRoaXMuX25hdkRhdGEucHJldi5kaXNhYmxlZCA9ICFsb29wICYmIGluZGV4IDw9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm1pbmltdW0odHJ1ZSk7XG5cdFx0XHR0aGlzLl9uYXZEYXRhLm5leHQuZGlzYWJsZWQgPSAhbG9vcCAmJiBpbmRleCA+PSB0aGlzLmNhcm91c2VsU2VydmljZS5tYXhpbXVtKHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm5hdkRhdGEgPSB0aGlzLl9uYXZEYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgYWN0aXZlIGRvdCBpZiBwYWdlIGJlY29tZXMgY2hhbmdlZFxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlRG90cygpIHtcbiAgICBsZXQgY3VyQWN0aXZlRG90STogbnVtYmVyO1xuICAgIHRoaXMuX2RvdHNEYXRhLmRvdHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLmFjdGl2ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBjdXJBY3RpdmVEb3RJID0gdGhpcy5fY3VycmVudCgpO1xuICAgIGlmICh0aGlzLl9kb3RzRGF0YS5kb3RzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fZG90c0RhdGEuZG90c1tjdXJBY3RpdmVEb3RJXS5hY3RpdmUgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5kb3RzRGF0YSA9IHRoaXMuX2RvdHNEYXRhO1xuICB9XG5cbiAgLyoqXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgcGFnZSBwb3NpdGlvbiBvZiB0aGUgY2Fyb3VzZWwuXG5cdCAqIEByZXR1cm5zIHRoZSBjdXJyZW50IHBhZ2UgcG9zaXRpb24gb2YgdGhlIGNhcm91c2VsXG5cdCAqL1xuXHRwcml2YXRlIF9jdXJyZW50KCk6IGFueSB7XG4gICAgY29uc3QgY3VycmVudDogbnVtYmVyID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKTtcbiAgICBsZXQgZmluYWxDdXJyZW50OiBudW1iZXI7XG4gICAgY29uc3QgcGFnZXM6IGFueSA9IHRoaXMuX3BhZ2VzLmZpbHRlcigocGFnZSwgaW5kZXgpID0+IHtcbiAgICAgIHJldHVybiBwYWdlLnN0YXJ0IDw9IGN1cnJlbnQgJiYgcGFnZS5lbmQgPj0gY3VycmVudDtcbiAgICB9KS5wb3AoKTtcblxuICAgIGZpbmFsQ3VycmVudCA9IHRoaXMuX3BhZ2VzLmZpbmRJbmRleChwYWdlID0+IHtcbiAgICAgIHJldHVybiBwYWdlLnN0YXJ0ID09PSBwYWdlcy5zdGFydCAmJiBwYWdlLmVuZCA9PT0gcGFnZXMuZW5kO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbmFsQ3VycmVudDtcbiAgfTtcblxuICAvKipcblx0ICogR2V0cyB0aGUgY3VycmVudCBzdWNjZXNvci9wcmVkZWNlc3NvciBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHN1c3Nlc3NvciBwb3NpdGlvbiBvZiBzbGlkZVxuXHQgKiBAcmV0dXJucyB0aGUgY3VycmVudCBzdWNjZXNvci9wcmVkZWNlc3NvciBwb3NpdGlvblxuXHQgKi9cblx0cHJpdmF0ZSBfZ2V0UG9zaXRpb24oc3VjY2Vzc29yOiBudW1iZXIgfCBib29sZWFuKTogbnVtYmVyIHtcblx0XHRsZXQgcG9zaXRpb246IG51bWJlciwgbGVuZ3RoOiBudW1iZXI7XG5cdFx0Y29uc3RcdHNldHRpbmdzOiBPd2xPcHRpb25zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3M7XG5cblx0XHRpZiAoc2V0dGluZ3Muc2xpZGVCeSA9PT0gJ3BhZ2UnKSB7XG5cdFx0XHRwb3NpdGlvbiA9IHRoaXMuX2N1cnJlbnQoKTtcblx0XHRcdGxlbmd0aCA9IHRoaXMuX3BhZ2VzLmxlbmd0aDtcblx0XHRcdHN1Y2Nlc3NvciA/ICsrcG9zaXRpb24gOiAtLXBvc2l0aW9uO1xuXHRcdFx0cG9zaXRpb24gPSB0aGlzLl9wYWdlc1soKHBvc2l0aW9uICUgbGVuZ3RoKSArIGxlbmd0aCkgJSBsZW5ndGhdLnN0YXJ0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSk7XG5cdFx0XHRsZW5ndGggPSB0aGlzLmNhcm91c2VsU2VydmljZS5pdGVtcygpLmxlbmd0aDtcblx0XHRcdHN1Y2Nlc3NvciA/IHBvc2l0aW9uICs9ICtzZXR0aW5ncy5zbGlkZUJ5IDogcG9zaXRpb24gLT0gK3NldHRpbmdzLnNsaWRlQnk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHBvc2l0aW9uO1xuICB9O1xuXG4gIC8qKlxuXHQgKiBTbGlkZXMgdG8gdGhlIG5leHQgaXRlbSBvciBwYWdlLlxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cblx0ICovXG5cdG5leHQoc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS50byh0aGlzLl9nZXRQb3NpdGlvbih0cnVlKSwgc3BlZWQpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTbGlkZXMgdG8gdGhlIHByZXZpb3VzIGl0ZW0gb3IgcGFnZS5cblx0ICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXG5cdCAqL1xuXHRwcmV2KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UudG8odGhpcy5fZ2V0UG9zaXRpb24oZmFsc2UpLCBzcGVlZCk7XG4gIH07XG5cbiBcdC8qKlxuXHQgKiBTbGlkZXMgdG8gdGhlIHNwZWNpZmllZCBpdGVtIG9yIHBhZ2UuXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiAtIFRoZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSBvciBwYWdlLlxuXHQgKiBAcGFyYW0gc3BlZWQgLSBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxuXHQgKiBAcGFyYW0gc3RhbmRhcmQgLSBXaGV0aGVyIHRvIHVzZSB0aGUgc3RhbmRhcmQgYmVoYXZpb3VyIG9yIG5vdC4gRGVmYXVsdCBtZWFuaW5nIGZhbHNlXG5cdCAqL1xuXHR0byhwb3NpdGlvbjogbnVtYmVyLCBzcGVlZDogbnVtYmVyIHwgYm9vbGVhbiwgc3RhbmRhcmQ/OiBib29sZWFuKSB7XG5cdFx0bGV0IGxlbmd0aDogbnVtYmVyO1xuXHRcdGlmICghc3RhbmRhcmQgJiYgdGhpcy5fcGFnZXMubGVuZ3RoKSB7XG4gICAgICBsZW5ndGggPSB0aGlzLl9wYWdlcy5sZW5ndGg7XG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS50byh0aGlzLl9wYWdlc1soKHBvc2l0aW9uICUgbGVuZ3RoKSArIGxlbmd0aCkgJSBsZW5ndGhdLnN0YXJ0LCBzcGVlZCk7XG5cdFx0fSBlbHNlIHtcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHBvc2l0aW9uLCBzcGVlZCk7XG5cdFx0fVxuICB9O1xuXG4gIC8qKlxuICAgKiBNb3ZlcyBjYXJvdXNlbCBhZnRlciB1c2VyJ3MgY2xpY2tpbmcgb24gYW55IGRvdHNcbiAgICovXG4gIG1vdmVCeURvdChkb3RJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMuX2RvdHNEYXRhLmRvdHMuZmluZEluZGV4KGRvdCA9PiBkb3RJZCA9PT0gZG90LmlkKTtcbiAgICB0aGlzLnRvKGluZGV4LCB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5kb3RzU3BlZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJld2luZHMgY2Fyb3VzZWwgdG8gc2xpZGUgd2l0aCBuZWVkZWQgaWRcbiAgICogQHBhcmFtIGlkIGlkIG9mIHNsaWRlXG4gICAqL1xuICB0b1NsaWRlQnlJZChpZDogc3RyaW5nKSB7XG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZpbmRJbmRleChzbGlkZSA9PiBzbGlkZS5pZCA9PT0gaWQgJiYgc2xpZGUuaXNDbG9uZWQgPT09IGZhbHNlKTtcblxuICAgIGlmIChwb3NpdGlvbiA9PT0gLTEgfHwgcG9zaXRpb24gPT09IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHBvc2l0aW9uKSwgZmFsc2UpO1xuICB9XG5cbn1cbiIsIi8vIGltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIGZ1bmN0aW9uIF93aW5kb3coKTogYW55IHtcbi8vICAgIC8vIHJldHVybiB0aGUgZ2xvYmFsIG5hdGl2ZSBicm93c2VyIHdpbmRvdyBvYmplY3Rcbi8vICAgIHJldHVybiB3aW5kb3c7XG4vLyB9XG4vLyBASW5qZWN0YWJsZSgpXG4vLyBleHBvcnQgY2xhc3MgV2luZG93UmVmU2VydmljZSB7XG4vLyAgICBnZXQgbmF0aXZlV2luZG93KCk6IGFueSB7XG4vLyAgICAgICByZXR1cm4gX3dpbmRvdygpO1xuLy8gICAgfVxuLy8gfVxuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDbGFzc1Byb3ZpZGVyLFxuICBGYWN0b3J5UHJvdmlkZXIsXG4gIEluamVjdGlvblRva2VuLFxuICBQTEFURk9STV9JRFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5qZWN0aW9uIHRva2VuIGZvciBpbmplY3RpbmcgdGhlIHdpbmRvdyBpbnRvIGEgY29tcG9uZW50LlxuICovXG5leHBvcnQgY29uc3QgV0lORE9XID0gbmV3IEluamVjdGlvblRva2VuKCdXaW5kb3dUb2tlbicpO1xuXG4vKipcbiAqIERlZmluZSBhYnN0cmFjdCBjbGFzcyBmb3Igb2J0YWluaW5nIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIHdpbmRvdyBvYmplY3QuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXaW5kb3dSZWYge1xuICBnZXQgbmF0aXZlV2luZG93KCk6IFdpbmRvdyB8IE9iamVjdCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQuJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZpbmUgY2xhc3MgdGhhdCBpbXBsZW1lbnRzIHRoZSBhYnN0cmFjdCBjbGFzcyBhbmQgcmV0dXJucyB0aGUgbmF0aXZlIHdpbmRvdyBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBCcm93c2VyV2luZG93UmVmIGV4dGVuZHMgV2luZG93UmVmIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB3aW5kb3cgb2JqZWN0XG4gICAqL1xuICBnZXQgbmF0aXZlV2luZG93KCk6IFdpbmRvdyB8IE9iamVjdCB7XG4gICAgcmV0dXJuIHdpbmRvdztcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBmYWN0b3J5IGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbmF0aXZlIHdpbmRvdyBvYmplY3QuXG4gKiBAcGFyYW0gYnJvd3NlcldpbmRvd1JlZiBOYXRpdmUgd2luZG93IG9iamVjdFxuICogQHBhcmFtIHBsYXRmb3JtSWQgaWQgb2YgcGxhdGZvcm1cbiAqIEByZXR1cm5zIHR5cGUgb2YgcGxhdGZvcm0gb2YgZW1wdHkgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dGYWN0b3J5KFxuICBicm93c2VyV2luZG93UmVmOiBCcm93c2VyV2luZG93UmVmLFxuICBwbGF0Zm9ybUlkOiBPYmplY3Rcbik6IFdpbmRvdyB8IE9iamVjdCB7XG4gIGlmIChpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKSkge1xuICAgIHJldHVybiBicm93c2VyV2luZG93UmVmLm5hdGl2ZVdpbmRvdztcbiAgfVxuICByZXR1cm4gbmV3IE9iamVjdCgpO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGluamVjdGFibGUgcHJvdmlkZXIgZm9yIHRoZSBXaW5kb3dSZWYgdG9rZW4gdGhhdCB1c2VzIHRoZSBCcm93c2VyV2luZG93UmVmIGNsYXNzLlxuICovXG5leHBvcnQgY29uc3QgYnJvd3NlcldpbmRvd1Byb3ZpZGVyOiBDbGFzc1Byb3ZpZGVyID0ge1xuICBwcm92aWRlOiBXaW5kb3dSZWYsXG4gIHVzZUNsYXNzOiBCcm93c2VyV2luZG93UmVmXG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbmplY3RhYmxlIHByb3ZpZGVyIHRoYXQgdXNlcyB0aGUgd2luZG93RmFjdG9yeSBmdW5jdGlvbiBmb3IgcmV0dXJuaW5nIHRoZSBuYXRpdmUgd2luZG93IG9iamVjdC5cbiAqL1xuZXhwb3J0IGNvbnN0IHdpbmRvd1Byb3ZpZGVyOiBGYWN0b3J5UHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IFdJTkRPVyxcbiAgdXNlRmFjdG9yeTogd2luZG93RmFjdG9yeSxcbiAgZGVwczogW1dpbmRvd1JlZiwgUExBVEZPUk1fSURdXG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbiBhcnJheSBvZiBwcm92aWRlcnMuXG4gKi9cbmV4cG9ydCBjb25zdCBXSU5ET1dfUFJPVklERVJTID0gW2Jyb3dzZXJXaW5kb3dQcm92aWRlciwgd2luZG93UHJvdmlkZXJdO1xuIiwiaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ2xhc3NQcm92aWRlcixcbiAgRmFjdG9yeVByb3ZpZGVyLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgUExBVEZPUk1fSUQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbmplY3Rpb24gdG9rZW4gZm9yIGluamVjdGluZyB0aGUgRG9jdW1lbnQgaW50byBhIGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGNvbnN0IERPQ1VNRU5UID0gbmV3IEluamVjdGlvblRva2VuPERvY3VtZW50PignRG9jdW1lbnRUb2tlbicpO1xuLyoqXG4gKiBEZWZpbmUgYWJzdHJhY3QgY2xhc3MgZm9yIG9idGFpbmluZyByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBEb2N1bWVudCBvYmplY3QuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEb2N1bWVudFJlZiB7XG4gIGdldCBuYXRpdmVEb2N1bWVudCgpOiBEb2N1bWVudCB8IE9iamVjdCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQuJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZpbmUgY2xhc3MgdGhhdCBpbXBsZW1lbnRzIHRoZSBhYnN0cmFjdCBjbGFzcyBhbmQgcmV0dXJucyB0aGUgbmF0aXZlIERvY3VtZW50IG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIEJyb3dzZXJEb2N1bWVudFJlZiBleHRlbmRzIERvY3VtZW50UmVmIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyBEb2N1bWVudCBvYmplY3RcbiAgICovXG4gIGdldCBuYXRpdmVEb2N1bWVudCgpOiBEb2N1bWVudCB8IE9iamVjdCB7XG4gICAgcmV0dXJuIGRvY3VtZW50O1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIGZhY3RvcnkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuYXRpdmUgRG9jdW1lbnQgb2JqZWN0LlxuICogQHBhcmFtIGJyb3dzZXJEb2N1bWVudFJlZiBOYXRpdmUgRG9jdW1lbnQgb2JqZWN0XG4gKiBAcGFyYW0gcGxhdGZvcm1JZCBpZCBvZiBwbGF0Zm9ybVxuICogQHJldHVybnMgdHlwZSBvZiBwbGF0Zm9ybSBvZiBlbXB0eSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRvY3VtZW50RmFjdG9yeShcbiAgYnJvd3NlckRvY3VtZW50UmVmOiBCcm93c2VyRG9jdW1lbnRSZWYsXG4gIHBsYXRmb3JtSWQ6IE9iamVjdFxuKTogRG9jdW1lbnQgfCBPYmplY3Qge1xuICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkpIHtcbiAgICByZXR1cm4gYnJvd3NlckRvY3VtZW50UmVmLm5hdGl2ZURvY3VtZW50O1xuICB9XG4gIHJldHVybiBuZXcgT2JqZWN0KCk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgaW5qZWN0YWJsZSBwcm92aWRlciBmb3IgdGhlIERvY3VtZW50UmVmIHRva2VuIHRoYXQgdXNlcyB0aGUgQnJvd3NlckRvY3VtZW50UmVmIGNsYXNzLlxuICovXG5leHBvcnQgY29uc3QgYnJvd3NlckRvY3VtZW50UHJvdmlkZXI6IENsYXNzUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IERvY3VtZW50UmVmLFxuICB1c2VDbGFzczogQnJvd3NlckRvY3VtZW50UmVmXG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbmplY3RhYmxlIHByb3ZpZGVyIHRoYXQgdXNlcyB0aGUgRG9jdW1lbnRGYWN0b3J5IGZ1bmN0aW9uIGZvciByZXR1cm5pbmcgdGhlIG5hdGl2ZSBEb2N1bWVudCBvYmplY3QuXG4gKi9cbmV4cG9ydCBjb25zdCBkb2N1bWVudFByb3ZpZGVyOiBGYWN0b3J5UHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IERPQ1VNRU5ULFxuICB1c2VGYWN0b3J5OiBkb2N1bWVudEZhY3RvcnksXG4gIGRlcHM6IFtEb2N1bWVudFJlZiwgUExBVEZPUk1fSURdXG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbiBhcnJheSBvZiBwcm92aWRlcnMuXG4gKi9cbmV4cG9ydCBjb25zdCBET0NVTUVOVF9QUk9WSURFUlMgPSBbYnJvd3NlckRvY3VtZW50UHJvdmlkZXIsIGRvY3VtZW50UHJvdmlkZXJdO1xuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdyeGpzL29ic2VydmFibGUvbWVyZ2UnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFdJTkRPVyB9IGZyb20gJy4vd2luZG93LXJlZi5zZXJ2aWNlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnLi9kb2N1bWVudC1yZWYuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRvcGxheVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3l7XG4gIC8qKlxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGVzIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXG4gICAqL1xuICBhdXRvcGxheVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgYXV0b3BsYXkgdGltZW91dC5cbiAgICovXG4gIHByaXZhdGUgX3RpbWVvdXQ6IG51bWJlciA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGVuZXZlciB0aGUgYXV0b3BsYXkgaXMgcGF1c2VkLlxuICAgKi9cbiAgcHJpdmF0ZSBfcGF1c2VkID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSB3aW5SZWY6IFdpbmRvdztcbiAgcHJpdmF0ZSBkb2NSZWY6IERvY3VtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UsXG4gICAgICAgICAgICAgIEBJbmplY3QoV0lORE9XKSB3aW5SZWY6IGFueSxcbiAgICAgICAgICAgICAgQEluamVjdChET0NVTUVOVCkgZG9jUmVmOiBhbnksXG4gICkge1xuICAgIHRoaXMud2luUmVmID0gd2luUmVmIGFzIFdpbmRvdztcbiAgICB0aGlzLmRvY1JlZiA9IGRvY1JlZiBhcyBEb2N1bWVudDtcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmF1dG9wbGF5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxuICAgKi9cbiAgc3B5RGF0YVN0cmVhbXMoKSB7XG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5KSB7XG5cdFx0XHRcdFx0dGhpcy5wbGF5KCk7XG5cdFx0XHRcdH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IGNoYW5nZWRTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZWRTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUNoYW5nZU9ic2VydmFibGUoZGF0YSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICAvLyBvcmlnaW5hbCBBdXRvcGxheSBQbHVnaW4gaGFzIGxpc3RlbmVycyBvbiBwbGF5Lm93bC5jb3JlIGFuZCBzdG9wLm93bC5jb3JlIGV2ZW50cy5cbiAgICAvLyBUaGV5IGFyZSB0cmlnZ2VyZWQgYnkgVmlkZW8gUGx1Z2luXG5cbiAgICBjb25zdCBhdXRvcGxheU1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZWRTZXR0aW5ncyQpO1xuICAgIHRoaXMuYXV0b3BsYXlTdWJzY3JpcHRpb24gPSBhdXRvcGxheU1lcmdlJC5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB7fVxuICAgICk7XG4gIH1cblxuICAvKipcblx0ICogU3RhcnRzIHRoZSBhdXRvcGxheS5cblx0ICogQHBhcmFtIHRpbWVvdXQgVGhlIGludGVydmFsIGJlZm9yZSB0aGUgbmV4dCBhbmltYXRpb24gc3RhcnRzLlxuXHQgKiBAcGFyYW0gc3BlZWQgVGhlIGFuaW1hdGlvbiBzcGVlZCBmb3IgdGhlIGFuaW1hdGlvbnMuXG5cdCAqL1xuXHRwbGF5KHRpbWVvdXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3BhdXNlZCkge1xuXHRcdFx0dGhpcy5fcGF1c2VkID0gZmFsc2U7XG5cdFx0XHR0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCk7XG4gICAgfVxuXG5cdFx0aWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UuZW50ZXIoJ3JvdGF0aW5nJyk7XG5cblx0XHR0aGlzLl9zZXRBdXRvUGxheUludGVydmFsKCk7XG4gIH07XG5cbiAgLyoqXG5cdCAqIEdldHMgYSBuZXcgdGltZW91dFxuXHQgKiBAcGFyYW0gdGltZW91dCAtIFRoZSBpbnRlcnZhbCBiZWZvcmUgdGhlIG5leHQgYW5pbWF0aW9uIHN0YXJ0cy5cblx0ICogQHBhcmFtIHNwZWVkIC0gVGhlIGFuaW1hdGlvbiBzcGVlZCBmb3IgdGhlIGFuaW1hdGlvbnMuXG5cdCAqIEByZXR1cm5cblx0ICovXG5cdHByaXZhdGUgX2dldE5leHRUaW1lb3V0KHRpbWVvdXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKTogbnVtYmVyIHtcblx0XHRpZiAoIHRoaXMuX3RpbWVvdXQgKSB7XG5cdFx0XHR0aGlzLndpblJlZi5jbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLndpblJlZi5zZXRUaW1lb3V0KCgpID0+e1xuICAgICAgaWYgKHRoaXMuX3BhdXNlZCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5pcygnYnVzeScpIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdpbnRlcmFjdGluZycpIHx8IHRoaXMuZG9jUmVmLmhpZGRlbikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5uZXh0KHNwZWVkIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5U3BlZWQpO1xuICAgIH0sIHRpbWVvdXQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlUaW1lb3V0KTtcbiAgfTtcblxuICAvKipcblx0ICogU2V0cyBhdXRvcGxheSBpbiBtb3Rpb24uXG5cdCAqL1xuXHRwcml2YXRlIF9zZXRBdXRvUGxheUludGVydmFsKCkge1xuXHRcdHRoaXMuX3RpbWVvdXQgPSB0aGlzLl9nZXROZXh0VGltZW91dCgpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTdG9wcyB0aGUgYXV0b3BsYXkuXG5cdCAqL1xuXHRzdG9wKCkge1xuXHRcdGlmICghdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLndpblJlZi5jbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2UubGVhdmUoJ3JvdGF0aW5nJyk7XG4gIH07XG5cbiAgLyoqXG5cdCAqIFN0b3BzIHRoZSBhdXRvcGxheS5cblx0ICovXG5cdHBhdXNlKCkge1xuXHRcdGlmICghdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLl9wYXVzZWQgPSB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBNYW5hZ2VzIGJ5IGF1dG9wbGF5aW5nIGFjY29yZGluZyB0byBkYXRhIHBhc3NlZCBieSBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkIE9ic2FydmFibGVcbiAgICogQHBhcmFtIGRhdGEgb2JqZWN0IHdpdGggY3VycmVudCBwb3NpdGlvbiBvZiBjYXJvdXNlbCBhbmQgdHlwZSBvZiBjaGFuZ2VcbiAgICovXG4gIHByaXZhdGUgX2hhbmRsZUNoYW5nZU9ic2VydmFibGUoZGF0YSkge1xuICAgIGlmIChkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdzZXR0aW5ncycpIHtcbiAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheSkge1xuICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAncG9zaXRpb24nKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKCdwbGF5PycsIGUpO1xuICAgICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmF1dG9wbGF5KSB7XG4gICAgICAgIHRoaXMuX3NldEF1dG9QbGF5SW50ZXJ2YWwoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIHBhdXNpbmdcbiAgICovXG4gIHN0YXJ0UGF1c2luZygpIHtcbiAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlIb3ZlclBhdXNlICYmIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XG4gICAgICB0aGlzLnBhdXNlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIG1vdXNlIGxlYXZlcyBjYXJvdXNlbFxuICAgKi9cbiAgc3RhcnRQbGF5aW5nTW91c2VMZWF2ZSgpIHtcbiAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b3BsYXlIb3ZlclBhdXNlICYmIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKCdyb3RhdGluZycpKSB7XG4gICAgICB0aGlzLnBhdXNlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIHRvdWNoIGVuZHNcbiAgICovXG4gIHN0YXJ0UGxheWluZ1RvdWNoRW5kKCkge1xuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvcGxheUhvdmVyUGF1c2UgJiYgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoJ3JvdGF0aW5nJykpIHtcbiAgICAgIHRoaXMucGF1c2UoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZSB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9tZXJnZSc7XG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UgfSBmcm9tICcuL2Nhcm91c2VsLnNlcnZpY2UnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTGF6eUxvYWRTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSAgZnJvbSBDYXJvdXNlbFNlcnZpY2VcbiAgICovXG4gIGxhenlMb2FkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSkge1xuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMubGF6eUxvYWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXG4gICAqL1xuICBzcHlEYXRhU3RyZWFtcygpIHtcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoKCkgPT4ge1xuICAgICAgICBjb25zdCBpc0xhenlMb2FkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MgJiYgIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmxhenlMb2FkO1xuICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goaXRlbSA9PiBpdGVtLmxvYWQgPSBpc0xhenlMb2FkID8gdHJ1ZSA6IGZhbHNlKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IGNoYW5nZVNldHRpbmdzJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Q2hhbmdlU3RhdGUoKTtcblxuICAgIGNvbnN0IHJlc2l6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFJlc2l6ZWRTdGF0ZSgpO1xuXG5cbiAgICBjb25zdCBsYXp5TG9hZE1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+ID0gbWVyZ2UoaW5pdGlhbGl6ZWRDYXJvdXNlbCQsIGNoYW5nZVNldHRpbmdzJCwgcmVzaXplZENhcm91c2VsJCkucGlwZShcbiAgICAgIHRhcChkYXRhID0+IHRoaXMuX2RlZmluZUxhenlMb2FkU2xpZGVzKGRhdGEpKSxcbiAgICAgIC8vIHRhcCgoKSA9PiB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpKVxuICAgICk7XG4gICAgdGhpcy5sYXp5TG9hZFN1YnNjcmlwdGlvbiA9IGxhenlMb2FkTWVyZ2UkLnN1YnNjcmliZShcbiAgICAgICgpID0+IHt9XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2RlZmluZUxhenlMb2FkU2xpZGVzKGRhdGE6IGFueSkge1xuICAgIGlmICghdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MgfHwgIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmxhenlMb2FkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKChkYXRhLnByb3BlcnR5ICYmIGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJykgfHwgZGF0YSA9PT0gJ2luaXRpYWxpemVkJyB8fCBkYXRhID09PSBcInJlc2l6ZWRcIikge1xuICAgICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncyxcbiAgICAgICAgICAgIGNsb25lcyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNsb25lcygpLmxlbmd0aDtcbiAgICAgIGxldCBuID0gKHNldHRpbmdzLmNlbnRlciAmJiBNYXRoLmNlaWwoc2V0dGluZ3MuaXRlbXMgLyAyKSB8fCBzZXR0aW5ncy5pdGVtcyksXG4gICAgICAgICAgaSA9ICgoc2V0dGluZ3MuY2VudGVyICYmIG4gKiAtMSkgfHwgMCksXG4gICAgICAgICAgcG9zaXRpb24gPSAoZGF0YS5wcm9wZXJ0eSAmJiBkYXRhLnByb3BlcnR5LnZhbHVlICE9PSB1bmRlZmluZWQgPyBkYXRhLnByb3BlcnR5LnZhbHVlIDogdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpKSArIGk7XG4gICAgICAgIC8vIGxvYWQgPSAkLnByb3h5KGZ1bmN0aW9uKGksIHYpIHsgdGhpcy5sb2FkKHYpIH0sIHRoaXMpO1xuICAgICAgLy9UT0RPOiBOZWVkIGRvY3VtZW50YXRpb24gZm9yIHRoaXMgbmV3IG9wdGlvblxuICAgICAgaWYgKHNldHRpbmdzLmxhenlMb2FkRWFnZXIgPiAwKSB7XG4gICAgICAgIG4gKz0gc2V0dGluZ3MubGF6eUxvYWRFYWdlcjtcbiAgICAgICAgLy8gSWYgdGhlIGNhcm91c2VsIGlzIGxvb3BpbmcgYWxzbyBwcmVsb2FkIGltYWdlcyB0aGF0IGFyZSB0byB0aGUgXCJsZWZ0XCJcbiAgICAgICAgaWYgKHNldHRpbmdzLmxvb3ApIHtcbiAgICAgICAgICBwb3NpdGlvbiAtPSBzZXR0aW5ncy5sYXp5TG9hZEVhZ2VyO1xuICAgICAgICAgIG4rKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB3aGlsZSAoaSsrIDwgbikge1xuICAgICAgICB0aGlzLl9sb2FkKGNsb25lcyAvIDIgKyB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZShwb3NpdGlvbikpO1xuICAgICAgICBpZiAoY2xvbmVzKSB7XG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuY2xvbmVzKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHBvc2l0aW9uKSkuZm9yRWFjaCh2YWx1ZSA9PiB0aGlzLl9sb2FkKHZhbHVlKSk7XG5cbiAgICAgICAgfVxuICAgICAgICBwb3NpdGlvbisrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuXHQgKiBMb2FkcyBhbGwgcmVzb3VyY2VzIG9mIGFuIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbi5cblx0ICogQHBhcmFtIHBvc2l0aW9uIC0gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxuXHQgKi9cbiAgcHJpdmF0ZSBfbG9hZChwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbcG9zaXRpb25dLmxvYWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW3Bvc2l0aW9uXS5sb2FkID0gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL21lcmdlJztcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBbmltYXRlU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveXtcbiAgLyoqXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSAgZnJvbSBDYXJvdXNlbFNlcnZpY2VcbiAgICovXG4gIGFuaW1hdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogc1xuICAgKi9cbiAgc3dhcHBpbmcgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBhY3RpdmUgc2xpZGUgYmVmb3JlIHRyYW5zbGF0aW5nXG4gICAqL1xuICBwcmV2aW91cyA9IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogbmV3IGFjdGl2ZSBzbGlkZSBhZnRlciB0cmFuc2xhdGluZ1xuICAgKi9cbiAgbmV4dCA9IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlKSB7XG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5hbmltYXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxuICAgKi9cbiAgc3B5RGF0YVN0cmVhbXMoKSB7XG4gICAgY29uc3QgY2hhbmdlU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoZGF0YSA9PiB7XG4gICAgICAgIGlmIChkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHtcblx0XHRcdFx0XHR0aGlzLnByZXZpb3VzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpO1xuXHRcdFx0XHRcdHRoaXMubmV4dCA9IGRhdGEucHJvcGVydHkudmFsdWU7XG5cdFx0XHRcdH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IGRyYWdDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdTdGF0ZSgpO1xuICAgIGNvbnN0IGRyYWdnZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldERyYWdnZWRTdGF0ZSgpO1xuICAgIGNvbnN0IHRyYW5zbGF0ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZWRTdGF0ZSgpO1xuXG4gICAgY29uc3QgZHJhZ1RyYW5zbGF0ZWRNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IG1lcmdlKGRyYWdDYXJvdXNlbCQsIGRyYWdnZWRDYXJvdXNlbCQsIHRyYW5zbGF0ZWRDYXJvdXNlbCQpLnBpcGUoXG4gICAgICB0YXAoZGF0YSA9PiB0aGlzLnN3YXBwaW5nID0gZGF0YSA9PT0gJ3RyYW5zbGF0ZWQnKVxuICAgICk7XG5cbiAgICBjb25zdCB0cmFuc2xhdGVDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldFRyYW5zbGF0ZVN0YXRlKCkucGlwZShcbiAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3dhcHBpbmcgJiYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLl9vcHRpb25zLmFuaW1hdGVPdXQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2UuX29wdGlvbnMuYW5pbWF0ZUluKSkge1xuICAgICAgICAgIHRoaXMuX3N3YXAoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29uc3QgYW5pbWF0ZU1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmcgfCBhbnk+ID0gbWVyZ2UoY2hhbmdlU2V0dGluZ3MkLCB0cmFuc2xhdGVDYXJvdXNlbCQsIGRyYWdUcmFuc2xhdGVkTWVyZ2UkKS5waXBlKCk7XG4gICAgdGhpcy5hbmltYXRlU3Vic2NyaXB0aW9uID0gYW5pbWF0ZU1lcmdlJC5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB7fVxuICAgICk7XG4gIH1cblxuICAvKipcblx0ICogVG9nZ2xlcyB0aGUgYW5pbWF0aW9uIGNsYXNzZXMgd2hlbmV2ZXIgYW4gdHJhbnNsYXRpb25zIHN0YXJ0cy5cblx0ICogQHJldHVybnNcblx0ICovXG5cdHByaXZhdGUgX3N3YXAoKTogYm9vbGVhbiB7XG5cblx0XHRpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuaXRlbXMgIT09IDEpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBpZiAoISQuc3VwcG9ydC5hbmltYXRpb24gfHwgISQuc3VwcG9ydC50cmFuc2l0aW9uKSB7XG5cdFx0Ly8gXHRyZXR1cm47XG5cdFx0Ly8gfVxuXG5cdFx0dGhpcy5jYXJvdXNlbFNlcnZpY2Uuc3BlZWQoMCk7XG5cblx0XHRsZXQgbGVmdDtcblx0XHRjb25zdFx0cHJldmlvdXMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW3RoaXMucHJldmlvdXNdLFxuXHRcdFx0bmV4dCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbdGhpcy5uZXh0XSxcblx0XHRcdGluY29taW5nID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYW5pbWF0ZUluLFxuXHRcdFx0b3V0Z29pbmcgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hbmltYXRlT3V0O1xuXG5cdFx0aWYgKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSA9PT0gdGhpcy5wcmV2aW91cykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChvdXRnb2luZykge1xuXHRcdFx0bGVmdCA9ICt0aGlzLmNhcm91c2VsU2VydmljZS5jb29yZGluYXRlcyh0aGlzLnByZXZpb3VzKSAtICt0aGlzLmNhcm91c2VsU2VydmljZS5jb29yZGluYXRlcyh0aGlzLm5leHQpO1xuICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgaWYgKHNsaWRlLmlkID09PSBwcmV2aW91cy5pZCkge1xuICAgICAgICAgIHNsaWRlLmxlZnQgPSBgJHtsZWZ0fXB4YDtcbiAgICAgICAgICBzbGlkZS5pc0FuaW1hdGVkID0gdHJ1ZTtcbiAgICAgICAgICBzbGlkZS5pc0RlZkFuaW1hdGVkT3V0ID0gdHJ1ZTtcbiAgICAgICAgICBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkT3V0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cdFx0fVxuXG5cdFx0aWYgKGluY29taW5nKSB7XG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgICBpZiAoc2xpZGUuaWQgPT09IG5leHQuaWQpIHtcbiAgICAgICAgICBzbGlkZS5pc0FuaW1hdGVkID0gdHJ1ZTtcbiAgICAgICAgICBzbGlkZS5pc0RlZkFuaW1hdGVkSW4gPSB0cnVlO1xuICAgICAgICAgIHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRJbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXHRcdH1cblx0fTtcblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgZW5kIG9mICdhbmltYXRpb25lbmQnIGV2ZW50XG4gICAqIEBwYXJhbSBpZCBJZCBvZiBzbGlkZXNcbiAgICovXG4gIGNsZWFyKGlkKSB7XG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgIGlmIChzbGlkZS5pZCA9PT0gaWQpIHtcbiAgICAgICAgc2xpZGUubGVmdCA9ICcnO1xuICAgICAgICBzbGlkZS5pc0FuaW1hdGVkID0gZmFsc2U7XG4gICAgICAgIHNsaWRlLmlzRGVmQW5pbWF0ZWRPdXQgPSBmYWxzZTtcbiAgICAgICAgc2xpZGUuaXNDdXN0b21BbmltYXRlZE91dCA9IGZhbHNlO1xuICAgICAgICBzbGlkZS5pc0RlZkFuaW1hdGVkSW4gPSBmYWxzZTtcbiAgICAgICAgc2xpZGUuaXNDdXN0b21BbmltYXRlZEluID0gZmFsc2U7XG4gICAgICAgIHNsaWRlLmNsYXNzZXMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXRDdXJTbGlkZUNsYXNzZXMoc2xpZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uVHJhbnNpdGlvbkVuZCgpO1xuXHR9O1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL21lcmdlJztcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRvSGVpZ2h0U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveXtcbiAgLyoqXG4gICAqIFN1YnNjcmlvcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSAgZnJvbSBDYXJvdXNlbFNlcnZpY2VcbiAgICovXG4gIGF1dG9IZWlnaHRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSkge1xuICAgIHRoaXMuc3B5RGF0YVN0cmVhbXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuYXV0b0hlaWdodFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG4gIC8qKlxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXG4gICAqL1xuICBzcHlEYXRhU3RyZWFtcygpIHtcbiAgICBjb25zdCBpbml0aWFsaXplZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0SW5pdGlhbGl6ZWRTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoZGF0YSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hdXRvSGVpZ2h0KSB7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4gc2xpZGUuaGVpZ2h0U3RhdGUgPSAnZnVsbCcpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCBjaGFuZ2VkU2V0dGluZ3MkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRDaGFuZ2VkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b0hlaWdodCAmJiBkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpe1xuXHRcdFx0XHRcdHRoaXMudXBkYXRlKCk7XG5cdFx0XHRcdH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IHJlZnJlc2hlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0UmVmcmVzaGVkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuYXV0b0hlaWdodCkge1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IGF1dG9IZWlnaHQkOiBPYnNlcnZhYmxlPHN0cmluZyB8IGFueT4gPSBtZXJnZShpbml0aWFsaXplZENhcm91c2VsJCwgY2hhbmdlZFNldHRpbmdzJCwgcmVmcmVzaGVkQ2Fyb3VzZWwkKTtcbiAgICB0aGlzLmF1dG9IZWlnaHRTdWJzY3JpcHRpb24gPSBhdXRvSGVpZ2h0JC5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB7fVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcHJvcCAnaGVpZ2h0U3RhdGUnIG9mIHNsaWRlc1xuICAgKi9cbiAgdXBkYXRlKCkge1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuaXRlbXNcbiAgICBsZXQgc3RhcnQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCksXG4gICAgICAgIGVuZCA9IHN0YXJ0ICsgaXRlbXM7XG5cbiAgICBpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuY2VudGVyKSB7XG4gICAgICBzdGFydCA9IGl0ZW1zICUgMiA9PT0gMSA/IHN0YXJ0IC0gKGl0ZW1zIC0gMSkgLyAyIDogc3RhcnQgLSBpdGVtcyAvIDI7XG4gICAgICBlbmQgPSBpdGVtcyAlIDIgPT09IDEgPyBzdGFydCArIGl0ZW1zIDogc3RhcnQgKyBpdGVtcyArIDE7XG4gICAgfVxuXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKChzbGlkZSwgaSkgPT4ge1xuICAgICAgc2xpZGUuaGVpZ2h0U3RhdGUgPSAoaSA+PSBzdGFydCAmJiBpIDwgZW5kKSA/ICdmdWxsJyA6ICdudWxsZWQnO1xuICAgIH0pO1xuICB9XG5cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL21lcmdlJztcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSB9IGZyb20gJy4vY2Fyb3VzZWwuc2VydmljZSc7XG5pbXBvcnQgeyB0YXAsIHNraXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIYXNoU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gdG8gbWVyZ2UgT2JzZXJ2YWJsZSBmcm9tIENhcm91c2VsU2VydmljZVxuICAgKi9cbiAgaGFzaFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IHVybCBmcmFnbWVudCAoaGFzaClcbiAgICovXG4gIGN1cnJlbnRIYXNoRnJhZ21lbnQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlKSB7XG4gICAgdGhpcy5zcHlEYXRhU3RyZWFtcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5oYXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxuICAgKi9cbiAgc3B5RGF0YVN0cmVhbXMoKSB7XG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKTtcblxuICAgIGNvbnN0IGNoYW5nZWRTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZWRTdGF0ZSgpLnBpcGUoXG4gICAgICB0YXAoZGF0YSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5VUkxoYXNoTGlzdGVuZXIgJiYgZGF0YS5wcm9wZXJ0eS5uYW1lID09PSAncG9zaXRpb24nKSB7XG4gICAgICAgICAgY29uc3QgbmV3Q3VyU2xpZGUgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCk7XG4gICAgICAgICAgY29uc3QgbmV3Q3VyRnJhZ21lbnQgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW25ld0N1clNsaWRlXS5oYXNoRnJhZ21lbnQ7XG5cbiAgICAgICAgICBpZiAoIW5ld0N1ckZyYWdtZW50IHx8IG5ld0N1ckZyYWdtZW50ID09PSB0aGlzLmN1cnJlbnRIYXNoRnJhZ21lbnQpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IGhhc2hGcmFnbWVudCQ6IE9ic2VydmFibGU8c3RyaW5nIHwgYW55PiA9IG1lcmdlKGluaXRpYWxpemVkQ2Fyb3VzZWwkLCBjaGFuZ2VkU2V0dGluZ3MkKTtcbiAgICB0aGlzLmhhc2hTdWJzY3JpcHRpb24gPSBoYXNoRnJhZ21lbnQkLnN1YnNjcmliZShcbiAgICAgICgpID0+IHt9XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXdpbmRzIGNhcm91c2VsIHRvIHNsaWRlIHdoaWNoIGhhcyB0aGUgc2FtZSBoYXNoRnJhZ21lbnQgYXMgZnJhZ21lbnQgb2YgY3VycmVudCB1cmxcbiAgICogQHBhcmFtIGZyYWdtZW50IGZyYWdtZW50IG9mIHVybFxuICAgKi9cbiAgcmV3aW5kKGZyYWdtZW50OiBzdHJpbmcpIHtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZmluZEluZGV4KHNsaWRlID0+IHNsaWRlLmhhc2hGcmFnbWVudCA9PT0gZnJhZ21lbnQgJiYgc2xpZGUuaXNDbG9uZWQgPT09IGZhbHNlKTtcblxuICAgIGlmIChwb3NpdGlvbiA9PT0gLTEgfHwgcG9zaXRpb24gPT09IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXHRcdHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRvKHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnJlbGF0aXZlKHBvc2l0aW9uKSwgZmFsc2UpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgT25EZXN0cm95LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBEaXJlY3RpdmUsXG4gIFF1ZXJ5TGlzdCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBUZW1wbGF0ZVJlZixcbiAgRWxlbWVudFJlZixcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUmVzaXplU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3Jlc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IHRhcCwgZGVsYXksIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSwgQ2Fyb3VzZWxDdXJyZW50RGF0YSB9IGZyb20gJy4uL3NlcnZpY2VzL2Nhcm91c2VsLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RhZ2VEYXRhIH0gZnJvbSBcIi4uL21vZGVscy9zdGFnZS1kYXRhLm1vZGVsXCI7XG5pbXBvcnQgeyBPd2xET01EYXRhIH0gZnJvbSBcIi4uL21vZGVscy9vd2xET00tZGF0YS5tb2RlbFwiO1xuaW1wb3J0IHsgU2xpZGVNb2RlbCB9IGZyb20gJy4uL21vZGVscy9zbGlkZS5tb2RlbCc7XG5pbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsJztcbmltcG9ydCB7IE5hdkRhdGEsIERvdHNEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL25hdmlnYXRpb24tZGF0YS5tb2RlbHMnO1xuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0b3BsYXlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0b3BsYXkuc2VydmljZSc7XG5pbXBvcnQgeyBMYXp5TG9hZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sYXp5bG9hZC5zZXJ2aWNlJztcbmltcG9ydCB7IEFuaW1hdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYW5pbWF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dG9IZWlnaHRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0b2hlaWdodC5zZXJ2aWNlJztcbmltcG9ydCB7IEhhc2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaGFzaC5zZXJ2aWNlJztcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL21lcmdlJztcblxubGV0IG5leHRJZCA9IDA7XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbY2Fyb3VzZWxTbGlkZV0nfSlcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlIHtcbiAgLyoqXG4gICAqIFVuaXF1ZSBzbGlkZSBpZGVudGlmaWVyLiBNdXN0IGJlIHVuaXF1ZSBmb3IgdGhlIGVudGlyZSBkb2N1bWVudCBmb3IgcHJvcGVyIGFjY2Vzc2liaWxpdHkgc3VwcG9ydC5cbiAgICogV2lsbCBiZSBhdXRvLWdlbmVyYXRlZCBpZiBub3QgcHJvdmlkZWQuXG4gICAqL1xuICBASW5wdXQoKSBpZCA9IGBvd2wtc2xpZGUtJHtuZXh0SWQrK31gO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIGhvdyBtdWNoIHdpZHRocyBvZiBjb21tb24gc2xpZGUgd2lsbCBjdXJyZW50IHNsaWRlIGhhdmVcbiAgICogZS5nLiBpZiBfbWVyZ2VEYXRhPTIsIHRoZSBzbGlkZSB3aWxsIHR3aWNlIHdpZGVyIHRoZW4gc2xpZGVzIHdpdGggX21lcmdlRGF0YT0xXG4gICAqL1xuICBwcml2YXRlIF9kYXRhTWVyZ2UgPSAxO1xuICBASW5wdXQoKVxuICBzZXQgZGF0YU1lcmdlKGRhdGE6IG51bWJlcikge1xuICAgIHRoaXMuX2RhdGFNZXJnZSA9IHRoaXMuaXNOdW1lcmljKGRhdGEpID8gZGF0YSA6IDE7XG4gIH07XG5cbiAgZ2V0IGRhdGFNZXJnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kYXRhTWVyZ2VcbiAgfVxuXG4gIC8qKlxuICAgKiBXaWR0aCBvZiBzbGlkZVxuICAgKi9cbiAgQElucHV0KCkgd2lkdGggPSAwO1xuXG4gIC8qKlxuICAgKiBJbm5lciBjb250ZW50IG9mIGRvdCBmb3IgY2VydGFpbiBzbGlkZTsgY2FuIGJlIGh0bWwtbWFya3VwXG4gICAqL1xuICBASW5wdXQoKSBkb3RDb250ZW50ID0gJyc7XG5cbiAgLyoqXG4gICAqIEhhc2ggKGZyYWdtZW50KSBvZiB1cmwgd2hpY2ggY29ycmVzcG9uZHMgdG8gY2VydGFpbiBzbGlkZVxuICAgKi9cbiAgQElucHV0KCkgZGF0YUhhc2ggPSAnJztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHBsUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3Igc29tZXRoaW5nIHRoYXQgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcbiAgICogQHBhcmFtIC0gVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxuICAgKiBAcmV0dXJucyAtIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXG4gICAqL1xuICBpc051bWVyaWMobnVtYmVyOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobnVtYmVyKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBEYXRhIHdoaWNoIHdpbGwgYmUgcGFzc2VkIG91dCBhZnRlciBlbmRpbmcgb2YgdHJhbnNpdGlvbiBvZiBjYXJvdXNlbFxuICovXG5leHBvcnQgY2xhc3MgU2xpZGVzT3V0cHV0RGF0YSB7XG4gIHN0YXJ0UG9zaXRpb24/OiBudW1iZXI7XG4gIHNsaWRlcz86IFNsaWRlTW9kZWxbXTtcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ293bC1jYXJvdXNlbC1vJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwib3dsLWNhcm91c2VsIG93bC10aGVtZVwiICNvd2xDYXJvdXNlbFxuICAgICAgICAgW25nQ2xhc3NdPVwieydvd2wtcnRsJzogb3dsRE9NRGF0YT8ucnRsLFxuICAgICAgICAgICAgICAgICAgJ293bC1sb2FkZWQnOiBvd2xET01EYXRhPy5pc0xvYWRlZCxcbiAgICAgICAgICAgICAgICAgICdvd2wtcmVzcG9uc2l2ZSc6IG93bERPTURhdGE/LmlzUmVzcG9uc2l2ZSxcbiAgICAgICAgICAgICAgICAgICdvd2wtZHJhZyc6IG93bERPTURhdGE/LmlzTW91c2VEcmFnYWJsZSxcbiAgICAgICAgICAgICAgICAgICdvd2wtZ3JhYic6IG93bERPTURhdGE/LmlzR3JhYn1cIlxuICAgICAgICAgKG1vdXNlb3Zlcik9XCJzdGFydFBhdXNpbmcoKVwiXG4gICAgICAgICAobW91c2VsZWF2ZSk9XCJzdGFydFBsYXlNTCgpXCJcbiAgICAgICAgICh0b3VjaHN0YXJ0KT1cInN0YXJ0UGF1c2luZygpXCJcbiAgICAgICAgICh0b3VjaGVuZCk9XCJzdGFydFBsYXlURSgpXCI+XG5cbiAgICAgIDxkaXYgKm5nSWY9XCJjYXJvdXNlbExvYWRlZFwiIGNsYXNzPVwib3dsLXN0YWdlLW91dGVyXCI+XG4gICAgICAgIDxvd2wtc3RhZ2VcbiAgICAgICAgICBbb3dsRHJhZ2dhYmxlXT1cInsnaXNNb3VzZURyYWdhYmxlJzogb3dsRE9NRGF0YT8uaXNNb3VzZURyYWdhYmxlLCAnaXNUb3VjaERyYWdhYmxlJzogb3dsRE9NRGF0YT8uaXNUb3VjaERyYWdhYmxlfVwiXG4gICAgICAgICAgW3N0YWdlRGF0YV09XCJzdGFnZURhdGFcIlxuICAgICAgICAgIFtzbGlkZXNEYXRhXT1cInNsaWRlc0RhdGFcIj48L293bC1zdGFnZT5cbiAgICAgIDwvZGl2PiA8IS0tIC8ub3dsLXN0YWdlLW91dGVyIC0tPlxuICAgICAgPGRpdiBjbGFzcz1cIm93bC1uYXZcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogbmF2RGF0YT8uZGlzYWJsZWR9XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtcHJldlwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBuYXZEYXRhPy5wcmV2Py5kaXNhYmxlZH1cIiAoY2xpY2spPVwicHJldigpXCJcbiAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm5hdkRhdGE/LnByZXY/Lmh0bWxUZXh0XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtbmV4dFwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBuYXZEYXRhPy5uZXh0Py5kaXNhYmxlZH1cIiAoY2xpY2spPVwibmV4dCgpXCJcbiAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cIm5hdkRhdGE/Lm5leHQ/Lmh0bWxUZXh0XCI+PC9kaXY+XG4gICAgICA8L2Rpdj4gPCEtLSAvLm93bC1uYXYgLS0+XG4gICAgICA8ZGl2IGNsYXNzPVwib3dsLWRvdHNcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogZG90c0RhdGE/LmRpc2FibGVkfVwiPlxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBkb3Qgb2YgZG90c0RhdGE/LmRvdHNcIiBjbGFzcz1cIm93bC1kb3RcIlxuICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnYWN0aXZlJzogZG90LmFjdGl2ZSwgJ293bC1kb3QtdGV4dCc6IGRvdC5zaG93SW5uZXJDb250ZW50fVwiIChjbGljayk9XCJtb3ZlQnlEb3QoZG90LmlkKVwiPlxuICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiZG90LmlubmVyQ29udGVudFwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gPCEtLSAvLm93bC1kb3RzIC0tPlxuICAgIDwvZGl2PiA8IS0tIC8ub3dsLWNhcm91c2VsIG93bC1sb2FkZWQgLS0+XG4gIGAsXG4gIHN0eWxlczogW2Aub3dsLXRoZW1lIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9YF0sXG4gIHByb3ZpZGVyczogW1xuICAgIE5hdmlnYXRpb25TZXJ2aWNlLFxuICAgIEF1dG9wbGF5U2VydmljZSxcbiAgICBDYXJvdXNlbFNlcnZpY2UsXG4gICAgTGF6eUxvYWRTZXJ2aWNlLFxuICAgIEFuaW1hdGVTZXJ2aWNlLFxuICAgIEF1dG9IZWlnaHRTZXJ2aWNlLFxuICAgIEhhc2hTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIEBDb250ZW50Q2hpbGRyZW4oQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZSlcbiAgc2xpZGVzOiBRdWVyeUxpc3Q8Q2Fyb3VzZWxTbGlkZURpcmVjdGl2ZT47XG5cbiAgQE91dHB1dCgpIHRyYW5zbGF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFNsaWRlc091dHB1dERhdGE+KCk7XG5cbiAgLyoqXG4gICAqIFdpZHRoIG9mIGNhcm91c2VsIHdpbmRvdyAodGFnIHdpdGggY2xhc3MgLm93bC1jYXJvdXNlbCksIGluIHdpY2ggd2UgY2FuIHNlZSBtb3Zpbmcgc2xpZGVyc1xuICAgKi9cbiAgY2Fyb3VzZWxXaW5kb3dXaWR0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gdG8gJ3Jlc2l6ZScgZXZlbnRcbiAgICovXG4gIHJlc2l6ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gbWVyZ2UgT2JzZXJ2YWJsZSwgd2hpY2ggbWVyZ2VzIGFsbCBPYnNlcnZhYmxlcyBpbiB0aGUgY29tcG9uZW50IGV4Y2VwdCAncmVzaXplJyBPYnNlcnZhYmxlXG4gICAqL1xuICBwcml2YXRlIF9hbGxPYnNlcnZTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQ3VycmVudCBzZXR0aW5ncyBmb3IgdGhlIGNhcm91c2VsLlxuICAgKi9cbiAgb3dsRE9NRGF0YTogT3dsRE9NRGF0YTtcblxuICAvKipcbiAgICogRGF0YSBvZiBvd2wtc3RhZ2VcbiAgICovXG4gIHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xuXG4gIC8qKlxuICAgKiAgRGF0YSBvZiBldmVyeSBzbGlkZVxuICAgKi9cbiAgc2xpZGVzRGF0YTogU2xpZGVNb2RlbFtdO1xuXG4gIC8qKlxuICAgKiBEYXRhIG9mIG5hdmlnYXRpb24gYmxvY2tcbiAgICovXG4gIG5hdkRhdGE6IE5hdkRhdGE7XG5cbiAgLyoqXG4gICAqIERhdGEgb2YgZG90cyBibG9ja1xuICAgKi9cbiAgZG90c0RhdGE6IERvdHNEYXRhO1xuXG4gIC8qKlxuICAgKiBEYXRhLCB3aWNoIGFyZSBwYXNzZWQgb3V0IG9mIGNhcm91c2VsIGFmdGVyIGVuZGluZyBvZiB0cmFuc2lvbmluZyBvZiBjYXJvdXNlbFxuICAgKi9cbiAgc2xpZGVzT3V0cHV0RGF0YTogU2xpZGVzT3V0cHV0RGF0YTtcblxuICAvKipcbiAgICogU2hvd3Mgd2hldGhlciBjYXJvdXNlbCBpcyBsb2FkZWQgb2Ygbm90LlxuICAgKi9cbiAgY2Fyb3VzZWxMb2FkZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogVXNlcidzIG9wdGlvbnNcbiAgICovXG4gIEBJbnB1dCgpIG9wdGlvbnM6IE93bE9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIE9ic2VydmFibGUgZm9yIGdldHRpbmcgY3VycmVudCBWaWV3IFNldHRpbmdzXG4gICAqL1xuICBwcml2YXRlIF92aWV3Q3VyU2V0dGluZ3MkOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGE+O1xuXG4gIC8qKlxuICAgKiBPYnNlcnZhYmxlIGZvciBjYXRjaGluZyB0aGUgZW5kIG9mIHRyYW5zaXRpb24gb2YgY2Fyb3VzZWxcbiAgICovXG4gIHByaXZhdGUgX3RyYW5zbGF0ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPjtcblxuICAvKipcbiAgICogT2JzZXJ2YWJsZSBmb3IgbWVyZ2luZyBhbGwgT2JzZXJ2YWJsZXMgYW5kIGNyZWF0aW5nIG9uZSBzdWJzY3JpcHRpb25cbiAgICovXG4gIHByaXZhdGUgX2Nhcm91c2VsTWVyZ2UkOiBPYnNlcnZhYmxlPENhcm91c2VsQ3VycmVudERhdGEgfCBzdHJpbmc+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZXNpemVTZXJ2aWNlOiBSZXNpemVTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhdXRvcGxheVNlcnZpY2U6IEF1dG9wbGF5U2VydmljZSxcbiAgICBwcml2YXRlIGxhenlMb2FkU2VydmljZTogTGF6eUxvYWRTZXJ2aWNlLFxuICAgIHByaXZhdGUgYW5pbWF0ZVNlcnZpY2U6IEFuaW1hdGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgYXV0b0hlaWdodFNlcnZpY2U6IEF1dG9IZWlnaHRTZXJ2aWNlLFxuICAgIHByaXZhdGUgaGFzaFNlcnZpY2U6IEhhc2hTZXJ2aWNlXG4gICkge1xuICAgIC8vIGVtcHR5XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XG5cbiAgICB0aGlzLmNhcm91c2VsV2luZG93V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICcub3dsLWNhcm91c2VsJ1xuICAgICkuY2xpZW50V2lkdGg7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gIH1cblxuICAvLyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSBFTkRcblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dXAodGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoLCB0aGlzLnNsaWRlcy50b0FycmF5KCksIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2UuaW5pdGlhbGl6ZSh0aGlzLnNsaWRlcy50b0FycmF5KCkpO1xuXG4gICAgdGhpcy5fd2luUmVzaXplV2F0Y2hlcigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMucmVzaXplU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHRoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEpvaW5zIHRoZSBvYnNlcnZhYmxlIGxvZ2luIGluIG9uZSBwbGFjZTogc2V0cyB2YWx1ZXMgdG8gc29tZSBvYnNlcnZhYmxlcywgbWVyZ2VzIHRoaXMgb2JzZXJ2YWJsZXMgYW5kXG4gICAqIHN1YmNyaWJlcyB0byBtZXJnZSBmdW5jXG4gICAqL1xuICBzcHlEYXRhU3RyZWFtcygpIHtcbiAgICB0aGlzLl92aWV3Q3VyU2V0dGluZ3MkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0Vmlld0N1clNldHRpbmdzKCkucGlwZShcbiAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgdGhpcy5vd2xET01EYXRhID0gZGF0YS5vd2xET01EYXRhO1xuICAgICAgICB0aGlzLnN0YWdlRGF0YSA9IGRhdGEuc3RhZ2VEYXRhO1xuICAgICAgICB0aGlzLnNsaWRlc0RhdGEgPSBkYXRhLnNsaWRlc0RhdGE7XG4gICAgICAgIGlmICghdGhpcy5jYXJvdXNlbExvYWRlZCkge1xuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxMb2FkZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmF2RGF0YSA9IGRhdGEubmF2RGF0YTtcbiAgICAgICAgdGhpcy5kb3RzRGF0YSA9IGRhdGEuZG90c0RhdGE7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCkucGlwZShcbiAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2F0aGVyVHJhbnNsYXRlZERhdGEoKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGVkLmVtaXQodGhpcy5zbGlkZXNPdXRwdXREYXRhKTtcbiAgICAgICAgdGhpcy5zbGlkZXNPdXRwdXREYXRhID0ge307XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLl9jYXJvdXNlbE1lcmdlJCA9IG1lcmdlKHRoaXMuX3ZpZXdDdXJTZXR0aW5ncyQsIHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQpO1xuICAgIHRoaXMuX2FsbE9ic2VydlN1YnNjcmlwdGlvbiA9IHRoaXMuX2Nhcm91c2VsTWVyZ2UkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCBzdWJzY3JpcHRpb24gdG8gcmVzaXplIGV2ZW50IGFuZCBhdHRhY2hlcyBoYW5kbGVyIGZvciB0aGlzIGV2ZW50XG4gICAqL1xuICBwcml2YXRlIF93aW5SZXNpemVXYXRjaGVyKCkge1xuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNhcm91c2VsU2VydmljZS5fb3B0aW9ucy5yZXNwb25zaXZlKS5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uID0gdGhpcy5yZXNpemVTZXJ2aWNlLm9uUmVzaXplJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoICE9PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1jYXJvdXNlbCcpLmNsaWVudFdpZHRoKSxcbiAgICAgICAgICBkZWxheSh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5yZXNwb25zaXZlUmVmcmVzaFJhdGUpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25SZXNpemUodGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtY2Fyb3VzZWwnKS5jbGllbnRXaWR0aCk7XG4gICAgICAgICAgdGhpcy5jYXJvdXNlbFdpbmRvd1dpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtY2Fyb3VzZWwnKS5jbGllbnRXaWR0aDtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgZm9yIHRyYW5zaXRpb2VuZCBldmVudFxuICAgKi9cbiAgb25UcmFuc2l0aW9uRW5kKCkge1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uVHJhbnNpdGlvbkVuZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBuZXh0IGJ1dHRvblxuICAgKi9cbiAgbmV4dCgpIHtcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5leHQodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2U3BlZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBwcmV2IGJ1dHRvblxuICAgKi9cbiAgcHJldigpIHtcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLnByZXYodGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MubmF2U3BlZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LCBhdHRhY2hlZCB0byBkb3RzXG4gICAqL1xuICBtb3ZlQnlEb3QoZG90SWQ6IHN0cmluZykge1xuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubW92ZUJ5RG90KGRvdElkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXdpbmRzIGNhcm91c2VsIHRvIHNsaWRlIHdpdGggbmVlZGVkIGlkXG4gICAqIEBwYXJhbSBpZCBmcmFnbWVudCBvZiB1cmxcbiAgICovXG4gIHRvKGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLnRvU2xpZGVCeUlkKGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHYXRoZXJzIGFuZCBwcmVwYXJlcyBkYXRhIGludGVuZGVkIGZvciBwYXNzaW5nIHRvIHRoZSB1c2VyIGJ5IG1lYW5zIG9mIGZpcmluZyBldmVudCB0cmFuc2xhdGVkQ2Fyb3VzZWxcbiAgICovXG4gIGdhdGhlclRyYW5zbGF0ZWREYXRhKCkge1xuICAgIGxldCBzdGFydFBvc2l0aW9uOiBudW1iZXI7XG4gICAgY29uc3QgY2xvbmVkSWRQcmVmaXggPSB0aGlzLmNhcm91c2VsU2VydmljZS5jbG9uZWRJZFByZWZpeDtcbiAgICBjb25zdCBhY3RpdmVTbGlkZXM6IFNsaWRlTW9kZWxbXSA9IHRoaXMuc2xpZGVzRGF0YVxuICAgICAgLmZpbHRlcihzbGlkZSA9PiBzbGlkZS5pc0FjdGl2ZSA9PT0gdHJ1ZSlcbiAgICAgIC5tYXAoc2xpZGUgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IHNsaWRlLmlkLmluZGV4T2YoY2xvbmVkSWRQcmVmaXgpID49IDAgPyBzbGlkZS5pZC5zbGljZShjbG9uZWRJZFByZWZpeC5sZW5ndGgpIDogc2xpZGUuaWQ7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgIHdpZHRoOiBzbGlkZS53aWR0aCxcbiAgICAgICAgICBtYXJnaW5MOiBzbGlkZS5tYXJnaW5MLFxuICAgICAgICAgIG1hcmdpblI6IHNsaWRlLm1hcmdpblIsXG4gICAgICAgICAgY2VudGVyOiBzbGlkZS5pc0NlbnRlcmVkXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHN0YXJ0UG9zaXRpb24gPSB0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZSh0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCkpO1xuICAgIHRoaXMuc2xpZGVzT3V0cHV0RGF0YSA9IHtcbiAgICAgIHN0YXJ0UG9zaXRpb246IHN0YXJ0UG9zaXRpb24sXG4gICAgICBzbGlkZXM6IGFjdGl2ZVNsaWRlc1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgcGF1c2luZ1xuICAgKi9cbiAgc3RhcnRQYXVzaW5nKCkge1xuICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnN0YXJ0UGF1c2luZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIG1vdXNlIGxlYXZlcyBjYXJvdXNlbFxuICAgKi9cbiAgc3RhcnRQbGF5TUwoKSB7XG4gICAgdGhpcy5hdXRvcGxheVNlcnZpY2Uuc3RhcnRQbGF5aW5nTW91c2VMZWF2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBwbGF5aW5nIGFmdGVyIHRvdWNoIGVuZHNcbiAgICovXG4gIHN0YXJ0UGxheVRFKCkge1xuICAgIHRoaXMuYXV0b3BsYXlTZXJ2aWNlLnN0YXJ0UGxheWluZ1RvdWNoRW5kKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBOZ1pvbmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgUmVuZGVyZXIyLCBPbkluaXQsIE9uRGVzdHJveSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcm91c2VsU2VydmljZSwgQ29vcmRzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY2Fyb3VzZWwuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3RhZ2VEYXRhIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3N0YWdlLWRhdGEubW9kZWwnO1xuaW1wb3J0IHsgU2xpZGVNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9zbGlkZS5tb2RlbCc7XG5pbXBvcnQgeyBBbmltYXRlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuaW1hdGUuc2VydmljZSc7XG5pbXBvcnQge1xuICB0cmlnZ2VyLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIGFuaW1hdGUsXG4gIHRyYW5zaXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdvd2wtc3RhZ2UnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwib3dsLXN0YWdlXCIgW25nU3R5bGVdPVwieyd3aWR0aCc6IHN0YWdlRGF0YS53aWR0aCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RyYW5zZm9ybSc6IHN0YWdlRGF0YS50cmFuc2Zvcm0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb24nOiBzdGFnZURhdGEudHJhbnNpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1sZWZ0Jzogc3RhZ2VEYXRhLnBhZGRpbmdMICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IHN0YWdlRGF0YS5wYWRkaW5nUiArICdweCcgfVwiXG4gICAgICAgICAgKHRyYW5zaXRpb25lbmQpPVwib25UcmFuc2l0aW9uRW5kKClcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgc2xpZGUgb2Ygc2xpZGVzRGF0YTsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJvd2wtaXRlbVwiIFtuZ0NsYXNzXT1cInNsaWRlLmNsYXNzZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7J3dpZHRoJzogc2xpZGUud2lkdGggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFyZ2luLWxlZnQnOiBzbGlkZS5tYXJnaW5MICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi1yaWdodCc6IHNsaWRlLm1hcmdpblIgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGVmdCc6IHNsaWRlLmxlZnR9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFuaW1hdGlvbmVuZCk9XCJjbGVhcihzbGlkZS5pZClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbQGF1dG9IZWlnaHRdPVwic2xpZGUuaGVpZ2h0U3RhdGVcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdJZj1cInNsaWRlLmxvYWRcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJzbGlkZS50cGxSZWZcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvZGl2PjwhLS0gLy5vd2wtaXRlbSAtLT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj48IS0tIC8ub3dsLXN0YWdlIC0tPlxuICAgIDwvZGl2PlxuICBgLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignYXV0b0hlaWdodCcsIFtcbiAgICAgIHN0YXRlKCdudWxsZWQnLCBzdHlsZSh7aGVpZ2h0OiAwfSkpLFxuICAgICAgc3RhdGUoJ2Z1bGwnLCBzdHlsZSh7aGVpZ2h0OiAnKid9KSksXG4gICAgICB0cmFuc2l0aW9uKCdmdWxsID0+IG51bGxlZCcsIFtcbiAgICAgICAgLy8gc3R5bGUoe2hlaWdodDogJyonfSksXG4gICAgICAgIGFuaW1hdGUoJzcwMG1zIDM1MG1zJylcbiAgICAgIF0pLFxuICAgICAgdHJhbnNpdGlvbignbnVsbGVkID0+IGZ1bGwnLCBbXG4gICAgICAgIC8vIHN0eWxlKHtoZWlnaHQ6IDB9KSxcbiAgICAgICAgYW5pbWF0ZSgzNTApXG4gICAgICBdKSxcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFN0YWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogT2JqZWN0IHdpdGggc2V0dGluZ3Mgd2hpY2ggbWFrZSBjYXJvdXNlbCBkcmFnZ2FibGUgYnkgdG91Y2ggb3IgbW91c2VcbiAgICovXG4gIEBJbnB1dCgpIG93bERyYWdnYWJsZToge1xuICAgIGlzTW91c2VEcmFnYWJsZTogYm9vbGVhbixcbiAgICBpc1RvdWNoRHJhZ2FibGU6IGJvb2xlYW5cbiAgfTtcblxuICAvKipcbiAgICogRGF0YSBvZiBvd2wtc3RhZ2VcbiAgICovXG4gIEBJbnB1dCgpIHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xuXG5cdC8qKlxuXHQgKiAgRGF0YSBvZiBldmVyeSBzbGlkZVxuXHQgKi9cbiAgQElucHV0KCkgc2xpZGVzRGF0YTogU2xpZGVNb2RlbFtdO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICdtb3VzZW1vdmUnIGV2ZW50XG4gICAqL1xuICBsaXN0ZW5lck1vdXNlTW92ZTogKCkgPT4gdm9pZDtcbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ3RvdWNobW92ZScgZXZlbnRcbiAgICovXG4gIGxpc3RlbmVyVG91Y2hNb3ZlOiAoKSA9PiB2b2lkO1xuICAvKipcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAnbW91c2Vtb3ZlJyBldmVudFxuICAgKi9cbiAgbGlzdGVuZXJPbmVNb3VzZU1vdmU6ICgpID0+IHZvaWQ7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICd0b3VjaG1vdmUnIGV2ZW50XG4gICAqL1xuICBsaXN0ZW5lck9uZVRvdWNoTW92ZTogKCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAnbW91c2V1cCcgZXZlbnRcbiAgICovXG4gIGxpc3RlbmVyTW91c2VVcDogKCkgPT4gdm9pZDtcbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ3RvdWNoZW5kJyBldmVudFxuICAgKi9cbiAgbGlzdGVuZXJUb3VjaEVuZDogKCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAnY2xpY2snIGV2ZW50XG4gICAqL1xuICBsaXN0ZW5lck9uZUNsaWNrOiAoKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBPYmplY3Qgd2l0aCBkYXRhIG5lZWRlZCBmb3IgZHJhZ2dpbmdcbiAgICovXG4gIHByaXZhdGUgX2RyYWc6IGFueSA9IHtcbiAgICB0aW1lOiBudWxsLFxuICAgIHRhcmdldDogbnVsbCxcbiAgICBwb2ludGVyOiBudWxsLFxuICAgIHN0YWdlOiB7XG4gICAgICBzdGFydDogbnVsbCxcbiAgICAgIGN1cnJlbnQ6IG51bGxcbiAgICB9LFxuICAgIGRpcmVjdGlvbjogbnVsbCxcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIG1vdmluZzogZmFsc2VcbiAgfTtcblxuICAvKipcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsJ3MgcmVidWlsZGluZyBjYXVzZWQgYnkgcmVzaXplIGV2ZW50IHN0YXJ0c1xuICAgKi9cbiAgcHJpdmF0ZSBfb25lRHJhZ01vdmUkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIC8qKlxuICAgKiBTdWJzY3RpcHRpb24gdG8gX29uZURyYWdNb3ZlJCBTdWJqZWN0XG4gICAqL1xuICBwcml2YXRlIF9vbmVNb3ZlU3Vic3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICBwcml2YXRlIGNhcm91c2VsU2VydmljZTogQ2Fyb3VzZWxTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGFuaW1hdGVTZXJ2aWNlOiBBbmltYXRlU2VydmljZSkgeyB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSkgb25Nb3VzZURvd24oZXZlbnQpIHtcbiAgICBpZiAodGhpcy5vd2xEcmFnZ2FibGUuaXNNb3VzZURyYWdhYmxlKSB7XG4gICAgICB0aGlzLl9vbkRyYWdTdGFydChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hzdGFydCcsIFsnJGV2ZW50J10pIG9uVG91Y2hTdGFydChldmVudCkge1xuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc1RvdWNoRHJhZ2FibGUpIHtcbiAgICAgIHRoaXMuX29uRHJhZ1N0YXJ0KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIFsnJGV2ZW50J10pIG9uVG91Y2hDYW5jZWwoZXZlbnQpIHtcbiAgICB0aGlzLl9vbkRyYWdFbmQoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ3N0YXJ0Jykgb25EcmFnU3RhcnQoKSB7XG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzTW91c2VEcmFnYWJsZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3NlbGVjdHN0YXJ0Jykgb25TZWxlY3RTdGFydCgpIHtcbiAgICBpZiAodGhpcy5vd2xEcmFnZ2FibGUuaXNNb3VzZURyYWdhYmxlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fb25lTW92ZVN1YnNyaXB0aW9uID0gdGhpcy5fb25lRHJhZ01vdmUkXG4gICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3NlbmRDaGFuZ2VzKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX29uZU1vdmVTdWJzcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhc3NlcyB0aGlzIHRvIF9vbmVNb3VzZVRvdWNoTW92ZSgpO1xuICAgKi9cbiAgYmluZE9uZU1vdXNlVG91Y2hNb3ZlID0gKGV2KSA9PiB7XG4gICAgdGhpcy5fb25lTW91c2VUb3VjaE1vdmUoZXYpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhc3NlcyB0aGlzIHRvIF9vbkRyYWdNb3ZlKCk7XG4gICAqL1xuICBiaW5kT25EcmFnTW92ZSA9IChldikgPT4ge1xuICAgIHRoaXMuX29uRHJhZ01vdmUoZXYpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhc3NlcyB0aGlzIHRvIF9vbkRyYWdNb3ZlKCk7XG4gICAqL1xuICBiaW5kT25EcmFnRW5kID0gKGV2KSA9PiB7XG4gICAgLy8gdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICB0aGlzLl9vbkRyYWdFbmQoZXYpO1xuICAgIC8vIH0pO1xuICB9XG5cbiAgLyoqXG5cdCAqIEhhbmRsZXMgYHRvdWNoc3RhcnRgIGFuZCBgbW91c2Vkb3duYCBldmVudHMuXG5cdCAqIEB0b2RvIEhvcml6b250YWwgc3dpcGUgdGhyZXNob2xkIGFzIG9wdGlvblxuXHQgKiBAdG9kbyAjMjYxXG5cdCAqIEBwYXJhbSBldmVudCAtIFRoZSBldmVudCBhcmd1bWVudHMuXG5cdCAqL1xuXHRwcml2YXRlIF9vbkRyYWdTdGFydChldmVudCk6IGFueSB7XG5cdFx0bGV0IHN0YWdlOiBDb29yZHMgPSBudWxsO1xuXG5cdFx0aWYgKGV2ZW50LndoaWNoID09PSAzKSB7XG5cdFx0XHRyZXR1cm47XG4gICAgfVxuXG4gICAgc3RhZ2UgPSB0aGlzLl9wcmVwYXJlRHJhZ2dpbmcoZXZlbnQpO1xuXG5cdFx0dGhpcy5fZHJhZy50aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cdFx0dGhpcy5fZHJhZy50YXJnZXQgPSBldmVudC50YXJnZXQ7XG5cdFx0dGhpcy5fZHJhZy5zdGFnZS5zdGFydCA9IHN0YWdlO1xuXHRcdHRoaXMuX2RyYWcuc3RhZ2UuY3VycmVudCA9IHN0YWdlO1xuICAgIHRoaXMuX2RyYWcucG9pbnRlciA9IHRoaXMuX3BvaW50ZXIoZXZlbnQpO1xuICAgIHRoaXMuX2RyYWcuYWN0aXZlID0gdHJ1ZTtcblxuICAgIHRoaXMubGlzdGVuZXJNb3VzZVVwID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICdtb3VzZXVwJywgdGhpcy5iaW5kT25EcmFnRW5kKTtcbiAgICB0aGlzLmxpc3RlbmVyVG91Y2hFbmQgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ3RvdWNoZW5kJywgdGhpcy5iaW5kT25EcmFnRW5kKTtcblxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLmxpc3RlbmVyT25lTW91c2VNb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLmJpbmRPbmVNb3VzZVRvdWNoTW92ZSk7XG4gICAgICB0aGlzLmxpc3RlbmVyT25lVG91Y2hNb3ZlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICd0b3VjaG1vdmUnLCB0aGlzLmJpbmRPbmVNb3VzZVRvdWNoTW92ZSk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2hlcyBsaXN0ZW5lcnMgdG8gYHRvdWNobW92ZWAgYW5kIGBtb3VzZW1vdmVgIGV2ZW50czsgaW5pdGlhdGVzIHVwZGF0aW5nIGNhcm91c2VsIGFmdGVyIHN0YXJ0aW5nIGRyYWdnaW5nXG4gICAqIEBwYXJhbSBldmVudCBldmVudCBvYmplY2ggb2YgbW91c2Ugb3IgdG91Y2ggZXZlbnRcbiAgICovXG4gIHByaXZhdGUgX29uZU1vdXNlVG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9kcmFnLmFjdGl2ZSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGRlbHRhID0gdGhpcy5fZGlmZmVyZW5jZSh0aGlzLl9kcmFnLnBvaW50ZXIsIHRoaXMuX3BvaW50ZXIoZXZlbnQpKTtcblxuICAgIHRoaXMubGlzdGVuZXJPbmVNb3VzZU1vdmUoKTtcbiAgICB0aGlzLmxpc3RlbmVyT25lVG91Y2hNb3ZlKCk7XG5cbiAgICBpZiAoTWF0aC5hYnMoZGVsdGEueCkgPCBNYXRoLmFicyhkZWx0YS55KSAmJiB0aGlzLl9pcygndmFsaWQnKSkge1xuICAgICAgdGhpcy5fZHJhZy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZHJhZy5tb3ZpbmcgPSB0cnVlO1xuXG4gICAgdGhpcy5saXN0ZW5lck1vdXNlTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5iaW5kT25EcmFnTW92ZSk7XG4gICAgdGhpcy5saXN0ZW5lclRvdWNoTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5iaW5kT25EcmFnTW92ZSk7XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5fZW50ZXJEcmFnZ2luZygpO1xuICAgIHRoaXMuX29uZURyYWdNb3ZlJC5uZXh0KGV2ZW50KTtcbiAgICAvLyB0aGlzLl9zZW5kQ2hhbmdlcygpO1xuICB9XG5cbiAgXHQvKipcblx0ICogSGFuZGxlcyB0aGUgYHRvdWNobW92ZWAgYW5kIGBtb3VzZW1vdmVgIGV2ZW50cy5cblx0ICogQHRvZG8gIzI2MVxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxuXHQgKi9cblx0cHJpdmF0ZSBfb25EcmFnTW92ZShldmVudCkge1xuICAgIGlmICghdGhpcy5fZHJhZy5hY3RpdmUpIHJldHVybiBmYWxzZTtcblxuICAgIGxldCBzdGFnZTogQ29vcmRzO1xuICAgIGNvbnN0IHN0YWdlT3JFeGl0OiBib29sZWFuIHwgQ29vcmRzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZGVmaW5lTmV3Q29vcmRzRHJhZyhldmVudCwgdGhpcy5fZHJhZyk7XG5cbiAgICBpZiAoc3RhZ2VPckV4aXQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN0YWdlID0gc3RhZ2VPckV4aXQgYXMgQ29vcmRzO1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHRoaXMuX2RyYWcuc3RhZ2UuY3VycmVudCA9IHN0YWdlO1xuXHRcdHRoaXMuX2FuaW1hdGUoc3RhZ2UueCAtIHRoaXMuX2RyYWcuc3RhZ2Uuc3RhcnQueCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1vdmVzIC5vd2wtc3RhZ2UgbGVmdC1yaWdodFxuICAgKiBAcGFyYW0gY29vcmRpbmF0ZSBjb29yZGluYXRlIHRvIGJlIHNldCB0byAub3dsLXN0YWdlXG4gICAqL1xuICBwcml2YXRlIF9hbmltYXRlKGNvb3JkaW5hdGU6IG51bWJlcikge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAndHJhbnNmb3JtJywgYHRyYW5zbGF0ZTNkKCR7Y29vcmRpbmF0ZX1weCwwcHgsMHB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICd0cmFuc2l0aW9uJywgJzBzJyk7XG4gIH1cblxuICAvKipcblx0ICogSGFuZGxlcyB0aGUgYHRvdWNoZW5kYCBhbmQgYG1vdXNldXBgIGV2ZW50cy5cblx0ICogQHRvZG8gIzI2MVxuXHQgKiBAdG9kbyBUaHJlc2hvbGQgZm9yIGNsaWNrIGV2ZW50XG5cdCAqIEBwYXJhbSBldmVudCAtIFRoZSBldmVudCBhcmd1bWVudHMuXG5cdCAqL1xuXHRwcml2YXRlIF9vbkRyYWdFbmQoZXZlbnQpIHtcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5vd2xET01EYXRhLmlzR3JhYiA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuX2RyYWcubW92aW5nKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zZm9ybScsIGBgKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAndHJhbnNpdGlvbicsIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNwZWVkKCt0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5kcmFnRW5kU3BlZWQgfHwgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3Muc21hcnRTcGVlZCkvMTAwMCArJ3MnKTtcblxuICAgICAgdGhpcy5fZmluaXNoRHJhZ2dpbmcoZXZlbnQpO1xuICAgICAgdGhpcy5saXN0ZW5lck1vdXNlTW92ZSgpO1xuICAgICAgdGhpcy5saXN0ZW5lclRvdWNoTW92ZSgpO1xuICAgIH1cblxuICAgIHRoaXMuX2RyYWcgPSB7XG4gICAgICB0aW1lOiBudWxsLFxuICAgICAgdGFyZ2V0OiBudWxsLFxuICAgICAgcG9pbnRlcjogbnVsbCxcbiAgICAgIHN0YWdlOiB7XG4gICAgICAgIHN0YXJ0OiBudWxsLFxuICAgICAgICBjdXJyZW50OiBudWxsXG4gICAgICB9LFxuICAgICAgZGlyZWN0aW9uOiBudWxsLFxuICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgIG1vdmluZzogZmFsc2VcbiAgICB9O1xuXG4gICAgLy8gdGhpcy5jYXJvdXNlbFNlcnZpY2UudHJpZ2dlcignZHJhZ2dlZCcpO1xuICAgIHRoaXMubGlzdGVuZXJNb3VzZVVwKCk7XG4gICAgdGhpcy5saXN0ZW5lclRvdWNoRW5kKCk7XG4gIH07XG5cbiAgLyoqXG5cdCAqIFByZXBhcmVzIGRhdGEgZm9yIGRyYWdnaW5nIGNhcm91c2VsLiBJdCBzdGFydHMgYWZ0ZXIgZmlyaW5nIGB0b3VjaHN0YXJ0YCBhbmQgYG1vdXNlZG93bmAgZXZlbnRzLlxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxuXHQgKiBAcmV0dXJucyBzdGFnZSAtIG9iamVjdCB3aXRoICd4JyBhbmQgJ3knIGNvb3JkaW5hdGVzIG9mIC5vd2wtc3RhZ2Vcblx0ICovXG4gIHByaXZhdGUgX3ByZXBhcmVEcmFnZ2luZyhldmVudDogYW55KTogQ29vcmRzIHtcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UucHJlcGFyZURyYWdnaW5nKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2hlcyBoYW5kbGVyIGZvciAnY2xpY2snIGV2ZW50IG9uIGFueSBlbGVtZW50IGluIC5vd2wtc3RhZ2UgaW4gb3JkZXIgdG8gcHJldmVudCBkcmFnZ2luZyB3aGVuIG1vdmluZyBvZiBjdXJzb3IgaXMgbGVzcyB0aGFuIDNweFxuICAgKi9cbiAgcHJpdmF0ZSBfb25lQ2xpY2tIYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMubGlzdGVuZXJPbmVDbGljayA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuX2RyYWcudGFyZ2V0LCAnY2xpY2snLCAoKSA9PiBmYWxzZSlcbiAgICB0aGlzLmxpc3RlbmVyT25lQ2xpY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5pc2hlcyBkcmFnZ2luZ1xuICAgKiBAcGFyYW0gZXZlbnQgb2JqZWN0IGV2ZW50IG9mICdtb3VzZVVwJyBvZiAndG91Y2hlbmQnIGV2ZW50c1xuICAgKi9cbiAgcHJpdmF0ZSBfZmluaXNoRHJhZ2dpbmcoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmZpbmlzaERyYWdnaW5nKGV2ZW50LCB0aGlzLl9kcmFnLCB0aGlzLl9vbmVDbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG5cdCAqIEdldHMgdW5pZmllZCBwb2ludGVyIGNvb3JkaW5hdGVzIGZyb20gZXZlbnQuXG5cdCAqIEBwYXJhbSBldmVudCBUaGUgYG1vdXNlZG93bmAgb3IgYHRvdWNoc3RhcnRgIGV2ZW50LlxuXHQgKiBAcmV0dXJucyBDb250YWlucyBgeGAgYW5kIGB5YCBjb29yZGluYXRlcyBvZiBjdXJyZW50IHBvaW50ZXIgcG9zaXRpb24uXG5cdCAqL1xuICBwcml2YXRlIF9wb2ludGVyKGV2ZW50OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmNhcm91c2VsU2VydmljZS5wb2ludGVyKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuXHQgKiBHZXRzIHRoZSBkaWZmZXJlbmNlIG9mIHR3byB2ZWN0b3JzLlxuXHQgKiBAcGFyYW0gZmlyc3QgVGhlIGZpcnN0IHZlY3Rvci5cblx0ICogQHBhcmFtIHNlY29uZC0gVGhlIHNlY29uZCB2ZWN0b3IuXG5cdCAqIEByZXR1cm5zIFRoZSBkaWZmZXJlbmNlLlxuXHQgKi9cbiAgcHJpdmF0ZSBfZGlmZmVyZW5jZShmaXJzdEM6IENvb3Jkcywgc2Vjb25kOiBDb29yZHMpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmNhcm91c2VsU2VydmljZS5kaWZmZXJlbmNlKGZpcnN0Qywgc2Vjb25kKTtcbiAgfVxuXG4gIC8qKlxuXHQgKiBDaGVja3Mgd2hldGhlciB0aGUgY2Fyb3VzZWwgaXMgaW4gYSBzcGVjaWZpYyBzdGF0ZSBvciBub3QuXG5cdCAqIEBwYXJhbSBzdGF0ZSBUaGUgc3RhdGUgdG8gY2hlY2suXG5cdCAqIEByZXR1cm5zIFRoZSBmbGFnIHdoaWNoIGluZGljYXRlcyBpZiB0aGUgY2Fyb3VzZWwgaXMgYnVzeS5cblx0ICovXG4gIHByaXZhdGUgX2lzKHN0YXRlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuaXMoc3RhdGUpO1xuICB9XG5cbiAgLyoqXG4gICogRW50ZXJzIGEgc3RhdGUuXG4gICogQHBhcmFtIG5hbWUgVGhlIHN0YXRlIG5hbWUuXG4gICovXG4gIHByaXZhdGUgX2VudGVyKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmVudGVyKG5hbWUpO1xuICB9XG5cbiAgLyoqXG5cdCAqIFNlbmRzIGFsbCBkYXRhIG5lZWRlZCBmb3IgVmlldy5cblx0ICovXG4gIHByaXZhdGUgX3NlbmRDaGFuZ2VzKCkge1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNlbmRDaGFuZ2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlciBmb3IgdHJhbnNpdGlvZW5kIGV2ZW50XG4gICAqL1xuICBvblRyYW5zaXRpb25FbmQoKSB7XG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25UcmFuc2l0aW9uRW5kKCk7XG4gIH1cblxuICAvKipcblx0ICogRW50ZXJzIGludG8gYSAnZHJhZ2dpbmcnIHN0YXRlXG5cdCAqL1xuICBwcml2YXRlIF9lbnRlckRyYWdnaW5nKCkge1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmVudGVyRHJhZ2dpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBlbmQgb2YgJ2FuaW1hdGlvbmVuZCcgZXZlbnRcbiAgICogQHBhcmFtIGlkIElkIG9mIHNsaWRlc1xuICAgKi9cbiAgY2xlYXIoaWQpIHtcbiAgICB0aGlzLmFuaW1hdGVTZXJ2aWNlLmNsZWFyKGlkKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDYXJvdXNlbENvbXBvbmVudCxcbiAgQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVxufSBmcm9tICcuL2Nhcm91c2VsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXSU5ET1dfUFJPVklERVJTIH0gZnJvbSAnLi4vc2VydmljZXMvd2luZG93LXJlZi5zZXJ2aWNlJztcbmltcG9ydCB7IFJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9yZXNpemUuc2VydmljZSc7XG5pbXBvcnQgeyBET0NVTUVOVF9QUk9WSURFUlMgfSBmcm9tICcuLi9zZXJ2aWNlcy9kb2N1bWVudC1yZWYuc2VydmljZSc7XG5pbXBvcnQgeyBTdGFnZUNvbXBvbmVudCB9IGZyb20gJy4vc3RhZ2Uvc3RhZ2UuY29tcG9uZW50JztcbmV4cG9ydCB7XG4gIENhcm91c2VsQ29tcG9uZW50LFxuICBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlLFxuICBTbGlkZXNPdXRwdXREYXRhXG59IGZyb20gJy4vY2Fyb3VzZWwuY29tcG9uZW50JztcblxuaW1wb3J0IHsgUm91dGVyTW9kdWxlLCBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtdO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXSxcbiAgZGVjbGFyYXRpb25zOiBbQ2Fyb3VzZWxDb21wb25lbnQsIENhcm91c2VsU2xpZGVEaXJlY3RpdmUsIFN0YWdlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0Nhcm91c2VsQ29tcG9uZW50LCBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlXSxcbiAgcHJvdmlkZXJzOiBbV0lORE9XX1BST1ZJREVSUywgUmVzaXplU2VydmljZSwgRE9DVU1FTlRfUFJPVklERVJTXVxufSlcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbE1vZHVsZSB7fVxuIl0sIm5hbWVzIjpbIlN1YmplY3QiLCJJbmplY3RhYmxlIiwiRXZlbnRNYW5hZ2VyIiwibWVyZ2UiLCJ0YXAiLCJmaWx0ZXIiLCJJbmplY3Rpb25Ub2tlbiIsInRzbGliXzEuX19leHRlbmRzIiwiaXNQbGF0Zm9ybUJyb3dzZXIiLCJQTEFURk9STV9JRCIsIkluamVjdCIsIkRpcmVjdGl2ZSIsIlRlbXBsYXRlUmVmIiwiSW5wdXQiLCJFdmVudEVtaXR0ZXIiLCJkZWxheSIsIkNvbXBvbmVudCIsIkVsZW1lbnRSZWYiLCJDb250ZW50Q2hpbGRyZW4iLCJPdXRwdXQiLCJmaXJzdCIsInRyaWdnZXIiLCJzdGF0ZSIsInN0eWxlIiwidHJhbnNpdGlvbiIsImFuaW1hdGUiLCJOZ1pvbmUiLCJSZW5kZXJlcjIiLCJIb3N0TGlzdGVuZXIiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIlJvdXRlck1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBd0JFLHVCQUFvQixZQUEwQjtZQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztZQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUlBLFlBQU8sRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQ3RDLFFBQVEsRUFDUixRQUFRLEVBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3pCLENBQUM7WUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUN0QyxRQUFRLEVBQ1IsUUFBUSxFQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN6QixDQUFDO1NBQ0g7UUFyQkQsc0JBQUksb0NBQVM7Ozs7Ozs7O2dCQUFiO2dCQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUMxQzs7O1dBQUE7Ozs7OztRQXlCTyxnQ0FBUTs7Ozs7c0JBQUMsS0FBYztnQkFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLG1CQUFTLEtBQUssQ0FBQyxNQUFNLEVBQUMsQ0FBQzs7Ozs7OztRQU94QyxnQ0FBUTs7Ozs7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