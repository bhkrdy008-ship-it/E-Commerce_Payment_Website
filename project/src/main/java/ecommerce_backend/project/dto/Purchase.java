package ecommerce_backend.project.dto;

import ecommerce_backend.project.Entity.Address;
import ecommerce_backend.project.Entity.Customer;
import ecommerce_backend.project.Entity.Order;
import ecommerce_backend.project.Entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;

    private Order order;

    private Set<OrderItem> orderItems;

    private Address shippingAddress;
    private Address billingAddress;

}
