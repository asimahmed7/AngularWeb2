import { NgModule } from '@angular/core';

import { EmpRoutingModule } from './emp-routing.module';
import { ListEmployeesComponent } from './list-employees.component';
import { CreateEmployeeComponent } from './create-employee.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListEmployeesComponent,
    CreateEmployeeComponent
  ],
  imports: [
    SharedModule,
    EmpRoutingModule
  ],
  exports: [
    ListEmployeesComponent,
    CreateEmployeeComponent
  ]
})
export class EmpModule { }
