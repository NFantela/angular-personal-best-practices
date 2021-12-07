import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Observer } from "rxjs";

interface Notification<I, O> {
  content: I;
  observer: Observer<O>;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService extends BehaviorSubject<readonly Notification<any, any>[]> {
  constructor() {
    super([]);
  }

  /** Create new Observable with content being notification message (string)
   * Store it in this subject and on unsubscribe remove it
  */
  show<I, O>(content: I): Observable<O> {
    return new Observable((observer: Observer<O>) => {
      const notification = {
        content,
        observer
      };

      this.next([...this.value, notification]);
      return () => {
        this.next(this.value.filter(item => item !== notification));
      };
    });
  }
}
