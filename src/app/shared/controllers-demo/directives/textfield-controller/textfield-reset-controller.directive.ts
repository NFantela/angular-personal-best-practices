import { Directive, forwardRef, Input, InjectionToken } from "@angular/core";
import { Controller } from "../../classes/abstract.controller";

// declare injection token that will be provided as directive
export const DEMO_TEXTFIELD_RESET = new InjectionToken<TextFieldResetControllerDirective>(
  'demoTextFieldReset',
  { factory: resetDirectiveFactory },
);

// factory function if directive is not found with D/I
export function resetDirectiveFactory(): TextFieldResetControllerDirective {
  return new TextFieldResetControllerDirective();
}

@Directive({
  selector: '[demoTextFieldReset]',
  providers: [
    {
      provide: DEMO_TEXTFIELD_RESET,
      useExisting: forwardRef(() => TextFieldResetControllerDirective),
    },
  ],
})
export class TextFieldResetControllerDirective extends Controller {
  @Input('demoTextFieldReset')
  reset: boolean = false;
}

