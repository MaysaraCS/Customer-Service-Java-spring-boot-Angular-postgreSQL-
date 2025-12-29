package com.customer.service;

import com.customer.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.customer.repository.CustomerRepository;

import java.util.List;

@Service
public class CustomerServiceImplement implements CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public List<Customer> fetchAllCustomers() {
        return (List<Customer>) customerRepository.findAll();
    }

    @Override
    public Customer fetchById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }

    @Override
    public Customer createCustomer(Customer customer) {
        // Ensure ID is null for new entities
        customer.setId(null);
        return customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(Customer customer) {
        // Verify the customer exists before updating
        if (customer.getId() == null || !customerRepository.existsById(customer.getId())) {
            throw new IllegalArgumentException("Cannot update non-existent customer");
        }
        return customerRepository.save(customer);
    }

    @Override
    public String deleteCustomer(Customer customer) {
        customerRepository.delete(customer);
        return "Customer Deleted Successfully for id:" + customer.getId();
    }
}