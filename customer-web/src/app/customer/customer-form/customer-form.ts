import { CustomerService } from './../customer.service';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { Customer } from '../customer';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})
export class CustomerForm {
  readonly dialogRef = inject(MatDialogRef<CustomerForm>);
  data = inject<Customer>(MAT_DIALOG_DATA);

  constructor(private customerService: CustomerService) {}

  addOrEditCustomer(customer: Customer): void {
    if (customer.id && customer.id !== 0) {
      // Update existing customer
      this.customerService.updateCustomer(customer).subscribe({
        next: (data) => {
          console.log("Customer updated successfully", data);
          this.dialogRef.close(true); // Close with success flag
        },
        error: (err) => {
          console.error('Error updating customer:', err);
          alert('Failed to update customer. Please try again.');
        }
      });
    } else {
      // Create new customer - don't send id
      const newCustomer: Partial<Customer> = {
        name: customer.name,
        email: customer.email,
        address: customer.address
      };
      
      this.customerService.createCustomer(newCustomer).subscribe({
        next: (data) => {
          console.log("Customer created successfully", data);
          this.dialogRef.close(true); // Close with success flag
        },
        error: (err) => {
          console.error('Error creating customer:', err);
          alert('Failed to create customer. Please try again.');
        }
      });
    }
  }
}