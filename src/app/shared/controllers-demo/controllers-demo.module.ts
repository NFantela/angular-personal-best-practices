import { NgModule } from '@angular/core';
import { DemoPrimitiveTextfieldComponent, DemoNumbersFieldComponent } from './containers/controllers-demo.components';
import { TextFieldResetControllerDirective } from './directives/textfield-controller/textfield-reset-controller.directive';
import { TextFieldSizeControllerDirective } from './directives/textfield-controller/textfield-size-controller.directive';

@NgModule({
  imports: [],
  declarations: [DemoPrimitiveTextfieldComponent, DemoNumbersFieldComponent, TextFieldSizeControllerDirective, TextFieldResetControllerDirective],
  exports: [DemoNumbersFieldComponent]
})
export class ControllersDemoModule { }
