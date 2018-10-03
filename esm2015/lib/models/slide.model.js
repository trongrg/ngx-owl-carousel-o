/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
export class SlideModel {
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3dsLWNhcm91c2VsLW8vIiwic291cmNlcyI6WyJsaWIvbW9kZWxzL3NsaWRlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNO0NBNkZMIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGVtcGxhdGVSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5leHBvcnQgY2xhc3MgU2xpZGVNb2RlbCB7XG5cbiAgLyoqXG4gICAqIElkIG9mIHNsaWRlXG4gICAqL1xuICBpZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBY3RpdmUgc3RhdGUgb2Ygc2xpZGUuIElmIHRydWUgc2xpZGUgZ2V0cyBjc3MtY2xhc3MgLmFjdGl2ZVxuICAgKi9cbiAgaXNBY3RpdmU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUZW1wbGF0ZVJlZiBvZiBzbGlkZS4gSW4gb3RoZXIgd29yZHMgaXRzIGh0bWwtbWFya3VwXG4gICAqL1xuICB0cGxSZWY/OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgZ3JpZCBwYXJ0cyB0byBiZSB1c2VkXG4gICAqL1xuICBkYXRhTWVyZ2U/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFdpZHRoIG9mIHNsaWRlXG4gICAqL1xuICB3aWR0aD86IG51bWJlciB8IHN0cmluZztcblxuICAvKipcbiAgICogQ3NzLXJ1bGUgJ21hcmdpbi1sZWZ0J1xuICAgKi9cbiAgbWFyZ2luTD86IG51bWJlciB8IHN0cmluZztcblxuICAvKipcbiAgICogQ3NzLXJ1bGUgJ21hcmdpbi1yaWdodCdcbiAgICovXG4gIG1hcmdpblI/OiBudW1iZXIgfCBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIE1ha2Ugc2xpZGUgdG8gYmUgb24gY2VudGVyIG9mIHRoZSBjYXJvdXNlbFxuICAgKi9cbiAgaXNDZW50ZXJlZD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIENsb25lZCBzbGlkZS4gSXQncyBiZWluZyB1c2VkIHdoZW4gJ2xvb3AnPXRydWVcbiAgICovXG4gIGlzQ2xvbmVkPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgc2xpZGUgc2hvdWxkIGJlIGxhenkgbG9hZGVkXG4gICAqL1xuICBsb2FkPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQ3NzLXJ1bGUgJ2xlZnQnXG4gICAqL1xuICBsZWZ0PzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDaGFuZ2VhYmxlIGNsYXNzZXMgb2Ygc2xpZGVcbiAgICovXG4gIGNsYXNzZXM/OiB7W2tleTpzdHJpbmddOiBib29sZWFufTtcblxuICAvKipcbiAgICogU2hvd3Mgd2hldGhlciBzbGlkZSBjb3VsZCBiZSBhbmltYXRlZCBhbmQgY291bGQgaGF2ZSBjc3MtY2xhc3MgJy5hbmltYXRlZCdcbiAgICovXG4gIGlzQW5pbWF0ZWQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTaG93cyB3aGV0aGVyIHNsaWRlIGNvdWxkIGJlIGFuaW1hdGVkLWluIGFuZCBjb3VsZCBoYXZlIGNzcy1jbGFzcyAnLm93bC1hbmltYXRlZC1pbidcbiAgICovXG4gIGlzRGVmQW5pbWF0ZWRJbj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBTaG93cyB3aGV0aGVyIHNsaWRlIGNvdWxkIGJlIGFuaW1hdGVkLW91dCBhbmQgY291bGQgaGF2ZSBjc3MtY2xhc3MgJy5vd2wtYW5pbWF0ZWQtb3V0J1xuICAgKi9cbiAgaXNEZWZBbmltYXRlZE91dD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBTaG93cyB3aGV0aGVyIHNsaWRlIGNvdWxkIGJlIGFuaW1hdGVkLWluIGFuZCBjb3VsZCBoYXZlIGFuaW1hdGlvbiBjc3MtY2xhc3MgZGVmaW5lZCBieSB1c2VyXG4gICAqL1xuICBpc0N1c3RvbUFuaW1hdGVkSW4/OiBib29sZWFuO1xuICAvKipcbiAgICogU2hvd3Mgd2hldGhlciBzbGlkZSBjb3VsZCBiZSBhbmltYXRlZC1vdXQgYW5kIGNvdWxkIGhhdmUgYW5pbWF0aW9uIGNzcy1jbGFzcyBkZWZpbmVkIGJ5IHVzZXJcbiAgICovXG4gIGlzQ3VzdG9tQW5pbWF0ZWRPdXQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTdGF0ZSBmb3IgZGVmaW5pbmcgdGhlIGhlaWdodCBvZiBzbGlkZS5JdCdzIHZhbHVlcyBjb3VsZCBiZSAnZnVsbCcgYW5kICdudWxsZWQnLiAnRnVsbCcgc2V0cyBjc3MtaGVpZ2h0IHRvICdhdXRvJywgJ251bGxlZCcgc2V0cyBoZWlnaHQgdG8gJzAnLlxuICAgKi9cbiAgaGVpZ2h0U3RhdGU/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEhhc2ggKGZyYWdtZW50KSBvZiB1cmwgd2hpY2ggY29ycmVzcG9uZHMgdG8gc2xpZGVcbiAgICovXG4gIGhhc2hGcmFnbWVudD86IHN0cmluZztcbn0iXX0=