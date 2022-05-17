import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterFiltersDemoComponent } from './containers/roter-filters-demo/roter-filters-demo.component';
import { SectionDemoComponent } from './containers/section-demo/section-demo.component';

const routes: Routes = [
  {
    path: '',
    component: SectionDemoComponent
  },
  {
    path: 'router-filters',
    component: RouterFiltersDemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionDemoRoutingModule { }
