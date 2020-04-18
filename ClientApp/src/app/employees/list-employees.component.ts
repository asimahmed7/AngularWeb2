import { Component, OnInit } from '@angular/core';
import { CommonUtil } from '../shared/common-util';
import { Employee } from '../models/employee';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';



@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];

  constructor(private cmnUtil: CommonUtil, private router : Router) { 

    
  }



  ngOnInit() {

    this.cmnUtil.GetEmployees("Asim").pipe(map(results => results.filter(r => r.name != "AK"))).subscribe(
      data => {
        this.employees = data;
        console.log(data);
      },
      err => {
        console.log(err);
      });

    console.log(this.employees);
  }

  editEmpClick(empID: string)  {

    console.log(empID);
    this.router.navigate(['emp/edit', empID]);
  }

}
