package ecommerce_backend.project;

import ecommerce_backend.project.Entity.Address;
import ecommerce_backend.project.Entity.Customer;
import ecommerce_backend.project.Entity.Order;
import ecommerce_backend.project.Entity.OrderItem;
import ecommerce_backend.project.Repository.CustomerRepository;
import ecommerce_backend.project.dto.Purchase;
import ecommerce_backend.project.dto.PurchaseResponse;
import jakarta.transaction.Transactional;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;

    @Autowired
    CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        String uuid = UUID.randomUUID().toString();
        Order order = purchase.getOrder();

        order.setOrderTrackingNumber(uuid);
        Customer customer = purchase.getCustomer();
        customer.add(order);
        Set<OrderItem> orderItemSet = purchase.getOrderItems();

        orderItemSet.forEach(order::add);
        Address shippingAddress = purchase.getShippingAddress();
        Address billingAddress = purchase.getBillingAddress();

        order.setBillingAddress(billingAddress);
        order.setShippingAddress(shippingAddress);

        customerRepository.save(customer);
        return new PurchaseResponse(uuid);
    }
}
