import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterWithDataFilterService, SortDirections } from 'src/app/shared/services/router-with-data-filters/router-with-data-filters.service';
import { UnsubService } from 'src/app/shared/services/unsubscribe/unsubscribe.service';

type SortTypes = 'price-asc' | 'price-desc';

const SORT_SEPARATOR = '-';

@Component({
  selector: 'roter-filters-demo',
  templateUrl: 'roter-filters-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    RouterWithDataFilterService,
    UnsubService,
  ]
})
export class RouterFiltersDemoComponent {
  constructor(public readonly filtersSerice: RouterWithDataFilterService<{ petType?: string[] }>) {
  }

  readonly sortTypes: ReadonlyArray<SortTypes> = ['price-asc', 'price-desc'];

  readonly pageSizes: ReadonlyArray<number> = [10, 20, 50];

  handleSearchChange(e: Event) {
    // in practice debounce etc this is just democ
    const inputEvent = e as InputEvent;
    const inputEl = inputEvent?.target as HTMLInputElement | null;
    if (inputEl) {
      this.filtersSerice.changeFilter({ search: inputEl.value })
    }
    return;
  }

  /** Multiple select */
  handlePetChange(petChoices: string[]) {
    this.filtersSerice.changeFilter({
      customFilters: {
        petType: petChoices
      }
    })
  }

  handleSortChange(e: SortTypes) {
    if (e?.length) {
      const [sortField, direction] = e.split(SORT_SEPARATOR) as [string, SortDirections];
      this.filtersSerice.changeFilter({ sortField, direction });
    }
  }

  handleChangePageSize(pageSize: number) {
    this.filtersSerice.changeFilter({ pageSize });
  }

  changePage(change: 'increment' | 'decrement', currentPage?: number) {
    if (change === 'increment') {
      // always allowed
      this.filtersSerice.changeFilter({ page: currentPage ? ++currentPage : 2 });

    } else {
      if (currentPage) {
        this.filtersSerice.changeFilter({ page: --currentPage });
      }
    }
  }

  // better with pipe but this example is small so its fine
  joinSort(field: string | undefined, direction: string | undefined): string {
    if (field && direction) {
      return `${field}${SORT_SEPARATOR}${direction}`;
    }
    return '';
  }

}
