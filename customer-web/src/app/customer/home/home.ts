import { CustomerService } from './../customer.service';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButton, MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Customer } from '../customer';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CustomerForm } from '../customer-form/customer-form';

@Component({
  selector: 'app-home',
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,
    MatTableModule,MatSortModule,MatPaginatorModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'address', 'edit', 'delete'];
  customers:Customer[]=[];
  filteredCustomer:Customer[]=[];
  dataSource = new MatTableDataSource<Customer>();

  name:String='';
  email:String='';
  address:String='';

  customer:Customer={
    id:0,
    name:'',
    email:'',
    address:''
  }
  readonly dialog = inject(MatDialog);
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

  openCustomerDialog(customer:Customer):void{
    const dialogRef = this.dialog.open(CustomerForm,{
      data:customer
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result!=undefined){
        this.customer.id=result.id;
        this.customer.name=result.name;
        this.customer.email=result.email;
        this.customer.address=result.address;
      }
    });
  }
  deleteCustomer(id:Number){
    const isConfirmed=window.confirm("Are you sure you want to delete");
    if(isConfirmed){
      this.customerService.deleteCustomer(id).subscribe((data)=>{
        this.customers=this.customers.filter(item=>item.id!==id);
      })
      window.location.reload();

    }
  }
}
