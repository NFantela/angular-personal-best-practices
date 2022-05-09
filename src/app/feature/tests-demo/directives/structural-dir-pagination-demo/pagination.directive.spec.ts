import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { click, expectText, findEls } from '../../spec-helpers/element.spec-helper';
import { PaginateDirective } from './pagination.directive';

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** STRUCTURAL DIRECTIVE test demo */

@Component({
  template: `
    <ul>
      <li
        *appPaginate="let item of items; perPage: 3; controls: controls"
        data-testid="item"
      >
        {{ item }}
      </li>
    </ul>
    <ng-template
      #controls
      let-previousPage="previousPage"
      let-page="page"
      let-pages="pages"
      let-nextPage="nextPage"
    >
      <button (click)="previousPage()" data-testid="previousPage">
        Previous page
      </button>
      <span data-testid="page">{{ page }}</span>
      /
      <span data-testid="pages">{{ pages }}</span>
      <button (click)="nextPage()" data-testid="nextPage">Next page</button>
    </ng-template>
  `,
})
class HostComponent {
  public items = items;
}

// helper that matches current grabbed element and expected items
function expectItems(elements: DebugElement[], expectedItems: number[]): void {
  elements.forEach((element, index) => {
    const actualText = element.nativeElement.textContent.trim();
    expect(actualText).toBe(String(expectedItems[index]));
  });
}

describe('Structural directive : PaginateDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginateDirective, HostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    // remember change detction does not trigger automatically so u need to fire it
    fixture.detectChanges();
  });

  it('renders the items of the first page', () => {
    const els = findEls(fixture, 'item');
    // pageSize is 3 so only 3 should be shown
    expect(els.length).toBe(3);
    expectItems(els, [1, 2, 3]);
  });

  it('renders the current page and total pages', () => {
    expectText(fixture, 'page', '1');
    expectText(fixture, 'pages', '4');
  });

  // emulate click event, trigger change detection to update view and then check view
  it('shows the next page', () => {
    click(fixture, 'nextPage');
    fixture.detectChanges();

    const els = findEls(fixture, 'item');
    expect(els.length).toBe(3);
    expectItems(els, [4, 5, 6]);
  });

  // emulate click event, trigger change detection to update view and then check view
  it('shows the previous page', () => {
    click(fixture, 'nextPage');
    click(fixture, 'previousPage');
    fixture.detectChanges();

    const els = findEls(fixture, 'item');
    expect(els.length).toBe(3);
    expectItems(els, [1, 2, 3]);
  });

  it('checks the pages bounds', () => {
    click(fixture, 'nextPage'); // -> 2
    click(fixture, 'nextPage'); // -> 3
    click(fixture, 'nextPage'); // -> 4
    click(fixture, 'previousPage'); // -> 3
    click(fixture, 'previousPage'); // -> 2
    click(fixture, 'previousPage'); // -> 1
    // only now we detect changes (update template)
    fixture.detectChanges();

    // Expect that the first page is visible again
    const els = findEls(fixture, 'item');
    expect(els.length).toBe(3);
    expectItems(els, [1, 2, 3]);
  });

});
