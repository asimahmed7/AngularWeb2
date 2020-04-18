import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { EmployeeService } from './shared/employee-service.service';
import { CommonUtil } from './shared/common-util';
import { appConfigService } from './shared/appconfigservice';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { PageNotFoundComponent } from './page-not-found.component';



export function initializeApp(appConfig: appConfigService) {
  return () => appConfig.load();
}



@NgModule({
  declarations: [
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    PageNotFoundComponent,
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule
  
  ],
  providers: [EmployeeService, CommonUtil, { provide: APP_INITIALIZER, useFactory: (config: appConfigService) => () => config.load(), deps: [appConfigService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
