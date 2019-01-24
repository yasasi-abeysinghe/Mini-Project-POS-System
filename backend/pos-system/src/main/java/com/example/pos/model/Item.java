package com.example.pos.model;

import org.springframework.data.annotation.Id;

public class Item {
    @Id
    public String id;

    public String itemName;
    public float quantity;
    public float unitPrice;
    public String orderNo;

    public Item() {
    }

    public Item(String itemName, float quantity, float unitPrice, String orderNo) {
        this.itemName = itemName;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.orderNo = orderNo;
    }

    @Override
    public String toString() {
        return String.format(
                "Item[id=%s, itemName='%s', quantity='%s', unitPrice='%s', orderNo=%s]",
                id, itemName, quantity, unitPrice, orderNo);
    }
}
