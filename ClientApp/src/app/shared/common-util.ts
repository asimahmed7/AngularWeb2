import {FormControl,FormGroup,FormArray,FormBuilder, Validators, AbstractControl} from '@angular/forms'

import { Injectable } from '@angular/core';
import { Employee, Skills } from '../models/employee';
import { EmployeeService } from './employee-service.service';
import { Observable } from 'rxjs';

@Injectable()
export class CommonUtil {

  constructor(public empSvc : EmployeeService){}


  public GetEmployees(EmpID: string) : Observable<Employee[]> {

   return this.empSvc.getSvc(EmpID,'CoreAPI/ListEmployees')

  }

  public AddUpdateEmployee(emp :  Employee, mode : string) : void {
    
    var apiUrl = 'CoreAPI/AddEmployee';
    
    if(mode=="Update"){
      apiUrl = 'CoreAPI/UpdateEmployee';
    }

     this.empSvc.postSvc(JSON.stringify(emp),apiUrl).subscribe(
        data => {
            console.log(data);
        },
        err => {
          console.log(err);
        });;
    
   // console.log(empFrmGroup.value);
   }



}
