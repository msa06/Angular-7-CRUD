import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData:Employee = {
      id:null,
      fullName:'',
      position:'',
      empCode:'',
      mobile:'',
  };
  constructor(
    private fire:AngularFirestore
  ) { }

  //Get All the Employees
  getEmployees(){
    return this.fire.collection('employees').snapshotChanges();
  }

  //Add Employee to the database
  addEmployees(emp:any){
    return this.fire.collection('employees').add(emp);
  }

  //Update Employee
  updateEmployees(emp:any,id:string){
    return this.fire.doc('employees/'+id).update(emp);
  }
  
  //Delete  Employee
  deleteEmployee(id:string){
    return this.fire.doc('employees/'+id).delete();
  }
}
