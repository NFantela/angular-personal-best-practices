import { NgModule } from '@angular/core';
import { TranslatePipe } from './pipes/translate.pipe';
import { TranslateService } from './pipes/translate.service';

@NgModule({
  imports: [],
  declarations: [TranslatePipe],
  exports: [TranslatePipe],
  providers: [TranslateService]
})
export class TestsDemoModule { }
