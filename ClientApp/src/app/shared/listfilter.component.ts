import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-listfilter',
  templateUrl: './listfilter.component.html',
  styleUrls: ['./listfilter.component.css']
})
export class ListfilterComponent implements OnInit {
  private _listFilter;
  @Input() public  totalRecords: number;
  @Output() valueChange = new EventEmitter();


  public get listFilter() {
    return this._listFilter;
  }
  public set listFilter(value) {
    this._listFilter = value;
    console.log(this.listFilter);
    this.valueChange.emit(this.listFilter);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
