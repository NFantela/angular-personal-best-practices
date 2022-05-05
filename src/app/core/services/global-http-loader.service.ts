import { Injectable, NgZone } from '@angular/core';
import { asapScheduler, BehaviorSubject, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  observeOn,
  scan,
  share,
} from 'rxjs/operators';
import { leaveZone } from 'src/app/shared/operators/zone-free-full/zone-free-full.operators';
import { GlobalLoaderCorrectLoaderUrlFormat, GlobalLoaderHttpMethods } from '../models/global-http-loader.models';

const START_STRING: GlobalLoaderCorrectLoaderUrlFormat = '';

@Injectable({ providedIn: 'root' })
export class GlobalHttpLoaderService extends Observable<Set<GlobalLoaderCorrectLoaderUrlFormat>> {

  private readonly _currentRequestsStream$$: BehaviorSubject<GlobalLoaderCorrectLoaderUrlFormat> = new BehaviorSubject(START_STRING);

  constructor(private readonly _ngZone: NgZone) {
    super((subscriber) => {
      return this._currentRequestsStream$$
        .pipe(
          leaveZone(_ngZone),
          scan((loaderObject, nextUrl) => {
            // mutate set if we have truthy value (string)
            if (nextUrl) {
              loaderObject.has(nextUrl)
                ? loaderObject.delete(nextUrl)
                : loaderObject.add(nextUrl);
            }
            return loaderObject;
          }, new Set<GlobalLoaderCorrectLoaderUrlFormat>()),
          observeOn(asapScheduler), // without this pushing from interceptor wont work
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

  /**
   * Listen for specific method and route combination
   * @param requestedMethod: GlobalLoaderHttpMethods e.g. DELETE
   * @param routeContains: string from the route e.g. 'users'
   * @returns Observable :boolean
   */
  listenForSpecificRouteLoading(requestedMethod: GlobalLoaderHttpMethods, routeContains: string): Observable<boolean> {
    return this.pipe(
      map((setData) => {
        const routeFound = Array.from(setData).find(itemLoading => {
          const [method, route] = itemLoading.split(requestedMethod + '-') as [GlobalLoaderHttpMethods, string];
          return method === method && route.indexOf(routeContains) > -1;
        });
        return !!routeFound;
      }),
      distinctUntilChanged(),
    )
  }

}
