import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Observable, takeUntil } from 'rxjs';
import { isEmptyObject, isNullOrUndefined } from '../../utils/global-util-functions';
import { UnsubService } from '../unsubscribe/unsubscribe.service';

export type SortDirections = 'asc' | 'desc' | '';

export interface RouterWithDataFilters<T> {
  search?: string;
  page?: number;
  pageSize?: number;
  sortField?: string;
  direction?: SortDirections,
  customFilters?: { [key in keyof T]: string | string[] },
}

type FiltersFromQueryParams<T> = {
  [K in keyof RouterWithDataFilters<T>]: K extends 'direction' ? RouterWithDataFilters<T>['direction']
  : string
} & { [key in keyof T]?: string | string[] | undefined };

type ExtendedParamMap<T> = ParamMap & { params?: FiltersFromQueryParams<T> };

/**
 * Observable service that can be used to sync router query params state with some data source (e.g. table with filters)
 * Service should be provided in component using it
 * it also expects @UnsubService to be provided in that component
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

  /** Map out values to match our predefined types (all custom filetrs should go into customFilters obj)
   * after that navigates route to new query params
   */
  changeFilter({ search, page, pageSize, sortField, direction, customFilters }: Partial<RouterWithDataFilters<T>>): void {

    const changePayload: FiltersFromQueryParams<T> = {
      ...!isNullOrUndefined(page) && { page: String(page) },
      ...!isNullOrUndefined(pageSize) && { pageSize: String(pageSize) },
      ...sortField && { sortField },
      ...direction && { direction },
      ...search && { search },
      ...customFilters && !isEmptyObject(customFilters) && { ...customFilters }
    };
    // if we have empty string provided we want to clear it from url by setting it to undefined
    if (search === '') {
      changePayload.search = undefined;
    }

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: changePayload,
      queryParamsHandling: 'merge',
    });

  }

}
