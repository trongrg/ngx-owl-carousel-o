/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SlideModel = /** @class */ (function () {
    function SlideModel() {
    }
    return SlideModel;
}());
export { SlideModel };
if (false) {
    /**
     * Id of slide
     * @type {?}
     */
    SlideModel.prototype.id;
    /**
     * Active state of slide. If true slide gets css-class .active
     * @type {?}
     */
    SlideModel.prototype.isActive;
    /**
     * TemplateRef of slide. In other words its html-markup
     * @type {?}
     */
    SlideModel.prototype.tplRef;
    /**
     * Number of grid parts to be used
     * @type {?}
     */
    SlideModel.prototype.dataMerge;
    /**
     * Width of slide
     * @type {?}
     */
    SlideModel.prototype.width;
    /**
     * Css-rule 'margin-left'
     * @type {?}
     */
    SlideModel.prototype.marginL;
    /**
     * Css-rule 'margin-right'
     * @type {?}
     */
    SlideModel.prototype.marginR;
    /**
     * Make slide to be on center of the carousel
     * @type {?}
     */
    SlideModel.prototype.isCentered;
    /**
     * Cloned slide. It's being used when 'loop'=true
     * @type {?}
     */
    SlideModel.prototype.isCloned;
    /**
     * Indicates whether slide should be lazy loaded
     * @type {?}
     */
    SlideModel.prototype.load;
    /**
     * Css-rule 'left'
     * @type {?}
     */
    SlideModel.prototype.left;
    /**
     * Changeable classes of slide
     * @type {?}
     */
    SlideModel.prototype.classes;
    /**
     * Shows whether slide could be animated and could have css-class '.animated'
     * @type {?}
     */
    SlideModel.prototype.isAnimated;
    /**
     * Shows whether slide could be animated-in and could have css-class '.owl-animated-in'
     * @type {?}
     */
    SlideModel.prototype.isDefAnimatedIn;
    /**
     * Shows whether slide could be animated-out and could have css-class '.owl-animated-out'
     * @type {?}
     */
    SlideModel.prototype.isDefAnimatedOut;
    /**
     * Shows whether slide could be animated-in and could have animation css-class defined by user
     * @type {?}
     */
    SlideModel.prototype.isCustomAnimatedIn;
    /**
     * Shows whether slide could be animated-out and could have animation css-class defined by user
     * @type {?}
     */
    SlideModel.prototype.isCustomAnimatedOut;
    /**
     * State for defining the height of slide.It's values could be 'full' and 'nulled'. 'Full' sets css-height to 'auto', 'nulled' sets height to '0'.
     * @type {?}
     */
    SlideModel.prototype.heightState;
    /**
     * Hash (fragment) of url which corresponds to slide
     * @type {?}
     */
    SlideModel.prototype.hashFragment;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvbW9kZWxzL3NsaWRlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxJQUFBOzs7cUJBRkE7SUErRkMsQ0FBQTtBQTdGRCxzQkE2RkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZW1wbGF0ZVJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmV4cG9ydCBjbGFzcyBTbGlkZU1vZGVsIHtcblxuICAvKipcbiAgICogSWQgb2Ygc2xpZGVcbiAgICovXG4gIGlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFjdGl2ZSBzdGF0ZSBvZiBzbGlkZS4gSWYgdHJ1ZSBzbGlkZSBnZXRzIGNzcy1jbGFzcyAuYWN0aXZlXG4gICAqL1xuICBpc0FjdGl2ZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRlbXBsYXRlUmVmIG9mIHNsaWRlLiBJbiBvdGhlciB3b3JkcyBpdHMgaHRtbC1tYXJrdXBcbiAgICovXG4gIHRwbFJlZj86IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBncmlkIHBhcnRzIHRvIGJlIHVzZWRcbiAgICovXG4gIGRhdGFNZXJnZT86IG51bWJlcjtcblxuICAvKipcbiAgICogV2lkdGggb2Ygc2xpZGVcbiAgICovXG4gIHdpZHRoPzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDc3MtcnVsZSAnbWFyZ2luLWxlZnQnXG4gICAqL1xuICBtYXJnaW5MPzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDc3MtcnVsZSAnbWFyZ2luLXJpZ2h0J1xuICAgKi9cbiAgbWFyZ2luUj86IG51bWJlciB8IHN0cmluZztcblxuICAvKipcbiAgICogTWFrZSBzbGlkZSB0byBiZSBvbiBjZW50ZXIgb2YgdGhlIGNhcm91c2VsXG4gICAqL1xuICBpc0NlbnRlcmVkPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQ2xvbmVkIHNsaWRlLiBJdCdzIGJlaW5nIHVzZWQgd2hlbiAnbG9vcCc9dHJ1ZVxuICAgKi9cbiAgaXNDbG9uZWQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBzbGlkZSBzaG91bGQgYmUgbGF6eSBsb2FkZWRcbiAgICovXG4gIGxvYWQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDc3MtcnVsZSAnbGVmdCdcbiAgICovXG4gIGxlZnQ/OiBudW1iZXIgfCBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIENoYW5nZWFibGUgY2xhc3NlcyBvZiBzbGlkZVxuICAgKi9cbiAgY2xhc3Nlcz86IHtba2V5OnN0cmluZ106IGJvb2xlYW59O1xuXG4gIC8qKlxuICAgKiBTaG93cyB3aGV0aGVyIHNsaWRlIGNvdWxkIGJlIGFuaW1hdGVkIGFuZCBjb3VsZCBoYXZlIGNzcy1jbGFzcyAnLmFuaW1hdGVkJ1xuICAgKi9cbiAgaXNBbmltYXRlZD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNob3dzIHdoZXRoZXIgc2xpZGUgY291bGQgYmUgYW5pbWF0ZWQtaW4gYW5kIGNvdWxkIGhhdmUgY3NzLWNsYXNzICcub3dsLWFuaW1hdGVkLWluJ1xuICAgKi9cbiAgaXNEZWZBbmltYXRlZEluPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFNob3dzIHdoZXRoZXIgc2xpZGUgY291bGQgYmUgYW5pbWF0ZWQtb3V0IGFuZCBjb3VsZCBoYXZlIGNzcy1jbGFzcyAnLm93bC1hbmltYXRlZC1vdXQnXG4gICAqL1xuICBpc0RlZkFuaW1hdGVkT3V0PzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFNob3dzIHdoZXRoZXIgc2xpZGUgY291bGQgYmUgYW5pbWF0ZWQtaW4gYW5kIGNvdWxkIGhhdmUgYW5pbWF0aW9uIGNzcy1jbGFzcyBkZWZpbmVkIGJ5IHVzZXJcbiAgICovXG4gIGlzQ3VzdG9tQW5pbWF0ZWRJbj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBTaG93cyB3aGV0aGVyIHNsaWRlIGNvdWxkIGJlIGFuaW1hdGVkLW91dCBhbmQgY291bGQgaGF2ZSBhbmltYXRpb24gY3NzLWNsYXNzIGRlZmluZWQgYnkgdXNlclxuICAgKi9cbiAgaXNDdXN0b21BbmltYXRlZE91dD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFN0YXRlIGZvciBkZWZpbmluZyB0aGUgaGVpZ2h0IG9mIHNsaWRlLkl0J3MgdmFsdWVzIGNvdWxkIGJlICdmdWxsJyBhbmQgJ251bGxlZCcuICdGdWxsJyBzZXRzIGNzcy1oZWlnaHQgdG8gJ2F1dG8nLCAnbnVsbGVkJyBzZXRzIGhlaWdodCB0byAnMCcuXG4gICAqL1xuICBoZWlnaHRTdGF0ZT86IHN0cmluZztcblxuICAvKipcbiAgICogSGFzaCAoZnJhZ21lbnQpIG9mIHVybCB3aGljaCBjb3JyZXNwb25kcyB0byBzbGlkZVxuICAgKi9cbiAgaGFzaEZyYWdtZW50Pzogc3RyaW5nO1xufSJdfQ==