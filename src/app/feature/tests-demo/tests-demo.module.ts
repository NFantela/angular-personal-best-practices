import { NgModule } from '@angular/core';
import { PaginateDirective } from './directives/structural-dir-pagination-demo/pagination.directive';
import { ThresholdWarningDirective } from './directives/treshold-warning/treshold-warning.directive';
import { TestingFormsDemoModule } from './forms/testing-forms.module';
import { TranslatePipe } from './pipes/translate.pipe';
import { TranslateService } from './pipes/translate.service';

@NgModule({
  imports: [TestingFormsDemoModule],
  declarations: [TranslatePipe, ThresholdWarningDirective, PaginateDirective],
  exports: [TranslatePipe],
  providers: [TranslateService]
})
export class TestsDemoModule { }
