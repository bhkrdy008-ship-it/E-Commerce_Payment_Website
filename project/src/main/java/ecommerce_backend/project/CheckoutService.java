package ecommerce_backend.project;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import ecommerce_backend.project.dto.PaymentInfo;
import ecommerce_backend.project.dto.Purchase;
import ecommerce_backend.project.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
