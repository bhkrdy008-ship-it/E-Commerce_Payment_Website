package ecommerce_backend.project;

import ecommerce_backend.project.dto.Purchase;
import ecommerce_backend.project.dto.PurchaseResponse;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("api/checkout")
public class checkoutController {

    private CheckoutService checkoutService;

    checkoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
       return checkoutService.placeOrder(purchase);
    }
}
