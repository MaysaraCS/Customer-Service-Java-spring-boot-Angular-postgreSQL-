package service;

import entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.CustomerRepository;

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
        return customerRepository.findById(id).get();
    }

    @Override
    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public String deleteCustomer(Customer customer) {
        customerRepository.delete(customer);
        return "Customer Deleted Successfully for id:"+customer.getId();
    }
}
