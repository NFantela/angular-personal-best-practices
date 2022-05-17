import { NgModule } from '@angular/core';
import { SectionDemoComponent } from './containers/section-demo/section-demo.component';
import { SectionDemoRoutingModule } from './section-demo-routing.module';
import { CommonModule } from '@angular/common';
import { ControllersDemoModule } from 'src/app/shared/controllers-demo/controllers-demo.module';
import { RouterFiltersDemoComponent } from './containers/roter-filters-demo/roter-filters-demo.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, SectionDemoRoutingModule, ControllersDemoModule, FormsModule],
  declarations: [SectionDemoComponent, RouterFiltersDemoComponent],
})
export class SectionDemoModule { }
