/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// import { Injectable } from '@angular/core';
// function _window(): any {
//    // return the global native browser window object
//    return window;
// }
// @Injectable()
// export class WindowRefService {
//    get nativeWindow(): any {
//       return _window();
//    }
// }
import { isPlatformBrowser } from '@angular/common';
import { InjectionToken, PLATFORM_ID } from '@angular/core';
/** *
 * Create a new injection token for injecting the window into a component.
  @type {?} */
export const WINDOW = new InjectionToken('WindowToken');
/**
 * Define abstract class for obtaining reference to the global window object.
 * @abstract
 */
export class WindowRef {
    /**
     * @return {?}
     */
    get nativeWindow() {
        throw new Error('Not implemented.');
    }
}
/**
 * Define class that implements the abstract class and returns the native window object.
 */
export class BrowserWindowRef extends WindowRef {
    constructor() {
        super();
    }
    /**
     * @return {?} window object
     */
    get nativeWindow() {
        return window;
    }
}
/**
 * Create an factory function that returns the native window object.
 * @param {?} browserWindowRef Native window object
 * @param {?} platformId id of platform
 * @return {?} type of platform of empty object
 */
export function windowFactory(browserWindowRef, platformId) {
    if (isPlatformBrowser(platformId)) {
        return browserWindowRef.nativeWindow;
    }
    return new Object();
}
/** *
 * Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class.
  @type {?} */
export const browserWindowProvider = {
    provide: WindowRef,
    useClass: BrowserWindowRef
};
/** *
 * Create an injectable provider that uses the windowFactory function for returning the native window object.
  @type {?} */
export const windowProvider = {
    provide: WINDOW,
    useFactory: windowFactory,
    deps: [WindowRef, PLATFORM_ID]
};
/** *
 * Create an array of providers.
  @type {?} */
export const WINDOW_PROVIDERS = [browserWindowProvider, windowProvider];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LXJlZi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3dpbmRvdy1yZWYuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFZQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBR0wsY0FBYyxFQUNkLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQzs7OztBQUt2QixhQUFhLE1BQU0sR0FBRyxJQUFJLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7Ozs7QUFLeEQsTUFBTTs7OztJQUNKLElBQUksWUFBWTtRQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztLQUNyQztDQUNGOzs7O0FBS0QsTUFBTSx1QkFBd0IsU0FBUSxTQUFTO0lBQzdDO1FBQ0UsS0FBSyxFQUFFLENBQUM7S0FDVDs7OztJQUtELElBQUksWUFBWTtRQUNkLE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDZjtDQUNGOzs7Ozs7O0FBUUQsTUFBTSx3QkFDSixnQkFBa0MsRUFDbEMsVUFBa0I7SUFFbEIsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7S0FDdEM7SUFDRCxNQUFNLENBQUMsSUFBSSxNQUFNLEVBQUUsQ0FBQztDQUNyQjs7OztBQUtELGFBQWEscUJBQXFCLEdBQWtCO0lBQ2xELE9BQU8sRUFBRSxTQUFTO0lBQ2xCLFFBQVEsRUFBRSxnQkFBZ0I7Q0FDM0IsQ0FBQzs7OztBQUtGLGFBQWEsY0FBYyxHQUFvQjtJQUM3QyxPQUFPLEVBQUUsTUFBTTtJQUNmLFVBQVUsRUFBRSxhQUFhO0lBQ3pCLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7Q0FDL0IsQ0FBQzs7OztBQUtGLGFBQWEsZ0JBQWdCLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxjQUFjLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIGZ1bmN0aW9uIF93aW5kb3coKTogYW55IHtcbi8vICAgIC8vIHJldHVybiB0aGUgZ2xvYmFsIG5hdGl2ZSBicm93c2VyIHdpbmRvdyBvYmplY3Rcbi8vICAgIHJldHVybiB3aW5kb3c7XG4vLyB9XG4vLyBASW5qZWN0YWJsZSgpXG4vLyBleHBvcnQgY2xhc3MgV2luZG93UmVmU2VydmljZSB7XG4vLyAgICBnZXQgbmF0aXZlV2luZG93KCk6IGFueSB7XG4vLyAgICAgICByZXR1cm4gX3dpbmRvdygpO1xuLy8gICAgfVxuLy8gfVxuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDbGFzc1Byb3ZpZGVyLFxuICBGYWN0b3J5UHJvdmlkZXIsXG4gIEluamVjdGlvblRva2VuLFxuICBQTEFURk9STV9JRFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5qZWN0aW9uIHRva2VuIGZvciBpbmplY3RpbmcgdGhlIHdpbmRvdyBpbnRvIGEgY29tcG9uZW50LlxuICovXG5leHBvcnQgY29uc3QgV0lORE9XID0gbmV3IEluamVjdGlvblRva2VuKCdXaW5kb3dUb2tlbicpO1xuXG4vKipcbiAqIERlZmluZSBhYnN0cmFjdCBjbGFzcyBmb3Igb2J0YWluaW5nIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIHdpbmRvdyBvYmplY3QuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXaW5kb3dSZWYge1xuICBnZXQgbmF0aXZlV2luZG93KCk6IFdpbmRvdyB8IE9iamVjdCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQuJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZpbmUgY2xhc3MgdGhhdCBpbXBsZW1lbnRzIHRoZSBhYnN0cmFjdCBjbGFzcyBhbmQgcmV0dXJucyB0aGUgbmF0aXZlIHdpbmRvdyBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBCcm93c2VyV2luZG93UmVmIGV4dGVuZHMgV2luZG93UmVmIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB3aW5kb3cgb2JqZWN0XG4gICAqL1xuICBnZXQgbmF0aXZlV2luZG93KCk6IFdpbmRvdyB8IE9iamVjdCB7XG4gICAgcmV0dXJuIHdpbmRvdztcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBmYWN0b3J5IGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbmF0aXZlIHdpbmRvdyBvYmplY3QuXG4gKiBAcGFyYW0gYnJvd3NlcldpbmRvd1JlZiBOYXRpdmUgd2luZG93IG9iamVjdFxuICogQHBhcmFtIHBsYXRmb3JtSWQgaWQgb2YgcGxhdGZvcm1cbiAqIEByZXR1cm5zIHR5cGUgb2YgcGxhdGZvcm0gb2YgZW1wdHkgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dGYWN0b3J5KFxuICBicm93c2VyV2luZG93UmVmOiBCcm93c2VyV2luZG93UmVmLFxuICBwbGF0Zm9ybUlkOiBPYmplY3Rcbik6IFdpbmRvdyB8IE9iamVjdCB7XG4gIGlmIChpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKSkge1xuICAgIHJldHVybiBicm93c2VyV2luZG93UmVmLm5hdGl2ZVdpbmRvdztcbiAgfVxuICByZXR1cm4gbmV3IE9iamVjdCgpO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGluamVjdGFibGUgcHJvdmlkZXIgZm9yIHRoZSBXaW5kb3dSZWYgdG9rZW4gdGhhdCB1c2VzIHRoZSBCcm93c2VyV2luZG93UmVmIGNsYXNzLlxuICovXG5leHBvcnQgY29uc3QgYnJvd3NlcldpbmRvd1Byb3ZpZGVyOiBDbGFzc1Byb3ZpZGVyID0ge1xuICBwcm92aWRlOiBXaW5kb3dSZWYsXG4gIHVzZUNsYXNzOiBCcm93c2VyV2luZG93UmVmXG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbmplY3RhYmxlIHByb3ZpZGVyIHRoYXQgdXNlcyB0aGUgd2luZG93RmFjdG9yeSBmdW5jdGlvbiBmb3IgcmV0dXJuaW5nIHRoZSBuYXRpdmUgd2luZG93IG9iamVjdC5cbiAqL1xuZXhwb3J0IGNvbnN0IHdpbmRvd1Byb3ZpZGVyOiBGYWN0b3J5UHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IFdJTkRPVyxcbiAgdXNlRmFjdG9yeTogd2luZG93RmFjdG9yeSxcbiAgZGVwczogW1dpbmRvd1JlZiwgUExBVEZPUk1fSURdXG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbiBhcnJheSBvZiBwcm92aWRlcnMuXG4gKi9cbmV4cG9ydCBjb25zdCBXSU5ET1dfUFJPVklERVJTID0gW2Jyb3dzZXJXaW5kb3dQcm92aWRlciwgd2luZG93UHJvdmlkZXJdO1xuIl19