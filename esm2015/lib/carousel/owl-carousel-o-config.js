/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Defaults value of options
 */
export class OwlCarouselOConfig {
    constructor() {
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
}
if (false) {
    /** @type {?} */
    OwlCarouselOConfig.prototype.items;
    /** @type {?} */
    OwlCarouselOConfig.prototype.loop;
    /** @type {?} */
    OwlCarouselOConfig.prototype.center;
    /** @type {?} */
    OwlCarouselOConfig.prototype.rewind;
    /** @type {?} */
    OwlCarouselOConfig.prototype.mouseDrag;
    /** @type {?} */
    OwlCarouselOConfig.prototype.touchDrag;
    /** @type {?} */
    OwlCarouselOConfig.prototype.pullDrag;
    /** @type {?} */
    OwlCarouselOConfig.prototype.freeDrag;
    /** @type {?} */
    OwlCarouselOConfig.prototype.margin;
    /** @type {?} */
    OwlCarouselOConfig.prototype.stagePadding;
    /** @type {?} */
    OwlCarouselOConfig.prototype.merge;
    /** @type {?} */
    OwlCarouselOConfig.prototype.mergeFit;
    /** @type {?} */
    OwlCarouselOConfig.prototype.autoWidth;
    /** @type {?} */
    OwlCarouselOConfig.prototype.startPosition;
    /** @type {?} */
    OwlCarouselOConfig.prototype.rtl;
    /** @type {?} */
    OwlCarouselOConfig.prototype.smartSpeed;
    /** @type {?} */
    OwlCarouselOConfig.prototype.fluidSpeed;
    /** @type {?} */
    OwlCarouselOConfig.prototype.dragEndSpeed;
    /** @type {?} */
    OwlCarouselOConfig.prototype.responsive;
    /** @type {?} */
    OwlCarouselOConfig.prototype.responsiveRefreshRate;
    /** @type {?} */
    OwlCarouselOConfig.prototype.nav;
    /** @type {?} */
    OwlCarouselOConfig.prototype.navText;
    /** @type {?} */
    OwlCarouselOConfig.prototype.navSpeed;
    /** @type {?} */
    OwlCarouselOConfig.prototype.slideBy;
    /** @type {?} */
    OwlCarouselOConfig.prototype.dots;
    /** @type {?} */
    OwlCarouselOConfig.prototype.dotsEach;
    /** @type {?} */
    OwlCarouselOConfig.prototype.dotsData;
    /** @type {?} */
    OwlCarouselOConfig.prototype.dotsSpeed;
    /** @type {?} */
    OwlCarouselOConfig.prototype.autoplay;
    /** @type {?} */
    OwlCarouselOConfig.prototype.autoplayTimeout;
    /** @type {?} */
    OwlCarouselOConfig.prototype.autoplayHoverPause;
    /** @type {?} */
    OwlCarouselOConfig.prototype.autoplaySpeed;
    /** @type {?} */
    OwlCarouselOConfig.prototype.lazyLoad;
    /** @type {?} */
    OwlCarouselOConfig.prototype.lazyLoadEager;
    /** @type {?} */
    OwlCarouselOConfig.prototype.animateOut;
    /** @type {?} */
    OwlCarouselOConfig.prototype.animateIn;
    /** @type {?} */
    OwlCarouselOConfig.prototype.autoHeight;
    /** @type {?} */
    OwlCarouselOConfig.prototype.URLhashListener;
}
/**
 * we can't read types from OwlOptions in javascript because of props have undefined value and types of those props are used for validating inputs
 * class below is copy of OwlOptions but its all props have string value showing certain type;
 * this is class is being used just in method _validateOptions() of CarouselService;
 */
export class OwlOptionsMockedTypes {
    constructor() {
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
}
if (false) {
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.items;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.loop;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.center;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.rewind;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.mouseDrag;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.touchDrag;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.pullDrag;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.freeDrag;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.margin;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.stagePadding;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.merge;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.mergeFit;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.autoWidth;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.startPosition;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.rtl;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.smartSpeed;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.fluidSpeed;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.dragEndSpeed;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.responsive;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.responsiveRefreshRate;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.nav;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.navText;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.navSpeed;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.slideBy;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.dots;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.dotsEach;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.dotsData;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.dotsSpeed;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.autoplay;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.autoplayTimeout;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.autoplayHoverPause;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.autoplaySpeed;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.lazyLoad;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.lazyLoadEager;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.animateOut;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.animateIn;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.autoHeight;
    /** @type {?} */
    OwlOptionsMockedTypes.prototype.URLhashListener;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3dsLWNhcm91c2VsLW8tY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL293bC1jYXJvdXNlbC1vLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0EsTUFBTTtJQXlESjtxQkF4RFEsQ0FBQztvQkFDRixLQUFLO3NCQUNILEtBQUs7c0JBQ0wsS0FBSzt5QkFFRixJQUFJO3lCQUNKLElBQUk7d0JBQ0wsSUFBSTt3QkFDSixLQUFLO3NCQUVQLENBQUM7NEJBQ0ssQ0FBQztxQkFFUixLQUFLO3dCQUNGLElBQUk7eUJBQ0gsS0FBSzs2QkFFRCxDQUFDO21CQUNYLEtBQUs7MEJBRUUsR0FBRzswQkFDSCxLQUFLOzRCQUNILEtBQUs7MEJBRVAsRUFBRTtxQ0FDUyxHQUFHOzttQkFHckIsS0FBSzt1QkFDRCxDQUFFLE1BQU0sRUFBRSxNQUFNLENBQUU7d0JBQ2pCLEtBQUs7dUJBQ04sQ0FBQztvQkFDSixJQUFJO3dCQUNBLEtBQUs7d0JBQ0wsS0FBSzt5QkFDSixLQUFLOzt3QkFHTixLQUFLOytCQUNFLElBQUk7a0NBQ0QsS0FBSzs2QkFDVixLQUFLOzt3QkFHVixLQUFLOzZCQUNBLENBQUM7OzBCQUdKLEtBQUs7eUJBQ04sS0FBSzs7MEJBR0osS0FBSzs7K0JBR0EsS0FBSztLQUNOO0NBQ2xCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPRCxNQUFNO0lBeURKO3FCQXhEUSxRQUFRO29CQUNULFNBQVM7c0JBQ1AsU0FBUztzQkFDVCxTQUFTO3lCQUVOLFNBQVM7eUJBQ1QsU0FBUzt3QkFDVixTQUFTO3dCQUNULFNBQVM7c0JBRVgsUUFBUTs0QkFDRixRQUFRO3FCQUVmLFNBQVM7d0JBQ04sU0FBUzt5QkFDUixTQUFTOzZCQUVMLGVBQWU7bUJBQ3pCLFNBQVM7MEJBRUYsUUFBUTswQkFDUixTQUFTOzRCQUNQLGdCQUFnQjswQkFFbEIsRUFBRTtxQ0FDUyxRQUFROzttQkFHMUIsU0FBUzt1QkFDTCxVQUFVO3dCQUNULGdCQUFnQjt1QkFDakIsZUFBZTtvQkFDbEIsU0FBUzt3QkFDTCxnQkFBZ0I7d0JBQ2hCLFNBQVM7eUJBQ1IsZ0JBQWdCOzt3QkFHakIsU0FBUzsrQkFDRixRQUFRO2tDQUNMLFNBQVM7NkJBQ2QsZ0JBQWdCOzt3QkFHckIsU0FBUzs2QkFDSixRQUFROzswQkFHWCxnQkFBZ0I7eUJBQ2pCLGdCQUFnQjs7MEJBR2YsU0FBUzs7K0JBR0osU0FBUztLQUNWO0NBQ2xCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3dsT3B0aW9ucyB9IGZyb20gXCIuLi9tb2RlbHMvb3dsLW9wdGlvbnMubW9kZWxcIjtcblxuLyoqXG4gKiBEZWZhdWx0cyB2YWx1ZSBvZiBvcHRpb25zXG4gKi9cbmV4cG9ydCBjbGFzcyBPd2xDYXJvdXNlbE9Db25maWcgaW1wbGVtZW50cyBPd2xPcHRpb25zIHtcbiAgaXRlbXMgPSAzO1xuICBsb29wID0gZmFsc2U7XG4gIGNlbnRlciA9IGZhbHNlO1xuICByZXdpbmQgPSBmYWxzZTtcblxuICBtb3VzZURyYWcgPSB0cnVlO1xuICB0b3VjaERyYWcgPSB0cnVlO1xuICBwdWxsRHJhZyA9IHRydWU7XG4gIGZyZWVEcmFnID0gZmFsc2U7XG5cbiAgbWFyZ2luID0gMDtcbiAgc3RhZ2VQYWRkaW5nID0gMDtcblxuICBtZXJnZSA9IGZhbHNlO1xuICBtZXJnZUZpdCA9IHRydWU7XG4gIGF1dG9XaWR0aCA9IGZhbHNlO1xuXG4gIHN0YXJ0UG9zaXRpb24gPSAwO1xuICBydGwgPSBmYWxzZTtcblxuICBzbWFydFNwZWVkID0gMjUwO1xuICBmbHVpZFNwZWVkID0gZmFsc2U7XG4gIGRyYWdFbmRTcGVlZCA9IGZhbHNlO1xuXG4gIHJlc3BvbnNpdmUgPSB7fTtcbiAgcmVzcG9uc2l2ZVJlZnJlc2hSYXRlID0gMjAwO1xuXG4gIC8vIGRlZmF1bHRzIHRvIE5hdmlnYXRpb25cbiAgbmF2ID0gZmFsc2U7XG4gIG5hdlRleHQgPSBbICdwcmV2JywgJ25leHQnIF07XG4gIG5hdlNwZWVkID0gZmFsc2U7XG4gIHNsaWRlQnkgPSAxOyAvLyBzdGFnZSBtb3ZlcyBvbiAxIHdpZHRoIG9mIHNsaWRlOyBpZiBzbGlkZUJ5ID0gMiwgc3RhZ2UgbW92ZXMgb24gMiB3aWR0aHMgb2Ygc2xpZGVcbiAgZG90cyA9IHRydWU7XG4gIGRvdHNFYWNoID0gZmFsc2U7XG4gIGRvdHNEYXRhID0gZmFsc2U7XG4gIGRvdHNTcGVlZCA9IGZhbHNlO1xuXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9wbGF5XG4gIGF1dG9wbGF5ID0gZmFsc2U7XG4gIGF1dG9wbGF5VGltZW91dCA9IDUwMDA7XG4gIGF1dG9wbGF5SG92ZXJQYXVzZSA9IGZhbHNlO1xuICBhdXRvcGxheVNwZWVkID0gZmFsc2U7XG5cbiAgLy8gZGVmYXVsdHMgdG8gTGF6eUxvYWRpbmdcbiAgbGF6eUxvYWQgPSBmYWxzZTtcbiAgbGF6eUxvYWRFYWdlciA9IDA7XG5cbiAgLy8gZGVmYXVsdHMgdG8gQW5pbWF0ZVxuICBhbmltYXRlT3V0ID0gZmFsc2U7XG4gIGFuaW1hdGVJbiA9IGZhbHNlO1xuXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9IZWlnaHRcbiAgYXV0b0hlaWdodCA9IGZhbHNlO1xuXG4gIC8vIGRlZmF1bHRzIHRvIEhhc2hcbiAgVVJMaGFzaExpc3RlbmVyID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG5cbi8qKlxuICogd2UgY2FuJ3QgcmVhZCB0eXBlcyBmcm9tIE93bE9wdGlvbnMgaW4gamF2YXNjcmlwdCBiZWNhdXNlIG9mIHByb3BzIGhhdmUgdW5kZWZpbmVkIHZhbHVlIGFuZCB0eXBlcyBvZiB0aG9zZSBwcm9wcyBhcmUgdXNlZCBmb3IgdmFsaWRhdGluZyBpbnB1dHNcbiAqIGNsYXNzIGJlbG93IGlzIGNvcHkgb2YgT3dsT3B0aW9ucyBidXQgaXRzIGFsbCBwcm9wcyBoYXZlIHN0cmluZyB2YWx1ZSBzaG93aW5nIGNlcnRhaW4gdHlwZTtcbiAqIHRoaXMgaXMgY2xhc3MgaXMgYmVpbmcgdXNlZCBqdXN0IGluIG1ldGhvZCBfdmFsaWRhdGVPcHRpb25zKCkgb2YgQ2Fyb3VzZWxTZXJ2aWNlO1xuICovXG5leHBvcnQgY2xhc3MgT3dsT3B0aW9uc01vY2tlZFR5cGVzIHtcbiAgaXRlbXMgPSAnbnVtYmVyJztcbiAgbG9vcCA9ICdib29sZWFuJztcbiAgY2VudGVyID0gJ2Jvb2xlYW4nO1xuICByZXdpbmQgPSAnYm9vbGVhbic7XG5cbiAgbW91c2VEcmFnID0gJ2Jvb2xlYW4nO1xuICB0b3VjaERyYWcgPSAnYm9vbGVhbic7XG4gIHB1bGxEcmFnID0gJ2Jvb2xlYW4nO1xuICBmcmVlRHJhZyA9ICdib29sZWFuJztcblxuICBtYXJnaW4gPSAnbnVtYmVyJztcbiAgc3RhZ2VQYWRkaW5nID0gJ251bWJlcic7XG5cbiAgbWVyZ2UgPSAnYm9vbGVhbic7XG4gIG1lcmdlRml0ID0gJ2Jvb2xlYW4nO1xuICBhdXRvV2lkdGggPSAnYm9vbGVhbic7XG5cbiAgc3RhcnRQb3NpdGlvbiA9ICdudW1iZXJ8c3RyaW5nJztcbiAgcnRsID0gJ2Jvb2xlYW4nO1xuXG4gIHNtYXJ0U3BlZWQgPSAnbnVtYmVyJztcbiAgZmx1aWRTcGVlZCA9ICdib29sZWFuJztcbiAgZHJhZ0VuZFNwZWVkID0gJ251bWJlcnxib29sZWFuJztcblxuICByZXNwb25zaXZlID0ge307XG4gIHJlc3BvbnNpdmVSZWZyZXNoUmF0ZSA9ICdudW1iZXInO1xuXG4gIC8vIGRlZmF1bHRzIHRvIE5hdmlnYXRpb25cbiAgbmF2ID0gJ2Jvb2xlYW4nO1xuICBuYXZUZXh0ID0gJ3N0cmluZ1tdJztcbiAgbmF2U3BlZWQgPSAnbnVtYmVyfGJvb2xlYW4nO1xuICBzbGlkZUJ5ID0gJ251bWJlcnxzdHJpbmcnOyAvLyBzdGFnZSBtb3ZlcyBvbiAxIHdpZHRoIG9mIHNsaWRlOyBpZiBzbGlkZUJ5ID0gMiwgc3RhZ2UgbW92ZXMgb24gMiB3aWR0aHMgb2Ygc2xpZGVcbiAgZG90cyA9ICdib29sZWFuJztcbiAgZG90c0VhY2ggPSAnbnVtYmVyfGJvb2xlYW4nO1xuICBkb3RzRGF0YSA9ICdib29sZWFuJztcbiAgZG90c1NwZWVkID0gJ251bWJlcnxib29sZWFuJztcblxuICAvLyBkZWZhdWx0cyB0byBBdXRvcGxheVxuICBhdXRvcGxheSA9ICdib29sZWFuJztcbiAgYXV0b3BsYXlUaW1lb3V0ID0gJ251bWJlcic7XG4gIGF1dG9wbGF5SG92ZXJQYXVzZSA9ICdib29sZWFuJztcbiAgYXV0b3BsYXlTcGVlZCA9ICdudW1iZXJ8Ym9vbGVhbic7XG5cbiAgLy8gZGVmYXVsdHMgdG8gTGF6eUxvYWRpbmdcbiAgbGF6eUxvYWQgPSAnYm9vbGVhbic7XG4gIGxhenlMb2FkRWFnZXIgPSAnbnVtYmVyJztcblxuICAvLyBkZWZhdWx0cyB0byBBbmltYXRlXG4gIGFuaW1hdGVPdXQgPSAnc3RyaW5nfGJvb2xlYW4nO1xuICBhbmltYXRlSW4gPSAnc3RyaW5nfGJvb2xlYW4nO1xuXG4gIC8vIGRlZmF1bHRzIHRvIEF1dG9IZWlnaHRcbiAgYXV0b0hlaWdodCA9ICdib29sZWFuJztcblxuICAvLyBkZWZhdWx0cyB0byBIYXNoXG4gIFVSTGhhc2hMaXN0ZW5lciA9IFwiYm9vbGVhblwiO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxufSJdfQ==