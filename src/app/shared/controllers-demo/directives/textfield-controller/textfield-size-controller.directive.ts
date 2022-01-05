import { Directive, forwardRef, Input, InjectionToken } from "@angular/core";
import { Controller } from "../../classes/abstract.controller";

// declare injection token that will be provided as directive
export const DEMO_TEXTFIELD_SIZE = new InjectionToken<TextFieldSizeControllerDirective>(
  'demoTextFieldSize',
  { factory: sizeDirectiveFactory },
);

// factory function if directive is not found with D/I
export function sizeDirectiveFactory(): TextFieldSizeControllerDirective {
  return new TextFieldSizeControllerDirective();
}

@Directive({
  selector: '[demoTextFieldSize]',
  providers: [
    {
      provide: DEMO_TEXTFIELD_SIZE,
      useExisting: forwardRef(() => TextFieldSizeControllerDirective),
    },
  ],
})
export class TextFieldSizeControllerDirective extends Controller {
  @Input('demoTextFieldSize')
  size: 's' | 'l' = 's';
}

