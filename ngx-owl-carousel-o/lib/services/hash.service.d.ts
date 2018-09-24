import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarouselService } from './carousel.service';
export declare class HashService implements OnDestroy {
    private carouselService;
    /**
     * Subscription to merge Observable from CarouselService
     */
    hashSubscription: Subscription;
    /**
     * Current url fragment (hash)
     */
    currentHashFragment: string;
    constructor(carouselService: CarouselService);
    ngOnDestroy(): void;
    /**
     * Defines Observables which service must observe
     */
    spyDataStreams(): void;
    /**
     * rewinds carousel to slide which has the same hashFragment as fragment of current url
     * @param fragment fragment of url
     */
    rewind(fragment: string): void;
}
