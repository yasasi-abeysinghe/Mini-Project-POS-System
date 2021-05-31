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
    public float shippingCost;
    public float VAT;
    public float subTotal;

    public Order() {}

    public Order(String orderNo, String status, String createdDate, float subTotal) {
        this.orderNo = orderNo;
        this.status = status;
        this.createdDate = createdDate;
        this.subTotal = subTotal;
    }

    @Override
    public String toString() {
        return String.format(
                "Order[id=%s, orderNo='%s', status='%s', createdDate='%s', subTotal='%s]",
                id, orderNo, status, createdDate, subTotal);
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrderNo() {
        return this.orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedDate() {
        return this.createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public String getCompletedDate() {
        return this.completedDate;
    }

    public void setCompletedDate(String completedDate) {
        this.completedDate = completedDate;
    }

    public float getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(float subTotal) {
        this.subTotal = subTotal;
    }
}

