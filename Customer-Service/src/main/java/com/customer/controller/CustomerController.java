package com.customer.controller;

import com.customer.entity.Customer;
import com.customer.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(maxAge = 3360)
@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public ResponseEntity<List<Customer>> fetchAllCustomers(){
        return ResponseEntity.ok(customerService.fetchAllCustomers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> fetchById(@PathVariable("id") Long id){
        return ResponseEntity.ok(customerService.fetchById(id));
    }

    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer){
        return ResponseEntity.ok(customerService.createCustomer(customer));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable("id") Long id, @RequestBody Customer customer){
        Customer customerObj = customerService.fetchById(id);
        if(customerObj != null){
            customerObj.setAddress(customer.getAddress());
            customerObj.setName(customer.getName());
            customerObj.setEmail(customer.getEmail());
        }
        return ResponseEntity.ok(customerService.updateCustomer(customerObj));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable("id") Long id){
        Customer customerObj = customerService.fetchById(id);
        String deleteMSG = null;
        if(customerObj != null){
            deleteMSG = customerService.deleteCustomer(customerObj);
        }
        return ResponseEntity.ok(deleteMSG);
    }
}