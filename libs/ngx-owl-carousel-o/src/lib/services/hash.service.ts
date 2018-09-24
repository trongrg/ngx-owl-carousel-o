import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { merge } from 'rxjs/observable/merge';
import { CarouselService } from './carousel.service';
import { tap, skip } from 'rxjs/operators';

@Injectable()
export class HashService implements OnDestroy {
  /**
   * Subscription to merge Observable from CarouselService
   */
  hashSubscription: Subscription;

  /**
   * Current url fragment (hash)
   */
  currentHashFragment: string;

  constructor(private carouselService: CarouselService) {
    this.spyDataStreams();
  }

  ngOnDestroy() {
    this.hashSubscription.unsubscribe();
  }

  /**
   * Defines Observables which service must observe
   */
  spyDataStreams() {
    const initializedCarousel$: Observable<string> = this.carouselService.getInitializedState();

    const changedSettings$: Observable<any> = this.carouselService.getChangedState().pipe(
      tap(data => {
        if (this.carouselService.settings.URLhashListener && data.property.name === 'position') {
          const newCurSlide = this.carouselService.current();
          const newCurFragment = this.carouselService.slidesData[newCurSlide].hashFragment;

          if (!newCurFragment || newCurFragment === this.currentHashFragment) {
						return;
          }
        }
      })
    );

    const hashFragment$: Observable<string | any> = merge(initializedCarousel$, changedSettings$);
    this.hashSubscription = hashFragment$.subscribe(
      () => {}
    );
  }

  /**
   * rewinds carousel to slide which has the same hashFragment as fragment of current url
   * @param fragment fragment of url
   */
  rewind(fragment: string) {
    const position = this.carouselService.slidesData.findIndex(slide => slide.hashFragment === fragment && slide.isCloned === false);

    if (position === -1 || position === this.carouselService.current()) {
      return;
    }

		this.carouselService.to(this.carouselService.relative(position), false);
  }
}
