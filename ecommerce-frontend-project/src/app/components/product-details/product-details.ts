import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/product';
import { CartServices } from '../../services/cart-services';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {

  product: Product = new Product();

  constructor(private productService: ProductService,
              private route: ActivatedRoute, private cartService: CartServices) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {

    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    console.log(`Product id=${theProductId}`);
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

    addToCart() {
      const cartItem = new CartItem(this.product);

      this.cartService.addToCart(cartItem);
    }

}
