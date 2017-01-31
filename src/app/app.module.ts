import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginService } from './login.service';

import { ApiService } from './services/api.service';
import { LoginPM } from './PM/login';
import { DailyCheckinPM } from './PM/daily-checkin';
import { AttendanceStudentPM } from './PM/attendance-student';


import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { DailyCheckinComponent } from './views/daily-checkin/daily-checkin.component';
import { AttendanceStudentComponent } from './views/attendance-student/attendance-student.component';
import { AttendanceCalendarComponent } from './views/attendance-calendar/attendance-calendar.component';



const appRoutes: Routes = [
    {path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {path: 'login',
        component: LoginComponent
    },
    {path: 'daily-checkin',
        component: DailyCheckinComponent
    },
    {path: 'attendance-students',
      component: AttendanceStudentComponent
    },
    {path: 'attendance-calendar',
      component: AttendanceCalendarComponent}
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);


export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'swipe': {velocity: 0.4, threshold: 20} // override default settings
  }
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DailyCheckinComponent,
    AttendanceStudentComponent,
    AttendanceCalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRouting,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    ApiService,
    LoginService, LoginPM,
    DailyCheckinPM, AttendanceStudentPM
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
