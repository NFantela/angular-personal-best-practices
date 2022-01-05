import { InjectionToken, Provider, ChangeDetectorRef } from "@angular/core";
import { merge, Observable, takeUntil, tap } from "rxjs";
import { UnsubService } from "src/app/shared/services/unsubscribe/unsubscribe.service";
import { DEMO_TEXTFIELD_RESET, TextFieldResetControllerDirective } from "./textfield-reset-controller.directive";
import { DEMO_TEXTFIELD_SIZE, TextFieldSizeControllerDirective } from "./textfield-size-controller.directive";

// this is meta controller that combines our directives
export class DemoTextfieldController {
  constructor(
    readonly change$: Observable<void>,
    private readonly resetDirective: TextFieldResetControllerDirective,
    private readonly sizeDirective: TextFieldSizeControllerDirective,
    // other directives...
  ) { }

  get size(): TextFieldSizeControllerDirective['size'] {
    return this.sizeDirective.size;
  }

  get reset(): boolean {
    return this.resetDirective.reset;
  }

  // other directives...
}


export const TEXTFIELD_WATCHED_CONTROLLER = new InjectionToken<DemoTextfieldController>(
  'watched textfield controller',
);

export const TEXTFIELD_CONTROLLER_PROVIDER: Provider = [
  UnsubService,
  {
    provide: TEXTFIELD_WATCHED_CONTROLLER,
    deps: [
      ChangeDetectorRef,
      UnsubService,
      // provide tokens that will either bring directive instance if found or instatiate it
      DEMO_TEXTFIELD_RESET,
      DEMO_TEXTFIELD_SIZE,
    ],
    useFactory: textfieldWatchedControllerFactory,
  },
];


export function textfieldWatchedControllerFactory(
  changeDetectorRef: ChangeDetectorRef,
  destroy$: Observable<void>,
  ...controllers: [
    TextFieldResetControllerDirective,
    TextFieldSizeControllerDirective,
  ]
): DemoTextfieldController {
  const change$ = merge(...controllers.map(({ change$ }) => change$)).pipe(
    takeUntil(destroy$),
    tap(() => changeDetectorRef.markForCheck()),
  );

  change$.subscribe();

  return new DemoTextfieldController(change$, ...controllers);
}
