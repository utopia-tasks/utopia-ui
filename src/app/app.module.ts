import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { TodosService } from './service/todos/todos.service';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { StarredComponent } from './component/starred/starred.component';
import { TaskListComponent } from './component/task-list/task-list.component';
import { MenuComponent } from './component/menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTaskComponent } from './component/add-task/add-task.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DeadlinesComponent } from './component/deadlines/deadlines.component';
import { MatChipsModule } from '@angular/material/chips';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { UpcomingComponent } from './component/upcoming/upcoming.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ScanComponent } from './component/scan/scan.component';
import { TaskCardComponent } from './component/task-card/task-card.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AllComponent } from './component/all/all.component';
import { MatDividerModule } from '@angular/material/divider';
import { CookieService } from 'ngx-cookie-service';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { MatStepperModule } from '@angular/material/stepper';
import { StartUpService } from './service/start-up/start-up.service';
import { UserService } from './service/user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StarredComponent,
    TaskListComponent,
    MenuComponent,
    AddTaskComponent,
    DeadlinesComponent,
    UpcomingComponent,
    ScanComponent,
    TaskCardComponent,
    AllComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatListModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatChipsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDividerModule,
    MatStepperModule
  ],
  providers: [
    TodosService,
    StartUpService,
    CookieService,
    UserService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
