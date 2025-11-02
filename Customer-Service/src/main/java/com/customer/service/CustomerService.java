package com.customer.service;

import com.customer.entity.Customer;

import java.util.List;

public interface CustomerService {
    List<Customer> fetchAllCustomers();
    Customer fetchById(Long id);
    Customer createCustomer(Customer customer);
    Customer updateCustomer(Customer customer);
    String deleteCustomer(Customer customer);

}
