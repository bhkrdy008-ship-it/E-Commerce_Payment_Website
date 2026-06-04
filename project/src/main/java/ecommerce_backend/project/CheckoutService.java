package ecommerce_backend.project;

import ecommerce_backend.project.dto.Purchase;
import ecommerce_backend.project.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
