package com.example.pos.controllers;

import com.example.pos.repository.ItemRepository;
import com.example.pos.model.Item;
import com.example.pos.exceptionHandlers.ItemNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
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
}
