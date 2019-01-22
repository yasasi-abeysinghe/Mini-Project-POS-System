package com.example.pos.model;

import org.springframework.data.annotation.Id;

public class Item {
    @Id
    public String id;

    public String itemName;
    public float quantity;
    public float unitPrice;

    public Item() {
    }

    public Item(String itemName, float quantity, float unitPrice) {
        this.itemName = itemName;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

    @Override
    public String toString() {
        return String.format(
                "Item[id=%s, itemName='%s', quantity='%s', unitPrice='%s']",
                id, itemName, quantity, unitPrice);
    }
}
