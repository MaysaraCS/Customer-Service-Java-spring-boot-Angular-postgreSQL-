import { CustomerService } from './../customer.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButton, MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Customer } from '../customer';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,MatTableModule,MatSortModule,MatPaginatorModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'address'];
  customers:Customer[]=[];
  filteredCustomer:Customer[]=[];
  dataSource = new MatTableDataSource<Customer>();
  customer:Customer={
    id:0,
    name:'',
    email:'',
    address:''
  }
  @ViewChild(MatSort) sort : any;
  @ViewChild(MatPaginator) paginator: any;
  constructor(private customerService:CustomerService){}
  ngAfterViewInit(): void {
    this.customerService.fetchAllCustomers().subscribe((data)=>{
      this.customers=data;
      this.dataSource = new MatTableDataSource<Customer>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  filterCustomer(input: string) {
  this.filteredCustomer = this.customers.filter(item =>
    item.name.toLowerCase().includes(input.toLowerCase()) ||
    item.email.toLowerCase().includes(input.toLowerCase()) ||
    item.address.toLowerCase().includes(input.toLowerCase())
  );
  this.dataSource = new MatTableDataSource<Customer>(this.filteredCustomer);
}

}
