/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, NgZone, ElementRef, HostListener, Renderer2, Input } from '@angular/core';
import { CarouselService } from '../../services/carousel.service';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { StageData } from '../../models/stage-data.model';
import { AnimateService } from '../../services/animate.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
export class StageComponent {
    /**
     * @param {?} zone
     * @param {?} el
     * @param {?} renderer
     * @param {?} carouselService
     * @param {?} animateService
     */
    constructor(zone, el, renderer, carouselService, animateService) {
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
        this._oneDragMove$ = new Subject();
        /**
         * Passes this to _oneMouseTouchMove();
         */
        this.bindOneMouseTouchMove = (ev) => {
            this._oneMouseTouchMove(ev);
        };
        /**
         * Passes this to _onDragMove();
         */
        this.bindOnDragMove = (ev) => {
            this._onDragMove(ev);
        };
        /**
         * Passes this to _onDragMove();
         */
        this.bindOnDragEnd = (ev) => {
            // this.zone.run(() => {
            this._onDragEnd(ev);
            // });
        };
        /**
         * Attaches handler for 'click' event on any element in .owl-stage in order to prevent dragging when moving of cursor is less than 3px
         */
        this._oneClickHandler = () => {
            this.listenerOneClick = this.renderer.listen(this._drag.target, 'click', () => false);
            this.listenerOneClick();
        };
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseDown(event) {
        if (this.owlDraggable.isMouseDragable) {
            this._onDragStart(event);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTouchStart(event) {
        if (this.owlDraggable.isTouchDragable) {
            this._onDragStart(event);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTouchCancel(event) {
        this._onDragEnd(event);
    }
    /**
     * @return {?}
     */
    onDragStart() {
        if (this.owlDraggable.isMouseDragable) {
            return false;
        }
    }
    /**
     * @return {?}
     */
    onSelectStart() {
        if (this.owlDraggable.isMouseDragable) {
            return false;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._oneMoveSubsription = this._oneDragMove$
            .pipe(first())
            .subscribe(() => {
            this._sendChanges();
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._oneMoveSubsription.unsubscribe();
    }
    /**
     * Handles `touchstart` and `mousedown` events.
     * \@todo Horizontal swipe threshold as option
     * \@todo #261
     * @param {?} event - The event arguments.
     * @return {?}
     */
    _onDragStart(event) {
        /** @type {?} */
        let stage = null;
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
        this.zone.runOutsideAngular(() => {
            this.listenerOneMouseMove = this.renderer.listen(document, 'mousemove', this.bindOneMouseTouchMove);
            this.listenerOneTouchMove = this.renderer.listen(document, 'touchmove', this.bindOneMouseTouchMove);
        });
    }
    /**
     * Attaches listeners to `touchmove` and `mousemove` events; initiates updating carousel after starting dragging
     * @param {?} event event objech of mouse or touch event
     * @return {?}
     */
    _oneMouseTouchMove(event) {
        if (!this._drag.active)
            return false;
        /** @type {?} */
        const delta = this._difference(this._drag.pointer, this._pointer(event));
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
    }
    /**
     * Handles the `touchmove` and `mousemove` events.
     * \@todo #261
     * @param {?} event - The event arguments.
     * @return {?}
     */
    _onDragMove(event) {
        if (!this._drag.active)
            return false;
        /** @type {?} */
        let stage;
        /** @type {?} */
        const stageOrExit = this.carouselService.defineNewCoordsDrag(event, this._drag);
        if (stageOrExit === false) {
            return;
        }
        stage = /** @type {?} */ (stageOrExit);
        event.preventDefault();
        this._drag.stage.current = stage;
        this._animate(stage.x - this._drag.stage.start.x);
    }
    ;
    /**
     * Moves .owl-stage left-right
     * @param {?} coordinate coordinate to be set to .owl-stage
     * @return {?}
     */
    _animate(coordinate) {
        this.renderer.setStyle(this.el.nativeElement.children[0], 'transform', `translate3d(${coordinate}px,0px,0px`);
        this.renderer.setStyle(this.el.nativeElement.children[0], 'transition', '0s');
    }
    /**
     * Handles the `touchend` and `mouseup` events.
     * \@todo #261
     * \@todo Threshold for click event
     * @param {?} event - The event arguments.
     * @return {?}
     */
    _onDragEnd(event) {
        this.carouselService.owlDOMData.isGrab = false;
        if (this._drag.moving) {
            this.renderer.setStyle(this.el.nativeElement.children[0], 'transform', ``);
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
    }
    ;
    /**
     * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
     * @param {?} event - The event arguments.
     * @return {?} stage - object with 'x' and 'y' coordinates of .owl-stage
     */
    _prepareDragging(event) {
        return this.carouselService.prepareDragging(event);
    }
    /**
     * Finishes dragging
     * @param {?} event object event of 'mouseUp' of 'touchend' events
     * @return {?}
     */
    _finishDragging(event) {
        this.carouselService.finishDragging(event, this._drag, this._oneClickHandler);
    }
    /**
     * Gets unified pointer coordinates from event.
     * @param {?} event The `mousedown` or `touchstart` event.
     * @return {?} Contains `x` and `y` coordinates of current pointer position.
     */
    _pointer(event) {
        return this.carouselService.pointer(event);
    }
    /**
     * Gets the difference of two vectors.
     * @param {?} firstC
     * @param {?} second
     * @return {?} The difference.
     */
    _difference(firstC, second) {
        return this.carouselService.difference(firstC, second);
    }
    /**
     * Checks whether the carousel is in a specific state or not.
     * @param {?} state The state to check.
     * @return {?} The flag which indicates if the carousel is busy.
     */
    _is(state) {
        return this.carouselService.is(state);
    }
    /**
     * Enters a state.
     * @param {?} name The state name.
     * @return {?}
     */
    _enter(name) {
        this.carouselService.enter(name);
    }
    /**
     * Sends all data needed for View.
     * @return {?}
     */
    _sendChanges() {
        this.carouselService.sendChanges();
    }
    /**
     * Handler for transitioend event
     * @return {?}
     */
    onTransitionEnd() {
        this.carouselService.onTransitionEnd();
    }
    /**
     * Enters into a 'dragging' state
     * @return {?}
     */
    _enterDragging() {
        this.carouselService.enterDragging();
    }
    /**
     * Handles the end of 'animationend' event
     * @param {?} id Id of slides
     * @return {?}
     */
    clear(id) {
        this.animateService.clear(id);
    }
}
StageComponent.decorators = [
    { type: Component, args: [{
                selector: 'owl-stage',
                template: `
    <div>
      <div class="owl-stage" [ngStyle]="{'width': stageData.width + 'px',
                                        'transform': stageData.transform,
                                        'transition': stageData.transition,
                                        'padding-left': stageData.paddingL + 'px',
                                        'padding-right': stageData.paddingR + 'px' }"
          (transitionend)="onTransitionEnd()">
        <ng-container *ngFor="let slide of slidesData; let i = index">
          <div class="owl-item" [ngClass]="slide.classes"
                                [ngStyle]="{'width': slide.width + 'px',
                                            'margin-left': slide.marginL + 'px',
                                            'margin-right': slide.marginR + 'px',
                                            'left': slide.left}"
                                (animationend)="clear(slide.id)"
                                [@autoHeight]="slide.heightState">
            <ng-template *ngIf="slide.load" [ngTemplateOutlet]="slide.tplRef"></ng-template>
          </div><!-- /.owl-item -->
        </ng-container>
      </div><!-- /.owl-stage -->
    </div>
  `,
                animations: [
                    trigger('autoHeight', [
                        state('nulled', style({ height: 0 })),
                        state('full', style({ height: '*' })),
                        transition('full => nulled', [
                            // style({height: '*'}),
                            animate('700ms 350ms')
                        ]),
                        transition('nulled => full', [
                            // style({height: 0}),
                            animate(350)
                        ]),
                    ])
                ]
            }] }
];
/** @nocollapse */
StageComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: Renderer2 },
    { type: CarouselService },
    { type: AnimateService }
];
StageComponent.propDecorators = {
    owlDraggable: [{ type: Input }],
    stageData: [{ type: Input }],
    slidesData: [{ type: Input }],
    onMouseDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
    onTouchStart: [{ type: HostListener, args: ['touchstart', ['$event'],] }],
    onTouchCancel: [{ type: HostListener, args: ['touchcancel', ['$event'],] }],
    onDragStart: [{ type: HostListener, args: ['dragstart',] }],
    onSelectStart: [{ type: HostListener, args: ['selectstart',] }]
};
if (false) {
    /**
     * Object with settings which make carousel draggable by touch or mouse
     * @type {?}
     */
    StageComponent.prototype.owlDraggable;
    /**
     * Data of owl-stage
     * @type {?}
     */
    StageComponent.prototype.stageData;
    /**
     *  Data of every slide
     * @type {?}
     */
    StageComponent.prototype.slidesData;
    /**
     * Function wich will be returned after attaching listener to 'mousemove' event
     * @type {?}
     */
    StageComponent.prototype.listenerMouseMove;
    /**
     * Function wich will be returned after attaching listener to 'touchmove' event
     * @type {?}
     */
    StageComponent.prototype.listenerTouchMove;
    /**
     * Function wich will be returned after attaching listener to 'mousemove' event
     * @type {?}
     */
    StageComponent.prototype.listenerOneMouseMove;
    /**
     * Function wich will be returned after attaching listener to 'touchmove' event
     * @type {?}
     */
    StageComponent.prototype.listenerOneTouchMove;
    /**
     * Function wich will be returned after attaching listener to 'mouseup' event
     * @type {?}
     */
    StageComponent.prototype.listenerMouseUp;
    /**
     * Function wich will be returned after attaching listener to 'touchend' event
     * @type {?}
     */
    StageComponent.prototype.listenerTouchEnd;
    /**
     * Function wich will be returned after attaching listener to 'click' event
     * @type {?}
     */
    StageComponent.prototype.listenerOneClick;
    /**
     * Object with data needed for dragging
     * @type {?}
     */
    StageComponent.prototype._drag;
    /**
     * Subject for notification when the carousel's rebuilding caused by resize event starts
     * @type {?}
     */
    StageComponent.prototype._oneDragMove$;
    /**
     * Subsctiption to _oneDragMove$ Subject
     * @type {?}
     */
    StageComponent.prototype._oneMoveSubsription;
    /**
     * Passes this to _oneMouseTouchMove();
     * @type {?}
     */
    StageComponent.prototype.bindOneMouseTouchMove;
    /**
     * Passes this to _onDragMove();
     * @type {?}
     */
    StageComponent.prototype.bindOnDragMove;
    /**
     * Passes this to _onDragMove();
     * @type {?}
     */
    StageComponent.prototype.bindOnDragEnd;
    /**
     * Attaches handler for 'click' event on any element in .owl-stage in order to prevent dragging when moving of cursor is less than 3px
     * @type {?}
     */
    StageComponent.prototype._oneClickHandler;
    /** @type {?} */
    StageComponent.prototype.zone;
    /** @type {?} */
    StageComponent.prototype.el;
    /** @type {?} */
    StageComponent.prototype.renderer;
    /** @type {?} */
    StageComponent.prototype.carouselService;
    /** @type {?} */
    StageComponent.prototype.animateService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW93bC1jYXJvdXNlbC1vLyIsInNvdXJjZXMiOlsibGliL2Nhcm91c2VsL3N0YWdlL3N0YWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQUUsZUFBZSxFQUFVLE1BQU0saUNBQWlDLENBQUM7QUFDMUUsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDaEUsT0FBTyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLE9BQU8sRUFDUCxVQUFVLEVBQ1gsTUFBTSxxQkFBcUIsQ0FBQztBQXdDN0IsTUFBTTs7Ozs7Ozs7SUE0RUosWUFBb0IsSUFBWSxFQUNaLElBQ0EsVUFDQSxpQkFDQTtRQUpBLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixPQUFFLEdBQUYsRUFBRTtRQUNGLGFBQVEsR0FBUixRQUFRO1FBQ1Isb0JBQWUsR0FBZixlQUFlO1FBQ2YsbUJBQWMsR0FBZCxjQUFjOzs7O3FCQTNCYjtZQUNuQixJQUFJLEVBQUUsSUFBSTtZQUNWLE1BQU0sRUFBRSxJQUFJO1lBQ1osT0FBTyxFQUFFLElBQUk7WUFDYixLQUFLLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsT0FBTyxFQUFFLElBQUk7YUFDZDtZQUNELFNBQVMsRUFBRSxJQUFJO1lBQ2YsTUFBTSxFQUFFLEtBQUs7WUFDYixNQUFNLEVBQUUs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NEJBTXJDLFlBQVksU0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUM7MEJBSXRDLFlBQVksU0FBQyxXQUFXOzRCQU14QixZQUFZLFNBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgTmdab25lLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIFJlbmRlcmVyMiwgT25Jbml0LCBPbkRlc3Ryb3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXJvdXNlbFNlcnZpY2UsIENvb3JkcyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Nhcm91c2VsLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN0YWdlRGF0YSB9IGZyb20gJy4uLy4uL21vZGVscy9zdGFnZS1kYXRhLm1vZGVsJztcbmltcG9ydCB7IFNsaWRlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvc2xpZGUubW9kZWwnO1xuaW1wb3J0IHsgQW5pbWF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbmltYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgdHJpZ2dlcixcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICBhbmltYXRlLFxuICB0cmFuc2l0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnb3dsLXN0YWdlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm93bC1zdGFnZVwiIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiBzdGFnZURhdGEud2lkdGggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nOiBzdGFnZURhdGEudHJhbnNmb3JtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uJzogc3RhZ2VEYXRhLnRyYW5zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctbGVmdCc6IHN0YWdlRGF0YS5wYWRkaW5nTCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctcmlnaHQnOiBzdGFnZURhdGEucGFkZGluZ1IgKyAncHgnIH1cIlxuICAgICAgICAgICh0cmFuc2l0aW9uZW5kKT1cIm9uVHJhbnNpdGlvbkVuZCgpXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHNsaWRlIG9mIHNsaWRlc0RhdGE7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwib3dsLWl0ZW1cIiBbbmdDbGFzc109XCJzbGlkZS5jbGFzc2VzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwieyd3aWR0aCc6IHNsaWRlLndpZHRoICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi1sZWZ0Jzogc2xpZGUubWFyZ2luTCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYXJnaW4tcmlnaHQnOiBzbGlkZS5tYXJnaW5SICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiBzbGlkZS5sZWZ0fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhbmltYXRpb25lbmQpPVwiY2xlYXIoc2xpZGUuaWQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW0BhdXRvSGVpZ2h0XT1cInNsaWRlLmhlaWdodFN0YXRlXCI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nSWY9XCJzbGlkZS5sb2FkXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwic2xpZGUudHBsUmVmXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L2Rpdj48IS0tIC8ub3dsLWl0ZW0gLS0+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+PCEtLSAvLm93bC1zdGFnZSAtLT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2F1dG9IZWlnaHQnLCBbXG4gICAgICBzdGF0ZSgnbnVsbGVkJywgc3R5bGUoe2hlaWdodDogMH0pKSxcbiAgICAgIHN0YXRlKCdmdWxsJywgc3R5bGUoe2hlaWdodDogJyonfSkpLFxuICAgICAgdHJhbnNpdGlvbignZnVsbCA9PiBudWxsZWQnLCBbXG4gICAgICAgIC8vIHN0eWxlKHtoZWlnaHQ6ICcqJ30pLFxuICAgICAgICBhbmltYXRlKCc3MDBtcyAzNTBtcycpXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJ251bGxlZCA9PiBmdWxsJywgW1xuICAgICAgICAvLyBzdHlsZSh7aGVpZ2h0OiAwfSksXG4gICAgICAgIGFuaW1hdGUoMzUwKVxuICAgICAgXSksXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIE9iamVjdCB3aXRoIHNldHRpbmdzIHdoaWNoIG1ha2UgY2Fyb3VzZWwgZHJhZ2dhYmxlIGJ5IHRvdWNoIG9yIG1vdXNlXG4gICAqL1xuICBASW5wdXQoKSBvd2xEcmFnZ2FibGU6IHtcbiAgICBpc01vdXNlRHJhZ2FibGU6IGJvb2xlYW4sXG4gICAgaXNUb3VjaERyYWdhYmxlOiBib29sZWFuXG4gIH07XG5cbiAgLyoqXG4gICAqIERhdGEgb2Ygb3dsLXN0YWdlXG4gICAqL1xuICBASW5wdXQoKSBzdGFnZURhdGE6IFN0YWdlRGF0YTtcblxuXHQvKipcblx0ICogIERhdGEgb2YgZXZlcnkgc2xpZGVcblx0ICovXG4gIEBJbnB1dCgpIHNsaWRlc0RhdGE6IFNsaWRlTW9kZWxbXTtcblxuICAvKipcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAnbW91c2Vtb3ZlJyBldmVudFxuICAgKi9cbiAgbGlzdGVuZXJNb3VzZU1vdmU6ICgpID0+IHZvaWQ7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICd0b3VjaG1vdmUnIGV2ZW50XG4gICAqL1xuICBsaXN0ZW5lclRvdWNoTW92ZTogKCkgPT4gdm9pZDtcbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ21vdXNlbW92ZScgZXZlbnRcbiAgICovXG4gIGxpc3RlbmVyT25lTW91c2VNb3ZlOiAoKSA9PiB2b2lkO1xuICAvKipcbiAgICogRnVuY3Rpb24gd2ljaCB3aWxsIGJlIHJldHVybmVkIGFmdGVyIGF0dGFjaGluZyBsaXN0ZW5lciB0byAndG91Y2htb3ZlJyBldmVudFxuICAgKi9cbiAgbGlzdGVuZXJPbmVUb3VjaE1vdmU6ICgpID0+IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ21vdXNldXAnIGV2ZW50XG4gICAqL1xuICBsaXN0ZW5lck1vdXNlVXA6ICgpID0+IHZvaWQ7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiB3aWNoIHdpbGwgYmUgcmV0dXJuZWQgYWZ0ZXIgYXR0YWNoaW5nIGxpc3RlbmVyIHRvICd0b3VjaGVuZCcgZXZlbnRcbiAgICovXG4gIGxpc3RlbmVyVG91Y2hFbmQ6ICgpID0+IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHdpY2ggd2lsbCBiZSByZXR1cm5lZCBhZnRlciBhdHRhY2hpbmcgbGlzdGVuZXIgdG8gJ2NsaWNrJyBldmVudFxuICAgKi9cbiAgbGlzdGVuZXJPbmVDbGljazogKCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogT2JqZWN0IHdpdGggZGF0YSBuZWVkZWQgZm9yIGRyYWdnaW5nXG4gICAqL1xuICBwcml2YXRlIF9kcmFnOiBhbnkgPSB7XG4gICAgdGltZTogbnVsbCxcbiAgICB0YXJnZXQ6IG51bGwsXG4gICAgcG9pbnRlcjogbnVsbCxcbiAgICBzdGFnZToge1xuICAgICAgc3RhcnQ6IG51bGwsXG4gICAgICBjdXJyZW50OiBudWxsXG4gICAgfSxcbiAgICBkaXJlY3Rpb246IG51bGwsXG4gICAgYWN0aXZlOiBmYWxzZSxcbiAgICBtb3Zpbmc6IGZhbHNlXG4gIH07XG5cbiAgLyoqXG4gICAqIFN1YmplY3QgZm9yIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBjYXJvdXNlbCdzIHJlYnVpbGRpbmcgY2F1c2VkIGJ5IHJlc2l6ZSBldmVudCBzdGFydHNcbiAgICovXG4gIHByaXZhdGUgX29uZURyYWdNb3ZlJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAvKipcbiAgICogU3Vic2N0aXB0aW9uIHRvIF9vbmVEcmFnTW92ZSQgU3ViamVjdFxuICAgKi9cbiAgcHJpdmF0ZSBfb25lTW92ZVN1YnNyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjYXJvdXNlbFNlcnZpY2U6IENhcm91c2VsU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhbmltYXRlU2VydmljZTogQW5pbWF0ZVNlcnZpY2UpIHsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pIG9uTW91c2VEb3duKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzTW91c2VEcmFnYWJsZSkge1xuICAgICAgdGhpcy5fb25EcmFnU3RhcnQoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBbJyRldmVudCddKSBvblRvdWNoU3RhcnQoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5vd2xEcmFnZ2FibGUuaXNUb3VjaERyYWdhYmxlKSB7XG4gICAgICB0aGlzLl9vbkRyYWdTdGFydChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCBbJyRldmVudCddKSBvblRvdWNoQ2FuY2VsKGV2ZW50KSB7XG4gICAgdGhpcy5fb25EcmFnRW5kKGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdzdGFydCcpIG9uRHJhZ1N0YXJ0KCkge1xuICAgIGlmICh0aGlzLm93bERyYWdnYWJsZS5pc01vdXNlRHJhZ2FibGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdzZWxlY3RzdGFydCcpIG9uU2VsZWN0U3RhcnQoKSB7XG4gICAgaWYgKHRoaXMub3dsRHJhZ2dhYmxlLmlzTW91c2VEcmFnYWJsZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX29uZU1vdmVTdWJzcmlwdGlvbiA9IHRoaXMuX29uZURyYWdNb3ZlJFxuICAgICAgLnBpcGUoZmlyc3QoKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl9zZW5kQ2hhbmdlcygpO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9vbmVNb3ZlU3Vic3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXNzZXMgdGhpcyB0byBfb25lTW91c2VUb3VjaE1vdmUoKTtcbiAgICovXG4gIGJpbmRPbmVNb3VzZVRvdWNoTW92ZSA9IChldikgPT4ge1xuICAgIHRoaXMuX29uZU1vdXNlVG91Y2hNb3ZlKGV2KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXNzZXMgdGhpcyB0byBfb25EcmFnTW92ZSgpO1xuICAgKi9cbiAgYmluZE9uRHJhZ01vdmUgPSAoZXYpID0+IHtcbiAgICB0aGlzLl9vbkRyYWdNb3ZlKGV2KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXNzZXMgdGhpcyB0byBfb25EcmFnTW92ZSgpO1xuICAgKi9cbiAgYmluZE9uRHJhZ0VuZCA9IChldikgPT4ge1xuICAgIC8vIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgdGhpcy5fb25EcmFnRW5kKGV2KTtcbiAgICAvLyB9KTtcbiAgfVxuXG4gIC8qKlxuXHQgKiBIYW5kbGVzIGB0b3VjaHN0YXJ0YCBhbmQgYG1vdXNlZG93bmAgZXZlbnRzLlxuXHQgKiBAdG9kbyBIb3Jpem9udGFsIHN3aXBlIHRocmVzaG9sZCBhcyBvcHRpb25cblx0ICogQHRvZG8gIzI2MVxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxuXHQgKi9cblx0cHJpdmF0ZSBfb25EcmFnU3RhcnQoZXZlbnQpOiBhbnkge1xuXHRcdGxldCBzdGFnZTogQ29vcmRzID0gbnVsbDtcblxuXHRcdGlmIChldmVudC53aGljaCA9PT0gMykge1xuXHRcdFx0cmV0dXJuO1xuICAgIH1cblxuICAgIHN0YWdlID0gdGhpcy5fcHJlcGFyZURyYWdnaW5nKGV2ZW50KTtcblxuXHRcdHRoaXMuX2RyYWcudGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHRcdHRoaXMuX2RyYWcudGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXHRcdHRoaXMuX2RyYWcuc3RhZ2Uuc3RhcnQgPSBzdGFnZTtcblx0XHR0aGlzLl9kcmFnLnN0YWdlLmN1cnJlbnQgPSBzdGFnZTtcbiAgICB0aGlzLl9kcmFnLnBvaW50ZXIgPSB0aGlzLl9wb2ludGVyKGV2ZW50KTtcbiAgICB0aGlzLl9kcmFnLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLmxpc3RlbmVyTW91c2VVcCA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAnbW91c2V1cCcsIHRoaXMuYmluZE9uRHJhZ0VuZCk7XG4gICAgdGhpcy5saXN0ZW5lclRvdWNoRW5kID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICd0b3VjaGVuZCcsIHRoaXMuYmluZE9uRHJhZ0VuZCk7XG5cbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5saXN0ZW5lck9uZU1vdXNlTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5iaW5kT25lTW91c2VUb3VjaE1vdmUpO1xuICAgICAgdGhpcy5saXN0ZW5lck9uZVRvdWNoTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5iaW5kT25lTW91c2VUb3VjaE1vdmUpO1xuICAgIH0pO1xuXG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgbGlzdGVuZXJzIHRvIGB0b3VjaG1vdmVgIGFuZCBgbW91c2Vtb3ZlYCBldmVudHM7IGluaXRpYXRlcyB1cGRhdGluZyBjYXJvdXNlbCBhZnRlciBzdGFydGluZyBkcmFnZ2luZ1xuICAgKiBAcGFyYW0gZXZlbnQgZXZlbnQgb2JqZWNoIG9mIG1vdXNlIG9yIHRvdWNoIGV2ZW50XG4gICAqL1xuICBwcml2YXRlIF9vbmVNb3VzZVRvdWNoTW92ZShldmVudCkge1xuICAgIGlmICghdGhpcy5fZHJhZy5hY3RpdmUpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBkZWx0YSA9IHRoaXMuX2RpZmZlcmVuY2UodGhpcy5fZHJhZy5wb2ludGVyLCB0aGlzLl9wb2ludGVyKGV2ZW50KSk7XG5cbiAgICB0aGlzLmxpc3RlbmVyT25lTW91c2VNb3ZlKCk7XG4gICAgdGhpcy5saXN0ZW5lck9uZVRvdWNoTW92ZSgpO1xuXG4gICAgaWYgKE1hdGguYWJzKGRlbHRhLngpIDwgTWF0aC5hYnMoZGVsdGEueSkgJiYgdGhpcy5faXMoJ3ZhbGlkJykpIHtcbiAgICAgIHRoaXMuX2RyYWcuYWN0aXZlID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2RyYWcubW92aW5nID0gdHJ1ZTtcblxuICAgIHRoaXMubGlzdGVuZXJNb3VzZU1vdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ21vdXNlbW92ZScsIHRoaXMuYmluZE9uRHJhZ01vdmUpO1xuICAgIHRoaXMubGlzdGVuZXJUb3VjaE1vdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuYmluZE9uRHJhZ01vdmUpO1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHRoaXMuX2VudGVyRHJhZ2dpbmcoKTtcbiAgICB0aGlzLl9vbmVEcmFnTW92ZSQubmV4dChldmVudCk7XG4gICAgLy8gdGhpcy5fc2VuZENoYW5nZXMoKTtcbiAgfVxuXG4gIFx0LyoqXG5cdCAqIEhhbmRsZXMgdGhlIGB0b3VjaG1vdmVgIGFuZCBgbW91c2Vtb3ZlYCBldmVudHMuXG5cdCAqIEB0b2RvICMyNjFcblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cblx0ICovXG5cdHByaXZhdGUgX29uRHJhZ01vdmUoZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuX2RyYWcuYWN0aXZlKSByZXR1cm4gZmFsc2U7XG5cbiAgICBsZXQgc3RhZ2U6IENvb3JkcztcbiAgICBjb25zdCBzdGFnZU9yRXhpdDogYm9vbGVhbiB8IENvb3JkcyA9IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmRlZmluZU5ld0Nvb3Jkc0RyYWcoZXZlbnQsIHRoaXMuX2RyYWcpO1xuXG4gICAgaWYgKHN0YWdlT3JFeGl0ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzdGFnZSA9IHN0YWdlT3JFeGl0IGFzIENvb3JkcztcblxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0aGlzLl9kcmFnLnN0YWdlLmN1cnJlbnQgPSBzdGFnZTtcblx0XHR0aGlzLl9hbmltYXRlKHN0YWdlLnggLSB0aGlzLl9kcmFnLnN0YWdlLnN0YXJ0LngpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBNb3ZlcyAub3dsLXN0YWdlIGxlZnQtcmlnaHRcbiAgICogQHBhcmFtIGNvb3JkaW5hdGUgY29vcmRpbmF0ZSB0byBiZSBzZXQgdG8gLm93bC1zdGFnZVxuICAgKi9cbiAgcHJpdmF0ZSBfYW5pbWF0ZShjb29yZGluYXRlOiBudW1iZXIpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUzZCgke2Nvb3JkaW5hdGV9cHgsMHB4LDBweGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCAndHJhbnNpdGlvbicsICcwcycpO1xuICB9XG5cbiAgLyoqXG5cdCAqIEhhbmRsZXMgdGhlIGB0b3VjaGVuZGAgYW5kIGBtb3VzZXVwYCBldmVudHMuXG5cdCAqIEB0b2RvICMyNjFcblx0ICogQHRvZG8gVGhyZXNob2xkIGZvciBjbGljayBldmVudFxuXHQgKiBAcGFyYW0gZXZlbnQgLSBUaGUgZXZlbnQgYXJndW1lbnRzLlxuXHQgKi9cblx0cHJpdmF0ZSBfb25EcmFnRW5kKGV2ZW50KSB7XG4gICAgdGhpcy5jYXJvdXNlbFNlcnZpY2Uub3dsRE9NRGF0YS5pc0dyYWIgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLl9kcmFnLm1vdmluZykge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICd0cmFuc2Zvcm0nLCBgYCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3RyYW5zaXRpb24nLCB0aGlzLmNhcm91c2VsU2VydmljZS5zcGVlZCgrdGhpcy5jYXJvdXNlbFNlcnZpY2Uuc2V0dGluZ3MuZHJhZ0VuZFNwZWVkIHx8IHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnNldHRpbmdzLnNtYXJ0U3BlZWQpLzEwMDAgKydzJyk7XG5cbiAgICAgIHRoaXMuX2ZpbmlzaERyYWdnaW5nKGV2ZW50KTtcbiAgICAgIHRoaXMubGlzdGVuZXJNb3VzZU1vdmUoKTtcbiAgICAgIHRoaXMubGlzdGVuZXJUb3VjaE1vdmUoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kcmFnID0ge1xuICAgICAgdGltZTogbnVsbCxcbiAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgIHBvaW50ZXI6IG51bGwsXG4gICAgICBzdGFnZToge1xuICAgICAgICBzdGFydDogbnVsbCxcbiAgICAgICAgY3VycmVudDogbnVsbFxuICAgICAgfSxcbiAgICAgIGRpcmVjdGlvbjogbnVsbCxcbiAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICBtb3Zpbmc6IGZhbHNlXG4gICAgfTtcblxuICAgIC8vIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnRyaWdnZXIoJ2RyYWdnZWQnKTtcbiAgICB0aGlzLmxpc3RlbmVyTW91c2VVcCgpO1xuICAgIHRoaXMubGlzdGVuZXJUb3VjaEVuZCgpO1xuICB9O1xuXG4gIC8qKlxuXHQgKiBQcmVwYXJlcyBkYXRhIGZvciBkcmFnZ2luZyBjYXJvdXNlbC4gSXQgc3RhcnRzIGFmdGVyIGZpcmluZyBgdG91Y2hzdGFydGAgYW5kIGBtb3VzZWRvd25gIGV2ZW50cy5cblx0ICogQHBhcmFtIGV2ZW50IC0gVGhlIGV2ZW50IGFyZ3VtZW50cy5cblx0ICogQHJldHVybnMgc3RhZ2UgLSBvYmplY3Qgd2l0aCAneCcgYW5kICd5JyBjb29yZGluYXRlcyBvZiAub3dsLXN0YWdlXG5cdCAqL1xuICBwcml2YXRlIF9wcmVwYXJlRHJhZ2dpbmcoZXZlbnQ6IGFueSk6IENvb3JkcyB7XG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLnByZXBhcmVEcmFnZ2luZyhldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgaGFuZGxlciBmb3IgJ2NsaWNrJyBldmVudCBvbiBhbnkgZWxlbWVudCBpbiAub3dsLXN0YWdlIGluIG9yZGVyIHRvIHByZXZlbnQgZHJhZ2dpbmcgd2hlbiBtb3Zpbmcgb2YgY3Vyc29yIGlzIGxlc3MgdGhhbiAzcHhcbiAgICovXG4gIHByaXZhdGUgX29uZUNsaWNrSGFuZGxlciA9ICgpID0+IHtcbiAgICB0aGlzLmxpc3RlbmVyT25lQ2xpY2sgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLl9kcmFnLnRhcmdldCwgJ2NsaWNrJywgKCkgPT4gZmFsc2UpXG4gICAgdGhpcy5saXN0ZW5lck9uZUNsaWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogRmluaXNoZXMgZHJhZ2dpbmdcbiAgICogQHBhcmFtIGV2ZW50IG9iamVjdCBldmVudCBvZiAnbW91c2VVcCcgb2YgJ3RvdWNoZW5kJyBldmVudHNcbiAgICovXG4gIHByaXZhdGUgX2ZpbmlzaERyYWdnaW5nKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5maW5pc2hEcmFnZ2luZyhldmVudCwgdGhpcy5fZHJhZywgdGhpcy5fb25lQ2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuXHQgKiBHZXRzIHVuaWZpZWQgcG9pbnRlciBjb29yZGluYXRlcyBmcm9tIGV2ZW50LlxuXHQgKiBAcGFyYW0gZXZlbnQgVGhlIGBtb3VzZWRvd25gIG9yIGB0b3VjaHN0YXJ0YCBldmVudC5cblx0ICogQHJldHVybnMgQ29udGFpbnMgYHhgIGFuZCBgeWAgY29vcmRpbmF0ZXMgb2YgY3VycmVudCBwb2ludGVyIHBvc2l0aW9uLlxuXHQgKi9cbiAgcHJpdmF0ZSBfcG9pbnRlcihldmVudDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UucG9pbnRlcihldmVudCk7XG4gIH1cblxuICAvKipcblx0ICogR2V0cyB0aGUgZGlmZmVyZW5jZSBvZiB0d28gdmVjdG9ycy5cblx0ICogQHBhcmFtIGZpcnN0IFRoZSBmaXJzdCB2ZWN0b3IuXG5cdCAqIEBwYXJhbSBzZWNvbmQtIFRoZSBzZWNvbmQgdmVjdG9yLlxuXHQgKiBAcmV0dXJucyBUaGUgZGlmZmVyZW5jZS5cblx0ICovXG4gIHByaXZhdGUgX2RpZmZlcmVuY2UoZmlyc3RDOiBDb29yZHMsIHNlY29uZDogQ29vcmRzKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5jYXJvdXNlbFNlcnZpY2UuZGlmZmVyZW5jZShmaXJzdEMsIHNlY29uZCk7XG4gIH1cblxuICAvKipcblx0ICogQ2hlY2tzIHdoZXRoZXIgdGhlIGNhcm91c2VsIGlzIGluIGEgc3BlY2lmaWMgc3RhdGUgb3Igbm90LlxuXHQgKiBAcGFyYW0gc3RhdGUgVGhlIHN0YXRlIHRvIGNoZWNrLlxuXHQgKiBAcmV0dXJucyBUaGUgZmxhZyB3aGljaCBpbmRpY2F0ZXMgaWYgdGhlIGNhcm91c2VsIGlzIGJ1c3kuXG5cdCAqL1xuICBwcml2YXRlIF9pcyhzdGF0ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLmlzKHN0YXRlKTtcbiAgfVxuXG4gIC8qKlxuICAqIEVudGVycyBhIHN0YXRlLlxuICAqIEBwYXJhbSBuYW1lIFRoZSBzdGF0ZSBuYW1lLlxuICAqL1xuICBwcml2YXRlIF9lbnRlcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5lbnRlcihuYW1lKTtcbiAgfVxuXG4gIC8qKlxuXHQgKiBTZW5kcyBhbGwgZGF0YSBuZWVkZWQgZm9yIFZpZXcuXG5cdCAqL1xuICBwcml2YXRlIF9zZW5kQ2hhbmdlcygpIHtcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5zZW5kQ2hhbmdlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgZm9yIHRyYW5zaXRpb2VuZCBldmVudFxuICAgKi9cbiAgb25UcmFuc2l0aW9uRW5kKCkge1xuICAgIHRoaXMuY2Fyb3VzZWxTZXJ2aWNlLm9uVHJhbnNpdGlvbkVuZCgpO1xuICB9XG5cbiAgLyoqXG5cdCAqIEVudGVycyBpbnRvIGEgJ2RyYWdnaW5nJyBzdGF0ZVxuXHQgKi9cbiAgcHJpdmF0ZSBfZW50ZXJEcmFnZ2luZygpIHtcbiAgICB0aGlzLmNhcm91c2VsU2VydmljZS5lbnRlckRyYWdnaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgZW5kIG9mICdhbmltYXRpb25lbmQnIGV2ZW50XG4gICAqIEBwYXJhbSBpZCBJZCBvZiBzbGlkZXNcbiAgICovXG4gIGNsZWFyKGlkKSB7XG4gICAgdGhpcy5hbmltYXRlU2VydmljZS5jbGVhcihpZCk7XG4gIH1cbn1cbiJdfQ==