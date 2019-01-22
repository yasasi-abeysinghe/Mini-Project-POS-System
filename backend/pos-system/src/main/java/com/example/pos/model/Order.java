package com.example.pos.model;

//import com.example.demo.item.Item;
import org.springframework.data.annotation.Id;

import java.util.List;

public class Order {
    @Id
    public String id;

    public String orderNo;
    public String status;
    public String createdDate;
    public String completedDate;
//    public List<Item> itemList;
    public float shippingCost;
    public float VAT;
    public float subTotal;

    public Order() {}

    public Order(String orderNo, String status, String createdDate) {
        this.orderNo = orderNo;
        this.status = status;
        this.createdDate = createdDate;
    }

    @Override
    public String toString() {
        return String.format(
                "Order[id=%s, orderNo='%s', status='%s', createdDate='%s']",
                id, orderNo, status, createdDate);
    }
}

