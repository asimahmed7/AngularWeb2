import {FormControl,FormGroup,FormArray,FormBuilder, Validators, AbstractControl} from '@angular/forms'

import { Injectable } from '@angular/core';
import { Employee, Skills } from '../models/employee';
import { EmployeeService } from '../services/employee-service.service';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class CommonUtil {

 public getDepts() : Observable<any[]> {
    return of([{ id: "1", name: "IT" }, { id: "2", name: "Marketing" }, { id: "3", name: "HR" }]);
}

public getSkills() : Observable<any[]> {
  return of([{ id: "1", name: "Programming" }, { id: "2", name: "Social Media Marketing" }, { id: "3", name: "Communication" }, { id: "4", name: "Writing" }]);
}



  constructor(private empSvc : EmployeeService){}


  public GetEmployees(EmpID: string) : Observable<Employee[]> {

   return this.empSvc.getSvc(EmpID,'CoreAPI/ListEmployees')

  }

  public AddUpdateEmployee(emp :  Employee, mode : string) : Observable<any> {
    
    var apiUrl = 'CoreAPI/AddEmployee';
    
    if(mode=="Update"){
      apiUrl = 'CoreAPI/UpdateEmployee';
    }
    
  

    return this.empSvc.postSvc(JSON.stringify(emp),apiUrl);
    
   // console.log(empFrmGroup.value);
   }



}
