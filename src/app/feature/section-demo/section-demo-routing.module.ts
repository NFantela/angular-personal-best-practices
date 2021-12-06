import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionDemoComponent } from './containers/section-demo/section-demo.component';

const routes: Routes = [
  {
    path: '',
    component: SectionDemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionDemoRoutingModule { }
