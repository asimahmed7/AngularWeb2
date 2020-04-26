import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http'
import { Observable, BehaviorSubject, Subject, of, ObservableLike } from 'rxjs';
import { appConfigService } from '../shared/appconfigservice';
import { Employee } from '../models/employee';
import { SortColumn, SortDirection } from '../shared/directives/sortable.directive';
import { debounceTime, tap, delay, switchMap } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';
import { promise } from 'protractor';


interface SearchResult {
  employees: Employee[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}



const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(emp: Employee[], column: SortColumn, direction: string): Employee[] {
  if (direction === '' || column === '') {
    return emp;
  } else {
    return [...emp].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(emp: Employee, term: string, pipe: PipeTransform) {
  return emp.name.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(emp.email).includes(term)
    || pipe.transform(emp.department).includes(term);
}

@Injectable()
export class EmployeeService {

  private _loading$ = new BehaviorSubject<boolean>(true);
 public  _search$ = new Subject<void>();
  private _employees$ = new BehaviorSubject<Employee[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  public empSubB$: BehaviorSubject<Employee> = new BehaviorSubject<Employee>(null);
  private _employees: Employee[] = [];
  public get employees(): Employee[] {
   
    return this._employees;
  }
  public set employees(value: Employee[]) {
    this._employees = value;
  }

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(public http: HttpClient,private pipe: DecimalPipe) { 

    this._search$.pipe(
      tap(() => {this._loading$.next(true),console.log('hi beta'),this.getEmployees()}),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      console.log('emp fetched')
      console.log(result.employees)
      this._employees$.next(result.employees);
      this._total$.next(result.total);
    });

    this._search$.next();

  }

    options = {
    headers: new HttpHeaders().append('Content-Type', 'application/json')
    
  }

  get employees$() { return this._employees$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  public postSvc(req : string, path : string): Observable<any> {

    return this.http.post(appConfigService.settings.baseUrl + path, req, this.options);

  }


  public getSvc(EmpID: string, path : string): Observable<Employee[]> {

    return this.http.get<Employee[]>(appConfigService.settings.baseUrl + path);

  }

  public getPromiseSvc(EmpID: string, path : string): Promise<Employee[]> {

    return new Promise((resolve, reject) => {
      return this.http.get<Employee[]>(appConfigService.settings.baseUrl + path).subscribe(success => {
        resolve(success);
      });

    });
  

  }

  getEmployees()
  {
    this.getSvc('','CoreAPI/ListEmployees').toPromise().then( x=> {
       console.log(x)
       this.employees = x
    }); 
  }


  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    let searchResult :  SearchResult = { employees: [], total: 0};

    
      console.log(this.employees);

         // 1. sort
    this.employees  = sort(this.employees , sortColumn, sortDirection);

    // 2. filter
    this.employees  = this.employees.filter(emp => matches(emp, searchTerm, this.pipe));
    const total = this.employees.length;
    console.log(this.employees );
    // 3. paginate
    this.employees  = this.employees .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    
    searchResult.employees  = this.employees
    searchResult.total  = total

    return of(searchResult);
     

   
  }



private extractData(res: Response) {
  let body = res.json();
  return body || { };
}

//private handleError (error: Response | any) {
//  // In a real world app, you might use a remote logging infrastructure
//  let errMsg: string;
//  if (error instanceof Response) {
//    const body = error.json() || '';
//    const err = body.error || JSON.stringify(body);
//    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
//  } else {
//    errMsg = error.message ? error.message : error.toString();
//  }
//  console.error(errMsg);
//  return Observable.throw(errMsg);
//}

}

