import { Component, ChangeDetectionStrategy, Input, Inject } from '@angular/core';
import { DemoTextfieldController, TEXTFIELD_CONTROLLER_PROVIDER, TEXTFIELD_WATCHED_CONTROLLER } from '../directives/textfield-controller/textfield-controller.directive';

@Component({
  selector: 'demo-primitive-textfield',
  template: `
      <input [type]="fieldType"
       />
       current size field size input : {{ size}}
       <p>current reset status {{ reset }}</p>
  ` ,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TEXTFIELD_CONTROLLER_PROVIDER]
})
export class DemoPrimitiveTextfieldComponent {
  constructor(@Inject(TEXTFIELD_WATCHED_CONTROLLER) private readonly _textfieldController: DemoTextfieldController) { }
  @Input()
  fieldType: 'text' | 'number' = 'text';

  @Input()
  min: number | undefined;

  @Input()
  max: number | undefined;

  get size() {
    return this._textfieldController.size;
  }

  get reset() {
    return this._textfieldController.reset;
  }
}


@Component({
  selector: 'demo-numbers-field',
  template: `
  <!-- using size controller directive : the key is in directive name demoTextFieldSize same as input
      this means that if we use it we override default (create directive) if we did not specified it the DI factory
      would just create class with default prop values -->
      <demo-primitive-textfield
        type="number"
        [min]="min"
        [max]="max"
        demoTextFieldSize='l'>
      </demo-primitive-textfield>
  ` ,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoNumbersFieldComponent {
  constructor() { }

  @Input()
  min: number = 0;
  @Input()
  max: number = 100;

}
