import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { StarredComponent } from './component/starred/starred.component';
import {DeadlinesComponent} from './component/deadlines/deadlines.component';
import {UpcomingComponent} from './component/upcoming/upcoming.component';
import {ScanComponent} from './component/scan/scan.component';
import {AllComponent} from './component/all/all.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'all', component: AllComponent },
  { path: 'starred', component: StarredComponent },
  { path: 'deadlines', component: DeadlinesComponent },
  { path: 'upcoming', component: UpcomingComponent },
  { path: 'scan/:startIndex', component: ScanComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
