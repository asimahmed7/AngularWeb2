import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

// Import the components so they can be referenced in routes
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CounterComponent } from './counter/counter.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { SharedModule } from './shared/shared.module';



// The last route is the empty path route. This specifies
// the route to redirect to if the client side path is empty.
const appRoutes: Routes = [
  
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'lg', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'emp', loadChildren: () => import('./employees/emp.module').then(m => m.EmpModule) },
  { path: '', redirectTo: '/lg', pathMatch: 'full' },
   { path: '**', component: PageNotFoundComponent }
];



@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(appRoutes,{preloadingStrategy : PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
