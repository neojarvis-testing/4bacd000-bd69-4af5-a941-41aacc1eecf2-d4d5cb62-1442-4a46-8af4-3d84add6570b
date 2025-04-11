import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-user-applied-loan',
  templateUrl: './confirm-delete-user-applied-loan.component.html',
  styleUrls: ['./confirm-delete-user-applied-loan.component.css']
})
export class ConfirmDeleteUserAppliedLoanComponent implements OnInit {

  id:number=0;

  constructor() { }

  ngOnInit(): void {
  }

  confirmDelete(id:number){

  }

  cancelDelete(){

  }

}
