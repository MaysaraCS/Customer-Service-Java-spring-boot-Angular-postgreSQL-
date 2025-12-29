import { CustomerService } from './../customer.service';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Customer } from '../customer';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CustomerForm } from '../customer-form/customer-form';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'address', 'edit', 'delete'];
  customers: Customer[] = [];
  dataSource = new MatTableDataSource<Customer>();

  customer: Customer = {
    name: '',
    email: '',
    address: ''
  };  // Removed id: 0

  readonly dialog = inject(MatDialog);

  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private customerService: CustomerService) {}

  ngAfterViewInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.fetchAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error loading customers:', err);
      }
    });
  }

  filterCustomer(input: string): void {
    const filterValue = input.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openCustomerDialog(customer: Customer): void {
    // Create a copy to avoid modifying the original object
    const customerCopy: Customer = {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      address: customer.address
    };

    const dialogRef = this.dialog.open(CustomerForm, {
      data: customerCopy,
      width: '500px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Reload data after successful operation
        this.loadCustomers();
      }
    });
  }

  deleteCustomer(id: Number): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this customer?');
    if (isConfirmed) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          console.log('Customer deleted successfully');
          // Reload all customers to refresh the table
          this.loadCustomers();
        },
        error: (err) => {
          console.error('Error deleting customer:', err);
          alert('Failed to delete customer. Please try again.');
        }
      });
    }
  }
}