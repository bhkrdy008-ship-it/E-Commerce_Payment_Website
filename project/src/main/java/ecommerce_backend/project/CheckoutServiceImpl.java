package ecommerce_backend.project;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import ecommerce_backend.project.Entity.Address;
import ecommerce_backend.project.Entity.Customer;
import ecommerce_backend.project.Entity.Order;
import ecommerce_backend.project.Entity.OrderItem;
import ecommerce_backend.project.Repository.CustomerRepository;
import ecommerce_backend.project.dto.PaymentInfo;
import ecommerce_backend.project.dto.Purchase;
import ecommerce_backend.project.dto.PurchaseResponse;
import jakarta.transaction.Transactional;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private final CustomerRepository customerRepository;

    @Autowired
    CheckoutServiceImpl(CustomerRepository customerRepository,
                        @Value("${stripe.key.secret}") String secretValue){
        this.customerRepository = customerRepository;
        Stripe.apiKey = secretValue;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        String uuid = UUID.randomUUID().toString();
        Order order = purchase.getOrder();

        order.setOrderTrackingNumber(uuid);
        Customer customer = purchase.getCustomer();

        String email = customer.getEmail();
        Customer customerFromDb = customerRepository.findByEmail(email);

        if(customerFromDb != null ){
            customer = customerFromDb;
        }
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

    @Override
    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException {

        List<String> payment_method_types = new ArrayList<>();
        payment_method_types.add("card");

        Map<String,Object> params = new HashMap<>();
        params.put("amount", paymentInfo.getAmount());
        params.put("currency", paymentInfo.getCurrency());
        params.put("payment_method_types", payment_method_types);
        params.put("receipt_email", paymentInfo.getReceipt_email());

        return PaymentIntent.create(params);
    }
}
