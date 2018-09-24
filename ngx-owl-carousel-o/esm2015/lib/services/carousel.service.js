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
                        this.slidesData[this.current()].isCentered = true;
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
        const currentClasses = {
            'active': slide.isActive,
            'center': slide.isCentered,
            'cloned': slide.isCloned,
            'animated': slide.isAnimated,
            'owl-animated-in': slide.isDefAnimatedIn,
            'owl-animated-out': slide.isDefAnimatedOut
        };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vd2wtY2Fyb3VzZWwtby8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jYXJvdXNlbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFJQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxPQUFPLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7QUFROUYsTUFBTTtDQUtMOzs7Ozs7Ozs7SUFPQyxPQUFRLE9BQU87SUFDZixPQUFRLE9BQU87OztBQUNoQixDQUFDOzs7SUFPQSxTQUFVLFNBQVM7SUFDbkIsT0FBUSxPQUFPO0lBQ2YsT0FBUSxPQUFPOzs7QUFDaEIsQ0FBQzs7OztBQUtGLE1BQU07Q0FHTDs7Ozs7Ozs7OztBQUtELE1BQU07Q0FNTDs7Ozs7Ozs7Ozs7OztBQUdELE1BQU07SUE0YUo7Ozs7cUNBeGFnQyxJQUFJLE9BQU8sRUFBdUI7Ozs7cUNBSWxDLElBQUksT0FBTyxFQUFVOzs7O3dDQUtsQixJQUFJLE9BQU8sRUFBTzs7Ozt5Q0FLakIsSUFBSSxPQUFPLEVBQU87Ozs7bUNBSXhCLElBQUksT0FBTyxFQUFVOzs7O29DQUlwQixJQUFJLE9BQU8sRUFBVTs7OztnQ0FJekIsSUFBSSxPQUFPLEVBQVU7Ozs7aUNBSXBCLElBQUksT0FBTyxFQUFVOzs7O2lDQUlyQixJQUFJLE9BQU8sRUFBVTs7OzttQ0FJbkIsSUFBSSxPQUFPLEVBQVU7Ozs7OEJBSTFCLElBQUksT0FBTyxFQUFVOzs7O2lDQUlsQixJQUFJLE9BQU8sRUFBVTs7Ozt3QkFLMUI7WUFDckIsS0FBSyxFQUFFLENBQUM7U0FDVDs7OzswQkFLd0I7WUFDdkIsR0FBRyxFQUFFLEtBQUs7WUFDVixZQUFZLEVBQUUsS0FBSztZQUNuQixXQUFXLEVBQUUs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aUIsQ0FBQyxLQUFzQjtRQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUM7Ozs7Ozs7SUFRckQsa0JBQWtCLENBQUMsS0FBc0I7UUFDL0MsTUFBTSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUM7Ozs7Ozs7OztJQVVqRSxVQUFVLENBQUMsS0FBYSxFQUFFLE1BQWM7UUFDdEMsTUFBTSxDQUFDO1lBQ0wsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFDckIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7U0FDdEIsQ0FBQztLQUNIOzs7WUFsbkRGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFnZURhdGEgfSBmcm9tICcuLi9tb2RlbHMvc3RhZ2UtZGF0YS5tb2RlbCc7XG5cbmltcG9ydCB7IE93bERPTURhdGEgfSBmcm9tICcuLi9tb2RlbHMvb3dsRE9NLWRhdGEubW9kZWwnO1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENhcm91c2VsU2xpZGVEaXJlY3RpdmUgfSBmcm9tICcuLi9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUnO1xuaW1wb3J0IHsgU2xpZGVNb2RlbCB9IGZyb20gJy4uL21vZGVscy9zbGlkZS5tb2RlbCc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPd2xDYXJvdXNlbE9Db25maWcsIE93bE9wdGlvbnNNb2NrZWRUeXBlcyB9IGZyb20gJy4uL2Nhcm91c2VsL293bC1jYXJvdXNlbC1vLWNvbmZpZyc7XG5pbXBvcnQgeyBPd2xPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL293bC1vcHRpb25zLm1vZGVsJztcblxuaW1wb3J0IHsgTmF2RGF0YSwgRG90c0RhdGEgfSBmcm9tICcuLi9tb2RlbHMvbmF2aWdhdGlvbi1kYXRhLm1vZGVscyc7XG5cbi8qKlxuICogQ3VycmVudCBzdGF0ZSBpbmZvcm1hdGlvbiBhbmQgdGhlaXIgdGFncy5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRlcyB7XG4gIGN1cnJlbnQ6IHt9O1xuICB0YWdzOiB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nW107XG4gIH07XG59XG5cbi8qKlxuICogRW51bWVyYXRpb24gZm9yIHR5cGVzLlxuICogQGVudW0ge1N0cmluZ31cbiAqL1xuZXhwb3J0IGVudW0gVHlwZSB7XG4gIEV2ZW50ID0gJ2V2ZW50JyxcbiAgU3RhdGUgPSAnc3RhdGUnXG59O1xuXG4vKipcbiAqIEVudW1lcmF0aW9uIGZvciB3aWR0aC5cbiAqIEBlbnVtIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBlbnVtIFdpZHRoIHtcbiAgRGVmYXVsdCA9ICdkZWZhdWx0JyxcbiAgSW5uZXIgPSAnaW5uZXInLFxuICBPdXRlciA9ICdvdXRlcidcbn07XG5cbi8qKlxuICogTW9kZWwgZm9yIGNvb3JkcyBvZiAub3dsLXN0YWdlXG4gKi9cbmV4cG9ydCBjbGFzcyBDb29yZHMge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBNb2RlbCBmb3IgYWxsIGN1cnJlbnQgZGF0YSBvZiBjYXJvdXNlbFxuICovXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDdXJyZW50RGF0YSB7XG4gIG93bERPTURhdGE6IE93bERPTURhdGE7XG4gIHN0YWdlRGF0YTogU3RhZ2VEYXRhO1xuICBzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW107XG4gIG5hdkRhdGE6IE5hdkRhdGE7XG4gIGRvdHNEYXRhOiBEb3RzRGF0YTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhcm91c2VsU2VydmljZSB7XG4gIC8qKlxuICAgKiBTdWJqZWN0IGZvciBwYXNzaW5nIGRhdGEgbmVlZGVkIGZvciBtYW5hZ2luZyBWaWV3XG4gICAqL1xuICBwcml2YXRlIF92aWV3U2V0dGluZ3NTaGlwcGVyJCA9IG5ldyBTdWJqZWN0PENhcm91c2VsQ3VycmVudERhdGE+KCk7XG4gIC8qKlxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgZ290IGluaXRpYWxpemVzXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsaXplZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuICAvKipcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGNhcm91c2VsJ3Mgc2V0dGluZ3Mgc3RhcnQgY2hhbmdpbmZcbiAgICovXG4gIHByaXZhdGUgX2NoYW5nZVNldHRpbmdzQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIC8qKlxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwncyBzZXR0aW5ncyBoYXZlIGNoYW5nZWRcbiAgICovXG4gIHByaXZhdGUgX2NoYW5nZWRTZXR0aW5nc0Nhcm91c2VsJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgLyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCBzdGFydHMgdHJhbnNsYXRpbmcgb3IgbW92aW5nXG4gICAqL1xuICBwcml2YXRlIF90cmFuc2xhdGVDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gIC8qKlxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwgc3RvcHBlZCB0cmFuc2xhdGluZyBvciBtb3ZpbmdcbiAgICovXG4gIHByaXZhdGUgX3RyYW5zbGF0ZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gIC8qKlxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgY2Fyb3VzZWwncyByZWJ1aWxkaW5nIGNhdXNlZCBieSAncmVzaXplJyBldmVudCBzdGFydHNcbiAgICovXG4gIHByaXZhdGUgX3Jlc2l6ZUNhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgLyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiAgd2hlbiB0aGUgY2Fyb3VzZWwncyByZWJ1aWxkaW5nIGNhdXNlZCBieSAncmVzaXplJyBldmVudCBpcyBlbmRlZFxuICAgKi9cbiAgcHJpdmF0ZSBfcmVzaXplZENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgLyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSByZWZyZXNoIG9mIGNhcm91c2VsIHN0YXJ0c1xuICAgKi9cbiAgcHJpdmF0ZSBfcmVmcmVzaENhcm91c2VsJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgLyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSByZWZyZXNoIG9mIGNhcm91c2VsIGlzIGVuZGVkXG4gICAqL1xuICBwcml2YXRlIF9yZWZyZXNoZWRDYXJvdXNlbCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gIC8qKlxuICAgKiBTdWJqZWN0IGZvciBub3RpZmljYXRpb24gd2hlbiB0aGUgZHJhZ2dpbmcgb2YgY2Fyb3VzZWwgc3RhcnRzXG4gICAqL1xuICBwcml2YXRlIF9kcmFnQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAvKipcbiAgICogU3ViamVjdCBmb3Igbm90aWZpY2F0aW9uIHdoZW4gdGhlIGRyYWdnaW5nIG9mIGNhcm91c2VsIGlzIGVuZGVkXG4gICAqL1xuICBwcml2YXRlIF9kcmFnZ2VkQ2Fyb3VzZWwkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IHNldHRpbmdzIGZvciB0aGUgY2Fyb3VzZWwuXG4gICAqL1xuICBzZXR0aW5nczogT3dsT3B0aW9ucyA9IHtcbiAgICBpdGVtczogMFxuICB9O1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIGRhdGEgZm9yIHNldHRpbmcgY2xhc3NlcyB0byBlbGVtZW50IC5vd2wtY2Fyb3VzZWxcbiAgICovXG4gIG93bERPTURhdGE6IE93bERPTURhdGEgPSB7XG4gICAgcnRsOiBmYWxzZSxcbiAgICBpc1Jlc3BvbnNpdmU6IGZhbHNlLFxuICAgIGlzUmVmcmVzaGVkOiBmYWxzZSxcbiAgICBpc0xvYWRlZDogZmFsc2UsXG4gICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICBpc01vdXNlRHJhZ2FibGU6IGZhbHNlLFxuICAgIGlzR3JhYjogZmFsc2UsXG4gICAgaXNUb3VjaERyYWdhYmxlOiBmYWxzZVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIGRhdGEgb2YgLm93bC1zdGFnZVxuICAgKi9cbiAgc3RhZ2VEYXRhOiBTdGFnZURhdGEgPSB7XG4gICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMHB4LDBweCwwcHgpJyxcbiAgICB0cmFuc2l0aW9uOiAnMHMnLFxuICAgIHdpZHRoOiAwLFxuICAgIHBhZGRpbmdMOiAwLFxuICAgIHBhZGRpbmdSOiAwXG4gIH07XG5cbiAgLyoqXG4gICAqICBEYXRhIG9mIGV2ZXJ5IHNsaWRlXG4gICAqL1xuICBzbGlkZXNEYXRhOiBTbGlkZU1vZGVsW107XG5cbiAgLyoqXG4gICAqIERhdGEgb2YgbmF2aWdhdGlvbiBibG9ja1xuICAgKi9cbiAgbmF2RGF0YTogTmF2RGF0YTtcblxuICAvKipcbiAgICogRGF0YSBvZiBkb3RzIGJsb2NrXG4gICAqL1xuICBkb3RzRGF0YTogRG90c0RhdGE7XG5cbiAgLyoqXG4gICAqIENhcm91c2VsIHdpZHRoXG4gICAqL1xuICBwcml2YXRlIF93aWR0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBbGwgcmVhbCBpdGVtcy5cbiAgICovXG4gIHByaXZhdGUgX2l0ZW1zOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10gPSBbXTsgLy8gaXMgZXF1YWwgdG8gdGhpcy5zbGlkZXNcblxuICAvKipcbiAgICogQXJyYXkgd2l0aCB3aWR0aCBvZiBldmVyeSBzbGlkZS5cbiAgICovXG4gIHByaXZhdGUgX3dpZHRoczogYW55W10gPSBbXTtcblxuICAvKipcbiAgICogQ3VycmVudGx5IHN1cHByZXNzZWQgZXZlbnRzIHRvIHByZXZlbnQgdGhlbSBmcm9tIGJlZWluZyByZXRyaWdnZXJlZC5cbiAgICovXG4gIHByaXZhdGUgX3N1cHJlc3M6IGFueSA9IHt9O1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2VzIHRvIHRoZSBydW5uaW5nIHBsdWdpbnMgb2YgdGhpcyBjYXJvdXNlbC5cbiAgICovXG4gIHByaXZhdGUgX3BsdWdpbnM6IGFueSA9IHt9O1xuXG4gIC8qKlxuICAgKiBBYnNvbHV0ZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBfY3VycmVudDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEFsbCBjbG9uZWQgaXRlbXMuXG4gICAqL1xuICBwcml2YXRlIF9jbG9uZXM6IGFueVtdID0gW107XG5cbiAgLyoqXG4gICAqIE1lcmdlIHZhbHVlcyBvZiBhbGwgaXRlbXMuXG4gICAqIEB0b2RvIE1heWJlIHRoaXMgY291bGQgYmUgcGFydCBvZiBhIHBsdWdpbi5cbiAgICovXG4gIHJlYWRvbmx5IF9tZXJnZXJzOiBhbnlbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBBbmltYXRpb24gc3BlZWQgaW4gbWlsbGlzZWNvbmRzLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3BlZWQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBDb29yZGluYXRlcyBvZiBhbGwgaXRlbXMgaW4gcGl4ZWwuXG4gICAqIEB0b2RvIFRoZSBuYW1lIG9mIHRoaXMgbWVtYmVyIGlzIG1pc3NsZWFkaW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBfY29vcmRpbmF0ZXM6IG51bWJlcltdID0gW107XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgYnJlYWtwb2ludC5cbiAgICogQHRvZG8gUmVhbCBtZWRpYSBxdWVyaWVzIHdvdWxkIGJlIG5pY2UuXG4gICAqL1xuICBwcml2YXRlIF9icmVha3BvaW50OiBhbnkgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBQcmVmaXggZm9yIGlkIG9mIGNsb25lZCBzbGlkZXNcbiAgICovXG4gIGNsb25lZElkUHJlZml4ID0gJ2Nsb25lZC0nO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IG9wdGlvbnMgc2V0IGJ5IHRoZSBjYWxsZXIgaW5jbHVkaW5nIGRlZmF1bHRzLlxuICAgKi9cbiAgX29wdGlvbnM6IE93bE9wdGlvbnMgPSB7fTtcblxuICAvKipcbiAgICogSW52YWxpZGF0ZWQgcGFydHMgd2l0aGluIHRoZSB1cGRhdGUgcHJvY2Vzcy5cbiAgICovXG4gIHByaXZhdGUgX2ludmFsaWRhdGVkOiBhbnkgPSB7fTtcblxuICAvLyBJcyBuZWVkZWQgZm9yIHRlc3RzXG4gIGdldCBpbnZhbGlkYXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW52YWxpZGF0ZWQ7XG4gIH1cblxuICAvKipcbiAgICogQ3VycmVudCBzdGF0ZSBpbmZvcm1hdGlvbiBhbmQgdGhlaXIgdGFncy5cbiAgICovXG4gIHByaXZhdGUgX3N0YXRlczogU3RhdGVzID0ge1xuICAgIGN1cnJlbnQ6IHt9LFxuICAgIHRhZ3M6IHtcbiAgICAgIGluaXRpYWxpemluZzogWydidXN5J10sXG4gICAgICBhbmltYXRpbmc6IFsnYnVzeSddLFxuICAgICAgZHJhZ2dpbmc6IFsnaW50ZXJhY3RpbmcnXVxuICAgIH1cbiAgfTtcblxuICAvLyBpcyBuZWVkZWQgZm9yIHRlc3RzXG4gIGdldCBzdGF0ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBPcmRlcmVkIGxpc3Qgb2Ygd29ya2VycyBmb3IgdGhlIHVwZGF0ZSBwcm9jZXNzLlxuICAgKi9cbiAgcHJpdmF0ZSBfcGlwZTogYW55W10gPSBbXG4gICAgLy8ge1xuICAgIC8vICAgZmlsdGVyOiBbJ3dpZHRoJywgJ3NldHRpbmdzJ10sXG4gICAgLy8gICBydW46ICgpID0+IHtcbiAgICAvLyAgICAgdGhpcy5fd2lkdGggPSB0aGlzLmNhcm91c2VsV2luZG93V2lkdGg7XG4gICAgLy8gICB9XG4gICAgLy8gfSxcbiAgICB7XG4gICAgICBmaWx0ZXI6IFsnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnXSxcbiAgICAgIHJ1bjogY2FjaGUgPT4ge1xuICAgICAgICBjYWNoZS5jdXJyZW50ID0gdGhpcy5faXRlbXMgJiYgdGhpcy5faXRlbXNbdGhpcy5yZWxhdGl2ZSh0aGlzLl9jdXJyZW50KV0uaWQ7XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyB7XG4gICAgLy8gICBmaWx0ZXI6IFsnaXRlbXMnLCAnc2V0dGluZ3MnXSxcbiAgICAvLyAgIHJ1bjogZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgIC8vIHRoaXMuJHN0YWdlLmNoaWxkcmVuKCcuY2xvbmVkJykucmVtb3ZlKCk7XG4gICAgLy8gICB9XG4gICAgLy8gfSxcbiAgICB7XG4gICAgICBmaWx0ZXI6IFsnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnXSxcbiAgICAgIHJ1bjogKGNhY2hlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcmdpbiA9IHRoaXMuc2V0dGluZ3MubWFyZ2luIHx8ICcnLFxuICAgICAgICAgIGdyaWQgPSAhdGhpcy5zZXR0aW5ncy5hdXRvV2lkdGgsXG4gICAgICAgICAgcnRsID0gdGhpcy5zZXR0aW5ncy5ydGwsXG4gICAgICAgICAgY3NzID0ge1xuICAgICAgICAgICAgJ21hcmdpbi1sZWZ0JzogcnRsID8gbWFyZ2luIDogJycsXG4gICAgICAgICAgICAnbWFyZ2luLXJpZ2h0JzogcnRsID8gJycgOiBtYXJnaW5cbiAgICAgICAgICB9O1xuXG4gICAgICAgIGlmICghZ3JpZCkge1xuICAgICAgICAgIHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgICAgIHNsaWRlLm1hcmdpbkwgPSBjc3NbJ21hcmdpbi1sZWZ0J107XG4gICAgICAgICAgICBzbGlkZS5tYXJnaW5SID0gY3NzWydtYXJnaW4tcmlnaHQnXTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhY2hlLmNzcyA9IGNzcztcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBmaWx0ZXI6IFsnd2lkdGgnLCAnaXRlbXMnLCAnc2V0dGluZ3MnXSxcbiAgICAgIHJ1bjogKGNhY2hlKSA9PiB7XG4gICAgICAgIGNvbnN0IHdpZHRoOiBhbnkgPSArKHRoaXMud2lkdGgoKSAvIHRoaXMuc2V0dGluZ3MuaXRlbXMpLnRvRml4ZWQoMykgLSB0aGlzLnNldHRpbmdzLm1hcmdpbixcbiAgICAgICAgICBncmlkID0gIXRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoLFxuICAgICAgICAgIHdpZHRocyA9IFtdO1xuICAgICAgICBsZXQgbWVyZ2UgPSBudWxsLFxuICAgICAgICAgIGl0ZXJhdG9yID0gdGhpcy5faXRlbXMubGVuZ3RoO1xuXG4gICAgICAgIGNhY2hlLml0ZW1zID0ge1xuICAgICAgICAgIG1lcmdlOiBmYWxzZSxcbiAgICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgICAgfTtcblxuICAgICAgICB3aGlsZSAoaXRlcmF0b3ItLSkge1xuICAgICAgICAgIG1lcmdlID0gdGhpcy5fbWVyZ2Vyc1tpdGVyYXRvcl07XG4gICAgICAgICAgbWVyZ2UgPSB0aGlzLnNldHRpbmdzLm1lcmdlRml0ICYmIE1hdGgubWluKG1lcmdlLCB0aGlzLnNldHRpbmdzLml0ZW1zKSB8fCBtZXJnZTtcbiAgICAgICAgICBjYWNoZS5pdGVtcy5tZXJnZSA9IG1lcmdlID4gMSB8fCBjYWNoZS5pdGVtcy5tZXJnZTtcblxuICAgICAgICAgIHdpZHRoc1tpdGVyYXRvcl0gPSAhZ3JpZCA/IHRoaXMuX2l0ZW1zW2l0ZXJhdG9yXS53aWR0aCA/IHRoaXMuX2l0ZW1zW2l0ZXJhdG9yXS53aWR0aCA6IHdpZHRoIDogd2lkdGggKiBtZXJnZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3dpZHRocyA9IHdpZHRocztcblxuICAgICAgICB0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcbiAgICAgICAgICBzbGlkZS53aWR0aCA9IHRoaXMuX3dpZHRoc1tpXTtcbiAgICAgICAgICBzbGlkZS5tYXJnaW5SID0gY2FjaGUuY3NzWydtYXJnaW4tcmlnaHQnXTtcbiAgICAgICAgICBzbGlkZS5tYXJnaW5MID0gY2FjaGUuY3NzWydtYXJnaW4tbGVmdCddO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBmaWx0ZXI6IFsnaXRlbXMnLCAnc2V0dGluZ3MnXSxcbiAgICAgIHJ1bjogKCkgPT4ge1xuICAgICAgICBjb25zdCBjbG9uZXM6IGFueVtdID0gW10sXG4gICAgICAgICAgaXRlbXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSA9IHRoaXMuX2l0ZW1zLFxuICAgICAgICAgIHNldHRpbmdzOiBhbnkgPSB0aGlzLnNldHRpbmdzLFxuICAgICAgICAgIC8vIFRPRE86IFNob3VsZCBiZSBjb21wdXRlZCBmcm9tIG51bWJlciBvZiBtaW4gd2lkdGggaXRlbXMgaW4gc3RhZ2VcbiAgICAgICAgICB2aWV3ID0gTWF0aC5tYXgoc2V0dGluZ3MuaXRlbXMgKiAyLCA0KSxcbiAgICAgICAgICBzaXplID0gTWF0aC5jZWlsKGl0ZW1zLmxlbmd0aCAvIDIpICogMjtcbiAgICAgICAgbGV0IGFwcGVuZDogYW55W10gPSBbXSxcbiAgICAgICAgICBwcmVwZW5kOiBhbnlbXSA9IFtdLFxuICAgICAgICAgIHJlcGVhdCA9IHNldHRpbmdzLmxvb3AgJiYgaXRlbXMubGVuZ3RoID8gc2V0dGluZ3MucmV3aW5kID8gdmlldyA6IE1hdGgubWF4KHZpZXcsIHNpemUpIDogMDtcblxuICAgICAgICByZXBlYXQgLz0gMjtcblxuICAgICAgICB3aGlsZSAocmVwZWF0LS0pIHtcbiAgICAgICAgICAvLyBTd2l0Y2ggdG8gb25seSB1c2luZyBhcHBlbmRlZCBjbG9uZXNcbiAgICAgICAgICBjbG9uZXMucHVzaCh0aGlzLm5vcm1hbGl6ZShjbG9uZXMubGVuZ3RoIC8gMiwgdHJ1ZSkpO1xuICAgICAgICAgIGFwcGVuZC5wdXNoKHsuLi50aGlzLnNsaWRlc0RhdGFbY2xvbmVzW2Nsb25lcy5sZW5ndGggLSAxXV19KTtcbiAgICAgICAgICBjbG9uZXMucHVzaCh0aGlzLm5vcm1hbGl6ZShpdGVtcy5sZW5ndGggLSAxIC0gKGNsb25lcy5sZW5ndGggLSAxKSAvIDIsIHRydWUpKTtcbiAgICAgICAgICBwcmVwZW5kLnVuc2hpZnQoey4uLnRoaXMuc2xpZGVzRGF0YVtjbG9uZXNbY2xvbmVzLmxlbmd0aCAtIDFdXX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2xvbmVzID0gY2xvbmVzO1xuXG4gICAgICAgIGFwcGVuZCA9IGFwcGVuZC5tYXAoc2xpZGUgPT4ge1xuICAgICAgICAgIHNsaWRlLmlkID0gYCR7dGhpcy5jbG9uZWRJZFByZWZpeH0ke3NsaWRlLmlkfWA7XG4gICAgICAgICAgc2xpZGUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICBzbGlkZS5pc0Nsb25lZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIHNsaWRlO1xuICAgICAgICB9KTtcblxuICAgICAgICBwcmVwZW5kID0gcHJlcGVuZC5tYXAoc2xpZGUgPT4ge1xuICAgICAgICAgIHNsaWRlLmlkID0gYCR7dGhpcy5jbG9uZWRJZFByZWZpeH0ke3NsaWRlLmlkfWA7XG4gICAgICAgICAgc2xpZGUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICBzbGlkZS5pc0Nsb25lZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIHNsaWRlO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNsaWRlc0RhdGEgPSBwcmVwZW5kLmNvbmNhdCh0aGlzLnNsaWRlc0RhdGEpLmNvbmNhdChhcHBlbmQpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGZpbHRlcjogWyd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncyddLFxuICAgICAgcnVuOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsID8gMSA6IC0xLFxuICAgICAgICAgIHNpemUgPSB0aGlzLl9jbG9uZXMubGVuZ3RoICsgdGhpcy5faXRlbXMubGVuZ3RoLFxuICAgICAgICAgIGNvb3JkaW5hdGVzID0gW107XG4gICAgICAgIGxldCBpdGVyYXRvciA9IC0xLFxuICAgICAgICAgIHByZXZpb3VzID0gMCxcbiAgICAgICAgICBjdXJyZW50ID0gMDtcblxuICAgICAgICB3aGlsZSAoKytpdGVyYXRvciA8IHNpemUpIHtcbiAgICAgICAgICBwcmV2aW91cyA9IGNvb3JkaW5hdGVzW2l0ZXJhdG9yIC0gMV0gfHwgMDtcbiAgICAgICAgICBjdXJyZW50ID0gdGhpcy5fd2lkdGhzW3RoaXMucmVsYXRpdmUoaXRlcmF0b3IpXSArIHRoaXMuc2V0dGluZ3MubWFyZ2luO1xuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2gocHJldmlvdXMgKyBjdXJyZW50ICogcnRsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2Nvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXM7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAgZmlsdGVyOiBbJ3dpZHRoJywgJ2l0ZW1zJywgJ3NldHRpbmdzJ10sXG4gICAgICBydW46ICgpID0+IHtcbiAgICAgICAgY29uc3QgcGFkZGluZyA9IHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nLFxuICAgICAgICAgIGNvb3JkaW5hdGVzID0gdGhpcy5fY29vcmRpbmF0ZXMsXG4gICAgICAgICAgY3NzID0ge1xuICAgICAgICAgICAgJ3dpZHRoJzogTWF0aC5jZWlsKE1hdGguYWJzKGNvb3JkaW5hdGVzW2Nvb3JkaW5hdGVzLmxlbmd0aCAtIDFdKSkgKyBwYWRkaW5nICogMixcbiAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBwYWRkaW5nIHx8ICcnLFxuICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBwYWRkaW5nIHx8ICcnXG4gICAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnN0YWdlRGF0YS53aWR0aCA9IGNzcy53aWR0aDsgLy8gdXNlIHRoaXMgcHJvcGVydHkgaW4gKm5nSWYgZGlyZWN0aXZlIGZvciAub3dsLXN0YWdlIGVsZW1lbnRcbiAgICAgICAgdGhpcy5zdGFnZURhdGEucGFkZGluZ0wgPSBjc3NbJ3BhZGRpbmctbGVmdCddO1xuICAgICAgICB0aGlzLnN0YWdlRGF0YS5wYWRkaW5nUiA9IGNzc1sncGFkZGluZy1yaWdodCddO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIC8vICAgZmlsdGVyOiBbICd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncycgXSxcbiAgICAgIC8vICAgcnVuOiBjYWNoZSA9PiB7XG4gICAgICAvLyBcdFx0Ly8gdGhpcyBtZXRob2Qgc2V0cyB0aGUgd2lkdGggZm9yIGV2ZXJ5IHNsaWRlLCBidXQgSSBzZXQgaXQgaW4gZGlmZmVyZW50IHdheSBlYXJsaWVyXG4gICAgICAvLyBcdFx0Y29uc3QgZ3JpZCA9ICF0aGlzLnNldHRpbmdzLmF1dG9XaWR0aCxcbiAgICAgIC8vIFx0XHRpdGVtcyA9IHRoaXMuJHN0YWdlLmNoaWxkcmVuKCk7IC8vIHVzZSB0aGlzLnNsaWRlc0RhdGFcbiAgICAgIC8vICAgICBsZXQgaXRlcmF0b3IgPSB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGg7XG5cbiAgICAgIC8vICAgICBpZiAoZ3JpZCAmJiBjYWNoZS5pdGVtcy5tZXJnZSkge1xuICAgICAgLy8gICAgICAgd2hpbGUgKGl0ZXJhdG9yLS0pIHtcbiAgICAgIC8vICAgICAgICAgY2FjaGUuY3NzLndpZHRoID0gdGhpcy5fd2lkdGhzW3RoaXMucmVsYXRpdmUoaXRlcmF0b3IpXTtcbiAgICAgIC8vICAgICAgICAgaXRlbXMuZXEoaXRlcmF0b3IpLmNzcyhjYWNoZS5jc3MpO1xuICAgICAgLy8gICAgICAgfVxuICAgICAgLy8gICAgIH0gZWxzZSBpZiAoZ3JpZCkge1xuICAgICAgLy8gICAgICAgY2FjaGUuY3NzLndpZHRoID0gY2FjaGUuaXRlbXMud2lkdGg7XG4gICAgICAvLyAgICAgICBpdGVtcy5jc3MoY2FjaGUuY3NzKTtcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0sIHtcbiAgICAgIC8vICAgZmlsdGVyOiBbICdpdGVtcycgXSxcbiAgICAgIC8vICAgcnVuOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vICAgICB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGggPCAxICYmIHRoaXMuJHN0YWdlLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0sIHtcbiAgICAgIGZpbHRlcjogWyd3aWR0aCcsICdpdGVtcycsICdzZXR0aW5ncyddLFxuICAgICAgcnVuOiBjYWNoZSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gY2FjaGUuY3VycmVudCA/IHRoaXMuc2xpZGVzRGF0YS5maW5kSW5kZXgoc2xpZGUgPT4gc2xpZGUuaWQgPT09IGNhY2hlLmN1cnJlbnQpIDogMDtcbiAgICAgICAgY3VycmVudCA9IE1hdGgubWF4KHRoaXMubWluaW11bSgpLCBNYXRoLm1pbih0aGlzLm1heGltdW0oKSwgY3VycmVudCkpO1xuICAgICAgICB0aGlzLnJlc2V0KGN1cnJlbnQpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGZpbHRlcjogWydwb3NpdGlvbiddLFxuICAgICAgcnVuOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLmNvb3JkaW5hdGVzKHRoaXMuX2N1cnJlbnQpKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBmaWx0ZXI6IFsnd2lkdGgnLCAncG9zaXRpb24nLCAnaXRlbXMnLCAnc2V0dGluZ3MnXSxcbiAgICAgIHJ1bjogKCkgPT4ge1xuICAgICAgICBjb25zdCBydGwgPSB0aGlzLnNldHRpbmdzLnJ0bCA/IDEgOiAtMSxcbiAgICAgICAgICBwYWRkaW5nID0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgKiAyLFxuICAgICAgICAgIG1hdGNoZXMgPSBbXTtcbiAgICAgICAgbGV0IGJlZ2luLCBlbmQsIGlubmVyLCBvdXRlciwgaSwgbjtcblxuICAgICAgICBiZWdpbiA9IHRoaXMuY29vcmRpbmF0ZXModGhpcy5jdXJyZW50KCkpO1xuICAgICAgICBpZiAodHlwZW9mIGJlZ2luID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGJlZ2luICs9IHBhZGRpbmc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYmVnaW4gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZW5kID0gYmVnaW4gKyB0aGlzLndpZHRoKCkgKiBydGw7XG5cbiAgICAgICAgaWYgKHJ0bCA9PT0gLTEgJiYgdGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9jb29yZGluYXRlcy5maWx0ZXIoZWxlbWVudCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5pdGVtcyAlIDIgPT09IDEgPyBlbGVtZW50ID49IGJlZ2luIDogZWxlbWVudCA+IGJlZ2luO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJlZ2luID0gcmVzdWx0Lmxlbmd0aCA/IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0gOiBiZWdpbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDAsIG4gPSB0aGlzLl9jb29yZGluYXRlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBpbm5lciA9IE1hdGguY2VpbCh0aGlzLl9jb29yZGluYXRlc1tpIC0gMV0gfHwgMCk7XG4gICAgICAgICAgb3V0ZXIgPSBNYXRoLmNlaWwoTWF0aC5hYnModGhpcy5fY29vcmRpbmF0ZXNbaV0pICsgcGFkZGluZyAqIHJ0bCk7XG5cbiAgICAgICAgICBpZiAoKHRoaXMuX29wKGlubmVyLCAnPD0nLCBiZWdpbikgJiYgKHRoaXMuX29wKGlubmVyLCAnPicsIGVuZCkpKVxuICAgICAgICAgICAgfHwgKHRoaXMuX29wKG91dGVyLCAnPCcsIGJlZ2luKSAmJiB0aGlzLl9vcChvdXRlciwgJz4nLCBlbmQpKSkge1xuICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKGkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgICBzbGlkZS5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBzbGlkZTtcbiAgICAgICAgfSk7XG4gICAgICAgIG1hdGNoZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICB0aGlzLnNsaWRlc0RhdGFbaXRlbV0uaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jZW50ZXIpIHtcbiAgICAgICAgICB0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgICAgICAgICBzbGlkZS5pc0NlbnRlcmVkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gc2xpZGU7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5zbGlkZXNEYXRhW3RoaXMuY3VycmVudCgpXS5pc0NlbnRlcmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgXTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlcyBfdmlld1NldHRpbmdzU2hpcHBlciQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF92aWV3U2V0dGluZ3NTaGlwcGVyJCBTdWJqZWN0XG4gICAqL1xuICBnZXRWaWV3Q3VyU2V0dGluZ3MoKTogT2JzZXJ2YWJsZTxDYXJvdXNlbEN1cnJlbnREYXRhPiB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdTZXR0aW5nc1NoaXBwZXIkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2VzIF9pbml0aWFsaXplZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX2luaXRpYWxpemVkQ2Fyb3VzZWwkIFN1YmplY3RcbiAgICovXG4gIGdldEluaXRpYWxpemVkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5faW5pdGlhbGl6ZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlcyBfY2hhbmdlU2V0dGluZ3NDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJCBTdWJqZWN0XG4gICAqL1xuICBnZXRDaGFuZ2VTdGF0ZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlcyBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfY2hhbmdlZFNldHRpbmdzQ2Fyb3VzZWwkIFN1YmplY3RcbiAgICovXG4gIGdldENoYW5nZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZXMgX3RyYW5zbGF0ZUNhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3RyYW5zbGF0ZUNhcm91c2VsJCBTdWJqZWN0XG4gICAqL1xuICBnZXRUcmFuc2xhdGVTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2xhdGVDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZXMgX3RyYW5zbGF0ZWRDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF90cmFuc2xhdGVkQ2Fyb3VzZWwkIFN1YmplY3RcbiAgICovXG4gIGdldFRyYW5zbGF0ZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2VzIF9yZXNpemVDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9yZXNpemVDYXJvdXNlbCQgU3ViamVjdFxuICAgKi9cbiAgZ2V0UmVzaXplU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVzaXplQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2VzIF9yZXNpemVkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfcmVzaXplZENhcm91c2VsJCBTdWJqZWN0XG4gICAqL1xuICBnZXRSZXNpemVkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVzaXplZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlcyBfcmVmcmVzaENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3JlZnJlc2hDYXJvdXNlbCQgU3ViamVjdFxuICAgKi9cbiAgZ2V0UmVmcmVzaFN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlZnJlc2hDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZXMgX3JlZnJlc2hlZENhcm91c2VsJCBTdWJqZWN0IGJlY29tZSBPYnNlcnZhYmxlXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgX3JlZnJlc2hlZENhcm91c2VsJCBTdWJqZWN0XG4gICAqL1xuICBnZXRSZWZyZXNoZWRTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9yZWZyZXNoZWRDYXJvdXNlbCQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZXMgX2RyYWdDYXJvdXNlbCQgU3ViamVjdCBiZWNvbWUgT2JzZXJ2YWJsZVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIF9kcmFnQ2Fyb3VzZWwkIFN1YmplY3RcbiAgICovXG4gIGdldERyYWdTdGF0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9kcmFnQ2Fyb3VzZWwkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2VzIF9kcmFnZ2VkQ2Fyb3VzZWwkIFN1YmplY3QgYmVjb21lIE9ic2VydmFibGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBfZHJhZ2dlZENhcm91c2VsJCBTdWJqZWN0XG4gICAqL1xuICBnZXREcmFnZ2VkU3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fZHJhZ2dlZENhcm91c2VsJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXR1cHMgY3VzdG9tIG9wdGlvbnMgZXhwYW5kaW5nIGRlZmF1bHQgb3B0aW9uc1xuICAgKiBAcGFyYW0gb3B0aW9ucyBjdXN0b20gb3B0aW9uc1xuICAgKi9cbiAgc2V0T3B0aW9ucyhvcHRpb25zOiBPd2xPcHRpb25zKSB7XG4gICAgY29uc3QgY29uZmlnT3B0aW9uczogT3dsT3B0aW9ucyA9IG5ldyBPd2xDYXJvdXNlbE9Db25maWcoKTtcbiAgICBjb25zdCBjaGVja2VkT3B0aW9uczogT3dsT3B0aW9ucyA9IHRoaXMuX3ZhbGlkYXRlT3B0aW9ucyhvcHRpb25zLCBjb25maWdPcHRpb25zKTtcbiAgICB0aGlzLl9vcHRpb25zID0gey4uLmNvbmZpZ09wdGlvbnMsIC4uLmNoZWNrZWRPcHRpb25zfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciB1c2VyJ3Mgb3B0aW9uIGFyZSBzZXQgcHJvcGVybHkuIENoZWtpbmcgaXMgYmFzZWQgb24gdHlwaW5ncztcbiAgICogQHBhcmFtIG9wdGlvbnMgb3B0aW9ucyBzZXQgYnkgdXNlclxuICAgKiBAcGFyYW0gY29uZmlnT3B0aW9ucyBkZWZhdWx0IG9wdGlvbnNcbiAgICogQHJldHVybnMgY2hlY2tlZCBhbmQgbW9kaWZpZWQgKGlmIGl0J3MgbmVlZGVkKSB1c2VyJ3Mgb3B0aW9uc1xuICAgKlxuICAgKiBOb3RlczpcbiAgICogIC0gaWYgdXNlciBzZXQgb3B0aW9uIHdpdGggd3JvbmcgdHlwZSwgaXQnbGwgYmUgd3JpdHRlbiBpbiBjb25zb2xlXG4gICAqL1xuICBwcml2YXRlIF92YWxpZGF0ZU9wdGlvbnMob3B0aW9uczogT3dsT3B0aW9ucywgY29uZmlnT3B0aW9uczogT3dsT3B0aW9ucyk6IE93bE9wdGlvbnMge1xuICAgIGNvbnN0IGNoZWNrZWRPcHRpb25zOiBPd2xPcHRpb25zID0gey4uLm9wdGlvbnN9O1xuICAgIGNvbnN0IG1vY2tlZFR5cGVzID0gbmV3IE93bE9wdGlvbnNNb2NrZWRUeXBlcygpO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hlY2tlZE9wdGlvbnMpIHtcbiAgICAgIGlmIChjaGVja2VkT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cbiAgICAgICAgLy8gY29uZGl0aW9uIGNvdWxkIGJlIHNob3J0ZW5lZCBidXQgaXQgZ2V0cyBoYXJkZXIgZm9yIHVuZGVyc3RhbmRpbmdcbiAgICAgICAgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2lzTnVtZXJpYyhjaGVja2VkT3B0aW9uc1trZXldKSkge1xuICAgICAgICAgICAgY2hlY2tlZE9wdGlvbnNba2V5XSA9ICtjaGVja2VkT3B0aW9uc1trZXldO1xuICAgICAgICAgICAgY2hlY2tlZE9wdGlvbnNba2V5XSA9IGtleSA9PT0gJ2l0ZW1zJyA/IHRoaXMuX3ZhbGlkYXRlSXRlbXMoY2hlY2tlZE9wdGlvbnNba2V5XSkgOiBjaGVja2VkT3B0aW9uc1trZXldO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ2Jvb2xlYW4nICYmIHR5cGVvZiBjaGVja2VkT3B0aW9uc1trZXldICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICBjaGVja2VkT3B0aW9uc1trZXldID0gc2V0UmlnaHRPcHRpb24obW9ja2VkVHlwZXNba2V5XSwga2V5KTtcbiAgICAgICAgfSBlbHNlIGlmIChtb2NrZWRUeXBlc1trZXldID09PSAnbnVtYmVyfGJvb2xlYW4nICYmICF0aGlzLl9pc051bWJlck9yQm9vbGVhbihjaGVja2VkT3B0aW9uc1trZXldKSkge1xuICAgICAgICAgIGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xuICAgICAgICB9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdudW1iZXJ8c3RyaW5nJyAmJiAhdGhpcy5faXNOdW1iZXJPclN0cmluZyhjaGVja2VkT3B0aW9uc1trZXldKSkge1xuICAgICAgICAgIGNoZWNrZWRPcHRpb25zW2tleV0gPSBzZXRSaWdodE9wdGlvbihtb2NrZWRUeXBlc1trZXldLCBrZXkpO1xuICAgICAgICB9IGVsc2UgaWYgKG1vY2tlZFR5cGVzW2tleV0gPT09ICdzdHJpbmd8Ym9vbGVhbicgJiYgIXRoaXMuX2lzU3RyaW5nT3JCb29sZWFuKGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XG4gICAgICAgICAgY2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XG4gICAgICAgIH0gZWxzZSBpZiAobW9ja2VkVHlwZXNba2V5XSA9PT0gJ3N0cmluZ1tdJykge1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoZWNrZWRPcHRpb25zW2tleV0pKSB7XG4gICAgICAgICAgICBsZXQgaXNTdHJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGNoZWNrZWRPcHRpb25zW2tleV0uZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgaXNTdHJpbmcgPSB0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghaXNTdHJpbmcpIHtcbiAgICAgICAgICAgICAgY2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hlY2tlZE9wdGlvbnNba2V5XSA9IHNldFJpZ2h0T3B0aW9uKG1vY2tlZFR5cGVzW2tleV0sIGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0UmlnaHRPcHRpb24odHlwZTogc3RyaW5nLCBrZXk6IGFueSk6IGFueSB7XG4gICAgICBjb25zb2xlLmxvZyhgb3B0aW9ucy4ke2tleX0gbXVzdCBiZSB0eXBlIG9mICR7dHlwZX07ICR7a2V5fT0ke29wdGlvbnNba2V5XX0gc2tpcHBlZCB0byBkZWZhdWx0czogJHtrZXl9PSR7Y29uZmlnT3B0aW9uc1trZXldfWApO1xuICAgICAgcmV0dXJuIGNvbmZpZ09wdGlvbnNba2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hlY2tlZE9wdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIG9wdGlvbiBpdGVtcyBzZXQgYnkgdXNlciBhbmQgaWYgaXQgYmlnZ2VyIHRoYW4gbnVtYmVyIG9mIHNsaWRlcyB0aGVuIHJldHVybnMgbnVtYmVyIG9mIHNsaWRlc1xuICAgKiBAcGFyYW0gaXRlbXMgb3B0aW9uIGl0ZW1zIHNldCBieSB1c2VyXG4gICAqIEByZXR1cm5zIHJpZ2h0IG51bWJlciBvZiBpdGVtc1xuICAgKi9cbiAgcHJpdmF0ZSBfdmFsaWRhdGVJdGVtcyhpdGVtczogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBsZXQgcmVzdWx0OiBudW1iZXI7XG4gICAgaWYgKGl0ZW1zID49IHRoaXMuX2l0ZW1zLmxlbmd0aCkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5faXRlbXMubGVuZ3RoO1xuICAgICAgY29uc29sZS5sb2coJ29wdGlvbiBcXCdpdGVtc1xcJyBpbiB5b3VyIG9wdGlvbnMgaXMgYmlnZ2VyIHRoYW4gbnVtYmVyIG9mIHNsaWRlczsgVGhpcyBvcHRpb24gaXMgdXBkYXRlZCB0byBjdXJyZW50IG51bWJlciBvZiBzbGlkZXMgYW5kIG5hdmlnYXRpb24gZ290IGRpc2FibGVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IGl0ZW1zO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBjdXJyZW50IHdpZHRoIG9mIGNhcm91c2VsXG4gICAqIEBwYXJhbSB3aWR0aCB3aWR0aCBvZiBjYXJvdXNlbCBXaW5kb3dcbiAgICovXG4gIHNldENhcm91c2VsV2lkdGgod2lkdGg6IG51bWJlcikge1xuICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogU2V0dXBzIHRoZSBjdXJyZW50IHNldHRpbmdzLlxuICAgKiBAdG9kbyBSZW1vdmUgcmVzcG9uc2l2ZSBjbGFzc2VzLiBXaHkgc2hvdWxkIGFkYXB0aXZlIGRlc2lnbnMgYmUgYnJvdWdodCBpbnRvIElFOD9cbiAgICogQHRvZG8gU3VwcG9ydCBmb3IgbWVkaWEgcXVlcmllcyBieSB1c2luZyBgbWF0Y2hNZWRpYWAgd291bGQgYmUgbmljZS5cbiAgICogQHBhcmFtIGNhcm91c2VsV2lkdGggd2lkdGggb2YgY2Fyb3VzZWxcbiAgICogQHBhcmFtIHNsaWRlcyBhcnJheSBvZiBzbGlkZXNcbiAgICogQHBhcmFtIG9wdGlvbnMgb3B0aW9ucyBzZXQgYnkgdXNlclxuICAgKi9cbiAgc2V0dXAoY2Fyb3VzZWxXaWR0aDogbnVtYmVyLCBzbGlkZXM6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSwgb3B0aW9uczogT3dsT3B0aW9ucykge1xuICAgIHRoaXMuc2V0Q2Fyb3VzZWxXaWR0aChjYXJvdXNlbFdpZHRoKTtcbiAgICB0aGlzLnNldEl0ZW1zKHNsaWRlcyk7XG4gICAgdGhpcy5fZGVmaW5lU2xpZGVzRGF0YSgpO1xuICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcblxuICAgIHRoaXMuc2V0dGluZ3MgPSB7Li4udGhpcy5fb3B0aW9uc307XG5cbiAgICB0aGlzLnNldFZpZXdwb3J0SXRlbXNOKCk7XG5cbiAgICB0aGlzLl90cmlnZ2VyKCdjaGFuZ2UnLCB7cHJvcGVydHk6IHtuYW1lOiAnc2V0dGluZ3MnLCB2YWx1ZTogdGhpcy5zZXR0aW5nc319KTtcbiAgICB0aGlzLmludmFsaWRhdGUoJ3NldHRpbmdzJyk7IC8vIG11c3QgYmUgY2FsbCBvZiB0aGlzIGZ1bmN0aW9uO1xuICAgIHRoaXMuX3RyaWdnZXIoJ2NoYW5nZWQnLCB7cHJvcGVydHk6IHtuYW1lOiAnc2V0dGluZ3MnLCB2YWx1ZTogdGhpcy5zZXR0aW5nc319KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbnVtYmVyIG9mIGl0ZW1zIGZvciBjdXJyZW50IHZpZXdwb3J0XG4gICAqL1xuICBzZXRWaWV3cG9ydEl0ZW1zTigpIHtcbiAgICBjb25zdCB2aWV3cG9ydCA9IHRoaXMuX3dpZHRoLFxuICAgICAgb3ZlcndyaXRlcyA9IHRoaXMuX29wdGlvbnMucmVzcG9uc2l2ZTtcbiAgICBsZXQgbWF0Y2ggPSAtMTtcblxuICAgIGlmICghT2JqZWN0LmtleXMob3ZlcndyaXRlcykubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb3ZlcndyaXRlcykge1xuICAgICAgaWYgKG92ZXJ3cml0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBpZiAoK2tleSA8PSB2aWV3cG9ydCAmJiAra2V5ID4gbWF0Y2gpIHtcbiAgICAgICAgICBtYXRjaCA9IE51bWJlcihrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZXR0aW5ncyA9IHsuLi50aGlzLnNldHRpbmdzLCBpdGVtczogdGhpcy5fdmFsaWRhdGVJdGVtcyhvdmVyd3JpdGVzW21hdGNoXS5pdGVtcyl9O1xuICAgIC8vIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBcdHRoaXMuc2V0dGluZ3Muc3RhZ2VQYWRkaW5nID0gdGhpcy5zZXR0aW5ncy5zdGFnZVBhZGRpbmcoKTtcbiAgICAvLyB9XG4gICAgZGVsZXRlIHRoaXMuc2V0dGluZ3MucmVzcG9uc2l2ZTtcbiAgICB0aGlzLm93bERPTURhdGEuaXNSZXNwb25zaXZlID0gdHJ1ZTtcbiAgICB0aGlzLl9icmVha3BvaW50ID0gbWF0Y2g7XG5cbiAgICB0aGlzLmludmFsaWRhdGUoJ3NldHRpbmdzJyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGNhcm91c2VsLlxuICAgKiBAcGFyYW0gc2xpZGVzIGFycmF5IG9mIENhcm91c2VsU2xpZGVEaXJlY3RpdmVcbiAgICovXG4gIGluaXRpYWxpemUoc2xpZGVzOiBDYXJvdXNlbFNsaWRlRGlyZWN0aXZlW10pIHtcbiAgICB0aGlzLmVudGVyKCdpbml0aWFsaXppbmcnKTtcbiAgICAvLyB0aGlzLnRyaWdnZXIoJ2luaXRpYWxpemUnKTtcblxuICAgIHRoaXMub3dsRE9NRGF0YS5ydGwgPSB0aGlzLnNldHRpbmdzLnJ0bDtcblxuICAgIHNsaWRlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgbWVyZ2VOOiBudW1iZXIgPSB0aGlzLnNldHRpbmdzLm1lcmdlID8gaXRlbS5kYXRhTWVyZ2UgOiAxO1xuICAgICAgdGhpcy5fbWVyZ2Vycy5wdXNoKG1lcmdlTik7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlc2V0KHRoaXMuX2lzTnVtZXJpYyh0aGlzLnNldHRpbmdzLnN0YXJ0UG9zaXRpb24pID8gK3RoaXMuc2V0dGluZ3Muc3RhcnRQb3NpdGlvbiA6IDApO1xuXG4gICAgdGhpcy5pbnZhbGlkYXRlKCdpdGVtcycpO1xuICAgIHRoaXMucmVmcmVzaCgpO1xuXG4gICAgdGhpcy5vd2xET01EYXRhLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICB0aGlzLm93bERPTURhdGEuaXNNb3VzZURyYWdhYmxlID0gdGhpcy5zZXR0aW5ncy5tb3VzZURyYWc7XG4gICAgdGhpcy5vd2xET01EYXRhLmlzVG91Y2hEcmFnYWJsZSA9IHRoaXMuc2V0dGluZ3MudG91Y2hEcmFnO1xuXG4gICAgdGhpcy5zZW5kQ2hhbmdlcygpO1xuXG4gICAgdGhpcy5sZWF2ZSgnaW5pdGlhbGl6aW5nJyk7XG4gICAgdGhpcy5fdHJpZ2dlcignaW5pdGlhbGl6ZWQnKTtcbiAgfTtcblxuICAvKipcbiAgICogU2VuZHMgYWxsIGRhdGEgbmVlZGVkIGZvciBWaWV3XG4gICAqL1xuICBzZW5kQ2hhbmdlcygpIHtcbiAgICB0aGlzLl92aWV3U2V0dGluZ3NTaGlwcGVyJC5uZXh0KHtcbiAgICAgIG93bERPTURhdGE6IHRoaXMub3dsRE9NRGF0YSxcbiAgICAgIHN0YWdlRGF0YTogdGhpcy5zdGFnZURhdGEsXG4gICAgICBzbGlkZXNEYXRhOiB0aGlzLnNsaWRlc0RhdGEsXG4gICAgICBuYXZEYXRhOiB0aGlzLm5hdkRhdGEsXG4gICAgICBkb3RzRGF0YTogdGhpcy5kb3RzRGF0YVxuICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICogVXBkYXRlcyBvcHRpb24gbG9naWMgaWYgbmVjZXNzZXJ5XG4gICAqL1xuICBwcml2YXRlIF9vcHRpb25zTG9naWMoKSB7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuYXV0b1dpZHRoKSB7XG4gICAgICB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyA9IDA7XG4gICAgICB0aGlzLnNldHRpbmdzLm1lcmdlID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHZpZXdcbiAgICovXG4gIHVwZGF0ZSgpIHtcbiAgICBsZXQgaSA9IDA7XG4gICAgY29uc3QgbiA9IHRoaXMuX3BpcGUubGVuZ3RoLFxuICAgICAgZmlsdGVyID0gaXRlbSA9PiB0aGlzLl9pbnZhbGlkYXRlZFtpdGVtXSxcbiAgICAgIGNhY2hlID0ge307XG5cbiAgICB3aGlsZSAoaSA8IG4pIHtcbiAgICAgIGNvbnN0IGZpbHRlcmVkUGlwZSA9IHRoaXMuX3BpcGVbaV0uZmlsdGVyLmZpbHRlcihmaWx0ZXIpO1xuICAgICAgaWYgKHRoaXMuX2ludmFsaWRhdGVkLmFsbCB8fCBmaWx0ZXJlZFBpcGUubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLl9waXBlW2ldLnJ1bihjYWNoZSk7XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuICAgIHRoaXMuc2xpZGVzRGF0YS5mb3JFYWNoKHNsaWRlID0+IHNsaWRlLmNsYXNzZXMgPSB0aGlzLnNldEN1clNsaWRlQ2xhc3NlcyhzbGlkZSkpO1xuICAgIHRoaXMuc2VuZENoYW5nZXMoKTtcblxuICAgIHRoaXMuX2ludmFsaWRhdGVkID0ge307XG5cbiAgICBpZiAoIXRoaXMuaXMoJ3ZhbGlkJykpIHtcbiAgICAgIHRoaXMuZW50ZXIoJ3ZhbGlkJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHdpZHRoIG9mIHRoZSB2aWV3LlxuICAgKiBAcGFyYW0gW2RpbWVuc2lvbj1XaWR0aC5EZWZhdWx0XSBUaGUgZGltZW5zaW9uIHRvIHJldHVyblxuICAgKiBAcmV0dXJucyBUaGUgd2lkdGggb2YgdGhlIHZpZXcgaW4gcGl4ZWwuXG4gICAqL1xuICB3aWR0aChkaW1lbnNpb24/OiBXaWR0aCk6IG51bWJlciB7XG4gICAgZGltZW5zaW9uID0gZGltZW5zaW9uIHx8IFdpZHRoLkRlZmF1bHQ7XG4gICAgc3dpdGNoIChkaW1lbnNpb24pIHtcbiAgICAgIGNhc2UgV2lkdGguSW5uZXI6XG4gICAgICBjYXNlIFdpZHRoLk91dGVyOlxuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGggLSB0aGlzLnNldHRpbmdzLnN0YWdlUGFkZGluZyAqIDIgKyB0aGlzLnNldHRpbmdzLm1hcmdpbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaGVzIHRoZSBjYXJvdXNlbCBwcmltYXJpbHkgZm9yIGFkYXB0aXZlIHB1cnBvc2VzLlxuICAgKi9cbiAgcmVmcmVzaCgpIHtcbiAgICB0aGlzLmVudGVyKCdyZWZyZXNoaW5nJyk7XG4gICAgdGhpcy5fdHJpZ2dlcigncmVmcmVzaCcpO1xuICAgIHRoaXMuX2RlZmluZVNsaWRlc0RhdGEoKTtcbiAgICB0aGlzLnNldFZpZXdwb3J0SXRlbXNOKCk7XG5cbiAgICB0aGlzLl9vcHRpb25zTG9naWMoKTtcblxuICAgIC8vIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3ModGhpcy5vcHRpb25zLnJlZnJlc2hDbGFzcyk7XG5cbiAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgLy8gdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyh0aGlzLm9wdGlvbnMucmVmcmVzaENsYXNzKTtcblxuICAgIHRoaXMubGVhdmUoJ3JlZnJlc2hpbmcnKTtcbiAgICB0aGlzLl90cmlnZ2VyKCdyZWZyZXNoZWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2luZG93IGByZXNpemVgIGV2ZW50LlxuICAgKiBAcGFyYW0gY3VyV2lkdGggd2lkdGggb2YgLm93bC1jYXJvdXNlbFxuICAgKi9cbiAgb25SZXNpemUoY3VyV2lkdGg6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5faXRlbXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRDYXJvdXNlbFdpZHRoKGN1cldpZHRoKTtcblxuICAgIHRoaXMuZW50ZXIoJ3Jlc2l6aW5nJyk7XG5cbiAgICAvLyBpZiAodGhpcy50cmlnZ2VyKCdyZXNpemUnKS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgIC8vIFx0dGhpcy5sZWF2ZSgncmVzaXppbmcnKTtcbiAgICAvLyBcdHJldHVybiBmYWxzZTtcbiAgICAvLyB9XG4gICAgdGhpcy5fdHJpZ2dlcigncmVzaXplJyk7XG4gICAgdGhpcy5pbnZhbGlkYXRlKCd3aWR0aCcpO1xuXG4gICAgdGhpcy5yZWZyZXNoKCk7XG5cbiAgICB0aGlzLmxlYXZlKCdyZXNpemluZycpO1xuICAgIHRoaXMuX3RyaWdnZXIoJ3Jlc2l6ZWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVwYXJlcyBkYXRhIGZvciBkcmFnZ2luZyBjYXJvdXNlbC4gSXQgc3RhcnRzIGFmdGVyIGZpcmluZyBgdG91Y2hzdGFydGAgYW5kIGBtb3VzZWRvd25gIGV2ZW50cy5cbiAgICogQHRvZG8gSG9yaXpvbnRhbCBzd2lwZSB0aHJlc2hvbGQgYXMgb3B0aW9uXG4gICAqIEB0b2RvICMyNjFcbiAgICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cbiAgICogQHJldHVybnMgc3RhZ2UgLSBvYmplY3Qgd2l0aCAneCcgYW5kICd5JyBjb29yZGluYXRlcyBvZiAub3dsLXN0YWdlXG4gICAqL1xuICBwcmVwYXJlRHJhZ2dpbmcoZXZlbnQ6IGFueSk6IENvb3JkcyB7XG4gICAgbGV0IHN0YWdlOiBDb29yZHMgPSBudWxsLFxuICAgICAgdHJhbnNmb3JtQXJyOiBzdHJpbmdbXTtcblxuICAgIC8vIGNvdWxkIGJlIDUgY29tbWVudGVkIGxpbmVzIGJlbG93OyBIb3dldmVyIHRoZXJlJ3Mgc3RhZ2UgdHJhbnNmb3JtIGluIHN0YWdlRGF0YSBhbmQgaW4gdXBkYXRlcyBhZnRlciBlYWNoIG1vdmUgb2Ygc3RhZ2VcbiAgICAvLyBzdGFnZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50KS50cmFuc2Zvcm0ucmVwbGFjZSgvLipcXCh8XFwpfCAvZywgJycpLnNwbGl0KCcsJyk7XG4gICAgLy8gc3RhZ2UgPSB7XG4gICAgLy8gICB4OiBzdGFnZVtzdGFnZS5sZW5ndGggPT09IDE2ID8gMTIgOiA0XSxcbiAgICAvLyAgIHk6IHN0YWdlW3N0YWdlLmxlbmd0aCA9PT0gMTYgPyAxMyA6IDVdXG4gICAgLy8gfTtcblxuICAgIHRyYW5zZm9ybUFyciA9IHRoaXMuc3RhZ2VEYXRhLnRyYW5zZm9ybS5yZXBsYWNlKC8uKlxcKHxcXCl8IHxbXiwtXFxkXVxcd3xcXCkvZywgJycpLnNwbGl0KCcsJyk7XG4gICAgc3RhZ2UgPSB7XG4gICAgICB4OiArdHJhbnNmb3JtQXJyWzBdLFxuICAgICAgeTogK3RyYW5zZm9ybUFyclsxXVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5pcygnYW5pbWF0aW5nJykpIHtcbiAgICAgIHRoaXMuaW52YWxpZGF0ZSgncG9zaXRpb24nKTtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicpIHtcbiAgICAgIHRoaXMub3dsRE9NRGF0YS5pc0dyYWIgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuc3BlZWQoMCk7XG4gICAgcmV0dXJuIHN0YWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIEVudGVycyBpbnRvIGEgJ2RyYWdnaW5nJyBzdGF0ZVxuICAgKi9cbiAgZW50ZXJEcmFnZ2luZygpIHtcbiAgICB0aGlzLmVudGVyKCdkcmFnZ2luZycpO1xuICAgIHRoaXMuX3RyaWdnZXIoJ2RyYWcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIG5ldyBjb29yZHMgZm9yIC5vd2wtc3RhZ2Ugd2hpbGUgZHJhZ2dpbmcgaXRcbiAgICogQHRvZG8gIzI2MVxuICAgKiBAcGFyYW0gZXZlbnQgdGhlIGV2ZW50IGFyZ3VtZW50cy5cbiAgICogQHBhcmFtIGRyYWdEYXRhIGluaXRpYWwgZGF0YSBnb3QgYWZ0ZXIgc3RhcnRpbmcgZHJhZ2dpbmdcbiAgICogQHJldHVybnMgY29vcmRzIG9yIGZhbHNlXG4gICAqL1xuICBkZWZpbmVOZXdDb29yZHNEcmFnKGV2ZW50OiBhbnksIGRyYWdEYXRhOiBhbnkpOiBib29sZWFuIHwgQ29vcmRzIHtcbiAgICBsZXQgbWluaW11bSA9IG51bGwsXG4gICAgICBtYXhpbXVtID0gbnVsbCxcbiAgICAgIHB1bGwgPSBudWxsO1xuICAgIGNvbnN0IGRlbHRhID0gdGhpcy5kaWZmZXJlbmNlKGRyYWdEYXRhLnBvaW50ZXIsIHRoaXMucG9pbnRlcihldmVudCkpLFxuICAgICAgc3RhZ2UgPSB0aGlzLmRpZmZlcmVuY2UoZHJhZ0RhdGEuc3RhZ2Uuc3RhcnQsIGRlbHRhKTtcblxuICAgIGlmICghdGhpcy5pcygnZHJhZ2dpbmcnKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNldHRpbmdzLmxvb3ApIHtcbiAgICAgIG1pbmltdW0gPSB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKTtcbiAgICAgIG1heGltdW0gPSArdGhpcy5jb29yZGluYXRlcyh0aGlzLm1heGltdW0oKSArIDEpIC0gbWluaW11bTtcbiAgICAgIHN0YWdlLnggPSAoKChzdGFnZS54IC0gbWluaW11bSkgJSBtYXhpbXVtICsgbWF4aW11bSkgJSBtYXhpbXVtKSArIG1pbmltdW07XG4gICAgfSBlbHNlIHtcbiAgICAgIG1pbmltdW0gPSB0aGlzLnNldHRpbmdzLnJ0bCA/IHRoaXMuY29vcmRpbmF0ZXModGhpcy5tYXhpbXVtKCkpIDogdGhpcy5jb29yZGluYXRlcyh0aGlzLm1pbmltdW0oKSk7XG4gICAgICBtYXhpbXVtID0gdGhpcy5zZXR0aW5ncy5ydGwgPyB0aGlzLmNvb3JkaW5hdGVzKHRoaXMubWluaW11bSgpKSA6IHRoaXMuY29vcmRpbmF0ZXModGhpcy5tYXhpbXVtKCkpO1xuICAgICAgcHVsbCA9IHRoaXMuc2V0dGluZ3MucHVsbERyYWcgPyAtMSAqIGRlbHRhLnggLyA1IDogMDtcbiAgICAgIHN0YWdlLnggPSBNYXRoLm1heChNYXRoLm1pbihzdGFnZS54LCBtaW5pbXVtICsgcHVsbCksIG1heGltdW0gKyBwdWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhZ2U7XG4gIH1cblxuICAvKipcbiAgICogRmluaXNoZXMgZHJhZ2dpbmcgb2YgY2Fyb3VzZWwgd2hlbiBgdG91Y2hlbmRgIGFuZCBgbW91c2V1cGAgZXZlbnRzIGZpcmUuXG4gICAqIEB0b2RvICMyNjFcbiAgICogQHRvZG8gVGhyZXNob2xkIGZvciBjbGljayBldmVudFxuICAgKiBAcGFyYW0gZXZlbnQgdGhlIGV2ZW50IGFyZ3VtZW50cy5cbiAgICogQHBhcmFtIGRyYWdPYmogdGhlIG9iamVjdCB3aXRoIGRyYWdnaW5nIHNldHRpbmdzIGFuZCBzdGF0ZXNcbiAgICogQHBhcmFtIGNsaWNrQXR0YWNoZXIgZnVuY3Rpb24gd2hpY2ggYXR0YWNoZXMgY2xpY2sgaGFuZGxlciB0byBzbGlkZSBvciBpdHMgY2hpbGRyZW4gZWxlbWVudHMgaW4gb3JkZXIgdG8gcHJldmVudCBldmVudCBidWJsaW5nXG4gICAqL1xuICBmaW5pc2hEcmFnZ2luZyhldmVudDogYW55LCBkcmFnT2JqOiBhbnksIGNsaWNrQXR0YWNoZXI6ICgpID0+IHZvaWQpIHtcbiAgICBjb25zdCBkZWx0YSA9IHRoaXMuZGlmZmVyZW5jZShkcmFnT2JqLnBvaW50ZXIsIHRoaXMucG9pbnRlcihldmVudCkpLFxuICAgICAgc3RhZ2UgPSBkcmFnT2JqLnN0YWdlLmN1cnJlbnQsXG4gICAgICBkaXJlY3Rpb24gPSBkZWx0YS54ID4gK3RoaXMuc2V0dGluZ3MucnRsID8gJ2xlZnQnIDogJ3JpZ2h0JztcbiAgICBsZXQgY3VycmVudFNsaWRlSTogbnVtYmVyLCBjdXJyZW50OiBudW1iZXIsIG5ld0N1cnJlbnQ6IG51bWJlcjtcblxuICAgIGlmIChkZWx0YS54ICE9PSAwICYmIHRoaXMuaXMoJ2RyYWdnaW5nJykgfHwgIXRoaXMuaXMoJ3ZhbGlkJykpIHtcbiAgICAgIHRoaXMuc3BlZWQoK3RoaXMuc2V0dGluZ3MuZHJhZ0VuZFNwZWVkIHx8IHRoaXMuc2V0dGluZ3Muc21hcnRTcGVlZCk7XG4gICAgICBjdXJyZW50U2xpZGVJID0gdGhpcy5jbG9zZXN0KHN0YWdlLngsIGRlbHRhLnggIT09IDAgPyBkaXJlY3Rpb24gOiBkcmFnT2JqLmRpcmVjdGlvbik7XG4gICAgICBjdXJyZW50ID0gdGhpcy5jdXJyZW50KCk7XG4gICAgICBuZXdDdXJyZW50ID0gdGhpcy5jdXJyZW50KGN1cnJlbnRTbGlkZUkgPT09IC0xID8gdW5kZWZpbmVkIDogY3VycmVudFNsaWRlSSk7XG5cbiAgICAgIGlmIChjdXJyZW50ICE9PSBuZXdDdXJyZW50KSB7XG4gICAgICAgIHRoaXMuaW52YWxpZGF0ZSgncG9zaXRpb24nKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIH1cblxuICAgICAgZHJhZ09iai5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG5cbiAgICAgIGlmIChNYXRoLmFicyhkZWx0YS54KSA+IDMgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBkcmFnT2JqLnRpbWUgPiAzMDApIHtcbiAgICAgICAgY2xpY2tBdHRhY2hlcigpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXRoaXMuaXMoJ2RyYWdnaW5nJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5sZWF2ZSgnZHJhZ2dpbmcnKTtcbiAgICB0aGlzLl90cmlnZ2VyKCdkcmFnZ2VkJylcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjbG9zZXN0IGl0ZW0gZm9yIGEgY29vcmRpbmF0ZS5cbiAgICogQHRvZG8gU2V0dGluZyBgZnJlZURyYWdgIG1ha2VzIGBjbG9zZXN0YCBub3QgcmV1c2FibGUuIFNlZSAjMTY1LlxuICAgKiBAcGFyYW0gY29vcmRpbmF0ZSBUaGUgY29vcmRpbmF0ZSBpbiBwaXhlbC5cbiAgICogQHBhcmFtIGRpcmVjdGlvbiBUaGUgZGlyZWN0aW9uIHRvIGNoZWNrIGZvciB0aGUgY2xvc2VzdCBpdGVtLiBFdGhlciBgbGVmdGAgb3IgYHJpZ2h0YC5cbiAgICogQHJldHVybnMgVGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBjbG9zZXN0IGl0ZW0uXG4gICAqL1xuICBjbG9zZXN0KGNvb3JkaW5hdGU6IG51bWJlciwgZGlyZWN0aW9uOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGNvbnN0IHB1bGwgPSAzMCxcbiAgICAgIHdpZHRoID0gdGhpcy53aWR0aCgpO1xuICAgIGxldCBjb29yZGluYXRlczogbnVtYmVyW10gPSB0aGlzLmNvb3JkaW5hdGVzKCkgYXMgbnVtYmVyW10sXG4gICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XG4gICAgICBjb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzLm1hcChpdGVtID0+IHtcbiAgICAgICAgaWYgKGl0ZW0gPT09IDApIHtcbiAgICAgICAgICBpdGVtICs9IDAuMDAwMDAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyBvcHRpb24gJ2ZyZWVEcmFnJyBkb2Vzbid0IGhhdmUgcmVhbGl6YXRpb24gYW5kIHVzaW5nIGl0IGhlcmUgY3JlYXRlcyBwcm9ibGVtOlxuICAgIC8vIHZhcmlhYmxlICdwb3NpdGlvbicgc3RheXMgdW5jaGFuZ2VkIChpdCBlcXVhbHMgLTEgYXQgdGhlIGJlZ2dpbmcpIGFuZCB0aHVzIG1ldGhvZCByZXR1cm5zIC0xXG4gICAgLy8gUmV0dXJuaW5nIHZhbHVlIGlzIGNvbnN1bWVkIGJ5IG1ldGhvZCBjdXJyZW50KCksIHdoaWNoIHRha2luZyAtMSBhcyBhcmd1bWVudCBjYWxjdWxhdGVzIHRoZSBpbmRleCBvZiBuZXcgY3VycmVudCBzbGlkZVxuICAgIC8vIEluIGNhc2Ugb2YgaGF2aW5nIDUgc2xpZGVzIGFucyAnbG9vcD1mYWxzZTsgY2FsbGluZyAnY3VycmVudCgtMSknIHNldHMgcHJvcHMgJ19jdXJyZW50JyBhcyA0LiBKdXN0IGxhc3Qgc2xpZGUgcmVtYWlucyB2aXNpYmxlIGluc3RlYWQgb2YgMyBsYXN0IHNsaWRlcy5cblxuICAgIC8vIGlmICghdGhpcy5zZXR0aW5ncy5mcmVlRHJhZykge1xuICAgIC8vIGNoZWNrIGNsb3Nlc3QgaXRlbVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnICYmIGNvb3JkaW5hdGUgPiBjb29yZGluYXRlc1tpXSAtIHB1bGwgJiYgY29vcmRpbmF0ZSA8IGNvb3JkaW5hdGVzW2ldICsgcHVsbCkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIC8vIG9uIGEgcmlnaHQgcHVsbCwgY2hlY2sgb24gcHJldmlvdXMgaW5kZXhcbiAgICAgICAgLy8gdG8gZG8gc28sIHN1YnRyYWN0IHdpZHRoIGZyb20gdmFsdWUgYW5kIHNldCBwb3NpdGlvbiA9IGluZGV4ICsgMVxuICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcgJiYgY29vcmRpbmF0ZSA+IGNvb3JkaW5hdGVzW2ldIC0gd2lkdGggLSBwdWxsICYmIGNvb3JkaW5hdGUgPCBjb29yZGluYXRlc1tpXSAtIHdpZHRoICsgcHVsbCkge1xuICAgICAgICBwb3NpdGlvbiA9IGkgKyAxO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9vcChjb29yZGluYXRlLCAnPCcsIGNvb3JkaW5hdGVzW2ldKVxuICAgICAgICAmJiB0aGlzLl9vcChjb29yZGluYXRlLCAnPicsIGNvb3JkaW5hdGVzW2kgKyAxXSB8fCBjb29yZGluYXRlc1tpXSAtIHdpZHRoKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGRpcmVjdGlvbiA9PT0gJ2xlZnQnID8gaSArIDEgOiBpO1xuICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IG51bGwgJiYgY29vcmRpbmF0ZSA+IGNvb3JkaW5hdGVzW2ldIC0gcHVsbCAmJiBjb29yZGluYXRlIDwgY29vcmRpbmF0ZXNbaV0gKyBwdWxsKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBvc2l0aW9uICE9PSAtMSkge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgO1xuICAgIH1cbiAgICAvLyB9XG5cbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MubG9vcCkge1xuICAgICAgLy8gbm9uIGxvb3AgYm91bmRyaWVzXG4gICAgICBpZiAodGhpcy5fb3AoY29vcmRpbmF0ZSwgJz4nLCBjb29yZGluYXRlc1t0aGlzLm1pbmltdW0oKV0pKSB7XG4gICAgICAgIHBvc2l0aW9uID0gY29vcmRpbmF0ZSA9IHRoaXMubWluaW11bSgpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9vcChjb29yZGluYXRlLCAnPCcsIGNvb3JkaW5hdGVzW3RoaXMubWF4aW11bSgpXSkpIHtcbiAgICAgICAgcG9zaXRpb24gPSBjb29yZGluYXRlID0gdGhpcy5tYXhpbXVtKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuaW1hdGVzIHRoZSBzdGFnZS5cbiAgICogQHRvZG8gIzI3MFxuICAgKiBAcGFyYW0gY29vcmRpbmF0ZSBUaGUgY29vcmRpbmF0ZSBpbiBwaXhlbHMuXG4gICAqL1xuICBhbmltYXRlKGNvb3JkaW5hdGU6IG51bWJlciB8IG51bWJlcltdKSB7XG4gICAgY29uc3QgYW5pbWF0ZSA9IHRoaXMuc3BlZWQoKSA+IDA7XG5cbiAgICBpZiAodGhpcy5pcygnYW5pbWF0aW5nJykpIHtcbiAgICAgIHRoaXMub25UcmFuc2l0aW9uRW5kKCk7XG4gICAgfVxuXG4gICAgaWYgKGFuaW1hdGUpIHtcbiAgICAgIHRoaXMuZW50ZXIoJ2FuaW1hdGluZycpO1xuICAgICAgdGhpcy5fdHJpZ2dlcigndHJhbnNsYXRlJyk7XG4gICAgfVxuXG4gICAgdGhpcy5zdGFnZURhdGEudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyBjb29yZGluYXRlICsgJ3B4LDBweCwwcHgpJztcbiAgICB0aGlzLnN0YWdlRGF0YS50cmFuc2l0aW9uID0gKHRoaXMuc3BlZWQoKSAvIDEwMDApICsgJ3MnO1xuXG4gICAgLy8gYWxzbyB0aGVyZSB3YXMgdHJhbnNpdGlvbiBieSBtZWFucyBvZiBKUXVlcnkuYW5pbWF0ZSBvciBjc3MtY2hhbmdpbmcgcHJvcGVydHkgbGVmdFxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIHRoZSBjYXJvdXNlbCBpcyBpbiBhIHNwZWNpZmljIHN0YXRlIG9yIG5vdC5cbiAgICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMgVGhlIGZsYWcgd2hpY2ggaW5kaWNhdGVzIGlmIHRoZSBjYXJvdXNlbCBpcyBidXN5LlxuICAgKi9cbiAgaXMoc3RhdGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZV0gJiYgdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVdID4gMDtcbiAgfTtcblxuICAvKipcbiAgICogU2V0cyB0aGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgaXRlbS5cbiAgICogQHBhcmFtIHBvc2l0aW9uIFRoZSBuZXcgYWJzb2x1dGUgcG9zaXRpb24gb3Igbm90aGluZyB0byBsZWF2ZSBpdCB1bmNoYW5nZWQuXG4gICAqIEByZXR1cm5zIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBpdGVtLlxuICAgKi9cbiAgY3VycmVudChwb3NpdGlvbj86IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9pdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbik7XG5cbiAgICBpZiAodGhpcy5fY3VycmVudCAhPT0gcG9zaXRpb24pIHtcbiAgICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5fdHJpZ2dlcignY2hhbmdlJywge3Byb3BlcnR5OiB7bmFtZTogJ3Bvc2l0aW9uJywgdmFsdWU6IHBvc2l0aW9ufX0pO1xuXG4gICAgICAvLyBpZiAoZXZlbnQuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBcdHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUoZXZlbnQuZGF0YSk7XG4gICAgICAvLyB9XG5cbiAgICAgIHRoaXMuX2N1cnJlbnQgPSBwb3NpdGlvbjtcblxuICAgICAgdGhpcy5pbnZhbGlkYXRlKCdwb3NpdGlvbicpO1xuICAgICAgdGhpcy5fdHJpZ2dlcignY2hhbmdlZCcsIHtwcm9wZXJ0eToge25hbWU6ICdwb3NpdGlvbicsIHZhbHVlOiB0aGlzLl9jdXJyZW50fX0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEludmFsaWRhdGVzIHRoZSBnaXZlbiBwYXJ0IG9mIHRoZSB1cGRhdGUgcm91dGluZS5cbiAgICogQHBhcmFtIHBhcnQgVGhlIHBhcnQgdG8gaW52YWxpZGF0ZS5cbiAgICogQHJldHVybnMgVGhlIGludmFsaWRhdGVkIHBhcnRzLlxuICAgKi9cbiAgaW52YWxpZGF0ZShwYXJ0OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgaWYgKHR5cGVvZiBwYXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5faW52YWxpZGF0ZWRbcGFydF0gPSB0cnVlO1xuICAgICAgaWYgKHRoaXMuaXMoJ3ZhbGlkJykpIHtcbiAgICAgICAgdGhpcy5sZWF2ZSgndmFsaWQnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2ludmFsaWRhdGVkKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBpdGVtLlxuICAgKiBAcGFyYW0gcG9zaXRpb24gdGhlIGFic29sdXRlIHBvc2l0aW9uIG9mIHRoZSBuZXcgaXRlbS5cbiAgICovXG4gIHJlc2V0KHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICBwb3NpdGlvbiA9IHRoaXMubm9ybWFsaXplKHBvc2l0aW9uKTtcblxuICAgIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fc3BlZWQgPSAwO1xuICAgIHRoaXMuX2N1cnJlbnQgPSBwb3NpdGlvbjtcblxuICAgIHRoaXMuX3N1cHByZXNzKFsndHJhbnNsYXRlJywgJ3RyYW5zbGF0ZWQnXSk7XG5cbiAgICB0aGlzLmFuaW1hdGUodGhpcy5jb29yZGluYXRlcyhwb3NpdGlvbikpO1xuXG4gICAgdGhpcy5fcmVsZWFzZShbJ3RyYW5zbGF0ZScsICd0cmFuc2xhdGVkJ10pO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZXMgYW4gYWJzb2x1dGUgb3IgYSByZWxhdGl2ZSBwb3NpdGlvbiBvZiBhbiBpdGVtLlxuICAgKiBAcGFyYW0gcG9zaXRpb24gVGhlIGFic29sdXRlIG9yIHJlbGF0aXZlIHBvc2l0aW9uIHRvIG5vcm1hbGl6ZS5cbiAgICogQHBhcmFtIHJlbGF0aXZlIFdoZXRoZXIgdGhlIGdpdmVuIHBvc2l0aW9uIGlzIHJlbGF0aXZlIG9yIG5vdC5cbiAgICogQHJldHVybnMgVGhlIG5vcm1hbGl6ZWQgcG9zaXRpb24uXG4gICAqL1xuICBub3JtYWxpemUocG9zaXRpb246IG51bWJlciwgcmVsYXRpdmU/OiBib29sZWFuKTogbnVtYmVyIHtcbiAgICBjb25zdCBuID0gdGhpcy5faXRlbXMubGVuZ3RoLFxuICAgICAgbSA9IHJlbGF0aXZlID8gMCA6IHRoaXMuX2Nsb25lcy5sZW5ndGg7XG5cbiAgICBpZiAoIXRoaXMuX2lzTnVtZXJpYyhwb3NpdGlvbikgfHwgbiA8IDEpIHtcbiAgICAgIHBvc2l0aW9uID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IG4gKyBtKSB7XG4gICAgICBwb3NpdGlvbiA9ICgocG9zaXRpb24gLSBtIC8gMikgJSBuICsgbikgJSBuICsgbSAvIDI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGFuIGFic29sdXRlIHBvc2l0aW9uIG9mIGFuIGl0ZW0gaW50byBhIHJlbGF0aXZlIG9uZS5cbiAgICogQHBhcmFtIHBvc2l0aW9uIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiB0byBjb252ZXJ0LlxuICAgKiBAcmV0dXJucyBUaGUgY29udmVydGVkIHBvc2l0aW9uLlxuICAgKi9cbiAgcmVsYXRpdmUocG9zaXRpb246IG51bWJlcik6IG51bWJlciB7XG4gICAgcG9zaXRpb24gLT0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDI7XG4gICAgcmV0dXJuIHRoaXMubm9ybWFsaXplKHBvc2l0aW9uLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBtYXhpbXVtIHBvc2l0aW9uIGZvciB0aGUgY3VycmVudCBpdGVtLlxuICAgKiBAcGFyYW0gcmVsYXRpdmUgV2hldGhlciB0byByZXR1cm4gYW4gYWJzb2x1dGUgcG9zaXRpb24gb3IgYSByZWxhdGl2ZSBwb3NpdGlvbi5cbiAgICogQHJldHVybnMgbnVtYmVyIG9mIG1heGltdW0gcG9zaXRpb25cbiAgICovXG4gIG1heGltdW0ocmVsYXRpdmU6IGJvb2xlYW4gPSBmYWxzZSk6IG51bWJlciB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzO1xuICAgIGxldCBtYXhpbXVtID0gdGhpcy5fY29vcmRpbmF0ZXMubGVuZ3RoLFxuICAgICAgaXRlcmF0b3IsXG4gICAgICByZWNpcHJvY2FsSXRlbXNXaWR0aCxcbiAgICAgIGVsZW1lbnRXaWR0aDtcblxuICAgIGlmIChzZXR0aW5ncy5sb29wKSB7XG4gICAgICBtYXhpbXVtID0gdGhpcy5fY2xvbmVzLmxlbmd0aCAvIDIgKyB0aGlzLl9pdGVtcy5sZW5ndGggLSAxO1xuICAgIH0gZWxzZSBpZiAoc2V0dGluZ3MuYXV0b1dpZHRoIHx8IHNldHRpbmdzLm1lcmdlKSB7XG4gICAgICBpdGVyYXRvciA9IHRoaXMuX2l0ZW1zLmxlbmd0aDtcbiAgICAgIHJlY2lwcm9jYWxJdGVtc1dpZHRoID0gdGhpcy5zbGlkZXNEYXRhWy0taXRlcmF0b3JdLndpZHRoO1xuICAgICAgZWxlbWVudFdpZHRoID0gdGhpcy5fd2lkdGg7XG4gICAgICB3aGlsZSAoaXRlcmF0b3ItLSkge1xuICAgICAgICAvLyBpdCBjb3VsZCBiZSB1c2UgdGhpcy5faXRlbXMgaW5zdGVhZCBvZiB0aGlzLnNsaWRlc0RhdGE7XG4gICAgICAgIHJlY2lwcm9jYWxJdGVtc1dpZHRoICs9ICt0aGlzLnNsaWRlc0RhdGFbaXRlcmF0b3JdLndpZHRoICsgdGhpcy5zZXR0aW5ncy5tYXJnaW47XG4gICAgICAgIGlmIChyZWNpcHJvY2FsSXRlbXNXaWR0aCA+IGVsZW1lbnRXaWR0aCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBtYXhpbXVtID0gaXRlcmF0b3IgKyAxO1xuICAgIH0gZWxzZSBpZiAoc2V0dGluZ3MuY2VudGVyKSB7XG4gICAgICBtYXhpbXVtID0gdGhpcy5faXRlbXMubGVuZ3RoIC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWF4aW11bSA9IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIHNldHRpbmdzLml0ZW1zO1xuICAgIH1cblxuICAgIGlmIChyZWxhdGl2ZSkge1xuICAgICAgbWF4aW11bSAtPSB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMjtcbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5tYXgobWF4aW11bSwgMCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbWluaW11bSBwb3NpdGlvbiBmb3IgdGhlIGN1cnJlbnQgaXRlbS5cbiAgICogQHBhcmFtIHJlbGF0aXZlIFdoZXRoZXIgdG8gcmV0dXJuIGFuIGFic29sdXRlIHBvc2l0aW9uIG9yIGEgcmVsYXRpdmUgcG9zaXRpb24uXG4gICAqIEByZXR1cm5zIG51bWJlciBvZiBtaW5pbXVtIHBvc2l0aW9uXG4gICAqL1xuICBtaW5pbXVtKHJlbGF0aXZlOiBib29sZWFuID0gZmFsc2UpOiBudW1iZXIge1xuICAgIHJldHVybiByZWxhdGl2ZSA/IDAgOiB0aGlzLl9jbG9uZXMubGVuZ3RoIC8gMjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFuIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCByZWxhdGl2ZSBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHBvc2l0aW9uIFRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cbiAgICogQHJldHVybnMgVGhlIGl0ZW0gYXQgdGhlIGdpdmVuIHBvc2l0aW9uIG9yIGFsbCBpdGVtcyBpZiBubyBwb3NpdGlvbiB3YXMgZ2l2ZW4uXG4gICAqL1xuICBpdGVtcyhwb3NpdGlvbj86IG51bWJlcik6IENhcm91c2VsU2xpZGVEaXJlY3RpdmVbXSB7XG4gICAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5zbGljZSgpO1xuICAgIH1cblxuICAgIHBvc2l0aW9uID0gdGhpcy5ub3JtYWxpemUocG9zaXRpb24sIHRydWUpO1xuICAgIHJldHVybiBbdGhpcy5faXRlbXNbcG9zaXRpb25dXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFuIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCByZWxhdGl2ZSBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHBvc2l0aW9uIFRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cbiAgICogQHJldHVybnMgVGhlIGl0ZW0gYXQgdGhlIGdpdmVuIHBvc2l0aW9uIG9yIGFsbCBpdGVtcyBpZiBubyBwb3NpdGlvbiB3YXMgZ2l2ZW4uXG4gICAqL1xuICBtZXJnZXJzKHBvc2l0aW9uOiBudW1iZXIpOiBudW1iZXIgfCBudW1iZXJbXSB7XG4gICAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9tZXJnZXJzLnNsaWNlKCk7XG4gICAgfVxuXG4gICAgcG9zaXRpb24gPSB0aGlzLm5vcm1hbGl6ZShwb3NpdGlvbiwgdHJ1ZSk7XG4gICAgcmV0dXJuIHRoaXMuX21lcmdlcnNbcG9zaXRpb25dO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGFic29sdXRlIHBvc2l0aW9ucyBvZiBjbG9uZXMgZm9yIGFuIGl0ZW0uXG4gICAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgdGhlIGl0ZW0uXG4gICAqIEByZXR1cm5zIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbnMgb2YgY2xvbmVzIGZvciB0aGUgaXRlbSBvciBhbGwgaWYgbm8gcG9zaXRpb24gd2FzIGdpdmVuLlxuICAgKi9cbiAgY2xvbmVzKHBvc2l0aW9uPzogbnVtYmVyKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IG9kZCA9IHRoaXMuX2Nsb25lcy5sZW5ndGggLyAyLFxuICAgICAgZXZlbiA9IG9kZCArIHRoaXMuX2l0ZW1zLmxlbmd0aCxcbiAgICAgIG1hcCA9IGluZGV4ID0+IGluZGV4ICUgMiA9PT0gMCA/IGV2ZW4gKyBpbmRleCAvIDIgOiBvZGQgLSAoaW5kZXggKyAxKSAvIDI7XG5cbiAgICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2Nsb25lcy5tYXAoKHYsIGkpID0+IG1hcChpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2Nsb25lcy5tYXAoKHYsIGkpID0+IHYgPT09IHBvc2l0aW9uID8gbWFwKGkpIDogbnVsbCkuZmlsdGVyKGl0ZW0gPT4gaXRlbSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgY3VycmVudCBhbmltYXRpb24gc3BlZWQuXG4gICAqIEBwYXJhbSBzcGVlZCBUaGUgYW5pbWF0aW9uIHNwZWVkIGluIG1pbGxpc2Vjb25kcyBvciBub3RoaW5nIHRvIGxlYXZlIGl0IHVuY2hhbmdlZC5cbiAgICogQHJldHVybnMgVGhlIGN1cnJlbnQgYW5pbWF0aW9uIHNwZWVkIGluIG1pbGxpc2Vjb25kcy5cbiAgICovXG4gIHNwZWVkKHNwZWVkPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoc3BlZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fc3BlZWQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgY29vcmRpbmF0ZSBvZiBhbiBpdGVtLlxuICAgKiBAdG9kbyBUaGUgbmFtZSBvZiB0aGlzIG1ldGhvZCBpcyBtaXNzbGVhbmRpbmcuXG4gICAqIEBwYXJhbSBwb3NpdGlvbiBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0gd2l0aGluIGBtaW5pbXVtKClgIGFuZCBgbWF4aW11bSgpYC5cbiAgICogQHJldHVybnMgVGhlIGNvb3JkaW5hdGUgb2YgdGhlIGl0ZW0gaW4gcGl4ZWwgb3IgYWxsIGNvb3JkaW5hdGVzLlxuICAgKi9cbiAgY29vcmRpbmF0ZXMocG9zaXRpb24/OiBudW1iZXIpOiBudW1iZXIgfCBudW1iZXJbXSB7XG4gICAgbGV0IG11bHRpcGxpZXIgPSAxLFxuICAgICAgbmV3UG9zaXRpb24gPSBwb3NpdGlvbiAtIDEsXG4gICAgICBjb29yZGluYXRlLFxuICAgICAgcmVzdWx0OiBudW1iZXJbXTtcblxuICAgIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXN1bHQgPSB0aGlzLl9jb29yZGluYXRlcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvb3JkaW5hdGVzKGluZGV4KSBhcyBudW1iZXI7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuY2VudGVyKSB7XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5ydGwpIHtcbiAgICAgICAgbXVsdGlwbGllciA9IC0xO1xuICAgICAgICBuZXdQb3NpdGlvbiA9IHBvc2l0aW9uICsgMTtcbiAgICAgIH1cblxuICAgICAgY29vcmRpbmF0ZSA9IHRoaXMuX2Nvb3JkaW5hdGVzW3Bvc2l0aW9uXTtcbiAgICAgIGNvb3JkaW5hdGUgKz0gKHRoaXMud2lkdGgoKSAtIGNvb3JkaW5hdGUgKyAodGhpcy5fY29vcmRpbmF0ZXNbbmV3UG9zaXRpb25dIHx8IDApKSAvIDIgKiBtdWx0aXBsaWVyO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb29yZGluYXRlID0gdGhpcy5fY29vcmRpbmF0ZXNbbmV3UG9zaXRpb25dIHx8IDA7XG4gICAgfVxuXG4gICAgY29vcmRpbmF0ZSA9IE1hdGguY2VpbChjb29yZGluYXRlKTtcblxuICAgIHJldHVybiBjb29yZGluYXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHNwZWVkIGZvciBhIHRyYW5zbGF0aW9uLlxuICAgKiBAcGFyYW0gZnJvbSBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIHN0YXJ0IGl0ZW0uXG4gICAqIEBwYXJhbSB0byBUaGUgYWJzb2x1dGUgcG9zaXRpb24gb2YgdGhlIHRhcmdldCBpdGVtLlxuICAgKiBAcGFyYW0gZmFjdG9yIFtmYWN0b3I9dW5kZWZpbmVkXSAtIFRoZSB0aW1lIGZhY3RvciBpbiBtaWxsaXNlY29uZHMuXG4gICAqIEByZXR1cm5zIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zbGF0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBfZHVyYXRpb24oZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBmYWN0b3I/OiBudW1iZXIgfCBib29sZWFuKTogbnVtYmVyIHtcbiAgICBpZiAoZmFjdG9yID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgoTWF0aC5hYnModG8gLSBmcm9tKSwgMSksIDYpICogTWF0aC5hYnMoKCtmYWN0b3IgfHwgdGhpcy5zZXR0aW5ncy5zbWFydFNwZWVkKSk7XG4gIH1cblxuICAvKipcbiAgICogU2xpZGVzIHRvIHRoZSBzcGVjaWZpZWQgaXRlbS5cbiAgICogQHBhcmFtIHBvc2l0aW9uIFRoZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cbiAgICogQHBhcmFtIHNwZWVkIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHRyYW5zaXRpb24uXG4gICAqL1xuICB0byhwb3NpdGlvbjogbnVtYmVyLCBzcGVlZDogbnVtYmVyIHwgYm9vbGVhbikge1xuICAgIGxldCBjdXJyZW50ID0gdGhpcy5jdXJyZW50KCksXG4gICAgICByZXZlcnQgPSBudWxsLFxuICAgICAgZGlzdGFuY2UgPSBwb3NpdGlvbiAtIHRoaXMucmVsYXRpdmUoY3VycmVudCksXG4gICAgICBtYXhpbXVtID0gdGhpcy5tYXhpbXVtKCk7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gKyhkaXN0YW5jZSA+IDApIC0gKyhkaXN0YW5jZSA8IDApLFxuICAgICAgaXRlbXMgPSB0aGlzLl9pdGVtcy5sZW5ndGgsXG4gICAgICBtaW5pbXVtID0gdGhpcy5taW5pbXVtKCk7XG5cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5sb29wKSB7XG4gICAgICBpZiAoIXRoaXMuc2V0dGluZ3MucmV3aW5kICYmIE1hdGguYWJzKGRpc3RhbmNlKSA+IGl0ZW1zIC8gMikge1xuICAgICAgICBkaXN0YW5jZSArPSBkaXJlY3Rpb24gKiAtMSAqIGl0ZW1zO1xuICAgICAgfVxuXG4gICAgICBwb3NpdGlvbiA9IGN1cnJlbnQgKyBkaXN0YW5jZTtcbiAgICAgIHJldmVydCA9ICgocG9zaXRpb24gLSBtaW5pbXVtKSAlIGl0ZW1zICsgaXRlbXMpICUgaXRlbXMgKyBtaW5pbXVtO1xuXG4gICAgICBpZiAocmV2ZXJ0ICE9PSBwb3NpdGlvbiAmJiByZXZlcnQgLSBkaXN0YW5jZSA8PSBtYXhpbXVtICYmIHJldmVydCAtIGRpc3RhbmNlID4gMCkge1xuICAgICAgICBjdXJyZW50ID0gcmV2ZXJ0IC0gZGlzdGFuY2U7XG4gICAgICAgIHBvc2l0aW9uID0gcmV2ZXJ0O1xuICAgICAgICB0aGlzLnJlc2V0KGN1cnJlbnQpO1xuICAgICAgICB0aGlzLnNlbmRDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnNldHRpbmdzLnJld2luZCkge1xuICAgICAgbWF4aW11bSArPSAxO1xuICAgICAgcG9zaXRpb24gPSAocG9zaXRpb24gJSBtYXhpbXVtICsgbWF4aW11bSkgJSBtYXhpbXVtO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3NpdGlvbiA9IE1hdGgubWF4KG1pbmltdW0sIE1hdGgubWluKG1heGltdW0sIHBvc2l0aW9uKSk7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNwZWVkKHRoaXMuX2R1cmF0aW9uKGN1cnJlbnQsIHBvc2l0aW9uLCBzcGVlZCkpO1xuICAgICAgdGhpcy5jdXJyZW50KHBvc2l0aW9uKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9LCAwKTtcblxuICB9XG5cbiAgLyoqXG4gICAqIFNsaWRlcyB0byB0aGUgbmV4dCBpdGVtLlxuICAgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cbiAgICovXG4gIG5leHQoc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcbiAgICBzcGVlZCA9IHNwZWVkIHx8IGZhbHNlO1xuICAgIHRoaXMudG8odGhpcy5yZWxhdGl2ZSh0aGlzLmN1cnJlbnQoKSkgKyAxLCBzcGVlZCk7XG4gIH1cblxuICAvKipcbiAgICogU2xpZGVzIHRvIHRoZSBwcmV2aW91cyBpdGVtLlxuICAgKiBAcGFyYW0gc3BlZWQgVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHJhbnNpdGlvbi5cbiAgICovXG4gIHByZXYoc3BlZWQ6IG51bWJlciB8IGJvb2xlYW4pIHtcbiAgICBzcGVlZCA9IHNwZWVkIHx8IGZhbHNlO1xuICAgIHRoaXMudG8odGhpcy5yZWxhdGl2ZSh0aGlzLmN1cnJlbnQoKSkgLSAxLCBzcGVlZCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgZW5kIG9mIGFuIGFuaW1hdGlvbi5cbiAgICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cbiAgICovXG4gIG9uVHJhbnNpdGlvbkVuZChldmVudD86IGFueSkge1xuICAgIC8vIGlmIGNzczIgYW5pbWF0aW9uIHRoZW4gZXZlbnQgb2JqZWN0IGlzIHVuZGVmaW5lZFxuICAgIGlmIChldmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgLy8gLy8gQ2F0Y2ggb25seSBvd2wtc3RhZ2UgdHJhbnNpdGlvbkVuZCBldmVudFxuICAgICAgLy8gaWYgKChldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudCB8fCBldmVudC5vcmlnaW5hbFRhcmdldCkgIT09IHRoaXMuJHN0YWdlLmdldCgwKVx0KSB7XG4gICAgICAvLyBcdHJldHVybiBmYWxzZTtcbiAgICAgIC8vIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5sZWF2ZSgnYW5pbWF0aW5nJyk7XG4gICAgdGhpcy5fdHJpZ2dlcigndHJhbnNsYXRlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdmlld3BvcnQgd2lkdGguXG4gICAqIEByZXR1cm5zIC0gVGhlIHdpZHRoIGluIHBpeGVsLlxuICAgKi9cbiAgcHJpdmF0ZSBfdmlld3BvcnQoKTogbnVtYmVyIHtcbiAgICBsZXQgd2lkdGg7XG4gICAgaWYgKHRoaXMuX3dpZHRoKSB7XG4gICAgICB3aWR0aCA9IHRoaXMuX3dpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0NhbiBub3QgZGV0ZWN0IHZpZXdwb3J0IHdpZHRoLicpO1xuICAgIH1cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBfaXRlbXNcbiAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGxpc3Qgb2Ygc2xpZGVzIHB1dCBpbnRvIENhcm91c2VsU2xpZGVEaXJlY3RpdmVzLlxuICAgKi9cbiAgc2V0SXRlbXMoY29udGVudDogQ2Fyb3VzZWxTbGlkZURpcmVjdGl2ZVtdKSB7XG4gICAgdGhpcy5faXRlbXMgPSBjb250ZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgc2xpZGVzRGF0YSB1c2luZyB0aGlzLl9pdGVtc1xuICAgKi9cbiAgcHJpdmF0ZSBfZGVmaW5lU2xpZGVzRGF0YSgpIHtcbiAgICAvLyBNYXliZSBjcmVhdGluZyBhbmQgdXNpbmcgbG9hZE1hcCB3b3VsZCBiZSBiZXR0ZXIgaW4gTGF6eUxvYWRTZXJ2aWNlLlxuICAgIC8vIEhvdmV3ZXIgaW4gdGhhdCBjYXNlIHdoZW4gJ3Jlc2l6ZScgZXZlbnQgZmlyZXMsIHByb3AgJ2xvYWQnIG9mIGFsbCBzbGlkZXMgd2lsbCBnZXQgJ2ZhbHNlJyBhbmQgc3VjaCBzdGF0ZSBvZiBwcm9wIHdpbGwgYmUgc2VlbiBieSBWaWV3IGR1cmluZyBpdHMgdXBkYXRpbmcuIEFjY29yZGluZ2x5IHRoZSBjb2RlIHdpbGwgcmVtb3ZlIHNsaWRlcydzIGNvbnRlbnQgZnJvbSBET00gZXZlbiBpZiBpdCB3YXMgbG9hZGVkIGJlZm9yZS5cbiAgICAvLyBUaHVzIGl0IHdvdWxkIGJlIG5lZWRlZCB0byBhZGQgdGhhdCBjb250ZW50IGludG8gRE9NIGFnYWluLlxuICAgIC8vIEluIG9yZGVyIHRvIGF2b2lkIGFkZGl0aW9uYWwgcmVtb3ZpbmcvYWRkaW5nIGxvYWRlZCBzbGlkZXMncyBjb250ZW50IHdlIHVzZSBsb2FkTWFwIGhlcmUgYW5kIHNldCByZXN0b3JlIHN0YXRlIG9mIHByb3AgJ2xvYWQnIGJlZm9yZSB0aGUgVmlldyB3aWxsIGdldCBpdC5cbiAgICBsZXQgbG9hZE1hcDogTWFwPHN0cmluZywgYm9vbGVhbj47XG5cbiAgICBpZiAodGhpcy5zbGlkZXNEYXRhICYmIHRoaXMuc2xpZGVzRGF0YS5sZW5ndGgpIHtcbiAgICAgIGxvYWRNYXAgPSBuZXcgTWFwKCk7XG4gICAgICB0aGlzLnNsaWRlc0RhdGEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaWYgKGl0ZW0ubG9hZCkge1xuICAgICAgICAgIGxvYWRNYXAuc2V0KGl0ZW0uaWQsIGl0ZW0ubG9hZCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5zbGlkZXNEYXRhID0gdGhpcy5faXRlbXMubWFwKHNsaWRlID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBgJHtzbGlkZS5pZH1gLFxuICAgICAgICBpc0FjdGl2ZTogZmFsc2UsXG4gICAgICAgIHRwbFJlZjogc2xpZGUudHBsUmVmLFxuICAgICAgICBkYXRhTWVyZ2U6IHNsaWRlLmRhdGFNZXJnZSxcbiAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgIGlzQ2xvbmVkOiBmYWxzZSxcbiAgICAgICAgbG9hZDogbG9hZE1hcCA/IGxvYWRNYXAuZ2V0KHNsaWRlLmlkKSA6IGZhbHNlLFxuICAgICAgICBoYXNoRnJhZ21lbnQ6IHNsaWRlLmRhdGFIYXNoXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgY3VycmVudCBjbGFzc2VzIGZvciBzbGlkZVxuICAgKiBAcGFyYW0gc2xpZGUgU2xpZGUgb2YgY2Fyb3VzZWxcbiAgICogQHJldHVybnMgb2JqZWN0IHdpdGggbmFtZXMgb2YgY3NzLWNsYXNzZXMgd2hpY2ggYXJlIGtleXMgYW5kIHRydWUvZmFsc2UgdmFsdWVzXG4gICAqL1xuICBzZXRDdXJTbGlkZUNsYXNzZXMoc2xpZGU6IFNsaWRlTW9kZWwpOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0ge1xuICAgIC8vIENTUyBjbGFzc2VzOiBhZGRlZC9yZW1vdmVkIHBlciBjdXJyZW50IHN0YXRlIG9mIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAgY29uc3QgY3VycmVudENsYXNzZXM6IHtba2V5OiBzdHJpbmddOiBib29sZWFufSA9IHtcbiAgICAgICdhY3RpdmUnOiBzbGlkZS5pc0FjdGl2ZSxcbiAgICAgICdjZW50ZXInOiBzbGlkZS5pc0NlbnRlcmVkLFxuICAgICAgJ2Nsb25lZCc6IHNsaWRlLmlzQ2xvbmVkLFxuICAgICAgJ2FuaW1hdGVkJzogc2xpZGUuaXNBbmltYXRlZCxcbiAgICAgICdvd2wtYW5pbWF0ZWQtaW4nOiBzbGlkZS5pc0RlZkFuaW1hdGVkSW4sXG4gICAgICAnb3dsLWFuaW1hdGVkLW91dCc6IHNsaWRlLmlzRGVmQW5pbWF0ZWRPdXRcbiAgICB9O1xuICAgIGlmICh0aGlzLnNldHRpbmdzLmFuaW1hdGVJbikge1xuICAgICAgY3VycmVudENsYXNzZXNbdGhpcy5zZXR0aW5ncy5hbmltYXRlSW4gYXMgc3RyaW5nXSA9IHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRJbjtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZU91dCkge1xuICAgICAgY3VycmVudENsYXNzZXNbdGhpcy5zZXR0aW5ncy5hbmltYXRlT3V0IGFzIHN0cmluZ10gPSBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkT3V0O1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudENsYXNzZXM7XG4gIH1cblxuICAvKipcbiAgICogT3BlcmF0b3JzIHRvIGNhbGN1bGF0ZSByaWdodC10by1sZWZ0IGFuZCBsZWZ0LXRvLXJpZ2h0LlxuICAgKiBAcGFyYW0gYSAtIFRoZSBsZWZ0IHNpZGUgb3BlcmFuZC5cbiAgICogQHBhcmFtIG8gLSBUaGUgb3BlcmF0b3IuXG4gICAqIEBwYXJhbSBiIC0gVGhlIHJpZ2h0IHNpZGUgb3BlcmFuZC5cbiAgICogQHJldHVybnMgdHJ1ZS9mYWxzZSBtZWFuaW5nIHJpZ2h0LXRvLWxlZnQgb3IgbGVmdC10by1yaWdodFxuICAgKi9cbiAgcHJpdmF0ZSBfb3AoYTogbnVtYmVyLCBvOiBzdHJpbmcsIGI6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHJ0bCA9IHRoaXMuc2V0dGluZ3MucnRsO1xuICAgIHN3aXRjaCAobykge1xuICAgICAgY2FzZSAnPCc6XG4gICAgICAgIHJldHVybiBydGwgPyBhID4gYiA6IGEgPCBiO1xuICAgICAgY2FzZSAnPic6XG4gICAgICAgIHJldHVybiBydGwgPyBhIDwgYiA6IGEgPiBiO1xuICAgICAgY2FzZSAnPj0nOlxuICAgICAgICByZXR1cm4gcnRsID8gYSA8PSBiIDogYSA+PSBiO1xuICAgICAgY2FzZSAnPD0nOlxuICAgICAgICByZXR1cm4gcnRsID8gYSA+PSBiIDogYSA8PSBiO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIGEgcHVibGljIGV2ZW50LlxuICAgKiBAdG9kbyBSZW1vdmUgYHN0YXR1c2AsIGByZWxhdGVkVGFyZ2V0YCBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkLlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgZXZlbnQgbmFtZS5cbiAgICogQHBhcmFtIGRhdGEgVGhlIGV2ZW50IGRhdGEuXG4gICAqIEBwYXJhbSBuYW1lc3BhY2UgVGhlIGV2ZW50IG5hbWVzcGFjZS5cbiAgICogQHBhcmFtIHN0YXRlIFRoZSBzdGF0ZSB3aGljaCBpcyBhc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50LlxuICAgKiBAcGFyYW0gZW50ZXIgSW5kaWNhdGVzIGlmIHRoZSBjYWxsIGVudGVycyB0aGUgc3BlY2lmaWVkIHN0YXRlIG9yIG5vdC5cbiAgICovXG4gIHByaXZhdGUgX3RyaWdnZXIobmFtZTogc3RyaW5nLCBkYXRhPzogYW55LCBuYW1lc3BhY2U/OiBzdHJpbmcsIHN0YXRlPzogc3RyaW5nLCBlbnRlcj86IGJvb2xlYW4pIHtcbiAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgIGNhc2UgJ2luaXRpYWxpemVkJzpcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjaGFuZ2UnOlxuICAgICAgICB0aGlzLl9jaGFuZ2VTZXR0aW5nc0Nhcm91c2VsJC5uZXh0KGRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NoYW5nZWQnOlxuICAgICAgICB0aGlzLl9jaGFuZ2VkU2V0dGluZ3NDYXJvdXNlbCQubmV4dChkYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkcmFnJzpcbiAgICAgICAgdGhpcy5fZHJhZ0Nhcm91c2VsJC5uZXh0KG5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RyYWdnZWQnOlxuICAgICAgICB0aGlzLl9kcmFnZ2VkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVzaXplJzpcbiAgICAgICAgdGhpcy5fcmVzaXplQ2Fyb3VzZWwkLm5leHQobmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVzaXplZCc6XG4gICAgICAgIHRoaXMuX3Jlc2l6ZWRDYXJvdXNlbCQubmV4dChuYW1lKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZWZyZXNoJzpcbiAgICAgICAgdGhpcy5fcmVmcmVzaENhcm91c2VsJC5uZXh0KG5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JlZnJlc2hlZCc6XG4gICAgICAgIHRoaXMuX3JlZnJlc2hlZENhcm91c2VsJC5uZXh0KG5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RyYW5zbGF0ZSc6XG4gICAgICAgIHRoaXMuX3RyYW5zbGF0ZUNhcm91c2VsJC5uZXh0KG5hbWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RyYW5zbGF0ZWQnOlxuICAgICAgICB0aGlzLl90cmFuc2xhdGVkQ2Fyb3VzZWwkLm5leHQobmFtZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogRW50ZXJzIGEgc3RhdGUuXG4gICAqIEBwYXJhbSBuYW1lIC0gVGhlIHN0YXRlIG5hbWUuXG4gICAqL1xuICBlbnRlcihuYW1lOiBzdHJpbmcpIHtcbiAgICBbbmFtZV0uY29uY2F0KHRoaXMuX3N0YXRlcy50YWdzW25hbWVdIHx8IFtdKS5mb3JFYWNoKChzdGF0ZU5hbWUpID0+IHtcbiAgICAgIGlmICh0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSA9IDA7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3N0YXRlcy5jdXJyZW50W3N0YXRlTmFtZV0rKztcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogTGVhdmVzIGEgc3RhdGUuXG4gICAqIEBwYXJhbSBuYW1lIC0gVGhlIHN0YXRlIG5hbWUuXG4gICAqL1xuICBsZWF2ZShuYW1lOiBzdHJpbmcpIHtcbiAgICBbbmFtZV0uY29uY2F0KHRoaXMuX3N0YXRlcy50YWdzW25hbWVdIHx8IFtdKS5mb3JFYWNoKChzdGF0ZU5hbWUpID0+IHtcbiAgICAgIGlmICh0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdID09PSAwIHx8ICEhdGhpcy5fc3RhdGVzLmN1cnJlbnRbc3RhdGVOYW1lXSkge1xuICAgICAgICB0aGlzLl9zdGF0ZXMuY3VycmVudFtzdGF0ZU5hbWVdLS07XG4gICAgICB9XG4gICAgfSlcbiAgfTtcblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IG9yIHN0YXRlLlxuICAgKiBAcGFyYW0gb2JqZWN0IC0gVGhlIGV2ZW50IG9yIHN0YXRlIHRvIHJlZ2lzdGVyLlxuICAgKi9cbiAgcmVnaXN0ZXIob2JqZWN0OiBhbnkpIHtcbiAgICBpZiAob2JqZWN0LnR5cGUgPT09IFR5cGUuU3RhdGUpIHtcbiAgICAgIGlmICghdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSA9IG9iamVjdC50YWdzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdID0gdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdLmNvbmNhdChvYmplY3QudGFncyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXSA9IHRoaXMuX3N0YXRlcy50YWdzW29iamVjdC5uYW1lXS5maWx0ZXIoKHRhZywgaSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGVzLnRhZ3Nbb2JqZWN0Lm5hbWVdLmluZGV4T2YodGFnKSA9PT0gaTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdXBwcmVzc2VzIGV2ZW50cy5cbiAgICogQHBhcmFtIGV2ZW50cyBUaGUgZXZlbnRzIHRvIHN1cHByZXNzLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3VwcHJlc3MoZXZlbnRzOiBzdHJpbmdbXSkge1xuICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuX3N1cHJlc3NbZXZlbnRdID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWxlYXNlcyBzdXBwcmVzc2VkIGV2ZW50cy5cbiAgICogQHBhcmFtIGV2ZW50cyBUaGUgZXZlbnRzIHRvIHJlbGVhc2UuXG4gICAqL1xuICBwcml2YXRlIF9yZWxlYXNlKGV2ZW50czogc3RyaW5nW10pIHtcbiAgICBldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICBkZWxldGUgdGhpcy5fc3VwcmVzc1tldmVudF07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB1bmlmaWVkIHBvaW50ZXIgY29vcmRpbmF0ZXMgZnJvbSBldmVudC5cbiAgICogQHRvZG8gIzI2MVxuICAgKiBAcGFyYW0gZXZlbnQgVGhlIGBtb3VzZWRvd25gIG9yIGB0b3VjaHN0YXJ0YCBldmVudC5cbiAgICogQHJldHVybnMgT2JqZWN0IENvb3JkcyB3aGljaCBjb250YWlucyBgeGAgYW5kIGB5YCBjb29yZGluYXRlcyBvZiBjdXJyZW50IHBvaW50ZXIgcG9zaXRpb24uXG4gICAqL1xuICBwb2ludGVyKGV2ZW50OiBhbnkpOiBDb29yZHMge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt4OiBudWxsLCB5OiBudWxsfTtcblxuICAgIGV2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudCB8fCBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XG5cbiAgICBldmVudCA9IGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggP1xuICAgICAgZXZlbnQudG91Y2hlc1swXSA6IGV2ZW50LmNoYW5nZWRUb3VjaGVzICYmIGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aCA/XG4gICAgICAgIGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdIDogZXZlbnQ7XG5cbiAgICBpZiAoZXZlbnQucGFnZVgpIHtcbiAgICAgIHJlc3VsdC54ID0gZXZlbnQucGFnZVg7XG4gICAgICByZXN1bHQueSA9IGV2ZW50LnBhZ2VZO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQueCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICByZXN1bHQueSA9IGV2ZW50LmNsaWVudFk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBzb21ldGhpbmcgdGhhdCBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlclxuICAgKiBAcGFyYW0gbnVtYmVyIFRoZSBpbnB1dCB0byBiZSB0ZXN0ZWRcbiAgICogQHJldHVybnMgQW4gaW5kaWNhdGlvbiBpZiB0aGUgaW5wdXQgaXMgYSBOdW1iZXIgb3IgY2FuIGJlIGNvZXJjZWQgdG8gYSBOdW1iZXJcbiAgICovXG4gIHByaXZhdGUgX2lzTnVtZXJpYyhudW1iZXI6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChudW1iZXIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdmFsdWUgaXMgbnVtYmVyIG9yIGJvb2xlYW4gdHlwZVxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxuICAgKiBAcmV0dXJucyBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlciwgb3IgQm9vbGVhblxuICAgKi9cbiAgcHJpdmF0ZSBfaXNOdW1iZXJPckJvb2xlYW4odmFsdWU6IG51bWJlciB8IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNOdW1lcmljKHZhbHVlKSB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdmFsdWUgaXMgbnVtYmVyIG9yIHN0cmluZyB0eXBlXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdG8gYmUgdGVzdGVkXG4gICAqIEByZXR1cm5zIEFuIGluZGljYXRpb24gaWYgdGhlIGlucHV0IGlzIGEgTnVtYmVyIG9yIGNhbiBiZSBjb2VyY2VkIHRvIGEgTnVtYmVyLCBvciBTdHJpbmdcbiAgICovXG4gIHByaXZhdGUgX2lzTnVtYmVyT3JTdHJpbmcodmFsdWU6IG51bWJlciB8IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc051bWVyaWModmFsdWUpIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHZhbHVlIGlzIG51bWJlciBvciBzdHJpbmcgdHlwZVxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIGlucHV0IHRvIGJlIHRlc3RlZFxuICAgKiBAcmV0dXJucyBBbiBpbmRpY2F0aW9uIGlmIHRoZSBpbnB1dCBpcyBhIE51bWJlciBvciBjYW4gYmUgY29lcmNlZCB0byBhIE51bWJlciwgb3IgU3RyaW5nXG4gICAqL1xuICBwcml2YXRlIF9pc1N0cmluZ09yQm9vbGVhbih2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbic7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZGlmZmVyZW5jZSBvZiB0d28gdmVjdG9ycy5cbiAgICogQHRvZG8gIzI2MVxuICAgKiBAcGFyYW0gZmlyc3QgVGhlIGZpcnN0IHZlY3Rvci5cbiAgICogQHBhcmFtIHNlY29uZC0gVGhlIHNlY29uZCB2ZWN0b3IuXG4gICAqIEByZXR1cm5zIFRoZSBkaWZmZXJlbmNlLlxuICAgKi9cbiAgZGlmZmVyZW5jZShmaXJzdDogQ29vcmRzLCBzZWNvbmQ6IENvb3Jkcyk6IENvb3JkcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGZpcnN0LnggLSBzZWNvbmQueCxcbiAgICAgIHk6IGZpcnN0LnkgLSBzZWNvbmQueVxuICAgIH07XG4gIH1cblxufVxuIl19