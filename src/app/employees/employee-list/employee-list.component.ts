import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeslist:Employee[];
  constructor(
    private employeeService:EmployeeService,
    private toastr:ToastrService
  ) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(
      actionArray=>{
          this.employeeslist = actionArray.map(item=>{
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as Employee;
          });  
        },
    error=>{
      console.log(error);
    }
    )
  }

  onEdit(emp:Employee){
    this.employeeService.formData = Object.assign({},emp);
  }

  onDelete(id:string){
    if(confirm("Are you sure?")){
      this.employeeService.deleteEmployee(id)
        .then(res =>{
          this.toastr.warning('Employee Deleted Successfully','Employee Register');
        });

    }
  }

}
