import { CustomerService } from './../customer.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from "@angular/material/input";
import { Customer } from '../customer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, 
    MatButtonModule, MatButtonModule, MatIconModule, MatFormFieldModule, 
    MatInput, MatIconModule, MatInputModule,CommonModule,FormsModule],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})
export class CustomerForm {
  readonly dialogRef=inject(MatDialogRef<CustomerForm>);

  data=inject<Customer>(MAT_DIALOG_DATA);
  constructor(private customerService:CustomerService){}
  addOrEditCustomer(customer:Customer){
    if(customer.id!==0){
      this.customerService.updateCustomer(customer).subscribe({
        next:(data)=>{
          console.log("Customer updated Successfully...");
          window.location.reload();
        },
        error:(err)=>{
          console.log(err);
        }
      })
      
    }else{
      this.customerService.createCustomer(customer).subscribe({
        next:(data)=>{
          console.log("Customer Created Successfully...");
          window.location.reload();
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }
}
