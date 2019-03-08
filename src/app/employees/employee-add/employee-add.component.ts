import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  constructor(
    private employeeService:EmployeeService,
  
    private toastr:ToastrService
    ) { }

  ngOnInit() {
  }

  resetForm(form?:NgForm){
    if(form!=null)
      form.reset();
    this.employeeService.formData = {
      id:'',
      fullName:'',
      position:'',
      empCode:'',
      mobile:'',
    }
  }

  onSubmit(form:NgForm){
    let data = Object.assign({},form.value);
    delete data.id;
    let id = form.value.id;
    if(id == null){
      //Adding the employeess
      this.employeeService.addEmployees(data)
      .then((result) => {
        this.toastr.success('Employee Added Successfully','Employee Register');
      }).catch((err) => {
        this.toastr.error('Error in Registeration!!','Employee Register');
      });
    }
    else{
      //Adding the employeess
      this.employeeService.updateEmployees(data,id)
      .then((result) => {
        this.toastr.info('Employee Updated Successfully','Employee Register');
      }).catch((err) => {
        this.toastr.error('Error in Registeration!!','Employee Register');
      });
    }
    
    this.resetForm(form);
  }


}
