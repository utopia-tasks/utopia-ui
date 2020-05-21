import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { StarredComponent } from './component/starred/starred.component';
import {DeadlinesComponent} from './component/deadlines/deadlines.component';


const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full'},
  { path: 'all', component: HomeComponent },
  { path: 'starred', component: StarredComponent },
  { path: 'deadlines', component: DeadlinesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
