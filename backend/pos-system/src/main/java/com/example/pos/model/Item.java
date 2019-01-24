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

    public String getItemName() {
        return this.itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public float getQuantity(){
        return this.quantity;
    }

    public void setQuantity(float quantity){
        this.quantity = quantity;
    }
    public float getUnitPrice(){
        return this.unitPrice;
    }

    public void setUnitPrice(float unitPrice){
        this.unitPrice = unitPrice;
    }

    public String getOrderNo(){
        return this.orderNo;
    }

    public void setOrderNo(String orderNo){
        this.orderNo = orderNo;
    }
}
