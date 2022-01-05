import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

/**
 * Observable abstraction over ngOnDestroy to use with takeUntil
 * must be provided in component / directive using it
 */
@Injectable()
export class UnsubService extends Subject<void> implements OnDestroy {
    ngOnDestroy(): void {
        this.next();
        this.complete();
    }
}
