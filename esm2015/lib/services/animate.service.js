/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { merge } from 'rxjs/observable/merge';
import { CarouselService } from './carousel.service';
import { tap } from 'rxjs/operators';
export class AnimateService {
    /**
     * @param {?} carouselService
     */
    constructor(carouselService) {
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
    ngOnDestroy() {
        this.animateSubscription.unsubscribe();
    }
    /**
     * Defines Observables which service must observe
     * @return {?}
     */
    spyDataStreams() {
        /** @type {?} */
        const changeSettings$ = this.carouselService.getChangeState().pipe(tap(data => {
            if (data.property.name === 'position') {
                this.previous = this.carouselService.current();
                this.next = data.property.value;
            }
        }));
        /** @type {?} */
        const dragCarousel$ = this.carouselService.getDragState();
        /** @type {?} */
        const draggedCarousel$ = this.carouselService.getDraggedState();
        /** @type {?} */
        const translatedCarousel$ = this.carouselService.getTranslatedState();
        /** @type {?} */
        const dragTranslatedMerge$ = merge(dragCarousel$, draggedCarousel$, translatedCarousel$).pipe(tap(data => this.swapping = data === 'translated'));
        /** @type {?} */
        const translateCarousel$ = this.carouselService.getTranslateState().pipe(tap(data => {
            if (this.swapping && (this.carouselService._options.animateOut || this.carouselService._options.animateIn)) {
                this._swap();
            }
        }));
        /** @type {?} */
        const animateMerge$ = merge(changeSettings$, translateCarousel$, dragTranslatedMerge$).pipe();
        this.animateSubscription = animateMerge$.subscribe(() => { });
    }
    /**
     * Toggles the animation classes whenever an translations starts.
     * @return {?}
     */
    _swap() {
        if (this.carouselService.settings.items !== 1) {
            return;
        }
        // if (!$.support.animation || !$.support.transition) {
        // 	return;
        // }
        this.carouselService.speed(0);
        /** @type {?} */
        let left;
        /** @type {?} */
        const previous = this.carouselService.slidesData[this.previous];
        /** @type {?} */
        const next = this.carouselService.slidesData[this.next];
        /** @type {?} */
        const incoming = this.carouselService.settings.animateIn;
        /** @type {?} */
        const outgoing = this.carouselService.settings.animateOut;
        if (this.carouselService.current() === this.previous) {
            return;
        }
        if (outgoing) {
            left = +this.carouselService.coordinates(this.previous) - +this.carouselService.coordinates(this.next);
            this.carouselService.slidesData.forEach(slide => {
                if (slide.id === previous.id) {
                    slide.left = `${left}px`;
                    slide.isAnimated = true;
                    slide.isDefAnimatedOut = true;
                    slide.isCustomAnimatedOut = true;
                }
            });
        }
        if (incoming) {
            this.carouselService.slidesData.forEach(slide => {
                if (slide.id === next.id) {
                    slide.isAnimated = true;
                    slide.isDefAnimatedIn = true;
                    slide.isCustomAnimatedIn = true;
                }
            });
        }
    }
    ;
    /**
     * Handles the end of 'animationend' event
     * @param {?} id Id of slides
     * @return {?}
     */
    clear(id) {
        this.carouselService.slidesData.forEach(slide => {
            if (slide.id === id) {
                slide.left = '';
                slide.isAnimated = false;
                slide.isDefAnimatedOut = false;
                slide.isCustomAnimatedOut = false;
                slide.isDefAnimatedIn = false;
                slide.isCustomAnimatedIn = false;
                slide.classes = this.carouselService.setCurSlideClasses(slide);
            }
        });
        this.carouselService.onTransitionEnd();
    }
    ;
}
AnimateService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AnimateService.ctorParameters = () => [
    { type: CarouselService }
];
if (false) {
    /**
     * Subscrioption to merge Observable  from CarouselService
     * @type {?}
     */
    AnimateService.prototype.animateSubscription;
    /**
     * s
     * @type {?}
     */
    AnimateService.prototype.swapping;
    /**
     * active slide before translating
     * @type {?}
     */
    AnimateService.prototype.previous;
    /**
     * new active slide after translating
     * @type {?}
     */
    AnimateService.prototype.next;
    /** @type {?} */
    AnimateService.prototype.carouselService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FuaW1hdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUV0RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdyQyxNQUFNOzs7O0lBcUJKLFlBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjs7Ozt3QkFaekMsSUFBSTs7Ozt3QkFLSixTQUFTOzs7O29CQUtiLFNBQVM7UUFHZCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hDOzs7OztJQUtELGNBQWM7O1FBQ1osTUFBTSxlQUFlLEdBQW9CLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUNqRixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7YUFDaEM7U0FDRSxDQUFDLENBQ0gsQ0FBQzs7UUFFRixNQUFNLGFBQWEsR0FBdUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FB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Y2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdyeGpzL29ic2VydmFibGUvbWVyZ2UnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFuaW1hdGVTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95e1xuICAvKipcbiAgICogU3Vic2NyaW9wdGlvbiB0byBtZXJnZSBPYnNlcnZhYmxlICBmcm9tIENhcm91c2VsU2VydmljZVxuICAgKi9cbiAgYW5pbWF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBzXG4gICAqL1xuICBzd2FwcGluZyA9IHRydWU7XG5cbiAgLyoqXG4gICAqIGFjdGl2ZSBzbGlkZSBiZWZvcmUgdHJhbnNsYXRpbmdcbiAgICovXG4gIHByZXZpb3VzID0gdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBuZXcgYWN0aXZlIHNsaWRlIGFmdGVyIHRyYW5zbGF0aW5nXG4gICAqL1xuICBuZXh0ID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UpIHtcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmFuaW1hdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIE9ic2VydmFibGVzIHdoaWNoIHNlcnZpY2UgbXVzdCBvYnNlcnZlXG4gICAqL1xuICBzcHlEYXRhU3RyZWFtcygpIHtcbiAgICBjb25zdCBjaGFuZ2VTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZVN0YXRlKCkucGlwZShcbiAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEucHJvcGVydHkubmFtZSA9PT0gJ3Bvc2l0aW9uJykge1xuXHRcdFx0XHRcdHRoaXMucHJldmlvdXMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jdXJyZW50KCk7XG5cdFx0XHRcdFx0dGhpcy5uZXh0ID0gZGF0YS5wcm9wZXJ0eS52YWx1ZTtcblx0XHRcdFx0fVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29uc3QgZHJhZ0Nhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0RHJhZ1N0YXRlKCk7XG4gICAgY29uc3QgZHJhZ2dlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0RHJhZ2dlZFN0YXRlKCk7XG4gICAgY29uc3QgdHJhbnNsYXRlZENhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlZFN0YXRlKCk7XG5cbiAgICBjb25zdCBkcmFnVHJhbnNsYXRlZE1lcmdlJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gbWVyZ2UoZHJhZ0Nhcm91c2VsJCwgZHJhZ2dlZENhcm91c2VsJCwgdHJhbnNsYXRlZENhcm91c2VsJCkucGlwZShcbiAgICAgIHRhcChkYXRhID0+IHRoaXMuc3dhcHBpbmcgPSBkYXRhID09PSAndHJhbnNsYXRlZCcpXG4gICAgKTtcblxuICAgIGNvbnN0IHRyYW5zbGF0ZUNhcm91c2VsJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZ2V0VHJhbnNsYXRlU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICBpZiAodGhpcy5zd2FwcGluZyAmJiAodGhpcy5jYXJvdXNlbFNlcnZpY2UuX29wdGlvbnMuYW5pbWF0ZU91dCB8fCB0aGlzLmNhcm91c2VsU2VydmljZS5fb3B0aW9ucy5hbmltYXRlSW4pKSB7XG4gICAgICAgICAgdGhpcy5fc3dhcCgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCBhbmltYXRlTWVyZ2UkOiBPYnNlcnZhYmxlPHN0cmluZyB8IGFueT4gPSBtZXJnZShjaGFuZ2VTZXR0aW5ncyQsIHRyYW5zbGF0ZUNhcm91c2VsJCwgZHJhZ1RyYW5zbGF0ZWRNZXJnZSQpLnBpcGUoKTtcbiAgICB0aGlzLmFuaW1hdGVTdWJzY3JpcHRpb24gPSBhbmltYXRlTWVyZ2UkLnN1YnNjcmliZShcbiAgICAgICgpID0+IHt9XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuXHQgKiBUb2dnbGVzIHRoZSBhbmltYXRpb24gY2xhc3NlcyB3aGVuZXZlciBhbiB0cmFuc2xhdGlvbnMgc3RhcnRzLlxuXHQgKiBAcmV0dXJuc1xuXHQgKi9cblx0cHJpdmF0ZSBfc3dhcCgpOiBib29sZWFuIHtcblxuXHRcdGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5pdGVtcyAhPT0gMSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIGlmICghJC5zdXBwb3J0LmFuaW1hdGlvbiB8fCAhJC5zdXBwb3J0LnRyYW5zaXRpb24pIHtcblx0XHQvLyBcdHJldHVybjtcblx0XHQvLyB9XG5cblx0XHR0aGlzLmNhcm91c2VsU2VydmljZS5zcGVlZCgwKTtcblxuXHRcdGxldCBsZWZ0O1xuXHRcdGNvbnN0XHRwcmV2aW91cyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGFbdGhpcy5wcmV2aW91c10sXG5cdFx0XHRuZXh0ID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YVt0aGlzLm5leHRdLFxuXHRcdFx0aW5jb21pbmcgPSB0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5hbmltYXRlSW4sXG5cdFx0XHRvdXRnb2luZyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLmFuaW1hdGVPdXQ7XG5cblx0XHRpZiAodGhpcy5jYXJvdXNlbFNlcnZpY2UuY3VycmVudCgpID09PSB0aGlzLnByZXZpb3VzKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKG91dGdvaW5nKSB7XG5cdFx0XHRsZWZ0ID0gK3RoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNvb3JkaW5hdGVzKHRoaXMucHJldmlvdXMpIC0gK3RoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNvb3JkaW5hdGVzKHRoaXMubmV4dCk7XG4gICAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgICBpZiAoc2xpZGUuaWQgPT09IHByZXZpb3VzLmlkKSB7XG4gICAgICAgICAgc2xpZGUubGVmdCA9IGAke2xlZnR9cHhgO1xuICAgICAgICAgIHNsaWRlLmlzQW5pbWF0ZWQgPSB0cnVlO1xuICAgICAgICAgIHNsaWRlLmlzRGVmQW5pbWF0ZWRPdXQgPSB0cnVlO1xuICAgICAgICAgIHNsaWRlLmlzQ3VzdG9tQW5pbWF0ZWRPdXQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcblx0XHR9XG5cblx0XHRpZiAoaW5jb21pbmcpIHtcbiAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNsaWRlc0RhdGEuZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgICAgIGlmIChzbGlkZS5pZCA9PT0gbmV4dC5pZCkge1xuICAgICAgICAgIHNsaWRlLmlzQW5pbWF0ZWQgPSB0cnVlO1xuICAgICAgICAgIHNsaWRlLmlzRGVmQW5pbWF0ZWRJbiA9IHRydWU7XG4gICAgICAgICAgc2xpZGUuaXNDdXN0b21BbmltYXRlZEluID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cdFx0fVxuXHR9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBlbmQgb2YgJ2FuaW1hdGlvbmVuZCcgZXZlbnRcbiAgICogQHBhcmFtIGlkIElkIG9mIHNsaWRlc1xuICAgKi9cbiAgY2xlYXIoaWQpIHtcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgaWYgKHNsaWRlLmlkID09PSBpZCkge1xuICAgICAgICBzbGlkZS5sZWZ0ID0gJyc7XG4gICAgICAgIHNsaWRlLmlzQW5pbWF0ZWQgPSBmYWxzZTtcbiAgICAgICAgc2xpZGUuaXNEZWZBbmltYXRlZE91dCA9IGZhbHNlO1xuICAgICAgICBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkT3V0ID0gZmFsc2U7XG4gICAgICAgIHNsaWRlLmlzRGVmQW5pbWF0ZWRJbiA9IGZhbHNlO1xuICAgICAgICBzbGlkZS5pc0N1c3RvbUFuaW1hdGVkSW4gPSBmYWxzZTtcbiAgICAgICAgc2xpZGUuY2xhc3NlcyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldEN1clNsaWRlQ2xhc3NlcyhzbGlkZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub25UcmFuc2l0aW9uRW5kKCk7XG5cdH07XG59XG4iXX0=