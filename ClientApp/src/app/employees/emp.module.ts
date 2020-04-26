import { NgModule } from '@angular/core';
import { EmpRoutingModule } from './emp-routing.module';
import { ListEmployeesComponent } from './list-employees.component';
import { CreateEmployeeComponent } from './create-employee.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ShellEmployeeComponent } from './shell-employee.component';
import { NgbdSortableHeader } from '../shared/directives/sortable.directive';





@NgModule({
  declarations: [
    ListEmployeesComponent,
    CreateEmployeeComponent,
    ShellEmployeeComponent,
    NgbdSortableHeader
    
  ],
  imports: [
    NgbModule,
    SharedModule,
    EmpRoutingModule
   
  ],
  providers: [DatePipe],
  exports: [
    ListEmployeesComponent,
    CreateEmployeeComponent,
    ShellEmployeeComponent
  ]
})
export class EmpModule { }
