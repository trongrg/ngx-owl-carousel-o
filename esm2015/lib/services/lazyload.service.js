/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { merge } from 'rxjs/observable/merge';
import { CarouselService } from './carousel.service';
import { tap } from 'rxjs/operators';
export class LazyLoadService {
    /**
     * @param {?} carouselService
     */
    constructor(carouselService) {
        this.carouselService = carouselService;
        this.spyDataStreams();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.lazyLoadSubscription.unsubscribe();
    }
    /**
     * Defines Observables which service must observe
     * @return {?}
     */
    spyDataStreams() {
        /** @type {?} */
        const initializedCarousel$ = this.carouselService.getInitializedState().pipe(tap(() => {
            /** @type {?} */
            const isLazyLoad = this.carouselService.settings && !this.carouselService.settings.lazyLoad;
            this.carouselService.slidesData.forEach(item => item.load = isLazyLoad ? true : false);
        }));
        /** @type {?} */
        const changeSettings$ = this.carouselService.getChangeState();
        /** @type {?} */
        const resizedCarousel$ = this.carouselService.getResizedState();
        /** @type {?} */
        const lazyLoadMerge$ = merge(initializedCarousel$, changeSettings$, resizedCarousel$).pipe(tap(data => this._defineLazyLoadSlides(data)));
        this.lazyLoadSubscription = lazyLoadMerge$.subscribe(() => { });
    }
    /**
     * @param {?} data
     * @return {?}
     */
    _defineLazyLoadSlides(data) {
        if (!this.carouselService.settings || !this.carouselService.settings.lazyLoad) {
            return;
        }
        if ((data.property && data.property.name === 'position') || data === 'initialized' || data === "resized") {
            /** @type {?} */
            const settings = this.carouselService.settings;
            /** @type {?} */
            const clones = this.carouselService.clones().length;
            /** @type {?} */
            let n = (settings.center && Math.ceil(settings.items / 2) || settings.items);
            /** @type {?} */
            let i = ((settings.center && n * -1) || 0);
            /** @type {?} */
            let position = (data.property && data.property.value !== undefined ? data.property.value : this.carouselService.current()) + i;
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
                    this.carouselService.clones(this.carouselService.relative(position)).forEach(value => this._load(value));
                }
                position++;
            }
        }
    }
    /**
     * Loads all resources of an item at the specified position.
     * @param {?} position - The absolute position of the item.
     * @return {?}
     */
    _load(position) {
        if (this.carouselService.slidesData[position].load) {
            return;
        }
        this.carouselService.slidesData[position].load = true;
    }
}
LazyLoadService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LazyLoadService.ctorParameters = () => [
    { type: CarouselService }
];
if (false) {
    /**
     * Subscrioption to merge Observable  from CarouselService
     * @type {?}
     */
    LazyLoadService.prototype.lazyLoadSubscription;
    /** @type {?} */
    LazyLoadService.prototype.carouselService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eWxvYWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vd2wtY2Fyb3VzZWwtby8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sYXp5bG9hZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRXRELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JDLE1BQU07Ozs7SUFNSixZQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDbEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3ZCOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN6Qzs7Ozs7SUFLRCxjQUFjOztRQUNaLE1BQU0sb0JBQW9CLEdBQXVCLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQzlGLEdBQUcsQ0FBQyxHQUFHLEVBQUU7O1lBQ1AsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDNUYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEYsQ0FBQyxDQUNILENBQUM7O1FBRUYsTUFBTSxlQUFlLEdBQW9CLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxFQUFFLENB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Q0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25ELE1BQU0sQ0FBQztTQUNSO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7OztZQWxGekQsVUFBVTs7OztZQUhGLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdyeGpzL29ic2VydmFibGUvbWVyZ2UnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxTZXJ2aWNlIH0gZnJvbSAnLi9jYXJvdXNlbC5zZXJ2aWNlJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExhenlMb2FkU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBTdWJzY3Jpb3B0aW9uIHRvIG1lcmdlIE9ic2VydmFibGUgIGZyb20gQ2Fyb3VzZWxTZXJ2aWNlXG4gICAqL1xuICBsYXp5TG9hZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Fyb3VzZWxTZXJ2aWNlOiBDYXJvdXNlbFNlcnZpY2UpIHtcbiAgICB0aGlzLnNweURhdGFTdHJlYW1zKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmxhenlMb2FkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyBPYnNlcnZhYmxlcyB3aGljaCBzZXJ2aWNlIG11c3Qgb2JzZXJ2ZVxuICAgKi9cbiAgc3B5RGF0YVN0cmVhbXMoKSB7XG4gICAgY29uc3QgaW5pdGlhbGl6ZWRDYXJvdXNlbCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldEluaXRpYWxpemVkU3RhdGUoKS5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgY29uc3QgaXNMYXp5TG9hZCA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzICYmICF0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5sYXp5TG9hZDtcbiAgICAgICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YS5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5sb2FkID0gaXNMYXp5TG9hZCA/IHRydWUgOiBmYWxzZSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCBjaGFuZ2VTZXR0aW5ncyQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmdldENoYW5nZVN0YXRlKCk7XG5cbiAgICBjb25zdCByZXNpemVkQ2Fyb3VzZWwkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmNhcm91c2VsU2VydmljZS5nZXRSZXNpemVkU3RhdGUoKTtcblxuXG4gICAgY29uc3QgbGF6eUxvYWRNZXJnZSQ6IE9ic2VydmFibGU8c3RyaW5nIHwgYW55PiA9IG1lcmdlKGluaXRpYWxpemVkQ2Fyb3VzZWwkLCBjaGFuZ2VTZXR0aW5ncyQsIHJlc2l6ZWRDYXJvdXNlbCQpLnBpcGUoXG4gICAgICB0YXAoZGF0YSA9PiB0aGlzLl9kZWZpbmVMYXp5TG9hZFNsaWRlcyhkYXRhKSksXG4gICAgICAvLyB0YXAoKCkgPT4gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2VuZENoYW5nZXMoKSlcbiAgICApO1xuICAgIHRoaXMubGF6eUxvYWRTdWJzY3JpcHRpb24gPSBsYXp5TG9hZE1lcmdlJC5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB7fVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9kZWZpbmVMYXp5TG9hZFNsaWRlcyhkYXRhOiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzIHx8ICF0aGlzLmNhcm91c2VsU2VydmljZS5zZXR0aW5ncy5sYXp5TG9hZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICgoZGF0YS5wcm9wZXJ0eSAmJiBkYXRhLnByb3BlcnR5Lm5hbWUgPT09ICdwb3NpdGlvbicpIHx8IGRhdGEgPT09ICdpbml0aWFsaXplZCcgfHwgZGF0YSA9PT0gXCJyZXNpemVkXCIpIHtcbiAgICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MsXG4gICAgICAgICAgICBjbG9uZXMgPSB0aGlzLmNhcm91c2VsU2VydmljZS5jbG9uZXMoKS5sZW5ndGg7XG4gICAgICBsZXQgbiA9IChzZXR0aW5ncy5jZW50ZXIgJiYgTWF0aC5jZWlsKHNldHRpbmdzLml0ZW1zIC8gMikgfHwgc2V0dGluZ3MuaXRlbXMpLFxuICAgICAgICAgIGkgPSAoKHNldHRpbmdzLmNlbnRlciAmJiBuICogLTEpIHx8IDApLFxuICAgICAgICAgIHBvc2l0aW9uID0gKGRhdGEucHJvcGVydHkgJiYgZGF0YS5wcm9wZXJ0eS52YWx1ZSAhPT0gdW5kZWZpbmVkID8gZGF0YS5wcm9wZXJ0eS52YWx1ZSA6IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmN1cnJlbnQoKSkgKyBpO1xuICAgICAgICAvLyBsb2FkID0gJC5wcm94eShmdW5jdGlvbihpLCB2KSB7IHRoaXMubG9hZCh2KSB9LCB0aGlzKTtcbiAgICAgIC8vVE9ETzogTmVlZCBkb2N1bWVudGF0aW9uIGZvciB0aGlzIG5ldyBvcHRpb25cbiAgICAgIGlmIChzZXR0aW5ncy5sYXp5TG9hZEVhZ2VyID4gMCkge1xuICAgICAgICBuICs9IHNldHRpbmdzLmxhenlMb2FkRWFnZXI7XG4gICAgICAgIC8vIElmIHRoZSBjYXJvdXNlbCBpcyBsb29waW5nIGFsc28gcHJlbG9hZCBpbWFnZXMgdGhhdCBhcmUgdG8gdGhlIFwibGVmdFwiXG4gICAgICAgIGlmIChzZXR0aW5ncy5sb29wKSB7XG4gICAgICAgICAgcG9zaXRpb24gLT0gc2V0dGluZ3MubGF6eUxvYWRFYWdlcjtcbiAgICAgICAgICBuKys7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgd2hpbGUgKGkrKyA8IG4pIHtcbiAgICAgICAgdGhpcy5fbG9hZChjbG9uZXMgLyAyICsgdGhpcy5jYXJvdXNlbFNlcnZpY2UucmVsYXRpdmUocG9zaXRpb24pKTtcbiAgICAgICAgaWYgKGNsb25lcykge1xuICAgICAgICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmNsb25lcyh0aGlzLmNhcm91c2VsU2VydmljZS5yZWxhdGl2ZShwb3NpdGlvbikpLmZvckVhY2godmFsdWUgPT4gdGhpcy5fbG9hZCh2YWx1ZSkpO1xuXG4gICAgICAgIH1cbiAgICAgICAgcG9zaXRpb24rKztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcblx0ICogTG9hZHMgYWxsIHJlc291cmNlcyBvZiBhbiBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24uXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiAtIFRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiB0aGUgaXRlbS5cblx0ICovXG4gIHByaXZhdGUgX2xvYWQocG9zaXRpb246IG51bWJlcikge1xuICAgIGlmICh0aGlzLmNhcm91c2VsU2VydmljZS5zbGlkZXNEYXRhW3Bvc2l0aW9uXS5sb2FkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2xpZGVzRGF0YVtwb3NpdGlvbl0ubG9hZCA9IHRydWU7XG4gIH1cbn1cbiJdfQ==