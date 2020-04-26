import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { CommonUtil } from '../shared/common-util';
import { Employee } from '../models/employee';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee-service.service';
import { Subscription, Observable } from 'rxjs';
import { SortEvent, NgbdSortableHeader } from '../shared/directives/sortable.directive';



@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit, OnDestroy  {
  public employees: Employee[];
  filtEmployees: Employee[];
  subscription: Subscription;
  listDept: Observable<any[]>;

  employees$: Observable<Employee[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private cmnUtil: CommonUtil, private router: Router, public empSvc: EmployeeService) {
    this.employees$ = empSvc.employees$;
    this.total$ = empSvc.total$;
  }


  ngOnInit() {

    this.listDept = this.cmnUtil.getDepts();

   this.subscription = this.empSvc.empSubB$.subscribe((emp: Employee) => {
      console.log('Emp Subscription event');
      console.log(emp);
      this.loadData();
    });

   

  }


  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.empSvc.sortColumn = column;
    this.empSvc.sortDirection = direction;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
}

  loadData() {

    this.cmnUtil.GetEmployees("Asim").pipe(map(results => results.filter(r => r.name != "AK"))).subscribe(
      data => {
        this.employees = data;
        this.filtEmployees = this.employees;
        //console.log(data);
      },
      err => {
        console.log(err);
      });

    //console.log(this.employees);
  }

  editEmpClick(emp : Employee) {
   
    console.log(emp);
    this.empSvc.empSubB$.next(emp);

    //this.router.navigate(['emp/edit', empID]);
  }

  filterEmployees(p) {
    if (p == "") { this.filtEmployees = this.employees; }
    else {
      this.filtEmployees = this.employees.filter(x => x.name.toLocaleLowerCase().includes(p.toLowerCase()));
    }
  }
}
