import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor(private _httpClient: HttpClient) {}

    private baseUrl: string = "/api/v1/customers";

    fetchAllCustomers(): Observable<Customer[]> {
        return this._httpClient.get<Customer[]>(`${this.baseUrl}`);
    }
    
    createCustomer(data: Partial<Customer>): Observable<Customer> {  // Changed to Partial<Customer>
        return this._httpClient.post<Customer>(`${this.baseUrl}`, data);
    }
    
    updateCustomer(data: Customer): Observable<Customer> {
        return this._httpClient.put<Customer>(`${this.baseUrl}/${data.id}`, data);
    }
    
    deleteCustomer(id: Number): Observable<any> {  // Changed return type
        return this._httpClient.delete(`${this.baseUrl}/${id}`);
    }
}