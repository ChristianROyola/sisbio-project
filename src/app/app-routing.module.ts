import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DatasensListComponent} from "./components/datasens-list/datasens-list.component";
import {AddDatasensComponent} from "./components/add-datasens/add-datasens.component";

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full'},
  { path: 'dataSens', component: DatasensListComponent },
  { path: 'add', component: AddDatasensComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
