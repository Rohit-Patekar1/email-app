import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupPageComponent } from './pages/setup-page/setup-page.component';
import { TableComponent } from './pages/table/table.component';
import { ViewTemplateComponent } from './pages/view-template/view-template.component';

const routes: Routes = [
  { path: '', component: SetupPageComponent },
  { path: 'transactions', component: TableComponent },
  { path: 'view-template', component: ViewTemplateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
