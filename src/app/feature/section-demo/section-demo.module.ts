import { NgModule } from '@angular/core';
import { SectionDemoComponent } from './containers/section-demo/section-demo.component';
import { SectionDemoRoutingModule } from './section-demo-routing.module';
import { CommonModule } from '@angular/common';
import { ControllersDemoModule } from 'src/app/shared/controllers-demo/controllers-demo.module';

@NgModule({
  imports: [CommonModule, SectionDemoRoutingModule, ControllersDemoModule],
  declarations: [SectionDemoComponent],
})
export class SectionDemoModule { }
