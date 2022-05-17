import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterWithDataFilterService } from 'src/app/shared/services/router-with-data-filters/router-with-data-filters.service';
import { UnsubService } from 'src/app/shared/services/unsubscribe/unsubscribe.service';

type SortTypes = 'price-asc' | 'price-desc';

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

  handleSearchChange(e: Event) {
    // in practice debounce etc this is just democ
    const inputEvent = e as InputEvent;
    const inputEl = inputEvent?.target as HTMLInputElement | null;
    if (inputEl) {
      this.filtersSerice.changeFilter({ search: inputEl.value })
    }
    return;
  }

  handlePetChange(petChoices: string[]) {
    // todo set multiple custom filters
    console.log("model change", petChoices)
  }

  handleSortChange(e: SortTypes) {
    // TODO change sort on filters service
    const [sortName, sortType] = e.split('-');
    console.log(sortName, sortType)

  }

}
