import { NgModule } from '@angular/core';
import { ThresholdWarningDirective } from './directives/treshold-warning/treshold-warning.directive';
import { TranslatePipe } from './pipes/translate.pipe';
import { TranslateService } from './pipes/translate.service';

@NgModule({
  imports: [],
  declarations: [TranslatePipe, ThresholdWarningDirective],
  exports: [TranslatePipe],
  providers: [TranslateService]
})
export class TestsDemoModule { }
