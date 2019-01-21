package com.example.pos.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderRepository repository;

    OrderController(OrderRepository repository){
        this.repository = repository;
    }

    @GetMapping("/orders")
    List<Order> all(){
        return repository.findAll();
    }

    @PostMapping("/orders")
    Order newOrder(@RequestBody Order newOrder) {
        return repository.save(newOrder);
    }

    // Single item

    @GetMapping("/orders/{id}")
    Order one(@PathVariable String id) {

        return repository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(id));
    }
}
