import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Observable, takeUntil } from 'rxjs';
import { isNullOrUndefined } from '../../utils/global-util-functions';
import { UnsubService } from '../unsubscribe/unsubscribe.service';

export interface RouterWithDataFilters<T> {
  search?: string;
  page?: number;
  pageSize?: number;
  sortField?: string;
  direction?: 'asc' | 'desc' | '',
  customFilters?: { [key in keyof T]: string | string[]},
}

type FiltersFromQueryParams<T> = {
  [K in keyof RouterWithDataFilters<T>]: K extends 'direction' ? RouterWithDataFilters<T>['direction']
  : string
} & { [key in keyof T]?: string | string[] | undefined };

type ExtendedParamMap<T> = ParamMap & { params?: FiltersFromQueryParams<T> };


/** Service should be provided in component using it
 * it also expects @UnsubService to be provided
 */
@Injectable()
export class RouterWithDataFilterService<T> extends Observable<RouterWithDataFilters<T>>{
  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _unsubService: UnsubService,
    private readonly _router: Router,
  ) {
    super(subscriber => {
      return this._route.queryParamMap.pipe(
        map(({ params }: ExtendedParamMap<T>) => {
          if (params) {
            // other will be object with strings or string[] values - it should match <T>
            const { search, page, pageSize, sortField, direction, ...other } = params;
            return {
              ...search && { search },
              ...!isNullOrUndefined(page) && { page: parseInt(page) },
              ...!isNullOrUndefined(pageSize) && { pageSize: parseInt(pageSize) },
              ...sortField && { sortField },
              ...direction && { direction },
              ...Boolean(Object.keys(other).length) && {
                customFilters: other as RouterWithDataFilters<T>['customFilters']
              }
            }
          }
          return {}
        }),
        takeUntil(this._unsubService),
      ).subscribe(subscriber)
    });
  }

  // todo we need to use <T> to make mapping to custom filters possible this type does not need to correspond to above types
  changeFilter(newFiteChange: RouterWithDataFilters<T>): void {
    // todo navigate filter
    // todo if some values are non existing e.g. search '' clear them

    // this._router.navigate([], {
    //   relativeTo: this._route,
    //   newFiteChange,
    //   queryParamsHandling: 'merge',
    // });

  }

}
