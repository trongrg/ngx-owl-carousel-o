/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OwlCarouselOConfig, OwlOptionsMockedTypes } from '../carousel/owl-carousel-o-config';
/**
 * Current state information and their tags.
 */
export class States {
}
if (false) {
    /** @type {?} */
    States.prototype.current;
    /** @type {?} */
    States.prototype.tags;
}
/** @enum {string} */
const Type = {
    Event: 'event',
    State: 'state',
};
export { Type };
;
/** @enum {string} */
const Width = {
    Default: 'default',
    Inner: 'inner',
    Outer: 'outer',
};
export { Width };
;
/**
 * Model for coords of .owl-stage
 */
export class Coords {
}
if (false) {
    /** @type {?} */
    Coords.prototype.x;
    /** @type {?} */
    Coords.prototype.y;
}
/**
 * Model for all current data of carousel
 */
export class CarouselCurrentData {
}
if (false) {
    /** @type {?} */
    CarouselCurrentData.prototype.owlDOMData;
    /** @type {?} */
    CarouselCurrentData.prototype.stageData;
    /** @type {?} */
    CarouselCurrentData.prototype.slidesData;
    /** @type {?} */
    CarouselCurrentData.prototype.navData;
    /** @type {?} */
    CarouselCurrentData.prototype.dotsData;
}
export class CarouselService {
    constructor() {
        /**
         * Subject for passing data needed for managing View
         */
        this._viewSettingsShipper$ = new Subject();
        /**
         * Subject for notification when the carousel got initializes
         */
        this._initializedCarousel$ = new Subject();
        /**
         * Subject for notification when the carousel's settings start changinf
         */
        this._changeSettingsCarousel$ = new Subject();
        /**
         * Subject for notification when the carousel's settings have changed
         */
        this._changedSettingsCarousel$ = new Subject();
        /**
         * Subject for notification when the carousel starts translating or moving
         */
        this._translateCarousel$ = new Subject();
        /**
         * Subject for notification when the carousel stopped translating or moving
         */
        this._translatedCarousel$ = new Subject();
        /**
         * Subject for notification when the carousel's rebuilding caused by 'resize' event starts
         */
        this._resizeCarousel$ = new Subject();
        /**
         * Subject for notification  when the carousel's rebuilding caused by 'resize' event is ended
         */
        this._resizedCarousel$ = new Subject();
        /**
         * Subject for notification when the refresh of carousel starts
         */
        this._refreshCarousel$ = new Subject();
        /**
         * Subject for notification when the refresh of carousel is ended
         */
        this._refreshedCarousel$ = new Subject();
        /**
         * Subject for notification when the dragging of carousel starts
         */
        this._dragCarousel$ = new Subject();
        /**
         * Subject for notification when the dragging of carousel is ended
         */
        this._draggedCarousel$ = new Subject();
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
                run: cache => {
                    cache.current = this._items && this._items[this.relative(this._current)].id;
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
                run: (cache) => {
                    /** @type {?} */
                    const margin = this.settings.margin || '';
                    /** @type {?} */
                    const grid = !this.settings.autoWidth;
                    /** @type {?} */
                    const rtl = this.settings.rtl;
                    /** @type {?} */
                    const css = {
                        'margin-left': rtl ? margin : '',
                        'margin-right': rtl ? '' : margin
                    };
                    if (!grid) {
                        this.slidesData.forEach(slide => {
                            slide.marginL = css['margin-left'];
                            slide.marginR = css['margin-right'];
                        });
                    }
                    cache.css = css;
                }
            }, {
                filter: ['width', 'items', 'settings'],
                run: (cache) => {
                    /** @type {?} */
                    const width = +(this.width() / this.settings.items).toFixed(3) - this.settings.margin;
                    /** @type {?} */
                    const grid = !this.settings.autoWidth;
                    /** @type {?} */
                    const widths = [];
                    /** @type {?} */
                    let merge = null;
                    /** @type {?} */
                    let iterator = this._items.length;
                    cache.items = {
                        merge: false,
                        width: width
                    };
                    while (iterator--) {
                        merge = this._mergers[iterator];
                        merge = this.settings.mergeFit && Math.min(merge, this.settings.items) || merge;
                        cache.items.merge = merge > 1 || cache.items.merge;
                        widths[iterator] = !grid ? this._items[iterator].width ? this._items[iterator].width : width : width * merge;
                    }
                    this._widths = widths;
                    this.slidesData.forEach((slide, i) => {
                        slide.width = this._widths[i];
                        slide.marginR = cache.css['margin-right'];
                        slide.marginL = cache.css['margin-left'];
                    });
                }
            }, {
                filter: ['items', 'settings'],
                run: () => {
                    /** @type {?} */
                    const clones = [];
                    /** @type {?} */
                    const items = this._items;
                    /** @type {?} */
                    const settings = this.settings;
                    /** @type {?} */
                    const 
                    // TODO: Should be computed from number of min width items in stage
                    view = Math.max(settings.items * 2, 4);
                    /** @type {?} */
                    const size = Math.ceil(items.length / 2) * 2;
                    /** @type {?} */
                    let append = [];
                    /** @type {?} */
                    let prepend = [];
                    /** @type {?} */
                    let repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0;
                    repeat /= 2;
                    while (repeat--) {
                        // Switch to only using appended clones
                        clones.push(this.normalize(clones.length / 2, true));
                        append.push(Object.assign({}, this.slidesData[clones[clones.length - 1]]));
                        clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
                        prepend.unshift(Object.assign({}, this.slidesData[clones[clones.length - 1]]));
                    }
                    this._clones = clones;
                    append = append.map(slide => {
                        slide.id = `${this.clonedIdPrefix}${slide.id}`;
                        slide.isActive = false;
                        slide.isCloned = true;
                        return slide;
                    });
                    prepend = prepend.map(slide => {
                        slide.id = `${this.clonedIdPrefix}${slide.id}`;
                        slide.isActive = false;
                        slide.isCloned = true;
                        return slide;
                    });
                    this.slidesData = prepend.concat(this.slidesData).concat(append);
                }
            }, {
                filter: ['width', 'items', 'settings'],
                run: () => {
                    /** @type {?} */
                    const rtl = this.settings.rtl ? 1 : -1;
                    /** @type {?} */
                    const size = this._clones.length + this._items.length;
                    /** @type {?} */
                    const coordinates = [];
                    /** @type {?} */
                    let iterator = -1;
                    /** @type {?} */
                    let previous = 0;
                    /** @type {?} */
                    let current = 0;
                    while (++iterator < size) {
                        previous = coordinates[iterator - 1] || 0;
                        current = this._widths[this.relative(iterator)] + this.settings.margin;
                        coordinates.push(previous + current * rtl);
                    }
                    this._coordinates = coordinates;
                }
            }, {
                filter: ['width', 'items', 'settings'],
                run: () => {
                    /** @type {?} */
                    const padding = this.settings.stagePadding;
                    /** @type {?} */
                    const coordinates = this._coordinates;
                    /** @type {?} */
                    const css = {
                        'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
                        'padding-left': padding || '',
                        'padding-right': padding || ''
                    };
                    this.stageData.width = css.width; // use this property in *ngIf directive for .owl-stage element
                    this.stageData.paddingL = css['padding-left'];
                    this.stageData.paddingR = css['padding-right'];
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
                run: cache => {
                    /** @type {?} */
                    let current = cache.current ? this.slidesData.findIndex(slide => slide.id === cache.current) : 0;
                    current = Math.max(this.minimum(), Math.min(this.maximum(), current));
                    this.reset(current);
                }
            }, {
                filter: ['position'],
                run: () => {
                    this.animate(this.coordinates(this._current));
                }
            }, {
                filter: ['width', 'position', 'items', 'settings'],
                run: () => {
                    /** @type {?} */
                    const rtl = this.settings.rtl ? 1 : -1;
                    /** @type {?} */
                    const padding = this.settings.stagePadding * 2;
                    /** @type {?} */
                    const matches = [];
                    /** @type {?} */
                    let begin;
                    /** @type {?} */
                    let end;
                    /** @type {?} */
                    let inner;
                    /** @type {?} */
                    let outer;
                    /** @type {?} */
                    let i;
                    /** @type {?} */
                    let n;
                    begin = this.coordinates(this.current());
                    if (typeof begin === 'number') {
                        begin += padding;
                    }
                    else {
                        begin = 0;
                    }
                    end = begin + this.width() * rtl;
                    if (rtl === -1 && this.settings.center) {
                        /** @type {?} */
                        const result = this._coordinates.filter(element => {
                            return this.settings.items % 2 === 1 ? element >= begin : element > begin;
                        });
                        begin = result.length ? result[result.length - 1] : begin;
                    }
                    for (i = 0, n = this._coordinates.length; i < n; i++) {
                        inner = Math.ceil(this._coordinates[i - 1] || 0);
                        outer = Math.ceil(Math.abs(this._coordinates[i]) + padding * rtl);
                        if ((this._op(inner, '<=', begin) && (this._op(inner, '>', end)))
                            || (this._op(outer, '<', begin) && this._op(outer, '>', end))) {
                            matches.push(i);
                        }
                    }
                    this.slidesData.forEach(slide => {
                        slide.isActive = false;
                        return slide;
                    });
                    matches.forEach(item => {
                        this.slidesData[item].isActive = true;
                    });
                    if (this.settings.center) {
                        this.slidesData.forEach(slide => {
                            slide.isCentered = false;
                            return slide;
                        });
                        /** @type {?} */
                        const current = this.current();
                        for (const s of this.slidesData) {
                            s.classes = {};
                        }
                        this.slidesData[current].isCentered = true;
                        this.slidesData[current - 1].classes = { 'previous-1': true };
                        this.slidesData[current - 2].classes = { 'previous-2': true };
                        this.slidesData[current + 1].classes = { 'next-1': true };
                        this.slidesData[current + 2].classes = { 'next-2': true };
                    }
                }
            }
        ];
    }
    /**
     * @return {?}
     */
    get invalidated() {
        return this._invalidated;
    }
    /**
     * @return {?}
     */
    get states() {
        return this._states;
    }
    /**
     * Makes _viewSettingsShipper$ Subject become Observable
     * @return {?} Observable of _viewSettingsShipper$ Subject
     */
    getViewCurSettings() {
        return this._viewSettingsShipper$.asObservable();
    }
    /**
     * Makes _initializedCarousel$ Subject become Observable
     * @return {?} Observable of _initializedCarousel$ Subject
     */
    getInitializedState() {
        return this._initializedCarousel$.asObservable();
    }
    /**
     * Makes _changeSettingsCarousel$ Subject become Observable
     * @return {?} Observable of _changeSettingsCarousel$ Subject
     */
    getChangeState() {
        return this._changeSettingsCarousel$.asObservable();
    }
    /**
     * Makes _changedSettingsCarousel$ Subject become Observable
     * @return {?} Observable of _changedSettingsCarousel$ Subject
     */
    getChangedState() {
        return this._changedSettingsCarousel$.asObservable();
    }
    /**
     * Makes _translateCarousel$ Subject become Observable
     * @return {?} Observable of _translateCarousel$ Subject
     */
    getTranslateState() {
        return this._translateCarousel$.asObservable();
    }
    /**
     * Makes _translatedCarousel$ Subject become Observable
     * @return {?} Observable of _translatedCarousel$ Subject
     */
    getTranslatedState() {
        return this._translatedCarousel$.asObservable();
    }
    /**
     * Makes _resizeCarousel$ Subject become Observable
     * @return {?} Observable of _resizeCarousel$ Subject
     */
    getResizeState() {
        return this._resizeCarousel$.asObservable();
    }
    /**
     * Makes _resizedCarousel$ Subject become Observable
     * @return {?} Observable of _resizedCarousel$ Subject
     */
    getResizedState() {
        return this._resizedCarousel$.asObservable();
    }
    /**
     * Makes _refreshCarousel$ Subject become Observable
     * @return {?} Observable of _refreshCarousel$ Subject
     */
    getRefreshState() {
        return this._refreshCarousel$.asObservable();
    }
    /**
     * Makes _refreshedCarousel$ Subject become Observable
     * @return {?} Observable of _refreshedCarousel$ Subject
     */
    getRefreshedState() {
        return this._refreshedCarousel$.asObservable();
    }
    /**
     * Makes _dragCarousel$ Subject become Observable
     * @return {?} Observable of _dragCarousel$ Subject
     */
    getDragState() {
        return this._dragCarousel$.asObservable();
    }
    /**
     * Makes _draggedCarousel$ Subject become Observable
     * @return {?} Observable of _draggedCarousel$ Subject
     */
    getDraggedState() {
        return this._draggedCarousel$.asObservable();
    }
    /**
     * Setups custom options expanding default options
     * @param {?} options custom options
     * @return {?}
     */
    setOptions(options) {
        /** @type {?} */
        const configOptions = new OwlCarouselOConfig();
        /** @type {?} */
        const checkedOptions = this._validateOptions(options, configOptions);
        this._options = Object.assign({}, configOptions, checkedOptions);
    }
    /**
     * Checks whether user's option are set properly. Cheking is based on typings;
     * @param {?} options options set by user
     * @param {?} configOptions default options
     * @return {?} checked and modified (if it's needed) user's options
     *
     * Notes:
     *  - if user set option with wrong type, it'll be written in console
     */
    _validateOptions(options, configOptions) {
        /** @type {?} */
        const checkedOptions = Object.assign({}, options);
        /** @type {?} */
        const mockedTypes = new OwlOptionsMockedTypes();
        for (const key in checkedOptions) {
            if (checkedOptions.hasOwnProperty(key)) {
                // condition could be shortened but it gets harder for understanding
                if (mockedTypes[key] === 'number') {
                    if (this._isNumeric(checkedOptions[key])) {
                        checkedOptions[key] = +checkedOptions[key];
                        checkedOptions[key] = key === 'items' ? this._validateItems(checkedOptions[key]) : checkedOptions[key];
                    }
                    else {
                        checkedOptions[key] = setRightOption(mockedTypes[key], key);
                    }
                }
                else if (mockedTypes[key] === 'boolean' && typeof checkedOptions[key] !== 'boolean') {
                    checkedOptions[key] = setRightOption(mockedTypes[key], key);
                }
                else if (mockedTypes[key] === 'number|boolean' && !this._isNumberOrBoolean(checkedOptions[key])) {
                    checkedOptions[key] = setRightOption(mockedTypes[key], key);
                }
                else if (mockedTypes[key] === 'number|string' && !this._isNumberOrString(checkedOptions[key])) {
                    checkedOptions[key] = setRightOption(mockedTypes[key], key);
                }
                else if (mockedTypes[key] === 'string|boolean' && !this._isStringOrBoolean(checkedOptions[key])) {
                    checkedOptions[key] = setRightOption(mockedTypes[key], key);
                }
                else if (mockedTypes[key] === 'string[]') {
                    if (Array.isArray(checkedOptions[key])) {
                        /** @type {?} */
                        let isString = false;
                        checkedOptions[key].forEach(element => {
                            isString = typeof element === 'string' ? true : false;
                        });
                        if (!isString) {
                            checkedOptions[key] = setRightOption(mockedTypes[key], key);
                        }
                        ;
                    }
                    else {
                        checkedOptions[key] = setRightOption(mockedTypes[key], key);
                    }
                }
            }
        }
        /**
         * @param {?} type
         * @param {?} key
         * @return {?}
         */
        function setRightOption(type, key) {
            console.log(`options.${key} must be type of ${type}; ${key}=${options[key]} skipped to defaults: ${key}=${configOptions[key]}`);
            return configOptions[key];
        }
        return checkedOptions;
    }
    /**
     * Checks option items set by user and if it bigger than number of slides then returns number of slides
     * @param {?} items option items set by user
     * @return {?} right number of items
     */
    _validateItems(items) {
        /** @type {?} */
        let result;
        if (items >= this._items.length) {
            result = this._items.length;
            console.log('option \'items\' in your options is bigger than number of slides; This option is updated to current number of slides and navigation got disabled');
        }
        else {
            result = items;
        }
        return result;
    }
    /**
     * Set current width of carousel
     * @param {?} width width of carousel Window
     * @return {?}
     */
    setCarouselWidth(width) {
        this._width = width;
    }
    /**
     * Setups the current settings.
     * \@todo Remove responsive classes. Why should adaptive designs be brought into IE8?
     * \@todo Support for media queries by using `matchMedia` would be nice.
     * @param {?} carouselWidth width of carousel
     * @param {?} slides array of slides
     * @param {?} options options set by user
     * @return {?}
     */
    setup(carouselWidth, slides, options) {
        this.setCarouselWidth(carouselWidth);
        this.setItems(slides);
        this._defineSlidesData();
        this.setOptions(options);
        this.settings = Object.assign({}, this._options);
        this.setViewportItemsN();
        this._trigger('change', { property: { name: 'settings', value: this.settings } });
        this.invalidate('settings'); // must be call of this function;
        this._trigger('changed', { property: { name: 'settings', value: this.settings } });
    }
    /**
     * Set number of items for current viewport
     * @return {?}
     */
    setViewportItemsN() {
        /** @type {?} */
        const viewport = this._width;
        /** @type {?} */
        const overwrites = this._options.responsive;
        /** @type {?} */
        let match = -1;
        if (!Object.keys(overwrites).length) {
            return;
        }
        for (const key in overwrites) {
            if (overwrites.hasOwnProperty(key)) {
                if (+key <= viewport && +key > match) {
                    match = Number(key);
                }
            }
        }
        this.settings = Object.assign({}, this.settings, { items: this._validateItems(overwrites[match].items) });
        // if (typeof this.settings.stagePadding === 'function') {
        // 	this.settings.stagePadding = this.settings.stagePadding();
        // }
        delete this.settings.responsive;
        this.owlDOMData.isResponsive = true;
        this._breakpoint = match;
        this.invalidate('settings');
    }
    /**
     * Initializes the carousel.
     * @param {?} slides array of CarouselSlideDirective
     * @return {?}
     */
    initialize(slides) {
        this.enter('initializing');
        // this.trigger('initialize');
        this.owlDOMData.rtl = this.settings.rtl;
        slides.forEach(item => {
            /** @type {?} */
            const mergeN = this.settings.merge ? item.dataMerge : 1;
            this._mergers.push(mergeN);
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
    }
    ;
    /**
     * Sends all data needed for View
     * @return {?}
     */
    sendChanges() {
        this._viewSettingsShipper$.next({
            owlDOMData: this.owlDOMData,
            stageData: this.stageData,
            slidesData: this.slidesData,
            navData: this.navData,
            dotsData: this.dotsData
        });
    }
    /**
     * Updates option logic if necessery
     * @return {?}
     */
    _optionsLogic() {
        if (this.settings.autoWidth) {
            this.settings.stagePadding = 0;
            this.settings.merge = false;
        }
    }
    /**
     * Updates the view
     * @return {?}
     */
    update() {
        /** @type {?} */
        let i = 0;
        /** @type {?} */
        const n = this._pipe.length;
        /** @type {?} */
        const filter = item => this._invalidated[item];
        /** @type {?} */
        const cache = {};
        while (i < n) {
            /** @type {?} */
            const filteredPipe = this._pipe[i].filter.filter(filter);
            if (this._invalidated.all || filteredPipe.length > 0) {
                this._pipe[i].run(cache);
            }
            i++;
        }
        this.slidesData.forEach(slide => slide.classes = this.setCurSlideClasses(slide));
        this.sendChanges();
        this._invalidated = {};
        if (!this.is('valid')) {
            this.enter('valid');
        }
    }
    /**
     * Gets the width of the view.
     * @param {?=} dimension
     * @return {?} The width of the view in pixel.
     */
    width(dimension) {
        dimension = dimension || Width.Default;
        switch (dimension) {
            case Width.Inner:
            case Width.Outer:
                return this._width;
            default:
                return this._width - this.settings.stagePadding * 2 + this.settings.margin;
        }
    }
    /**
     * Refreshes the carousel primarily for adaptive purposes.
     * @return {?}
     */
    refresh() {
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
    }
    /**
     * Checks window `resize` event.
     * @param {?} curWidth width of .owl-carousel
     * @return {?}
     */
    onResize(curWidth) {
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
    }
    /**
     * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
     * \@todo Horizontal swipe threshold as option
     * \@todo #261
     * @param {?} event - The event arguments.
     * @return {?} stage - object with 'x' and 'y' coordinates of .owl-stage
     */
    prepareDragging(event) {
        /** @type {?} */
        let stage = null;
        /** @type {?} */
        let transformArr;
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
    }
    /**
     * Enters into a 'dragging' state
     * @return {?}
     */
    enterDragging() {
        this.enter('dragging');
        this._trigger('drag');
    }
    /**
     * Defines new coords for .owl-stage while dragging it
     * \@todo #261
     * @param {?} event the event arguments.
     * @param {?} dragData initial data got after starting dragging
     * @return {?} coords or false
     */
    defineNewCoordsDrag(event, dragData) {
        /** @type {?} */
        let minimum = null;
        /** @type {?} */
        let maximum = null;
        /** @type {?} */
        let pull = null;
        /** @type {?} */
        const delta = this.difference(dragData.pointer, this.pointer(event));
        /** @type {?} */
        const stage = this.difference(dragData.stage.start, delta);
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
    }
    /**
     * Finishes dragging of carousel when `touchend` and `mouseup` events fire.
     * \@todo #261
     * \@todo Threshold for click event
     * @param {?} event the event arguments.
     * @param {?} dragObj the object with dragging settings and states
     * @param {?} clickAttacher function which attaches click handler to slide or its children elements in order to prevent event bubling
     * @return {?}
     */
    finishDragging(event, dragObj, clickAttacher) {
        /** @type {?} */
        const delta = this.difference(dragObj.pointer, this.pointer(event));
        /** @type {?} */
        const stage = dragObj.stage.current;
        /** @type {?} */
        const direction = delta.x > +this.settings.rtl ? 'left' : 'right';
        /** @type {?} */
        let currentSlideI;
        /** @type {?} */
        let current;
        /** @type {?} */
        let newCurrent;
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
    }
    /**
     * Gets absolute position of the closest item for a coordinate.
     * \@todo Setting `freeDrag` makes `closest` not reusable. See #165.
     * @param {?} coordinate The coordinate in pixel.
     * @param {?} direction The direction to check for the closest item. Ether `left` or `right`.
     * @return {?} The absolute position of the closest item.
     */
    closest(coordinate, direction) {
        /** @type {?} */
        const pull = 30;
        /** @type {?} */
        const width = this.width();
        /** @type {?} */
        let coordinates = /** @type {?} */ (this.coordinates());
        /** @type {?} */
        let position = -1;
        if (this.settings.center) {
            coordinates = coordinates.map(item => {
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
        for (let i = 0; i < coordinates.length; i++) {
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
            ;
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
    }
    /**
     * Animates the stage.
     * \@todo #270
     * @param {?} coordinate The coordinate in pixels.
     * @return {?}
     */
    animate(coordinate) {
        /** @type {?} */
        const animate = this.speed() > 0;
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
    }
    /**
     * Checks whether the carousel is in a specific state or not.
     * @param {?} state The state to check.
     * @return {?} The flag which indicates if the carousel is busy.
     */
    is(state) {
        return this._states.current[state] && this._states.current[state] > 0;
    }
    ;
    /**
     * Sets the absolute position of the current item.
     * @param {?=} position The new absolute position or nothing to leave it unchanged.
     * @return {?} The absolute position of the current item.
     */
    current(position) {
        if (position === undefined) {
            return this._current;
        }
        if (this._items.length === 0) {
            return undefined;
        }
        position = this.normalize(position);
        if (this._current !== position) {
            /** @type {?} */
            const event = this._trigger('change', { property: { name: 'position', value: position } });
            // if (event.data !== undefined) {
            // 	position = this.normalize(event.data);
            // }
            this._current = position;
            this.invalidate('position');
            this._trigger('changed', { property: { name: 'position', value: this._current } });
        }
        return this._current;
    }
    /**
     * Invalidates the given part of the update routine.
     * @param {?} part The part to invalidate.
     * @return {?} The invalidated parts.
     */
    invalidate(part) {
        if (typeof part === 'string') {
            this._invalidated[part] = true;
            if (this.is('valid')) {
                this.leave('valid');
            }
        }
        return Object.keys(this._invalidated);
    }
    ;
    /**
     * Resets the absolute position of the current item.
     * @param {?} position the absolute position of the new item.
     * @return {?}
     */
    reset(position) {
        position = this.normalize(position);
        if (position === undefined) {
            return;
        }
        this._speed = 0;
        this._current = position;
        this._suppress(['translate', 'translated']);
        this.animate(this.coordinates(position));
        this._release(['translate', 'translated']);
    }
    /**
     * Normalizes an absolute or a relative position of an item.
     * @param {?} position The absolute or relative position to normalize.
     * @param {?=} relative Whether the given position is relative or not.
     * @return {?} The normalized position.
     */
    normalize(position, relative) {
        /** @type {?} */
        const n = this._items.length;
        /** @type {?} */
        const m = relative ? 0 : this._clones.length;
        if (!this._isNumeric(position) || n < 1) {
            position = undefined;
        }
        else if (position < 0 || position >= n + m) {
            position = ((position - m / 2) % n + n) % n + m / 2;
        }
        return position;
    }
    /**
     * Converts an absolute position of an item into a relative one.
     * @param {?} position The absolute position to convert.
     * @return {?} The converted position.
     */
    relative(position) {
        position -= this._clones.length / 2;
        return this.normalize(position, true);
    }
    /**
     * Gets the maximum position for the current item.
     * @param {?=} relative Whether to return an absolute position or a relative position.
     * @return {?} number of maximum position
     */
    maximum(relative = false) {
        /** @type {?} */
        const settings = this.settings;
        /** @type {?} */
        let maximum = this._coordinates.length;
        /** @type {?} */
        let iterator;
        /** @type {?} */
        let reciprocalItemsWidth;
        /** @type {?} */
        let elementWidth;
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
    }
    /**
     * Gets the minimum position for the current item.
     * @param {?=} relative Whether to return an absolute position or a relative position.
     * @return {?} number of minimum position
     */
    minimum(relative = false) {
        return relative ? 0 : this._clones.length / 2;
    }
    /**
     * Gets an item at the specified relative position.
     * @param {?=} position The relative position of the item.
     * @return {?} The item at the given position or all items if no position was given.
     */
    items(position) {
        if (position === undefined) {
            return this._items.slice();
        }
        position = this.normalize(position, true);
        return [this._items[position]];
    }
    /**
     * Gets an item at the specified relative position.
     * @param {?} position The relative position of the item.
     * @return {?} The item at the given position or all items if no position was given.
     */
    mergers(position) {
        if (position === undefined) {
            return this._mergers.slice();
        }
        position = this.normalize(position, true);
        return this._mergers[position];
    }
    /**
     * Gets the absolute positions of clones for an item.
     * @param {?=} position The relative position of the item.
     * @return {?} The absolute positions of clones for the item or all if no position was given.
     */
    clones(position) {
        /** @type {?} */
        const odd = this._clones.length / 2;
        /** @type {?} */
        const even = odd + this._items.length;
        /** @type {?} */
        const map = index => index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2;
        if (position === undefined) {
            return this._clones.map((v, i) => map(i));
        }
        return this._clones.map((v, i) => v === position ? map(i) : null).filter(item => item);
    }
    /**
     * Sets the current animation speed.
     * @param {?=} speed The animation speed in milliseconds or nothing to leave it unchanged.
     * @return {?} The current animation speed in milliseconds.
     */
    speed(speed) {
        if (speed !== undefined) {
            this._speed = speed;
        }
        return this._speed;
    }
    /**
     * Gets the coordinate of an item.
     * \@todo The name of this method is missleanding.
     * @param {?=} position The absolute position of the item within `minimum()` and `maximum()`.
     * @return {?} The coordinate of the item in pixel or all coordinates.
     */
    coordinates(position) {
        /** @type {?} */
        let multiplier = 1;
        /** @type {?} */
        let newPosition = position - 1;
        /** @type {?} */
        let coordinate;
        /** @type {?} */
        let result;
        if (position === undefined) {
            result = this._coordinates.map((item, index) => {
                return /** @type {?} */ (this.coordinates(index));
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
    }
    /**
     * Calculates the speed for a translation.
     * @param {?} from The absolute position of the start item.
     * @param {?} to The absolute position of the target item.
     * @param {?=} factor [factor=undefined] - The time factor in milliseconds.
     * @return {?} The time in milliseconds for the translation.
     */
    _duration(from, to, factor) {
        if (factor === 0) {
            return 0;
        }
        return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((+factor || this.settings.smartSpeed));
    }
    /**
     * Slides to the specified item.
     * @param {?} position The position of the item.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    to(position, speed) {
        /** @type {?} */
        let current = this.current();
        /** @type {?} */
        let revert = null;
        /** @type {?} */
        let distance = position - this.relative(current);
        /** @type {?} */
        let maximum = this.maximum();
        /** @type {?} */
        const direction = +(distance > 0) - +(distance < 0);
        /** @type {?} */
        const items = this._items.length;
        /** @type {?} */
        const minimum = this.minimum();
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
        setTimeout(() => {
            this.speed(this._duration(current, position, speed));
            this.current(position);
            this.update();
        }, 0);
    }
    /**
     * Slides to the next item.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    next(speed) {
        speed = speed || false;
        this.to(this.relative(this.current()) + 1, speed);
    }
    /**
     * Slides to the previous item.
     * @param {?} speed The time in milliseconds for the transition.
     * @return {?}
     */
    prev(speed) {
        speed = speed || false;
        this.to(this.relative(this.current()) - 1, speed);
    }
    /**
     * Handles the end of an animation.
     * @param {?=} event - The event arguments.
     * @return {?}
     */
    onTransitionEnd(event) {
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
    }
    /**
     * Gets viewport width.
     * @return {?} - The width in pixel.
     */
    _viewport() {
        /** @type {?} */
        let width;
        if (this._width) {
            width = this._width;
        }
        else {
            console.warn('Can not detect viewport width.');
        }
        return width;
    }
    /**
     * Sets _items
     * @param {?} content The list of slides put into CarouselSlideDirectives.
     * @return {?}
     */
    setItems(content) {
        this._items = content;
    }
    /**
     * Sets slidesData using this._items
     * @return {?}
     */
    _defineSlidesData() {
        /** @type {?} */
        let loadMap;
        if (this.slidesData && this.slidesData.length) {
            loadMap = new Map();
            this.slidesData.forEach(item => {
                if (item.load) {
                    loadMap.set(item.id, item.load);
                }
            });
        }
        this.slidesData = this._items.map(slide => {
            return {
                id: `${slide.id}`,
                isActive: false,
                tplRef: slide.tplRef,
                dataMerge: slide.dataMerge,
                width: 0,
                isCloned: false,
                load: loadMap ? loadMap.get(slide.id) : false,
                hashFragment: slide.dataHash
            };
        });
    }
    /**
     * Sets current classes for slide
     * @param {?} slide Slide of carousel
     * @return {?} object with names of css-classes which are keys and true/false values
     */
    setCurSlideClasses(slide) {
        /** @type {?} */
        let currentClasses = {
            'active': slide.isActive,
            'center': slide.isCentered,
            'cloned': slide.isCloned,
            'animated': slide.isAnimated,
            'owl-animated-in': slide.isDefAnimatedIn,
            'owl-animated-out': slide.isDefAnimatedOut
        };
        currentClasses = Object.assign(currentClasses, slide.classes);
        if (this.settings.animateIn) {
            currentClasses[/** @type {?} */ (this.settings.animateIn)] = slide.isCustomAnimatedIn;
        }
        if (this.settings.animateOut) {
            currentClasses[/** @type {?} */ (this.settings.animateOut)] = slide.isCustomAnimatedOut;
        }
        return currentClasses;
    }
    /**
     * Operators to calculate right-to-left and left-to-right.
     * @param {?} a - The left side operand.
     * @param {?} o - The operator.
     * @param {?} b - The right side operand.
     * @return {?} true/false meaning right-to-left or left-to-right
     */
    _op(a, o, b) {
        /** @type {?} */
        const rtl = this.settings.rtl;
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
    }
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
    _trigger(name, data, namespace, state, enter) {
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
    }
    /**
     * Enters a state.
     * @param {?} name - The state name.
     * @return {?}
     */
    enter(name) {
        [name].concat(this._states.tags[name] || []).forEach((stateName) => {
            if (this._states.current[stateName] === undefined) {
                this._states.current[stateName] = 0;
            }
            this._states.current[stateName]++;
        });
    }
    ;
    /**
     * Leaves a state.
     * @param {?} name - The state name.
     * @return {?}
     */
    leave(name) {
        [name].concat(this._states.tags[name] || []).forEach((stateName) => {
            if (this._states.current[stateName] === 0 || !!this._states.current[stateName]) {
                this._states.current[stateName]--;
            }
        });
    }
    ;
    /**
     * Registers an event or state.
     * @param {?} object - The event or state to register.
     * @return {?}
     */
    register(object) {
        if (object.type === Type.State) {
            if (!this._states.tags[object.name]) {
                this._states.tags[object.name] = object.tags;
            }
            else {
                this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
            }
            this._states.tags[object.name] = this._states.tags[object.name].filter((tag, i) => {
                return this._states.tags[object.name].indexOf(tag) === i;
            });
        }
    }
    /**
     * Suppresses events.
     * @param {?} events The events to suppress.
     * @return {?}
     */
    _suppress(events) {
        events.forEach(event => {
            this._supress[event] = true;
        });
    }
    /**
     * Releases suppressed events.
     * @param {?} events The events to release.
     * @return {?}
     */
    _release(events) {
        events.forEach(event => {
            delete this._supress[event];
        });
    }
    /**
     * Gets unified pointer coordinates from event.
     * \@todo #261
     * @param {?} event The `mousedown` or `touchstart` event.
     * @return {?} Object Coords which contains `x` and `y` coordinates of current pointer position.
     */
    pointer(event) {
        /** @type {?} */
        const result = { x: null, y: null };
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
    }
    /**
     * Determines if the input is a Number or something that can be coerced to a Number
     * @param {?} number The input to be tested
     * @return {?} An indication if the input is a Number or can be coerced to a Number
     */
    _isNumeric(number) {
        return !isNaN(parseFloat(number));
    }
    /**
     * Determines whether value is number or boolean type
     * @param {?} value The input to be tested
     * @return {?} An indication if the input is a Number or can be coerced to a Number, or Boolean
     */
    _isNumberOrBoolean(value) {
        return this._isNumeric(value) || typeof value === 'boolean';
    }
    /**
     * Determines whether value is number or string type
     * @param {?} value The input to be tested
     * @return {?} An indication if the input is a Number or can be coerced to a Number, or String
     */
    _isNumberOrString(value) {
        return this._isNumeric(value) || typeof value === 'string';
    }
    /**
     * Determines whether value is number or string type
     * @param {?} value The input to be tested
     * @return {?} An indication if the input is a Number or can be coerced to a Number, or String
     */
    _isStringOrBoolean(value) {
        return typeof value === 'string' || typeof value === 'boolean';
    }
    /**
     * Gets the difference of two vectors.
     * \@todo #261
     * @param {?} first The first vector.
     * @param {?} second
     * @return {?} The difference.
     */
    difference(first, second) {
        return {
            x: first.x - second.x,
            y: first.y - second.y
        };
    }
}
CarouselService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CarouselService.ctorParameters = () => [];
if (false) {
    /**
     * Subject for passing data needed for managing View
     * @type {?}
     */
    CarouselService.prototype._viewSettingsShipper$;
    /**
     * Subject for notification when the carousel got initializes
     * @type {?}
     */
    CarouselService.prototype._initializedCarousel$;
    /**
     * Subject for notification when the carousel's settings start changinf
     * @type {?}
     */
    CarouselService.prototype._changeSettingsCarousel$;
    /**
     * Subject for notification when the carousel's settings have changed
     * @type {?}
     */
    CarouselService.prototype._changedSettingsCarousel$;
    /**
     * Subject for notification when the carousel starts translating or moving
     * @type {?}
     */
    CarouselService.prototype._translateCarousel$;
    /**
     * Subject for notification when the carousel stopped translating or moving
     * @type {?}
     */
    CarouselService.prototype._translatedCarousel$;
    /**
     * Subject for notification when the carousel's rebuilding caused by 'resize' event starts
     * @type {?}
     */
    CarouselService.prototype._resizeCarousel$;
    /**
     * Subject for notification  when the carousel's rebuilding caused by 'resize' event is ended
     * @type {?}
     */
    CarouselService.prototype._resizedCarousel$;
    /**
     * Subject for notification when the refresh of carousel starts
     * @type {?}
     */
    CarouselService.prototype._refreshCarousel$;
    /**
     * Subject for notification when the refresh of carousel is ended
     * @type {?}
     */
    CarouselService.prototype._refreshedCarousel$;
    /**
     * Subject for notification when the dragging of carousel starts
     * @type {?}
     */
    CarouselService.prototype._dragCarousel$;
    /**
     * Subject for notification when the dragging of carousel is ended
     * @type {?}
     */
    CarouselService.prototype._draggedCarousel$;
    /**
     * Current settings for the carousel.
     * @type {?}
     */
    CarouselService.prototype.settings;
    /**
     * Initial data for setting classes to element .owl-carousel
     * @type {?}
     */
    CarouselService.prototype.owlDOMData;
    /**
     * Initial data of .owl-stage
     * @type {?}
     */
    CarouselService.prototype.stageData;
    /**
     *  Data of every slide
     * @type {?}
     */
    CarouselService.prototype.slidesData;
    /**
     * Data of navigation block
     * @type {?}
     */
    CarouselService.prototype.navData;
    /**
     * Data of dots block
     * @type {?}
     */
    CarouselService.prototype.dotsData;
    /**
     * Carousel width
     * @type {?}
     */
    CarouselService.prototype._width;
    /**
     * All real items.
     * @type {?}
     */
    CarouselService.prototype._items;
    /**
     * Array with width of every slide.
     * @type {?}
     */
    CarouselService.prototype._widths;
    /**
     * Currently suppressed events to prevent them from beeing retriggered.
     * @type {?}
     */
    CarouselService.prototype._supress;
    /**
     * References to the running plugins of this carousel.
     * @type {?}
     */
    CarouselService.prototype._plugins;
    /**
     * Absolute current position.
     * @type {?}
     */
    CarouselService.prototype._current;
    /**
     * All cloned items.
     * @type {?}
     */
    CarouselService.prototype._clones;
    /**
     * Merge values of all items.
     * \@todo Maybe this could be part of a plugin.
     * @type {?}
     */
    CarouselService.prototype._mergers;
    /**
     * Animation speed in milliseconds.
     * @type {?}
     */
    CarouselService.prototype._speed;
    /**
     * Coordinates of all items in pixel.
     * \@todo The name of this member is missleading.
     * @type {?}
     */
    CarouselService.prototype._coordinates;
    /**
     * Current breakpoint.
     * \@todo Real media queries would be nice.
     * @type {?}
     */
    CarouselService.prototype._breakpoint;
    /**
     * Prefix for id of cloned slides
     * @type {?}
     */
    CarouselService.prototype.clonedIdPrefix;
    /**
     * Current options set by the caller including defaults.
     * @type {?}
     */
    CarouselService.prototype._options;
    /**
     * Invalidated parts within the update process.
     * @type {?}
     */
    CarouselService.prototype._invalidated;
    /**
     * Current state information and their tags.
     * @type {?}
     */
    CarouselService.prototype._states;
    /**
     * Ordered list of workers for the update process.
     * @type {?}
     */
    CarouselService.prototype._pipe;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vd2wtY2Fyb3VzZWwtby8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFJQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxPQUFPLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7QUFROUYsTUFBTTtDQUtMOzs7Ozs7Ozs7SUFPQyxPQUFRLE9BQU87SUFDZixPQUFRLE9BQU87OztBQUNoQixDQUFDOzs7SUFPQSxTQUFVLFNBQVM7SUFDbkIsT0FBUSxPQUFPO0lBQ2YsT0FBUSxPQUFPOzs7QUFDaEIsQ0FBQzs7OztBQUtGLE1BQU07Q0FHTDs7Ozs7Ozs7OztBQUtELE1BQU07Q0FNTDs7Ozs7Ozs7Ozs7OztBQUdELE1BQU07SUFvYko7Ozs7cUNBaGJnQyxJQUFJLE9BQU8sRUFBdUI7Ozs7cUNBSWxDLElBQUksT0FBTyxFQUFVOzs7O3dDQUtsQixJQUFJLE9BQU8sRUFBTzs7Ozt5Q0FLakIsSUFBSSxPQUFPLEVBQU87Ozs7bUNBSXhCLElBQUksT0FBTyxFQUFVOzs7O29DQUlwQixJQUFJLE9BQU8sRUFBVTs7OztnQ0FJekIsSUFBSSxPQUFPLEVBQVU7Ozs7aUNBSXBCLElBQUksT0FBTyxFQUFVOzs7O2lDQUlyQixJQUFJLE9BQU8sRUFBVTs7OzttQ0FJbkIsSUFBSSxPQUFPLEVBQVU7Ozs7OEJBSTFCLElBQUksT0FBTyxFQUFVOzs7O2lDQUlsQixJQUFJLE9BQU8sRUFBVTs7Ozt3QkFLMUI7WUFDckIsS0FBSyxFQUFFLENBQUM7U0FDVDs7OzswQkFLd0I7WUFDdkIsR0FBRyxFQUFFLEtBQUs7WUFDVixZQUFZLEVBQUUsS0FBSztZQUNuQixXQUFXLEVBQUUs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QWdCO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzlCO1FBRUQsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2hDOzs7Ozs7SUFPRCxNQUFNLENBQUMsUUFBaUI7O1FBQ3RCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FFeUM7O1FBRjVFLE1BQ0UsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDMkM7O1FBRjVFLE1BRUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTVFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFD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QUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7U0FDdEIsQ0FBQztLQUNIOzs7WUE3bkRGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFnZURhdGEgfSBmcm9tICcuLi9tb2RlbHMvc3RhZ2UtZGF0YS5tb2RlbCc7XG5cbmltcG9ydCB7IE93bERPTURhdGEgfSBmcm9tICcuLi9tb2RlbHMvb3dsRE9NLWRhdGEubW9kZWwnO1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENhcm91c2VsU2xpZGVEaXJlY3RpdmUgfSBmcm9tICcuLi9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUnO1xuaW1wb3J0IHsgU2xpZGVNb2RlbCB9IGZyb20gJy4uL21vZGVscy9zbGlkZS5tb2RlbCc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPd2xDYXJvdXNlbE9Db25maWcsIE93bE9wdGlvbnNNb2NrZWRUeXBlcyB9IGZyb20gJy4uL2Nhcm91c2VsL293bC1jYXJvdXNlbC1vLWNvbmZpZyc7XG5pbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsJztcblxuaW1wb3J0IHsgTmF2RGF0YSwgRG90c0RhdGEgfSBmcm9tICcuLi9tb2RlbHMvbmF2aWdhdGlvbi1kYXRhLm1vZGVscyc7XG5cbi8qKlxuICogQ3VycmVudCBzdGF0ZSBpbmZvcm1hdGlvbiBhbmQgdGhlaXIgdGFncy5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRlcyB7XG4gIGN1cnJlbnQ6IHt9O1xuICB0YWdzOiB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nW107XG4gIH07XG59XG5cbi8qKlxuICogRW51bWVyYXRpb24gZm9yIHR5cGVzLlxuICogQGVudW0ge1N0cmluZ31cbiAqL1xuZXhwb3J0IGVudW0gVHlwZSB7XG4gIEV2ZW50ID0gJ2V2ZW50JyxcbiAgU3RhdGUgPSAnc3RhdGUnXG59O1xuXG4vKipcbiAqIEVudW1lcmF0aW9uIGZvciB3aWR0aC5cbiAqIEBlbnVtIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBlbnVtIFdpZHRoIHtcbiAgRGVmYXVsdCA9ICdkZWZhdWx0JyxcbiAgSW5uZXIgPSAnaW5uZXInLFxuICBPdXRlciA9ICdvdXRlcidcbn07XG5cbi8qKlxuICogTW9kZWwgZm9yIGNvb3JkcyBvZiAub3dsLXN0YWdlXG4gKi9cbmV4cG9ydCBjbGFzcyBDb29yZHMge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBNb2RlbCBmb3IgYWxsIGN1cnJlbnQgZGF0YSBvZiBjYXJvdXNlbFxuICovXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDdXJyZW50RGF0YSB7XG4gIG93bERPTURhdGE6IE93bERPTURhdGE7XG4gIHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xuICBzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW107XG4gIG5hdkRhdGE6IE5hdkRhdGE7XG4gIGRvdHNEYXRhOiBEb3RzRGF0YTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhcm91c2VsU2VydmljZSB7XG4gIC8qKlxuICAgKiBTdWJqZWN0IGZvciBwYXNzaW5nIGRhdGEgbmVlZGVkIGZvciBtYW5hZ2luZyBWaWV3XG4gICAqL1xuICBwcml2YXRlIF92aWV3U2V0dGluZ3NTaGlwcGVyJCA9IG5ldyBTdWJqZWN0PENhcm91c2VsQ3VycmVudERhdGE+KCk7XG4gIC8qKlxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgZ290IGluaXRpYWxpemVzXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsaXplZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuICAvKipcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsJ3Mgc2V0dGluZ3Mgc3RhcnQgY2hhbmdpbmZcbiAgICovXG4gIHByaXZhdGUgX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIC8qKlxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwncyBzZXR0aW5ncyBoYXZlIGNoYW5nZWRcbiAgICovXG4gIHByaXZhdGUgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgLyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCBzdGFydHMgdHJhbnNsYXRpbmcgb3IgbW92aW5nXG4gICAqL1xuICBwcml2YXRlIF90cmFuc2xhdGVDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gIC8qKlxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgc3RvcHBlZCB0cmFuc2xhdGluZyBvciBtb3ZpbmdcbiAgICovXG4gIHByaXZhdGUgX3RyYW5zbGF0ZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gIC8qKlxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwncyByZWJ1aWxkaW5nIGNhdXNlZCBieSAncmVzaXplJyBldmVudCBzdGFydHNcbiAgICovXG4gIHByaXZhdGUgX3Jlc2l6ZUNhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgLyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiAgd2hlbiB0aGUgY2Fyb3VzZWwncyByZWJ1aWxkaW5nIGNhdXNlZCBieSAncmVzaXplJyBldmVudCBpcyBlbmRlZFxuICAgKi9cbiAgcHJpdmF0ZSBfcmVzaXplZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgLyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSByZWZyZXNoIG9mIGNhcm91c2VsIHN0YXJ0c1xuICAgKi9cbiAgcHJpdmF0ZSBfcmVmcmVzaENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgLyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSByZWZyZXNoIG9mIGNhcm91c2VsIGlzIGVuZGVkXG4gICAqL1xuICBwcml2YXRlIF9yZWZyZXNoZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gIC8qKlxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgZHJhZ2dpbmcgb2YgY2Fyb3VzZWwgc3RhcnRzXG4gICAqL1xuICBwcml2YXRlIF9kcmFnQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAvKipcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGRyYWdnaW5nIG9mIGNhcm91c2VsIGlzIGVuZGVkXG4gICAqL1xuICBwcml2YXRlIF9kcmFnZ2VkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IHNldHRpbmdzIGZvciB0aGUgY2Fyb3VzZWwuXG4gICAqL1xuICBzZXR0aW5nczogT3dsT3B0aW9ucyA9IHtcbiAgICBpdGVtczogMFxuICB9O1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIGRhdGEgZm9yIHNldHRpbmcgY2xhc3NlcyB0byBlbGVtZW50IC5vd2wtY2Fyb3VzZWxcbiAgICovXG4gIG93bERPTURhdGE6IE93bERPTURhdGEgPSB7XG4gICAgcnRsOiBmYWxzZSxcbiAgICBpc1Jlc3BvbnNpdmU6IGZhbHNlLFxuICAgIGlzUmVmcmVzaGVkOiBmYWxzZSxcbiAgICBpc0xvYWRlZDogZmFsc2UsXG4gICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICBpc01vdXNlRHJhZ2FibGU6IGZhbHNlLFxuICAgIGlzR3JhYjogZmFsc2UsXG4gICAgaXNUb3VjaERyYWdhYmxlOiBmYWxzZVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIGRhdGEgb2YgLm93bC1zdGFnZVxuICAgKi9cbiAgc3RhZ2VEYXRhOiBTdGFnZURhdGEgPSB7XG4gICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMHB4LDBweCwwcHgpJyxcbiAgICB0cmFuc2l0aW9uOiAnMHMnLFxuICAgIHdpZHRoOiAwLFxuICAgIHBhZGRpbmdMOiAwLFxuICAgIHBhZGRpbmdSOiAwXG4gIH07XG5cbiAgLyoqXG4gICAqICBEYXRhIG9mIGV2ZXJ5IHNsaWRlXG4gICAqL1xuICBzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW107XG5cbiAgLyoqXG4gICAqIERhdGEgb2YgbmF2aWdhdGlvbiBibG9ja1xuICAgKi9cbiAgbmF2RGF0YTogTmF2RGF0YTtcblxuICAvKipcbiAgICogRGF0YSBvZiBkb3RzIGJsb2NrXG4gICAqL1xuICBkb3RzRGF0YTogRG90c0RhdGE7XG5cbiAgLyoqXG4gICAqIENhcm91c2VsIHdpZHRoXG4gICAqL1xuICBwcml2YXRlIF93aWR0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBbGwgcmVhbCBpdGVtcy5cbiAgICovXG4gIHByaXZhdGUgX2l0ZW1zOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10gPSBbXTsgLy8gaXMgZXF1YWwgdG8gdGhpcy5zbGlkZXNcblxuICAvKipcbiAgICogQXJyYXkgd2l0aCB3aWR0aCBvZiBldmVyeSBzbGlkZS5cbiAgICovXG4gIHByaXZhdGUgX3dpZHRoczogYW55W10gPSBbXTtcblxuICAvKipcbiAgICogQ3VycmVudGx5IHN1cHByZXNzZWQgZXZlbnRzIHRvIHByZXZlbnQgdGhlbSBmcm9tIGJlZWluZyByZXRyaWdnZXJlZC5cbiAgICovXG4gIHByaXZhdGUgX3N1cHJlc3M6IGFueSA9IHt9O1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2VzIHRvIHRoZSBydW5uaW5nIHBsdWdpbnMgb2YgdGhpcyBjYXJvdXNlbC5cbiAgICovXG4gIHByaXZhdGUgX3BsdWdpbnM6IGFueSA9IHt9O1xuXG4gIC8qKlxuICAgKiBBYnNvbHV0ZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBfY3VycmVudDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEFsbCBjbG9uZWQgaXRlbXMuXG4gICAqL1xuICBwcml2YXRlIF9jbG9uZXM6IGFueVtdID0gW107XG5cbiAgLyoqXG4gICAqIE1lcmdlIHZhbHVlcyBvZiBhbGwgaXRlbXMuXG4gICAqIEB0b2RvIE1heWJlIHRoaXMgY291bGQgYmUgcGFydCBvZiBhIHBsdWdpbi5cbiAgICovXG4gIHJlYWRvbmx5IF9tZXJnZXJzOiBhbnlbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBBbmltYXRpb24gc3BlZWQgaW4gbWlsbGlzZWNvbmRzLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3BlZWQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBDb29yZGluYXRlcyBvZiBhbGwgaXRlbXMgaW4gcGl4ZWwuXG4gICAqIEB0b2RvIFRoZSBuYW1lIG9mIHRoaXMgbWVtYmVyIGlzIG1pc3NsZWFkaW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBfY29vcmRpbmF0ZXM6IG51bWJlcltdID0gW107XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgYnJlYWtwb2ludC5cbiAgICogQHRvZG8gUmVhbCBtZWRpYSBxdWVyaWVzIHdvdWxkIGJlIG5pY2UuXG4gICAqL1xuICBwcml2YXRlIF9icmVha3BvaW50OiBhbnkgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBQcmVmaXggZm9yIGlkIG9mIGNsb25lZCBzbGlkZXNcbiAgICovXG4gIGNsb25lZElkUHJlZml4ID0gJ2Nsb25lZC0nO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IG9wdGlvbnMgc2V0IGJ5IHRoZSBjYWxsZXIgaW5jbHVkaW5nIGRlZmF1bHRzLlxuICAgKi9cbiAgX29wdGlvbnM6IE93bE9wdGlvbnMgPSB7fTtcblxuICAvKipcbiAgICogSW52YWxpZGF0ZWQgcGFydHMgd2l0aGluIHRoZSB1cGRhdGUgcHJvY2Vzcy5cbiAgICovXG4gIHByaXZhdGUgX2ludmFsaWRhdGVkOiBhbnkgPSB7fTtcblxuICAvLyBJcyBuZWVkZWQgZm9yIHRlc3RzXG4gIGdldCBpbnZhbGlkYXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW52YWxpZGF0ZWQ7XG4gIH1cblxuICAvKipcbiAgICogQ3VycmVudCBzdGF0ZSBpbmZvcm1hdGlvbiBhbmQgdGhlaXIgdGFncy5cbiAgICovXG4gIHByaXZhdGUgX3N0YXRlczogU3RhdGVzID0ge1xuICAgIGN1cnJlbnQ6IHt9LFxuICAgIHRhZ3M6IHtcbiAgICAgIGluaXRpYWxpemluZzogWydidXN5J10sXG4gICAgICBhbmltYXRpbmc6IFsnYnVzeSddLFxuICAgICAgZHJhZ2dpbmc6IFsnaW50ZXJhY3RpbmcnXVxuICAgIH1cbiAgfTtcblxuICAvLyBpcyBuZWVkZWQgZm9yIHRlc3RzXG4gIGdldCBzdGF0ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBPcmRlcmVkIGxpc3Qgb2Ygd29ya2VycyBmb3IgdGhlIHVwZGF0ZSBwcm9jZXNzLlxuICAgKi9cbiAgcHJpdmF0ZSBfcGlwZTogYW55W10gPSBbXG4gICAgLy8ge1xuICAgIC8vICAgZmlsdGVyOiBbJ3dpZHRoJywgJ3NldHRpbmdzJ10sXG4gICAgLy8gICBydW46ICgpID0+IHtcbiAgICAvLyAgICAgdGhpcy5fd2lkdGggPSB0aGlzLmNhcm91c2VsV2luZG93V2lkdGg7XG4gICAgLy8gICB9XG4gICAgLy8gfSxcbiAgICB7XG4gICAgICBmaWx0ZXI6IFsnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnXSxcbiAgICAgIHJ1bjogY2FjaGUgPT4ge1xuICAgICAgICBjYWNoZS5jdXJyZW50ID0gdGhpcy5faXRlbXMgJiYgdGhpcy5faXRlbXNbdGhpcy5yZWxhdGl2ZSh0aGlzLl9jdXJyZW50KV0uaWQ7XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyB7XG4gICAgLy8gICBmaWx0ZXI6IFsnaXRlbXMnLCAnc2V0dGluZ3MnXSxcbiAgICAvLyAgIHJ1bjogZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgIC8vIHRoaXMuJHN0YWdlLmNoaWxkcmVuKCcuY2xvbmVkJykucmVtb3ZlKCk7XG4gICAgLy8gICB9XG4gICAgLy8gfSxcbiAgICB7XG4gICAgICBmaWx0ZXI6IFsnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnXSxcbiAgICAgIHJ1bjogKGNhY2hlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcmdpbiA9IHRoaXMuc2V0dGluZ3MubWFyZ2luIHx8ICcnLFxuICAgICAgICAgIGdyaWQgPSAhdGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgsXG4gICAgICAgICAgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwsXG4gICAgICAgICAgY3NzID0ge1xuICAgICAgICAgICAgJ21hcmdpbi1sZWZ0JzogcnRsID8gbWFyZ2luIDogJycsXG4gICAgICAgICAgICAnbWFyZ2luLXJpZ2h0JzogcnRsID8gJycgOiBtYXJnaW5cbiAgICAgICAgICB9O1xuXG4gICAgICAgIGlmICghZ3JpZCkge1xuICAgICAgICAgIHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgICAgIHNsaWRlLm1hcmdpbkwgPSBjc3NbJ21hcmdpbi1sZWZ0J107XG4gICAgICAgICAgICBzbGlkZS5tYXJnaW5SID0gY3NzWydtYXJnaW4tcmlnaHQnXTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhY2hlLmNzcyA9IGNzcztcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBmaWx0ZXI6IFsnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnXSxcbiAgICAgIHJ1bjogKGNhY2hlKSA9PiB7XG4gICAgICAgIGNvbnN0IHdpZHRoOiBhbnkgPSArKHRoaXMud2lkdGgoKSAvIHRoaXMuc2V0dGluZ3MuaXRlbXMpLnRvRml4ZWQoMykgLSB0aGlzLnNldHRpbmdzLm1hcmdpbixcbiAgICAgICAgICBncmlkID0gIXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLFxuICAgICAgICAgIHdpZHRocyA9IFtdO1xuICAgICAgICBsZXQgbWVyZ2UgPSBudWxsLFxuICAgICAgICAgIGl0ZXJhdG9yID0gdGhpcy5faXRlbXMubGVuZ3RoO1xuXG4gICAgICAgIGNhY2hlLml0ZW1zID0ge1xuICAgICAgICAgIG1lcmdlOiBmYWxzZSxcbiAgICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgICAgfTtcblxuICAgICAgICB3aGlsZSAoaXRlcmF0b3ItLSkge1xuICAgICAgICAgIG1lcmdlID0gdGhpcy5fbWVyZ2Vyc1tpdGVyYXRvcl07XG4gICAgICAgICAgbWVyZ2UgPSB0aGlzLnNldHRpbmdzLm1lcmdlRml0ICYmIE1hdGgubWluKG1lcmdlLCB0aGlzLnNldHRpbmdzLml0ZW1zKSB8fCBtZXJnZTtcbiAgICAgICAgICBjYWNoZS5pdGVtcy5tZXJnZSA9IG1lcmdlID4gMSB8fCBjYWNoZS5pdGVtcy5tZXJnZTtcblxuICAgICAgICAgIHdpZHRoc1tpdGVyYXRvcl0gPSAhZ3JpZCA/IHRoaXMuX2l0ZW1zW2l0ZXJhdG9yXS53aWR0aCA/IHRoaXMuX2l0ZW1zW2l0ZXJhdG9yXS53aWR0aCA6IHdpZHRoIDogd2lkdGggKiBtZXJnZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3dpZHRocyA9IHdpZHRocztcblxuICAgICAgICB0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcbiAgICAgICAgICBzbGlkZS53aWR0aCA9IHRoaXMuX3dpZHRoc1tpXTtcbiAgICAgICAgICBzbGlkZS5tYXJnaW5SID0gY2FjaGUuY3NzWydtYXJnaW4tcmlnaHQnXTtcbiAgICAgICAgICBzbGlkZS5tYXJnaW5MID0gY2FjaGUuY3NzWydtYXJnaW4tbGVmdCddO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBmaWx0ZXI6IFsnaXRlbXMnLCAnc2V0dGluZ3MnXSxcbiAgICAgIHJ1bjogKCkgPT4ge1xuICAgICAgICBjb25zdCBjbG9uZXM6IGFueVtdID0gW10sXG4gICAgICAgICAgaXRlbXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSA9IHRoaXMuX2l0ZW1zLFxuICAgICAgICAgIHNldHRpbmdzOiBhbnkgPSB0aGlzLnNldHRpbmdzLFxuICAgICAgICAgIC8vIFRPRE86IFNob3VsZCBiZSBjb21wdXRlZCBmcm9tIG51bWJlciBvZiBtaW4gd2lkdGggaXRlbXMgaW4gc3RhZ2VcbiAgICAgICAgICB2aWV3ID0gTWF0aC5tYXgoc2V0dGluZ3MuaXRlbXMgKiAyLCA0KSxcbiAgICAgICAgICBzaXplID0gTWF0aC5jZWlsKGl0ZW1zLmxlbmd0aCAvIDIpICogMjtcbiAgICAgICAgbGV0IGFwcGVuZDogYW55W10gPSBbXSxcbiAgICAgICAgICBwcmVwZW5kOiBhbnlbXSA9IFtdLFxuICAgICAgICAgIHJlcGVhdCA9IHNldHRpbmdzLmxvb3AgJiYgaXRlbXMubGVuZ3RoID8gc2V0dGluZ3MucmV3aW5kID8gdmlldyA6IE1hdGgubWF4KHZpZXcsIHNpemUpIDogMDtcblxuICAgICAgICByZXBlYXQgLz0gMjtcblxuICAgICAgICB3aGlsZSAocmVwZWF0LS0pIHtcbiAgICAgICAgICAvLyBTd2l0Y2ggdG8gb25seSB1c2luZyBhcHBlbmRlZCBjbG9uZXNcbiAgICAgICAgICBjbG9uZXMucHVzaCh0aGlzLm5vcm1hbGl6ZShjbG9uZXMubGVuZ3RoIC8gMiwgdHJ1ZSkpO1xuICAgICAgICAgIGFwcGVuZC5wdXNoKHsuLi50aGlzLnNsaWRlc0RhdGFbY2xvbmVzW2Nsb25lcy5sZW5ndGggLSAxXV19KTtcbiAgICAgICAgICBjbG9uZXMucHVzaCh0aGlzLm5vcm1hbGl6ZShpdGVtcy5sZW5ndGggLSAxIC0gKGNsb25lcy5sZW5ndGggLSAxKSAvIDIsIHRydWUpKTtcbiAgICAgICAgICBwcmVwZW5kLnVuc2hpZnQoey4uLnRoaXMuc2xpZGVzRGF0YVtjbG9uZXNbY2xvbmVzLmxlbmd0aCAtIDFdXX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2xvbmVzID0gY2xvbmVzO1xuXG4gICAgICAgIGFwcGVuZCA9IGFwcGVuZC5tYXAoc2xpZGUgPT4ge1xuICAgICAgICAgIHNsaWRlLmlkID0gYCR7dGhpcy5jbG9uZWRJZFByZWZpeH0ke3NsaWRlLmlkfWA7XG4gICAgICAgICAgc2xpZGUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICBzbGlkZS5pc0Nsb25lZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIHNsaWRlO1xuICAgICAgICB9KTtcblxuICAgICAgICBwcmVwZW5kID0gcHJlcGVuZC5tYXAoc2xpZGUgPT4ge1xuICAgICAgICAgIHNsaWRlLmlkID0gYCR7dGhpcy5jbG9uZWRJZFByZWZpeH0ke3NsaWRlLmlkfWA7XG4gICAgICAgICAgc2xpZGUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICBzbGlkZS5pc0Nsb25lZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIHNsaWRlO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNsaWRlc0RhdGEgPSBwcmVwZW5kLmNvbmNhdCh0aGlzLnNsaWRlc0RhdGEpLmNvbmNhdChhcHBlbmQpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGZpbHRlcjogWyd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncyddLFxuICAgICAgcnVuOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsID8gMSA6IC0xLFxuICAgICAgICAgIHNpemUgPSB0aGlzLl9jbG9uZXMubGVuZ3RoICsgdGhpcy5faXRlbXMubGVuZ3RoLFxuICAgICAgICAgIGNvb3JkaW5hdGVzID0gW107XG4gICAgICAgIGxldCBpdGVyYXRvciA9IC0xLFxuICAgICAgICAgIHByZXZpb3VzID0gMCxcbiAgICAgICAgICBjdXJyZW50ID0gMDtcblxuICAgICAgICB3aGlsZSAoKytpdGVyYXRvciA8IHNpemUpIHtcbiAgICAgICAgICBwcmV2aW91cyA9IGNvb3JkaW5hdGVzW2l0ZXJhdG9yIC0gMV0gfHwgMDtcbiAgICAgICAgICBjdXJyZW50ID0gdGhpcy5fd2lkdGhzW3RoaXMucmVsYXRpdmUoaXRlcmF0b3IpXSArIHRoaXMuc2V0dGluZ3MubWFyZ2luO1xuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2gocHJldmlvdXMgKyBjdXJyZW50ICogcnRsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2Nvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXM7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAgZmlsdGVyOiBbJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJ10sXG4gICAgICBydW46ICgpID0+IHtcbiAgICAgICAgY29uc3QgcGFkZGluZyA9IHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nLFxuICAgICAgICAgIGNvb3JkaW5hdGVzID0gdGhpcy5fY29vcmRpbmF0ZXMsXG4gICAgICAgICAgY3NzID0ge1xuICAgICAgICAgICAgJ3dpZHRoJzogTWF0aC5jZWlsKE1hdGguYWJzKGNvb3JkaW5hdGVzW2Nvb3JkaW5hdGVzLmxlbmd0aCAtIDFdKSkgKyBwYWRkaW5nICogMixcbiAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBwYWRkaW5nIHx8ICcnLFxuICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBwYWRkaW5nIHx8ICcnXG4gICAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnN0YWdlRGF0YS53aWR0aCA9IGNzcy53aWR0aDsgLy8gdXNlIHRoaXMgcHJvcGVydHkgaW4gKm5nSWYgZGlyZWN0aXZlIGZvciAub3dsLXN0YWdlIGVsZW1lbnRcbiAgICAgICAgdGhpcy5zdGFnZURhdGEucGFkZGluZ0wgPSBjc3NbJ3BhZGRpbmctbGVmdCddO1xuICAgICAgICB0aGlzLnN0YWdlRGF0YS5wYWRkaW5nUiA9IGNzc1sncGFkZGluZy1yaWdodCddO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIC8vICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcbiAgICAgIC8vICAgcnVuOiBjYWNoZSA9PiB7XG4gICAgICAvLyBcdFx0Ly8gdGhpcyBtZXRob2Qgc2V0cyB0aGUgd2lkdGggZm9yIGV2ZXJ5IHNsaWRlLCBidXQgSSBzZXQgaXQgaW4gZGlmZmVyZW50IHdheSBlYXJsaWVyXG4gICAgICAvLyBcdFx0Y29uc3QgZ3JpZCA9ICF0aGlzLnNldHRpbmdzLmF1dG9XaWR0aCxcbiAgICAgIC8vIFx0XHRpdGVtcyA9IHRoaXMuJHN0YWdlLmNoaWxkcmVuKCk7IC8vIHVzZSB0aGlzLnNsaWRlc0RhdGFcbiAgICAgIC8vICAgICBsZXQgaXRlcmF0b3IgPSB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGg7XG5cbiAgICAgIC8vICAgICBpZiAoZ3JpZCAmJiBjYWNoZS5pdGVtcy5tZXJnZSkge1xuICAgICAgLy8gICAgICAgd2hpbGUgKGl0ZXJhdG9yLS0pIHtcbiAgICAgIC8vICAgICAgICAgY2FjaGUuY3NzLndpZHRoID0gdGhpcy5fd2lkdGhzW3RoaXMucmVsYXRpdmUoaXRlcmF0b3IpXTtcbiAgICAgIC8vICAgICAgICAgaXRlbXMuZXEoaXRlcmF0b3IpLmNzcyhjYWNoZS5jc3MpO1xuICAgICAgLy8gICAgICAgfVxuICAgICAgLy8gICAgIH0gZWxzZSBpZiAoZ3JpZCkge1xuICAgICAgLy8gICAgICAgY2FjaGUuY3NzLndpZHRoID0gY2FjaGUuaXRlbXMud2lkdGg7XG4gICAgICAvLyAgICAgICBpdGVtcy5jc3MoY2FjaGUuY3NzKTtcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0sIHtcbiAgICAgIC8vICAgZmlsdGVyOiBbICdpdGVtcycgXSxcbiAgICAgIC8vICAgcnVuOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vICAgICB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGggPCAxICYmIHRoaXMuJHN0YWdlLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0sIHtcbiAgICAgIGZpbHRlcjogWyd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncyddLFxuICAgICAgcnVuOiBjYWNoZSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gY2FjaGUuY3VycmVudCA/IHRoaXMuc2xpZGVzRGF0YS5maW5kSW5kZXgoc2xpZGUgPT4gc2xpZGUuaWQgPT09IGNhY2hlLmN1cnJlbnQpIDogMDtcbiAgICAgICAgY3VycmVudCA9IE1hdGgubWF4KHRoaXMubWluaW11bSgpLCBNYXRoLm1pbih0aGlzLm1heGltdW0oKSwgY3VycmVudCkpO1xuICAgICAgICB0aGlzLnJlc2V0KGN1cnJlbnQpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGZpbHRlcjogWydwb3NpdGlvbiddLFxuICAgICAgcnVuOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLmNvb3JkaW5hdGVzKHRoaXMuX2N1cnJlbnQpKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBmaWx0ZXI6IFsnd2lkdGgnLCAncG9zaXRpb24nLCAnaXRlbXMnLCAnc2V0dGluZ3MnXSxcbiAgICAgIHJ1bjogKCkgPT4ge1xuICAgICAgICBjb25zdCBydGwgPSB0aGlzLnNldHRpbmdzLnJ0bCA/IDEgOiAtMSxcbiAgICAgICAgICBwYWRkaW5nID0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgKiAyLFxuICAgICAgICAgIG1hdGNoZXMgPSBbXTtcbiAgICAgICAgbGV0IGJlZ2luLCBlbmQsIGlubmVyLCBvdXRlciwgaSwgbjtcblxuICAgICAgICBiZWdpbiA9IHRoaXMuY29vcmRpbmF0ZXModGhpcy5jdXJyZW50KCkpO1xuICAgICAgICBpZiAodHlwZW9mIGJlZ2luID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGJlZ2luICs9IHBhZGRpbmc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYmVnaW4gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZW5kID0gYmVnaW4gKyB0aGlzLndpZHRoKCkgKiBydGw7XG5cbiAgICAgICAgaWYgKHJ0bCA9PT0gLTEgJiYgdGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9jb29yZGluYXRlcy5maWx0ZXIoZWxlbWVudCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5pdGVtcyAlIDIgPT09IDEgPyBlbGVtZW50ID49IGJlZ2luIDogZWxlbWVudCA+IGJlZ2luO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJlZ2luID0gcmVzdWx0Lmxlbmd0aCA/IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0gOiBiZWdpbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDAsIG4gPSB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBpbm5lciA9IE1hdGguY2VpbCh0aGlzLl9jb29yZGluYXRlc1tpIC0gMV0gfHwgMCk7XG4gICAgICAgICAgb3V0ZXIgPSBNYXRoLmNlaWwoTWF0aC5hYnModGhpcy5fY29vcmRpbmF0ZXNbaV0pICsgcGFkZGluZyAqIHJ0bCk7XG5cbiAgICAgICAgICBpZiAoKHRoaXMuX29wKGlubmVyLCAnPD0nLCBiZWdpbikgJiYgKHRoaXMuX29wKGlubmVyLCAnPicsIGVuZCkpKVxuICAgICAgICAgICAgfHwgKHRoaXMuX29wKG91dGVyLCAnPCcsIGJlZ2luKSAmJiB0aGlzLl9vcChvdXRlciwgJz4nLCBlbmQpKSkge1xuICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKGkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgICBzbGlkZS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBzbGlkZTtcbiAgICAgICAgfSk7XG4gICAgICAgIG1hdGNoZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICB0aGlzLnNsaWRlc0RhdGFbaXRlbV0uaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcbiAgICAgICAgICB0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgICAgICAgICBzbGlkZS5pc0NlbnRlcmVkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gc2xpZGU7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29uc3QgY3VycmVudDogYW55ID0gdGhpcy5jdXJyZW50KCk7XG4gICAgICAgICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc2xpZGVzRGF0YSkge1xuICAgICAgICAgICAgcy5jbGFzc2VzID0ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuc2xpZGVzRGF0YVtjdXJyZW50XS5pc0NlbnRlcmVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnNsaWRlc0RhdGFbY3VycmVudCAtIDFdLmNsYXNzZXMgPSB7J3ByZXZpb3VzLTEnOiB0cnVlfTtcbiAgICAgICAgICB0aGlzLnNsaWRlc0RhdGFbY3VycmVudCAtIDJdLmNsYXNzZXMgPSB7J3ByZXZpb3VzLTInOiB0cnVlfTtcbiAgICAgICAgICB0aGlzLnNsaWRlc0RhdGFbY3VycmVudCArIDFdLmNsYXNzZXMgPSB7J25leHQtMSc6IHRydWV9O1xuICAgICAgICAgIHRoaXMuc2xpZGVzRGF0YVtjdXJyZW50ICsgMl0uY2xhc3NlcyA9IHsnbmV4dC0yJzogdHJ1ZX07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIF07XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICAvKipcbiAgICogTWFrZXMgX3ZpZXdTZXR0aW5nc1NoaXBwZXIkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfdmlld1NldHRpbmdzU2hpcHBlciQgU3ViamVjdFxuICAgKi9cbiAgZ2V0Vmlld0N1clNldHRpbmdzKCk6IE9ic2VydmFibGU8Q2Fyb3VzZWxDdXJyZW50RGF0YT4ge1xuICAgIHJldHVybiB0aGlzLl92aWV3U2V0dGluZ3NTaGlwcGVyJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlcyBfaW5pdGlhbGl6ZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9pbml0aWFsaXplZENhcm91c2VsJCBTdWJqZWN0XG4gICAqL1xuICBnZXRJbml0aWFsaXplZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2luaXRpYWxpemVkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpXG4gIH1cblxuICAvKipcbiAgICogTWFrZXMgX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdFxuICAgKi9cbiAgZ2V0Q2hhbmdlU3RhdGUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZXMgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0XG4gICAqL1xuICBnZXRDaGFuZ2VkU3RhdGUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2VzIF90cmFuc2xhdGVDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF90cmFuc2xhdGVDYXJvdXNlbCQgU3ViamVjdFxuICAgKi9cbiAgZ2V0VHJhbnNsYXRlU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNsYXRlQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2VzIF90cmFuc2xhdGVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfdHJhbnNsYXRlZENhcm91c2VsJCBTdWJqZWN0XG4gICAqL1xuICBnZXRUcmFuc2xhdGVkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNsYXRlZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlcyBfcmVzaXplQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVzaXplQ2Fyb3VzZWwkIFN1YmplY3RcbiAgICovXG4gIGdldFJlc2l6ZVN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX3Jlc2l6ZUNhcm91c2VsJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlcyBfcmVzaXplZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3Jlc2l6ZWRDYXJvdXNlbCQgU3ViamVjdFxuICAgKi9cbiAgZ2V0UmVzaXplZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX3Jlc2l6ZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZXMgX3JlZnJlc2hDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZWZyZXNoQ2Fyb3VzZWwkIFN1YmplY3RcbiAgICovXG4gIGdldFJlZnJlc2hTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9yZWZyZXNoQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2VzIF9yZWZyZXNoZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZWZyZXNoZWRDYXJvdXNlbCQgU3ViamVjdFxuICAgKi9cbiAgZ2V0UmVmcmVzaGVkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVmcmVzaGVkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2VzIF9kcmFnQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfZHJhZ0Nhcm91c2VsJCBTdWJqZWN0XG4gICAqL1xuICBnZXREcmFnU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fZHJhZ0Nhcm91c2VsJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlcyBfZHJhZ2dlZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2RyYWdnZWRDYXJvdXNlbCQgU3ViamVjdFxuICAgKi9cbiAgZ2V0RHJhZ2dlZFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2RyYWdnZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0dXBzIGN1c3RvbSBvcHRpb25zIGV4cGFuZGluZyBkZWZhdWx0IG9wdGlvbnNcbiAgICogQHBhcmFtIG9wdGlvbnMgY3VzdG9tIG9wdGlvbnNcbiAgICovXG4gIHNldE9wdGlvbnMob3B0aW9uczogT3dsT3B0aW9ucykge1xuICAgIGNvbnN0IGNvbmZpZ09wdGlvbnM6IE93bE9wdGlvbnMgPSBuZXcgT3dsQ2Fyb3VzZWxPQ29uZmlnKCk7XG4gICAgY29uc3QgY2hlY2tlZE9wdGlvbnM6IE93bE9wdGlvbnMgPSB0aGlzLl92YWxpZGF0ZU9wdGlvbnMob3B0aW9ucywgY29uZmlnT3B0aW9ucyk7XG4gICAgdGhpcy5fb3B0aW9ucyA9IHsuLi5jb25maWdPcHRpb25zLCAuLi5jaGVja2VkT3B0aW9uc307XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgdXNlcidzIG9wdGlvbiBhcmUgc2V0IHByb3Blcmx5LiBDaGVraW5nIGlzIGJhc2VkIG9uIHR5cGluZ3M7XG4gICAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgc2V0IGJ5IHVzZXJcbiAgICogQHBhcmFtIGNvbmZpZ09wdGlvbnMgZGVmYXVsdCBvcHRpb25zXG4gICAqIEByZXR1cm5zIGNoZWNrZWQgYW5kIG1vZGlmaWVkIChpZiBpdCdzIG5lZWRlZCkgdXNlcidzIG9wdGlvbnNcbiAgICpcbiAgICogTm90ZXM6XG4gICAqICAtIGlmIHVzZXIgc2V0IG9wdGlvbiB3aXRoIHdyb25nIHR5cGUsIGl0J2xsIGJlIHdyaXR0ZW4gaW4gY29uc29sZVxuICAgKi9cbiAgcHJpdmF0ZSBfdmFsaWRhdGVPcHRpb25zKG9wdGlvbnM6IE93bE9wdGlvbnMsIGNvbmZpZ09wdGlvbnM6IE93bE9wdGlvbnMpOiBPd2xPcHRpb25zIHtcbiAgICBjb25zdCBjaGVja2VkT3B0aW9uczogT3dsT3B0aW9ucyA9IHsuLi5vcHRpb25zfTtcbiAgICBjb25zdCBtb2NrZWRUeXBlcyA9IG5ldyBPd2xPcHRpb25zTW9ja2VkVHlwZXMoKTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGNoZWNrZWRPcHRpb25zKSB7XG4gICAgICBpZiAoY2hlY2tlZE9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG4gICAgICAgIC8vIGNvbmRpdGlvbiBjb3VsZCBiZSBzaG9ydGVuZWQgYnV0IGl0IGdldHMgaGFyZGVyIGZvciB1bmRlcnN0YW5kaW5nXG4gICAgICAgIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGlmICh0aGlzLl9pc051bWVyaWMoY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcbiAgICAgICAgICAgIGNoZWNrZWRPcHRpb25zW2tleV0gPSArY2hlY2tlZE9wdGlvbnNba2V5XTtcbiAgICAgICAgICAgIGNoZWNrZWRPcHRpb25zW2tleV0gPSBrZXkgPT09ICdpdGVtcycgPyB0aGlzLl92YWxpZGF0ZUl0ZW1zKGNoZWNrZWRPcHRpb25zW2tleV0pIDogY2hlY2tlZE9wdGlvbnNba2V5XTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdib29sZWFuJyAmJiB0eXBlb2YgY2hlY2tlZE9wdGlvbnNba2V5XSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgY2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XG4gICAgICAgIH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ251bWJlcnxib29sZWFuJyAmJiAhdGhpcy5faXNOdW1iZXJPckJvb2xlYW4oY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcbiAgICAgICAgICBjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcbiAgICAgICAgfSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnbnVtYmVyfHN0cmluZycgJiYgIXRoaXMuX2lzTnVtYmVyT3JTdHJpbmcoY2hlY2tlZE9wdGlvbnNba2V5XSkpIHtcbiAgICAgICAgICBjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcbiAgICAgICAgfSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnc3RyaW5nfGJvb2xlYW4nICYmICF0aGlzLl9pc1N0cmluZ09yQm9vbGVhbihjaGVja2VkT3B0aW9uc1trZXldKSkge1xuICAgICAgICAgIGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xuICAgICAgICB9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdzdHJpbmdbXScpIHtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGVja2VkT3B0aW9uc1trZXldKSkge1xuICAgICAgICAgICAgbGV0IGlzU3RyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBjaGVja2VkT3B0aW9uc1trZXldLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgIGlzU3RyaW5nID0gdHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWlzU3RyaW5nKSB7XG4gICAgICAgICAgICAgIGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFJpZ2h0T3B0aW9uKHR5cGU6IHN0cmluZywga2V5OiBhbnkpOiBhbnkge1xuICAgICAgY29uc29sZS5sb2coYG9wdGlvbnMuJHtrZXl9IG11c3QgYmUgdHlwZSBvZiAke3R5cGV9OyAke2tleX09JHtvcHRpb25zW2tleV19IHNraXBwZWQgdG8gZGVmYXVsdHM6ICR7a2V5fT0ke2NvbmZpZ09wdGlvbnNba2V5XX1gKTtcbiAgICAgIHJldHVybiBjb25maWdPcHRpb25zW2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoZWNrZWRPcHRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBvcHRpb24gaXRlbXMgc2V0IGJ5IHVzZXIgYW5kIGlmIGl0IGJpZ2dlciB0aGFuIG51bWJlciBvZiBzbGlkZXMgdGhlbiByZXR1cm5zIG51bWJlciBvZiBzbGlkZXNcbiAgICogQHBhcmFtIGl0ZW1zIG9wdGlvbiBpdGVtcyBzZXQgYnkgdXNlclxuICAgKiBAcmV0dXJucyByaWdodCBudW1iZXIgb2YgaXRlbXNcbiAgICovXG4gIHByaXZhdGUgX3ZhbGlkYXRlSXRlbXMoaXRlbXM6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHJlc3VsdDogbnVtYmVyO1xuICAgIGlmIChpdGVtcyA+PSB0aGlzLl9pdGVtcy5sZW5ndGgpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX2l0ZW1zLmxlbmd0aDtcbiAgICAgIGNvbnNvbGUubG9nKCdvcHRpb24gXFwnaXRlbXNcXCcgaW4geW91ciBvcHRpb25zIGlzIGJpZ2dlciB0aGFuIG51bWJlciBvZiBzbGlkZXM7IFRoaXMgb3B0aW9uIGlzIHVwZGF0ZWQgdG8gY3VycmVudCBudW1iZXIgb2Ygc2xpZGVzIGFuZCBuYXZpZ2F0aW9uIGdvdCBkaXNhYmxlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSBpdGVtcztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgY3VycmVudCB3aWR0aCBvZiBjYXJvdXNlbFxuICAgKiBAcGFyYW0gd2lkdGggd2lkdGggb2YgY2Fyb3VzZWwgV2luZG93XG4gICAqL1xuICBzZXRDYXJvdXNlbFdpZHRoKHdpZHRoOiBudW1iZXIpIHtcbiAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHVwcyB0aGUgY3VycmVudCBzZXR0aW5ncy5cbiAgICogQHRvZG8gUmVtb3ZlIHJlc3BvbnNpdmUgY2xhc3Nlcy4gV2h5IHNob3VsZCBhZGFwdGl2ZSBkZXNpZ25zIGJlIGJyb3VnaHQgaW50byBJRTg/XG4gICAqIEB0b2RvIFN1cHBvcnQgZm9yIG1lZGlhIHF1ZXJpZXMgYnkgdXNpbmcgYG1hdGNoTWVkaWFgIHdvdWxkIGJlIG5pY2UuXG4gICAqIEBwYXJhbSBjYXJvdXNlbFdpZHRoIHdpZHRoIG9mIGNhcm91c2VsXG4gICAqIEBwYXJhbSBzbGlkZXMgYXJyYXkgb2Ygc2xpZGVzXG4gICAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgc2V0IGJ5IHVzZXJcbiAgICovXG4gIHNldHVwKGNhcm91c2VsV2lkdGg6IG51bWJlciwgc2xpZGVzOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10sIG9wdGlvbnM6IE93bE9wdGlvbnMpIHtcbiAgICB0aGlzLnNldENhcm91c2VsV2lkdGgoY2Fyb3VzZWxXaWR0aCk7XG4gICAgdGhpcy5zZXRJdGVtcyhzbGlkZXMpO1xuICAgIHRoaXMuX2RlZmluZVNsaWRlc0RhdGEoKTtcbiAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICB0aGlzLnNldHRpbmdzID0gey4uLnRoaXMuX29wdGlvbnN9O1xuXG4gICAgdGhpcy5zZXRWaWV3cG9ydEl0ZW1zTigpO1xuXG4gICAgdGhpcy5fdHJpZ2dlcignY2hhbmdlJywge3Byb3BlcnR5OiB7bmFtZTogJ3NldHRpbmdzJywgdmFsdWU6IHRoaXMuc2V0dGluZ3N9fSk7XG4gICAgdGhpcy5pbnZhbGlkYXRlKCdzZXR0aW5ncycpOyAvLyBtdXN0IGJlIGNhbGwgb2YgdGhpcyBmdW5jdGlvbjtcbiAgICB0aGlzLl90cmlnZ2VyKCdjaGFuZ2VkJywge3Byb3BlcnR5OiB7bmFtZTogJ3NldHRpbmdzJywgdmFsdWU6IHRoaXMuc2V0dGluZ3N9fSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG51bWJlciBvZiBpdGVtcyBmb3IgY3VycmVudCB2aWV3cG9ydFxuICAgKi9cbiAgc2V0Vmlld3BvcnRJdGVtc04oKSB7XG4gICAgY29uc3Qgdmlld3BvcnQgPSB0aGlzLl93aWR0aCxcbiAgICAgIG92ZXJ3cml0ZXMgPSB0aGlzLl9vcHRpb25zLnJlc3BvbnNpdmU7XG4gICAgbGV0IG1hdGNoID0gLTE7XG5cbiAgICBpZiAoIU9iamVjdC5rZXlzKG92ZXJ3cml0ZXMpLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qga2V5IGluIG92ZXJ3cml0ZXMpIHtcbiAgICAgIGlmIChvdmVyd3JpdGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgaWYgKCtrZXkgPD0gdmlld3BvcnQgJiYgK2tleSA+IG1hdGNoKSB7XG4gICAgICAgICAgbWF0Y2ggPSBOdW1iZXIoa2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2V0dGluZ3MgPSB7Li4udGhpcy5zZXR0aW5ncywgaXRlbXM6IHRoaXMuX3ZhbGlkYXRlSXRlbXMob3ZlcndyaXRlc1ttYXRjaF0uaXRlbXMpfTtcbiAgICAvLyBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gXHR0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyA9IHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nKCk7XG4gICAgLy8gfVxuICAgIGRlbGV0ZSB0aGlzLnNldHRpbmdzLnJlc3BvbnNpdmU7XG4gICAgdGhpcy5vd2xET01EYXRhLmlzUmVzcG9uc2l2ZSA9IHRydWU7XG4gICAgdGhpcy5fYnJlYWtwb2ludCA9IG1hdGNoO1xuXG4gICAgdGhpcy5pbnZhbGlkYXRlKCdzZXR0aW5ncycpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBjYXJvdXNlbC5cbiAgICogQHBhcmFtIHNsaWRlcyBhcnJheSBvZiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlXG4gICAqL1xuICBpbml0aWFsaXplKHNsaWRlczogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdKSB7XG4gICAgdGhpcy5lbnRlcignaW5pdGlhbGl6aW5nJyk7XG4gICAgLy8gdGhpcy50cmlnZ2VyKCdpbml0aWFsaXplJyk7XG5cbiAgICB0aGlzLm93bERPTURhdGEucnRsID0gdGhpcy5zZXR0aW5ncy5ydGw7XG5cbiAgICBzbGlkZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IG1lcmdlTjogbnVtYmVyID0gdGhpcy5zZXR0aW5ncy5tZXJnZSA/IGl0ZW0uZGF0YU1lcmdlIDogMTtcbiAgICAgIHRoaXMuX21lcmdlcnMucHVzaChtZXJnZU4pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5yZXNldCh0aGlzLl9pc051bWVyaWModGhpcy5zZXR0aW5ncy5zdGFydFBvc2l0aW9uKSA/ICt0aGlzLnNldHRpbmdzLnN0YXJ0UG9zaXRpb24gOiAwKTtcblxuICAgIHRoaXMuaW52YWxpZGF0ZSgnaXRlbXMnKTtcbiAgICB0aGlzLnJlZnJlc2goKTtcblxuICAgIHRoaXMub3dsRE9NRGF0YS5pc0xvYWRlZCA9IHRydWU7XG4gICAgdGhpcy5vd2xET01EYXRhLmlzTW91c2VEcmFnYWJsZSA9IHRoaXMuc2V0dGluZ3MubW91c2VEcmFnO1xuICAgIHRoaXMub3dsRE9NRGF0YS5pc1RvdWNoRHJhZ2FibGUgPSB0aGlzLnNldHRpbmdzLnRvdWNoRHJhZztcblxuICAgIHRoaXMuc2VuZENoYW5nZXMoKTtcblxuICAgIHRoaXMubGVhdmUoJ2luaXRpYWxpemluZycpO1xuICAgIHRoaXMuX3RyaWdnZXIoJ2luaXRpYWxpemVkJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNlbmRzIGFsbCBkYXRhIG5lZWRlZCBmb3IgVmlld1xuICAgKi9cbiAgc2VuZENoYW5nZXMoKSB7XG4gICAgdGhpcy5fdmlld1NldHRpbmdzU2hpcHBlciQubmV4dCh7XG4gICAgICBvd2xET01EYXRhOiB0aGlzLm93bERPTURhdGEsXG4gICAgICBzdGFnZURhdGE6IHRoaXMuc3RhZ2VEYXRhLFxuICAgICAgc2xpZGVzRGF0YTogdGhpcy5zbGlkZXNEYXRhLFxuICAgICAgbmF2RGF0YTogdGhpcy5uYXZEYXRhLFxuICAgICAgZG90c0RhdGE6IHRoaXMuZG90c0RhdGFcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgb3B0aW9uIGxvZ2ljIGlmIG5lY2Vzc2VyeVxuICAgKi9cbiAgcHJpdmF0ZSBfb3B0aW9uc0xvZ2ljKCkge1xuICAgIGlmICh0aGlzLnNldHRpbmdzLmF1dG9XaWR0aCkge1xuICAgICAgdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPSAwO1xuICAgICAgdGhpcy5zZXR0aW5ncy5tZXJnZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB2aWV3XG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGNvbnN0IG4gPSB0aGlzLl9waXBlLmxlbmd0aCxcbiAgICAgIGZpbHRlciA9IGl0ZW0gPT4gdGhpcy5faW52YWxpZGF0ZWRbaXRlbV0sXG4gICAgICBjYWNoZSA9IHt9O1xuXG4gICAgd2hpbGUgKGkgPCBuKSB7XG4gICAgICBjb25zdCBmaWx0ZXJlZFBpcGUgPSB0aGlzLl9waXBlW2ldLmZpbHRlci5maWx0ZXIoZmlsdGVyKTtcbiAgICAgIGlmICh0aGlzLl9pbnZhbGlkYXRlZC5hbGwgfHwgZmlsdGVyZWRQaXBlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5fcGlwZVtpXS5ydW4oY2FjaGUpO1xuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH1cbiAgICB0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiBzbGlkZS5jbGFzc2VzID0gdGhpcy5zZXRDdXJTbGlkZUNsYXNzZXMoc2xpZGUpKTtcbiAgICB0aGlzLnNlbmRDaGFuZ2VzKCk7XG5cbiAgICB0aGlzLl9pbnZhbGlkYXRlZCA9IHt9O1xuXG4gICAgaWYgKCF0aGlzLmlzKCd2YWxpZCcpKSB7XG4gICAgICB0aGlzLmVudGVyKCd2YWxpZCcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB3aWR0aCBvZiB0aGUgdmlldy5cbiAgICogQHBhcmFtIFtkaW1lbnNpb249V2lkdGguRGVmYXVsdF0gVGhlIGRpbWVuc2lvbiB0byByZXR1cm5cbiAgICogQHJldHVybnMgVGhlIHdpZHRoIG9mIHRoZSB2aWV3IGluIHBpeGVsLlxuICAgKi9cbiAgd2lkdGgoZGltZW5zaW9uPzogV2lkdGgpOiBudW1iZXIge1xuICAgIGRpbWVuc2lvbiA9IGRpbWVuc2lvbiB8fCBXaWR0aC5EZWZhdWx0O1xuICAgIHN3aXRjaCAoZGltZW5zaW9uKSB7XG4gICAgICBjYXNlIFdpZHRoLklubmVyOlxuICAgICAgY2FzZSBXaWR0aC5PdXRlcjpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoIC0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgKiAyICsgdGhpcy5zZXR0aW5ncy5tYXJnaW47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlZnJlc2hlcyB0aGUgY2Fyb3VzZWwgcHJpbWFyaWx5IGZvciBhZGFwdGl2ZSBwdXJwb3Nlcy5cbiAgICovXG4gIHJlZnJlc2goKSB7XG4gICAgdGhpcy5lbnRlcigncmVmcmVzaGluZycpO1xuICAgIHRoaXMuX3RyaWdnZXIoJ3JlZnJlc2gnKTtcbiAgICB0aGlzLl9kZWZpbmVTbGlkZXNEYXRhKCk7XG4gICAgdGhpcy5zZXRWaWV3cG9ydEl0ZW1zTigpO1xuXG4gICAgdGhpcy5fb3B0aW9uc0xvZ2ljKCk7XG5cbiAgICAvLyB0aGlzLiRlbGVtZW50LmFkZENsYXNzKHRoaXMub3B0aW9ucy5yZWZyZXNoQ2xhc3MpO1xuXG4gICAgdGhpcy51cGRhdGUoKTtcblxuICAgIC8vIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3ModGhpcy5vcHRpb25zLnJlZnJlc2hDbGFzcyk7XG5cbiAgICB0aGlzLmxlYXZlKCdyZWZyZXNoaW5nJyk7XG4gICAgdGhpcy5fdHJpZ2dlcigncmVmcmVzaGVkJyk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdpbmRvdyBgcmVzaXplYCBldmVudC5cbiAgICogQHBhcmFtIGN1cldpZHRoIHdpZHRoIG9mIC5vd2wtY2Fyb3VzZWxcbiAgICovXG4gIG9uUmVzaXplKGN1cldpZHRoOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuX2l0ZW1zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuc2V0Q2Fyb3VzZWxXaWR0aChjdXJXaWR0aCk7XG5cbiAgICB0aGlzLmVudGVyKCdyZXNpemluZycpO1xuXG4gICAgLy8gaWYgKHRoaXMudHJpZ2dlcigncmVzaXplJykuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAvLyBcdHRoaXMubGVhdmUoJ3Jlc2l6aW5nJyk7XG4gICAgLy8gXHRyZXR1cm4gZmFsc2U7XG4gICAgLy8gfVxuICAgIHRoaXMuX3RyaWdnZXIoJ3Jlc2l6ZScpO1xuICAgIHRoaXMuaW52YWxpZGF0ZSgnd2lkdGgnKTtcblxuICAgIHRoaXMucmVmcmVzaCgpO1xuXG4gICAgdGhpcy5sZWF2ZSgncmVzaXppbmcnKTtcbiAgICB0aGlzLl90cmlnZ2VyKCdyZXNpemVkJyk7XG4gIH1cblxuICAvKipcbiAgICogUHJlcGFyZXMgZGF0YSBmb3IgZHJhZ2dpbmcgY2Fyb3VzZWwuIEl0IHN0YXJ0cyBhZnRlciBmaXJpbmcgYHRvdWNoc3RhcnRgIGFuZCBgbW91c2Vkb3duYCBldmVudHMuXG4gICAqIEB0b2RvIEhvcml6b250YWwgc3dpcGUgdGhyZXNob2xkIGFzIG9wdGlvblxuICAgKiBAdG9kbyAjMjYxXG4gICAqIEBwYXJhbSBldmVudCAtIFRoZSBldmVudCBhcmd1bWVudHMuXG4gICAqIEByZXR1cm5zIHN0YWdlIC0gb2JqZWN0IHdpdGggJ3gnIGFuZCAneScgY29vcmRpbmF0ZXMgb2YgLm93bC1zdGFnZVxuICAgKi9cbiAgcHJlcGFyZURyYWdnaW5nKGV2ZW50OiBhbnkpOiBDb29yZHMge1xuICAgIGxldCBzdGFnZTogQ29vcmRzID0gbnVsbCxcbiAgICAgIHRyYW5zZm9ybUFycjogc3RyaW5nW107XG5cbiAgICAvLyBjb3VsZCBiZSA1IGNvbW1lbnRlZCBsaW5lcyBiZWxvdzsgSG93ZXZlciB0aGVyZSdzIHN0YWdlIHRyYW5zZm9ybSBpbiBzdGFnZURhdGEgYW5kIGluIHVwZGF0ZXMgYWZ0ZXIgZWFjaCBtb3ZlIG9mIHN0YWdlXG4gICAgLy8gc3RhZ2UgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCkudHJhbnNmb3JtLnJlcGxhY2UoLy4qXFwofFxcKXwgL2csICcnKS5zcGxpdCgnLCcpO1xuICAgIC8vIHN0YWdlID0ge1xuICAgIC8vICAgeDogc3RhZ2Vbc3RhZ2UubGVuZ3RoID09PSAxNiA/IDEyIDogNF0sXG4gICAgLy8gICB5OiBzdGFnZVtzdGFnZS5sZW5ndGggPT09IDE2ID8gMTMgOiA1XVxuICAgIC8vIH07XG5cbiAgICB0cmFuc2Zvcm1BcnIgPSB0aGlzLnN0YWdlRGF0YS50cmFuc2Zvcm0ucmVwbGFjZSgvLipcXCh8XFwpfCB8W14sLVxcZF1cXHd8XFwpL2csICcnKS5zcGxpdCgnLCcpO1xuICAgIHN0YWdlID0ge1xuICAgICAgeDogK3RyYW5zZm9ybUFyclswXSxcbiAgICAgIHk6ICt0cmFuc2Zvcm1BcnJbMV1cbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuaXMoJ2FuaW1hdGluZycpKSB7XG4gICAgICB0aGlzLmludmFsaWRhdGUoJ3Bvc2l0aW9uJyk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nKSB7XG4gICAgICB0aGlzLm93bERPTURhdGEuaXNHcmFiID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLnNwZWVkKDApO1xuICAgIHJldHVybiBzdGFnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbnRlcnMgaW50byBhICdkcmFnZ2luZycgc3RhdGVcbiAgICovXG4gIGVudGVyRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy5lbnRlcignZHJhZ2dpbmcnKTtcbiAgICB0aGlzLl90cmlnZ2VyKCdkcmFnJyk7XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyBuZXcgY29vcmRzIGZvciAub3dsLXN0YWdlIHdoaWxlIGRyYWdnaW5nIGl0XG4gICAqIEB0b2RvICMyNjFcbiAgICogQHBhcmFtIGV2ZW50IHRoZSBldmVudCBhcmd1bWVudHMuXG4gICAqIEBwYXJhbSBkcmFnRGF0YSBpbml0aWFsIGRhdGEgZ290IGFmdGVyIHN0YXJ0aW5nIGRyYWdnaW5nXG4gICAqIEByZXR1cm5zIGNvb3JkcyBvciBmYWxzZVxuICAgKi9cbiAgZGVmaW5lTmV3Q29vcmRzRHJhZyhldmVudDogYW55LCBkcmFnRGF0YTogYW55KTogYm9vbGVhbiB8IENvb3JkcyB7XG4gICAgbGV0IG1pbmltdW0gPSBudWxsLFxuICAgICAgbWF4aW11bSA9IG51bGwsXG4gICAgICBwdWxsID0gbnVsbDtcbiAgICBjb25zdCBkZWx0YSA9IHRoaXMuZGlmZmVyZW5jZShkcmFnRGF0YS5wb2ludGVyLCB0aGlzLnBvaW50ZXIoZXZlbnQpKSxcbiAgICAgIHN0YWdlID0gdGhpcy5kaWZmZXJlbmNlKGRyYWdEYXRhLnN0YWdlLnN0YXJ0LCBkZWx0YSk7XG5cbiAgICBpZiAoIXRoaXMuaXMoJ2RyYWdnaW5nJykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5sb29wKSB7XG4gICAgICBtaW5pbXVtID0gdGhpcy5jb29yZGluYXRlcyh0aGlzLm1pbmltdW0oKSk7XG4gICAgICBtYXhpbXVtID0gK3RoaXMuY29vcmRpbmF0ZXModGhpcy5tYXhpbXVtKCkgKyAxKSAtIG1pbmltdW07XG4gICAgICBzdGFnZS54ID0gKCgoc3RhZ2UueCAtIG1pbmltdW0pICUgbWF4aW11bSArIG1heGltdW0pICUgbWF4aW11bSkgKyBtaW5pbXVtO1xuICAgIH0gZWxzZSB7XG4gICAgICBtaW5pbXVtID0gdGhpcy5zZXR0aW5ncy5ydGwgPyB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpKSA6IHRoaXMuY29vcmRpbmF0ZXModGhpcy5taW5pbXVtKCkpO1xuICAgICAgbWF4aW11bSA9IHRoaXMuc2V0dGluZ3MucnRsID8gdGhpcy5jb29yZGluYXRlcyh0aGlzLm1pbmltdW0oKSkgOiB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWF4aW11bSgpKTtcbiAgICAgIHB1bGwgPSB0aGlzLnNldHRpbmdzLnB1bGxEcmFnID8gLTEgKiBkZWx0YS54IC8gNSA6IDA7XG4gICAgICBzdGFnZS54ID0gTWF0aC5tYXgoTWF0aC5taW4oc3RhZ2UueCwgbWluaW11bSArIHB1bGwpLCBtYXhpbXVtICsgcHVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmlzaGVzIGRyYWdnaW5nIG9mIGNhcm91c2VsIHdoZW4gYHRvdWNoZW5kYCBhbmQgYG1vdXNldXBgIGV2ZW50cyBmaXJlLlxuICAgKiBAdG9kbyAjMjYxXG4gICAqIEB0b2RvIFRocmVzaG9sZCBmb3IgY2xpY2sgZXZlbnRcbiAgICogQHBhcmFtIGV2ZW50IHRoZSBldmVudCBhcmd1bWVudHMuXG4gICAqIEBwYXJhbSBkcmFnT2JqIHRoZSBvYmplY3Qgd2l0aCBkcmFnZ2luZyBzZXR0aW5ncyBhbmQgc3RhdGVzXG4gICAqIEBwYXJhbSBjbGlja0F0dGFjaGVyIGZ1bmN0aW9uIHdoaWNoIGF0dGFjaGVzIGNsaWNrIGhhbmRsZXIgdG8gc2xpZGUgb3IgaXRzIGNoaWxkcmVuIGVsZW1lbnRzIGluIG9yZGVyIHRvIHByZXZlbnQgZXZlbnQgYnVibGluZ1xuICAgKi9cbiAgZmluaXNoRHJhZ2dpbmcoZXZlbnQ6IGFueSwgZHJhZ09iajogYW55LCBjbGlja0F0dGFjaGVyOiAoKSA9PiB2b2lkKSB7XG4gICAgY29uc3QgZGVsdGEgPSB0aGlzLmRpZmZlcmVuY2UoZHJhZ09iai5wb2ludGVyLCB0aGlzLnBvaW50ZXIoZXZlbnQpKSxcbiAgICAgIHN0YWdlID0gZHJhZ09iai5zdGFnZS5jdXJyZW50LFxuICAgICAgZGlyZWN0aW9uID0gZGVsdGEueCA+ICt0aGlzLnNldHRpbmdzLnJ0bCA/ICdsZWZ0JyA6ICdyaWdodCc7XG4gICAgbGV0IGN1cnJlbnRTbGlkZUk6IG51bWJlciwgY3VycmVudDogbnVtYmVyLCBuZXdDdXJyZW50OiBudW1iZXI7XG5cbiAgICBpZiAoZGVsdGEueCAhPT0gMCAmJiB0aGlzLmlzKCdkcmFnZ2luZycpIHx8ICF0aGlzLmlzKCd2YWxpZCcpKSB7XG4gICAgICB0aGlzLnNwZWVkKCt0aGlzLnNldHRpbmdzLmRyYWdFbmRTcGVlZCB8fCB0aGlzLnNldHRpbmdzLnNtYXJ0U3BlZWQpO1xuICAgICAgY3VycmVudFNsaWRlSSA9IHRoaXMuY2xvc2VzdChzdGFnZS54LCBkZWx0YS54ICE9PSAwID8gZGlyZWN0aW9uIDogZHJhZ09iai5kaXJlY3Rpb24pO1xuICAgICAgY3VycmVudCA9IHRoaXMuY3VycmVudCgpO1xuICAgICAgbmV3Q3VycmVudCA9IHRoaXMuY3VycmVudChjdXJyZW50U2xpZGVJID09PSAtMSA/IHVuZGVmaW5lZCA6IGN1cnJlbnRTbGlkZUkpO1xuXG4gICAgICBpZiAoY3VycmVudCAhPT0gbmV3Q3VycmVudCkge1xuICAgICAgICB0aGlzLmludmFsaWRhdGUoJ3Bvc2l0aW9uJyk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIGRyYWdPYmouZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuXG4gICAgICBpZiAoTWF0aC5hYnMoZGVsdGEueCkgPiAzIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gZHJhZ09iai50aW1lID4gMzAwKSB7XG4gICAgICAgIGNsaWNrQXR0YWNoZXIoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzKCdkcmFnZ2luZycpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubGVhdmUoJ2RyYWdnaW5nJyk7XG4gICAgdGhpcy5fdHJpZ2dlcignZHJhZ2dlZCcpXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY2xvc2VzdCBpdGVtIGZvciBhIGNvb3JkaW5hdGUuXG4gICAqIEB0b2RvIFNldHRpbmcgYGZyZWVEcmFnYCBtYWtlcyBgY2xvc2VzdGAgbm90IHJldXNhYmxlLiBTZWUgIzE2NS5cbiAgICogQHBhcmFtIGNvb3JkaW5hdGUgVGhlIGNvb3JkaW5hdGUgaW4gcGl4ZWwuXG4gICAqIEBwYXJhbSBkaXJlY3Rpb24gVGhlIGRpcmVjdGlvbiB0byBjaGVjayBmb3IgdGhlIGNsb3Nlc3QgaXRlbS4gRXRoZXIgYGxlZnRgIG9yIGByaWdodGAuXG4gICAqIEByZXR1cm5zIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY2xvc2VzdCBpdGVtLlxuICAgKi9cbiAgY2xvc2VzdChjb29yZGluYXRlOiBudW1iZXIsIGRpcmVjdGlvbjogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBjb25zdCBwdWxsID0gMzAsXG4gICAgICB3aWR0aCA9IHRoaXMud2lkdGgoKTtcbiAgICBsZXQgY29vcmRpbmF0ZXM6IG51bWJlcltdID0gdGhpcy5jb29yZGluYXRlcygpIGFzIG51bWJlcltdLFxuICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgIGlmICh0aGlzLnNldHRpbmdzLmNlbnRlcikge1xuICAgICAgY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtID09PSAwKSB7XG4gICAgICAgICAgaXRlbSArPSAwLjAwMDAwMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gb3B0aW9uICdmcmVlRHJhZycgZG9lc24ndCBoYXZlIHJlYWxpemF0aW9uIGFuZCB1c2luZyBpdCBoZXJlIGNyZWF0ZXMgcHJvYmxlbTpcbiAgICAvLyB2YXJpYWJsZSAncG9zaXRpb24nIHN0YXlzIHVuY2hhbmdlZCAoaXQgZXF1YWxzIC0xIGF0IHRoZSBiZWdnaW5nKSBhbmQgdGh1cyBtZXRob2QgcmV0dXJucyAtMVxuICAgIC8vIFJldHVybmluZyB2YWx1ZSBpcyBjb25zdW1lZCBieSBtZXRob2QgY3VycmVudCgpLCB3aGljaCB0YWtpbmcgLTEgYXMgYXJndW1lbnQgY2FsY3VsYXRlcyB0aGUgaW5kZXggb2YgbmV3IGN1cnJlbnQgc2xpZGVcbiAgICAvLyBJbiBjYXNlIG9mIGhhdmluZyA1IHNsaWRlcyBhbnMgJ2xvb3A9ZmFsc2U7IGNhbGxpbmcgJ2N1cnJlbnQoLTEpJyBzZXRzIHByb3BzICdfY3VycmVudCcgYXMgNC4gSnVzdCBsYXN0IHNsaWRlIHJlbWFpbnMgdmlzaWJsZSBpbnN0ZWFkIG9mIDMgbGFzdCBzbGlkZXMuXG5cbiAgICAvLyBpZiAoIXRoaXMuc2V0dGluZ3MuZnJlZURyYWcpIHtcbiAgICAvLyBjaGVjayBjbG9zZXN0IGl0ZW1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0JyAmJiBjb29yZGluYXRlID4gY29vcmRpbmF0ZXNbaV0gLSBwdWxsICYmIGNvb3JkaW5hdGUgPCBjb29yZGluYXRlc1tpXSArIHB1bGwpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAvLyBvbiBhIHJpZ2h0IHB1bGwsIGNoZWNrIG9uIHByZXZpb3VzIGluZGV4XG4gICAgICAgIC8vIHRvIGRvIHNvLCBzdWJ0cmFjdCB3aWR0aCBmcm9tIHZhbHVlIGFuZCBzZXQgcG9zaXRpb24gPSBpbmRleCArIDFcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAncmlnaHQnICYmIGNvb3JkaW5hdGUgPiBjb29yZGluYXRlc1tpXSAtIHdpZHRoIC0gcHVsbCAmJiBjb29yZGluYXRlIDwgY29vcmRpbmF0ZXNbaV0gLSB3aWR0aCArIHB1bGwpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpICsgMTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJzwnLCBjb29yZGluYXRlc1tpXSlcbiAgICAgICAgJiYgdGhpcy5fb3AoY29vcmRpbmF0ZSwgJz4nLCBjb29yZGluYXRlc1tpICsgMV0gfHwgY29vcmRpbmF0ZXNbaV0gLSB3aWR0aCkpIHtcbiAgICAgICAgcG9zaXRpb24gPSBkaXJlY3Rpb24gPT09ICdsZWZ0JyA/IGkgKyAxIDogaTtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBudWxsICYmIGNvb3JkaW5hdGUgPiBjb29yZGluYXRlc1tpXSAtIHB1bGwgJiYgY29vcmRpbmF0ZSA8IGNvb3JkaW5hdGVzW2ldICsgcHVsbCkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwb3NpdGlvbiAhPT0gLTEpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIDtcbiAgICB9XG4gICAgLy8gfVxuXG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmxvb3ApIHtcbiAgICAgIC8vIG5vbiBsb29wIGJvdW5kcmllc1xuICAgICAgaWYgKHRoaXMuX29wKGNvb3JkaW5hdGUsICc+JywgY29vcmRpbmF0ZXNbdGhpcy5taW5pbXVtKCldKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGNvb3JkaW5hdGUgPSB0aGlzLm1pbmltdW0oKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJzwnLCBjb29yZGluYXRlc1t0aGlzLm1heGltdW0oKV0pKSB7XG4gICAgICAgIHBvc2l0aW9uID0gY29vcmRpbmF0ZSA9IHRoaXMubWF4aW11bSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbmltYXRlcyB0aGUgc3RhZ2UuXG4gICAqIEB0b2RvICMyNzBcbiAgICogQHBhcmFtIGNvb3JkaW5hdGUgVGhlIGNvb3JkaW5hdGUgaW4gcGl4ZWxzLlxuICAgKi9cbiAgYW5pbWF0ZShjb29yZGluYXRlOiBudW1iZXIgfCBudW1iZXJbXSkge1xuICAgIGNvbnN0IGFuaW1hdGUgPSB0aGlzLnNwZWVkKCkgPiAwO1xuXG4gICAgaWYgKHRoaXMuaXMoJ2FuaW1hdGluZycpKSB7XG4gICAgICB0aGlzLm9uVHJhbnNpdGlvbkVuZCgpO1xuICAgIH1cblxuICAgIGlmIChhbmltYXRlKSB7XG4gICAgICB0aGlzLmVudGVyKCdhbmltYXRpbmcnKTtcbiAgICAgIHRoaXMuX3RyaWdnZXIoJ3RyYW5zbGF0ZScpO1xuICAgIH1cblxuICAgIHRoaXMuc3RhZ2VEYXRhLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgY29vcmRpbmF0ZSArICdweCwwcHgsMHB4KSc7XG4gICAgdGhpcy5zdGFnZURhdGEudHJhbnNpdGlvbiA9ICh0aGlzLnNwZWVkKCkgLyAxMDAwKSArICdzJztcblxuICAgIC8vIGFsc28gdGhlcmUgd2FzIHRyYW5zaXRpb24gYnkgbWVhbnMgb2YgSlF1ZXJ5LmFuaW1hdGUgb3IgY3NzLWNoYW5naW5nIHByb3BlcnR5IGxlZnRcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciB0aGUgY2Fyb3VzZWwgaXMgaW4gYSBzcGVjaWZpYyBzdGF0ZSBvciBub3QuXG4gICAqIEBwYXJhbSBzdGF0ZSBUaGUgc3RhdGUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIFRoZSBmbGFnIHdoaWNoIGluZGljYXRlcyBpZiB0aGUgY2Fyb3VzZWwgaXMgYnVzeS5cbiAgICovXG4gIGlzKHN0YXRlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVdICYmIHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlXSA+IDA7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGl0ZW0uXG4gICAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgbmV3IGFic29sdXRlIHBvc2l0aW9uIG9yIG5vdGhpbmcgdG8gbGVhdmUgaXQgdW5jaGFuZ2VkLlxuICAgKiBAcmV0dXJucyBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgaXRlbS5cbiAgICovXG4gIGN1cnJlbnQocG9zaXRpb24/OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24pO1xuXG4gICAgaWYgKHRoaXMuX2N1cnJlbnQgIT09IHBvc2l0aW9uKSB7XG4gICAgICBjb25zdCBldmVudCA9IHRoaXMuX3RyaWdnZXIoJ2NoYW5nZScsIHtwcm9wZXJ0eToge25hbWU6ICdwb3NpdGlvbicsIHZhbHVlOiBwb3NpdGlvbn19KTtcblxuICAgICAgLy8gaWYgKGV2ZW50LmRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gXHRwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKGV2ZW50LmRhdGEpO1xuICAgICAgLy8gfVxuXG4gICAgICB0aGlzLl9jdXJyZW50ID0gcG9zaXRpb247XG5cbiAgICAgIHRoaXMuaW52YWxpZGF0ZSgncG9zaXRpb24nKTtcbiAgICAgIHRoaXMuX3RyaWdnZXIoJ2NoYW5nZWQnLCB7cHJvcGVydHk6IHtuYW1lOiAncG9zaXRpb24nLCB2YWx1ZTogdGhpcy5fY3VycmVudH19KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZhbGlkYXRlcyB0aGUgZ2l2ZW4gcGFydCBvZiB0aGUgdXBkYXRlIHJvdXRpbmUuXG4gICAqIEBwYXJhbSBwYXJ0IFRoZSBwYXJ0IHRvIGludmFsaWRhdGUuXG4gICAqIEByZXR1cm5zIFRoZSBpbnZhbGlkYXRlZCBwYXJ0cy5cbiAgICovXG4gIGludmFsaWRhdGUocGFydDogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIGlmICh0eXBlb2YgcGFydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX2ludmFsaWRhdGVkW3BhcnRdID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLmlzKCd2YWxpZCcpKSB7XG4gICAgICAgIHRoaXMubGVhdmUoJ3ZhbGlkJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9pbnZhbGlkYXRlZCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgaXRlbS5cbiAgICogQHBhcmFtIHBvc2l0aW9uIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgbmV3IGl0ZW0uXG4gICAqL1xuICByZXNldChwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgcG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbik7XG5cbiAgICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3NwZWVkID0gMDtcbiAgICB0aGlzLl9jdXJyZW50ID0gcG9zaXRpb247XG5cbiAgICB0aGlzLl9zdXBwcmVzcyhbJ3RyYW5zbGF0ZScsICd0cmFuc2xhdGVkJ10pO1xuXG4gICAgdGhpcy5hbmltYXRlKHRoaXMuY29vcmRpbmF0ZXMocG9zaXRpb24pKTtcblxuICAgIHRoaXMuX3JlbGVhc2UoWyd0cmFuc2xhdGUnLCAndHJhbnNsYXRlZCddKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemVzIGFuIGFic29sdXRlIG9yIGEgcmVsYXRpdmUgcG9zaXRpb24gb2YgYW4gaXRlbS5cbiAgICogQHBhcmFtIHBvc2l0aW9uIFRoZSBhYnNvbHV0ZSBvciByZWxhdGl2ZSBwb3NpdGlvbiB0byBub3JtYWxpemUuXG4gICAqIEBwYXJhbSByZWxhdGl2ZSBXaGV0aGVyIHRoZSBnaXZlbiBwb3NpdGlvbiBpcyByZWxhdGl2ZSBvciBub3QuXG4gICAqIEByZXR1cm5zIFRoZSBub3JtYWxpemVkIHBvc2l0aW9uLlxuICAgKi9cbiAgbm9ybWFsaXplKHBvc2l0aW9uOiBudW1iZXIsIHJlbGF0aXZlPzogYm9vbGVhbik6IG51bWJlciB7XG4gICAgY29uc3QgbiA9IHRoaXMuX2l0ZW1zLmxlbmd0aCxcbiAgICAgIG0gPSByZWxhdGl2ZSA/IDAgOiB0aGlzLl9jbG9uZXMubGVuZ3RoO1xuXG4gICAgaWYgKCF0aGlzLl9pc051bWVyaWMocG9zaXRpb24pIHx8IG4gPCAxKSB7XG4gICAgICBwb3NpdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uIDwgMCB8fCBwb3NpdGlvbiA+PSBuICsgbSkge1xuICAgICAgcG9zaXRpb24gPSAoKHBvc2l0aW9uIC0gbSAvIDIpICUgbiArIG4pICUgbiArIG0gLyAyO1xuICAgIH1cblxuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhbiBhYnNvbHV0ZSBwb3NpdGlvbiBvZiBhbiBpdGVtIGludG8gYSByZWxhdGl2ZSBvbmUuXG4gICAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgYWJzb2x1dGUgcG9zaXRpb24gdG8gY29udmVydC5cbiAgICogQHJldHVybnMgVGhlIGNvbnZlcnRlZCBwb3NpdGlvbi5cbiAgICovXG4gIHJlbGF0aXZlKHBvc2l0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHBvc2l0aW9uIC09IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyO1xuICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbiwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbWF4aW11bSBwb3NpdGlvbiBmb3IgdGhlIGN1cnJlbnQgaXRlbS5cbiAgICogQHBhcmFtIHJlbGF0aXZlIFdoZXRoZXIgdG8gcmV0dXJuIGFuIGFic29sdXRlIHBvc2l0aW9uIG9yIGEgcmVsYXRpdmUgcG9zaXRpb24uXG4gICAqIEByZXR1cm5zIG51bWJlciBvZiBtYXhpbXVtIHBvc2l0aW9uXG4gICAqL1xuICBtYXhpbXVtKHJlbGF0aXZlOiBib29sZWFuID0gZmFsc2UpOiBudW1iZXIge1xuICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncztcbiAgICBsZXQgbWF4aW11bSA9IHRoaXMuX2Nvb3JkaW5hdGVzLmxlbmd0aCxcbiAgICAgIGl0ZXJhdG9yLFxuICAgICAgcmVjaXByb2NhbEl0ZW1zV2lkdGgsXG4gICAgICBlbGVtZW50V2lkdGg7XG5cbiAgICBpZiAoc2V0dGluZ3MubG9vcCkge1xuICAgICAgbWF4aW11bSA9IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyICsgdGhpcy5faXRlbXMubGVuZ3RoIC0gMTtcbiAgICB9IGVsc2UgaWYgKHNldHRpbmdzLmF1dG9XaWR0aCB8fCBzZXR0aW5ncy5tZXJnZSkge1xuICAgICAgaXRlcmF0b3IgPSB0aGlzLl9pdGVtcy5sZW5ndGg7XG4gICAgICByZWNpcHJvY2FsSXRlbXNXaWR0aCA9IHRoaXMuc2xpZGVzRGF0YVstLWl0ZXJhdG9yXS53aWR0aDtcbiAgICAgIGVsZW1lbnRXaWR0aCA9IHRoaXMuX3dpZHRoO1xuICAgICAgd2hpbGUgKGl0ZXJhdG9yLS0pIHtcbiAgICAgICAgLy8gaXQgY291bGQgYmUgdXNlIHRoaXMuX2l0ZW1zIGluc3RlYWQgb2YgdGhpcy5zbGlkZXNEYXRhO1xuICAgICAgICByZWNpcHJvY2FsSXRlbXNXaWR0aCArPSArdGhpcy5zbGlkZXNEYXRhW2l0ZXJhdG9yXS53aWR0aCArIHRoaXMuc2V0dGluZ3MubWFyZ2luO1xuICAgICAgICBpZiAocmVjaXByb2NhbEl0ZW1zV2lkdGggPiBlbGVtZW50V2lkdGgpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbWF4aW11bSA9IGl0ZXJhdG9yICsgMTtcbiAgICB9IGVsc2UgaWYgKHNldHRpbmdzLmNlbnRlcikge1xuICAgICAgbWF4aW11bSA9IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1heGltdW0gPSB0aGlzLl9pdGVtcy5sZW5ndGggLSBzZXR0aW5ncy5pdGVtcztcbiAgICB9XG5cbiAgICBpZiAocmVsYXRpdmUpIHtcbiAgICAgIG1heGltdW0gLT0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDI7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGgubWF4KG1heGltdW0sIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG1pbmltdW0gcG9zaXRpb24gZm9yIHRoZSBjdXJyZW50IGl0ZW0uXG4gICAqIEBwYXJhbSByZWxhdGl2ZSBXaGV0aGVyIHRvIHJldHVybiBhbiBhYnNvbHV0ZSBwb3NpdGlvbiBvciBhIHJlbGF0aXZlIHBvc2l0aW9uLlxuICAgKiBAcmV0dXJucyBudW1iZXIgb2YgbWluaW11bSBwb3NpdGlvblxuICAgKi9cbiAgbWluaW11bShyZWxhdGl2ZTogYm9vbGVhbiA9IGZhbHNlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gcmVsYXRpdmUgPyAwIDogdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDI7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbiBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgcmVsYXRpdmUgcG9zaXRpb24uXG4gICAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXG4gICAqIEByZXR1cm5zIFRoZSBpdGVtIGF0IHRoZSBnaXZlbiBwb3NpdGlvbiBvciBhbGwgaXRlbXMgaWYgbm8gcG9zaXRpb24gd2FzIGdpdmVuLlxuICAgKi9cbiAgaXRlbXMocG9zaXRpb24/OiBudW1iZXIpOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10ge1xuICAgIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5faXRlbXMuc2xpY2UoKTtcbiAgICB9XG5cbiAgICBwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uLCB0cnVlKTtcbiAgICByZXR1cm4gW3RoaXMuX2l0ZW1zW3Bvc2l0aW9uXV07XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbiBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgcmVsYXRpdmUgcG9zaXRpb24uXG4gICAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXG4gICAqIEByZXR1cm5zIFRoZSBpdGVtIGF0IHRoZSBnaXZlbiBwb3NpdGlvbiBvciBhbGwgaXRlbXMgaWYgbm8gcG9zaXRpb24gd2FzIGdpdmVuLlxuICAgKi9cbiAgbWVyZ2Vycyhwb3NpdGlvbjogbnVtYmVyKTogbnVtYmVyIHwgbnVtYmVyW10ge1xuICAgIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbWVyZ2Vycy5zbGljZSgpO1xuICAgIH1cblxuICAgIHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24sIHRydWUpO1xuICAgIHJldHVybiB0aGlzLl9tZXJnZXJzW3Bvc2l0aW9uXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbnMgb2YgY2xvbmVzIGZvciBhbiBpdGVtLlxuICAgKiBAcGFyYW0gcG9zaXRpb24gVGhlIHJlbGF0aXZlIHBvc2l0aW9uIG9mIHRoZSBpdGVtLlxuICAgKiBAcmV0dXJucyBUaGUgYWJzb2x1dGUgcG9zaXRpb25zIG9mIGNsb25lcyBmb3IgdGhlIGl0ZW0gb3IgYWxsIGlmIG5vIHBvc2l0aW9uIHdhcyBnaXZlbi5cbiAgICovXG4gIGNsb25lcyhwb3NpdGlvbj86IG51bWJlcik6IG51bWJlcltdIHtcbiAgICBjb25zdCBvZGQgPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMixcbiAgICAgIGV2ZW4gPSBvZGQgKyB0aGlzLl9pdGVtcy5sZW5ndGgsXG4gICAgICBtYXAgPSBpbmRleCA9PiBpbmRleCAlIDIgPT09IDAgPyBldmVuICsgaW5kZXggLyAyIDogb2RkIC0gKGluZGV4ICsgMSkgLyAyO1xuXG4gICAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jbG9uZXMubWFwKCh2LCBpKSA9PiBtYXAoaSkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9jbG9uZXMubWFwKCh2LCBpKSA9PiB2ID09PSBwb3NpdGlvbiA/IG1hcChpKSA6IG51bGwpLmZpbHRlcihpdGVtID0+IGl0ZW0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGN1cnJlbnQgYW5pbWF0aW9uIHNwZWVkLlxuICAgKiBAcGFyYW0gc3BlZWQgVGhlIGFuaW1hdGlvbiBzcGVlZCBpbiBtaWxsaXNlY29uZHMgb3Igbm90aGluZyB0byBsZWF2ZSBpdCB1bmNoYW5nZWQuXG4gICAqIEByZXR1cm5zIFRoZSBjdXJyZW50IGFuaW1hdGlvbiBzcGVlZCBpbiBtaWxsaXNlY29uZHMuXG4gICAqL1xuICBzcGVlZChzcGVlZD86IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHNwZWVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3NwZWVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGNvb3JkaW5hdGUgb2YgYW4gaXRlbS5cbiAgICogQHRvZG8gVGhlIG5hbWUgb2YgdGhpcyBtZXRob2QgaXMgbWlzc2xlYW5kaW5nLlxuICAgKiBAcGFyYW0gcG9zaXRpb24gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIHdpdGhpbiBgbWluaW11bSgpYCBhbmQgYG1heGltdW0oKWAuXG4gICAqIEByZXR1cm5zIFRoZSBjb29yZGluYXRlIG9mIHRoZSBpdGVtIGluIHBpeGVsIG9yIGFsbCBjb29yZGluYXRlcy5cbiAgICovXG4gIGNvb3JkaW5hdGVzKHBvc2l0aW9uPzogbnVtYmVyKTogbnVtYmVyIHwgbnVtYmVyW10ge1xuICAgIGxldCBtdWx0aXBsaWVyID0gMSxcbiAgICAgIG5ld1Bvc2l0aW9uID0gcG9zaXRpb24gLSAxLFxuICAgICAgY29vcmRpbmF0ZSxcbiAgICAgIHJlc3VsdDogbnVtYmVyW107XG5cbiAgICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5fY29vcmRpbmF0ZXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb29yZGluYXRlcyhpbmRleCkgYXMgbnVtYmVyO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNldHRpbmdzLmNlbnRlcikge1xuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MucnRsKSB7XG4gICAgICAgIG11bHRpcGxpZXIgPSAtMTtcbiAgICAgICAgbmV3UG9zaXRpb24gPSBwb3NpdGlvbiArIDE7XG4gICAgICB9XG5cbiAgICAgIGNvb3JkaW5hdGUgPSB0aGlzLl9jb29yZGluYXRlc1twb3NpdGlvbl07XG4gICAgICBjb29yZGluYXRlICs9ICh0aGlzLndpZHRoKCkgLSBjb29yZGluYXRlICsgKHRoaXMuX2Nvb3JkaW5hdGVzW25ld1Bvc2l0aW9uXSB8fCAwKSkgLyAyICogbXVsdGlwbGllcjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29vcmRpbmF0ZSA9IHRoaXMuX2Nvb3JkaW5hdGVzW25ld1Bvc2l0aW9uXSB8fCAwO1xuICAgIH1cblxuICAgIGNvb3JkaW5hdGUgPSBNYXRoLmNlaWwoY29vcmRpbmF0ZSk7XG5cbiAgICByZXR1cm4gY29vcmRpbmF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBzcGVlZCBmb3IgYSB0cmFuc2xhdGlvbi5cbiAgICogQHBhcmFtIGZyb20gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBzdGFydCBpdGVtLlxuICAgKiBAcGFyYW0gdG8gVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSB0YXJnZXQgaXRlbS5cbiAgICogQHBhcmFtIGZhY3RvciBbZmFjdG9yPXVuZGVmaW5lZF0gLSBUaGUgdGltZSBmYWN0b3IgaW4gbWlsbGlzZWNvbmRzLlxuICAgKiBAcmV0dXJucyBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2xhdGlvbi5cbiAgICovXG4gIHByaXZhdGUgX2R1cmF0aW9uKGZyb206IG51bWJlciwgdG86IG51bWJlciwgZmFjdG9yPzogbnVtYmVyIHwgYm9vbGVhbik6IG51bWJlciB7XG4gICAgaWYgKGZhY3RvciA9PT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KE1hdGguYWJzKHRvIC0gZnJvbSksIDEpLCA2KSAqIE1hdGguYWJzKCgrZmFjdG9yIHx8IHRoaXMuc2V0dGluZ3Muc21hcnRTcGVlZCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNsaWRlcyB0byB0aGUgc3BlY2lmaWVkIGl0ZW0uXG4gICAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXG4gICAqIEBwYXJhbSBzcGVlZCBUaGUgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0cmFuc2l0aW9uLlxuICAgKi9cbiAgdG8ocG9zaXRpb246IG51bWJlciwgc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcbiAgICBsZXQgY3VycmVudCA9IHRoaXMuY3VycmVudCgpLFxuICAgICAgcmV2ZXJ0ID0gbnVsbCxcbiAgICAgIGRpc3RhbmNlID0gcG9zaXRpb24gLSB0aGlzLnJlbGF0aXZlKGN1cnJlbnQpLFxuICAgICAgbWF4aW11bSA9IHRoaXMubWF4aW11bSgpO1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9ICsoZGlzdGFuY2UgPiAwKSAtICsoZGlzdGFuY2UgPCAwKSxcbiAgICAgIGl0ZW1zID0gdGhpcy5faXRlbXMubGVuZ3RoLFxuICAgICAgbWluaW11bSA9IHRoaXMubWluaW11bSgpO1xuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MubG9vcCkge1xuICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLnJld2luZCAmJiBNYXRoLmFicyhkaXN0YW5jZSkgPiBpdGVtcyAvIDIpIHtcbiAgICAgICAgZGlzdGFuY2UgKz0gZGlyZWN0aW9uICogLTEgKiBpdGVtcztcbiAgICAgIH1cblxuICAgICAgcG9zaXRpb24gPSBjdXJyZW50ICsgZGlzdGFuY2U7XG4gICAgICByZXZlcnQgPSAoKHBvc2l0aW9uIC0gbWluaW11bSkgJSBpdGVtcyArIGl0ZW1zKSAlIGl0ZW1zICsgbWluaW11bTtcblxuICAgICAgaWYgKHJldmVydCAhPT0gcG9zaXRpb24gJiYgcmV2ZXJ0IC0gZGlzdGFuY2UgPD0gbWF4aW11bSAmJiByZXZlcnQgLSBkaXN0YW5jZSA+IDApIHtcbiAgICAgICAgY3VycmVudCA9IHJldmVydCAtIGRpc3RhbmNlO1xuICAgICAgICBwb3NpdGlvbiA9IHJldmVydDtcbiAgICAgICAgdGhpcy5yZXNldChjdXJyZW50KTtcbiAgICAgICAgdGhpcy5zZW5kQ2hhbmdlcygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5zZXR0aW5ncy5yZXdpbmQpIHtcbiAgICAgIG1heGltdW0gKz0gMTtcbiAgICAgIHBvc2l0aW9uID0gKHBvc2l0aW9uICUgbWF4aW11bSArIG1heGltdW0pICUgbWF4aW11bTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zaXRpb24gPSBNYXRoLm1heChtaW5pbXVtLCBNYXRoLm1pbihtYXhpbXVtLCBwb3NpdGlvbikpO1xuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zcGVlZCh0aGlzLl9kdXJhdGlvbihjdXJyZW50LCBwb3NpdGlvbiwgc3BlZWQpKTtcbiAgICAgIHRoaXMuY3VycmVudChwb3NpdGlvbik7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfSwgMCk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBTbGlkZXMgdG8gdGhlIG5leHQgaXRlbS5cbiAgICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXG4gICAqL1xuICBuZXh0KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XG4gICAgc3BlZWQgPSBzcGVlZCB8fCBmYWxzZTtcbiAgICB0aGlzLnRvKHRoaXMucmVsYXRpdmUodGhpcy5jdXJyZW50KCkpICsgMSwgc3BlZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNsaWRlcyB0byB0aGUgcHJldmlvdXMgaXRlbS5cbiAgICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXG4gICAqL1xuICBwcmV2KHNwZWVkOiBudW1iZXIgfCBib29sZWFuKSB7XG4gICAgc3BlZWQgPSBzcGVlZCB8fCBmYWxzZTtcbiAgICB0aGlzLnRvKHRoaXMucmVsYXRpdmUodGhpcy5jdXJyZW50KCkpIC0gMSwgc3BlZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGVuZCBvZiBhbiBhbmltYXRpb24uXG4gICAqIEBwYXJhbSBldmVudCAtIFRoZSBldmVudCBhcmd1bWVudHMuXG4gICAqL1xuICBvblRyYW5zaXRpb25FbmQoZXZlbnQ/OiBhbnkpIHtcbiAgICAvLyBpZiBjc3MyIGFuaW1hdGlvbiB0aGVuIGV2ZW50IG9iamVjdCBpcyB1bmRlZmluZWRcbiAgICBpZiAoZXZlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIC8vIC8vIENhdGNoIG9ubHkgb3dsLXN0YWdlIHRyYW5zaXRpb25FbmQgZXZlbnRcbiAgICAgIC8vIGlmICgoZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQgfHwgZXZlbnQub3JpZ2luYWxUYXJnZXQpICE9PSB0aGlzLiRzdGFnZS5nZXQoMClcdCkge1xuICAgICAgLy8gXHRyZXR1cm4gZmFsc2U7XG4gICAgICAvLyB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMubGVhdmUoJ2FuaW1hdGluZycpO1xuICAgIHRoaXMuX3RyaWdnZXIoJ3RyYW5zbGF0ZWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHZpZXdwb3J0IHdpZHRoLlxuICAgKiBAcmV0dXJucyAtIFRoZSB3aWR0aCBpbiBwaXhlbC5cbiAgICovXG4gIHByaXZhdGUgX3ZpZXdwb3J0KCk6IG51bWJlciB7XG4gICAgbGV0IHdpZHRoO1xuICAgIGlmICh0aGlzLl93aWR0aCkge1xuICAgICAgd2lkdGggPSB0aGlzLl93aWR0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKCdDYW4gbm90IGRldGVjdCB2aWV3cG9ydCB3aWR0aC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHdpZHRoO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgX2l0ZW1zXG4gICAqIEBwYXJhbSBjb250ZW50IFRoZSBsaXN0IG9mIHNsaWRlcyBwdXQgaW50byBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlcy5cbiAgICovXG4gIHNldEl0ZW1zKGNvbnRlbnQ6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSkge1xuICAgIHRoaXMuX2l0ZW1zID0gY29udGVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHNsaWRlc0RhdGEgdXNpbmcgdGhpcy5faXRlbXNcbiAgICovXG4gIHByaXZhdGUgX2RlZmluZVNsaWRlc0RhdGEoKSB7XG4gICAgLy8gTWF5YmUgY3JlYXRpbmcgYW5kIHVzaW5nIGxvYWRNYXAgd291bGQgYmUgYmV0dGVyIGluIExhenlMb2FkU2VydmljZS5cbiAgICAvLyBIb3Zld2VyIGluIHRoYXQgY2FzZSB3aGVuICdyZXNpemUnIGV2ZW50IGZpcmVzLCBwcm9wICdsb2FkJyBvZiBhbGwgc2xpZGVzIHdpbGwgZ2V0ICdmYWxzZScgYW5kIHN1Y2ggc3RhdGUgb2YgcHJvcCB3aWxsIGJlIHNlZW4gYnkgVmlldyBkdXJpbmcgaXRzIHVwZGF0aW5nLiBBY2NvcmRpbmdseSB0aGUgY29kZSB3aWxsIHJlbW92ZSBzbGlkZXMncyBjb250ZW50IGZyb20gRE9NIGV2ZW4gaWYgaXQgd2FzIGxvYWRlZCBiZWZvcmUuXG4gICAgLy8gVGh1cyBpdCB3b3VsZCBiZSBuZWVkZWQgdG8gYWRkIHRoYXQgY29udGVudCBpbnRvIERPTSBhZ2Fpbi5cbiAgICAvLyBJbiBvcmRlciB0byBhdm9pZCBhZGRpdGlvbmFsIHJlbW92aW5nL2FkZGluZyBsb2FkZWQgc2xpZGVzJ3MgY29udGVudCB3ZSB1c2UgbG9hZE1hcCBoZXJlIGFuZCBzZXQgcmVzdG9yZSBzdGF0ZSBvZiBwcm9wICdsb2FkJyBiZWZvcmUgdGhlIFZpZXcgd2lsbCBnZXQgaXQuXG4gICAgbGV0IGxvYWRNYXA6IE1hcDxzdHJpbmcsIGJvb2xlYW4+O1xuXG4gICAgaWYgKHRoaXMuc2xpZGVzRGF0YSAmJiB0aGlzLnNsaWRlc0RhdGEubGVuZ3RoKSB7XG4gICAgICBsb2FkTWFwID0gbmV3IE1hcCgpO1xuICAgICAgdGhpcy5zbGlkZXNEYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmxvYWQpIHtcbiAgICAgICAgICBsb2FkTWFwLnNldChpdGVtLmlkLCBpdGVtLmxvYWQpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuc2xpZGVzRGF0YSA9IHRoaXMuX2l0ZW1zLm1hcChzbGlkZSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogYCR7c2xpZGUuaWR9YCxcbiAgICAgICAgaXNBY3RpdmU6IGZhbHNlLFxuICAgICAgICB0cGxSZWY6IHNsaWRlLnRwbFJlZixcbiAgICAgICAgZGF0YU1lcmdlOiBzbGlkZS5kYXRhTWVyZ2UsXG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICBpc0Nsb25lZDogZmFsc2UsXG4gICAgICAgIGxvYWQ6IGxvYWRNYXAgPyBsb2FkTWFwLmdldChzbGlkZS5pZCkgOiBmYWxzZSxcbiAgICAgICAgaGFzaEZyYWdtZW50OiBzbGlkZS5kYXRhSGFzaFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGN1cnJlbnQgY2xhc3NlcyBmb3Igc2xpZGVcbiAgICogQHBhcmFtIHNsaWRlIFNsaWRlIG9mIGNhcm91c2VsXG4gICAqIEByZXR1cm5zIG9iamVjdCB3aXRoIG5hbWVzIG9mIGNzcy1jbGFzc2VzIHdoaWNoIGFyZSBrZXlzIGFuZCB0cnVlL2ZhbHNlIHZhbHVlc1xuICAgKi9cbiAgc2V0Q3VyU2xpZGVDbGFzc2VzKHNsaWRlOiBTbGlkZU1vZGVsKToge1trZXk6IHN0cmluZ106IGJvb2xlYW59IHtcbiAgICAvLyBDU1MgY2xhc3NlczogYWRkZWQvcmVtb3ZlZCBwZXIgY3VycmVudCBzdGF0ZSBvZiBjb21wb25lbnQgcHJvcGVydGllc1xuICAgIGxldCBjdXJyZW50Q2xhc3Nlczoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0ge1xuICAgICAgJ2FjdGl2ZSc6IHNsaWRlLmlzQWN0aXZlLFxuICAgICAgJ2NlbnRlcic6IHNsaWRlLmlzQ2VudGVyZWQsXG4gICAgICAnY2xvbmVkJzogc2xpZGUuaXNDbG9uZWQsXG4gICAgICAnYW5pbWF0ZWQnOiBzbGlkZS5pc0FuaW1hdGVkLFxuICAgICAgJ293bC1hbmltYXRlZC1pbic6IHNsaWRlLmlzRGVmQW5pbWF0ZWRJbixcbiAgICAgICdvd2wtYW5pbWF0ZWQtb3V0Jzogc2xpZGUuaXNEZWZBbmltYXRlZE91dFxuICAgIH07XG5cbiAgICBjdXJyZW50Q2xhc3NlcyA9IE9iamVjdC5hc3NpZ24oY3VycmVudENsYXNzZXMsIHNsaWRlLmNsYXNzZXMpO1xuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZUluKSB7XG4gICAgICBjdXJyZW50Q2xhc3Nlc1t0aGlzLnNldHRpbmdzLmFuaW1hdGVJbiBhcyBzdHJpbmddID0gc2xpZGUuaXNDdXN0b21BbmltYXRlZEluO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5hbmltYXRlT3V0KSB7XG4gICAgICBjdXJyZW50Q2xhc3Nlc1t0aGlzLnNldHRpbmdzLmFuaW1hdGVPdXQgYXMgc3RyaW5nXSA9IHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRPdXQ7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50Q2xhc3NlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVyYXRvcnMgdG8gY2FsY3VsYXRlIHJpZ2h0LXRvLWxlZnQgYW5kIGxlZnQtdG8tcmlnaHQuXG4gICAqIEBwYXJhbSBhIC0gVGhlIGxlZnQgc2lkZSBvcGVyYW5kLlxuICAgKiBAcGFyYW0gbyAtIFRoZSBvcGVyYXRvci5cbiAgICogQHBhcmFtIGIgLSBUaGUgcmlnaHQgc2lkZSBvcGVyYW5kLlxuICAgKiBAcmV0dXJucyB0cnVlL2ZhbHNlIG1lYW5pbmcgcmlnaHQtdG8tbGVmdCBvciBsZWZ0LXRvLXJpZ2h0XG4gICAqL1xuICBwcml2YXRlIF9vcChhOiBudW1iZXIsIG86IHN0cmluZywgYjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGw7XG4gICAgc3dpdGNoIChvKSB7XG4gICAgICBjYXNlICc8JzpcbiAgICAgICAgcmV0dXJuIHJ0bCA/IGEgPiBiIDogYSA8IGI7XG4gICAgICBjYXNlICc+JzpcbiAgICAgICAgcmV0dXJuIHJ0bCA/IGEgPCBiIDogYSA+IGI7XG4gICAgICBjYXNlICc+PSc6XG4gICAgICAgIHJldHVybiBydGwgPyBhIDw9IGIgOiBhID49IGI7XG4gICAgICBjYXNlICc8PSc6XG4gICAgICAgIHJldHVybiBydGwgPyBhID49IGIgOiBhIDw9IGI7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcnMgYSBwdWJsaWMgZXZlbnQuXG4gICAqIEB0b2RvIFJlbW92ZSBgc3RhdHVzYCwgYHJlbGF0ZWRUYXJnZXRgIHNob3VsZCBiZSB1c2VkIGluc3RlYWQuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBldmVudCBuYW1lLlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgZXZlbnQgZGF0YS5cbiAgICogQHBhcmFtIG5hbWVzcGFjZSBUaGUgZXZlbnQgbmFtZXNwYWNlLlxuICAgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHdoaWNoIGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgZXZlbnQuXG4gICAqIEBwYXJhbSBlbnRlciBJbmRpY2F0ZXMgaWYgdGhlIGNhbGwgZW50ZXJzIHRoZSBzcGVjaWZpZWQgc3RhdGUgb3Igbm90LlxuICAgKi9cbiAgcHJpdmF0ZSBfdHJpZ2dlcihuYW1lOiBzdHJpbmcsIGRhdGE/OiBhbnksIG5hbWVzcGFjZT86IHN0cmluZywgc3RhdGU/OiBzdHJpbmcsIGVudGVyPzogYm9vbGVhbikge1xuICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgY2FzZSAnaW5pdGlhbGl6ZWQnOlxuICAgICAgICB0aGlzLl9pbml0aWFsaXplZENhcm91c2VsJC5uZXh0KG5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NoYW5nZSc6XG4gICAgICAgIHRoaXMuX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkLm5leHQoZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2hhbmdlZCc6XG4gICAgICAgIHRoaXMuX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJC5uZXh0KGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RyYWcnOlxuICAgICAgICB0aGlzLl9kcmFnQ2Fyb3VzZWwkLm5leHQobmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZHJhZ2dlZCc6XG4gICAgICAgIHRoaXMuX2RyYWdnZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXNpemUnOlxuICAgICAgICB0aGlzLl9yZXNpemVDYXJvdXNlbCQubmV4dChuYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXNpemVkJzpcbiAgICAgICAgdGhpcy5fcmVzaXplZENhcm91c2VsJC5uZXh0KG5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JlZnJlc2gnOlxuICAgICAgICB0aGlzLl9yZWZyZXNoQ2Fyb3VzZWwkLm5leHQobmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVmcmVzaGVkJzpcbiAgICAgICAgdGhpcy5fcmVmcmVzaGVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndHJhbnNsYXRlJzpcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlQ2Fyb3VzZWwkLm5leHQobmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndHJhbnNsYXRlZCc6XG4gICAgICAgIHRoaXMuX3RyYW5zbGF0ZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBFbnRlcnMgYSBzdGF0ZS5cbiAgICogQHBhcmFtIG5hbWUgLSBUaGUgc3RhdGUgbmFtZS5cbiAgICovXG4gIGVudGVyKG5hbWU6IHN0cmluZykge1xuICAgIFtuYW1lXS5jb25jYXQodGhpcy5fc3RhdGVzLnRhZ3NbbmFtZV0gfHwgW10pLmZvckVhY2goKHN0YXRlTmFtZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdID0gMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSsrO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBMZWF2ZXMgYSBzdGF0ZS5cbiAgICogQHBhcmFtIG5hbWUgLSBUaGUgc3RhdGUgbmFtZS5cbiAgICovXG4gIGxlYXZlKG5hbWU6IHN0cmluZykge1xuICAgIFtuYW1lXS5jb25jYXQodGhpcy5fc3RhdGVzLnRhZ3NbbmFtZV0gfHwgW10pLmZvckVhY2goKHN0YXRlTmFtZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0gPT09IDAgfHwgISF0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0tLTtcbiAgICAgIH1cbiAgICB9KVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgb3Igc3RhdGUuXG4gICAqIEBwYXJhbSBvYmplY3QgLSBUaGUgZXZlbnQgb3Igc3RhdGUgdG8gcmVnaXN0ZXIuXG4gICAqL1xuICByZWdpc3RlcihvYmplY3Q6IGFueSkge1xuICAgIGlmIChvYmplY3QudHlwZSA9PT0gVHlwZS5TdGF0ZSkge1xuICAgICAgaWYgKCF0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0pIHtcbiAgICAgICAgdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdID0gb2JqZWN0LnRhZ3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0gPSB0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0uY29uY2F0KG9iamVjdC50YWdzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdID0gdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdLmZpbHRlcigodGFnLCBpKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZXMudGFnc1tvYmplY3QubmFtZV0uaW5kZXhPZih0YWcpID09PSBpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN1cHByZXNzZXMgZXZlbnRzLlxuICAgKiBAcGFyYW0gZXZlbnRzIFRoZSBldmVudHMgdG8gc3VwcHJlc3MuXG4gICAqL1xuICBwcml2YXRlIF9zdXBwcmVzcyhldmVudHM6IHN0cmluZ1tdKSB7XG4gICAgZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgdGhpcy5fc3VwcmVzc1tldmVudF0gPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbGVhc2VzIHN1cHByZXNzZWQgZXZlbnRzLlxuICAgKiBAcGFyYW0gZXZlbnRzIFRoZSBldmVudHMgdG8gcmVsZWFzZS5cbiAgICovXG4gIHByaXZhdGUgX3JlbGVhc2UoZXZlbnRzOiBzdHJpbmdbXSkge1xuICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9zdXByZXNzW2V2ZW50XTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHVuaWZpZWQgcG9pbnRlciBjb29yZGluYXRlcyBmcm9tIGV2ZW50LlxuICAgKiBAdG9kbyAjMjYxXG4gICAqIEBwYXJhbSBldmVudCBUaGUgYG1vdXNlZG93bmAgb3IgYHRvdWNoc3RhcnRgIGV2ZW50LlxuICAgKiBAcmV0dXJucyBPYmplY3QgQ29vcmRzIHdoaWNoIGNvbnRhaW5zIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzIG9mIGN1cnJlbnQgcG9pbnRlciBwb3NpdGlvbi5cbiAgICovXG4gIHBvaW50ZXIoZXZlbnQ6IGFueSk6IENvb3JkcyB7XG4gICAgY29uc3QgcmVzdWx0ID0ge3g6IG51bGwsIHk6IG51bGx9O1xuXG4gICAgZXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50IHx8IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcblxuICAgIGV2ZW50ID0gZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aCA/XG4gICAgICBldmVudC50b3VjaGVzWzBdIDogZXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID9cbiAgICAgICAgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0gOiBldmVudDtcblxuICAgIGlmIChldmVudC5wYWdlWCkge1xuICAgICAgcmVzdWx0LnggPSBldmVudC5wYWdlWDtcbiAgICAgIHJlc3VsdC55ID0gZXZlbnQucGFnZVk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC54ID0gZXZlbnQuY2xpZW50WDtcbiAgICAgIHJlc3VsdC55ID0gZXZlbnQuY2xpZW50WTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIHNvbWV0aGluZyB0aGF0IGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyXG4gICAqIEBwYXJhbSBudW1iZXIgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxuICAgKiBAcmV0dXJucyBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxuICAgKi9cbiAgcHJpdmF0ZSBfaXNOdW1lcmljKG51bWJlcjogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG51bWJlcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciB2YWx1ZSBpcyBudW1iZXIgb3IgYm9vbGVhbiB0eXBlXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXG4gICAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyLCBvciBCb29sZWFuXG4gICAqL1xuICBwcml2YXRlIF9pc051bWJlck9yQm9vbGVhbih2YWx1ZTogbnVtYmVyIHwgYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc051bWVyaWModmFsdWUpIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciB2YWx1ZSBpcyBudW1iZXIgb3Igc3RyaW5nIHR5cGVcbiAgICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcbiAgICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXIsIG9yIFN0cmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBfaXNOdW1iZXJPclN0cmluZyh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzTnVtZXJpYyh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdmFsdWUgaXMgbnVtYmVyIG9yIHN0cmluZyB0eXBlXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXG4gICAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyLCBvciBTdHJpbmdcbiAgICovXG4gIHByaXZhdGUgX2lzU3RyaW5nT3JCb29sZWFuKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkaWZmZXJlbmNlIG9mIHR3byB2ZWN0b3JzLlxuICAgKiBAdG9kbyAjMjYxXG4gICAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgdmVjdG9yLlxuICAgKiBAcGFyYW0gc2Vjb25kLSBUaGUgc2Vjb25kIHZlY3Rvci5cbiAgICogQHJldHVybnMgVGhlIGRpZmZlcmVuY2UuXG4gICAqL1xuICBkaWZmZXJlbmNlKGZpcnN0OiBDb29yZHMsIHNlY29uZDogQ29vcmRzKTogQ29vcmRzIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogZmlyc3QueCAtIHNlY29uZC54LFxuICAgICAgeTogZmlyc3QueSAtIHNlY29uZC55XG4gICAgfTtcbiAgfVxuXG59XG4iXX0=