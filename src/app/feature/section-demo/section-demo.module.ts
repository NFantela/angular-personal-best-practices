import { NgModule } from '@angular/core';
import { SectionDemoComponent } from './containers/section-demo/section-demo.component';
import { SectionDemoRoutingModule } from './section-demo-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, SectionDemoRoutingModule],
  declarations: [SectionDemoComponent],
})
export class SectionDemoModule { }
