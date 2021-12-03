import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  scan,
  share,
} from 'rxjs/operators';
import { GlobalLoaderCorrectLoaderUrlFormat, GlobalLoaderHttpMethods } from '../models/global-http-loader.models';

const START_STRING: GlobalLoaderCorrectLoaderUrlFormat = '';

@Injectable({ providedIn: 'root' })
export class GlobalHttpLoaderService extends Observable<Set<GlobalLoaderCorrectLoaderUrlFormat>> {

  private readonly _currentRequestsStream$$: BehaviorSubject<GlobalLoaderCorrectLoaderUrlFormat> = new BehaviorSubject(START_STRING);

  constructor() {
    super((subscriber) => {
      return this._currentRequestsStream$$
        .pipe(
          scan((loaderObject, nextUrl) => {
            // mutate set if we have truthy value (string)
            if (nextUrl) {
              loaderObject.has(nextUrl)
                ? loaderObject.delete(nextUrl)
                : loaderObject.add(nextUrl);
            }
            return loaderObject;
          }, new Set<GlobalLoaderCorrectLoaderUrlFormat>()),
          share(),
        )
        .subscribe(subscriber);
    });
  }

  /**
   * add next url to subject stream
   * @param requestUrl next correctly formed http string representing request
   */
  nextRequestUrl(requestUrl: GlobalLoaderCorrectLoaderUrlFormat): void {
    if (requestUrl) {
      this._currentRequestsStream$$.next(requestUrl);
    }
  }

  /**
   * Returns true if any http request is currently ongoing
   * @returns Observable:boolean
   */
  isAnythingStillLoading(): Observable<boolean> {
    return this.pipe(
      map((setData) => !!setData.size),
      distinctUntilChanged(),
    )
  }

  /**
   * Listen for specific types of requests : e.g. POST and DELETE requests
   * @param httpMethods Array of possible methods
   * @returns Observable :boolean
   */
  listenForHttpMethodsLoading(httpMethods: ReadonlyArray<GlobalLoaderHttpMethods>): Observable<boolean> {
    return this.pipe(
      map((setData) => {
        // check in their POST-... etc
        const setMadeArray = Array.from(setData);
        return setMadeArray.some(httpReqString => httpMethods.find(m => httpReqString.indexOf(m) > -1))
      }),
      distinctUntilChanged(),
    )
  }
}
