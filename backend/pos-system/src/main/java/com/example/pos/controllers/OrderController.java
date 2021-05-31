package com.example.pos.controllers;

import com.example.pos.exceptionHandlers.OrderNotFoundException;
import com.example.pos.model.Order;
import com.example.pos.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;


@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600,allowCredentials="true")
@RestController
@RequestMapping("/api/auth")
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

    // Get list of open orders

    @RequestMapping(value="/orders", params = "status", method=GET)
    @ResponseBody
    public List<Order> ordersByStatus(@RequestParam("status")  String status) {

        return repository.findByStatus(status);
    }

    // Get order with given orderNo

    @RequestMapping(value="/orders", params = "orderNo", method=GET)
    @ResponseBody
    public Order ordersByOrderNo(@RequestParam("orderNo")  String orderNo) {

        return repository.findByOrderNo(orderNo);
    }

    @PutMapping("/orders/{id}")
    Order updateOrder(@RequestBody Order newOrder, @PathVariable String id) {

        return repository.findById(id)
                .map(order -> {
                    order.setOrderNo(newOrder.getOrderNo());
                    order.setCreatedDate(newOrder.getCreatedDate());
                    order.setCompletedDate(newOrder.getCompletedDate());
                    order.setStatus(newOrder.getStatus());
                    order.setSubTotal(newOrder.getSubTotal());
                    return repository.save(order);
                })
                .orElseGet(() -> {
                    return repository.save(newOrder);
                });
    }

}
