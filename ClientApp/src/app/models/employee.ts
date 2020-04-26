export class Employee {

  public  id: string;
  public empID: string;
  public name: string;
  public email: string;
  public department: string;
  public joiningdate: Date;
  public emptype: string;
  public employeeSkills: Skills[];

}

export class Skills {
  public skillName: string;
  public level: string;
}
