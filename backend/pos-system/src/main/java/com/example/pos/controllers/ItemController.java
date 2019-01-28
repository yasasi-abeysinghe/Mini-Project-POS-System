package com.example.pos.controllers;

import com.example.pos.repository.ItemRepository;
import com.example.pos.model.Item;
import com.example.pos.exceptionHandlers.ItemNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;


@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600,allowCredentials="true")
@RestController
@RequestMapping("/api/auth")
public class ItemController {

    @Autowired
    private ItemRepository repository;

    ItemController(ItemRepository repository){
        this.repository = repository;
    }

    @GetMapping("/items")
    List<Item> all(){
        return repository.findAll();
    }

    @PostMapping("/items")
    Item newItem(@RequestBody Item newItem) {
        return repository.save(newItem);
    }


    @DeleteMapping("/items/{id}")
    void deleteItem(@PathVariable String id) {
        repository.deleteById(id);
    }

    // Single item

    @GetMapping("/items/{id}")
    Item one(@PathVariable String id) {

        return repository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));
    }


    // Get list of items with given orderNo

    @RequestMapping(value="/items", params = "orderNo", method=GET)
    @ResponseBody
    public List<Item> itemsByOrderNo(@RequestParam("orderNo")  String orderNo) {

        return repository.findByOrderNo(orderNo);
    }

    @PutMapping("/items/{id}")
    Item updateItem(@RequestBody Item newItem, @PathVariable String id) {

        return repository.findById(id)
                .map(item -> {
                    item.setItemName(newItem.getItemName());
                    item.setQuantity(newItem.getQuantity());
                    item.setUnitPrice(newItem.getUnitPrice());
                    item.setOrderNo(newItem.getOrderNo());
                    return repository.save(item);
                })
                .orElseGet(() -> {
                    return repository.save(newItem);
                });
    }
}
