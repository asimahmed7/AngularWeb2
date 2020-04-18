import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,FormArray,FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { CommonUtil } from '../shared/common-util';
import { ActivatedRoute, Router } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Employee, Skills } from '../models/employee';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})

export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  isValid : boolean  = false;
  employee : Employee;
  mode : string = "Add";

  constructor(private fb : FormBuilder, private cmnUtil : CommonUtil, private route: ActivatedRoute, private router : Router ) { }

  ngOnInit() {
 
    this.route.paramMap.subscribe(params => {
      const empId = params.get('id');
      if (empId) {
        this.getEmployee(empId);
        this.mode = "Update";
      }
      else{
        this.createEmployeeForm();
      }
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.validateForm(this.employeeForm);
      console.log(this.employeeForm);
    });


  };

  getEmployee(empID : string)
  {
     this.cmnUtil.GetEmployees(empID).pipe(map(results => results.filter(r => r.empID === empID))).subscribe(
      data => {
        this.employee = data[0];
        console.log(data);
        this.createEmployeeForm();
        this.editEmployeeForm();
      },
      err => {
        console.log(err);
      });
  }
  

  createEmployeeForm(){
    this.employeeForm = this.fb.group({
      empName: ['', Validators.required],
      email: ['', Validators.required],
      department: ['', Validators.required],
      skills: this.fb.array([
        this.addSkill()])
    }
    )
  }


  editEmployeeForm() {
  
    this.employeeForm.patchValue({
      empName: this.employee.name,
      email: this.employee.email,
      department : this.employee.department
    });

     this.employeeForm.setControl('skills', this.setExistingSkills());
  
  }


  setExistingSkills(): FormArray {
    const formArray = new FormArray([]);
    this.employee.employeeSkills.forEach(s => {
      formArray.push(this.fb.group({
        skillName: s.skillName,
        level: s.level
      }));
    });
  
    return formArray;
  }


goBack()
{
  this.router.navigate(["emp/list"]);
}

  addSkill(): FormGroup {
    return this.fb.group({

      skillName: ['', Validators.required],
      level: ['', Validators.required]

    })
  }




  validateForm(group: FormGroup = this.employeeForm): boolean {

   

    Object.keys(group.controls).forEach((key: string) => {

      const abstractControl = group.get(key);


      //this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid
        && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
        //const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            //this.formErrors[key] += messages[errorKey] + ' ';
            this.isValid = true;
            break;
          }
        }
      }

     

      if (abstractControl instanceof FormGroup) {
        this.validateForm(abstractControl);
      }


      if (abstractControl instanceof FormArray) {
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            this.validateForm(control);
          }
        }
      }
     
  
      
    });

    this.isValid = this.employeeForm.valid;
    return this.employeeForm.valid;

  }

  addSkillButtonClick() :void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkill());
  }


  onSubmit(): void {

    this.cmnUtil.AddUpdateEmployee(this.getEmployeeRequest(this.employeeForm),this.mode);
    this.goBack();
   
  }


  

  private getEmployeeRequest(empFrmGroup: FormGroup = this.employeeForm) : Employee {

    var empObj: Employee = new Employee();

    if(this.employee != null)
    {
      empObj.empID = this.employee.empID;
    }

    empObj.name = empFrmGroup.get('empName').value;
    empObj.email = empFrmGroup.get('email').value;
    empObj.department = empFrmGroup.get('department').value;
    empObj.employeeSkills = [];


    Object.keys((<FormArray>empFrmGroup.get('skills')).controls).forEach((control: string) => {

      const formGrp = (<FormArray>empFrmGroup.get('skills')).controls[control];

      let empSkill: Skills = new Skills();
      
      Object.keys((<FormControl>formGrp.controls)).forEach((key: string) => {

       
        const typedControl: AbstractControl = formGrp.controls[key];
        if (key === "skillName") {
          empSkill.skillName = typedControl.value;
        }
        else if (key === "level") {
          empSkill.level = typedControl.value;
        }

        console.log(typedControl);

      });

      if (empSkill != null) {
        empObj.employeeSkills.push(empSkill);

      }

    });

    console.log(empObj);
    
    return empObj;

  }

}
